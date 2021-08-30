<template>
  <section class="not-found">
    <h3 class="not-found__title">
      This page was not found.
    </h3>
    <p class="not-found__description">
      Sorry, the page you're looking for doesn't exit. Please go back to home
      page.
    </p>
    <router-link class="not-found__button unselectable" to="/"
      >Go back to home page</router-link
    >
  </section>
</template>

<style lang="scss" scoped>
@import "@/scss/_base.scss";

.not-found {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  @include colors($base-color, $white);
  @include flex(column, center);

  &__title {
    @include font(3rem);
  }

  &__description {
    @include font(1rem);
    margin: 3rem;
  }

  &__button {
    @include colors($white, $base-color);
    @include font(1.2rem);
    border: 2px solid $white;
    border-radius: $base-border-radius;
    padding: $button-padding;
    text-decoration: none;
    transition: all 0.2s ease-out;

    &:hover {
      @include colors($base-color, $white);
      border: 2px solid $white;
    }
  }
}
</style>
