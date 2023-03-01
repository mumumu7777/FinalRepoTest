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

// 網頁模板
import Layout01 from "@/layout/Layout01.vue";

// 購物車組件
import ShoppingCart from "@/components/ShoppingCart.vue";

const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};

//地址組件
import '@andy922200/vue-tw-zip-code-selector/dist/vue-tw-zip-code-selector.css';
import VueTwZipCodeSelector from '@andy922200/vue-tw-zip-code-selector'


const app = createApp(App)
app
    .component('font-awesome-icon', FontAwesomeIcon)
    .component('Loading', Loading)
    .component('Layout01', Layout01)
    .component('ShoppingCart', ShoppingCart)
    .use(VueSweetalert2, options)
    .use(VueTwZipCodeSelector)
    .use(router).mount('#app')
axios.defaults.baseURL = process.env.VUE_APP_API
app.config.globalProperties.$axios = axios;
