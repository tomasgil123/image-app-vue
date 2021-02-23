/* eslint-disable no-unused-vars */
<template>
  <div class="home">
    <div>
      <div v-if="page > 1">
        <router-link :to="{ name: 'Home', query: { page: page - 1 } }"
          >Prev page</router-link
        >
      </div>
      <div>
        <router-link :to="{ name: 'Home', query: { page: page + 1 } }"
          >Next page</router-link
        >
      </div>
    </div>
    <Suspense>
      <template #default>
        <HomeLanding :page="page" />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import HomeLanding from "../components/HomeLanding";

export default {
  name: "Home",
  components: {
    HomeLanding
  },
  props: ["page"]
};
</script>
