# AI 工具市场选品调研（第 4 批：浏览器自动化 / 移动自动化 / 逆向 / 爬虫 / OSINT）

> 调研范围：D:\参考项目\ 下 36 个目录。收品标准：CLI 工具 / MCP / 技能 / 桌面应用，Windows 一键安装可行。渗透/攻击类排除，防御性/逆向分析/爬虫/浏览器自动化可考虑。

## 全量清单

| 名称 | 类型 | 功能一句话 | 安装方式 | 上架?(是/否+理由) |
|------|------|-----------|---------|------------------|
| nanobrowser__nanobrowser | 浏览器扩展（WXT/TS） | 侧边栏 AI 浏览器 Agent，读页面、点击、填表完成网页任务 | Chrome Web Store 一键安装 / `pnpm install && pnpm build` 加载 unpacked | **是** — 扩展商店一键装，低门槛高需求，需用户自带 LLM Key |
| bytebot-ai__bytebot | 桌面 Agent（Docker 全栈） | 给 AI 一台完整虚拟电脑（桌面+文件+应用）执行多步任务 | `docker compose up`（Railway 一键部署） | **否** — 依赖 Docker 重栈，Windows 非 Docker Desktop 用户门槛高；可作远期候选 |
| bytedance__UI-TARS-desktop | 桌面应用（Electron） | 字节 UI-TARS 多模态 GUI Agent 桌面端，操控本机/远程电脑与浏览器 | GitHub Releases 下载 exe 安装包 | **是** — 官方安装包一键装，明星项目，需配模型 API |
| UI-TARS-desktop | 同上（重复副本） | 同上 | 同上 | **否** — 与 bytedance__UI-TARS-desktop 重复，去重 |
| TuriX-CUA-main | 桌面 Agent（Python）+ OpenClaw 技能 | 桌面电脑操作 Agent（OSWorld 60%），附 OpenClaw skill | macOS 15+ 为主；Windows 支持在 `multi-agent-windows` 分支 | **否** — 主线面向 macOS，Windows 分支不成熟，安装需 Python 环境+权限配置 |
| Tongyi-MAI__OpenGCUA | Agent 框架（Node/TS） | 通用计算机使用 Agent 全栈（GCUA），视觉+API+shell 混合操作 | 源码构建（packages/），面向研究者 | **否** — 研究 harness 定位，无用户级安装包，门槛高 |
| droidrun__mobile-jev | 移动 Agent（Node/pnpm） | 通过 Mobilerun API 控制真实 Android 手机执行任务（21 秒 9 步） | `pnpm install` + 双 API Key（Mobilerun+TypeSafe） | **否** — 依赖两个付费/云服务 Key + Mobilerun 设备，非一键可用 |
| magnitude(dev)/magnitudedev__magnitude | 本地推理引擎 CLI | 按机器硬件自动推荐/下载/运行本地模型，接入 Claude Code 等各类 harness | `npm i -g @magnitudedev/cli && magnitude setup` | **是** — npm 一键装，setup 自动探测硬件，本地模型需求旺盛 |
| callstack__agent-device | MCP + CLI（Node 22+） | 移动/桌面 App 自动化与验证：让编码 Agent 在真机/模拟器上检查与操作 App | `npm i -g agent-device`（内置 MCP server） | **是** — npm 一键装 + MCP 一行接入，Expensify/Shopify 背书，移动开发者刚需 |
| mobile-mcp | MCP 服务器（npm） | 跨平台 iOS/Android 自动化 MCP（无障碍快照+坐标点击） | `npx -y @mobilenext/mobile-mcp@latest` 接入任意 MCP 客户端 | **是** — npx 一键接入，MCP 生态标准姿势，VS Code 一键安装按钮 |
| x64dbg-mcp-server | MCP 插件（Zig 单二进制） | 把 x64dbg 调试器 84 个工具暴露给 AI（断点/步进/内存/PE 分析） | Release 下载 dll 放入 x64dbg plugins 目录 | **是** — 拖文件即装，零依赖；逆向场景强需求（需自备 x64dbg） |
| LaurieWired__GhidraMCP | MCP + Ghidra 插件 | 让 LLM 在 Ghidra 中自主反编译、重命名、分析二进制 | Ghidra File→Install Extensions 导入 zip + `pip install ghidra-mcp` | **是** — Ghidra 图形化两步导入，5.8k★ 明星逆向项目 |
| firmware-reverse-engineering | Claude Code / Codex 插件（5 个技能） | 固件提取、静态分析、Ghidra RE、QEMU 仿真、安全报告全流程技能包 | `/plugin marketplace add OrbitCurve/firmware-reverse-engineering` | **是** — Claude Code 插件市场一行安装；底层工具（unblob/Ghidra）需另装 |
| android-reverse-engineering-skill | Claude Code 技能 | APK/XAPK 反编译并提取 HTTP API（Retrofit/OkHttp/Ktor），R8 反混淆恢复 Kotlin 类名 | 复制技能目录到 `~/.claude/skills/`（附 PowerShell 脚本，实验性支持 Windows） | **是** — 技能文件即装；Windows PowerShell 支持实验性，标注即可 |
| js-reverse-skill | Claude Code 技能（中文） | 网页 JS 参数逆向（签名/Cookie/指纹/WASM/JSVMP）交付 Node/Python 实现 | 技能目录复制安装 | **是** — 中文文档、需求独特（JS 逆向自动化），注意上游许可证混杂（MIT 聚合+未声明上游），上架需合规标注 |
| firefox-reverse | 定制 Firefox 桌面应用 | 内置 AI 逆向 Agent + 指纹环境管理器的 Firefox，网页加密参数黑盒→可运行算法 | GitHub Releases 下载安装 | **是** — Windows 安装包，国内爬虫/风控对抗场景刚需（MPL 2.0） |
| PE-reverse-skill | CLI（Python） | PE/APK 静态分析、内存读写、补丁、协议推断、语义 IR 的本地逆向平台 | Python 环境安装，流程较复杂 | **否（暂缓）** — 非 pip 单命令安装，且含内存写入/DLL 注入能力，需先做合规边界审查 |
| ghidra-re-skill-main | Claude Code / Codex 技能 | Ghidra headless 分析 + 活体 bridge 迭代式 RE 会话（Mach-O 优化） | 复制到 `~/.claude/skills/ghidra-re`（macOS/Windows 双支持） | **是** — 技能即装，双 host 支持；与 GhidraMCP 互补可同架 |
| WerWolv__ImHex | 桌面应用（C++） | 面向逆向工程师的 hex 编辑器（模式/脚本/数据可视化） | winget/GitHub Releases 安装包 | **是** — `winget install WerWolv.ImHex` 一键；⚠️ 本地目录仅剩空 .git，待补验证 |
| cutter | 桌面应用（rizin 前端） | 免费开源逆向平台（反编译/调试/分析 GUI） | GitHub Releases 下载 Windows 安装包 | **是** — 安装包一键装，老牌 RE 工具，与 Ghidra 系互补 |
| yaklang__yakit | 桌面应用（安全平台） | 基于 yak 引擎的网络安全研究平台（MITM/扫描/Fuzz GUI） | GitHub Releases 下载 exe | **是（合规标注）** — 防御向安全平台一键装；⚠️ 本地目录为空 .git，待补验证；需"仅授权测试"声明 |
| bettercap | 渗透框架（Go） | 中间人/嗅探/WiFi/BLE 攻击框架 | 预编译二进制 | **否** — 典型攻击工具（MITM/WiFi 攻击），违反选品红线 |
| bee-san__Ciphey | CLI（Python） | AI 自动解密/解码任意密文（自动猜编码+爆破） | `pip install ciphey`（ Windows 支持一般，最新版停更偏旧） | **否（暂缓）** — 本地目录空 .git；pip 可装但 Windows wheel 历史问题多、维护不活跃，风险大于收益 |
| hackingtool | 攻击工具集合（Python） | 215 个渗透/OSINT/钓鱼/post-exploitation 工具聚合器 | `pip install` / 源码 | **否** — 明确含 phishing、post-exploitation 等攻击类目，触红线 |
| OpenOSINT | CLI + MCP + REPL（PyPI） | 20 个 OSINT 调查工具的自然语言 Agent（幻觉不可能，AI 只发硬停调用） | `pip install openosint` / MCP registry 已收录 | **是** — PyPI 一键 + MCP 官方注册，防御/调查向，MIT |
| lissy93__web-check | Web 应用（Astro+API） | 全能网站体检：DNS/SSL/技术栈/排名/归档等数十项一站检测 | Docker / Netlify / Vercel 部署 | **是（网页形态）** — 有官方托管站可直用；自部署非 Windows 桌面一键，标注"在线即用" |
| web-check | 同上（重复副本） | 同上 | 同上 | **否** — 重复，去重 |
| andeya__pholcus | 爬虫框架（Go，Web GUI） | 纯 Go 分布式高并发爬虫框架，带 Web 管理界面 | `go install` / 下载二进制 | **否（暂缓）** — 框架需写规则才可用（非开箱），项目更新停滞（老旧），同类替代多 |
| crawl4ai | 爬虫库 + Docker（Python） | LLM 友好爬虫，输出 Markdown/JSON，#1 trending | `pip install crawl4ai && crawl4ai-setup` | **是** — pip 两行装，100k★ 生态位最强，配合 MCP 有现成接入 |
| ScrapeGraphAI__Scrapegraph-ai | 爬虫库（Python） | 图逻辑 + LLM 生成抓取管线，"说想要什么即得到" | `pip install scrapegraph-py`（SDK）/ pip install scrapegraph-ai | **是** — pip 一键；注意新版本主推云 SDK，开源库维护节奏放缓，标注即可 |
| anycrawl | Node 服务 + npm 库 | Firecrawl 风格自托管抓取 API（SERP/批量/多线程，LLM-ready） | `npm i anycrawl` 或 Docker | **是（候选）** — npm 可装但完整体验需 Redis+服务端，按"库"形态上架更稳 |
| katana | CLI（Go） | 下一代爬虫框架（标准+headless 模式，JS 解析，表单填充） | `go install github.com/projectdiscovery/katana/cmd/katana@latest` | **是** — projectdiscovery 出品，Go 二进制零依赖；提供 Windows 预编译下载，一行装 |
| stealth-browser-mcp | MCP 服务器（Python） | nodriver 隐身浏览器过 Cloudflare/反爬/登录墙，供 MCP Agent 使用 | `pip install stealth-browser-mcp`（或 uvx） | **是** — pip 一键 + MCP 接入，反爬刚需（合规：仅限授权采集） |
| vibheksoni__stealth-browser-mcp | 同上（重复副本） | 同上 | 同上 | **否** — 重复，去重 |
| mcp-captcha-solver | MCP 服务器（Node） | 30 个验证码求解工具（本地 OCR Tesseract.js + 滑块/网格 + 6 家外部服务） | `npm install && npm start`（非全局发布，需 clone） | **否（暂缓）** — 未发布 npm 包，需 clone+依赖安装非一键；依赖外部打码服务的部分涉付费，另注意使用场景合规 |
| ohmycaptcha | API 服务（FastAPI） | 自托管 YesCaptcha 风格验证码求解服务（19 种任务类型，reCAPTCHA/hCaptcha/Turnstile） | Render/HuggingFace 一键部署 / Docker | **否（暂缓）** — 面向服务端部署而非桌面一键；验证码绕过合规风险偏高，暂不收 |

