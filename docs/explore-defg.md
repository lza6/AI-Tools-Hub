# AI-Tools-Hub 调研报告：D/E/F/G 组（D:\参考项目\）

> 调研日期：2026-02。目标：为 AI-Tools-Hub（一键安装 CLI/MCP/技能的 Electron 应用）挑选上架工具。
> 评估维度：一键安装可行性、对 AI 编程（Claude Code 等）增益、与已有 icm/rtk/claude-mem/code-review-graph/context-mode 的互补性。

---

## D 组：提示词 / 上下文工程类

```
linshenkx__prompt-optimizer | 平台(桌面/网页/插件+MCP) | AI 提示词优化、测试、模板管理一体化工具，含桌面端与 MCP server | npm(pnpm monorepo, 可装 @prompt-optimizer 包) | 是+成熟度高(2.11版/多平台)、一键安装可行(npm)、对 Claude Code 写 prompt 有增益、与 token 压缩类不重复
nidhinjs__prompt-master | 技能 | 教 Claude 写精准提示词的 Claude Skill，减少返工轮次 | 无(git clone 到 ~/.claude/skills) | 是+零依赖、安装极简单(复制目录)，与 token 优化不重复但价值偏"提示词方法论"
quality-prompts | 库 | 实现 58 种学术提示词技巧(自注意力/few-shot 等)的 Python 库 | pip | 否+面向 LLM 应用开发者写代码用，非 AI 编程工作流工具，受众不匹配
promptfoo__promptfoo | 目录为空（无 README/清单） | - | - | 否+无法评估
context-engineering-intro-main | 技能(模板) | Context Engineering 入门模板，含 PRP 生成/执行的 Claude Code 命令 | 无(git clone) | 否+纯文档模板非工具，需人工复制使用，市场"一键安装"形态价值低
Agent-Skills-for-Context-Engineering-main | 技能(合集) | 上下文工程原理教学型技能合集(context-fundamentals/compression/memory 等) | 无(复制 skills 目录) | 是+多个独立 skill 可拆分上架、教学+实操兼备，适合技能类目扩充
claude-token-optimizer | CLI | 重构 Claude Code 项目文档结构，只加载 4 个核心文件，省 ~90% 启动 token | npm(npx claude-token-optimizer init) | 是+npx 一键安装、直击 Claude Code 痛点、效果可量化(11k→1.3k tokens)
claude-token-efficient | 技能(单文件) | 一个 CLAUDE.md 规则文件让输出更精简省 token | 无(复制单文件) | 否+价值过于单薄(一个 markdown 文件)，且与其他 token 优化工具高度重叠
token-optimizer (alexgreensh) | 技能+插件 | Claude Code 插件：token 仪表盘、checkpoint 恢复、上下文质量评分 | 无(插件安装， Python 3.9+ 脚本) | 备选+多客户端支持、零依赖，但 PolyForm Noncommercial 许可禁止商用，商业市场需排除
token-optimizer-mcp (ooples) | MCP | 本地知识图谱+省 token 台账，跨 16 个 CLI 客户端审计上下文节省 | npm(@ooples/token-optimizer-mcp) | 是+npm 标准安装、MIT 许可、自带 doctor/install CLI 适合一键装
token-savior | MCP | 结构化代码导航+持久记忆 MCP server，宣称 tsbench 97.9%/-80% token | pip(token-savior-recall) | 否+基准数字自报且复现工具未公开（README 自己已声明），需独立验证后再考虑
caveman-compression-main | 库 | 无损语义压缩 Python 库：去语法留事实，输入 token 省 ~29% | pip(待验证) | 否+偏库/实验性质，需集成才生效，作为独立工具价值弱
caveman-main (JuliusBrussee) | 技能+插件 | caveman 旧版：agent 输出"caveman 风"省 ~75% 输出 token | npm(caveman-installer) | 否+与 caveman 新版重复，上架新版即可
caveman | 技能+CLI | caveman 新版：30+ agent 支持、npm 安装器+Go proxy、输出省 75%/输入省 46% | npm(caveman-installer) + cargo(proxy) | 是+一键安装体验最好(caveman-install 自动检测 agent)、口碑好(Product Hunt/Trendshift)、MIT
caveman-2 | 技能+CLI | 与 caveman 完全相同(同名同版本 2.6.0)的重复目录 | 同上 | 否+与 caveman 完全重复
opencode-magic-context-master | 插件 | OpenCode 专用：后台历史压缩+跨会话记忆+缓存感知 compaction | npm(@cortexkit/opencode-magic-context, bun 构建) | 否+仅面向 OpenCode 非 Claude Code，且需 bun workspace 构建，一键安装不友好
headroom | 代理/平台 | 上下文压缩层：压缩 tool 输出/日志/RAG/历史，本地运行，宣称省 50-90% | pip(headroom-ai) + npm(headroom-ai) + cargo | 备选+双语言发行包、本地压缩、功能全面，但安装复杂度较高(含 Rust proxy)
headroomlabs-ai__headroom | 代理/平台 | 与 headroom 完全相同的重复目录 | 同上 | 否+重复
lean-ctx | CLI+代理 | AI Value Gate：路由/压缩/缓存文件重读/会话记忆/实时仪表盘 | cargo(lean-ctx, crates.io) | 备选+功能对齐 headroom 类但 cargo 安装对小白稍难、需确认 Windows 二进制可用性
```

