/* eslint-disable no-unused-vars */
<template>
  <div>
    Image grid
    <div v-if="loading">Loading images ...</div>
    <div v-else>
      <div v-if="error">An error has occurred</div>
      <div class="container-images" v-else>
        <Image
          v-on:click="onSeeImageDetail(image.id)"
          v-for="image in images.data.pictures"
          :key="image.id"
          :imgUrl="image.cropped_picture"
        />
      </div>
    </div>
    <div v-if="showModal" class="container-modal">
      <div v-if="loadingImageData">Loading images ...</div>
      <div v-else>
        <div v-if="errorDetailImage">
          An error has occurred loading the image specific data
        </div>
        <div v-else>
          {{ selectedImageDetails }}
        </div>
      </div>
      <button v-on:click="closeModal">Close modal</button>
    </div>
  </div>
</template>

<script>
import Image from "./Image";
import { getToken, getImages, getSpecificImage } from "../service";
import { useStore } from "vuex";
import { ref, watchEffect } from "vue";

export default {
  name: "ImageGrid",
  components: {
    Image
  },
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

    const showModal = ref(false);
    const errorDetailImage = ref(null);
    const selectedImageId = ref(null);
    const selectedImageDetails = ref(null);
    const loadingImageData = ref(false);

    watchEffect(async () => {
      if (selectedImageId.value) {
        loadingImageData.value = true;
        try {
          const token = store.getters.getToken();
          const res = await getSpecificImage(token, selectedImageId.value);
          if (res.status === 401) {
            const { data } = await getToken();
            if (data.auth) {
              store.commit("setToken", data.token);
            }
            const res401 = await getImages(data?.token, selectedImageId.value);
            selectedImageDetails.value = res401;
            loadingImageData.value = false;
          }
          selectedImageDetails.value = res;
          loadingImageData.value = false;
        } catch (err) {
          errorDetailImage.value = true;
          loadingImageData.value = false;
        }
      }
    });

    const onSeeImageDetail = idImage => {
      showModal.value = true;
      selectedImageId.value = idImage;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      onSeeImageDetail,
      closeModal,
      errorDetailImage,
      selectedImageDetails,
      loadingImageData,
      showModal,
      images,
      loading,
      error
    };
  }
};
</script>

<style scoped>
.container-images {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.container-modal {
  position: absolute;
  z-index: 5;
  left: 0;
  right: 0;
  top: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  height: 80%;
  border: 1px solid black;
  background-color: white;
}
</style>
