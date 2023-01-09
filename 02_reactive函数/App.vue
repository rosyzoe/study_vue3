<template>
  <div>{{ info.age }}</div>
  <div>{{ info.height }}</div>

  <button @click="increment">点击+1</button>
</template>

<script>
import { reactive } from 'vue'


  export default {
    setup() {
      let info = reactive({
        age: 100,
        height: 1.88
      })

      const increment = () => {
        info.age++
        info.height++
        console.log(info.age,info.height)
      }

      return {
        info,
        increment,
      }
    }
  }

</script>