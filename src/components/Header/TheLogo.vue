<template>
  <router-link class="logo uselectable" to="/">pomodoro</router-link>
</template>

<style lang="scss" scoped>
@import "@/scss/_base.scss";
.logo {
  font-size: $logo-font-size;
  color: $white;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s ease-out;
  font-style: italic;

  &:hover {
    color: darken($white, 35%);
  }

  @media (min-width: 2000px) {
    font-size: $wide-desktop-logo-font-size;
  }
}
</style>
