# 调研 J：AI 工具市场选品 — Skills 集合与 Skills 管理工具（D:\参考项目\）

调研日期：2026-02 | 方式：本地目录盘点（SKILL.md 计数）+ README 安装命令提取
对标已上架：caveman、planning-with-files、superpowers

## 总表

| 名称 | 类型 | 功能一句话 | 安装方式 | 上架? |
|---|---|---|---|---|
| dzhng/skills | 技能集合 | "软件工厂"式领域无关工程技能库（spec→slice→verify 循环），22 个 SKILL.md，skills.sh 收录 | `npx skills add dzhng/skills` | ✅ 是（TOP1，工程增益最高） |
| mattpocock/skills | 技能集合 | "真实工程师"日用的 TypeScript/工程流程小技能，38 个，官方 Claude 插件市场 | `claude plugin install mattpocock-skills@claude-plugins-official` 或 `npx skills add mattpocock/skills` | ✅ 是（TOP2，作者名气大+插件自更新） |
| trailofbits/skills | 技能集合市场 | 安全审计/漏洞分析技能市场，44 个插件（85 个 SKILL.md），Trail of Bits 官方 | `/plugin marketplace add trailofbits/skills` | ✅ 是（TOP3，安全垂直类独占） |
| NVIDIA/SkillSpector | 工具（扫描器） | 安装前扫描 agent skill 的 71 种漏洞/恶意模式（26.1% skill 有漏洞的出处），71 漏洞模式+风险评分+SARIF | `uv tool install git+https://github.com/NVIDIA/skillspector.git` | ✅ 是（TOP4，NVIDIA 品牌，市场工具位空缺） |
| Membrane application-skills | 技能集合 | 3000+ SaaS 应用集成技能（Gmail/Slack/Salesforce…），Membrane 管理凭据 | `npx skills add membranedev/application-skills`（按需单装） | ✅ 是（TOP5，集成类规模独占） |
| K-Dense-AI/scientific-agent-skills | 技能集合 | 163 个科研技能（生物/化学/医学/数据），有 arXiv 论文背书 | `npx skills add K-Dense-AI/scientific-agent-skills` | ⚠️ 备选（质量高但受众窄，科研人群才有转化） |
| VectorSpaceLab/AREX-Skill | 技能集合+CLI | 5000+ 从 1000 个 ML repo 蒸馏的可执行技能，arXiv 论文 | `curl …install-disco.sh \| sh`（DisCo CLI） | ❌ 否——体量过大（6000+ SKILL.md），curl 安装不合规感，选品难展示 |
| xingkongliang/skills-manager | GUI 管理工具 | 跨 Claude Code/Codex/Cursor 统一管理 skills 的桌面 App（中心仓库+skills.sh 市场） | 下载安装包（skillsmanager.dev） | ⚠️ 备选——管理类好产品，但与 SkillRoster 重叠；本地目录里 skills-manager 即同一项目副本，不算新品 |
| tt-a1i/skillroster | CLI 管理工具 | 多 Agent skills 盘点/配额/可回滚整理（Rust，Scan→Plan→Apply→Undo） | Homebrew tap / cargo | ⚠️ 备选——理念好（看得清/配得准/改得回），但安装链路不如 npx 顺 |
| JimLiu/baoyu-skills | 技能集合 | 宝玉中文内容创作流：封面图/翻译/公众号/小红书/微博发布等 21 个 | `npx skills add jimliu/baoyu-skills`（建议 --list 按需） | ⚠️ 备选——中文自媒体人群精准，但与"AI 编程增益"定位偏离；依赖 npx bun |
| tjxj/z-skills | 技能集合 | 中文自动化 17 个：视频下载/文档解析/md→Word·PDF/邮件读取/手写PPT 等 | `npx skills add tjxj/z-skills --skill <名>` | ⚠️ 备选（同上，中文办公自动化向） |
| nextlevelbuilder/ui-ux-pro-max-skill | 技能包 | UI/UX 设计系统技能（13 个），支持子代理路由 | `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` | ❌ 否——与已上架设计类重复度高，双副本目录（multica 镜像同源） |
| coreyhaines31/marketingskills | 技能集合 | 技术营销 50 技能（转化/SEO/文案），Corey Haines 出品 | `npx skills add coreyhaines31/marketingskills` | ❌ 否——非编程增益，且有赞助商内容 |
| ScayverGraphix/marketing-skills | 技能集合 | Marketing Skills OS，76 技能+347 集成指南 | npx skills add scayver/marketing-skills | ❌ 否——与 marketingskills 重叠且更杂 |
| bagelhole/DevOps-Security-Agent-Skills | 技能集合 | 163 个 DevOps+安全技能（K8s/Docker/Terraform/AWS） | `npx skills add bagelhole/DevOps-Security-Agent-Skills` | ❌ 否——与 trailofbits 重叠，质量校验弱于 ToB 官方 |
| kajisho5/ffmpeg-skill | 单技能+MCP | 给 agent 一个本地视频剪辑器：40 个 ffmpeg 工具，离线无 API key | `npx ffmpeg-skill` | ❌ 否——优质单品，但市场单品规格不符（可并入合集） |
| pasky/chrome-cdp-skill | 单技能 | 连接用户已登录的 Chrome 实时会话（非新建隔离浏览器） | `pi install git:github.com/pasky/chrome-cdp-skill@v1.0.1` 或 copy | ❌ 否——与已上架 playwright/MCP 类重叠；pi 生态为主 |
| K-Dense…外其余单技能/论文类（book-to-skill、repo-to-skill、cangjie-skill、EvoSkill、SkillX、SkillOpt、darwin-skill、soul-grader、narrator、last30days、CyberSecurity-Skills、awesome-design-skills、awesome-ux-skills、Generative-Media-Skills、OJO、pm-skills、browser-act、mcp-chrome、jkudish/jev-mcp、trace-mcp、coleam00/second-brain、Leon-Drq/openagentskill、andrej-karpathy 系列、typesafe-ai、gitskills-sample、zjunlp/SkillNet、skills-best-practices） | 混合 | 见下方"淘汰备注" | — | ❌ 否 |

