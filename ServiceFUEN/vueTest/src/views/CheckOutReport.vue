<template>
  <div>結帳結果頁</div>
  <div v-if="hasTakeDatas">
    <div>付款編號:</div>
    <div>{{ this.paymentID }}</div>
    <div>結帳日期:</div>
    <div>{{ this.foramtDateTime(this.paymentData.orderDetail.orderDate) }}</div>
    <div>訂單狀態:</div>
    <div>{{ getOrderState }}</div>
    <div>運送地址:</div>
    <div>{{ this.paymentData.orderDetail.address }}</div>

    <br /><br />

    <div>已購買商品:</div>
    <div
      v-for="item in this.paymentData.orderDetail.orderItems.$values"
      :key="item.orderId"
    >
      <div>名稱:</div>
      <div>{{ item.productName }}</div>
      <div>數量:</div>
      <div>{{ item.productNumber }}</div>
      <div>金額:</div>
      <div>{{ item.productPrice * item.productNumber }}</div>
      <br />
    </div>

    <div>原價:</div>
    <div>{{ this.paymentData.toatalBefore }}</div>
    <div>折扣金額:</div>
    <div>{{ this.paymentData.minusAmount }}</div>
    <div>總金額:</div>
    <div>{{ this.paymentData.orderDetail.total }}</div>
  </div>
</template>

<script>
import { clippingParents } from "@popperjs/core";
import { useRouter, useRoute } from "vue-router";

export default {
  data() {
    return {
      // vue loading
      loading: false,
      hasTakeDatas: false,
      paymentID: this.$route.params.id,
      paymentData: null,
      errSweetAlert: {
        title: "錯誤",
        icon: "error",
        confirmButtonText: "確定",
        confirmButtonColor: "#41b882",
        // timer: 2000,
      },
      successSweetAlert: {
        title: "成功",
        icon: "success",
        confirmButtonText: "確定",
        confirmButtonColor: "#41b882",
        // timer: 2000,
      },
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const toHomePage = () => {
      router.push(`/homepage`);
    };
    return { toHomePage };
  },
  mounted() {
    console.log(this.paymentID);
    this.GetPaymentResult();
  },
  computed: {
    getOrderState() {
      let StateName = "";
      if (this.paymentData) {
        if (this.paymentData.orderDetail) {
          switch (this.paymentData.orderDetail.state) {
            case -1:
              StateName = "待付款";
              break;
            case 0:
              StateName = "未出貨";
              break;
            case 1:
              StateName = "已出貨";
              break;
            case 2:
              StateName = "運送中";
              break;
            case 3:
              StateName = "已簽收";
              break;
            case 4:
              StateName = "已完成";
              break;
          }
        }
      }
      return StateName;
    },
  },

  methods: {
    /*================================== 公用函式  =================================== */
    // 格式化Datime
    foramtDateTime(str) {
      let dateTime = new Date(str);

      let year = dateTime.getFullYear();
      let month = dateTime.getMonth();
      let day = dateTime.getDate();
      let h = dateTime.getHours();
      let m = dateTime.getMinutes();
      let s = dateTime.getSeconds();

      return `${year}/${month}/${day}/ ${h}:${m}:${s}`;
    },
    /*================================== 結帳行為及api  =================================== */
    async GetPaymentResult() {
      await this.$axios
        .get(`api/ShoppingCart/GetPaymentResult?paymentId=${this.paymentID}`)
        .then((res) => {
          if (res.data) {
            this.paymentData = res.data.data;
            console.log(this.paymentData);
            // 有資料才show
            this.hasTakeDatas = true;
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          this.errSweetAlert.text = error.response.data.messsage || "其他錯誤";
          this.$swal.fire(this.errSweetAlert);
          this.errSweetAlert.text = "";
        });
    },
  },
  components: {},
};
</script>
<style scoped>
</style>
