## 1.index.html

```html
    <!-- 页面app容器 -->
    <div id="app">
      <!-- 将来由Vue创建组件实例做渲染 -->
    </div>

    <!-- webpack导入的是打包后的代码 -->
    <!-- vite直接导入的就是源码 -->
    <script type="module" src="/src/main.js"></script>
```

## 2.main.js

```js
// 引入createApp方法
import { createApp } from "vue";

// 导入App根组件
import App from "./App.vue"

// createapp(): 创建根实例并应用
const app = createApp(App)

// 挂载到视图上
app.mount("#app")
```

## 3.setup函数

```js
/*
	compositionAPI的使用需要配置一个setup函数
	1.setup函数是一个新的组件选项,作为组件中compositionAPI的起点(入口)
	2.从生命周期角度来看的话,setup会在beforeCreate钩子函数之前执行
	3.因此setup中不能使用this,this会指向undefined
	4.在template模板中需要使用的数据和函数,需要在setup中返回
*/
```

```js
  export default {
    setup() {
      console.log("setup") // 先被执行
    },

    beforeCreate() {
      console.log("beforeCreate") // 后被执行
    }
  }
```

## 4.reactive函数

```js
/*
	1.setup需要有返回值,只有返回的值才能在template中使用
	2.默认普通的数据不是响应式的
	3.reactive的作用: 传入一个复杂类型的数据,将复杂类型数据转换成响应式数据
	  (返回此对象的响应式代理)
	4.reactive只能处理复杂类型的数据,如果是简单类型无法处理成响应式
*/

import { reactive } from "vue"

export default {
  setup() {
    const info = reactive({
      username: "zxx",
      age: 18
    })
  }
  return info
}
```

## 5.ref函数

```js
/*
	ref函数的作用: 对传入的数据(一般用于简单数据类型),为其包裹一层对象,转换成响应式
	1.ref函数接受一个值,返回一个ref响应式对象,有唯一的属性value
	2.在setup函数中,通过ref对象的value属性可以访问到值
	3.在模板中,ref属性会自动解包,不需要写额外的.value属性
	4.ref函数也支持传入复杂类型,传入复杂类型也会做出响应式处理
*/
```

```js
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
```

## 6.ref和reactive的区别

```js
// 有明确的对象,明确的属性,用reactive,其他用ref
// 用Vue3.2版本之后,更推荐用ref,因为ref底层性能做了提升 约为260%
```

## 7.script setup语法

```js
/*
	script setup语法实在单文件组件(SFC)中使用compositionAPI的编译时语法糖,相比于 	 普通的script的语法更加简洁
	
	使用步骤: 需要将setup属性添加到<script>代码块上
	
	顶层的绑定会自动暴露给模板,所以在script中定义的变量/函数和import导入的内容都可以 	在模板中直接使用
*/
```

```js
<script setup>
import { ref } from 'vue';

  const message = ref("欢迎来到我的github")

  const changeMessage = () => {
    message.value = "我被改变了!!"
  }

</script>
```

## 8.computed计算属性

```js
// computed函数被调用时,需要接受一个处理函数,处理函数中,需要返回计算属性的值
// 计算属性是有缓存的
```

```vue
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
```

## 9.watch函数

```js
/* 
	watch侦听器,接收三个参数
	参数一: 被侦听的数据
	参数二: 回调函数, newVlaue, oldValue
	参数三: 额外的配置,deep深度侦听, immediate是否打开网页时就立即执行一次
*/
```

```vue
<template>
  <div>侦听单个ref: {{ age }}</div>
  <div>侦听ref复杂数据类型: {{ userInfo.username }}</div>
  <div>侦听ref复杂数据类型: {{ userInfo.address }}</div>
  <div>侦听reactive复杂数据类型: {{ messageObj.desc }}</div>
  <div>侦听reactive复杂数据类型: {{ messageObj.type }}</div>

  <button @click="changeAge">点击修改age</button>
  <button @click="changeAgeAndHeight">点击修改age和height</button>
  <button @click="changeUserInfo">点击修改userInfo</button>
  <button @click="changeMessageObj">点击修改messageObj</button>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';

  const age = ref(18)
  const height = ref(1.88)
  const userInfo = ref({
    username: "zxx",
    address: "北京"
  })

  const messageObj = reactive({
    desc: "1234",
    type: "9999"
  })

  const changeAge = () => {
    age.value = 19
  }

  const changeAgeAndHeight = () => {
    age.value = 99
    height.value = 1.99
  }

  const changeUserInfo = () => {
    userInfo.value.username = "xin",
    userInfo.value.address = "上海"
  }

  const changeMessageObj = () => {
    messageObj.desc = "哈哈"
    messageObj.type = "Object"
  }

  // 侦听单个数据
  watch(age, (newValue, oldValue) => {
    console.log(newValue, oldValue) // 19 18
  })

  // 侦听多个数据
  watch([age, height], (newValue, oldValue) => {
    console.log(newValue, oldValue)
  })

  // 侦听ref复杂类型数据
  watch(
    userInfo,
    (value) => {
    console.log(value)
    },
    {
      deep: true, // 开启深度侦听,当ref的值是一个复杂数据类型,需要深度监听
      immediate: true // 是否打开网页时就立即执行一次
    }
  )

  // 侦听reactive复杂类型数据
  watch(messageObj, value => {
    console.log(value) // reactive不需要开启深度侦听
  }) 
</script>
```

