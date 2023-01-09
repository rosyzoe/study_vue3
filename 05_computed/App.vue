<template>
  <div>
    今年的年龄: <input v-model="age" type="text">
  </div>

  <div>明年的年龄: {{ nextAge }}</div>
  <div>后年的年龄: {{ nextAndNextAge }}</div>
</template>

<script setup>
import { computed, ref } from 'vue';

  const age = ref(18)

  const nextAge = computed(() => {
    return +age.value + 1
  })

  const nextAndNextAge = computed(() => {
    return +age.value + 2
  })

</script>