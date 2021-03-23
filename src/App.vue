<template>
  {{ initialSettings }}
  <div class="container">
    <TheHeader @click="setAnimation" />
    <div class="view-container">
      <div class="counter-container" v-if="!statsInputFocused">
        <router-view v-slot="{ Component }">
          <transition :name="animationDirection" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
      <div class="available-stats-container" v-else>
        <the-button
          look="available-stats-container__button svg-button"
          @click="() => handleStatsInputFocus(false)"
        >
          <CloseIcon color="#494949" />
        </the-button>
        <ul
          class="available-stats-container__list hide-scrollbar"
          @click="() => handleStatsInputFocus(true)"
        >
          <p
            v-if="!getStats().length"
            class="available-stats-container__list-is-empty"
          >
            You must add new task to your stats to see a list
          </p>
          <li
            class="available-stats-container__list-item"
            v-for="stat in getStats()"
            :key="stat.key"
            @click="chooseCurrentStat(stat.name)"
          >
            {{ stat.name }}
          </li>
        </ul>
      </div>
      <div class="stats-container">
        <the-input
          ref="statsInput"
          class="stats-container__input"
          v-model:statsInputValue="statsInputValue"
          updateType="update:statsInputValue"
          :inputFailed="statsInputFailed"
          :currentValue="currentStat"
          @statsInputFocused="() => handleStatsInputFocus(true)"
          @keypress.enter="addNewStat"
        />
        <the-button
          look="stats-container__button svg-button"
          @click="addNewStat"
        >
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
        <li
          class="modal-nav__item unselectable"
          @click="statsOpened = !statsOpened"
        >
          stats
        </li>
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
    <the-stats
      v-if="statsOpened"
      @closeModal="statsOpened = !statsOpened"
      @statDeleted="name => clearInputOnDeletedElement(name)"
    ></the-stats>
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
import CloseIcon from "@/components/Icons/CloseIcon.vue";
import TheStats from "@/components/Modal/TheStats.vue";

export default {
  components: {
    TheHeader,
    TheSettings,
    TheInfo,
    TheInput,
    TheButton,
    AddIcon,
    SettingsIcon,
    CloseIcon,
    TheStats
  },
  data() {
    return {
      infoOpened: false,
      settingsOpened: false,
      statsOpened: false,
      animationDirection: "to-left",
      currentStat: "",
      statsInputValue: "",
      statsInputFailed: false,
      statsInputFocused: false
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
    },
    handleStatsInputFocus(focus) {
      this.$refs.statsInput.$el.value = "";
      if (focus === true) {
        this.$refs.statsInput.$el.focus();
      }
      return (this.statsInputFocused = focus);
    },
    getStats() {
      this.statsInputFailed = false;
      const allStats = this.$store.getters.getStats;
      const filteredStats = allStats.filter(stats =>
        stats.name.toLowerCase().includes(this.statsInputValue.toLowerCase())
      );

      if (filteredStats) {
        return filteredStats;
      } else {
        return allStats;
      }
    },
    addNewStat() {
      if (this.statsInputValue.length === 0) {
        return (this.statsInputFailed = true);
      }

      this.currentStat = this.statsInputValue;
      this.addCurrentStatToStorage(this.statsInputValue);
      this.$store.commit("addNewStat", this.statsInputValue);

      return this.$store.commit("saveStatsInStorage");
    },
    chooseCurrentStat(stat) {
      this.currentStat = stat;
      return this.addCurrentStatToStorage(stat);
    },
    addCurrentStatToStorage(stat) {
      return window.localStorage.setItem("currentTask", stat);
    },
    saveStatsInStorage() {
      return this.$store.commit("saveStatsInStorage");
    },
    getCurrentStatFromStorage() {
      const savedStat = window.localStorage.getItem("currentTask");

      return (this.currentStat = savedStat);
    },
    clearInputOnDeletedElement(name) {
      if (this.currentStat === name) {
        return (this.currentStat = "");
      } else {
        return;
      }
    }
  },
  computed: {
    initialSettings() {
      const localStorage = window.localStorage.getItem("pomodoroSettings");
      let visualSettings;

      this.getCurrentStatFromStorage();
      this.$store.commit("importStatsFromStorage");

      if (localStorage) {
        this.$store.commit("setNewSettings", JSON.parse(localStorage));
        visualSettings = this.$store.getters.getVisualSettings;
      } else {
        visualSettings = this.$store.getters.getVisualSettings;
      }

      return this.setNewVisualSettings(visualSettings);
    }
  },
  created() {
    return window.addEventListener("beforeunload", this.saveStatsInStorage);
  },
  beforeUnmount() {
    return window.removeEventListener("beforeunload", this.saveStatsInStorage);
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

.available-stats-container {
  @extend .counter-container;

  animation: counter-animation 0.2s 0.4s ease-out forwards;
  position: relative;

  &__button {
    position: absolute;
    top: 0;
    right: 0;
  }

  &__list {
    width: $mobile-clock-face;
    height: $mobile-clock-face;
    overflow-y: scroll;
    list-style: none;
    margin-top: 3rem;
  }

  &__list-is-empty {
    font-size: 1rem;
    text-align: center;
    padding: 2rem 0;
    color: $lighter-gray-color;
  }

  &__list-item {
    margin: 5px 0;
    color: lighten($base-color, 40%);
    background-color: lighten($base-color, 5%);
    padding: 10px 15px;
    transition: 0.3s ease-out;
    cursor: pointer;

    &:hover {
      background-color: lighten($base-color, 10%);
    }
  }
}

.stats-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  animation: modal-nav-and-stats-input-animation $navs-animation-duration
    ease-out;

  &__input {
    flex-basis: 70%;
    width: 100%;
  }

  &__button {
    flex-basis: 10%;
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
