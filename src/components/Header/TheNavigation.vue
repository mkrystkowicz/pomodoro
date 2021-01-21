<template>
  <nav class="nav">
    <ul class="nav__list">
      <router-link class="nav__link" to="/pomodoro">pomodoro</router-link>
      <router-link class="nav__link" to="/short-break">short break</router-link>
      <router-link class="nav__link" to="/long-break">long break</router-link>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@import "@/scss/_base.scss";
.nav {
  width: 90%;
  padding: 0.2rem;
  background-color: darken($base-color, 3%);
  border-radius: $base-border-radius;
  box-shadow: $base-box-shadow;

  &__indicator {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(5%);
    border-radius: $base-border-radius;
    background-color: $sec-color;
  }

  &__list {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__link {
    font-size: 0.7em;
    padding: 1rem;
    z-index: 2;
    color: lighten($base-color, 100%);
    text-decoration: none;
    text-align: center;

    &.router-link-active {
      background-color: $sec-color;
      color: darken($sec-color, 100%);
      border-radius: $base-border-radius;
      transition: 0.3s ease-in-out;
    }
  }

  @media (min-width: 420px) {
    width: 65%;
  }

  @media (min-width: 720px) {
    width: 45%;
  }

  @media (min-width: 1200px) {
    width: 30%;
  }

  @media (min-width: 1500px) {
    width: 20%;
  }
}
</style>
