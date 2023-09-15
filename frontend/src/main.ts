import {createApp} from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).use(ElementPlus,  { size: 'large', zIndex: 3000 })
app.mount('#app')