## 分层结论

- **直接收（MCP/CLI 一键）**：mobile-mcp、callstack__agent-device、crawl4ai、katana、stealth-browser-mcp、OpenOSINT、magnitudedev__magnitude、x64dbg-mcp-server、firmware-reverse-engineering
- **收（桌面应用/扩展）**：bytedance__UI-TARS-desktop、nanobrowser、GhidraMCP、firefox-reverse、ImHex（待补验证）、cutter、yakit（待补验证+合规标注）
- **收（技能包）**：android-reverse-engineering-skill、js-reverse-skill、ghidra-re-skill-main
- **否（攻击红线）**：bettercap、hackingtool
- **否（重栈/门槛/重复）**：bytebot、TuriX、OpenGCUA、mobile-jev、pholcus、mcp-captcha-solver、ohmycaptcha、PE-reverse-skill、web-check 重复副本×3

---

# TOP3 推荐

## 🥇 1. crawl4ai — LLM 友好爬虫（生态位最强）

- **类型**：Python 爬虫库 + MCP 接入 | **License**：Apache-2.0 | 100k+ ★
- **功能**：开源 LLM 友好网络爬虫，自动输出 Markdown/JSON 给 LLM 使用，含深度爬取、会话管理、反爬适配
- **上架理由**：pip 两行安装，Windows 兼容好；爬虫是市场上最高频需求；自带官方 MCP server 可直接挂进 AI-Tools-Hub
- **安装命令原文**：
```bash
pip install crawl4ai
crawl4ai-setup
# MCP 接入（stdio）:
npx -y crawl4ai-mcp
```

