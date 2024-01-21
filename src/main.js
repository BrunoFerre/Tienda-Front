import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes.js'
import VueSweetalert2 from 'vue-sweetalert2';
const app = createApp(App)
app.use(VueSweetalert2)
app.use(router)
app.mount('#app')