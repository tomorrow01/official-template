const express = require('express');
const fs = require('fs').promises;

const router = express.Router();
const path = require('path');

const dataPath = path.join(__dirname, '../data/cases.json');

// 模拟数据库：内存中的客户案例数据
// let cases = [
//   { id: 1, title: '案例1', content: '案例1描述', image: '/images/case1.jpg' },
//   { id: 2, title: '案例2', content: '案例2描述', image: '/images/case2.jpg' }
// ];
let nextId = 3;

// 获取所有客户案例（GET /api/cases）
router.get('/', (req, res) => {
  res.json(dataPath);
});
router.get('/', async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    res.json(JSON.parse(data));
    console.log("case数据：", JSON.parse(data))
  } catch (err) {
    res.status(500).json({ error: '读取数据失败' });
  }
});
// 获取单个客户案例（GET /api/cases/:id）
router.get('/:id', (req, res) => {
  const caseItem = cases.find(item => item.id === parseInt(req.params.id));
  if (!caseItem) return res.status(404).json({ error: '案例不存在' });
  res.json(caseItem);
});

// 创建客户案例（POST /api/cases）
router.post('/', (req, res) => {
  const newCase = {
    id: nextId++,
    ...req.body // 假设前端传递title、content、image等字段
  };
  cases.push(newCase);
  res.status(201).json(newCase); // 201表示资源创建成功
});

// 更新客户案例（PUT /api/cases/:id）
router.put('/:id', (req, res) => {
  const index = cases.findIndex(item => item.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: '案例不存在' });
  cases[index] = { ...cases[index], ...req.body };
  res.json(cases[index]);
});

// 删除客户案例（DELETE /api/cases/:id）
router.delete('/:id', (req, res) => {
  const index = cases.findIndex(item => item.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: '案例不存在' });
  const deletedCase = cases.splice(index, 1)[0];
  res.json(deletedCase);
});

module.exports = router;