<template>
  <div>
    <h1>简单案例列表</h1>
    <ul>
      <li v-for="caseItem in cases" :key="caseItem.id">
        <!-- 使用NuxtLink进行导航 -->
        <NuxtLink :to="'/cases/' + caseItem.id">
          {{ caseItem.description }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { CaseItem } from '~/api/cases';
// 静态案例数据
const cases: CaseItem[] = [
  { id: '1', description: '案例1', image: '/images/case1.jpg', publishTime: '2025-01-01', order: 1, isActive: true },
  { id: '2', description: '案例2', image: '/images/case2.jpg', publishTime: '2025-01-02', order: 2, isActive: true },
  { id: '3', description: '案例3', image: '/images/case3.jpg', publishTime: '2025-01-03', order: 3, isActive: true },
  { id: '4', description: '案例4', image: '/images/case4.jpg', publishTime: '2025-01-04', order: 4, isActive: true }
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