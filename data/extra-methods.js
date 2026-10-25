/*
 * 来自开源社区的方法（24 条），均为改写后的表述，来源见每条 source。
 * 原有 36 条方法保持不变。
 */
(function (root, factory) {
  var methods = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = methods;
  else root.EXTRA_METHODS = methods;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  return [
    /* ---------- 心法 ---------- */
    {
      id: "m37", cat: "心法", level: 3, isNew: true,
      title: "垂直切片（tracer bullet）",
      one: "每个切片纵向打通所有层，尽早拿到端到端反馈。",
      why: "AI 默认按层横切（先数据库、再接口、最后前端），问题会拖到最后才暴露。",
      steps: ["定义一个能端到端跑通的最小场景", "每一步都跨层改动", "完成即验证", "再扩展下一片"],
      try: "把下一个功能拆成一条能从输入跑到输出的竖切片。",
      tags: ["切片", "端到端", "反馈"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m38", cat: "心法", level: 3, isNew: true,
      title: "原型优于规格",
      one: "与其写长 PRD，不如低成本多做几版可运行的原型。",
      why: "构建成本低时，多个可运行版本比抽象描述更快逼近答案。",
      steps: ["先做 3 个不同方向的最小原型", "对比取舍", "保留最好的那个", "再补规格与边界"],
      try: "今天用两个原型替代一次需求讨论。",
      tags: ["原型", "规格", "探索"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m39", cat: "心法", level: 2, isNew: true,
      title: "挑战式验收",
      one: "让它出题考你，或证明改动真的有效，而不是「看起来对」。",
      why: "逼它从「完成」切换到「证明」，能暴露自测盲区。",
      steps: ["说「grill me on these changes」", "要求给出可复现的验证步骤", "你通过后才合并", "不通过就重做"],
      try: "下次 review 前，先让它给你出一份验收考题。",
      tags: ["验收", "证明", "review"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m40", cat: "心法", level: 3, isNew: true,
      title: "小而专的 agent",
      one: "一个 agent 只做一件事，边界越清楚越可靠。",
      why: "大而全的 agent 上下文混杂、职责冲突；小而专的更容易验证和复用。",
      steps: ["按职责拆分", "每个只给必要上下文", "定义输入输出", "用编排层串联"],
      try: "把今天的「全能助手」任务拆成两个专职 agent。",
      tags: ["拆分", "职责", "编排"],
      source: { name: "12-Factor Agents", url: "https://github.com/humanlayer/12-factor-agents" }
    },

    /* ---------- 上下文 ---------- */
    {
      id: "m41", cat: "上下文", level: 3, isNew: true,
      title: "40% 上下文法则",
      one: "上下文用到 40% 就开始整理，60% 前收尾。",
      why: "上下文越长，模型越容易抓不住重点、开始「变笨」。",
      steps: ["关注上下文占用", "到 40% 做摘要或压缩", "到 60% 换新会话", "新任务直接开新会话"],
      try: "下次长会话到一半，主动做一次摘要并清掉无关内容。",
      tags: ["上下文", "压缩", "会话"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m42", cat: "上下文", level: 3, isNew: true,
      title: "回退而不是纠正",
      one: "走错路就退回失败前，带着新认知重来，别在污染上下文里打补丁。",
      why: "失败尝试和纠正记录会一直留在上下文里，持续干扰后续判断。",
      steps: ["发现方向错了就停", "回到出错前的检查点", "用一句新认知重新提示", "不要在错误分支上叠补丁"],
      try: "今天遇到一次反复修不好，直接回退重开而不是继续修补。",
      tags: ["回退", "检查点", "上下文"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m43", cat: "上下文", level: 4, isNew: true,
      title: "子代理隔离上下文",
      one: "把「查资料、翻文件」放进子代理，主上下文只收结论。",
      why: "中间过程占用大量上下文，真正有用的往往只是最后结论。",
      steps: ["问自己「这个输出我还会再用吗」", "不会就交给子代理", "只要求返回结论和依据", "主线程继续做决策"],
      try: "把一次大范围搜索交给子代理，只让它回报 5 条结论。",
      tags: ["子代理", "上下文", "检索"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m44", cat: "上下文", level: 2, isNew: true,
      title: "新任务新会话",
      one: "真正的新任务开新会话，相关的后续工作才复用上下文。",
      why: "旧任务的假设会悄悄污染新任务，越相关越难察觉。",
      steps: ["判断是否同一目标", "不同就新会话", "用交接摘要带必要信息", "不要用「顺便再做个…」"],
      try: "今天把两个无关任务分成两次会话。",
      tags: ["会话", "上下文", "切换"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m45", cat: "上下文", level: 3, isNew: true,
      title: "交接摘要",
      one: "长任务结束前，让它写一份「给下一轮自己」的交接。",
      why: "换会话、换人或隔天回来时，交接比重读全文便宜得多。",
      steps: ["总结已完成、未完成、关键决定", "写清下一步", "你修正", "存成文件或贴进新会话"],
      try: "今天结束前写一份 5 行交接。",
      tags: ["交接", "摘要", "会话"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m46", cat: "上下文", level: 3, isNew: true,
      title: "预取上下文",
      one: "开工前一次性把可能用到的资料准备好，别让 agent 边做边找。",
      why: "边做边取会打断执行、拉长上下文、增加遗漏。",
      steps: ["列出任务需要的资料", "先批量检索或读取", "做一份索引", "执行阶段只引用"],
      try: "下次任务开始前，先花 5 分钟备齐资料。",
      tags: ["预取", "上下文", "资料"],
      source: { name: "12-Factor Agents", url: "https://github.com/humanlayer/12-factor-agents" }
    },
    {
      id: "m47", cat: "上下文", level: 3, isNew: true,
      title: "压缩错误再排查",
      one: "把冗长错误压缩成「错误类型 + 关键行 + 已试过什么」再交给 agent。",
      why: "整段日志会淹没重点；压缩后的错误更容易被定位。",
      steps: ["截取关键堆栈", "写清复现步骤", "列出已排除项", "再让它给假设"],
      try: "下次贴报错时，先压缩成 5 行。",
      tags: ["报错", "日志", "排查"],
      source: { name: "12-Factor Agents", url: "https://github.com/humanlayer/12-factor-agents" }
    },

    /* ---------- 提示 ---------- */
    {
      id: "m48", cat: "提示", level: 2, isNew: true,
      title: "先采访再开工",
      one: "让它先访谈你，把模糊需求问成可执行规格。",
      why: "需求里没写出来的约束，只有通过提问才能暴露。",
      steps: ["给一个最小说明", "要求它一次问 3–5 个关键问题", "你回答", "它整理成规格再执行"],
      try: "下次模糊需求，先让它采访你一轮。",
      tags: ["提问", "需求", "规格"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m49", cat: "提示", level: 3, isNew: true,
      title: "示例覆盖边界",
      one: "few-shot 不只要正例，还要给边界例和反例。",
      why: "只给正例，模型学不到「什么时候不该这么做」。",
      steps: ["选 2 个典型正例", "加 1 个边界例", "加 1 个反例并说明原因", "让它照此判断新输入"],
      try: "给一个分类任务补一个边界样本。",
      tags: ["few-shot", "示例", "边界"],
      source: { name: "Prompt Engineering Guide", url: "https://github.com/dair-ai/Prompt-Engineering-Guide" }
    },
    {
      id: "m50", cat: "提示", level: 3, isNew: true,
      title: "技能描述写成触发器",
      one: "写「什么时候该用它」，而不是「这个技能是什么」。",
      why: "agent 先看描述决定是否加载；描述是触发器，不是摘要。",
      steps: ["用「当用户需要…时使用」", "写清触发条件和不适用场景", "避免泛泛而谈", "实测是否会被误触发"],
      try: "把一个常用提示模板的描述改成触发式。",
      tags: ["技能", "描述", "触发"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m51", cat: "提示", level: 3, isNew: true,
      title: "技能里写 Gotchas",
      one: "每个技能都留一个「坑」区，记录 agent 在这里翻过的车。",
      why: "失败点是最有信号的内容，比通用步骤更能提升可靠性。",
      steps: ["记录触发条件", "写错误表现", "写正确做法", "每次踩坑就追加"],
      try: "给你的常用工作流加 3 条 gotchas。",
      tags: ["技能", "失败", "gotchas"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m52", cat: "提示", level: 3, isNew: true,
      title: "用配置强制，不靠提示",
      one: "能确定性执行的约束放进配置或钩子，不要指望一句「请务必」。",
      why: "提示会被忽略，配置不会；确定性约束应该由系统保证。",
      steps: ["区分「建议」和「必须」", "必须项写进配置、权限或钩子", "提示里只留判断类要求", "验证是否真的生效"],
      try: "把一条总被忽略的「必须」改成配置或自动检查。",
      tags: ["配置", "约束", "确定性"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },

    /* ---------- 工作流 ---------- */
    {
      id: "m53", cat: "工作流", level: 3, isNew: true,
      title: "频繁操作命令化",
      one: "每天做超过一次的事，做成命令、技能或脚本。",
      why: "重复提示既慢又不稳定；命令是固化下来的最佳实践。",
      steps: ["找出高频操作", "固定输入输出", "写成命令或技能", "每次用完更新"],
      try: "把一个每天重复的提示写成一条命令。",
      tags: ["命令", "自动化", "复用"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m54", cat: "工作流", level: 4, isNew: true,
      title: "双 agent 对抗",
      one: "一个 agent 写实现，另一个专门找 bug，两个上下文互不污染。",
      why: "写的人有盲区；独立上下文更容易发现「看起来对」的错误。",
      steps: ["A 完成实现", "B 只看需求和产物", "B 必须给出可复现问题", "A 修复后由 B 复验"],
      try: "今天让第二个 agent 专挑一个产物的毛病。",
      tags: ["对抗", "子代理", "测试"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m55", cat: "工作流", level: 3, isNew: true,
      title: "隔离工作区并行",
      one: "并行任务用独立分支或工作区，避免互相踩文件。",
      why: "同一目录并行改动会互相覆盖，冲突成本高于并行收益。",
      steps: ["每个任务一个 worktree 或分支", "各自独立验证", "完成后合并", "冲突在合并时解决"],
      try: "下次并行两个改动，先开两个隔离工作区。",
      tags: ["并行", "worktree", "分支"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m56", cat: "工作流", level: 3, isNew: true,
      title: "用钩子自动化收尾",
      one: "把格式化、检查、提醒交给钩子，别每次都靠人记。",
      why: "最后 10% 的机械工作最容易漏，自动化最划算。",
      steps: ["找出每次都要手动做的收尾", "挂到工具执行后或结束前", "失败要能看见", "逐步扩大范围"],
      try: "给一个重复的收尾动作加自动检查。",
      tags: ["钩子", "自动化", "收尾"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m57", cat: "工作流", level: 2, isNew: true,
      title: "先画图再改代码",
      one: "让 agent 先用 ASCII 图画出结构和数据流，再动手。",
      why: "图能快速暴露理解偏差，比读一大段描述便宜。",
      steps: ["要求画模块与数据流", "你确认", "指出错误", "确认后再改"],
      try: "下次改架构前，先要一张 ASCII 图。",
      tags: ["架构", "图", "对齐"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },

    /* ---------- 验证 ---------- */
    {
      id: "m58", cat: "验证", level: 4, isNew: true,
      title: "跨模型评审计划",
      one: "计划阶段就让另一个模型或 agent 以资深工程师视角挑错。",
      why: "计划阶段改方向最便宜；同模型容易共享盲区。",
      steps: ["把计划交给第二个模型", "要求按风险排序", "只采纳能落地的问题", "修订后再执行"],
      try: "把今天的计划交给另一个模型评审一次。",
      tags: ["评审", "计划", "跨模型"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },

    /* ---------- 成长 ---------- */
    {
      id: "m59", cat: "成长", level: 3, isNew: true,
      title: "规则文件瘦身",
      one: "规则文件控制在 200 行内，越短越容易被遵守。",
      why: "规则越长越容易被忽略，关键约束会被淹没。",
      steps: ["统计行数", "删掉显而易见和过时的", "把领域规则拆到子文件", "只留高信号内容"],
      try: "把一条规则文件压到 200 行以内。",
      tags: ["规则", "CLAUDE.md", "维护"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    },
    {
      id: "m60", cat: "成长", level: 4, isNew: true,
      title: "维护失败点清单",
      one: "把 agent 的失败点按场景归档，定期回看。",
      why: "失败会重复；清单能把「踩过的坑」变成「不会再踩」。",
      steps: ["记录场景与触发条件", "记录错误表现", "标注正确做法", "每周回看并写进规则或技能"],
      try: "给最近三次翻车各写一条失败点。",
      tags: ["失败", "复盘", "清单"],
      source: { name: "Claude Code Best Practice", url: "https://github.com/shanraisshan/claude-code-best-practice" }
    }
  ];
});
