<template>
  <div class="home">
    This is the home
  </div>
</template>

<script>
import { getToken } from "../service";
import { useStore } from "vuex";

export default {
  name: "Home",
  props: ["page"],
  async setup() {
    const store = useStore();
    // eslint-disable-next-line no-unused-vars
    const { data } = await getToken();
    if (data.auth) {
      store.commit("setToken", data.token);
    }
  }
};
</script>
