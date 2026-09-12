import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // 只保留最基本的配置
  devServer: {
    port: 3001 // 设置Nuxt开发服务器端口为3001
  },
  // 运行时配置
  runtimeConfig: {
    public: {
      apiBase: '' // 开发环境使用空字符串，确保通过代理转发
    }
  },
  // Element Plus 模块配置
  modules: ['@element-plus/nuxt'],
  // Element Plus 配置
  elementPlus: {
    // 可以在这里添加Element Plus的配置选项
  },
  // 保留基本CSS
  css: [
    '~/assets/css/main.css'  // 全局样式
  ],
  // 基本head配置
  app: {
    head: {
      title: '官方网站',
      meta: [
        { name: 'charset', content: 'utf-8' },
        // viewport-fit=cover 支持 iPhone 刘海屏安全区域
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: '官网描述' }
      ]
    }
  },
  // API 与静态资源代理（dev + 生产均生效）
  // 注意：nitro.devProxy 仅在 dev 模式生效；生产环境（node .output/server/index.mjs）
  // 必须通过 routeRules.proxy 才能把 /api、/uploads 转发到后端 3002。
  routeRules: {
    '/api/**': { proxy: 'http://127.0.0.1:3002/api/**' },
    '/uploads/**': { proxy: 'http://127.0.0.1:3002/uploads/**' }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://127.0.0.1:3002',
        changeOrigin: true
      },
      // 上传的图片由后端静态托管，本地开发也需要代理，否则 /uploads 会落到 Nuxt 路由
      '/uploads': {
        target: 'http://127.0.0.1:3002',
        changeOrigin: true
      }
    }
  }
})