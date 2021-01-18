<template>
  <div class="container">
    <TheHeader />
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader";
export default {
  components: { TheHeader }
};
</script>

<style lang="scss">
@import "./scss/_base.scss";

.container {
  width: 100vw;
  height: 100vh;
  background-color: $base-color;
  font-family: $base-font-family;
}
</style>
