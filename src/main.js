import { createApp } from 'vue'
import './style.css'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import App from './App.vue'
import router from './router'
import {i18n} from "./i18n.js";
import { VueQueryPlugin } from '@tanstack/vue-query'
import CodeEditor from 'simple-code-editor';

const app = createApp(App);
app.component('QuillEditor', QuillEditor)
app.component('CodeEditor', CodeEditor)
app.use(router)
app.use(i18n)
app.use(VueQueryPlugin)
app.mount('#app')
