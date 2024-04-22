import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Lara from '@/presets/lara'
import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue, {
    unstyled: true,
    pt: Lara,
})
app.use(createPinia())

app.mount('#app')
