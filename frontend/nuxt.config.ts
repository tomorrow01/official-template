import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

export default defineNuxtConfig({
  // 只保留最基本的配置
  devServer: {
    port: 3001 // 设置Nuxt开发服务器端口为3002，避免与后端冲突
  },
  // 运行时配置
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || ''
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
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '官网描述' }
      ]
    }
  },
  // 确保API代理仍然工作
  devtools: {
    enabled: true
  },
  // API代理配置
  nitro: {
    devProxy: {
      '/api/': {
        target: 'http://localhost:3000/api/',
        changeOrigin: true
      }
    }
  }
})