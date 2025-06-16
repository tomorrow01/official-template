const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/banners.json');

// 获取所有轮播图
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: '读取轮播图数据失败' });
  }
});

// 获取单个轮播图（根据 ID）
router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const banner = data.find(item => item.id === parseInt(req.params.id));
    if (!banner) return res.status(404).json({ error: '轮播图不存在' });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: '读取轮播图数据失败' });
  }
});

// 新增轮播图
router.post('/', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const newBanner = {
      id: Date.now(),
      ...req.body,
      createTime: new Date().toISOString()
    };
    data.push(newBanner);
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    res.status(201).json(newBanner);
  } catch (err) {
    res.status(500).json({ error: '新增轮播图失败' });
  }
});

// 更新轮播图（根据 ID）
router.put('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const index = data.findIndex(item => item.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: '轮播图不存在' });
    data[index] = { ...data[index], ...req.body };
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    res.json(data[index]);
  } catch (err) {
    res.status(500).json({ error: '更新轮播图失败' });
  }
});

// 删除轮播图（根据 ID）
router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const newData = data.filter(item => item.id !== parseInt(req.params.id));
    await fs.writeFile(dataPath, JSON.stringify(newData, null, 2));
    res.json({ message: '轮播图删除成功' });
  } catch (err) {
    res.status(500).json({ error: '删除轮播图失败' });
  }
});

module.exports = router;