// 预加载脚本：保持最小权限，仅做桥接占位。
// 工作台本身只用浏览器能力(localStorage / Blob 下载)，无需 Node API。
// 如以后需要「导出到本机文件」「系统通知」等原生能力，可在此安全暴露。
window.addEventListener('DOMContentLoaded', () => {
  // 标记运行环境，便于页面做桌面端专属优化（如有）
  try { window.__RUNTIME__ = 'electron'; } catch (e) {}
});
