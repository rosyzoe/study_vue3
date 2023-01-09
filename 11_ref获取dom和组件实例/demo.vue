<template>
  <div>
    <h1>我是demo组件</h1>
  </div>
</template>

<script setup>

  const sayHello = () => {
    console.log("你好呀,杨小姐")
  }

  defineExpose({
    sayHello
  })

</script>