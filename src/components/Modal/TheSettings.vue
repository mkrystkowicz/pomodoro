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
            v-model="newLongBreakTime"
          />
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
      newPomodoroTime: 0,
      newShortBreakTime: 0,
      newLongBreakTime: 0
    };
  },
  methods: {
    setPomodoroSettings() {
      const newSettings = {
        newPomodoroTime: this.newPomodoroTime,
        newShortBreakTime: this.newShortBreakTime,
        newLongBreakTime: this.newLongBreakTime
      };

      const validateSettings = this.validateSettings(newSettings);
      console.log(validateSettings);

      if (!validateSettings) {
        return;
      } else {
        for (const setting in newSettings) {
          const timeInMs = this.getMiliseconds(newSettings[setting]);

          newSettings[setting] = timeInMs;
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
      const smallerThanOne =
        newPomodoroTime < 1 || newShortBreakTime < 1 || newLongBreakTime < 1;
      const shortBreakGreaterThanPomodoroAndLongBreak =
        newShortBreakTime > newPomodoroTime ||
        newShortBreakTime > newLongBreakTime;

      if (smallerThanOne) {
        return false;
      } else if (shortBreakGreaterThanPomodoroAndLongBreak) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_base.scss";

.settings {
  position: relative;
}

.settings__options {
  font-family: $base-font-family;
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
    font-weight: bold;
    color: $base-color;
    transform: rotate(45deg) translate(50%, -50%);
  }

  &__label {
    font-size: $settings-input-label-font-size;
  }

  &__input {
    width: $settings-input-width;
    border-radius: $base-border-radius;
    padding: 0.3rem;
    border: none;
    background-color: $base-color;
    color: $white;
    text-align: right;
    font-family: $base-font-family;
    letter-spacing: 0.2rem;
    transition: 0.2s ease-in-out;

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

.settings__buttons {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: $modal-padding;
}
</style>
