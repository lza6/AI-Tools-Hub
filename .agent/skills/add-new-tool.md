# 技能：一键添加新工具到 AI-Tools-Hub

## 适用场景
用户给出一个新工具（GitHub 仓库或安装命令），要加入工具广场。

## 前置读取
- `AGENTS.md`（硬性规则）
- `registry/manifest.json`（现有条目做模板，version 3 结构）
- ICM: `icm recall "ai-tools-hub manifest install"` 历史踩坑

## 步骤（每步必做，缺一不可）

### 1. 摸清官方事实（禁止编造）
- `gh api repos/<owner>/<repo>/contents --jq '.[].name'` 看有无 install.ps1/install.sh
- `gh api repos/<owner>/<repo>/releases/latest --jq '[.assets[].name]'` 看预编译资产名（精确抄写，含架构）
- 读官方 README 的 Quick Start / Install 章节，提取真实命令
- ⚠️ 历史教训：rtk 没有 install.ps1 但被想当然写了 → 404；必须核实

### 2. 确定 install 类型（按优先级）
| 类型 | 用途 | 必填字段 |
|------|------|---------|
| `github-release` | 有预编译二进制，最推荐（网络环境实测最稳） | asset（精确文件名）、file（解压后的 exe 名） |
| `ps1` / `shell` | 官方安装脚本存在且已验证 | url |
| `winget` | 官方文档指定 winget（Windows） | pkg |
| `brew` / `npm` / `cargo` | 对应包管理器 | pkg |

### 3. 填写 manifest 条目（全部字段）
- `id`（=可执行文件名，检测用）、`name`、`fullName`、`type`（cli-tool/mcp/skill/hook）、`category`（用途分类）
- `repo`、`description`（官方描述中文化）、`capabilities`（4-5 个）、`solves`（解决什么痛点）
- `install.{windows,macos,linux}`（至少 windows）、`versionCmd`（`<id> --version`）
- `usage`：quickStart + commands[]（从官方 README 真实提取）+ notes
- `skills`：官方 init 命令（如 `xxx init`），keywords 用于检测是否已启用
- `conflicts`：有输出改写/端口占用/同功能工具时必填

### 4. 校验与验证（真实闭环）
```bash
node -e "JSON.parse(require('fs').readFileSync('registry/manifest.json','utf8')); console.log('VALID')"
# 版本命令本机实测（已装时）
<id> --version
# 安装链路实测：应用内点一键安装，日志中心确认走通
```

### 5. 提交发版
```bash
git add registry/manifest.json && git commit -m "feat(registry): add <tool>"
git push origin main   # 客户端"刷新清单"即可拉到，无需发版
```

## 验收标准
- 应用内卡片显示、检测准确、安装走通（日志中心无 ECONNRESET 后失败）、usage 命令全部来自官方文档

## 常见坑
1. Windows 下 winget 不在 PATH（代码已处理全路径回退）
2. 直连 GitHub 会 ECONNRESET——github-release 类型自带镜像回退，优先用它
3. 302 之类的偶发失败重试即可（代码已内置 2 次重试×3 镜像）
4. aarch64 mac 用户需在 asset 里补 arm64 资产名
