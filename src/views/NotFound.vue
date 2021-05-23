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
@import "@/scss/_variables.scss";

.not-found {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: $base-color;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    color: $white;
    font-size: 3rem;
  }

  &__description {
    color: $white;
    margin: 3rem;
    font-size: 1rem;
  }

  &__button {
    color: $base-color;
    background: $white;
    border: 2px solid $white;
    border-radius: $base-border-radius;
    padding: $button-padding;
    font-size: 1.2rem;
    text-decoration: none;
    transition: all 0.2s ease-out;

    &:hover {
      color: $white;
      background: $base-color;
      border: 2px solid $white;
    }
  }
}
</style>
