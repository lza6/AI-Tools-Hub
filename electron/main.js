const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { execFile } = require('child_process');
const { existsSync, readdirSync, readFileSync, writeFileSync } = require('fs');
const https = require('https');
const path = require('path');
const os = require('os');

const REGISTRY_URL = 'https://raw.githubusercontent.com/lza6/AI-Tools-Hub/main/registry/manifest.json';
const IS_WIN = process.platform === 'win32';

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

function extractVersion(text) {
  const m = String(text).match(/(\d+\.\d+\.\d+(?:[-+][\w.]+)?)/);
  return m ? m[1] : null;
}

async function fetchRegistry() {
  try {
    const local = JSON.parse(readFileSync(path.join(__dirname, '..', 'registry', 'manifest.json'), 'utf8'));
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
  const bin = tool.id;
  const [detect, ver] = await Promise.all([
    IS_WIN ? runCmd('where.exe', [bin]) : runCmd('which', [bin]),
    runCmd(tool.versionCmd.split(' ')[0], tool.versionCmd.split(' ').slice(1)),
  ]);
  const installed = detect.ok && ver.ok;
  const localVersion = installed ? extractVersion(ver.output) : null;
  let latestVersion = null, hasUpdate = false;
  if (installed) {
    try {
      const tag = await getLatestReleaseTag(tool.repo);
      latestVersion = extractVersion(tag) || (tag ? tag.replace(/^v/, '') : null);
      hasUpdate = !!(localVersion && latestVersion && latestVersion !== localVersion);
    } catch { /* 网络失败静默 */ }
  }
  return { id: tool.id, installed, localVersion, latestVersion, hasUpdate, rawOutput: ver.output || detect.error };
}

// ------- agent 技能状态检测 -------
const AGENT_SKILL_DIRS = {
  'claude-code': () => path.join(os.homedir(), '.claude', 'skills'),
  'codex': () => path.join(os.homedir(), '.codex', 'skills'),
  'claude-desktop': () => null, // 无技能目录，靠 marker 检测
  'opencode': () => path.join(os.homedir(), '.config', 'opencode', 'skills'),
  'cursor': () => path.join(os.homedir(), '.cursor', 'skills'),
};
const AGENT_MARKER_FILES = {
  'claude-code': () => [path.join(os.homedir(), 'CLAUDE.md')],
  'codex': () => [path.join(os.homedir(), '.codex', 'AGENTS.md'), path.join(os.homedir(), '.codex', 'config.toml')],
};

function agentSkillStatus(agent, skill) {
  // 已启用判定：skill.dir 在该 agent 的技能目录中存在，或 marker 文件中含 skill.marker 关键字
  const dirFn = AGENT_SKILL_DIRS[agent];
  if (dirFn) {
    const d = dirFn();
    if (d && existsSync(d)) {
      const target = path.join(d, skill.dir || '');
      if (skill.dir && existsSync(target)) return true;
      if (!skill.dir) {
        try {
          for (const f of readdirSync(d)) {
            const md = readFileSync(path.join(d, f, 'SKILL.md'), 'utf8').toLowerCase();
            if (skill.keywords && skill.keywords.some(k => md.includes(k.toLowerCase()))) return true;
          }
        } catch { /* 忽略 */ }
      }
    }
  }
  const mkFn = AGENT_MARKER_FILES[agent];
  const markers = mkFn ? mkFn() : [];
  return markers.some(m => {
    if (!existsSync(m)) return false;
    try {
      const c = readFileSync(m, 'utf8');
      return skill.keywords ? skill.keywords.some(k => c.toLowerCase().includes(k.toLowerCase()))
        : skill.marker ? c.includes(skill.marker) : false;
    } catch { return false; }
  });
}

// ---------------- IPC ----------------
ipcMain.handle('registry:load', async () => await fetchRegistry());
ipcMain.handle('tool:inspect', async (_e, tool) => await inspectTool(tool));
ipcMain.handle('tool:checkAllUpdates', async (_e, tools) => {
  return await Promise.all(tools.map(t => inspectTool(t).catch(e => ({ id: t.id, error: String(e) }))));
});
ipcMain.handle('skill:status', (_e, tool) => {
  const out = {};
  (tool.skills || []).forEach(s => {
    out[s.name] = {};
    (s.agents || []).forEach(a => { out[s.name][a] = agentSkillStatus(a, s); });
  });
  return out;
});

ipcMain.handle('tool:install', async (_e, tool) => {
  try {
    const inst = tool.install;
    let r;
    if (inst.type === 'ps1') {
      if (!IS_WIN) return { ok: false, output: '该安装方式仅支持 Windows，请参考主页的 macOS/Linux 安装命令' };
      const script = await httpGet(inst.url);
      const tmp = path.join(os.tmpdir(), `aihub-install-${tool.id}.ps1`);
      writeFileSync(tmp, script, 'utf8');
      r = await runCmd('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', tmp], 600000);
    } else if (inst.type === 'shell') {
      // macOS / Linux：bash -c 安装脚本
      const script = await httpGet(inst.url);
      const tmp = path.join(os.tmpdir(), `aihub-install-${tool.id}.sh`);
      writeFileSync(tmp, script, 'utf8');
      r = await runCmd('bash', [tmp], 600000);
    } else if (inst.type === 'npm') {
      r = await runCmd('npm', ['install', '-g', inst.pkg], 600000);
    } else if (inst.type === 'brew') {
      r = await runCmd('brew', ['install', inst.pkg], 600000);
    } else if (inst.type === 'cargo') {
      r = await runCmd('cargo', ['install', ...(inst.args || [inst.pkg])], 600000);
    } else {
      return { ok: false, output: `不支持的安装类型: ${inst.type}` };
    }
    return r;
  } catch (e) {
    return { ok: false, output: String(e.message) };
  }
});

ipcMain.handle('skill:install', async (_e, tool, skill) => {
  return await runCmd(skill.installCmd.split(' ')[0], skill.installCmd.split(' ').slice(1), 120000);
});

ipcMain.handle('shell:open', (_e, url) => shell.openExternal(url));
ipcMain.handle('app:platform', () => process.platform);

function createWindow() {
  const win = new BrowserWindow({
    width: 1240, height: 840, minWidth: 900,
    title: 'AI-Tools-Hub · 你的AI军火库',
    backgroundColor: '#0d1117',
    autoHideMenuBar: true,
    icon: path.join(__dirname, '..', 'assets', 'icon.ico'),
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false },
  });
  win.loadFile(path.join(__dirname, '..', 'src', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
