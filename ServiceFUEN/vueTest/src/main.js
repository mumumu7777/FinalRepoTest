import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios';
// 引入boostrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// fontawesome
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faHouse } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faHouse)


const app = createApp(App)
app
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router).mount('#app')
axios.defaults.baseURL = process.env.VUE_APP_API
app.config.globalProperties.$axios = axios;
