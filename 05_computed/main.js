import { createApp } from "vue";

// 导入App根组件
import App from "./App.vue"

// createapp(): 创建根实例并应用
const app = createApp(App)

// 挂载到视图上
app.mount("#app")