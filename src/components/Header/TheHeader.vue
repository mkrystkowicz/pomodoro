<template>
  <header class="header">
    <TheLogo />
    <TheNavigation />
  </header>
</template>

<script>
import TheLogo from "@/components/Header/TheLogo.vue";
import TheNavigation from "@/components/Header/TheNavigation.vue";

export default {
  components: {
    TheLogo,
    TheNavigation
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_base.scss";

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 30vh;
  animation: header-animation $navs-animation-duration ease-out;
}

@keyframes header-animation {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
