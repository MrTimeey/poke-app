import { createApp } from 'vue'
import './style.css'

import router from './router'
import { createPinia } from 'pinia'

import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'

const app = createApp(App)
    .use(router)
    .use(VueAxios, axios)
    .use(createPinia())
app.provide('axios', app.config.globalProperties.axios)
app.mount('#app')
