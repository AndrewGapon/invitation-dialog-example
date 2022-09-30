import { createApp } from 'vue'
import App from '@/App.vue'
import vSelect from 'vue-select'
import { outsideClick, autofocus } from '@/directives'

import '@/assets/styles/index.scss'

const app = createApp(App)

app.component('v-select', vSelect)
app.directive('outside-click', outsideClick)
app.directive('autofocus', autofocus)
app.mount('#app')
