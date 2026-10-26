const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { execFile } = require('child_process');
const https = require('https');
const path = require('path');

const REGISTRY_URL = 'https://raw.githubusercontent.com/lza6/AI-Tools-Hub/main/registry/manifest.json';

function httpGet(url, encoding = 'utf8') {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AI-Tools-Hub' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpGet(res.headers.location, encoding).then(resolve, reject);
      }
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      let data = '';
      res.setEncoding(encoding === 'buffer' ? 'binary' : 'utf8');
      res.on('data', c => (data += c));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function runCmd(cmd, args = [], timeout = 30000) {
  return new Promise(resolve => {
    execFile(cmd, args, { timeout, windowsHide: true, shell: false }, (err, stdout, stderr) => {
      resolve({ ok: !err, output: (stdout || stderr || '').trim(), error: err ? String(err.message) : null });
    });
  });
}

// 解析 "tool 1.2.3" / "1.2.3" / "v1.2.3" → "1.2.3"
function extractVersion(text) {
  const m = String(text).match(/(\d+\.\d+\.\d+(?:[-+][\w.]+)?)/);
  return m ? m[1] : null;
}

async function fetchRegistry() {
  try {
    const local = require('../registry/manifest.json');
    try {
      const remote = JSON.parse(await httpGet(REGISTRY_URL));
      return { registry: remote, source: 'remote' };
    } catch {
      return { registry: local, source: 'local' };
    }
  } catch {
    return { registry: { tools: [] }, source: 'none' };
  }
}

async function getLatestReleaseTag(repo) {
  const data = JSON.parse(await httpGet(`https://api.github.com/repos/${repo}/releases/latest`));
  return data.tag_name || null;
}

async function inspectTool(tool) {
  const [detect, ver] = await Promise.all([
    runCmd('where.exe', [tool.id]),
    runCmd(tool.versionCmd.split(' ')[0], tool.versionCmd.split(' ').slice(1)),
  ]);
  const installed = detect.ok && ver.ok;
  const localVersion = installed ? extractVersion(ver.output) : null;
  let latestVersion = null;
  let hasUpdate = false;
  if (installed) {
    try {
      const tag = await getLatestReleaseTag(tool.repo);
      latestVersion = extractVersion(tag) || (tag ? tag.replace(/^v/, '') : null);
      hasUpdate = !!(localVersion && latestVersion && latestVersion !== localVersion);
    } catch { /* 无 release 或网络失败，静默 */ }
  }
  return { id: tool.id, installed, localVersion, latestVersion, hasUpdate, rawOutput: ver.output || detect.error };
}

// ---------------- IPC ----------------
ipcMain.handle('registry:load', async () => await fetchRegistry());
ipcMain.handle('tool:inspect', async (_e, tool) => await inspectTool(tool));
ipcMain.handle('tool:checkAllUpdates', async (_e, tools) => {
  return await Promise.all(tools.map(t => inspectTool(t).catch(e => ({ id: t.id, error: String(e) }))));
});

ipcMain.handle('tool:install', async (_e, tool) => {
  if (tool.install.type !== 'ps1') return { ok: false, output: `不支持的安装类型: ${tool.install.type}` };
  const script = await httpGet(tool.install.url);
  const tmp = path.join(app.getPath('temp'), `aihub-install-${tool.id}.ps1`);
  require('fs').writeFileSync(tmp, script, 'utf8');
  // 下载后脚本执行（irm|iex 的安全落地方式），交给 PowerShell
  return await runCmd('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', tmp], 600000);
});

ipcMain.handle('skill:install', async (_e, tool, skill) => {
  return await runCmd(skill.installCmd.split(' ')[0], skill.installCmd.split(' ').slice(1), 120000);
});

ipcMain.handle('shell:open', (_e, url) => shell.openExternal(url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1180, height: 800, minWidth: 900,
    title: 'AI-Tools-Hub · 你的AI军火库',
    backgroundColor: '#0d1117',
    autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false },
  });
  win.loadFile(path.join(__dirname, '..', 'src', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
