<template>
  <div
    class="
      row
      d-flex
      justify-content-center
      align-items-center
      h-100
      w-75
      mt-5
      mx-auto
    "
  >
    <div class="col-10">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3 class="fw-normal mb-0 text-black">Shopping Cart</h3>
        <div>
          <p class="mb-0">
            <span class="text-muted">Sort by:</span>
            <a class="text-body"
              >price <i class="fas fa-angle-down mt-1"></i
            ></a>
          </p>
        </div>
      </div>

      <div class="card rounded-3 mb-4">
        <div class="card-body p-4">
          <div
            class="row mt-3 d-flex justify-content-between align-items-center"
            v-for="(item, i) in cartsSelect"
            :key="item.Id"
          >
            <div class="col-md-2 col-lg-2 col-xl-2">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                class="img-fluid rounded-3"
                alt="Cotton T-shirt"
              />
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
              <p class="lead fw-normal mb-2">{{ item.Name }}</p>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
              <button class="btn btn-link px-2 pointer">
                <font-awesome-icon
                  icon="fas fa-minus"
                  @click.stop="addToCart(item, 1, `.count-input-${i}`)"
                />
              </button>

              <input
                class="form-control form-control-sm"
                :class="`count-input-${i}`"
                min="0"
                default="1"
                v-model="item.Qty"
                type="number"
                @blur.stop="addToCart(item, 2, `.count-input-${i}`)"
              />

              <button class="btn btn-link px-2 pointer">
                <font-awesome-icon
                  icon="fas fa-plus"
                  @click.stop="addToCart(item, 0, `.count-input-${i}`)"
                />
              </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h5 class="mb-0">${{ item.Price * item.Qty }}</h5>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end pointer">
              <a class="text-danger" @click.stop="removeCartItem(item)">
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
            class="btn btn-warning btn-block btn-lg pointer"
            @click.stop="cartSubmit"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  </div>

  <loading :active="loading"></loading>
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
      // vue loading
      loading: false,

      // sweet alert訊息
      delSweetConfirm: {
        title: "要刪除此項目嗎",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff7674",
        cancelButtonColor: "#777",
        confirmButtonText: "刪除",
        cancelButtonText: "取消",
      },
      buySweetConfirm: {
        title: "確定要購買嗎",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#41b882",
        cancelButtonColor: "#777",
        confirmButtonText: "購買",
        cancelButtonText: "取消",
      },
      successSweetAlert: {
        title: "成功",
        icon: "success",
        confirmButtonText: "確定",
        confirmButtonColor: "#41b882",
        // timer: 2000,
      },
      errSweetAlert: {
        title: "錯誤",
        icon: "error",
        confirmButtonText: "確定",
        confirmButtonColor: "#41b882",
        // timer: 2000,
      },
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const toNotFound = () => {
      router.push(`/notfound`);
    };

    const toCheckOut = () => {
      router.push(`/checkout`);
    };
    return { toNotFound, toCheckOut };
  },
  // 比mounted早 沒有html
  // created() {
  //   this.GetProducts();
  // },

  // 已經有html了
  mounted() {
    this.getStorageCart();
  },
  methods: {
    /*================================== 公用函式  =================================== */

    // 將物件轉JSON字串 存在指定localStorageName
    // saveName必須與data命名相同
    saveLocalStorage(saveName, val) {
      localStorage.setItem(saveName, JSON.stringify(val));
    },
    // 將localStorage 已存JSON字串轉回物件 存在指定data參數
    // saveName與data相同
    getlocalStorage(saveName) {
      this[saveName] = JSON.parse(localStorage.getItem(saveName)); // 與this.saveName相同
    },
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

    // 從Storage取使用者購物車紀錄
    getStorageCart() {
      this.getlocalStorage("cartsSelect");
      // 防呆 假如storage沒存過 將值存為空陣列
      if (!this.cartsSelect) {
        this.cartsSelect = [];
      }
    },
    // 刪除使用者購物車紀錄
    rmStorageCart() {
      localStorage.removeItem("cartsSelect");
      this.cartsSelect = [];
    },

    // 加入購物車
    // 每次異動購物車都寫storage
    // mode: 0: 數量+1 1: 數量-1 2: 指定數量 3: 加入購物車
    async addToCart(item, mode, className) {
      // 點選 + - 或 直接輸入數量 (mode 0 1 2)
      if (mode != 3) {
        // 取得物件數量
        let input = document.querySelector(className);
        let count = input.value;
        // 此物件index
        let findIndex = this.cartsSelect.indexOf(item);

        console.log("findIndex", findIndex);
        console.log("input", input);
        console.log("count", count);

        // 假如數量 = 1 且按下-按鈕 (mode = 1)
        if (mode == 1 && count == 1) {
          // 刪除動作
          this.removeCartItem(item);
          return;
        }

        // 假如數量 = 1 指定數量為0 (mode = 2)
        if (mode == 2 && count == 0) {
          // 刪除動作
          this.removeCartItem(item, true);
          return;
        }

        // 依照mode改變數量
        switch (mode) {
          case 0:
            this.cartsSelect[findIndex].Qty++;
            break;
          case 1:
            this.cartsSelect[findIndex].Qty--;
            break;
          case 2:
            this.cartsSelect[findIndex].Qty = count;
            break;
        }

        // 儲存到storage
        this.saveLocalStorage("cartsSelect", this.cartsSelect);
      } else {
        // 點選加入購物車(mode 3)

        // 防呆 依id確認購物車有沒有商品 有的話更新陣列數量+1 沒有新增一筆
        let findProduct = this.cartsSelect.find((a) => a.Id == item.id);
        console.log("findProduct add", findProduct);

        if (findProduct) {
          // 已在購物車 找到index 修改物件值
          let index = this.cartsSelect.indexOf(findProduct);
          this.cartsSelect[index].Qty++;
        } else {
          // 未在購物車 加入陣列
          this.cartsSelect.push({
            Id: item.id,
            Qty: 1,
            Name: item.name,
            Price: item.price,
          });
        }

        // 儲存到storage
        this.saveLocalStorage("cartsSelect", this.cartsSelect);
      }

      console.log(this.cartsSelect);
    },

    // 刪除購物車內容
    async removeCartItem(item, getDefaultVal) {
      let index = this.cartsSelect.indexOf(item);
      // 找不到index會是-1 找得到才刪
      if (index > -1) {
        // 確認刪除
        this.$swal.fire(this.delSweetConfirm).then((result) => {
          if (result.isConfirmed) {
            // 按下刪除
            this.cartsSelect.splice(index, 1); // 刪除陣列元素
            // 儲存到storage
            this.saveLocalStorage("cartsSelect", this.cartsSelect);
          } else {
            // 按下取消
            // 從storage取回預設值 (數量input blur後值會改變 所以要回歸預設值)
            if (getDefaultVal) {
              this.getlocalStorage("cartsSelect");
            }
          }
        });
      }
    },

    // 購物車提交，將購物車提交至後端並儲存，成功的劃清storage
    async cartSubmit() {
      // 確認購買
      await this.$swal.fire(this.buySweetConfirm).then((result) => {
        if (result.isConfirmed) {
          // 按下購買
          let model = {
            MemberId: 1,
            State: 0,
            CartProducts: Array.from(this.cartsSelect),
          };

          this.loading = true;
          this.$axios
            .post(`api/ShoppingCart/SaveShoppingCart`, model)
            .then((res) => {
              if (res.status == 204 || res.status == 200) {
                if ((res.data !== null) & (res.data !== undefined)) {
                  this.successSweetAlert.text = res.data.messsage;
                  this.$swal.fire(this.successSweetAlert);
                  this.successSweetAlert.text = "";
                  console.log(res.data.data);
                  // 成功清空購物車
                  this.rmStorageCart();
                  // 將從server拿到的結帳資訊存入 sessionStorage(瀏覽器關閉就會消失)
                  sessionStorage.setItem(
                    "CartTrendModels",
                    JSON.stringify(res.data.data.formData)
                  );
                  // 導到結帳頁做與綠界系統介接行為
                  this.toCheckOut();
                  this.loading = false;
                }
              }
            })
            .catch((err) => {
              console.log(err.response.data);
              this.errSweetAlert.text =
                err.response.data.messsage || "其他錯誤";
              this.$swal.fire(this.errSweetAlert);
              this.errSweetAlert.text = "";
              this.loading = false;
            });
        }
      });
    },

    /*================================== 棄用但供參考函式  =================================== */

    // (棄用) 每案一次就post一次舊寫法 供參考
    // async addToCart(item, mode, className) {
    //   let input = document.querySelector(className);
    //   let count = document.querySelector(className).value;
    //   let qty = 1;

    //   if (mode == 1 && count == 1) {
    //     alert("數量不得為零");
    //     return;
    //   }

    //   if (mode == 2 && count == 0) {
    //     input.value = 1;
    //     alert("數量不得為零");
    //     return;
    //   }

    //   if (mode == 2) {
    //     qty = count;
    //   }

    //   let model = {
    //     Id: item.id,
    //     Qty: qty,
    //     Name: item.name,
    //   };

    //   await this.$axios
    //     .post(`api/ShoppingCart/AddToCart/1/${mode}`, model)
    //     .then((res) => {
    //       if (res.status == 204 || res.status == 200) {
    //         if ((res.data !== null) & (res.data !== undefined)) {
    //           this.cartsSelect = Array.from(res.data.data);
    //           alert(res.data.messsage);
    //           location.href = "homepage";
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err.response.data);
    //       alert(err.response.data.messsage);
    //     });
    // },

    // (棄用)新寫法不用抓購物車資訊
    // async GetUsrCart() {
    //   await this.$axios
    //     .get(`api/ShoppingCart/GetUserCart?userId=1`)
    //     .then((res) => {
    //       if (res.data) {
    //         this.cartsSelect = Array.from(res.data.data);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(err.response.data);
    //     });
    // },
  },
  components: {},
};
</script>
<style scoped>
.test123 {
  background-color: rgb(211, 28, 123);
}
</style>
