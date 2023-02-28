<template>
  <Layout01>
    <template #contents>
      此頁為結帳結果頁，將綠界交易資訊傳回顯示
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

  methods: {
    /*================================== 公用函式  =================================== */
    /*================================== 結帳行為及api  =================================== */
  },
  components: {},
};
</script>
<style scoped>
</style>
