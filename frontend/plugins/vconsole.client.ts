/**
 * vConsole 移动端调试面板（仅客户端加载，SSR 安全）
 *
 * 启用方式（两种任选）：
 *   1. URL 带 ?debug=true   —— 最常用，生产/开发都能用
 *   2. localStorage.setItem('debug', '1')  —— 持久开启，刷新也保留
 *
 * 关闭方式：
 *   - URL 去掉 ?debug=true 或 ?debug=false
 *   - localStorage.removeItem('debug')
 *
 * 注意：插件默认不会 import vconsole 包（避免增大首屏体积），
 *       只有命中上述条件才会动态 import() 并初始化。
 */
export default defineNuxtPlugin(async () => {
  // 先判断条件，命中才加载
  const hasUrlFlag =
    typeof window !== 'undefined' &&
    (new URLSearchParams(window.location.search).get('debug') === 'true' ||
     new URLSearchParams(window.location.search).get('debug') === '1')

  const hasStorageFlag =
    typeof localStorage !== 'undefined' && localStorage.getItem('debug') === '1'

  if (!hasUrlFlag && !hasStorageFlag) return

  // 动态 import：只有需要的时候才下载 vconsole（~10KB gzip）
  const VConsole = (await import('vconsole')).default
  // eslint-disable-next-line no-new
  new VConsole({
    defaultPlugins: ['system', 'network', 'element', 'storage'],
  })

  // eslint-disable-next-line no-console
  console.log('[vConsole] 已启用，点击右下角绿色按钮查看调试面板')
})
