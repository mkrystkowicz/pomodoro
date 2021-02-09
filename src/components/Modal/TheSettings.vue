<template>
  <the-modal @closeModal="closeModal" class="settings">
    <template #title>
      <h2 class="settings__title">settings</h2>
    </template>
    <template #default>
      <div class="settings__options">
        <div class="input-container">
          <label class="input-container__label" for="pomodoro"
            >Pomodoro time</label
          >
          <input
            class="input-container__input"
            type="number"
            name="pomodoro"
            :placeholder="pomodoroTime"
            v-model="newPomodoroTime"
          />
        </div>
        <div class="input-container">
          <label class="input-container__label" for="short-break"
            >Short-break time</label
          >
          <input
            class="input-container__input"
            type="number"
            name="short-break"
            :placeholder="shortBreakTime"
            v-model="newShortBreakTime"
          />
        </div>
        <div class="input-container">
          <label class="input-container__label" for="long-break"
            >Long-break time</label
          >
          <input
            class="input-container__input"
            type="number"
            name="long-break"
            :placeholder="longBreakTime"
            v-model="newLongBreakTime"
          />
        </div>
      </div>
      <div class="radio-container">
        <div class="radio-container__settings-title">
          Theme color
        </div>
        <div class="radio-container__inputs-list">
          <div class="radio-container__theme-input-container">
            <input
              class="radio-container__input"
              type="radio"
              name="theme-color"
              value="#53b835"
              v-model="newThemeValue"
            />
            <label
              class="radio-container__input-label font-green-theme"
              for="font-family"
              >Green</label
            >
          </div>
          <div class="radio-container__theme-input-container">
            <input
              class="radio-container__input"
              type="radio"
              name="theme-color"
              value="#e0bc44"
              v-model="newThemeValue"
            />
            <label
              class="radio-container__input-label font-orange-theme"
              for="font-family"
              >Orange</label
            >
          </div>
          <div class="radio-container__theme-input-container">
            <input
              class="radio-container__input"
              type="radio"
              name="theme-color"
              value="#df3131"
              v-model="newThemeValue"
            />
            <label
              class="radio-container__input-label font-red-theme"
              for="font-family"
              >Red</label
            >
          </div>
        </div>
      </div>
      <div class="radio-container">
        <div class="radio-container__settings-title">
          Font
        </div>
        <div class="radio-container__inputs-list">
          <div class="radio-container__font-input-container">
            <input
              class="radio-container__input radio-container__input--poppins"
              type="radio"
              name="font-family"
              value="Poppins"
              v-model="newFontFamily"
            />
            <label
              class="radio-container__input-label font-family-poppins"
              for="font-family"
              >Poppins</label
            >
          </div>
          <div class="radio-container__font-input-container">
            <input
              class="radio-container__input radio-container__input--ubuntu"
              type="radio"
              name="font-family"
              value="Ubuntu"
              v-model="newFontFamily"
            />
            <label
              class="radio-container__input-label font-family-ubuntu"
              for="font-family"
              >Ubuntu</label
            >
          </div>
          <div class="radio-container__font-input-container">
            <input
              class="radio-container__input radio-container__input--roboto"
              type="radio"
              name="font-family"
              value="Roboto"
              v-model="newFontFamily"
            />
            <label
              class="radio-container__input-label font-family-roboto"
              for="font-family"
              >Roboto</label
            >
          </div>
        </div>
      </div>
      <div class="radio-container">
        <div class="radio-container__settings-title">
          Text size
        </div>
        <div class="radio-container__inputs-list">
          <div class="radio-container__font-input-container">
            <input
              class="radio-container__input radio-container__input--small"
              type="radio"
              name="font-size"
              value="14"
              v-model="newFontSize"
            />
            <label
              class="radio-container__input-label font-size-small"
              for="font-size"
              >Small</label
            >
          </div>
          <div class="radio-container__font-input-container">
            <input
              class="radio-container__input radio-container__input--medium"
              type="radio"
              name="font-size"
              value="16"
              v-model="newFontSize"
            />
            <label
              class="radio-container__input-label font-size-medium"
              for="font-size"
              >Medium</label
            >
          </div>
          <div class="radio-container__font-input-container">
            <input
              class="radio-container__input radio-container__input--large"
              type="radio"
              name="font-size"
              value="18"
              v-model="newFontSize"
            />
            <label
              class="radio-container__input-label font-size-large"
              for="font-size"
              >Large</label
            >
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="settings__buttons">
        <the-button look="primary" @click="setPomodoroSettings"
          >save</the-button
        >
        <the-button look="flat" @click="closeModal">
          cancel
        </the-button>
      </div>
    </template>
  </the-modal>
</template>

<script>
import TheModal from "./TheModal.vue";
import TheButton from "@/components/TheButton.vue";

