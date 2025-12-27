/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

// 支持 Vue 文件导入
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
