/**
 * 标准化后端返回的图片 URL
 *
 * 后端上传接口返回的是相对路径（如 /uploads/xxx.jpg），
 * 生产环境由 nginx 反代 /uploads 到后端静态目录，直接可用；
 * 但开发环境（Nuxt 3000 / 后端 3002）下，nitro.devProxy 对带扩展名的静态资源
 * 会被 Vite 中间件拦截导致 404，因此需要在 dev 时给相对路径补上后端地址。
 *
 * 另外，历史数据中可能存有 localhost 绝对地址（如 http://localhost:3000/uploads/xxx），
 * 这类地址在开发和生产环境下都不可靠，统一提取路径部分处理。
 */
export function useImageUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return '';

  // 绝对 URL：提取出路径部分再走后续逻辑（兼容历史 localhost 数据）
  if (/^https?:\/\//i.test(url)) {
    try {
      const u = new URL(url);
      // 仅对本地地址做提取，外部 URL 原样返回
      if (u.hostname === 'localhost' || u.hostname === '127.0.0.1') {
        url = u.pathname + u.search;
      } else {
        return url;
      }
    } catch {
      return url;
    }
  }

  // 开发环境：相对路径补全后端地址
  if (import.meta.dev && url.startsWith('/')) {
    return `http://localhost:3002${url}`;
  }
  return url;
}
