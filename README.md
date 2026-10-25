# Agent 日课 · Agent Daily

每天一个可执行的 Agent 使用方法。纯静态、零依赖、可离线打开，也可以部署到 GitHub Pages 每天自动更新。

- **60 条方法**：36 条内置 + 24 条改写自开源社区（附来源链接）
- **每日 3 条**：由 GitHub Action 每天生成 `data/daily.js`，自动提交
- **本地问答**：底部输入你的问题，从方法库里匹配 3 条最相关的（不调用外部 API）
- **热度榜**：匿名浏览计数（可选），看看大家都在看什么
- **练习闭环**：打卡、连续天数、热力图、掌握标记、LV1–5 能力阶梯、每周复盘
- **自建方法**：页面表单添加，参与每日轮换
- **数据本地**：练习记录存 `localStorage`，可导出 / 导入 JSON

## 快速开始

直接双击 `index.html` 即可（`file://` 下所有功能可用）。

或者起一个本地静态服务器：

```bash
python -m http.server 8080
# 打开 http://localhost:8080
```

## 目录

```
index.html              页面（结构 / 样式 / 逻辑）
icon.svg                图标源文件
icon-256.png            favicon 与快捷方式图标
data/
  config.js             站点配置（仓库地址、热度开关与命名空间）
  extra-methods.js      24 条社区来源的方法
  pool.json             每日轮换池（新增方法后要加进来）
  daily.js              自动生成：今日 3 条（勿手改）
  heat.js               自动生成：匿名浏览计数（勿手改）
scripts/
  pick-daily.mjs        生成每日 3 条
  fetch-heat.mjs        拉取匿名计数
.github/workflows/
  daily.yml             每天 08:00（北京时间）更新并提交
  pages.yml             推送到 main 时部署 GitHub Pages
```

## 每日自动更新怎么做

`daily.yml` 每天运行一次：

1. `pick-daily.mjs` 用日期做种子，从 `pool.json` 选 3 条（优先不同维度），写入 `data/daily.js`；
2. `fetch-heat.mjs` 拉取匿名浏览计数，写入 `data/heat.js`；
3. 有变化就提交回仓库，`pages.yml` 随之部署。

页面读取 `data/daily.js` 决定当天推荐，所以线上版本每天都会变；本地 `file://` 打开时读取的是仓库里已有的文件。

手动跑一次：

```bash
npm run update
```

## 添加一条方法

1. 在 `data/extra-methods.js` 里追加一个对象（或直接改内置 36 条）：

```js
{
  id: "m61",
  cat: "验证",          // 心法 / 上下文 / 提示 / 工作流 / 验证 / 成长
  level: 3,             // 1–5
  title: "一句话标题",
  one: "一句话结论",
  why: "为什么有效",
  steps: ["第一步", "第二步"],
  try: "今天就能做的小练习",
  tags: ["关键词", "便于问答检索"],
  source: { name: "来源名称", url: "https://..." } // 可选
}
```

2. 把 `{ "id": "m61", "cat": "验证" }` 加进 `data/pool.json`，否则不会被每日轮换选中。

新增方法会自动出现在方法库、问答检索、掌握统计里；原有 36 条不受影响。

## 热度计数与隐私

- 页面默认使用 [Abacus](https://abacus.jasoncameron.dev/) 的公开计数器：打开方法详情或设为今日练习时，发送一次匿名计数（不含任何个人信息）。
- 只在 `http(s)` 下发送；本地 `file://` 打开不会上报。
- 想关闭：把 `data/config.js` 里的 `heat.enabled` 改成 `false`。
- 部署自己的站点时，**请改掉 `heat.namespace`**，否则会和别的部署共用计数。
- 热度榜数据来自 `data/heat.js`，由 Action 每天同步一次；页面上的数字最多滞后一天。

## 部署到 GitHub Pages

1. Fork / 新建仓库，把本目录推到 `main`。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。
3. 修改 `data/config.js`：
   ```js
   repoUrl: "https://github.com/<你的用户名>/<仓库名>",
   heat: { enabled: true, baseUrl: "https://abacus.jasoncameron.dev", namespace: "自己的一串唯一名字" }
   ```
4. 打开 **Actions → Daily update → Run workflow** 手动跑一次，确认 `data/daily.js` 更新并提交。
5. 打开 **Actions → Deploy to GitHub Pages**，或在 Settings 里看部署地址。

> 如果仓库默认分支不是 `main`，同步修改 `pages.yml` 里的 `branches`。

## 方法来源与许可

24 条社区方法来自以下开源项目，均为改写表述，逐条附了原仓库链接：

- [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) — MIT
- [humanlayer/12-factor-agents](https://github.com/humanlayer/12-factor-agents) — 许可见原仓库
- [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) — MIT
- 调研参考：[Meirtz/Awesome-Context-Engineering](https://github.com/Meirtz/Awesome-Context-Engineering)（MIT）、[agentskills/agentskills](https://github.com/agentskills/agentskills)（Apache-2.0）

详见 [ATTRIBUTION.md](ATTRIBUTION.md)。

本项目代码以 MIT 许可发布，见 [LICENSE](LICENSE)。

## 说明

- 问答是**本地关键词匹配**，不是大模型对话；它不会调用 API、不会上传你的问题。
- 页面无外部字体、无 CDN、无跟踪脚本；唯一的网络请求是匿名浏览计数（可关闭）。
- 内置 36 条为原创整理；社区方法只做归因与改写，不整段复制原文。
