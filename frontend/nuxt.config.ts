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
  vite: {
    server: {
      proxy: {
        // 将前端的/api请求转发到后端3001端口
        '/api': {
          target: process.env.API_BASE,
          changeOrigin: true,
          rewrite: (path) => {
            const newPath = path.replace(/^\/api/, ''); 
            console.log('代理重写前路径:', path, '重写后路径:', newPath); // 添加日志
            return newPath;
          }
        }
      }
    }
  },
  // 添加类型断言解决 TS 类型检查问题
  runtimeConfig: {
    public: {
      // apiBase:  process.env.NODE_ENV === 'production' ? process.env.API_BASE : 'http://localhost:3001' // 后端接口基地址
      apiBase:  process.env.API_BASE // 后端接口基地址
    }
  } as any
})