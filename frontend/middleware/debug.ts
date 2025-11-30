export default defineNuxtRouteMiddleware((to, from) => {
  console.log('=== 导航中间件触发 ===');
  console.log('目标路由:', to.path);
  console.log('目标路由名称:', to.name);
  console.log('目标路由参数:', to.params);
  console.log('来源路由:', from.path);
  
  // 如果是案例详情页路由，记录更详细的信息
  if (to.path.includes('/cases/')) {
    console.log('=== 案例详情页导航 ===');
    console.log('案例ID:', to.params.id);
    console.log('路由匹配:', to.matched);
  }
  
  // 这里不做任何拦截，只是记录日志
  return true;
});