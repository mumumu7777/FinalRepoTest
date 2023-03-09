<template>
  <div class="container mt-4 p-0">
    <div class="row px-md-4 px-2 pt-4">
      <div class="col-lg-8">
        <p class="pb-2 fw-bold">Order</p>
        <div class="card">
          <div class="card-scroll-x">
            <div class="table-responsive px-md-4 px-2 pt-3">
              <table class="table table-borderless">
                <tbody>
                  <tr class="">
                    <td>
                      <div class="d-flex align-items-center">
                        <div>
                          <img
                            class="pic"
                            src="https://images.pexels.com/photos/7322083/pexels-photo-7322083.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                          />
                        </div>
                        <div class="ps-3 d-flex flex-column">
                          <p class="fw-bold">
                            Sportswear<span class="ps-1">Heritage</span
                            ><span class="ps-1">Windrunner</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center">
                        <span class="pe-3 text-muted">數量</span>
                        <span class="pe-3">
                          <input class="ps-2" type="number" value="2"
                        /></span>
                      </div>
                    </td>
                  </tr>
                  <!-- testtttt -->
                  <tr class="" v-for="(item, i) in cartsSelect" :key="item.Id">
                    <td>
                      <div class="d-flex align-items-center">
                        <div>
                          <img
                            class="pic"
                            src="https://images.pexels.com/photos/7322083/pexels-photo-7322083.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                          />
                        </div>
                        <div class="ps-3 d-flex flex-column">
                          <p class="fw-bold ps-1">
                            {{ item.Name }}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center">
                        <span class="pe-2 text-muted">數量</span>

                        <button class="btn btn-link px-2 pointer">
                          <font-awesome-icon
                            icon="fas fa-minus"
                            @click.stop="
                              addToCart(item, 1, `.count-input-${i}`)
                            "
                          />
                        </button>

                        <span class="pe-3">
                          <input
                            class="qtyinput text-center"
                            :class="`count-input-${i}`"
                            v-model="item.Qty"
                            type="input"
                            @blur.stop="addToCart(item, 2, `.count-input-${i}`)"
                          />
                        </span>

                        <button class="btn btn-link px-2 pointer">
                          <font-awesome-icon
                            icon="fas fa-plus"
                            @click.stop="
                              addToCart(item, 0, `.count-input-${i}`)
                            "
                          />
                        </button>

                        <div class="ms-4 pointer">
                          <a
                            class="text-dark"
                            @click.stop="removeCartItem(item)"
                          >
                            <font-awesome-icon icon="fas fa-trash" />
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <!-- testtttt -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 payment-summary">
        <p class="fw-bold pt-lg-0 pt-4 pb-2">購買資訊</p>
        <div class="card px-md-3 px-2 pt-4">
          <div class="unregistered mb-4">
            <span class="py-1"
              ><span>地址:</span>
              <VueTwZipCodeSelector
                @getSelectedZone="getSelectedZone"
                class="address-coustomize ms-3" /><input
                v-model="adressinput"
                type="text"
                class="form-control"
                @blur="getAdressInput"
            /></span>
          </div>
          <div class="d-flex justify-content-between pb-3">
            <small v-html="couponmessage" class="text-muted"></small>
          </div>
          <div class="d-flex justify-content-between b-bottom">
            <input
              v-model="couponinput"
              @blur.stop="getCoupon"
              type="text"
              class="ps-2"
              placeholder="折價券代碼"
            />
          </div>
        </div>
        <div class="d-flex flex-column b-bottom">
          <div class="d-flex justify-content-between py-3">
            <small class="text-muted">折價券折扣</small>
            <p>$122</p>
          </div>
          <div class="d-flex justify-content-between pb-3">
            <small class="text-muted">以折扣金額</small>
            <p>$22</p>
          </div>
          <div class="d-flex justify-content-between">
            <small class="text-muted">總金額</small>
            <p>${{ this.getTotal }}</p>
          </div>
        </div>
        <div class="my-3">
          <span>
            <button
              type="button"
              class="btn btn-lg btn-block btn-success p-1 col-12"
              @click.stop="cartSubmit"
            >
              <p class="btntext">購買</p>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div v-html="paymentForm"></div>
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
      paymentForm: "",
      adressval: null,
      adressinput: "",
      //折價券資料
      couponinput: "",
      couponmessage: "",
      coupondiscountdata: "",
      couponLeastCount: null,
      couponID: null,
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

    return { toNotFound };
  },
  // 比mounted早 沒有html
  // created() {
  //   this.GetProducts();
  // },

  // 已經有html了
  mounted() {
    this.getStorageCart();
  },
  // 如果有反覆計算 不含複雜邏輯的地方 用computed效能比較高
  computed: {
    getTotal() {
      if (this.cartsSelect.length > 0) {
        let totalCount = this.cartsSelect
          .map((a) => a.Price * a.Qty) // 得到 price * qty 陣列 [100*2, 2000*5, 500 * 6]
          .reduce((a, b) => a + b); // 做累加 a累加值 b 下一個要累加的數 [200, 10000, 3000] => 200 + 10000 +300

        if (this.coupondiscountdata) {
          if (this.coupondiscountdata > 1) {
            totalCount = totalCount - parseInt(this.coupondiscountdata);
          } else {
            totalCount = parseInt(totalCount * this.coupondiscountdata);
          }
        }

        //加這個totalcount會變成零
        // if (this.coupondiscountdata < 1 ) {
        //      totalCount = totalCount * this.coupondiscountdata;
        //   }

        return totalCount;
      } else {
        return 0;
      }
    },
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

    /*================================== 購物車行為及api  =================================== */

    //地址行為
    async getAdressInput() {
      console.log(this.adressinput);
    },

    async getSelectedZone(selc) {
      this.adressval = JSON.parse(JSON.stringify(selc.value));
      console.log(this.adressval);
    },

    //呼叫折價券api
    async getCoupon() {
      if (this.couponinput) {
        this.$axios
          .get(`api/ShoppingCart/CatchCoupon?CouponCode=${this.couponinput}`)
          .then((res) => {
            if (res.status == 204 || res.status == 200) {
              //折扣數
              this.coupondiscountdata = res.data.data.discount;
              this.couponmessage = `<span class="text-success">${res.data.messsage}<\/span>`;
              this.couponID = res.data.data.id;
              this.couponLeastCount = res.data.data.leastCost;
              // alert(`${this.couponID}`);
            }
          })
          .catch((err) => {
            this.couponmessage = `<span class="text-danger">${err.response.data.messsage}<\/span>`;
            this.coupondiscountdata = "";
            this.couponinput = "";
          });
      } else {
        this.coupondiscountdata = "";
        this.couponmessage = "";
      }
    },

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
    /*
      購物車提交:
      1. 將購物車提交至後端並儲存訂單、產生綠界付款需要的參數
      2. http狀態 200 得到付款參數 用付款參數組form
      3. 提交表單到綠界支付 並清空參數及購物車
    */
    async cartSubmit() {
      // 確認購買
      await this.$swal.fire(this.buySweetConfirm).then((result) => {
        if (result.isConfirmed) {
          if (
            !this.adressval ||
            !this.adressval.name ||
            !this.adressval.zipCode ||
            !this.adressval.county ||
            !this.adressval.countyName ||
            !this.adressinput
          ) {
            this.errSweetAlert.text = "請輸入完整地址";
            this.$swal.fire(this.errSweetAlert);
            this.errSweetAlert.text = "";
            return;
          }

          // 按下購買
          let model = {
            MemberId: 1,
            State: 0,
            Total: this.getTotal,
            CartProducts: Array.from(this.cartsSelect),
            CouponCode: this.couponinput,
            CouponData: {
              UsedCouponID: this.couponID,
              CouponCode: this.couponinput,
              Discount: parseInt(this.coupondiscountdata),
            },
            Adress: {
              Name: this.adressval.name,
              ZipCode: this.adressval.zipCode,
              County: this.adressval.county,
              CountyName: this.adressval.countyName,
              InputRegion: this.adressinput,
            },
          };

          this.loading = true;
          this.$axios
            .post(`api/ShoppingCart/SaveShoppingCart`, model)
            .then((res) => {
              if (res.status == 204 || res.status == 200) {
                if ((res.data !== null) & (res.data !== undefined)) {
                  // 成功清購物車
                  this.rmStorageCart();
                  // alert訊息
                  this.successSweetAlert.text = res.data.messsage;
                  this.$swal.fire(this.successSweetAlert);
                  this.successSweetAlert.text = "";
                  /*
                    提交成功將後端產的付款參數組成form 並存在paymentForm
                    因為 <div v-html="paymentForm"></div> 使用v-html
                    用字串拼接的form將以html方式顯示在網頁
                  */
                  this.paymentForm = this.buildPaymentForm(
                    res.data.data.formData // 後端回傳付款參數
                  );

                  this.loading = false;
                  /*
                    Vue更新html並不會即時反應(因為他是操作虛擬Dom 不是直接操作Dom元素)，
                    若直接使用document.getElementById("payment")會抓不到
                    必須使用$nextTick: 在下次畫面更新後做事
                  */

                  this.$nextTick(() => {
                    document.getElementById("payment").submit();
                    this.paymentForm = "";
                  });
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

    // 購買後將後端產的付款參數組成form post到綠界
    buildPaymentForm(trendModels) {
      let rtn = ``;
      rtn += `<form action="${trendModels.url}" method="post" id="payment">`;
      // 必要參數
      rtn += `<input type="hidden" name="MerchantID" value="${trendModels.merchantID}"\/>`;
      rtn += `<input type="hidden" name="MerchantTradeNo" value="${trendModels.merchantTradeNo}"\/>`;
      rtn += `<input type="hidden" name="MerchantTradeDate" value="${trendModels.merchantTradeDate}"\/>`;
      rtn += `<input type="hidden" name="PaymentType" value="${trendModels.paymentType}"\/>`;
      rtn += `<input type="hidden" name="TotalAmount" value="${trendModels.totalAmount}"\/>`;
      rtn += `<input type="hidden" name="TradeDesc" value="${trendModels.tradeDesc}"\/>`;
      rtn += `<input type="hidden" name="ItemName" value="${trendModels.itemName}"\/>`;
      rtn += `<input type="hidden" name="ReturnURL" value="${trendModels.returnURL}"\/>`;
      rtn += `<input type="hidden" name="ChoosePayment" value="${trendModels.choosePayment}"\/>`;
      rtn += `<input type="hidden" name="CheckMacValue" value="${trendModels.checkMacValue}"\/>`;
      rtn += `<input type="hidden" name="EncryptType" value="${trendModels.encryptType}"\/>`;
      // Optional
      if (trendModels.storeID) {
        rtn += `<input type="hidden" name="StoreID" value="${trendModels.storeID}"\/>`;
      }

      if (trendModels.clientBackURL) {
        rtn += `<input type="hidden" name="ClientBackURL" value="${trendModels.clientBackURL}"\/>`;
      }

      if (trendModels.itemURL) {
        rtn += `<input type="hidden" name="ItemURL" value="${trendModels.itemURL}"\/>`;
      }

      if (trendModels.remark) {
        rtn += `<input type="hidden" name="Remark" value="${trendModels.remark}"\/>`;
      }

      if (trendModels.chooseSubPayment) {
        rtn += `<input type="hidden" name="ChooseSubPayment" value="${trendModels.chooseSubPayment}"\/>`;
      }

      if (trendModels.orderResultURL) {
        rtn += `<input type="hidden" name="OrderResultURL" value="${trendModels.orderResultURL}"\/>`;
      }

      if (trendModels.needExtraPaidInfo) {
        rtn += `<input type="hidden" name="NeedExtraPaidInfo" value="${trendModels.needExtraPaidInfo}"\/>`;
      }

      if (trendModels.ignorePayment) {
        rtn += `<input type="hidden" name="IgnorePayment" value="${trendModels.ignorePayment}"\/>`;
      }

      if (trendModels.platformID) {
        rtn += `<input type="hidden" name="PlatformID" value="${trendModels.platformID}"\/>`;
      }

      if (trendModels.invoiceMark) {
        rtn += `<input type="hidden" name="InvoiceMark" value="${trendModels.invoiceMark}"\/>`;
      }

      if (trendModels.customField1) {
        rtn += `<input type="hidden" name="CustomField1" value="${trendModels.customField1}"\/>`;
      }

      if (trendModels.customField2) {
        rtn += `<input type="hidden" name="CustomField2" value="${trendModels.customField2}"\/>`;
      }

      if (trendModels.customField3) {
        rtn += `<input type="hidden" name="CustomField3" value="${trendModels.customField3}"\/>`;
      }

      if (trendModels.customField4) {
        rtn += `<input type="hidden" name="CustomField4" value="${trendModels.customField4}"\/>`;
      }

      if (trendModels.language) {
        rtn += `<input type="hidden" name="Language" value="${trendModels.language}"\/>`;
      }

      if (trendModels.unionPay) {
        rtn += `<input type="hidden" name="UnionPay" value="${trendModels.unionPay}"\/>`;
      }
      rtn += `</form>`;

      return rtn;
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
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: "Montserrat", sans-serif;
}
body {
  background-color: #b064f7;
  line-height: 1rem;
  font-size: 14px;
  padding: 10px;
}
.container {
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: #eee;
}

.order .card {
  position: relative;
  background: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.pic {
  width: 70px;
  height: 90px;
  border-radius: 5px;
}
td {
  vertical-align: middle;
}
.red {
  color: #fd1c1c;
  font-weight: 600;
}
.b-bottom {
  border-bottom: 2px dotted black;
  padding-bottom: 20px;
}
p {
  margin: 0px;
}
table input {
  width: 50px;
  border: 1px solid #66b3ff;
  border-radius: 0.25rem;
}
input:focus {
  border: 1px solid #eee;
  outline: none;
}
.round {
  background-color: #eee;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.payment-summary .unregistered {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  text-transform: uppercase;
  font-size: 14px;
}
.payment-summary input {
  width: 100%;
  margin-right: 20px;
}
.payment-summary .sale {
  width: 100%;
  background-color: #e9b3b3;
  text-transform: uppercase;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
}
.red {
  color: #fd1c1c;
}

.delivery .card {
  padding: 10px 5px;
}

/* 自己設最小高度 */
.card-scroll-x {
  max-height: 500px;
  overflow-y: auto;
}

.btntext {
  font-size: 16px;
}

/* 更改地址 */

@media screen and (max-width: 576px) {
  .card-scroll-x {
    max-height: none;
    overflow-y: auto;
  }
}
</style>
<style>
.address-coustomize select {
  /* display: inline-block; */
  margin-right: 0.5em;
}
</style>
