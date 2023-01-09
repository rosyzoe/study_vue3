<template>
  <div>
    <son :message="messageData" />
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import Son from "./components/Son.vue"

  const messageData = ref("yang杨")
</script>