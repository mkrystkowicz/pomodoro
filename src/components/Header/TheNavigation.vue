<template>
  <nav class="nav" @click="scrollToBottom">
    <ul class="nav__list">
      <router-link class="nav__link unselectable" to="/pomodoro"
        >pomodoro</router-link
      >
      <router-link class="nav__link unselectable" to="/short-break"
        >short break</router-link
      >
      <router-link class="nav__link unselectable" to="/long-break"
        >long break</router-link
      >
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
  width: 16rem;
  padding: 0.2rem;
  background-color: darken($base-color, 3%);
  border-radius: $base-border-radius;
  box-shadow: $base-box-shadow;
  overflow: hidden;

  &__list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__link {
    font-size: 0.7rem;
    padding: 1rem;
    color: lighten($base-color, 100%);
    text-decoration: none;
    text-align: center;
    transition: 0.2s ease-out;

    &:hover {
      color: lighten($base-color, 35%);
    }

    &.router-link-active {
      background-color: var(--active-theme-color);
      color: $black;
      border-radius: $base-border-radius;
      transition: 0.3s ease-in-out;
    }

    @media (min-width: 2000px) {
      font-size: 1rem;
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
