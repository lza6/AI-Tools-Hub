const { app, BrowserWindow, ipcMain, shell } = require('electron');
const { execFile, execFileSync } = require('child_process');
const { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, copyFileSync, createWriteStream } = require('fs');
const https = require('https');
const path = require('path');
const os = require('os');
const { autoUpdater } = require('electron-updater');
const logger = require('./logger');

// ------- 应用自更新（GitHub Releases）-------
function setupAutoUpdater(win) {
  autoUpdater.setFeedURL({ provider: 'github', owner: 'lza6', repo: 'AI-Tools-Hub' });
  autoUpdater.autoDownload = false; // 用户点"立即更新"再下载

  autoUpdater.on('update-available', (info) => {
    logger.info('self-update', `发现新版本 ${info.version}`);
    win.webContents.send('update:available', { version: info.version, releaseNotes: info.releaseNotes || '' });
  });
  autoUpdater.on('update-not-available', () => { logger.debug('self-update', '已是最新版本'); win.webContents.send('update:not-available'); });
  autoUpdater.on('download-progress', (p) => {
    win.webContents.send('update:progress', { percent: Math.round(p.percent), mb: (p.transferred / 1048576).toFixed(1), total: (p.total / 1048576).toFixed(1) });
  });
  autoUpdater.on('update-downloaded', () => { logger.info('self-update', '更新包下载完成'); win.webContents.send('update:downloaded'); });
  autoUpdater.on('error', (e) => { logger.error('self-update', `更新错误: ${e}`); win.webContents.send('update:error', String(e)); });

  autoUpdater.checkForUpdates().catch(() => {}); // 启动即静默检查
}

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
  logger.debug(`inspect:${bin}`, `检测 ${bin}: cmd=${tool.versionCmd}`);
  const [detect, ver] = await Promise.all([
    IS_WIN ? runCmd('where.exe', [bin]) : runCmd('which', [bin]),
    runCmd(tool.versionCmd.split(' ')[0], tool.versionCmd.split(' ').slice(1)),
  ]);
  const installed = detect.ok && ver.ok;
  const localVersion = installed ? extractVersion(ver.output) : null;
  logger.debug(`inspect:${bin}`, `where=${detect.ok}, version=${localVersion || '未检测到'}${installed ? '' : ` (raw: ${(ver.output || detect.error || '').slice(0, 200)})`}`);
  let latestVersion = null, hasUpdate = false;
  if (installed) {
    try {
      const tag = await getLatestReleaseTag(tool.repo);
      latestVersion = extractVersion(tag) || (tag ? tag.replace(/^v/, '') : null);
      hasUpdate = !!(localVersion && latestVersion && latestVersion !== localVersion);
    } catch (e) { logger.warn(`inspect:${bin}`, `更新检查失败: ${e.message}`); }
  }
  logger.info(`inspect:${bin}`, `结果: installed=${installed}, local=${localVersion || '-'}, latest=${latestVersion || '-'}, update=${hasUpdate}`);
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
ipcMain.handle('install:logs', (_e, id) => (installLogs[id] || []).join('\n'));
// 日志中心
ipcMain.handle('logs:query', (_e, opts) => logger.query(opts || {}));
ipcMain.handle('logs:dump', () => logger.dump());
ipcMain.handle('logs:file', () => logger.logDir());
ipcMain.handle('logs:clear', () => { logger.clearMem(); return true; });
ipcMain.handle('logs:openDir', () => { shell.openPath(logger.logDir()); return true; });

// 安装日志缓冲（黑匣子）：renderer 实时拉取，同时全量走 logger 落盘
const installLogs = {};
function logInstall(id, line) {
  if (!installLogs[id]) installLogs[id] = [];
  installLogs[id].push(`[${new Date().toLocaleTimeString()}] ${line}`);
  if (installLogs[id].length > 500) installLogs[id].shift();
  logger.info(`install:${id}`, line);
}
function runCmdLogged(id, cmd, args, timeout = 600000) {
  logInstall(id, `$ ${cmd} ${args.join(' ')}`);
  return new Promise(resolve => {
    const child = execFile(cmd, args, { timeout, windowsHide: true, maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      const out = (stdout || '').trim(), errOut = (stderr || '').trim();
      if (out) logInstall(id, out);
      if (errOut) logInstall(id, `[stderr] ${errOut}`);
      if (err) logInstall(id, `[exit 错误] ${err.message}`);
      resolve({ ok: !err, output: [out, errOut].filter(Boolean).join('\n'), error: err ? String(err.message) : null });
    });
  });
}

