import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {i18n} from "./i18n.js";
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App);
app.use(router)
app.use(i18n)
app.use(VueQueryPlugin)
app.mount('#app')
