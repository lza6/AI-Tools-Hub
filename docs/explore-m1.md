# M1 扫描：D:\参考项目\ 选品扫描（Claude Code 生态向）

> 方法：ls + README 头部批量扫描。选品重点：可一键安装的 CLI / MCP / Skills / 桌面工具；排除纯 Web 平台、教程、合集、重复副本。
> 日期：2026-05-08 会话

## 全量清单

| 名称 | 类型 | 功能 | 安装方式 | 上架?(是/否+理由) |
|---|---|---|---|---|
| Claude-Code-Everything-You-Need-to-Know | 教程合集 | Claude Code 全流程指南 + mcp-servers/agents 资源目录 | n/a | 否——纯教程/资源合集，无可装工具 |
| Claude-Code-Source-Study | 教程 | 34 章 Claude Code 源码逐行分析 | n/a | 否——纯文档 |
| Claudable | 桌面工具 | Electron+Next.js，连接 CLI Agent 构建/部署 Web 应用 | npm install + electron | 候选——类 Lovable 开源桌面端，体积大但可装 |
| Claude-Code-Agent-Monitor | 监控面板 | Node/React/SQLite 实时监控 Claude Code/Codex 会话与 hook | npm / Docker | 候选——但偏自部署面板 |
| claudecodeui (CloudCLI) | Web UI | Claude Code 网页/桌面管理界面，npm 有 bin | `npm i -g @cloudcli-ai/cloudcli` | 是——已发 npm，一键装 CLI 入口 |
| claudecode-main | CLI | Rust 重写的 ClaudeCode 终端 agent | cargo build | 否——需自编译，非一键 |
| claw-code-main | CLI | 同上，Rust Claw Code 重写（重复副本） | cargo build | 否——与 claudecode-main 重复，需编译 |
| clawdeck | 桌面面板 | Claude Code 本地 dashboard：会话/事件/成本/worktree，零依赖 loopback | `npx clawdeck-panel`（npm 已发） | 是——npm 一键装，轻量本地监控 |
| ClaudeSkills | 技能合集 | 13 个 SKILL.md 格式技能包（中文） | 复制到 skills 目录 | 否——技能合集非独立工具，可拆单卖 |
| ClawX | 桌面工具 | OpenClaw Agent 的 Electron 桌面界面（Win/Mac/Linux） | GitHub Releases 安装包 | 是——下载即用桌面端 |
| ClawLabsAI__free-ai-models | 数据/CLI | 每日免费 LLM API 排名数据 + 脚本 | npm scripts | 否——数据集为主，工具属性弱 |
| Continuous-Claude-v3-main | 框架 | 109 skills/32 agents/hooks 的持续学习 Claude Code 环境 | git clone 配置 | 否——重型框架非一键安装 |
| Comando | 桌面工具 | local-first 多 Agent 编码工作台（Electron+Rust） | 源码构建 | 否——GPL-3 且需构建，无发布包 |
| CodeStable | 技能合集 | 8 个编码 skill 契约（边界/证据/记忆，中文） | 复制 skills | 否——技能合集，可拆单 |
| Coding-Doctor-Omar__reddrix | CLI/库 | Reddit 异步爬虫（无登录无 API key）`pip install reddrix` | pip | 是——PyPI 一键装，独立实用工具 |
| Compartment | MCP | 加密离线 Agent 记忆 vault，多客户端 MCP | `pip install compartment` | 是——PyPI 一键装，MCP 零依赖零遥测 |
| Citadel | 框架 | Claude Code/Codex 操作层：路由/状态/并行协调 | Node 22+ 安装 | 候选——但重且偏框架 |
| CubeSandbox | 沙箱服务 | AI Agent 秒级并发安全沙箱（腾讯） | Docker/k8s 部署 | 否——基础设施级部署重；且 CubeSandbox 与 TencentCloud__CubeSandbox 重复 |
| TencentCloud__CubeSandbox | 同上 | 同上 | 同上 | 否——重复副本 |
| CyberStrike | CLI | 多语言 AI 安全/渗透 agent | pip/安装 | 候选——需确认安全边界后上架 |
| AIPentest__CyberStrikeAI | CLI | Go 版 AI 原生安全运营（MCP+RAG+工作流） | 一条命令部署 | 候选——类“渗透平台”，需授权审查 |
| CyberStrikeAI(AIPentest__CyberStrikeAI) | - | 空目录/重复 | - | 否——空目录 |
| DeepDeck | 桌面工具 | DeepSeek Harness 桌面客户端，浏览器+WebMCP 工具沉淀 | GitHub Releases（Mac） | 候选——仅 Mac 发布 |
| DeepTutor / HKUDS__DeepTutor | Web 应用 | 终身个性化 AI 家教（Next.js+Python） | Docker Compose | 否——重 Web 应用且三份重复副本 |
| DeepTutor-main | 同上 | 同上 | 同上 | 否——重复副本 |
| DeusData__codebase-memory-mcp | MCP | 代码库记忆/检索 MCP server | `uvx`/pip MCP 安装 | 是——标准 MCP 一键接入 |
| Done-0__fuck-u-code | CLI | Go 代码质量扫描器（中文友好） | `go install` / brew | 是——一键装，独立 CLI，趣味品牌好卖 |
| ECC | 框架 | “agent harness 操作系统”（插件/代理编排框架） | 安装脚本 | 候选——用户本机在用，重框架 |
| Ebony-Vinyl__dsh-our-free-model | 插件 | DeepSeek Harness 免费模型插件（零依赖无构建） | 复制安装 | 候选——平台绑定 dsh |
| EcomAgent | 平台 | 电商运营 Agent Runtime（FastAPI+React） | Docker | 否——重平台非工具 |
| Elysia-Api-for-Koishi | 插件 | Koishi AI 模型网关（多上游统一） | `npm i koishi-plugin-elysia-api` | 候选——依赖 Koishi 生态，受众窄 |
| EmpiricaAI__empirica | CLI/库 | AI 认知校准基础设施（测量/记忆）`pip install empirica` | pip | 候选——概念较抽象 |
| EnsoAI-main | 桌面工具 | 多 Agent 并行 worktree 管理（Claude/Gemini/Codex） | 桌面安装包 | 是——多 Agent 并行编排，需求旺 |
| Entelligence-AI__agentplay | CLI | 回放 agent 会话为地图+时间线，多 IDE 支持 | `uvx agentplay` | 是——一条命令，本地隐私，亮点强 |
| Ephemeral-AI-Lab__layerfs | - | 无 README | - | 否——空/无文档 |
| EverOS-main | 框架 | 长时程 Agent 环境与自进化 | 源码 | 否——研究型框架 |
| EveryInc__compound-engineering-plugin | 技能插件 | 工程复合技能插件包 | Claude Code 插件安装 | 是——插件市场一键装 |
| EpicInfographics | Skill | 教 Agent 做非模板化信息图 | skill 安装 | 是——单 skill，可一键装、差异化强 |
| EvoSkill-main | 框架 | 自动 skill 归纳（论文配套） | 研究代码 | 否——研究项目（已跳过） |
| Fabric | CLI | 海量 AI prompt 模式 CLI（Daniel Miessler 知名项目） | 安装脚本 | 候选——知名但体量大、生态成熟 |
| FailproofAI__failproofai | 工具 | failproof AI 测试/防错工具（TS） | npm | 候选——需进一步看用法 |
| FankChen__tracecrate | Web/CLI | 隐私优先 AI trace 工作台（客户端） | Pages/构建 | 否——偏 web 工作台 |
| Fission-AI__OpenSpec | CLI | 规格驱动开发 CLI | npm（已上架跳过） | 否——已上架 |
| Flagsmith__flagsmith | 平台 | 特性开关平台 | Docker/K8s | 否——大型 Web 平台 |
| Forget-C__Jellyfish / Jellyfish | Web 应用 | AI 短剧工作室（React+Vite） | 构建 | 否——重 Web 应用且重复副本 |
| Forsy-AI__biosecurity-agent | CLI | 生物安全 agent harness | `npx @forsy/biosecurity-agent` | 是——npx 一键，但领域敏感需审查 |
| Foundry | 平台 | AI 数字公司协作平台 | Docker | 否——重平台 |
| FreeToken | 框架 | FlashML token/模型相关 | 源码 | 否——文档信息不足，偏研究 |
| FunnyWolf__Viper | - | 无 README | - | 否——空/无文档 |
| Gathin23__cleanyourtv | 工具 | Android TV 去广告/精简启动器 | 网页引导 | 否——TV 工具，与 AI 市场不符 |
| GhostTrack | CLI | OSINT 手机号/定位追踪 | git clone + python | 否——灰色地带（OSINT 追踪），风险高 |
| GitHub仓库下载工具 | - | 空目录 | - | 否——空 |
| GitNexus / GitNexus-main | MCP/库 | 代码库知识图谱（重复副本） | npx/浏览器 | 候选——单份即可，重复 |
| GhalebDweikat__winnow | CLI | Claude Code 上下文筛子：大输出先摘要再进上下文 | 安装配置 | 是——直击 token 痛点，可一键装 |
| gbrain | CLI/库 | 个人知识脑层，检索/图谱/缺口分析，接 Claude Code | 一条命令接入 | 是——YC CEO 作品，热度高，一键接入 |
| gbrain-master | 同上 | 同上（变体副本） | 同上 | 否——重复副本 |
| harness-sdk | SDK | Strands Agents 模型驱动 agent SDK | pip | 否——开发者 SDK 非终端工具 |
| harnesscode-master | 框架 | Human-in-the-loop 开发框架 | 安装 | 候选——需验证 |
| headcount | 技能合集 | 16 部门 172 skills 虚拟部门包 | 安装到 Claude Code | 候选——大体量技能包，可拆 |
| hive | 桌面/Web | 本地多 Agent 团队工作台（Orchestrator+PTY workers） | 本地启动 | 是——多 Agent 协作可视化，需求旺 |
| holaOS / holaOS-main | 桌面平台 | Agent 长时程工作环境/自进化（重复副本） | 桌面安装 | 候选——偏平台，二份重复 |
| HyperDX(hyperdx) | - | 无 README | - | 否——空/无文档 |
| ImmersiveTranslate | - | 无 README | - | 否——空 |
| Infographic | 框架 | antv 信息图生成渲染框架 | npm | 候选——JS 库非 AI 工具 |
| InkNote | 桌面工具 | 本地优先 Markdown 编辑器 | Releases 安装包 | 候选——非 AI 工具，但桌面可装 |
| InsForge / insforge-main | 平台 | agentic coding 后端平台（重复副本） | npm/docker | 否——重平台且重复 |
| Interlace | CLI | 命令行工具转多线程（安全测试用） | pip | 候选——老牌安全工具，受众偏渗透 |
| Ix | CLI | 代码库持久系统图，结构化查询替代 grep | CLI 安装 | 是——与 codegraph 类似的痛点工具 |
| JIT | 研究框架 | Just-in-Time harness 进化（论文） | 源码 | 否——研究项目 |
| JSQLParser__JSqlParser | Java 库 | SQL 解析为 Java 对象树 | Maven | 否——Java 库，非 AI 市场品类 |
| Jakeschincariol__replica-skill | Skill 合集 | 11 个技能：克隆任意 App（逆向/重建/测试/修错） | 复制 skills | 是——技能包卖点强，MIT 免费 |
| Jamailar__Beav | - | 无 README | - | 否——空 |
| JeecgBoot / jeecgboot__JeecgBoot | 低代码平台 | AI 低代码平台 | 部署 | 否——大型低代码平台且重复 |
| JeffBox | 桌面工具 | 450KB 单文件 Windows 工具箱（Todo/笔记/启动器） | 下载 exe | 候选——非 AI，但 Windows 用户友好 |
| Johnshall__Shadowrocket-ADBlock-Rules-Forever | 规则集 | iOS Shadowrocket 去广告规则 | 订阅链接 | 否——规则订阅，非工具 |
| JuliusBrussee__caveman | CLI | 让 AI agent 少输出省 token 的 CLI | `npm i @caveman-ai/cli` | 否——已上架（用户标注跳过） |

