<template>
  <div class="container">
    <TheHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from "@/components/Header/TheHeader.vue";
export default {
  components: { TheHeader }
};
</script>

<style lang="scss">
@import "@/scss/_base.scss";

.container {
  width: 100vw;
  height: 100vh;
  background-color: $base-color;
  font-family: $base-font-family;
}
</style>