## 🥈 2. callstack__agent-device — 编码 Agent 的移动/桌面 App 验证层

- **类型**：CLI + 内置 MCP + Node API | **License**：MIT | callstack 官方维护
- **功能**：让 Claude Code/Codex/Cursor 等编码 Agent 在 iOS/Android/HarmonyOS 模拟器与真机上检查、操控、验证 App，读取省 token 的无障碍快照而非截图
- **上架理由**：`npm i -g agent-device` 一键装，`agent-device doctor` 自检；MCP 一行接入；移动开发者验证刚需，竞品少；Expensify/Shopify 生产背书
- **安装命令原文**：
```bash
npm install -g agent-device
agent-device doctor   # 自检环境（需要 Node.js ≥ 22.12）
```

## 🥉 3. x64dbg-mcp-server — AI 驱动的 x64dbg 调试逆向

- **类型**：x64dbg 原生 MCP 插件（Zig 单二进制 dll） | **License**：MIT
- **功能**：把 x64dbg 的 84 个调试工具（断点/步进/内存读写/PE 分析/OEP 检测）通过 Streamable HTTP MCP 暴露给任意 AI 助手，实现 agentic 逆向
- **上架理由**：拖 dll 进 x64dbg 插件目录即装（零依赖单二进制），逆向场景用户付费意愿强、竞品几乎为零；前提是用户已装 x64dbg（免费），可做成"组合一键包"
- **安装命令原文**：
```powershell
# 1. 下载 Release 中的插件 zip
# https://github.com/duty1g/x64dbg-mcp-server/releases
Expand-Archive x64dbg-mcp-server.zip -DestinationPath "$env:USERPROFILE\Desktop\x64dbg\release\x64\plugins"
# 2. 在 x64dbg 中启动目标程序，插件自动开 MCP HTTP 服务
# 3. MCP 客户端配置（streamable http）:
#    "url": "http://127.0.0.1:9000/mcp"
```

---
*调研日期：基于本地快照仓库；ImHex / yakit / Ciphey 三个本地目录只有空 .git，相关结论标注"待补验证"。*
