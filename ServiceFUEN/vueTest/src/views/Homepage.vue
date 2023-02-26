<template>
  <Layout01>
    <template #contents>
      <ShoppingCart ref="shoppingCart"></ShoppingCart>
      <div class="row mx-auto">
        <div class="text-center" :class="customClass()">商品:</div>
        <div>
          搜尋:
          <input type="text" v-model="searchText" />
          <button class="pointer" @click="search()">搜尋結果</button>
        </div>
        <div v-for="(item, i) in products" :key="item.id">
          <div class="product-card row">
            <div class="col-12">編號: {{ i + 1 }}</div>
            <div class="col-12">商品名稱: {{ item.name }}</div>
            <div class="col-12">商品價格: {{ item.price }}</div>
            <button
              class="col-1 btn btn-danger pointer"
              @click="addToCart(item, 3)"
            >
              加入一個
            </button>
            <br />
          </div>
        </div>

        <!-- v-if  v-show 依照bool 控制畫面顯示/不顯示 v-show 隱藏可是還在html中 v-if 沒在html -->
        <div class="mt-5">
          <div v-for="(item, i) in cartsSelect" :key="item.id">
            <div>商品名稱: {{ item.name }} 數量: {{ item.qty }}</div>
          </div>
        </div>

        <!-- <font-awesome-icon icon="fa-solid fa-house" />
        <font-awesome-icon icon="fa-solid fa-user-secret" /> -->
        <router-link :to="notFoundLink">購物車</router-link>
      </div>

      <loading :active="loading"></loading>
    </template>
  </Layout01>
</template>

<script>
import { useRouter, useRoute } from "vue-router";

export default {
  data() {
    return {
      notFoundLink: "/notfound",
      headers: {},
      products: null,
      searchText: "",
      // vue loading
      loading: false,
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const toNotFound = () => {
      router.push(`/notfound`);
    };
    return { toNotFound };
  },
  // 比mounted早 沒有html
  // created() {
  //   this.GetProducts();
  // },

  // 已經有html了
  mounted() {
    this.GetProducts();
  },
  methods: {
    /*================================== 公用函式  =================================== */

    goNotFound() {
      this.toNotFound();
    },
    customClass() {
      return "test";
    },
    /*================================== 產品行為及api  =================================== */
    search() {
      alert(this.searchText);
    },

    async GetProducts() {
      await this.$axios
        .get(`api/ShoppingCart/GetProducts`)
        .then((res) => {
          if (res.data) {
            this.products = res.data.data;
            console.log(this.products);
          }
        })
        .catch((error) => {
          console.log(err.response.data);
        });
    },

    /*================================== 購物車行為及api  =================================== */

    async addToCart(item, mode) {
      // 呼叫子組件函式
      this.$refs.shoppingCart.addToCart(item, mode);
    },
  },
  components: {},
};
</script>
<style scoped>
.test123 {
  background-color: rgb(211, 28, 123);
}
</style>
