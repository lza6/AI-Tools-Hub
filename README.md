# AI-Tools-Hub

> 你的AI军火库 · CLI 工具 / MCP / 技能一站式安装与更新

AI 军火库市场：浏览工具卡片 → 检测本地安装 → 检查更新 → 一键安装/升级 → 启用配套技能（Claude Code / Codex）。

## 功能

- **精美卡片广场**：每个工具展示名称、描述、解决什么问题、能力标签、主页链接
- **本地已装检测**：自动探测 PATH 中的二进制与本地版本
- **更新检查**：比对 GitHub Releases 最新版本，标出可更新项
- **一键安装/升级**：下载官方安装脚本（SHA256 校验）并执行
- **技能管理**：每个工具的配套技能（如 `icm init`、`rtk init`）一键启用到 Claude Code / Codex
- **远程清单**：`registry/manifest.json` 托管在本仓库，支持后续自定义 registry URL

## 内置工具

| 工具 | 说明 |
|------|------|
| [ICM](https://github.com/rtk-ai/icm) | LLM 持久记忆：跨会话记忆、语义召回、知识图谱 |
| [RTK](https://github.com/rtk-ai/rtk) | CLI 代理：压缩命令输出，节省 50-90% token |

## 开发

```bash
npm install
npm start          # 启动应用
npm run dist       # 打包 Windows 可执行文件
```

## 添加新工具

编辑 [`registry/manifest.json`](registry/manifest.json)，按现有字段添加一条（id / repo / description / capabilities / solves / install / versionCmd / skills），推送后所有客户端自动获取。

## 发版

推送 tag 即自动构建并发布到 GitHub Releases：

```bash
git tag v1.0.0 && git push origin v1.0.0
```
