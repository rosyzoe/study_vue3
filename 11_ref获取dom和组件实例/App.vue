<template>
  <div>
    <h1 ref="h1Ref">我是h1元素</h1>
    <button @click="changeTitle">点击获取h1元素</button>

    <demo ref="demoRef" />
    <button @click="btnClick">点击触发子组件中的方法</button>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import Demo from "./demo.vue"


  // 获取dom元素
  const h1Ref = ref(null)

  // 获取demo组件实例
  const demoRef = ref(null)

  // 修改dom中的内容
  const changeTitle = () => {
    console.log(h1Ref)
    h1Ref.value.innerHTML = 'xin'
  }

  // 获取子组件实例并调用子组件中的的方法
  const btnClick = () => {
    demoRef.value.sayHello()
  }
</script>