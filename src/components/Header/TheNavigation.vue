<template>
  <nav class="nav" @click="scrollToBottom">
    <ul class="nav__list">
      <li class="nav__link-container">
        <router-link class="nav__link unselectable" to="/pomodoro"
          >pomodoro</router-link
        >
      </li>
      <li class="nav__link-container">
        <router-link class="nav__link unselectable" to="/short-break"
          >short break</router-link
        >
      </li>
      <li class="nav__link-container">
        <router-link class="nav__link unselectable" to="/long-break"
          >long break</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    scrollToBottom() {
      window.scrollBy({
        top: 50,
        left: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_base.scss";
.nav {
  @include colors(darken($base-color, 3%));
  width: 18rem;
  padding: 0.2rem;
  border-radius: $base-border-radius;
  box-shadow: $base-box-shadow;
  overflow: hidden;

  &__list {
    @include flex(auto, space-between);
  }

  &__link-container {
    @include flex;
    list-style: none;
  }

  &__link {
    @include font(0.7rem);
    padding: 1rem;
    @include colors(transparent, lighten($base-color, 100%));
    text-decoration: none;
    text-align: center;
    transition: 0.2s ease-out;
    border-radius: $base-border-radius;

    &:hover {
      @include colors(transparent, lighten($base-color, 35%));
    }

    &.router-link-active {
      @include colors(var(--active-theme-color), $black);
      transition: 0.3s ease-in-out;
    }

    @media (min-width: 2000px) {
      @include font(1rem);
    }
  }

  @media (min-width: 375px) {
    width: 20rem;
  }

  @media (min-width: 2000px) {
    width: 24rem;
  }
}
</style>
