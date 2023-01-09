<template>
  <div>{{ message }}</div>

  <button @click="changeMessage">点击修改message</button>
</template>

<script setup>
import { ref } from 'vue';


  const message = ref("欢迎来到我的github")

  const changeMessage = () => {
    message.value = "我被改变了!!"
  }

</script>