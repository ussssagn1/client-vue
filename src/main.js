import { createApp } from 'vue'
import './normalize.css'
import './style.css'
import App from './App.vue'

import {createPinia} from "pinia";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'

const pinia = createPinia()
const app = createApp(App)

app.use(PrimeVue)
app.use(pinia)
app.mount('#app')
