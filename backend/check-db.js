const mongoose = require('mongoose');

// 连接数据库
const dbUri = 'mongodb://127.0.0.1:27017/official-template';

async function checkDatabase() {
  try {
    console.log('连接到数据库...');
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('数据库连接成功');
    
    // 获取数据库实例
    const db = mongoose.connection.db;
    
    // 列出所有集合
    console.log('\n列出数据库中的所有集合:');
    const collections = await db.listCollections().toArray();
    collections.forEach(collection => {
      console.log(`- ${collection.name}`);
    });
    
    // 检查configs集合中的数据
    if (collections.some(col => col.name === 'configs')) {
      console.log('\n检查configs集合中的数据:');
      const configs = await db.collection('configs').find().toArray();
      console.log(`共找到 ${configs.length} 条配置数据`);
      console.log('配置数据列表:');
      configs.forEach(config => {
        console.log(`- ${config.key}: ${config.value.substring(0, 50)}${config.value.length > 50 ? '...' : ''}`);
      });
    } else {
      console.log('\n未找到configs集合');
    }
    
    // 断开连接
    await mongoose.disconnect();
    console.log('\n数据库连接已断开');
  } catch (error) {
    console.error('检查数据库时出错:', error);
    process.exit(1);
  }
}

// 执行检查
checkDatabase();