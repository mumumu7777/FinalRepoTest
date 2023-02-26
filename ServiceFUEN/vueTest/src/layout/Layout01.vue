<template>
  <div class="container-fluid layout01 px-0">
    <div class="header w-100">網頁Header</div>
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
html,
body {
  width: 100%;
}
.layout01 {
  min-height: 100vh;
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