**去重说明**：caveman-2、headroomlabs-ai__headroom、caveman-main(旧版) 均为重复，勿重复上架。
**组内 TOP**：caveman > claude-token-optimizer > token-optimizer-mcp（headroom/lean-ctx 与其功能重叠，三者选一即可，优先 MCP 因安装最简）。

---

## E 组：工作流 / 规划类

```
OpenSpec (Fission-AI__OpenSpec + OpenSpec 两副本合并) | CLI | AI 原生规格驱动开发（spec-driven）框架，支持 brownfield，/opsx:propose 新工作流 | npm (@fission-ai/openspec) | 是——npm 一键装、活跃度高、与 Claude Code 契合，上架取 1.13.1 版
spec-kit | CLI | GitHub 官方 SDD 工具包，specify CLI 引导项目做规格驱动开发 | pip (uv/PyPI specify-cli，亦可 binary) | 是——GitHub 官方出品、1.0 稳定、AI 编程增益强，社区标杆
spec-ptc | 库 | 推测式程序化工具调用，RLM/CodeAct harness 加速技术（实验性） | pip | 否——面向 harness 研究者的 Python 库，非终端用户工具
planning-with-files (两副本合并) | 技能 | 磁盘持久化计划文件（task_plan/findings/progress.md）+ hook 防上下文丢失，跨 60+ agents | 无（Agent Skills 标准/插件安装） | 是——Trending #1、有 A/B 评测数据、Claude Code 原生插件，技能类上架首选
get-shit-done (三副本合并：get-shit-done 已归档跳转、get-shit-done-main、gsd-2-main) | CLI | 元提示+上下文工程系统，解决 context rot；v2(gsd-pi) 已成独立编码 agent | npm (v1: get-shit-done-cc / v2: gsd-pi) | 是——建议上架 v1 并标注 v2 分流（v2 独立 agent 且含加密货币代币营销，页面文案需过滤）
bmad-autonomous-development-main | 技能/框架模块 | BMad Method 的自主开发编排器，并行多 agent 跑完 story→dev→review→PR 全周期 | 无（依赖 BMad Method + gh CLI） | 否——强依赖 BMad 生态与 sprint 状态文件，单独一键安装无意义
plan-cascade | 框架(CLI+MCP+桌面) | 三层级联并行开发框架，复杂项目分解为并行任务，多 provider 执行 | pip (Python 核心) | 部分——MCP server 稳定可上架；桌面端 Alpha、CLI dev 状态不齐，整体一键安装体验一般
agentic-project-management-main | CLI | APM：用 AI agent 团队做项目管理的上下文保持框架 | npm (agentic-pm) | 是——npm 装机简单、解决上下文窗口限制，但同类竞品多，可作补充选项
pro-workflow | CLI/技能集 | 自纠错记忆 + SQLite FTS5 wiki + 自动研究循环，41 skills/8 agents/23 命令 | npm (pro-workflow) | 是——功能密度高、跨 32+ agents，记忆类增益对 Claude Code 明显，但要评估其 24 类 hook 侵入度
ccg-workflow-main | CLI | Claude + Codex + Gemini 多模型智能路由协作工作流 | npm (ccg-workflow) | 是——多模型路由是差异化卖点，中文社区活跃，npm 一键装
vibe-coding-toolkit | 目录不存在 | - | - | 否
```

