<template>
  <router-link class="logo uselectable" to="/">pomodoro</router-link>
</template>

<style lang="scss" scoped>
@import "@/scss/_base.scss";
.logo {
  @include colors(transparent, $white);
  @include font($logo-font-size, 600, var(--active-font-family), italic);
  text-decoration: none;
  transition: 0.3s ease-out;

  &:hover {
    @include colors(transparent, darken($white, 35%));
  }

  @media (min-width: 2000px) {
    @include font($wide-desktop-logo-font-size);
  }
}
</style>
