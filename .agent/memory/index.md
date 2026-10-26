# 记忆索引 — AI-Tools-Hub

> 每次 AI 会话开始先读本文件；过时则更新，避免重复踩坑。

## verified-scope（已验证项）
| 项 | 命令/方法 | 结果 | 时间 |
|---|---|---|---|
| rtk 升级 0.30.1→1.1.0 | 应用内一键安装（镜像链路） | 成功，rtk.exe 落位 Programs/rtk | 2026-10-26 |
| Playwright CDP 截图验证 | electron --remote-debugging-port=9222 + python playwright | 三页 UI 全部确认可用 | 2026-10-26 |
| 镜像可达性 | gh-proxy.com / ghfast.top（.NET 栈测） | 双 200 | 2026-10-26 |
| portable exe | dist/AI-Tools-Hub 1.1.0.exe 双击 | 可启动 | 2026-10-26 |
| 主题持久化 | userData/settings.json | 修复 localStorage 丢失问题 | 2026-10-26 |

## known-issues（已知问题）
1. **用户网络直连 GitHub 不稳**（ECONNRESET/ETIMEDOUT/302 现象）——已由镜像回退链解决，但新代码需重启应用生效
2. 用户 PATH 中 `.cherrystudio\bin\rtk.exe`(0.30.1) 排在新装 1.1.0 之前——终端里 `rtk --version` 可能仍显旧版
3. winget 源在此网络不可用（0x80072efd）——避免用 winget 类型，优先 github-release
4. curl/Node 走 127.0.0.1:10808 代理会失败（代理对非系统栈不工作）；PowerShell/.NET 栈正常

## decisions（关键决策）
- 安装类型优先级：github-release > 官方脚本 > winget/brew/npm（网络可靠性实测排序）
- 日志唯一真相源是日志中心页（黑匣子面板已删）；文件落盘 userData/logs 按天+2MB 轮转+7天保留
- 设置持久化用 userData/settings.json 而非 localStorage（file:// 下不可靠）
- 图标: win=icon.ico(270KB)，mac/linux=logo-512.png（electron-builder 要求≥512px）

## audit-history
- 2026-10-26: P0 白屏（重复 let registry）修复 + 建立 Playwright 截图验证流程
- 2026-10-26: 安装链路三次翻车（install.type 未同步分平台 / rtk 无 install.ps1 / winget 网络不可用）→ 教训沉淀至 AGENTS.md

## change-index
- electron/main.js: IPC(检测/安装/技能/设置/自更新) + 镜像回退链 + 日志埋点
- electron/logger.js: 4级日志+轮转
- src/index.html: 广场+日志中心双页, 三主题, usage 展示
- registry/manifest.json: v3 结构（type/category/usage/conflicts/分平台install）
- .agent/skills/add-new-tool.md: 一键加工具 SOP