## 10.组件通信-父传子

```js
/*
	1.父组件提供数据
	2.父组件将数据传递给子组件
	3.子组件通过defineProps接收父组件传递过来的数据
	4.子组件渲染父组件传递过来的数据
*/
```

```vue
<!-- 父组件 -->
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
```

```vue
<!-- 子组件 -->
<template>
  <div>
    <div class="title">我是son组件</div>
    <div>我是父组件传递过来的数据:{{ props.message }} </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    message: {
      type: String, // 限制父组件传递过来的数据类型
      default: "我是默认值", // 默认值
      required: true // 是否必传
    }
  })
</script>
```

## 11.组件通信-子传父

```js
/*
	1.子组件通过defineEmit获取emit对象
	2.子组件通过emit触发事件,并且传递数据
	3.父组件提供方法
	4.父组件通过自定义事件的方式为子组件注册事件
*/
```

```vue
<!-- 父组件 -->
<template>
  <div>
    <son :message="messageData" :age="age" @changeAge="changeAge"  				 	@changeMessage="changeMessage"/>

    <div>在子组件修改父组件中的数据: {{ messageData }}</div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import Son from "./components/Son.vue"

  let messageData = ref("yang杨")

  const age = ref(18)

  const changeMessage = value => {
    console.log(value)
    messageData.value = messageData.value = value
  }

  const changeAge = value => {
    age.value = age.value = value
  }
</script>
```

```vue
<!-- 子组件 -->
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
```

## 12.依赖注入-provide和inject

```js
// 依赖注入,可以非常方便的实现 跨层级的 组件通信
```

```vue
<!-- 父组件利用provide提供数据 -->
<template>
  <div>
    <son/>
  </div>
</template>

<script setup>
  import { ref, provide } from "vue";
  import Son from "./components/Son.vue"

  let car = ref("奔驰")
  
  provide("car", car)

</script>
```

```vue
<!-- 子组件: 子孙后代都可以使用这个数据 -->
<template>
  <div>
    <div>我是孙组件</div>

    <div>{{ car }}</div>
  </div>
</template>

<script setup>
  import { inject } from 'vue';

  const car = inject("car")

</script>
```

```vue
<!--
	如果希望子孙后代组件修改父组件provide提供的数据,可以在父组件内定义一个方法,并利用		provide函数将方法传递 
-->

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
  // 提供方法
  provide("changeCar", changeCar)

</script>

<!-- 子组件中调用方法修改数据 -->
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
	// 修改
  changeCar("奔腾")

</script>
```

## 13.ref获取dom元素和组件实例

```js
/*
	1.创建ref => const href = ref(null)
	2.模板中建立关联 => <h1 ref="href"></h1>
	3.使用 => href.value
*/
```

```vue
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
```

```vue
<template>
  <div>
    <h1>我是demo组件</h1>
  </div>
</template>

<script setup>

  const sayHello = () => {
    console.log("你好呀,杨小姐")
  }

  // 将方法暴露出去,可以通过获取此组件的实例调用被暴露出去的方法
  defineExpose({
    sayHello
  })

</script>
```

## 14.toRefs

```js
/*
	使用场景: 如果对一个响应式数据进行解构/展开,那么它会失去他的响应式特性
	因为Vue3底层是对对象进行监听劫持
	toRefs的作用: 对一个响应式对象的所有内部属性,都做响应式处理
	
	1.reactive/ref的响应式功能是赋值给对象的,如果给对象解构或者展开,就会让数据丢失响	应式
	2.使用toRefs可以保证被解构或展开对象的每个属性都是响应式的
*/
```

```vue
<template>
  <div>
    <div>username: {{ userInfo.username }}</div>
    <div>username: {{ userInfo.age }}</div>

    <button @click="changeUsername">点击修改username</button>
    <button @click="changeAge">点击修改age</button>
  </div>
</template>

<script setup>
import { reactive,toRefs } from 'vue';

  const userInfo = reactive({
    username: "xin",
    age: 18
  })

  // 响应式数据被解构后会失去响应式
  let { username, age } = toRefs(userInfo)

  const changeUsername = () => {
    username.value = "xinxin"
  }

  const changeAge = () => {
    age.value = 22
  }

</script>
```

