<template>
  <div>
    <div>我是孙组件</div>

    <div>{{ car }}</div>
  </div>
</template>

<script setup>
  import { inject } from 'vue';

  const car = inject("car")
  const changeCar = inject("changeCar")

  changeCar("奔腾")

</script>