**去重说明**：OpenSpec、planning-with-files、get-shit-done 各有 2-3 个重复副本，均合并上架。
**组内 TOP**：OpenSpec > planning-with-files > spec-kit。

---

## F 组：文档 / 知识库类

```
Tencent__WeKnora | 平台+MCP | 腾讯开源 RAG 知识库问答平台（ReAct Agent + 知识图谱 + 长期记忆 + 多租户 RBAC），另有官方 MCP server | pip (MCP: tencent-weknora-mcp) / docker (平台) | 是（仅推荐上架其 MCP server，pip 一键装、29 个工具可接 Claude Code；完整平台需 docker 多服务，标注重量级不建议一键装）
infiniflow__ragflow | 平台 | 深度文档理解 RAG 引擎平台（Web UI、深度文档解析、agent 工作流） | 无（docker-compose 多容器 + ES/MySQL/MinIO） | 否——重量级平台无法一键安装，偏离工具市场轻量形态
LightRAG-main | 库 | HKUDS 图增强 RAG 框架（知识图谱+向量混合检索），可 pip 装库或起 API server | pip | 边缘——pip 可装但需自行配 LLM key 与存储后端；与 icm/claude-mem 部分重叠，增益中等
graphrag | CLI | 微软官方 GraphRAG，文本语料→知识图谱→多跳问答的索引/查询 CLI | pip | 边缘——pip 一键装但官方已进入维护模式，索引耗 token 成本高，建议标注"维护模式"
HKUDS__nano-graphrag | 目录不存在 | - | - | 否
topoteretes__cognee | 目录为空 | - | - | 否
open-knowledge | 平台 | OpenKnowledge：面向 Claude/Codex 等 harness 的本地 markdown 知识库编辑器（桌面/Web + CLI） | npm/binary | 是——本地免费、与 Claude/Codex 明确集成，与 icm 互补（icm 存碎片记忆、它管文档知识库）；桌面 App 需按平台分发
OpenKB | CLI | PageIndex 团队的开源 LLM 知识库：无向量库、推理式检索、长文档、多模态、实体 Wiki 自动生成 | pip | 是——pip 一键装，"vectorless"路线差异化明显，本地知识库增益直接，本组亮点
knowledge_graph | 库/示例 | 教学演示：文本→知识图谱可视化（networkx + pyvis），非生产工具 | pip | 否——教程代码，无 CLI/MCP/安装包，工程化程度低
ai-knowledge-graph | CLI | 用 OpenAI 兼容 LLM 从文档抽取 SPO 三元组生成交互式知识图谱 | pip | 边缘——可装可/Ollama 本地模型，但功能单一偏可视化，与 graphrag/LightRAG 重叠，优先级低
cocoindex | 库 | Rust 内核实时增量数据索引框架（数据流式 ETL→向量/图索引，declare once, keep updated） | pip (Rust 扩展) | 是——增量索引独特（普通 RAG 全量重建），适合做 Claude Code 项目文档实时索引后端，与 icm/claude-mem 互补
txtai | 库 | all-in-one 语义搜索/LLM 编排框架（embeddings + 图网络 + RAG + agent） | pip | 否——大而全但偏 Python 框架需写代码集成，无 CLI/MCP 形态，与现有工具重叠度高
VectifyAI__PageIndex | 库/CLI | 无向量库"推理式 RAG"：文档建树状目录索引让 LLM 按目录检索；pip install pageindex 含本地模式 | pip | 是——与 OpenKB 同源，pip 一键装、本地模式可用，长 PDF/文档检索增益直接；与 OpenKB 二选一上架
StarTrail-org__LEANN | 目录为空 | - | - | 否
```

**组内 TOP**：cocoindex > OpenKB/PageIndex（二选一） > WeKnora MCP server。

---

## G 组：终端 UI / 状态类

