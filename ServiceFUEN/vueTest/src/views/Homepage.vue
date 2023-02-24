<template>
  <section class="h-100" style="background-color: #eee">
    <div class="container h-100 py-5">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-10">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
            <div>
              <p class="mb-0">
                <span class="text-muted">Sort by:</span>
                <a href="#!" class="text-body"
                  >price <i class="fas fa-angle-down mt-1"></i
                ></a>
              </p>
            </div>
          </div>

          <div class="card rounded-3 mb-4">
            <div v-if="cartItemRender" class="card-body p-4">
              <div
                class="row d-flex justify-content-between align-items-center"
                v-for="(item, i) in cartsSelect"
                :key="item.id"
              >
                <div class="col-md-2 col-lg-2 col-xl-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                    class="img-fluid rounded-3"
                    alt="Cotton T-shirt"
                  />
                </div>
                <div class="col-md-3 col-lg-3 col-xl-3">
                  <p class="lead fw-normal mb-2">{{ item.name }}</p>
                </div>
                <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                  <button class="btn btn-link px-2">
                    <font-awesome-icon
                      icon="fas fa-minus"
                      @click.stop="addToCart(item, 1, `.count-input-${i}`)"
                    />
                  </button>

                  <input
                    class="form-control form-control-sm"
                    min="0"
                    v-model="item.qty"
                    type="number"
                    :class="`count-input-${i}`"
                    @blur.stop="addToCart(item, 2, `.count-input-${i}`)"
                  />

                  <button class="btn btn-link px-2">
                    <font-awesome-icon
                      icon="fas fa-plus"
                      @click.stop="addToCart(item, 0, `.count-input-${i}`)"
                    />
                  </button>
                </div>
                <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                  <h5 class="mb-0">$100</h5>
                </div>
                <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                  <a href="#!" class="text-danger">
                    <font-awesome-icon icon="fas fa-trash" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="card mb-4">
            <div class="card-body p-4 d-flex flex-row">
              <div class="form-outline flex-fill">
                <input
                  type="text"
                  id="form1"
                  class="form-control form-control-lg"
                />
                <label class="form-label" for="form1">Discound code</label>
              </div>
              <button type="button" class="btn btn-outline-warning btn-lg ms-3">
                Apply
              </button>
            </div>
          </div>

          <div class="card">
            <div class="card-body">
              <button
                type="button"
                class="btn btn-warning btn-block btn-lg"
                @click.stop="cartSubmit"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

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
        <button class="col-1 btn btn-danger" @click="addToCart(item, 0)">
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

    <font-awesome-icon icon="fa-solid fa-house" />
    <font-awesome-icon icon="fa-solid fa-user-secret" />
    <router-link :to="notFoundLink">購物車</router-link>
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
      cartItemRender: true,
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
    async addToCart(item, mode, className) {
      let input = document.querySelector(className);
      let count = document.querySelector(className).value;
      let qty = 1;

      if (mode == 1 && count == 1) {
        alert("數量不得為零");
        return;
      }

      if (mode == 2 && count == 0) {
        input.value = 1;
        alert("數量不得為零");
        return;
      }

      if (mode == 2) {
        qty = count;
      }

      let model = {
        Id: item.id,
        Qty: qty,
        Name: item.name,
      };

      await this.$axios
        .post(`api/ShoppingCart/AddToCart/1/${mode}`, model)
        .then((res) => {
          if (res.status == 204 || res.status == 200) {
            if ((res.data !== null) & (res.data !== undefined)) {
              this.cartsSelect = Array.from(res.data.data);
              alert(res.data.messsage);
              location.href = "homepage";
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
