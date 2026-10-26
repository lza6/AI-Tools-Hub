# AI-Tools-Hub 上架调研 — A/B/C 三组（1677 目录中分派的三组）

> 调研方法：逐项目读取 README 头部 + 检查 package.json/Cargo.toml/pyproject.toml/go.mod 判定形态与安装方式。
> 评判维度：一键安装可行性 / 对 AI 编程增益 / 与已有工具（icm、rtk、claude-mem、code-review-graph、context-mode）互补不重复。

---

## A 组：agent 编排与团队类

| 名称 | 类型 | 一句话功能 | 安装方式 | 值得上架? |
|---|---|---|---|---|
| agent-orchestrator (Untrivial-ai) | 平台/桌面应用 | Plan-run-supervise 编码 agent，Kanban 看板跟踪 worker/PR/CI | binary(release)/npm | 是 — 一键安装可行（release 下载），并行 agent 监督场景与现有工具互补 |
| agent-orchestrator-main (ComposioHQ) | CLI/平台 | 并行 AI agent 各自 git worktree，自动修 CI、回应 review、开 PR | npm(@composio/ao) | 是 — npm 一键装，worktree 隔离编排是独特卖点 |
| Untrivial-ai__agent-orchestrator | 平台/桌面应用 | 同 agent-orchestrator（Untrivial-ai 官方版） | binary/npm | 否 — 与上面重复，上架一份即可 |
| OrchestratorInc__agent-orchestrator | — | 空目录/无 README | 无 | 否 — 无内容 |
| dsh-agent-teams | 技能/插件 | 把 DeepSeek Harness 会话变成 captain+子 agent 团队，13 个协调工具+Web UI | npm(@nanmicoder/dsh-agent-teams) | 否 — 绑定 DeepSeek Harness 生态，受众窄；若用户群有 DSH 用户可备选 |
| agent-teams-ai | 桌面应用(Electron) | 免费 AI agent 团队桌面应用，可接 Claude Code/Codex/Cursor 等多种后端 | binary(release) | 备选 — Electron 桌面形态，与 AI-Tools-Hub 自身定位部分重叠 |
| ccteam | CLI(Rust) | 把 Claude Code/Codex/Grok/Kimi 等多厂商 CLI 组成一个团队，跨机调度，Telegram/Lark 遥控 | cargo/binary | 备选 — 很强但偏 macOS/Linux/WSL，Windows 原生支持弱 |
| three-man-team-main | 技能 | Architect/Builder/Reviewer 三角色纪律化协作技能包 | 脚本(setup) | 是 — 纯技能、零依赖、一键装进 Claude Code，与编排类不重复 |
| dagoSte__squadra | 技能/插件 | Claude Code+Codex+Cursor 协作团队，带证据审查和本地 dashboard | pip/skill | 否 — 仅 macOS/POSIX，Windows 用户装不上 |
| crewAI (及 crewAI-main，重复) | 库 | Python 多 agent 编排框架（业界最知名之一） | pip | 否 — 是写代码用的框架库，不是开发者"装了就增益"的日常工具 |
| autogen-main | 库 | Microsoft 多 agent 应用框架（已并入 Agent Framework 维护态） | pip | 否 — 同上，框架库非增益工具；且进入维护模式 |
| swarms | 库 | Python 企业级多 agent 编排框架 | pip | 否 — 框架库，非日常增益工具 |
| HKUDS__AutoSwarm | 平台 | 统一多 agent 的上下文/记忆/工具层 | pip | 否 — 面向研究/平台场景，安装重、与一键工具定位不符 |
| OpenSwarm-main | CLI(TUI) | 用 Claude Code 编排多个 worker/reviewer 处理 Linear issue，Discord 汇报 | npm(@intrect/openswarm) | 备选 — npm 一键装且好用，但强依赖 Linear/Discord 工作流 |
| agent-swarm | 平台(Docker) | 企业级 lead-agent 分派 worker 到隔离容器，Slack/issue→PR | docker/npm | 否 — Docker 编排重，企业部署形态，不适合一键装 |
| multi-agent-deep-researcher | Langflow 工作流 | 基于 Langflow 的多 agent 深度研究可视化工作流 | 无(JSON 导入) | 否 — Langflow 依赖 + 单 JSON 文件，形态不适合上架 |
| open-multi-agent-main | 库(TS) | 一次 runTeam() 从目标到结果的多 agent TS 框架 | npm | 备选 — 极轻(3 依赖)，但是库不是 CLI 工具 |
| ruvnet__ruflo / ruflo / ruflo-main | CLI+平台 | claude-flow 系：AI 编排平台，swarm/spawn/agentdb | npm(ruflo / claude-flow) | 是 — npx 一键可用、活跃度高，与 claude-flow 同源生态；三目录取一上架 |
| (A 组重复目录统计：crewAI×2、ruflo×3、agent-orchestrator×3 → 实际独立项目约 16 个) | | | | |

---

## B 组：Claude/agent 生态插件类

