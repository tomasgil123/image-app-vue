/* eslint-disable no-unused-vars */
<template>
  <div class="container">
    <img class="img-styles" :src="imgUrl" />
  </div>
</template>

<script>
export default {
  name: "Image",
  props: ["imgUrl"]
};
</script>

<style scoped>
.container {
  width: 100px;
  height: 100px;
  margin: 10px;
}
.img-styles {
  width: 100%;
}
</style>
