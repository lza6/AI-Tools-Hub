# AI 工具市场选品调研（第 M 批：Q~Z + agent-* 系列聚合）

> 调研范围：D:\参考项目\ 下约 115 个目录（第 3 批 M 段续）。收品标准：CLI / MCP / 技能 / 桌面应用，Windows 一键安装可行；渗透攻击类排除。部分条目基于 README 前 500 字 + 目录结构判断，标注"待验证"处仅静态确认。
> 跳过（前批已调）：SkillSpector（本批首次收录，见下）、Tongyi-MAI__OpenGCUA、TuriX-CUA-main、VectifyAI__PageIndex、amacneil__dbmate、asg017__sqlite-vec、aider —— 均已在 explore-defg/h/i 等文件中调研过。
> 空目录（仅 .git 残留，无法调研）：StarTrail-org__LEANN、TriliumNext__Trilium、Yuan1z0825__nature-skills、YunaiV__ruoyi-vue-pro、ZSeven-W__openpencil、anomalyco__models.dev、agent-plane-hermes-plugin。

## 全量清单

| 名称 | 类型 | 功能 | 安装方式 | 上架?(是/否+理由) |
|------|------|------|---------|------------------|
| QQYQQ123__ec-news | 静态页面+脚本 | 每日电商热点资讯聚合页 | 静态托管 | **否** — 单文件小玩具，无安装形态，价值低 |
| QingYunA__answer-me-with-html | Agent 技能 | 把难懂的回答渲染成一页可读 HTML（图解+离线单文件），省 7/8 token | 技能目录复制 / Release 安装 | **是（TOP1）** — 技能即装、创意极强、全 harness 通用，本地目录完整 |
| QuantMind | 量化投研平台（Python+TS） | AI 原生多市场量化平台，Qlib 驱动、因子进化、QMT 实盘 | Docker/源码部署 | **否** — 重栈金融平台，部署复杂且有实盘资金风险，非工具型上架品 |
| Raccoon | 侦察工具（Python） | 进攻性侦察信息收集（子域/端口/目录 fuzz） | pip | **否** — 攻击类工具触红线 |
| RepoRewind | 开发者工具（TS/React） | git 历史转 3D WebGL 可视化"电影"+ AI 叙事 | `npm install` + 本地起服务 | **是（候选）** — 效果炫、零配置起本地服务；受众偏娱乐向，增益中等 |
| RomanSlack__jev-drone | 研究项目（Python） | MuJoCo 无人机视觉自主飞行 + Jev 判断模型 | 源码+仿真环境 | **否** — 研究 demo，需 MuJoCo 仿真环境，非可用工具 |
| RuView | 智能家居感知（Python） | WiFi 感知人体/呼吸/心率，穿墙无摄像头，接入 HA/HomeKit/Alexa | 自部署 + WiFi 硬件 | **否（暂缓）** — 创意强但依赖特定 WiFi 硬件与整套智能家居，Windows 桌面一键不可行 |
| SWE-agent | Agent 框架（Python） | Princeton SWE-bench 官方软件工程 Agent | `pip install sweagent` / docker | **是（候选）** — pip 一键、学术明星项目；与已有 coding agent 生态重叠，差异化定位需斟酌 |
| SafeLine | WAF（Docker 全栈） | 雷池 WAF：语义分析引擎 Web 防火墙，含 MCP server | Docker compose / 官方安装脚本 | **是（网页/服务形态）** — 防御向明星项目，国内口碑极好；需 Linux 服务器，非 Windows 桌面一键，标注服务形态 |
| ScarecrowFu__dsh-laofu-workbench | 桌面工作台（Node） | 基于 DeepSeek Harness 的可扩展 AI 工作台，场景能力包（口播视频/狼人杀竞技台） | 源码构建 | **否（暂缓）** — 绑定 DSH 生态，安装链路待验证，能力包数量少 |
| See-Sol-Lab__DeepSeekGUI | 桌面应用 | DeepSeek 本地工作台（Windows/Linux），稳定优先 | GitHub Releases 下载安装包 | **是** — 官方安装包一键装，本地跑 DeepSeek 刚需，标注版本兼容 |
| ShayanAbbas1__dbdelve | 桌面应用（Rust/GPUI） | 原生跨平台多引擎数据库客户端，无 Electron，百万行顺滑滚动 | Release 下载（Rust 构建中） | **是（候选）** — 原生性能卖点强；早期项目，Windows 构建成熟度待验证 |
| SimonAKing__HomePage | 静态个人主页 | WebGL 流体背景个人主页模板 | clone + npm | **否** — 模板类，无工具价值 |
| SkillClaw | 技能进化系统（Python） | 技能随真实交互集体进化，跨 session/agent/设备复利 | pip + server 部署 | **是（候选）** — 技能自进化概念新颖；需跑 evolve server，安装链路略重，先小范围验证 |
| SkillX-main | 研究框架（Python） | 自动构建 Agent 技能知识库（聚类/扩展/推理） | 源码 + Python 环境 | **否** — 学术 pipeline，非用户级工具 |
| Skills-main | 技能集合（Dimillian） | Apple 平台/GitHub 工作流/重构/bug 狩猎等 16 个技能 | 复制到 `$CODEX_HOME/skills` | **是** — 技能即装；Apple 向技能在 Windows 用户群价值打折，择优收录 |
| SolveaCX__tokentest.io | MCP + 在线服务 | 黑盒验证 LLM 模型/路由/用量/安全性（采购与 CI 用） | 在线即用 + Remote MCP 接入 | **是** — 在线免费即用 + MCP 一行接入，模型验证场景差异化，Apache-2.0 |
| Sparrowgate | 反代网关（Python） | LLM API 前置代理：SQLite 缓存重复 prompt + 简单问题路由到便宜模型 | Python 运行 app.py | **是（候选）** — 省钱痛点真实；单文件较简陋，维护性存疑，需验证后定 |
| Stratum | 编排平台（Go+React） | 企业级 AI 应用编排，DDD 分层多租户 | Docker / 源码 | **否** — 企业平台重栈，非一键工具 |
| SuperAGI-main | Agent 框架（Python/Docker） | 老牌自主 Agent 框架+市场 | Docker | **否** — 重栈且已过气，同类多 |
| SurgeDM__Surge | TUI 下载器（Go） | 终端高速下载管理器 | Go install / Release 二进制 | **是（候选）** — 单二进制零依赖；与 apex-download-manager 功能重叠，二选一 |
| T3MP3ST | 攻击 harness（Node） | 自称 Offensive Recon & Compromise | 源码 | **否** — 明确攻击定位，触红线 |
| TORCH | 渗透技能包（Claude Code） | Obsidian 武器化的渗透/赏金自动化 harness（/pt-workflow） | 技能复制 | **否** — 进攻性安全工作流，触红线 |
| TannerMidd__pi-pocket | Web 应用（Node22+） | 手机端托管 Pi coding agent，多人/移动优先 | npm + 自托管 | **否（暂缓）** — 绑定 pi agent 生态，受众窄 |
| TecharoHQ__anubis | 反爬中间件（Go） | AI 爬虫挑战网关（proof-of-work 挡 AI scraper），已用于 GNOME 等大项目 | Release 二进制 / Docker | **是（服务形态）** — 防御向明星项目，站点防 AI 爬刚需；需自托管服务端，标注形态 |
| Tel-Agent | 电话 AI 助手（Python） | 任意电话线接任意大模型，自托管 BYOK，call/SMS/web 渠道 | Docker 自托管 + 电话/SMS 供应商 | **否（暂缓）** — 依赖电话线路与付费语音 API，国内落地难 |
| TencentCloud__TencentDB-Agent-Memory | Agent 记忆服务 | 腾讯云 Agent 记忆后端（SQLite 单机版/腾讯云多租户版），HTTP API 给 Hermes 等 Agent 用 | Docker / 单机部署（INSTALL.md） | **是（候选）** — 单机版 SQLite 可本地跑；与已有记忆类（icm/mem0 系）重叠，需差异化验证 |
| TencentDB-Agent-Memory | 同上重复副本 | 同上 | 同上 | **否** — 去重 |
| Tencent__BrowserSkill | 浏览器桥接（Rust/Node） | 让 Claude Code/Cursor/Codex 等 Agent 借用你已登录的真实浏览器标签页，用完归还 | 安装脚本 + Agent 配置（AGENT_INSTALL.md） | **是（TOP2）** — 复用真实登录态是浏览器 Agent 最大痛点，腾讯出品，文档完善 |
| Tencent__teamai-cli | CLI（npm） | 团队级 skills/规则/MCP/知识管理，跨 Claude Code/Codex/Cursor/CodeBuddy 等 7+ harness | `npm i -g teamai-cli` | **是（TOP3）** — npm 一键装、多 harness 同步痛点真实、MIT |
| Teycir__BurpAPISecuritySuite | Burp 插件（Jython） | Burp Suite API 安全测试套件 | Burp 加载 py | **否（暂缓）** — 依赖 Burp Pro 商业软件；功能偏测试向可议，但受众窄 |
| The-NeXT-AI__ai-gateway | API 网关（TS/Fastify） | OpenAI/Anthropic/Gemini/MCP 协议网关+事件驱动 Agent 工作流 | Docker compose | **否（暂缓）** — 与 LiteLLM/one-api 类竞争激烈，需 env 大量 Key 配置 |
| TheHritu__CoolText | Python 库 | CoolText.com 文字 Logo 图片生成 API 包装 | `pip install pycooltext-api` | **否** — 依赖第三方免费站 API，稳定性差，价值低 |
| The_Code_Factory_Working_V2-main | 自主开发平台（Python） | NL→应用+自愈维护的多 Agent 平台（ASE） | Docker/源码 | **否** — 专有 License（Proprietary），重栈 |
| ThembaTman0__apex-download-manager | 桌面应用（Tauri/Rust） | Windows 免费下载管理器：32 线程分片+断点续传+浏览器扩展捕获 | 官网下载 exe + 浏览器扩展商店 | **是** — 安装包一键装，原生无广告无遥测，下载器国民刚需，GPL-3.0 |
| ThreeDotsLabs__watermill | Go 库 | Go 事件驱动/消息流库（Kafka/NATS 等统一抽象） | go get | **否** — 开发库，非最终用户工具 |
| Thysrael__Horizon | 桌面应用（Python） | 新闻阅读器："Enjoy the News itself"，AI 摘要聚合，trendshift 热门 | Release / pip | **是** — 国人开发热门新闻工具，安装简单；与 RSS 类竞争，需看 Windows 包质量 |
| TianyuCodings__NanoJev | 研究模型（0.6B） | 并行决策小模型（System-1），状态+问题→概率分布 | HuggingFace 下载+Python | **否** — 研究 demo，非工具 |
| Tinche__aiofiles | Python 库 | asyncio 文件 IO | `pip install aiofiles` | **否** — 基础开发库，无独立使用价值 |
| TriliumNext__Trilium | （空目录） | 知名分层笔记应用（仅 .git 残留） | 官方安装包 | **待验证** — 目录无内容，基于公开认知：明星笔记软件可上，需补源验证 |
| Umair__stalemap | CLI + GitHub Action（npm） | 告诉编码 Agent 哪些依赖在其训练截止后已变更（防旧 API 幻觉） | `npx stalemap` / GitHub Action | **是** — npm 即用，痛点新颖（AI 旧知识缺陷），MIT，轻量 |
| UnderleveledBuilder__awesome-short-drama-skills | 技能集合 | AI 短剧/微短剧生产技能包（编剧/分镜/视频 prompt） | 技能复制到各 harness | **是（候选）** — 短剧赛道国内火热，技能即装；需评估技能质量与许可证 |
| Understand-Anything | 工具+知识图谱 | 任意代码库→可探索可提问的交互式知识图谱，支持 Claude Code/Cursor 等 | `install.ps1` 一键脚本 | **是** — 有 Windows PowerShell 一键安装，代码理解刚需 |
| Untrivial-ai__agent-orchestrator | 桌面/平台应用 | 一个界面规划、运行、监督多个 coding agent | 源码构建（backend/cloud） | **否（暂缓）** — 重平台，与 vibe-kanban/agor 类竞争，安装链路重 |
| VCPToolBox-main | 桌面聊天客户端（Node） | VCP 协议 AI 聊天客户端（VCPChat）+ 插件后端 | 源码 + 后端服务 | **否** — 小众自建协议生态，需自跑后端，门槛高 |
| VaultS3 | 对象存储（Go 单二进制） | S3 兼容轻量存储，17MB 内存闲置，自带 dashboard | Release 单二进制 | **是（候选）** — 单二进制零依赖；与 MinIO/SeaweedFS 竞争，定位"轻"差异化 |
| Veirt__weathr | TUI（Rust/crates.io） | 终端 ASCII 动画天气（雨雪雷电飞机动画） | `cargo install weathr` / Release | **是（候选）** — 单二进制；娱乐向，增益低，可作长尾 |
| VetarAI | 桌面应用（Electron） | 100% 本地多 Agent 编排+知识仓库+工作流，数据不出本机 | 源码构建（launcher） | **否（暂缓）** — 本地多 Agent 概念好但需源码构建，无成熟安装包验证 |
| Vibe-Trading | 交易 Agent 框架（Python） | 一条命令给 Agent 装上完整交易能力（HKUDS 出品） | pip install + Docker | **否（暂缓）** — 金融交易实盘风险 + 重栈；量化类统一暂缓 |
| VibeNVR | 监控系统（Docker 全栈） | 现代化 NVR：IP 摄像头/录像/移动侦测/事件时间线 | docker compose | **否** — 视频监控重栈需摄像头硬件，非 Windows 一键 |
| VictorTaelin__UniiChat | 桌面/Web Agent | 永不结束的单线程 AI 聊天（同一 Agent 记忆数年），vibe-coded 自述 | 源码 + Cloud | **否（暂缓）** — 作者自述"全是 AI 写的预期有 bug"，且官方托管为主 |
| VideoCaptioner | 桌面应用+CLI（Python） | LLM 视频字幕一站式：识别/优化/翻译/合成，含 Claude Code skill | `pip install videocaptioner` / GUI 安装包 | **是** — 国人明星项目，pip 与安装包双通道，字幕刚需，需求旺 |
| VideoHub | 视频平台（Java21+Vue） | DoVideoAI 视频处理平台 | Docker（rocketmq 等重依赖） | **否** — Java 微服务重栈 |
| VideoPipe | 视频分析框架（C++） | 视频结构化管道（节点式，YOLO 集成） | CMake 源码编译 | **否** — 需 C++ 编译+CUDA，开发者框架非用户工具 |
| VideoRAG | 桌面应用+算法（HKUDS） | 与视频对话（VideoRAG），附 Vimo 桌面端 | 源码/桌面 Release | **是（候选）** — 明星项目趋势榜；桌面端成熟度需验证，GPU 依赖可能重 |
| Vincentwei1021__video-shotcraft | Agent 技能 | 视频分镜/剪映导出技能（含 SKILL.md） | 技能复制 | **是（候选）** — 技能即装；剪映联动国内场景独特，质量待验证 |
| Virtual-Browser__VirtualBrowser | 桌面应用（Chromium） | 指纹浏览器：多隔离环境+自动化接口（Win/mac/Linux） | Release 下载安装包 | **是** — 指纹浏览器国内爬虫/多账号刚需，安装包一键；注意用途合规标注 |
| VoiceMem | 语音记忆模型+工具（Python） | 语音记忆系统（论文+HF 模型） | 源码+HF 模型 | **否** — 研究项目，非用户工具 |
| VoxCPM | TTS 模型（Python） | OpenBMB 无 tokenizer 多语 TTS：声音设计+逼真克隆 | pip + HF 模型 / WebUI | **是（候选）** — 明星 TTS，需 GPU；Windows 本地推理门槛中等，标注硬件要求 |
| VulnClaw | 渗透 CLI（Python） | "AI 驱动渗透测试 CLI——说人话打漏洞" | pip/源码 | **否** — 进攻性渗透定位，触红线 |
| Waza-main | 技能集合（tw93） | 工程习惯→Claude 可运行技能（z/read/zarchitecture 等口碑之作） | 技能复制 / marketplace | **是** — tw93 出品质量高，技能即装，中文友好 |
| WeMM-Embedding | 多模态 Embedding 模型（腾讯） | 微信多模态向量模型（HF） | HF 下载 + Python | **否** — 模型权重库，非工具 |
| Website-downloader | Web 应用（Node） | 下载整站源码（含资源），在线 demo | `node app.js` / 在线 demo | **是（候选）** — 有官方托管站可直用；wget 类替代多，价值中等 |
| Wei-Shaw__sub2api | API 网关（Go+Vue） | 订阅→API 转换计费平台（Claude Code 等） | Docker（PG+Redis） | **否** — 灰色地带（订阅转 API 共享），合规风险，不收 |
| WrongStack | CLI Agent（npm） | 带 67 工具+持久记忆+权限边界的免费 AI coding agent | `npm i -g wrongstack` | **是（候选）** — npm 一键装；与 Claude Code/aider 直接竞争，差异化"越用越懂你的库"，受众存疑 |
| WxxShirley__Agent-STAR | 研究项目 | Agent-STAR：Agent 轨迹数据合成+RL 训练（论文） | 源码 | **否** — 学术训练 pipeline |
| Y2A-Auto | 自动化工具（Python+Docker） | YouTube→AcFun/B站 全自动搬运（下载/ASR/翻译/上传） | Docker compose | **是（候选，合规标注）** — 国内内容生态强需求；搬运版权风险需"仅自用/授权内容"声明 |
| YouMind-OpenLab__ai-image-prompts-skill | Agent 技能 | 10000+ 精选 AI 图像 prompt 技能（每日两更） | 技能复制（SKILL.md） | **是** — 技能即装，prompt 库内容型技能，Claude Code/OpenClaw 双支持 |
| Yuan1z0825__nature-skills | （空目录） | — | — | **否** — 无内容 |
| YunaiV__ruoyi-vue-pro | （空目录） | — | — | **否** — 无内容（知名 Java admin 框架，非 AI 工具） |
| ZSeven-W__openpencil | （空目录） | — | — | **否** — 无内容 |
| Zackriya-Solutions__meetily | 桌面应用（Rust+前端） | 隐私优先 AI 会议助手（本地转录+纪要，trendshift 热门） | Release 安装包 / 源码构建 | **是** — 明星项目，本地隐私卖点，Windows 安装包需验证可用性 |
| ZeroLu__awesome-gpt-image | Awesome 列表 | GPT Image 2 多语言 prompt 集合 | 无安装 | **否** — 纯文档列表，与 YouMind prompt skill 重叠且无安装形态 |
| ZhengyiLuo__AgentsDock | 桌面 IDE（Swift/Electron） | Agentic AI 研究 IDE | macOS 为主（Xcode/Electron） | **否** — macOS 优先，Windows 路径不明 |
| ZiChuanLan__pi-purge | pi 扩展 | 切换 system prompt 做 prompt 实验对比 | 扩展安装 | **是（候选）** — prompt 工程小工具；绑定 pi 生态受众窄 |
| ZingerLittleBee__Heeler | iOS 应用 | herdr 生态配套 iOS 客户端 | App Store | **否** — iOS only |
| abcwyc__pi-agent-desktop | 桌面应用 | Pi Agent 桌面壳：会话浏览/实时对话/成本显示（mac+Win） | Release 安装包 | **是（候选）** — Windows 包存在；绑定 pi agent 生态，受众=pi 用户 |
| abi__screenshot-to-code | Web 应用（前后端） | 截图/Figma/录屏→可运行代码（老牌明星） | 官网直用 / docker compose | **是（网页形态）** — 官方托管站即用；自部署需前后端+LLM Key |
| agency-agents | 子代理集合 | 一整套角色化 AI 专员 agents（前端/营销/财务…） | 复制 agents 到 harness | **是** — 即拷即用角色包；agency-agents-main 为重复副本去重 |
| agency-agents-main | 同上重复副本 | 同上 | 同上 | **否** — 去重 |
| agent-browser | 浏览器自动化层（Rust+CLI） | 给 coding/deploy/research agent 的安全浏览器检查/截图/网络信号工具 | CLI + MCP（cargo/npm） | **是（候选）** — 与 BrowserSkill/playwright MCP 竞争；"安全默认+可审计"是差异点，需验证 Windows 构建 |
| agent-device | MCP+CLI（Node） | 移动/桌面 App 自动化与验证（callstack 出品） | `npm i -g agent-device` | **是** — 已在 explore-i 收录过（重复副本目录），维持上架结论 |
| agent-framework-go | Agent 框架（微软，Go） | Microsoft Agent Framework Go 版 | go get | **否** — 开发框架库，非用户工具 |
| agent-framework-main | Agent 框架（微软，.NET/Py） | Microsoft Agent Framework 主仓 | pip/nuget | **否** — 同上，框架 SDK |
| agent-inspect | 测试工具（TS） | TS AI Agent 的本地证据留痕：看 Agent 做了什么、CI 抓错误路径 | npm | **是（候选）** — Agent 测试验证细分赛道；成熟度需验证 |
| agent-plane-hermes-plugin | （空目录） | — | — | **否** — 无内容 |
| agent-sphere | 平台（Java+React） | Agent 平台全家桶（含 Chrome 扩展/copilot widget/k8s） | Docker/k8s | **否** — 企业重栈 |
| agentfiles | Obsidian 插件 | 在 Obsidian 中管理 Claude Code/Cursor/Codex 等 17 个 agent 的技能 | Obsidian 社区插件市场一键装 | **是** — 插件市场一键装，技能管理刚需，差异化（Obsidian 载体） |
| agentgateway__agentgateway | Agent 网关（Rust） | MCP/A2A/Agent 流量网关（CNCF 系明星） | Release 二进制 / Docker（有 Windows Dockerfile） | **是（服务形态）** — Agent 基础设施明星；面向服务端部署，标注形态 |
| agentic-inbox | Web 应用（Cloudflare） | 全自托管 Cloudflare Workers AI 邮件客户端 | Cloudflare 部署 | **是（候选）** — CF 一键部署但需 CF 账号+Email Routing 配置，非本地工具 |
| agentmemory-main | 记忆服务（npm+iii 引擎） | coding agent 持久记忆（iii-engine 驱动） | npm + docker | **是（候选）** — Agent 记忆赛道；与 icm/mem0 重叠，需对比后择优 |
| agents-main | 插件/技能集合（wshobson） | 149 个技能的 Claude Code 插件矩阵（三档模型策略） | `/plugin marketplace add` | **是** — 一行装，量大管饱；与 awesome 系重叠，择优合并收录 |
| agentsys-main | Agent 运行时（npm） | 模块化 agent 编排运行时 | `npm i agentsys` | **否（暂缓）** — 框架库，受众为开发者，非终端工具 |
| agenttrail | 监控 CLI（npm） | 实时知道你的 coding agent 在干什么 | `npx agenttrail` | **是** — npm 即用，Agent 可观测性刚需小工具 |
| agentverse-os__AgentVerse-OS | OS 级平台（Rust+Svelte） | 自称"Agent 操作系统"（Ubuntu 22.04+ 为主） | bootstrap 脚本，Linux 为主 | **否** — Linux 主场，概念重于落地 |
| agno | Agent 框架（Python） | 明星多 Agent 框架（原 phidata） | `pip install -U agno` | **否** — 开发框架 SDK，非用户工具（同 SWE-agent 不同：SWE-agent 有 CLI 用户面） |
| agor | 团队工作台（自托管） | 多人 coding agent 指挥中心（git worktree 隔离，浏览器内跑） | 源码/Docker | **否（暂缓）** — 与 vibe-kanban/agent-orchestrator 重叠，重栈 |
| agtx | TUI（Rust） | 终端原生 Agent 开发环境：共享黑板+多 agent 并行协作 | `install.sh` / cargo | **否（暂缓）** — install.sh 非 Windows 友好；概念与 agor 重叠，TUI 受众窄 |
| ai-codex-master | CLI（TS） | 自称 Claude Code 全程写的 ai-codex 工具 | npm | **否** — 卖点即"AI 写的"，独立价值不明，疑似低质 |
| ai-maestro | 桌面/服务（Node） | 多 Agent 编排 OS：A2A 消息+持久记忆+多机 | 源码/Container | **否（暂缓）** — 重栈编排平台，同类多 |
| ai-memory | CLI（Rust） | coding agent 跨工具长期记忆：退出 Claude Code 换 Codex 继续不重解释 | cargo/npm 安装（bin/） | **是** — Rust 单二进制，跨 harness 记忆痛点真实且独特（工具间接力场景） |
| ai-scanner | Web 应用（Rails+garak） | AI 模型安全评估平台（NVIDIA garak 包装，0Din 出品） | Docker/Rails | **是（候选，服务形态）** — 防御向模型安全评估；重栈需容器，标注服务形态 |
| airi | 桌面伴侣（Vue/多端） | 虚拟 AI 角色伴侣（live2d/VRM，多平台） | Release / 源码 | **是（候选）** — 明星虚拟角色项目，桌面装；娱乐向，受众年轻化 |
| alibaba__open-code-review | 平台（Java） | 阿里开源代码评审平台 OpenCodeReview | Docker/源码 | **是（候选，服务形态）** — 大厂出品 CR 平台；服务端部署重，团队场景价值高 |
| alibaba__page-agent | 浏览器库/扩展 | 页面内嵌 agent：DOM 感知+操作的轻量 SDK | npm / CDN 引入 | **是（候选）** — 前端集成向；与 BrowserSkill 场景不同（嵌入式），开发者受众 |
| alibaba__skill-up | 技能评估 CLI/Action | 评估 Agent Skills/agents/workspace 质量并用证据进化 | GitHub Action + Makefile | **是（候选）** — 技能质量评估赛道稀缺；安装链路（Action 为主）需验证 CLI 可用性 |
| alibaba__zvec | 向量库（C++/Python） | 阿里向量检索库 | `pip install zvec`（pyproject） | **是（候选）** — pip 一键；与 sqlite-vec/chroma 竞争，"阿里出品+中文文档"差异点 |
| alice | 图像标注工具（Python/YOLO） | AI 图像标注/训练/数据集管理一体 | Python 源码 | **否（暂缓）** — CV 训练向，安装链重，受众专业 |
| all-agentic-architectures | 教学库（Python） | 35 种生产级 agentic 模式+基准排行 | pip/notebooks | **否** — 学习教材非工具 |
| alphaXiv__OpenResearch | CLI+技能（Rust） | 本地优先研究 Agent 工作区：Claude Code/Codex 做 autoresearch | Release 二进制 / SKILL.md | **是** — Rust 单二进制+技能双形态，科研自动化赛道热门（alphaXiv 出品） |
| anmolkapil__plexo | 桌面应用（Electron） | 多线路聚合加速下载器（Wi-Fi+蜂窝合并） | 官网下载安装包 | **是（候选）** — 安装包一键；与 apex 下载器重叠且 Electron 较重，二选一 |
| anomalyco__models.dev | （空目录） | — | — | **否** — 无内容（知名模型信息站） |
| anomalyco__openauth | 认证库（TS） | OpenAuth：自托管认证服务（js.org 明星） | bun/自托管 | **否** — 开发库/服务端组件，非 AI 用户工具 |
| anthropics__defending-code-reference-harness | 参考 harness（Python） | Anthropic 官方：自主漏洞发现与修复参考实现（Mythos 经验） | 源码 + Claude 账号 | **是（候选）** — 官方防御向 harness，权威性极强；受众偏安全工程，需 Claude 订阅 |
| anthropics__sandbox-runtime | 沙箱 CLI（TS+Rust） | 官方 srt：OS 级文件/网络限制沙箱（macOS/Linux 原语） | npm（macOS/Linux 为主） | **否** — 依赖 sandbox-exec/bubblewrap，**无 Windows 原生支持**，不满足环境约束 |
| antigravity-awesome-skills-main | 技能库（npm 安装器） | 1381+ 技能的可安装 GitHub 库+npm installer | `npx antigravity-skills install <name>` 类 | **是** — npm 一键装技能，量大（31k★），与 awesome 系互补 |
| apixelsnet__mango | 桌面全家桶（Go） | mango 桌面+扩展宿主+reader 多组件套件 | Docker/Release | **否（暂缓）** — 组件多定位杂，需进一步确认核心功能卖点 |
| arbiterForge__codeArbiter | 治理层插件 | 跨 Claude Code/Codex/Pi 的统一强制门禁（测试/评审/安全/上下文） | 插件安装 | **是（候选）** — "治理即插件"赛道新；安装链路待验证 |
| arc-kit-main | 企业架构工具包 | ArcKit：多 harness（Claude/Codex/Copilot/Gemini）架构治理技能 | 技能复制 | **是（候选）** — 企业架构向技能包，受众垂直；质量待验证 |
| arcee-ai__nac | CLI（Rust） | Arcee nac（AI 工具/模型管理 CLI 推测） | cargo/Release | **待验证** — README 未展开，需补读确认 |
| archify | 工具（热榜项目） | 代码架构理解/文档生成向（Trendshift 上榜） | 安装包/CLI | **是（候选）** — 需补验证核心功能与 Windows 支持 |
| asg017__sqlite-vec | SQLite 扩展 | （已上架，跳过） | pip/npm | **否** — 前批已收录 |
| astron-agent | Agent 平台（讯飞） | iFlytek 开源 Agent 全栈平台 | Docker | **否** — 企业平台重栈 |
| atlas | 桌面/CLI（Rust+Bun） | tryatlas.cc：AI 数据标注/训练平台向（推测） | Release | **待验证** — 功能描述不足，需补读 |
| atmosphere | JVM 实时引擎（Java） | AI Agent 的 token 流广播引擎（WS/SSE/gRPC→MCP/A2A/AG-UI） | Maven | **否** — JVM 开发库，非用户工具 |
| auto-subs | 桌面应用 | 本地 AI 字幕（Resolve/Premiere/AE 集成+独立运行） | 安装包 / Resolve 集成包 | **是** — 本地隐私+专业剪辑软件集成差异点，Windows 包需验证 |
| autoclip | 视频剪辑系统（Python+React） | YouTube/B站下载→AI 智能剪辑→合集生成 | Docker/源码 | **是（候选）** — 短视频二创刚需；依赖 yt-dlp 与下载合规性需标注 |
| autoresearch | Claude Code 技能 | 把 CC/OC/Codex 变成自主改进引擎（Karpathy autoresearch 移植） | 技能复制 / claude-plugin | **是** — 技能即装，Karpathy 概念背书，轻量高概念 |
| autoshorts | 桌面应用（Tauri 2） | 长视频→竖屏短片候选+爆款时刻 AI 排序（本地优先） | 源码构建（Tauri） | **是（候选）** — Tauri 可出 Windows 包；当前需源码构建，等 Release |
| awesome-agent-cortex | Awesome 列表 | Agent 技术栈全景地图 | 无安装 | **否** — 文档列表 |
| awesome-ai-memory | Awesome 列表 | AI 记忆系统资源汇总 | 无安装 | **否** — 文档列表 |
| awesome-autoresearch | Awesome 列表 | autoresearch 用例分类汇总 | 无安装 | **否** — 文档列表 |
| awesome-hermes-agent | Awesome 列表 | Hermes Agent 生态资源 | 无安装 | **否** — 文档列表 |
| awesome-mcp-servers | Awesome 列表 | MCP 服务器大全（多语言） | 无安装 | **否** — 文档列表（市场可作内容源参考） |
| awesome-osint-arsenal-zh | 工具箱脚本（753+ 工具） | OSINT 军火库一键安装脚本集 | install.sh（Linux） | **否** — install.sh 且含大量渗透向工具，合规风险高 |
| SkillSpector | 安全扫描器（Python） | Agent 技能安装前安全扫描：检测漏洞/恶意模式（Apache-2.0，OpenSSF） | pip / Docker | **是** — 与技能市场强互补："上架技能先过安全扫描"，pip 一键 |

