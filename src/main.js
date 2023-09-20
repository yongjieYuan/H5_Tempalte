import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import i18n from './i18n/index'
import 'amfe-flexible/index.js'
import 'vant/lib/index.css'
import 'normalize.css'
import 'animate.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
