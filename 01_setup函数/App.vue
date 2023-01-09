<template>
  <div>{{ message }}</div>

  <div @click="logInfo">点击显示信息</div>
</template>

<script>

  export default {
    setup() {
      console.log("setup") // 先被执行

      const message = "哈哈哈"

      const logInfo = () => {
        console.log("logInfo")
      }

      return {
        message,
        logInfo
      }
    },

    beforeCreate() {
      console.log("beforeCreate") // 后被执行
    }
  }

</script>