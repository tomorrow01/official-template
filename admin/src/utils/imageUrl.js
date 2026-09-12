/**
 * 标准化后端返回的图片 URL
 *
 * 后端上传接口返回相对路径（如 /uploads/xxx.jpg），由 Vite dev proxy 代理到后端 3002。
 * 但历史数据中可能存有 localhost 绝对地址（如 http://localhost:3000/uploads/xxx），
 * 这类地址在管理后台（5173 端口）无法加载，统一提取路径部分走 Vite 代理。
 */
export function normalizeImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  // 绝对 URL：提取出路径部分（兼容历史 localhost 数据）
  if (/^https?:\/\//i.test(url)) {
    try {
      const u = new URL(url);
      // 仅对本地地址做提取，外部 URL 原样返回
      if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') {
        return u.pathname + u.search;
      }
      return url;
    } catch {
      return url;
    }
  }
  return url;
}
