<template>
  <div>侦听单个ref: {{ age }}</div>
  <div>侦听ref复杂数据类型: {{ userInfo.username }}</div>
  <div>侦听ref复杂数据类型: {{ userInfo.address }}</div>
  <div>侦听reactive复杂数据类型: {{ messageObj.desc }}</div>
  <div>侦听reactive复杂数据类型: {{ messageObj.type }}</div>

  <button @click="changeAge">点击修改age</button>
  <button @click="changeAgeAndHeight">点击修改age和height</button>
  <button @click="changeUserInfo">点击修改userInfo</button>
  <button @click="changeMessageObj">点击修改messageObj</button>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';

  const age = ref(18)
  const height = ref(1.88)
  const userInfo = ref({
    username: "zxx",
    address: "北京"
  })

  const messageObj = reactive({
    desc: "1234",
    type: "9999"
  })

  const changeAge = () => {
    age.value = 19
  }

  const changeAgeAndHeight = () => {
    age.value = 99
    height.value = 1.99
  }

  const changeUserInfo = () => {
    userInfo.value.username = "xin",
    userInfo.value.address = "上海"
  }

  const changeMessageObj = () => {
    messageObj.desc = "哈哈"
    messageObj.type = "Object"
  }

  // 侦听单个数据
  watch(age, (newValue, oldValue) => {
    console.log(newValue, oldValue) // 19 18
  })

  // 侦听多个数据
  watch([age, height], (newValue, oldValue) => {
    console.log(newValue, oldValue)
  })

  // 侦听ref复杂类型数据
  watch(
    userInfo,
    (value) => {
    console.log(value)
    },
    {
      deep: true, // 开启深度侦听,当ref的值是一个复杂数据类型,需要深度监听
      immediate: true // 是否打开网页时就立即执行一次
    }
  )

  // 侦听reactive复杂类型数据
  watch(messageObj, value => {
    console.log(value) // reactive不需要开启深度侦听
  }) 
</script>