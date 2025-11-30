<template>
  <div>
    <h1>简单案例列表</h1>
    <ul>
      <li v-for="caseItem in cases" :key="caseItem.id">
        <!-- 最简单的a标签导航 -->
        <a :href="'/cases/' + caseItem.id">
          {{ caseItem.description }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
// 静态案例数据
const cases = [
  { id: '1', description: '案例1' },
  { id: '2', description: '案例2' },
  { id: '3', description: '案例3' },
  { id: '4', description: '案例4' }
];
</script>

<style>
/* 移除所有可能干扰的样式 */
body {
  margin: 0;
  padding: 20px;
}

a {
  display: block;
  margin: 10px 0;
  padding: 10px;
  background: #eee;
  text-decoration: none;
  color: #000;
}

a:hover {
  background: #ddd;
}
</style>