import { firebaseConfig } from '@/config/firebase'
import FontAwesome from '@/plugins/FontAwesome'
import Vue3Pagination from '@/plugins/Vue3Pagination'
import { initializeApp } from 'firebase/app'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import ClickOutsideDirective from './plugins/ClickOutsideDirective'
import PageScrollDirective from './plugins/PageScrollDirective'
import router from './router'
import './style.css'

initializeApp(firebaseConfig)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(FontAwesome)
app.use(ClickOutsideDirective)
app.use(PageScrollDirective)
app.use(Vue3Pagination)
app.mount('#app')
