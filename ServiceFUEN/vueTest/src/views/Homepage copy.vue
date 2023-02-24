<template>
  
   
  <div class="container-fluid">
    <div class="text-center test123" :class="customClass()">商品:</div>
    <div>
      搜尋:
      <input type="text" v-model="searchText" />
      <button @click="search()">搜尋結果</button>
    </div>
    <div v-for="(item, i) in products" :key="item.id">
      <div class="product-card row">
        <div class="col-12">編號: {{ i + 1 }}</div>
        <div class="col-12">商品名稱: {{ item.name }}</div>
        <div class="col-12">商品價格: {{ item.price }}</div>
        <button class="col-1 btn btn-danger" @click="addToCart(item)">
          加入一個
        </button>
        <br />
      </div>
    </div>

    <!-- v-if  v-show 依照bool 控制畫面顯示/不顯示 v-show 隱藏可是還在html中 v-if 沒在html -->
    <div class="mt-5">
      <div v-for="(item,i) in cartsSelect" :key="item.id">
        <div>商品名稱: {{ item.name }} 數量: {{ item.qty }}</div>
      </div>
    </div>

    <font-awesome-icon icon="fa-solid fa-house" />
    <font-awesome-icon icon="fa-solid fa-user-secret" />
    <router-link :to="notFoundLink">購物車</router-link>
    <button class="btn btn-info" @click.stop="cartSubmit">購物車提交</button>
    <!-- <button class="btn btn-success" @click.stop="addToCart">加入購物車</button> -->
  </div>
  
</template>

<script>
import { useRouter, useRoute } from "vue-router";
export default {
  data() {
    return {
      notFoundLink: "/notfound",
      headers: {},
      products: null,
      cartsSelect: [],
      searchText: "",
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
    this.GetUsrCart();
  },
  methods: {
    search() {
      alert(this.searchText);
    },
    goNotFound() {
      this.toNotFound();
    },
    customClass() {
      return "test";
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
    async GetUsrCart() {
      await this.$axios
        .get(`api/ShoppingCart/GetUserCart?userId=1`)
        .then((res) => {
          if (res.data) {
            this.cartsSelect = Array.from(res.data.data);
          }
        })
        .catch((error) => {
          console.log(err.response.data);
        });
    },
    async cartSubmit() {
      let model = {
        MemberId: 1,
        State: 0,
        CartProducts: Array.from(this.cartsSelect),
      };

      await this.$axios
        .post(`api/ShoppingCart/SaveShoppingCart`, model)
        .then((res) => {
          if (res.status == 204 || res.status == 200) {
            if ((res.data !== null) & (res.data !== undefined)) {
              console.log(res.data);
            }
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          alert(err.response.data.messsage);
        });
    },
    async addToCart(item) {
      let model = {
        Id: item.id,
        Qty: 1,
        Name: item.name,
      };
      console.log(model);
      await this.$axios
        .post(`api/ShoppingCart/AddToCart/1`, model)
        .then((res) => {
          if (res.status == 204 || res.status == 200) {
            if ((res.data !== null) & (res.data !== undefined)) {
              this.cartsSelect = Array.from(res.data.data);
              alert(res.data.messsage);
            }
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          alert(err.response.data.messsage);
        });
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
