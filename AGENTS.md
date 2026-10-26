# AGENTS.md — AI / 智能体贡献者须知

处理本仓库的提交 / 推送 / PR / Issue 任务前，必须遵守以下硬性规则。

## 硬性规则

1. **先读记忆再动手**：用 `icm recall "ai-tools-hub <主题>"` 查历史决策与踩坑，避免重复犯错
2. **真实闭环**：所有"已完成"必须有运行证据（命令+输出）；禁止只看进程存活就宣称功能可用
3. **安装类功能必须命令行实测**：manifest 里每条安装方式，必须在本机真实跑通一次才可合入（icm install.ps1 / rtk 走 github-release 直装都曾因未实测而翻车）
4. **数据结构变更全链路同步**：改 manifest 结构（如 install 分平台）时，必须 grep 所有消费方（main.js IPC handler、index.html 渲染）同步修改
5. **manifest.json 合入前必须 `JSON.parse` 校验**
6. **启动前先冒烟**：`node -e "require('./electron/main.js')"` 快速发现语法错误（历史上括号错导致白屏）
7. **Windows 规则**：禁止 .sh 脚本；winget 不在 PATH，用 `%LOCALAPPDATA%\Microsoft\WindowsApps\winget.exe` 全路径或加 --source winget
8. **网络注意**：本机网络 GitHub 直连不稳定——Electron 二进制下载用 `ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/`；winget 源可能 0x80072efd 不可用，安装类工具优先 github-release 直连
9. **禁止**：force push、删测试凑绿、TODO 顶替实现、文档写理想状态而代码是另一状态
10. **提交规范**：Conventional Commits（feat/fix/refactor/docs/chore），发版打 tag vX.Y.Z 触发三平台 CI

## 发布流程（release-checklist）

1. 本地 `npm run dist` 构建 portable exe 到 `dist/`，双击启动冒烟
2. 更新 package.json version → commit
3. `git tag vX.Y.Z && git push origin main vX.Y.Z` → 三平台 CI 自动构建发布到 GitHub Releases
4. Release 产物核对：win portable+nsis / mac dmg / linux AppImage+deb / latest.yml（自更新通道）
5. 更新 README 与本文件（如有流程变化）

## 项目速览

```
AI-Tools-Hub/
├─ electron/main.js      # 主进程: IPC(检测/安装/技能/设置/自更新) + electron-updater
├─ electron/logger.js    # 日志: 4级 + userData/logs 按天+2MB轮转+7天保留
├─ electron/preload.js   # contextBridge 暴露 aihub API
├─ src/index.html        # 渲染层: 工具广场/日志中心双页, 三主题
├─ registry/manifest.json # 工具清单(远程可更新): type/category/usage/conflicts/分平台install
├─ assets/               # logo + icon.ico
└─ .github/workflows/release.yml # tag 触发三平台构建
```
