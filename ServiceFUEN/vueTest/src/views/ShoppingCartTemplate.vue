<template>
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
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                  class="img-fluid rounded-3"
                  alt="Cotton T-shirt"
                />
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">Basic T-shirt</p>
                <p>
                  <span class="text-muted">Size: </span>M
                  <span class="text-muted">Color: </span>Grey
                </p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button
                  class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                >
                  <i class="fas fa-minus"></i>
                </button>

                <input
                  id="form1"
                  min="0"
                  name="quantity"
                  value="2"
                  type="number"
                  class="form-control form-control-sm"
                />

                <button
                  class="btn btn-link px-2"
                  onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">$499.00</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-danger"
                  ><i class="fas fa-trash fa-lg"></i
                ></a>
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
            <button type="button" class="btn btn-warning btn-block btn-lg">
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="text-center test123" :class="customClass()">??????:</div>
    <div>
      ??????:
      <input type="text" v-model="searchText" />
      <button @click="search()">????????????</button>
    </div>
    <div v-for="(item, i) in products" :key="item.id">
      <div class="product-card row">
        <div class="col-12">??????: {{ i + 1 }}</div>
        <div class="col-12">????????????: {{ item.name }}</div>
        <div class="col-12">????????????: {{ item.price }}</div>
        <button class="col-1 btn btn-danger" @click="addToCart(item)">
          ????????????
        </button>
        <br />
      </div>
    </div>

    <!-- v-if  v-show ??????bool ??????????????????/????????? v-show ??????????????????html??? v-if ??????html -->
    <div class="mt-5">
      <div v-for="(item, i) in cartsSelect" :key="item.id">
        <div>????????????: {{ item.name }} ??????: {{ item.qty }}</div>
      </div>
    </div>

    <font-awesome-icon icon="fa-solid fa-house" />
    <font-awesome-icon icon="fa-solid fa-user-secret" />
    <router-link :to="notFoundLink">?????????</router-link>
    <button class="btn btn-info" @click.stop="cartSubmit">????????????</button>

    <!-- <button class="btn btn-success" @click.stop="addToCart">???????????????</button> -->
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
  // ???mounted??? ??????html
  // created() {
  //   this.GetProducts();
  // },

  // ?????????html???
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
