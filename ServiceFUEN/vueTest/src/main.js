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
import { faUserSecret, faHouse, faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faHouse, faPlus, faMinus, faTrash)

// sweet alert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// vueloding
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};

const app = createApp(App)
app
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('Loading', Loading)
    .use(VueSweetalert2, options)
    .use(router).mount('#app')
axios.defaults.baseURL = process.env.VUE_APP_API
app.config.globalProperties.$axios = axios;