## TOP3（本期推荐上架）

### 1. Entelligence-AI__agentplay — 会话回放
**安装命令原文：**
```bash
uvx agentplay
```
自动发现本机 Claude Code/Codex/Cursor/Copilot/OpenCode/Kiro 会话，生成脱敏回放（地图+时间线），本地无账号无 Key。痛点直击、安装成本为零。

### 2. GhalebDweikat__winnow — 上下文筛子
针对 Claude Code 的 Read/Bash/Grep 大输出：低置信块被替换为 3 行摘要 + 恢复 key，省 token 且可还原。安装为 Claude Code hook/CLI，痛点高频。

### 3. gbrain — 个人知识脑层
```bash
# 快速接入 Claude Code / Codex 作为检索层（一条命令）
gbrain connect claude-code   # 具体子命令以 README quick start 为准
```
YC CEO 作品，检索+图谱+缺口分析一体；PGLite 免数据库服务，~30 分钟跑通。注意 gbrain 与 gbrain-master 为重复副本，上架取一份。

## 备注
- 空目录/无 README：Ephemeral-AI-Lab__layerfs、FunnyWolf__Viper、Flagsmith__flagsmith、CyberStrikeAI(...)、GitHub仓库下载工具、HyperDX、ImmersiveTranslate、Jamailar__Beav —— 待确认是否下载失败。
- 涉及安全/OSINT 灰色领域（GhostTrack、CyberStrike 系列、Interlace、biosecurity-agent）上架前需合规审查。
- 重复副本需只留一份：claudecode-main/claw-code-main、DeepTutor×3、GitNexus×2、gbrain×2、holaOS×2、InsForge×2、JeecgBoot×2、Jellyfish×2、CubeSandbox×2。
