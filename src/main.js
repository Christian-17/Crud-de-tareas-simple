import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/routes.js'
import VueSweetalert2 from 'vue-sweetalert2'

import './style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import 'sweetalert2/dist/sweetalert2.min.css'

import './libs/axios.js'

createApp(App)
.use(VueSweetalert2)
.use(router)
.mount('#app')