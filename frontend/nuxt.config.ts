import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

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
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '官网描述' }
      ]
    }
  },
  // API 代理 + 生产端口
  nitro: {
    port: 3001, // 生产环境默认监听 3001（避免和服务器老项目 3000 冲突）
    devProxy: {
      '/api': {
        target: 'http://127.0.0.1:3002',
        changeOrigin: true
      }
    }
  }
})