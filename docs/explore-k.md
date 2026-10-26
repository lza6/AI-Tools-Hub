# explore-k：AI Coding CLI 组 + 开发小工具组 调研报告

> 调研范围：`D:\参考项目\` 下 AI coding CLI agent 组（完整产品标准：真 CLI/npm 安装、可作 CC 补充/替代、体量适合工具市场）+ 12 个开发小工具。
> 结论标签：基于 README/package.json 静态核验。

## 一、总表

### AI Coding CLI 组

| 名称 | 类型 | 功能一句话 | 安装方式（原文） | 上架? |
|---|---|---|---|---|
| qwen-code | CLI (Node) | Qwen 官方 CC 式终端编程 agent，接任意 OpenAI 兼容 API | `npm install -g @qwen-code/qwen-code@latest` | 是 |
| kilocode | CLI + IDE 插件 | Kilo Code 多模型编程 agent（fork 自 Cline/Roo），500+ 模型 | `npm install -g @kilocode/cli` | 是 |
| cline | IDE 插件 + CLI | 开源编程 agent（IDE/终端/桌面三形态） | `npm i -g cline` | 是 |
| aider | CLI (Python) | 经典 AI 结对编程 CLI（git 感知、repo map） | `python -m pip install aider-install` | 是 |
| nanocoder | CLI (Node) | 本地优先开源编程 CLI（Ollama/任意 OpenAI 兼容） | `npm install -g @nanocollective/nanocoder` | 是 |
| blade-code | CLI + Web | 国产编程助手 CLI+Web+Headless，支持任意 API | `npm install -g blade-code` | 是 |
| openclaude | CLI (Node) | "Open terminal for any LLM"，模型无关 CC 替代 | `npm install -g @gitlawb/openclaude@latest` | 是 |
| grok-cli | CLI (Node) | Grok 官方终端编程 agent（绑定 xAI 生态） | `npm i -g grok-dev` | 是（受限） |
| trae-agent | CLI (Python) | 字节 Trae 软件工程 agent，多提供商 | pip/uv 安装 | 次优（pip 非 npm） |
| goose | CLI + 桌面 (Rust) | Block 多模型编程 agent | curl 脚本 / brew | 次优（脚本/二进制分发） |
| crab-code | CLI (Rust) | Rust 从零写的开源 CC 替代（49 工具/6 权限模式） | cargo build（需预编译二进制） | 次优 |
| plandex | CLI (Go) | 计划驱动的大改动编程 agent | `curl -sL https://plandex.ai/install.sh \| bash` | 次优（脚本装） |
| open-code-review | CLI (Node) | 阿里代码审查 agent（专精 review 场景） | `npm install -g @alibaba-group/open-code-review` | 补充可选 |
| gopeed | CLI/桌面 (Go) | 多协议下载器 | `go install github.com/GopeedLab/gopeed/cmd/gopeed@latest` | 边缘（消费级） |
| tw93__Kami | Agent Skill | AI Agent 生成精美 PDF/PNG/PPT 报告 | `npx skills add tw93/kami -a claude-code codex cursor -g -y` | 是（技能类） |

**不上架**：ZCode（pnpm 源码构建+Node 24.14 锁版本）、continue（纯 IDE 插件无 CLI）、mobilecode（opencode fork 受众窄）、monocode/moon-code/t3code（GUI 壳非 agent 本体）、open-swe（需 Docker+云平台）、openclaw（个人助手网关+安装脚本安全疑虑）、free-claude-code（CC 代理网关非产品）、cc-polymath（CC skill 插件包，归技能市场）、page-agent（SDK 库）、browsentic（浏览器扩展）、ab-download-manager/apex/localsend/upscayl/aria2（消费级下载/传输/图像工具，非开发者场景；apex 的 winget/choco 未发布仅 scoop 可用）。

**重复副本**：qwen-code（v0.23.2）> qwen-code-main（v0.14.2）；goose > goose-main；open-swe > open-swe-main；pressly__goose 是无关的 Go 数据库迁移工具，排除；page-agent 与 alibaba__page-agent README 一致，取一即可。

