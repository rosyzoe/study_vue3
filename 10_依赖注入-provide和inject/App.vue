<template>
  <div>
    <son/>
  </div>
</template>

<script setup>
  import { ref, provide } from "vue";
  import Son from "./components/Son.vue"

  let car = ref("奔驰")

  const changeCar = (value) => {
    car.value = car.value = value
  }
  
  provide("car", car)
  
  provide("changeCar", changeCar)

</script>