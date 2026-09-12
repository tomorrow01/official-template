const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { sendResponse } = require('../utils/response');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/configs.json');

// 默认配置模板（不含 id/createTime，由初始化/迁移逻辑补充）
const defaultConfigTemplates = [
  {
    key: 'about_company',
    name: '公司简介',
    value: '我们是一家专注于提供高质量服务的企业，成立于2020年，拥有一支专业的团队和丰富的行业经验。',
    description: '关于我们页面的公司简介内容'
  },
  {
    key: 'about_company_detail',
    name: '公司详细介绍',
    value: '自成立以来，我们始终坚持以客户为中心，不断创新和完善我们的服务体系。我们的团队由行业资深专家组成，能够为客户提供专业、高效的解决方案。未来，我们将继续秉承诚信、专业、创新的理念，为客户创造更大的价值。',
    description: '关于我们页面的公司详细介绍内容'
  },
  {
    key: 'company_mission',
    name: '企业使命',
    value: '为客户创造价值，为员工创造机会，为社会创造效益',
    description: '关于我们页面的企业使命内容'
  },
  {
    key: 'company_vision',
    name: '企业愿景',
    value: '成为行业领先的服务提供商，引领行业发展',
    description: '关于我们页面的企业愿景内容'
  },
  {
    key: 'company_values',
    name: '企业价值观',
    value: '诚信、专业、创新、协作',
    description: '关于我们页面的企业价值观内容'
  },
  {
    key: 'team_members',
    name: '团队成员',
    value: JSON.stringify([
      { name: '张三', role: '总经理', image: '/team/1.jpg' },
      { name: '李四', role: '技术总监', image: '/team/2.jpg' },
      { name: '王五', role: '市场经理', image: '/team/3.jpg' },
      { name: '赵六', role: '设计总监', image: '/team/4.jpg' }
    ]),
    description: '关于我们页面的团队成员信息'
  },
  {
    key: 'company_intro_image',
    name: '公司简介配图',
    value: '',
    description: '关于我们页面公司简介右侧的展示图片'
  }
];

// 初始化配置文件（如果不存在）
async function initializeConfigFile() {
  try {
    await fs.access(dataPath);
  } catch (error) {
    // 文件不存在，创建默认配置
    const now = new Date().toISOString();
    const defaultConfigs = defaultConfigTemplates.map((item, index) => ({
      id: index + 1,
      ...item,
      createTime: now
    }));
    await fs.writeFile(dataPath, JSON.stringify(defaultConfigs, null, 2));
  }
}

// 初始化配置文件
initializeConfigFile();

// 启动迁移：线上已有的 configs.json 可能缺少后续新增的 key（如公司简介配图），
// 自动补齐缺失项（只新增，不修改/删除已有配置）
async function ensureDefaultConfigs() {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const existingKeys = new Set(data.map(item => item.key));
    const missing = defaultConfigTemplates.filter(item => !existingKeys.has(item.key));
    if (missing.length === 0) return;

    let nextId = data.length ? Math.max(...data.map(item => item.id || 0)) : 0;
    missing.forEach(item => {
      nextId += 1;
      data.push({ ...item, id: nextId, createTime: new Date().toISOString() });
    });
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    console.log(`配置文件已自动补齐 ${missing.length} 个缺失项: ${missing.map(i => i.key).join(', ')}`);
  } catch (err) {
    console.error('补齐默认配置失败:', err);
  }
}

ensureDefaultConfigs();

// 获取所有配置
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    sendResponse(res, 200, JSON.parse(data), '读取配置数据成功');
  } catch (err) {
    console.error('读取配置数据失败:', err);
    sendResponse(res, 500, null, '读取配置数据失败');
  }
});

// 新增配置（用于旧数据文件缺少新 key 时，由后台首次保存自动补建）
router.post('/', async (req, res) => {
  try {
    const { key, name, value, description } = req.body || {};
    if (!key) return sendResponse(res, 400, null, '配置 key 不能为空');

    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    if (data.some(item => item.key === key)) {
      return sendResponse(res, 400, null, '配置 key 已存在');
    }

    const newConfig = {
      id: data.length ? Math.max(...data.map(item => item.id || 0)) + 1 : 1,
      key,
      name: name || key,
      value: value ?? '',
      description: description || '',
      createTime: new Date().toISOString()
    };
    data.push(newConfig);
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    sendResponse(res, 200, newConfig, '新增配置成功');
  } catch (err) {
    console.error('新增配置失败:', err);
    sendResponse(res, 500, null, '新增配置失败');
  }
});

// 根据ID获取配置
router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const config = data.find(item => item.id === parseInt(req.params.id));
    if (!config) return sendResponse(res, 404, null, '配置不存在');
    sendResponse(res, 200, config, '读取配置数据成功');
  } catch (err) {
    console.error('读取配置数据失败:', err);
    sendResponse(res, 500, null, '读取配置数据失败');
  }
});

// 根据key获取配置
router.get('/key/:key', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const config = data.find(item => item.key === req.params.key);
    if (!config) return sendResponse(res, 404, null, '配置不存在');
    sendResponse(res, 200, config, '读取配置数据成功');
  } catch (err) {
    console.error('读取配置数据失败:', err);
    sendResponse(res, 500, null, '读取配置数据失败');
  }
});

// 更新配置
router.put('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const index = data.findIndex(item => item.id === parseInt(req.params.id));
    if (index === -1) return sendResponse(res, 404, null, '配置不存在');
    
    data[index] = { 
      ...data[index], 
      ...req.body,
      updateTime: new Date().toISOString()
    };
    
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    sendResponse(res, 200, data[index], '更新配置成功');
  } catch (err) {
    console.error('更新配置失败:', err);
    sendResponse(res, 500, null, '更新配置失败');
  }
});

module.exports = router;