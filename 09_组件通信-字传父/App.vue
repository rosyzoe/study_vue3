<template>
  <div>
    <son :message="messageData" :age="age" @changeAge="changeAge" @changeMessage="changeMessage"/>

    <div>在子组件修改父组件中的数据: {{ messageData }}</div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import Son from "./components/Son.vue"

  let messageData = ref("yang杨")

  const age = ref(18)

  const changeMessage = value => {
    console.log(value)
    messageData.value = messageData.value = value
  }

  const changeAge = value => {
    age.value = age.value = value
  }
</script>