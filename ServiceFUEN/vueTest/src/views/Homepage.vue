<template>
  <div>
    我是首頁 <router-link :to="notFoundLink">555</router-link>
    <button @click="goNotFound">qq</button>
    <button @click="callapi">callapp</button>
  </div>
</template>
<script>
import { useRouter, useRoute } from "vue-router";
export default {
  data() {
    return {
      notFoundLink: "/notfound",
      headers: {},
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

  methods: {
    goNotFound() {
      this.toNotFound();
    },
    async callapi() {
      console.log(this.$axios);
      await this.$axios
        .post(`api/ShoppingCart/AddItemsToCart`, {
          ProductId: 1,
        })
        .then((res) => {
          if (res.status == 204 || res.status == 200) {
            if ((res.data !== null) & (res.data !== undefined)) {
              console.log(res.data);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {},
};
</script>
<style>
</style>
