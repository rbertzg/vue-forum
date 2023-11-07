import { firebaseConfig } from '@/config/firebase'
import FontAwesome from '@/plugins/FontAwesome'
import { initializeApp } from 'firebase/app'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import ClickOutsideDirective from './plugins/ClickOutsideDirective'
import router from './router'
import './style.css'
import PageScrollDirective from './plugins/PageScrollDirective'

initializeApp(firebaseConfig)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(FontAwesome)
app.use(ClickOutsideDirective)
app.use(PageScrollDirective)
app.mount('#app')
