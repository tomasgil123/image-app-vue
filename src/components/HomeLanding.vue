/* eslint-disable no-unused-vars */
<template>
  <div class="home">
    <ImageGrid :page="page" />
  </div>
</template>

<script>
import ImageGrid from "./ImageGrid";
import { getToken } from "../service";
import { useStore } from "vuex";

//data.pictures
//data.hasMore
// cada picture cropped_picture: "http://interview.agileengine.com/pictures/cropped/0002.jpg"
//id: "90322bc9cd20fd0f4ffa"

export default {
  name: "HomeLanding",
  components: {
    ImageGrid
  },
  props: ["page"],
  async setup() {
    const store = useStore();

    const { data } = await getToken();
    if (data.auth) {
      store.commit("setToken", data.token);
    }
  }
};
</script>