| 名称 | 类型 | 一句话功能 | 安装方式 | 值得上架? |
|---|---|---|---|---|
| claude-octopus | CLI/技能 | 12 家外部模型(Codex/Grok/Ollama…)接入 Claude Code 做共识审查与辩论 | npm | 是 — 多模型共识 gate 独特，npm 一键装，与 icm/claude-mem 不重叠 |
| claude-plugins-community | 技能市场(镜像) | Anthropic 官方社区插件 marketplace 只读镜像 | 无(市场数据) | 否 — 是目录数据不是工具，可作为上架源参考 |
| claude-plugins-official-main | 插件目录 | Anthropic 官方 Claude Code 插件目录 | 无(目录) | 否 — 同上，参考源非工具 |
| everything-claude-code-main | 工具集(插件) | ECC 全家桶：agents/skills/hooks/agentshield，含 ecc-universal npm 包 | npm(ecc-universal) | 是 — 用户已在用 ECC 体系，一键装 ecc-universal 即得全套 |
| HolyClaude | Docker 平台 | Claude Code 的自托管 Docker 化 Web 运行环境 | docker | 否 — Docker 重部署，形态不符一键安装定位 |
| claude-code-unified-agents | 技能包 | 54 个生产级 sub-agent 合集（开发/基建/质量/AI 等域） | 脚本复制 | 是 — 纯 .md 技能，复制即用，与现有 agent 生态互补 |
| awesome-claude-code-main | 资源目录 | Awesome list：Claude Code 资源聚合（含 pyproject 工具脚本） | 无(目录) | 否 — 目录非工具；作为选品素材库更有价值 |
| claude-devtools | 桌面应用(Electron) | 读 Claude Code 会话 transcript、检视工具调用、token 用量的调试器 | npm/binary | 是 — "看见 Claude 干了什么"，与 claude-mem(记忆)完全互补，同为 Electron 亲缘 |
| claude-hud-main | 插件 | 状态条：实时显示 context 占用/活动工具/agent/todo 进度 | 插件市场命令 | 是 — Claude Code 内两行命令装，增益直接可见 |
| ccstatusline-main | CLI | 高度可定制的 Claude Code 状态行 formatter | npm/bunx | 是 — npx 一键配置，轻量无依赖 |
| cc-switch | 桌面应用(Tauri) | Claude Code/Codex/Gemini CLI 等多工具供应商配置一键切换管理器 | binary(release) | 是 — Windows/macOS/Linux 全平台，Tauri 小巧，解决多账号/多供应商痛点 |
| claude-squad-main | CLI(Go) | 终端管理多个 Claude Code/Codex/Gemini 实例，各自隔离 git workspace | binary(go install) | 是 — Go 单二进制，Windows 可用，背景任务+yolo 模式独特 |
| cmux (及 manaflow-ai__cmux，重复) | 桌面应用(macOS) | Ghostty 系终端，竖 tab + agent 通知 | binary(dmg) | 否 — macOS 专属，Windows 用户装不上 |
| oh-my-hermes (salomondiei08) | 技能包 | Hermes Agent 的 36 技能+7 agent 工作流层（OMZ之于zsh） | 脚本(install.sh) | 否 — 绑定 Hermes Agent 生态；若有 Hermes 用户可备选 |
| hermes-agent-main | CLI/Agent | Nous Research 自我改进型 agent（技能自学习+跨会话记忆） | pip/npm | 备选 — 本身是独立 agent 平台不是增益插件；与"给 Claude Code 增益"定位不符 |
| witt3rd__oh-my-hermes | 技能包 | OMH 多 agent 技能移植到 Hermes（共识规划/需求面谈/验证执行） | pip/uv | 否 — Hermes 专属生态 |
| opencode-ai__opencode | CLI(Go) | 已归档，改名 Crush 继续开发 | — | 否 — 已归档，应直接上架 Crush 而非此项目 |
| qwen-code-main | CLI | Qwen 官方终端 AI 编码 agent（Gemini CLI 分支） | npm(@qwen-code/qwen-code) | 是 — npm 一键装，国内用户友好，作为多 agent 后端价值大 |
| zai-org__ZCode | 平台+CLI | 智谱 AI 编程工作台：桌面/浏览器/终端 Agent 全家桶 | npm/binary | 备选 — 体量大偏平台；CLI 部分可选上架 |

---

## C 组：安全/审计/扫描类（开发者日常向，已剔除纯渗透）