## 组内 TOP3

### 🥇 1. QingYunA__answer-me-with-html — 技能形态最优创意
- 为什么上：Agent 回答"渲染成一页 HTML"是全 harness 通用的体验升级，省 token 且离线单文件；技能即装零依赖，与现有上架技能无重叠
- 安装命令原文（Release 方式，README 提供 GitHub Releases 链接；技能目录复制到 `~/.claude/skills/answer-me-with-html` 即生效）

### 🥈 2. Tencent__BrowserSkill — 复用真实登录态的浏览器 Agent 桥
- 为什么上：Agent 借用已登录标签页、用完归还，直击浏览器 Agent 最大落地痛点；腾讯出品，支持 10+ harness，Rust 实现
- 安装命令原文（AGENT_INSTALL.md 安装脚本；待验证）：
```sh
# 见仓库 AGENT_INSTALL.md：安装后在各 agent 配置中注册 browser skill
```

### 🥉 3. Tencent__teamai-cli — 团队级技能/MCP 统一管理
- 为什么上：跨 7+ coding agent 同步 skills/规则/MCP/知识，团队协作刚需；npm 一键装，MIT，腾讯出品有维护保障
- 安装命令原文：`npm i -g teamai-cli`

**次优备选（4-10）**：SkillSpector（技能安全扫描，市场配套刚需）、Umair__stalemap（依赖过期警示，npx 即用）、ai-memory（跨 harness 记忆接力，Rust 单二进制）、VideoCaptioner（字幕刚需 pip 一键）、ThembaTman0__apex-download-manager（Windows 下载器安装包）、alphaXiv__OpenResearch（科研自动化二进制+技能）、autoresearch（Karpathy 自主改进技能）。
