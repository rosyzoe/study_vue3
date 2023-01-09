<template>
  <div>
    <div class="title">我是son组件</div>
    <div>我是父组件传递过来的数据:{{ props.message }} </div>
    <div>我是父组件传递过来的数据:{{ props.age }} </div>
  </div>
</template>

<script setup>

  const props = defineProps({
    message: {
      type: String,
      default: "我是默认值",
      required: true
    },

    age: {
      type: Number
    }
  })

  const emit = defineEmits(["changeMessage", "changeAge"])

    emit("changeMessage", "xin + yang杨")

    emit("changeAge", 22)

</script>

<style scoped>
.title {
  color: red;
}
</style>