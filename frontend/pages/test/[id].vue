<template>
  <div>
    <h1>测试动态路由</h1>
    <p>当前ID: {{ $route.params.id }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
console.log('路由参数:', route.params);
</script>