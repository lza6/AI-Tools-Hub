// 统一日志系统：等级 + 文件落盘 + 按天/大小轮转
const { app } = require('electron');
const { mkdirSync, appendFileSync, readdirSync, statSync, unlinkSync, readFileSync } = require('fs');
const path = require('path');

const LEVELS = { DEBUG: 10, INFO: 20, WARN: 30, ERROR: 40 };
const MAX_FILE_BYTES = 2 * 1024 * 1024; // 单文件 2MB 触发轮转
const MAX_KEEP = 7;                      // 最多保留 7 个文件
const RETENTION_DAYS = 7;                // 且最多保留 7 天

let logDir = null;
let minLevel = LEVELS.DEBUG; // 生产最详细
let memBuf = [];             // 内存环形缓冲（UI 实时读取，最多 2000 条）
const MEM_MAX = 2000;

function init() {
  logDir = path.join(app.getPath('userData'), 'logs');
  try { mkdirSync(logDir, { recursive: true }); } catch {}
  rotateByAge();
}

function logfile(date = new Date()) {
  const d = date.toISOString().slice(0, 10);
  return path.join(logDir, `aihub-${d}.log`);
}

// 按大小轮转：超 2MB → aihub-<date>.1.log, .2.log …
function rotateIfNeeded(file) {
  try {
    const st = statSync(file);
    if (st.size < MAX_FILE_BYTES) return;
    for (let i = MAX_KEEP - 1; i >= 1; i--) {
      const src = i === 1 ? file : file.replace(/\.log$/, `.${i - 1}.log`);
      const dst = file.replace(/\.log$/, `.${i}.log`);
      try { if (i === 1 || statSync(src)) { try { unlinkSync(dst); } catch {} require('fs').renameSync(src, dst); } } catch {}
    }
  } catch { /* 文件不存在 */ }
}

// 按年龄清理：删超过 7 天的日志
function rotateByAge() {
  try {
    const cutoff = Date.now() - RETENTION_DAYS * 86400000;
    for (const f of readdirSync(logDir)) {
      if (!f.startsWith('aihub-') || !f.endsWith('.log')) continue;
      const p = path.join(logDir, f);
      if (statSync(p).mtimeMs < cutoff) { try { unlinkSync(p); } catch {} }
    }
    // 数量上限兜底
    const files = readdirSync(logDir).filter(f => f.startsWith('aihub-')).sort();
    while (files.length > MAX_KEEP * 2) { try { unlinkSync(path.join(logDir, files.shift())); } catch { break; } }
  } catch {}
}

function log(level, tag, message) {
  const lv = LEVELS[level] ?? LEVELS.INFO;
  const entry = {
    t: new Date().toISOString(),
    level, tag,
    msg: String(message).slice(0, 4000),
  };
  memBuf.push(entry);
  if (memBuf.length > MEM_MAX) memBuf.shift();
  if (lv < minLevel) return;
  try {
    const file = logfile();
    rotateIfNeeded(file);
    appendFileSync(file, `${entry.t} [${level}] [${tag}] ${entry.msg}\n`, 'utf8');
  } catch { /* 落盘失败不影响主流程 */ }
}

const logger = {
  init,
  debug: (tag, m) => log('DEBUG', tag, m),
  info: (tag, m) => log('INFO', tag, m),
  warn: (tag, m) => log('WARN', tag, m),
  error: (tag, m) => log('ERROR', tag, m),
  // UI 查询：等级过滤 + 关键字/tag 过滤 + 条数
  query: ({ level = 'DEBUG', tag = '', keyword = '', limit = 500 } = {}) => {
    const min = LEVELS[level] ?? 10;
    return memBuf.filter(e =>
      (LEVELS[e.level] ?? 20) >= min &&
      (!tag || e.tag === tag) &&
      (!keyword || e.msg.toLowerCase().includes(keyword.toLowerCase()))
    ).slice(-limit);
  },
  logDir: () => logDir,
  clearMem: () => { memBuf = []; },
  // 导出当前缓冲为文本
  dump: () => memBuf.map(e => `${e.t} [${e.level}] [${e.tag}] ${e.msg}`).join('\n'),
  readRecent: (lines = 300) => {
    try {
      const c = readFileSync(logfile(), 'utf8');
      return c.split('\n').slice(-lines).join('\n');
    } catch { return ''; }
  },
};

module.exports = logger;
