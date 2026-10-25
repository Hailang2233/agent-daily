/*
 * 站点配置。部署到自己的 GitHub Pages 前，建议改掉 heat.namespace，
 * 否则会和别人的部署共用同一份计数。
 */
(function (root) {
  var CONFIG = {
    repoUrl: "https://github.com/Hailang2233/agent-daily",
    siteUrl: "https://hailang2233.github.io/agent-daily/",
    heat: {
      enabled: true,
      baseUrl: "https://abacus.jasoncameron.dev",
      namespace: "agent-daily-hailang2233"
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = CONFIG;
  else root.AGENT_CONFIG = CONFIG;
})(typeof globalThis !== "undefined" ? globalThis : this);
