<template>
  <div>{{ age}}</div>

  <div>{{ info.username }}</div>
  <div>{{ info.age }}</div>

  <button @click="increment">点击+1</button>
  <button @click="changeInfo">修改info对象</button>
</template>

<script>
import { ref } from 'vue';



  export default {
    setup() {
      const age = ref(100)

      const info = ref({
        username: "zxx",
        age: 18
      })
      
      const increment = () => {
        age.value++
        console.log(age.value)
      }

      const changeInfo = () => {
        info.value.username = "嘻嘻嘻"
        info.value.age = 99
      }

      return {
        age,
        increment,
        info,
        changeInfo
      }
    }
  }

</script>