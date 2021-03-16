<template>
  {{ visualSettings }}
  <div class="container">
    <TheHeader @click="setAnimation" />
    <div class="view-container">
      <div class="counter-container">
        <router-view v-slot="{ Component }">
          <transition :name="animationDirection" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <div class="stats-input-container">
        <the-input class="stats-input-container__input" />
        <the-button look="stats-input-container__button add-stats-button">
          <AddIcon color="#494949" />
        </the-button>
      </div>
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
          <SettingsIcon class="settings-icon" color="#494949" />
        </li>
        <li class="modal-nav__item unselectable">stats</li>
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
import TheSettings from "@/components/Modal/TheSettings.vue";
import TheInfo from "@/components/Modal/TheInfo.vue";
import TheInput from "@/components/TheInput.vue";
import TheButton from "@/components/TheButton.vue";
import AddIcon from "@/components/Icons/AddIcon.vue";
import SettingsIcon from "@/components/Icons/SettingsIcon.vue";

export default {
  components: {
    TheHeader,
    TheSettings,
    TheInfo,
    TheInput,
    TheButton,
    AddIcon,
    SettingsIcon
  },
  data() {
    return {
      settingsOpened: false,
      infoOpened: false,
      animationDirection: "to-left"
    };
  },
  methods: {
    setAnimation() {
      const routes = this.$router.options.routes;
      this.$router.beforeEach((to, from, next) => {
        const toElement = routes.find(el => el.path === to.path);
        const fromElement = routes.find(el => el.path === from.path);
        const toIndex = routes.indexOf(toElement);
        const fromIndex = routes.indexOf(fromElement);

        if (toIndex > fromIndex) {
          this.changeAnimationDirection("to-left");
        } else if (toIndex < fromIndex) {
          this.changeAnimationDirection("to-right");
        }
        next();
      });
    },
    changeAnimationDirection(direction) {
      this.animationDirection = direction;
    },
    setNewVisualSettings(settings) {
      const { themeColor, font, fontSize } = settings;
      const root = document.querySelector(":root");

      root.style.setProperty("--active-theme-color", themeColor);
      root.style.setProperty("--active-font-family", font);
      root.style.setProperty("--active-font-size", fontSize + "px");
    }
  },
  computed: {
    visualSettings() {
      const localStorage = window.localStorage.getItem("pomodoroSettings");
      let visualSettings;

      if (localStorage) {
        this.$store.commit("setNewSettings", JSON.parse(localStorage));
        visualSettings = this.$store.getters.getVisualSettings;
      } else {
        visualSettings = this.$store.getters.getVisualSettings;
      }

      return this.setNewVisualSettings(visualSettings);
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/_base.scss";

.container {
  width: 100%;
  height: 100%;
  background-color: $base-color;
  font-family: var(--active-font-family);
}

.view-container {
  display: flex;
  height: 70vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.counter-container {
  opacity: 0;
  animation: $counter-entrance-animation;
}

.stats-input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: modal-nav-and-stats-input-animation $navs-animation-duration
    ease-out;

  &__input {
    width: 100%;
  }
}

.modal-nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  list-style: none;
  animation: modal-nav-and-stats-input-animation $navs-animation-duration
    ease-out;

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

  .settings-icon {
    transition: 0.4s ease-in;

    &:hover {
      transform: rotate(360deg);
    }
  }
}

@keyframes counter-animation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modal-nav-and-stats-input-animation {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.to-left-enter-from,
.to-right-leave-to {
  opacity: 0;
  transform: translateX(120px) scale(0.95);
}

.to-left-enter-to,
.to-left-leave-from,
.to-right-leave-from,
.to-right-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.to-left-leave-to,
.to-right-enter-from {
  opacity: 0;
  transform: translateX(-120px) scale(0.95);
}

.to-right-enter-active,
.to-right-leave-active,
.to-left-enter-active,
.to-left-leave-active {
  transition: all 0.4s ease-out;
}
</style>
