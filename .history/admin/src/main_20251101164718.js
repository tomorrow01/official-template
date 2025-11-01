import { createApp } from 'vue'
import ElementPlus from 'element-plus'  // 新增：引入 Element Plus
import 'element-plus/dist/index.css'   // 新增：引入 Element Plus 样式
import './assets/main.css'
import './assets/global.css'  // 引入全局美化样式
import App from './App.vue'
import router from './router'  // 新增：引入路由（步骤 3 完成后添加）

const app = createApp(App)
app.use(ElementPlus)  // 新增：注册 Element Plus
app.use(router)       // 新增：注册路由（步骤 3 完成后添加）
app.mount('#app')
