<template>
  <div class="container-fluid layout01 px-0">
    <div class="header w-100">網頁Header</div>
    <!-- 
      slot=插槽, 組件=插卡,相同"名稱"的插槽可放入同名插卡, 如網頁內容等等,名稱可自定義
      可參考Homepage.vue用法
      EX:
      <Layout01>-------------components

        <template #contents>
          .....頁面內容
        </template> 

      </Layout01>
    -->
    <slot class="body w-100" name="contents"></slot>

    <div class="footer w-100">網頁Footer</div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>
<style scoped>
.layout01 {
}
.layout01 > .header {
  height: 3em;
  line-height: 3em;
  background-color: black;
  text-align: center;
  color: #fff;
}
.layout01 > .body {
}
.layout01 > .footer {
  height: 3em;
  line-height: 3em;
  color: #fff;
  background-color: black;
  text-align: center;
}
</style>
