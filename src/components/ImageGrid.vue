/* eslint-disable no-unused-vars */
<template>
  <div>
    Image grid
    <div v-if="loading">Loading images ...</div>
    <div v-else>
      <div v-if="error">An error has occurred</div>
      <div v-else>{{ images }}</div>
    </div>
  </div>
</template>

<script>
import { getToken, getImages } from "../service";
import { useStore } from "vuex";
import { ref, watchEffect } from "vue";

//data.pictures
//data.hasMore
// cada picture cropped_picture: "http://interview.agileengine.com/pictures/cropped/0002.jpg"
//id: "90322bc9cd20fd0f4ffa"

export default {
  name: "ImageGrid",
  props: ["page"],
  async setup(props) {
    const store = useStore();

    const images = ref([]);
    const loading = ref(false);
    const error = ref(null);

    watchEffect(async () => {
      loading.value = true;
      try {
        const token = store.getters.getToken();
        const res = await getImages(token, props.page);
        if (res.status === 401) {
          const { data } = await getToken();
          if (data.auth) {
            store.commit("setToken", data.token);
          }
          const res401 = await getImages(data?.token);
          images.value = res401;
          loading.value = false;
        }
        images.value = res;
        loading.value = false;
      } catch (err) {
        error.value = true;
        loading.value = false;
      }
    });

    return { images, loading, error };
  }
};
</script>
