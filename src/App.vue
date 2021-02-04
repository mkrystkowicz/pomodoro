<template>
  <div class="container">
    <TheHeader />
    <div class="view-container">
      <router-view></router-view>
      <ul class="modal-nav">
        <li
          class="modal-nav__item unselectable"
          @click="infoOpened = !infoOpened"
        >
          info
        </li>
        <li
          class="modal-nav__item unselectable"
          @click="settingsOpened = !settingsOpened"
        >
          settings
        </li>
        <li class="modal-nav__item unselectable">history</li>
      </ul>
    </div>
    <the-settings
      v-if="settingsOpened"
      @closeModal="settingsOpened = !settingsOpened"
    ></the-settings>
    <the-info
      v-if="infoOpened"
      @closeModal="infoOpened = !infoOpened"
    ></the-info>
  </div>
</template>

<script>
import TheHeader from "@/components/Header/TheHeader.vue";
import TheSettings from "./components/Modal/TheSettings.vue";
import TheInfo from "./components/Modal/TheInfo.vue";

export default {
  components: {
    TheHeader,
    TheSettings,
    TheInfo
  },
  data() {
    return {
      settingsOpened: false,
      infoOpened: false
    };
  }
};
</script>

<style lang="scss">
@import "@/scss/_base.scss";

.container {
  width: 100vw;
  height: 100vh;
  background-color: $base-color;
  font-family: $base-font-family;
}

.view-container {
  display: flex;
  height: 70vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.modal-nav {
  display: flex;
  list-style: none;
  animation: modal-nav-animation $navs-animation-duration ease-out;

  &__item {
    color: lighten($base-color, 15%);
    font-size: 1rem;
    padding: 1rem;
    transition: all 0.2s ease-out;
    cursor: pointer;

    &:hover {
      color: lighten($base-color, 5%);
    }

    @media (min-width: 2000px) {
      font-size: 1.3rem;
    }
  }
}

@keyframes modal-nav-animation {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