### 开发小工具组

| 名称 | 类型 | 功能 | 安装方式 | 上架? |
|---|---|---|---|---|
| jsonrepair | 库+CLI | 修复无效 JSON（AI 生成 JSON 场景加分） | `npm install -g jsonrepair` | 是 |
| witr | CLI | "Why is this running" 进程/端口/容器溯源排查 | curl 脚本 / brew / winget / npm | 是 |
| oha | CLI (Rust) | HTTP 压测 + 实时 TUI 可视化（压测三件套代表） | `winget install hatoo.oha` | 是 |
| gofakeit | 库+CLI (Go) | 假数据生成器（310+ 函数） | `go install .../gofakeit` CLI | 是 |
| ua-parser-js | 库 | UA 解析识别浏览器/设备 | `npm install ua-parser-js` | 否（纯库+AGPL/收费顾虑） |
| chardet | 库 (Py) | 编码检测 | `pip install chardet` | 否（纯库） |
| lancet | 库 (Go) | Go 通用工具库（700+ 函数） | `go get` | 否（纯库） |
| go-pretty | 库 (Go) | 终端美化输出 | `go get` | 否（纯库） |
| eslint-plugin-unicorn | ESLint 插件 | 300+ lint 规则 | `npm i -D eslint-plugin-unicorn` | 否（lint 组件非独立工具） |
| jquick-curl | 库 (Java) | curl 命令转 Java HTTP 调用 | Maven Central | 否（纯库，小众） |
| hey | CLI | 轻量 HTTP 压测 | `brew install hey` | 否（低活跃，被 oha 覆盖） |
| wrk | CLI | 多线程压测+Lua 脚本 | 源码编译 | 否（需编译，门槛高） |

**压测三件套结论**：上 **oha** 一个即可（MIT、持续活跃、TUI 差异化、winget/brew/cargo 渠道最全），hey/wrk 不上。

## 二、TOP5（写入工具市场）

| # | 工具 | 类别 | 安装命令（原文） | 入选理由 |
|---|---|---|---|---|
| 1 | **qwen-code** | AI Coding CLI | `npm install -g @qwen-code/qwen-code@latest` | Qwen 官方出品、Apache-2.0、CC 式体验、接任意 OpenAI 兼容 API，npm 一键装，CC 替代首选 |
| 2 | **aider** | AI Coding CLI | `python -m pip install aider-install` | 最成熟的 AI 结对编程 CLI，git 感知 + repo map，社区口碑最好，与 CC 定位互补 |
| 3 | **kilocode** | AI Coding CLI | `npm install -g @kilocode/cli` | 多模型（500+）聚合，MIT，npm 一键，Cline/Roo 生态集大成者 |
| 4 | **jsonrepair** | 开发小工具 | `npm install -g jsonrepair` | AI 时代高频痛点（修复 LLM 输出的残缺 JSON），自带 CLI，MIT，零体积负担 |
| 5 | **oha** | 开发小工具（压测） | `winget install hatoo.oha` | 压测品类唯一代表，实时 TUI 可视化演示效果直观，MIT 活跃维护，安装渠道最全 |

**备选池**：nanocoder（本地模型定位独特）、blade-code、openclaude、witr（渠道最全的新概念排查工具）、gofakeit（假数据 CLI）、Kami（技能类，若开技能市场则必上）。

## 三、市场形态建议

- AI coding CLI 按现状不适合全收——同质化严重（qwen-code/kilocode/cline/blade-code/openclaude 功能高度重叠），TOP 收 2-3 个差异化最明显的即可，其余入备选池轮换。
- 库类（lancet/go-pretty/chardet/ua-parser-js）一律不上，除非未来市场增设"库推荐"栏目。
- 下载/传输/图像类（localsend/upscayl/ABDM/gopeed）与"开发者/AI 编程"定位不符，全跳过。
