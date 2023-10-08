import { firebaseConfig } from '@/config/firebase'
import FontAwesome from '@/plugins/FontAwesome'
import { initializeApp } from 'firebase/app'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

initializeApp(firebaseConfig)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(FontAwesome)
app.mount('#app')