| 名称 | 类型 | 一句话功能 | 安装方式 | 值得上架? |
|---|---|---|---|---|
| NVIDIA__garak | CLI | LLM 漏洞扫描器：幻觉/数据泄露/prompt 注入/越狱探测（LLM 界 nmap） | pip | 备选 — 面向"部署自己 LLM 服务"的用户，日常编码用不上；权威性高可留作进阶类目 |
| trivy | CLI | 全能安全扫描：容器/依赖/IaC/密钥泄露，业界事实标准 | binary/pip/docker | 是 — 单二进制、`trivy fs .` 即扫项目依赖漏洞，每个开发者都用得上 |
| jendrikseipp__vulture | CLI | Python 死代码查找器 | pip | 是 — pip 一键、开发日常即用、与现有工具零重叠 |
| hadolint__hadolint | CLI | Dockerfile linter（Haskell，最快最好） | binary | 是 — 单二进制，写 Dockerfile 的人都需要 |
| vps-audit | 脚本(bash) | VPS 安全+性能审计 bash 脚本，输出报告 | 单脚本 | 否 — .sh 脚本，Windows 环境不适用（本项目 Windows 规则禁 .sh） |
| evilsocket__audit | CLI/Agent | 8 阶段漏洞挖掘 agent，用 Claude Pro 订阅驱动（Glasswing 管线复刻） | pip+claude login | 是 — 纯消费已有 Claude 订阅，无额外 API 费，安全审计增益独特 |
| claude-code-security-review-main | GitHub Action | Claude 驱动的 PR 安全审查 Action，diff-aware、自动评论 | GitHub Action | 是 — 有 repo 的人一键接入，Claude 官方出品 |
| ultimate_bug_scanner | CLI/技能 | AI 编码 agent 的 bug 预扫描器：修复前标记可疑代码，跨平台 | pip+SKILL | 是 — 有 SKILL.md 可直接进 Claude Code，与 code-review-graph 互补（它看结构、它找 bug） |
| Claude-BugHunter | 技能包 | 83 技能/681 报告模式的漏洞挖掘+红队技能 bundle（Burp MCP 集成） | skill bundle | 否 — 定位授权红队/渗透场景，超出"开发者日常"范围 |
| deep-eye | CLI(Python) | AI 驱动渗透测试工具 | setup.py | 否 — 纯渗透定位，按规则跳过 |
| codex-security | CLI/SDK | OpenAI 官方安全策略+漏洞查找修复 CLI | npm(@openai/codex-security) | 是 — npm 一键、官方出品；注意部分能力需 Trusted Access 审批 |
| agent-guardrails | 策略/hooks | 硬性拦截 AI agent 危险命令（terraform destroy/DROP DATABASE 等） | 复制配置 | 是 — 纯配置文件，防生产事故刚需，与 ECC hooks 理念一致 |
| pi-guardrails | 插件 | Pi agent 的路径/密钥/危险命令防护扩展集 | npm | 否 — 绑定 Pi agent 生态 |
| guardian-cli | CLI | AI 驱动渗透测试自动化平台 | pip | 否 — 渗透定位，跳过 |
| agentseal | CLI/库 | AI agent 安全工具箱：红队 prompt、MCP 投毒检测、技能文件扫描 | pip+npm | 是 — 装 MCP/技能前先扫一遍，与 AI-Tools-Hub"一键安装第三方工具"场景天然互补（上架前的安全闸） |

---

## 汇总：最值得上架 TOP 5

> 评判重点回顾：① 一键安装可行性（Windows 可用优先）② 对 AI 编程增益 ③ 与已有工具（icm/rtk/claude-mem/code-review-graph/context-mode）互补不重复。

1. **cc-switch** — 多供应商/多账号配置切换管理器，Tauri 单二进制、Windows 原生、一键装即用。与 AI-Tools-Hub 的 Electron 形态亲缘，是所有装了多个 AI CLI 的用户的第一个刚需。与现有五件套零重叠。
2. **claude-devtools** — "看见 Claude 干了什么"：会话回放、工具调用检视、token 用量。claude-mem 管记忆，它管调试观测，互补关系明确；同为 Electron 应用，集成路径最顺。
3. **trivy** — 依赖/容器/密钥安全扫描事实标准，单二进制 `trivy fs .` 即用。给 AI-Tools-Hub 补上"安全"类目第一名；并可考虑与 agentseal 配合做上架工具的安全闸。
4. **claude-hud + ccstatusline（打包为"Claude Code 界面增强"类目）** — 两条两行命令安装，即时可见的 context/状态反馈，增益最"看得见"，上手成本为零，适合做市场里的引流轻量品。
5. **agent-guardrails** — 纯配置、零依赖，硬拦 AI agent 危险命令（删库/destroy）。防生产事故是独有价值，且与 ECC 的 hook 体系同构，Windows 用户直接可用。

**次选梯队（第二期上架候选）**：everything-claude-code(ecc-universal)、claude-octopus、claude-squad、qwen-code、codex-security、evilsocket__audit、ultimate_bug_scanner、agentseal、OpenSwarm、claude-flow(ruflo)。

**明确不上架**：框架库（crewAI/autogen/swarms）、macOS 专属（cmux/squadra/ccteam 主推）、生态绑定（dsh-agent-teams/pi-guardrails/oh-my-hermes）、渗透类（deep-eye/guardian-cli/Claude-BugHunter）、已归档（opencode→改推 Crush）、空目录/纯目录（OrchestratorInc、awesome list、官方插件市场镜像）。

> 提醒：存在大量重复目录（crewAI×2、ruflo×3、agent-orchestrator×3、cmux×2），后续 1677 目录调研建议先做去重映射。