```
ccstatusline | CLI | Claude Code 专用可定制状态栏格式化工具，显示模型信息/git 分支/token 用量 | npm (ccstatusline) | 是+专为 Claude Code 打造、官方 Windows 支持、npm 一键安装，与 AI-Tools-Hub 定位完美契合
sxyazi__yazi | CLI | Rust 异步终端文件管理器，支持图片预览/插件系统/VFS | cargo install / winget | 是+质量极高 Windows 原生支持，但安装依赖 cargo 或预编译二进制，需在 Hub 内做安装封装
Canop__bacon | CLI | Rust 后台代码检查器，随编辑器运行实时报编译/测试错误 | cargo install --locked bacon | 是（弱）+对 AI 编程辅助有用但强绑定 Rust 工具链，受众窄，cargo 编译耗时长
pamburus__hl | CLI | 高性能 JSON/logfmt 日志查看器，支持过滤/排序/实时跟随 | binary（GitHub Releases）/ cargo | 是+单二进制零依赖、Windows 有预编译包，配合 Claude Code 调试日志实用
logdyhq__logdy-core | CLI | 单二进制日志查看器，stdin/文件输入并起本地 Web UI 实时过滤 | binary / go install | 是+零依赖单二进制 + 内嵌 Web UI，Windows 友好；与 hl 二选一上架即可（logdy 有 Web UI 更易用）
mco | CLI/技能 | AI 编码代理编排层：并行运行多个 agent 并对比答案，自带 mco-cli Skill | npm (@tt-a1i/mco，需 Python 3.10+) | 是+直接面向 Claude Code/Cursor 生态、npm 一键安装、附带 Skill；安装流程需检测 Python 3.10+ 前置
attogram__bash-screensavers | 空仓库（仅 .git） | - | - | 否
nicobailon__pi-interactive-shell | 技能/扩展 | Pi coding agent 扩展：AI 在可观测 TUI 中自主运行交互式 CLI，用户可随时接管 | npm (pi install npm:pi-interactive-shell) | 否+仅适配 Pi agent（非 Claude Code 生态），依赖专用宿主
```

**组内 TOP**：ccstatusline > mco > logdy-core（或 hl）。

---

## 全局 TOP 5（上架优先级）

| 排名 | 工具 | 类型 | 上架理由 |
|------|------|------|---------|
| 1 | **caveman** | 技能+CLI (npm) | 安装门槛全场最低：`caveman-install` 自动检测 30+ agent 并配置，输出省 75%/输入省 46%，MIT 许可，社区口碑好。与 icm（存储侧）、context-mode（检索侧）形成"上下文全链路省 token"组合 |
| 2 | **OpenSpec** | CLI (npm @fission-ai/openspec) | SDD 规格驱动赛道口碑最佳，npm 一键装，与 Claude Code 契合度高；同类 spec-kit（GitHub 官方，pip）可作同品类竞品并列展示 |
| 3 | **ccstatusline** | CLI (npm) | 唯一 Claude Code 原生配套状态栏工具，npm 一键装 + 明确 Windows 支持，与 rtk/code-review-graph 生态零冲突，纯增益 |
| 4 | **claude-token-optimizer** | CLI (npx init) | 一行命令重构项目文档结构省 ~90% 启动 token，效果可量化、痛点明确，与 caveman（压缩输出）互补不重叠 |
| 5 | **planning-with-files** | 技能 | Trending #1，磁盘持久化计划文件 + hook 防上下文丢失，有 A/B 评测数据，Agent Skills 标准安装方式与 AI-Tools-Hub 技能分发形态天然契合 |

**次优备选**（第 6-10 位）：mco（多 agent 编排，需检测 Python）、token-optimizer-mcp（npm+MIT，与 headroom/lean-ctx 三选一）、OpenKB（pip 无向量知识库，与 PageIndex 二选一）、cocoindex（增量索引后端，与 icm/claude-mem 互补）、logdy-core（单二进制日志查看器）。

**明确不上架**：重复副本（caveman-2、headroomlabs-ai__headroom、OpenSpec/planning-with-files/GSD 重复目录）、空目录（promptfoo、cognee、LEANN、vibe-coding-toolkit、bash-screensavers）、重量级平台（ragflow、WeKnora 平台本体）、许可受限（token-optimizer PolyForm Noncommercial）、自报数据未验证（token-savior）、非目标生态（opencode-magic-context、pi-interactive-shell）、纯库/教学项目（txtai、knowledge_graph、spec-ptc、quality-prompts）。
