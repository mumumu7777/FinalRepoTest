<template>
  <Layout01>
    <template #contents>
      <form :action="trendModels.url" method="post" id="payment">
        <input
          type="hidden"
          name="MerchantID"
          :value="trendModels.merchantID"
        />
        <input
          type="hidden"
          name="MerchantTradeNo"
          :value="trendModels.merchantTradeNo"
        />
        <input
          type="hidden"
          name="MerchantTradeDate"
          :value="trendModels.merchantTradeDate"
        />
        <input
          type="hidden"
          name="PaymentType"
          :value="trendModels.paymentType"
        />
        <input
          type="hidden"
          name="TotalAmount"
          :value="trendModels.totalAmount"
        />
        <input type="hidden" name="TradeDesc" :value="trendModels.tradeDesc" />
        <input type="hidden" name="ItemName" :value="trendModels.itemName" />
        <input type="hidden" name="ReturnURL" :value="trendModels.returnURL" />
        <input
          type="hidden"
          name="ChoosePayment"
          :value="trendModels.choosePayment"
        />
        <input
          type="hidden"
          name="CheckMacValue"
          :value="trendModels.checkMacValue"
        />
        <input
          type="hidden"
          name="EncryptType"
          :value="trendModels.encryptType"
        />
        <!-- Optional -->
        <input
          v-if="trendModels.storeID"
          type="hidden"
          name="StoreID"
          :value="trendModels.storeID"
        />
        <input
          v-if="trendModels.clientBackURL"
          type="hidden"
          name="ClientBackURL"
          :value="trendModels.clientBackURL"
        />
        <input
          v-if="trendModels.itemURL"
          type="hidden"
          name="ItemURL"
          :value="trendModels.itemURL"
        />
        <input
          v-if="trendModels.remark"
          type="hidden"
          name="Remark"
          :value="trendModels.remark"
        />
        <input
          v-if="trendModels.chooseSubPayment"
          type="hidden"
          name="ChooseSubPayment"
          :value="trendModels.chooseSubPayment"
        />
        <input
          v-if="trendModels.orderResultURL"
          type="hidden"
          name="OrderResultURL"
          :value="trendModels.orderResultURL"
        />
        <input
          v-if="trendModels.needExtraPaidInfo"
          type="hidden"
          name="NeedExtraPaidInfo"
          :value="trendModels.needExtraPaidInfo"
        />
        <input
          v-if="trendModels.ignorePayment"
          type="hidden"
          name="IgnorePayment"
          :value="trendModels.ignorePayment"
        />
        <input
          v-if="trendModels.platformID"
          type="hidden"
          name="PlatformID"
          :value="trendModels.platformID"
        />
        <input
          v-if="trendModels.invoiceMark"
          type="hidden"
          name="InvoiceMark"
          :value="trendModels.invoiceMark"
        />
        <input
          v-if="trendModels.customField1"
          type="hidden"
          name="CustomField1"
          :value="trendModels.customField1"
        />
        <input
          v-if="trendModels.customField2"
          type="hidden"
          name="CustomField2"
          :value="trendModels.customField2"
        />
        <input
          v-if="trendModels.customField3"
          type="hidden"
          name="CustomField3"
          :value="trendModels.customField3"
        />
        <input
          v-if="trendModels.customField4"
          type="hidden"
          name="CustomField4"
          :value="trendModels.CustomField4"
        />
        <input
          v-if="trendModels.language"
          type="hidden"
          name="Language"
          :value="trendModels.language"
        />
        <input
          v-if="trendModels.unionPay"
          type="hidden"
          name="UnionPay"
          :value="trendModels.unionPay"
        />
      </form>
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
      // vue loading
      loading: false,
      trendModels: null,
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

  created() {
    this.trendModels = JSON.parse(sessionStorage.getItem("CartTrendModels"));
    // 因為已放入參數 在這頁馬上把交易資訊清掉
    sessionStorage.removeItem("CartTrendModels");
    if (!this.trendModels) {
      // 無交易資訊導回home
      this.errSweetAlert.text = "未傳入訂單資訊";
      this.$swal.fire(this.errSweetAlert);
      this.errSweetAlert.text = "";
      this.toHomePage();
    }
  },
  mounted() {
    // 畫面render出來後提交表單
    document.getElementById("payment").submit();
  },
  methods: {
    /*================================== 公用函式  =================================== */
  },
  components: {},
};
</script>
<style scoped>
</style>
