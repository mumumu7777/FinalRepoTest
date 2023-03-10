//index.js => 設定組件與網址導頁行為!
import { createRouter, createWebHistory, scrollBehavior } from "vue-router";
import axios from 'axios';
import Homepage from "@/views/Homepage.vue";
import CheckOutReport from "@/views/CheckOutReport.vue";
import NotFound from "@/views/NotFound.vue";
import Homepage2 from "@/views/Homepage2.vue";


axios.defaults.baseURL = process.env.VUE_APP_API
const routes = [
  {
    path: "/",
    // 重定向
    redirect: "/Homepage2",
  },
  {
    path: "/homepage",
    component: Homepage,
    name: 'homepage',
  },
  {
    path: "/checkoutreport/:id",
    component: CheckOutReport,
    name: 'checkoutreport',
  },
  {
    path: "/Homepage2",
    component: Homepage2,
    name: 'Homepage2',
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    props: (routes) => routes.params
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.afterEach((to, from) => {
  // 讓路由初始位置在最上方 scrollBehavior之後不支持了
  let bodySrcollTop = document.body.scrollTop
  if (bodySrcollTop !== 0) {
    document.body.scrollTop = 0
    return
  }
  let docSrcollTop = document.documentElement.scrollTop
  if (docSrcollTop !== 0) {
    document.documentElement.scrollTop = 0
  }
})
//進入導頁前的行為
// router.beforeEach((to, from, next) => {
//   let token = _global.token;
//   if (!token) {
//     // 未登入不能登出
//     if (to.path == '/logout') {
//       next(false);
//       return;
//     }
//     next()
//   } else {
//     // 已登入不能進入登入頁面
//     if (to.path == '/login') {
//       next(false);
//       return;
//     }
//     axios
//       .post(
//         "api/MyBlogLogin/ValidateToken",
//         {},
//         { headers: { Authorization: `Bearer ${token}`, } }
//       )
//       .then((res) => {
//         if (res.status == 204 || res.status == 200) {
//           next()
//         }
//       })
//       .catch((err) => {
//         // token過期導登入頁
//         if (err.response.status == 401) {
//           // 必須這樣寫才不會進入無限迴圈
//           if (to.path == '/logout') {
//             next();
//           } else {
//             alert('登入逾時,將跳轉至登出畫面')
//             next({
//               path: '/logout',
//               replace: true
//             })
//           }
//         }
//       });
//   }
// })
export default router;
