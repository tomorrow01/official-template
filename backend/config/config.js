// 数据库配置
module.exports = {
  // MongoDB连接信息
  mongoURI: 'mongodb://localhost:27017/official-template',
  // 数据库名称
  dbName: 'official-template',
  
  // 服务端口
  port: process.env.PORT || 3000,
  
  // 环境变量
  env: process.env.NODE_ENV || 'development'
};