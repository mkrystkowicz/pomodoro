<template>
  <div class="container">
    <TheHeader />
    <div class="view-container">
      <router-view></router-view>
      <ul class="modal-nav">
        <li class="modal-nav__item unselectable">info</li>
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
  </div>
</template>

<script>
import TheHeader from "@/components/Header/TheHeader.vue";
import TheSettings from "./components/Modal/TheSettings.vue";
export default {
  components: {
    TheHeader,
    TheSettings
  },
  data() {
    return {
      settingsOpened: false
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
  height: 80vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.modal-nav {
  display: flex;
  list-style: none;

  &__item {
    color: lighten($base-color, 15%);
    padding: 1rem;
    transition: all 0.2s ease-out;
    cursor: pointer;

    &:hover {
      color: lighten($base-color, 5%);
    }
  }
}
</style>
