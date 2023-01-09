<template>
  <div>
    <div>username: {{ userInfo.username }}</div>
    <div>age: {{ userInfo.age }}</div>

    <button @click="changeUsername">点击修改username</button>
    <button @click="changeAge">点击修改age</button>
  </div>
</template>

<script setup>
  import { reactive,toRefs } from 'vue';


  const userInfo = reactive({
    username: "xin",
    age: 18
  })

  // 响应式数据被解构后会失去响应式
  let { username, age } = toRefs(userInfo)

  const changeUsername = () => {
    username.value = "xinxin"
  }

  const changeAge = () => {
    age.value = 22
  }

</script>