export default {
  components: {
    TheModal,
    TheButton
  },
  emits: ["closeModal"],
  data() {
    return {
      newPomodoroTime: null,
      newShortBreakTime: null,
      newLongBreakTime: null,
      newThemeValue: null,
      newFontFamily: null,
      newFontSize: null
    };
  },
  methods: {
    setPomodoroSettings() {
      const newSettings = {
        newPomodoroTime: this.newPomodoroTime,
        newShortBreakTime: this.newShortBreakTime,
        newLongBreakTime: this.newLongBreakTime,
        newVisualSettings: {
          themeColor: this.newThemeValue,
          font: this.newFontFamily,
          fontSize: this.newFontSize
        }
      };

      const validateSettings = this.validateSettings(newSettings);

      if (!validateSettings) {
        return;
      } else {
        for (const setting in newSettings) {
          const timeInMs = this.getMiliseconds(newSettings[setting]);

          if (typeof newSettings[setting] !== "object") {
            newSettings[setting] = timeInMs;
          }
        }

        this.closeModal();

        return this.$store.commit("setNewSettings", newSettings);
      }
    },
    getMiliseconds(val) {
      return val * 60000;
    },
    closeModal() {
      return this.$emit("closeModal");
    },
    validateSettings({ newPomodoroTime, newShortBreakTime, newLongBreakTime }) {
      const pomodoroNumber = parseInt(newPomodoroTime);
      const shortBreakNumber = parseInt(newShortBreakTime);
      const longBreakNumber = parseInt(newLongBreakTime);

      const smallerThanOne =
        pomodoroNumber < 1 || shortBreakNumber < 1 || longBreakNumber < 1;
      const shortBreakGreaterThanPomodoroAndLongBreak =
        shortBreakNumber > pomodoroNumber || shortBreakNumber > longBreakNumber;

      if (smallerThanOne) {
        return false;
      } else if (shortBreakGreaterThanPomodoroAndLongBreak) {
        return false;
      } else {
        return true;
      }
    },
    setCurrentSettingsIndicators(settings) {
      console.log(settings);

      const { themeColor, font, fontSize } = settings;

      (this.newThemeValue = themeColor),
        (this.newFontFamily = font),
        (this.newFontSize = fontSize);
    }
  },
  computed: {
    pomodoroTime() {
      const ms = this.$store.getters.getCounterTotalTime("pomodoro-counter");
      const msToMins = ms / 60000;
      return msToMins;
    },
    shortBreakTime() {
      const ms = this.$store.getters.getCounterTotalTime("short-break");
      const msToMins = ms / 60000;
      return msToMins;
    },
    longBreakTime() {
      const ms = this.$store.getters.getCounterTotalTime("long-break");
      const msToMins = ms / 60000;
      return msToMins;
    }
  },
  mounted() {
    const currentSettings = this.$store.getters.getVisualSettings;

    this.setCurrentSettingsIndicators(currentSettings);
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_base.scss";

.settings {
  position: relative;

  &__title {
    font-weight: 300;
  }
}

.settings__options {
  font-family: var(--active-font-family);
  height: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;

  &::after {
    content: "min";
    display: block;
    position: absolute;
    top: -40%;
    right: 0;
    font-size: 0.8rem;
    font-family: var(--active-font-family);
    font-weight: lighter;
    color: $base-color;
    transform: rotate(45deg) translate(50%, -50%);
    margin-right: $modal-padding;
  }

  &__label {
    font-size: $settings-input-label-font-size;
    margin-left: $modal-padding;
  }

  &__input {
    width: $settings-input-width;
    border-radius: $base-border-radius;
    padding: 0.3rem;
    border: none;
    background-color: $base-color;
    color: $white;
    text-align: right;
    font-family: var(--active-font-family);
    letter-spacing: 0.2rem;
    transition: 0.2s ease-in-out;
    margin-right: $modal-padding;

    &:hover {
      background-color: lighten($base-color, 10%);
      color: darken($white, 10%);
    }

    &:focus {
      transform: scaleX(1.1);
      outline: none;
    }
  }
}

.radio-container {
  font-family: var(--active-font-family);
  display: flex;
  align-items: center;
  margin: $modal-padding;

  &__settings-title {
    width: 40%;
  }

  &__inputs-list {
    display: flex;
    height: 3rem;
    width: 60%;
    margin-top: 1rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__font-input-container,
  &__theme-input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 2rem;
    height: 100%;
  }

  &__input-label {
    font-size: 0.8rem;
  }

  &__input {
    position: relative;
    cursor: pointer;

    &::after {
      content: "";
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: $base-color;
    }

    &:checked {
      &::before {
        content: "";
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: $white;
        z-index: 1;
      }
    }
  }
}

.settings__buttons {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
