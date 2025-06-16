import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss'
  },
  css: [
    '~/assets/css/main.css',  // 全局样式
    'element-plus/dist/index.css'  // Element Plus样式
  ],
  app: {
    head: {
      title: '官网标题',
      meta: [
        { name: 'description', content: '官网描述' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  // 添加类型断言解决 TS 类型检查问题
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001' // 后端接口基地址
    }
  } as any
})