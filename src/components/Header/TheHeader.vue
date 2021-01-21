<template>
  <div class="header">
    <TheLogo />
    <TheNavigation />
  </div>
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
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 30vh;
}
</style>
