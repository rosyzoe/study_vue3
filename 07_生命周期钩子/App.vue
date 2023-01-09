<template>
  
</template>

<script setup>
  import { onMounted, onUnmounted } from 'vue';

  onMounted(() => {
    console.log("组件dom挂载完毕")
  })

  onUnmounted(() => {
    console.log("组件已被卸载(切换路由)")
  })
</script>