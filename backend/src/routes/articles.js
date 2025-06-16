const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/articles.json');

// 获取所有文章
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: '读取文章数据失败' });
  }
});

// 获取单个文章（根据 ID）
router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const article = data.find(item => item.id === parseInt(req.params.id));
    if (!article) return res.status(404).json({ error: '文章不存在' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: '读取文章数据失败' });
  }
});

// 新增文章
router.post('/', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const newArticle = {
      id: Date.now(), // 生成唯一 ID
      ...req.body,
      createTime: new Date().toISOString()
    };
    data.push(newArticle);
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ error: '新增文章失败' });
  }
});

// 更新文章（根据 ID）
router.put('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const index = data.findIndex(item => item.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: '文章不存在' });
    data[index] = { ...data[index], ...req.body };
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    res.json(data[index]);
  } catch (err) {
    res.status(500).json({ error: '更新文章失败' });
  }
});

// 删除文章（根据 ID）
router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, 'utf8'));
    const newData = data.filter(item => item.id !== parseInt(req.params.id));
    await fs.writeFile(dataPath, JSON.stringify(newData, null, 2));
    res.json({ message: '文章删除成功' });
  } catch (err) {
    res.status(500).json({ error: '删除文章失败' });
  }
});

module.exports = router;