## 淘汰备注（快速理由）

- **book-to-skill / repo-to-skill / cangjie-skill / AREX**：都是"把书/仓库/视频蒸馏成 skill"的生成器，学术或工具属性强，SKILL.md 产出非成品集合，市场展示难。
- **EvoSkill / SkillX / zjunlp SkillNet / microsoft SkillOpt / darwin-skill**：论文配套研究框架（自动发现/进化/训练 skills），非即装即用技能，需 Python 环境跑实验。
- **soul-grader / narrator-ai-cli / last30days / CyberSecurity-Skills（无 SKILL.md，纯目录） / awesome-ux-skills（0 个 SKILL.md） / gitskills-sample / zjunlp__SkillNet（空）**：单技能小品或空壳。
- **Generative-Media-Skills（73 个）**：依赖 muapi-cli 付费 API，与付费红线冲突。
- **OJO-Design-Skills / awesome-design-skills（67 个，`npx typeui.sh pull`）**：设计 token 类，与已上架重复，且安装走自家 CLI 非 skills 标准。
- **pm-skills（23 个，空格的键盘）**：PM 顾问团，中文产品人群，非编程增益，可作后续备选。
- **browser-act__skills（103 个）**：商业云爬虫产品的技能包，强绑定其 SaaS。
- **mcp-chrome / jkudish/jev-mcp / trace-mcp**：MCP 服务器而非 SKILL.md 集合，品类不符（jev-mcp 依赖 TypeSafe 付费模型）。
- **coleam00/second-brain-skills（6 个）**：绑定其 Archon 生态。
- **andrej-karpathy-skills-main / multica 镜像**：单个 CLAUDE.md 准则文件，非 skill，且内容已融入本项目 CLAUDE.md。
- **skills-best-practices / Leon-Drq/openagentskill**：最佳实践单文件 / skill 审计网站，均非可上架集合。

## TOP5 摘要（含安装命令原文）

1. **dzhng/skills** — 22 个领域无关工程技能，"独立可验证切片"自主开发循环，skills.sh 收录，与 caveman/superpowers 无重叠（spec→slice→verify vs 沟通/文件规划）。`npx skills add dzhng/skills`（加 `--list` 按需选装）
2. **mattpocock/skills** — 38 个日用工程技能，TypeScript 权威作者，官方插件市场可自更新。`claude plugin install mattpocock-skills@claude-plugins-official`
3. **trailofbits/skills** — 44 插件 85 技能的安全审计市场（代码审计/合约/供应链/变异测试），安全垂直第一品牌。`/plugin marketplace add trailofbits/skills`
4. **NVIDIA/SkillSpector** — 安装前技能安全扫描器，71 漏洞模式+风险评分，市场"安全工具"位空白，品牌背书强。`uv tool install git+https://github.com/NVIDIA/skillspector.git`
5. **membranedev/application-skills** — 3000+ SaaS 集成技能，规模独占，凭据由 Membrane 托管。`npx skills add membranedev/application-skills`（务必按需单装避免上下文膨胀）

## 备选池（次优先）

scientific-agent-skills（科研 163 技能）、xingkongliang/skills-manager（GUI 管理器，若做"管理工具"类目）、baoyu-skills / z-skills（中文自媒体/办公自动化人群）、pm-skills（中文 PM 人群）、bagelhole/DevOps-Security-Agent-Skills（若 trailofbits 不上）。