// github-release 直连安装：下载 repo 最新 release 的指定 asset 并安装到用户目录
async function installFromGithubRelease(id, repo, assetName, destDir, extract) {
  logInstall(id, `查询 GitHub Release: ${repo}`);
  const rel = JSON.parse(await httpGet(`https://api.github.com/repos/${repo}/releases/latest`));
  const asset = (rel.assets || []).find(a => a.name === assetName);
  if (!asset) throw new Error(`Release ${rel.tag_name} 中未找到资产 ${assetName}`);
  logInstall(id, `下载: ${asset.browser_download_url} (${(asset.size / 1048576).toFixed(1)} MB)`);
  const tmpDir = path.join(os.tmpdir(), `aihub-ghrel-${id}`);
  const zipPath = path.join(tmpDir, assetName);
  try { rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  mkdirSync(tmpDir, { recursive: true });
  await new Promise((resolve, reject) => {
    const file = createWriteStream(zipPath);
    https.get(asset.browser_download_url, res => {
      if (res.statusCode !== 200) return reject(new Error(`下载 HTTP ${res.statusCode}`));
      const total = +res.headers.content_length || asset.size;
      let done = 0;
      res.on('data', c => { done += c.length; logInstall(id, `下载中 ${(done / 1048576).toFixed(1)}/${(total / 1048576).toFixed(1)} MB`); });
      res.pipe(file); file.on('finish', () => { file.close(); resolve(); }); file.on('error', reject);
    }).on('error', reject);
  });
  logInstall(id, `解压到 ${tmpDir}`);
  if (assetName.endsWith('.zip')) {
    execFileSync('powershell.exe', ['-NoProfile', '-Command', `Expand-Archive -Path '${zipPath}' -DestinationPath '${tmpDir}\\unz' -Force`]);
  } else {
    execFileSync('tar', ['-xf', zipPath, '-C', path.join(tmpDir, 'unz_mkdir') && (mkdirSync(path.join(tmpDir, 'unz'), { recursive: true }), path.join(tmpDir, 'unz'))]);
  }
  // extract: { file: "rtk.exe", destDir, prependPath: true }
  const dest = extract.destDir || path.join(process.env.LOCALAPPDATA || os.homedir(), 'Programs', id);
  mkdirSync(dest, { recursive: true });
  const srcFile = findFileRecursive(path.join(tmpDir, 'unz'), extract.file);
  if (!srcFile) throw new Error(`解压后未找到 ${extract.file}`);
  copyFileSync(srcFile, path.join(dest, path.basename(srcFile)));
  logInstall(id, `已安装到 ${dest}`);
  if (extract.prependPath !== false) addUserPath(dest, id);
  return { ok: true, output: `已安装 ${extract.file} → ${dest}，已加入用户 PATH` };
}

function findFileRecursive(dir, name) {
  try {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, f.name);
      if (f.isDirectory()) { const r = findFileRecursive(p, name); if (r) return r; }
      else if (f.name === name) return p;
    }
  } catch {}
  return null;
}
function addUserPath(dir, id) {
  if (!IS_WIN) return; // mac/linux 安装脚本自己处理 PATH
  try {
    const up = process.env.PATH || '';
    execFileSync('powershell.exe', ['-NoProfile', '-Command',
      `$d='${dir}'; $u=[Environment]::GetEnvironmentVariable('Path','User'); if($u -notlike "*$d*"){ $parts=$u -split ';' | Where-Object {$_ -and $_ -ne $d}; [Environment]::SetEnvironmentVariable('Path', ($d+';'+($parts -join ';')), 'User'); 'PATH-ADDED' } else { 'PATH-EXISTS' }`], { windowsHide: true });
    logInstall(id, '已将安装目录加入用户 PATH（最前）');
  } catch (e) { logInstall(id, `[warn] PATH 写入失败: ${e.message}`); }
}

ipcMain.handle('tool:install', async (_e, tool) => {
  try {
    const id = tool.id;
    logInstall(id, `===== 开始安装 ${tool.name} =====`);
    // 分平台结构: install.{windows,macos,linux}，取当前平台，逐级回退
    const inst = tool.install?.[process.platform] || tool.install?.windows || tool.install?.linux || tool.install?.macos;
    if (!inst) { logInstall(id, `[错误] 清单中缺少 ${process.platform} 平台的安装配置`); return { ok: false, output: `清单中缺少 ${process.platform} 平台的安装配置` }; }
    logInstall(id, `安装方式: ${inst.type} ${inst.pkg || inst.asset || inst.url || ''}`);
    let r;
    if (inst.type === 'github-release') {
      r = await installFromGithubRelease(id, tool.repo, inst.asset, inst.destDir, { file: inst.file, prependPath: true });
    } else if (inst.type === 'ps1') {
      if (!IS_WIN) return { ok: false, output: '该安装方式仅支持 Windows' };
      const script = await httpGet(inst.url);
      const tmp = path.join(os.tmpdir(), `aihub-install-${tool.id}.ps1`);
      writeFileSync(tmp, script, 'utf8');
      r = await runCmdLogged(id, 'powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', tmp], 600000);
    } else if (inst.type === 'shell') {
      const script = await httpGet(inst.url);
      const tmp = path.join(os.tmpdir(), `aihub-install-${tool.id}.sh`);
      writeFileSync(tmp, script, 'utf8');
      r = await runCmdLogged(id, 'bash', [tmp], 600000);
    } else if (inst.type === 'npm') {
      r = await runCmdLogged(id, 'npm', ['install', '-g', inst.pkg], 600000);
    } else if (inst.type === 'brew') {
      r = await runCmdLogged(id, 'brew', ['install', inst.pkg], 600000);
    } else if (inst.type === 'winget') {
      const wingetExe = path.join(process.env.LOCALAPPDATA || '', 'Microsoft', 'WindowsApps', 'winget.exe');
      const exe = existsSync(wingetExe) ? wingetExe : 'winget';
      r = await runCmdLogged(id, exe, ['install', inst.pkg, '--source', 'winget', '--accept-source-agreements', '--accept-package-agreements', '--silent', '--disable-interactivity'], 600000);
    } else if (inst.type === 'cargo') {
      r = await runCmdLogged(id, 'cargo', ['install', ...(inst.args || [inst.pkg])], 600000);
    } else {
      r = { ok: false, output: `不支持的安装类型: ${inst.type}` };
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
ipcMain.handle('app:version', () => app.getVersion());
ipcMain.handle('update:download', () => autoUpdater.downloadUpdate());
ipcMain.handle('update:install', () => { autoUpdater.quitAndInstall(); });

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
  setupAutoUpdater(win);
}

app.whenReady().then(() => {
  logger.init();
  logger.info('app', `AI-Tools-Hub 启动 v${app.getVersion()} (${process.platform})`);
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
