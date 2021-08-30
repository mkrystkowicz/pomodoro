<template>
  <the-modal @closeModal="closeModal" class="settings">
    <template #title>
      <h2 class="settings__title">settings</h2>
    </template>
    <template #default>
      <div class="settings__options">
        <p class="settings__saveFailed" v-if="savingSettingsFailed">
          Please enter correct value.
        </p>
        <the-input
          inputType="settingsInput"
          label="Pomodoro time"
          :inputFailed="pomodoroInputFailed"
          name="pomodoro"
          :currentValue="pomodoroTime"
          v-model:newPomodoroTime="newPomodoroTime"
          updateType="update:newPomodoroTime"
        />
        <the-input
          inputType="settingsInput"
          label="Short-break time"
          :inputFailed="shortBreakInputFailed"
          name="short-break"
          :currentValue="shortBreakTime"
          v-model:newShortBreakTime="newShortBreakTime"
          updateType="update:newShortBreakTime"
        />
        <the-input
          inputType="settingsInput"
          label="Long-break time"
          :inputFailed="longBreakInputFailed"
          name="long-break"
          :currentValue="longBreakTime"
          v-model:newLongBreakTime="newLongBreakTime"
          updateType="update:newLongBreakTime"
        />
      </div>
      <div class="radio-container">
        <div class="radio-container__settings-title">
          Theme color
        </div>
        <div class="radio-container__inputs-list">
          <the-input
            inputType="settingsCheckbox"
            label="Emerald"
            name="theme-color"
            checkboxValue="#53b835"
            v-model:newThemeValue="newThemeValue"
            updateType="update:newThemeValue"
            :shouldBeChecked="newThemeValue"
            additionalClass="font-emerald-theme"
          />
          <the-input
            inputType="settingsCheckbox"
            label="Gold"
            name="theme-color"
            checkboxValue="#e0bc44"
            v-model:newThemeValue="newThemeValue"
            updateType="update:newThemeValue"
            :shouldBeChecked="newThemeValue"
            additionalClass="font-gold-theme"
          />
          <the-input
            inputType="settingsCheckbox"
            label="Crimson"
            name="theme-color"
            checkboxValue="#df3131"
            v-model:newThemeValue="newThemeValue"
            updateType="update:newThemeValue"
            :shouldBeChecked="newThemeValue"
            additionalClass="font-crimson-theme"
          />
        </div>
      </div>
      <div class="radio-container">
        <div class="radio-container__settings-title">
          Font
        </div>
        <div class="radio-container__inputs-list">
          <the-input
            inputType="settingsCheckbox"
            label="Poppins"
            name="font-family"
            checkboxValue="Poppins"
            v-model:newFontFamily="newFontFamily"
            updateType="update:newFontFamily"
            :shouldBeChecked="newFontFamily"
            additionalClass="font-family-poppins"
          />
          <the-input
            inputType="settingsCheckbox"
            label="Ubuntu"
            name="font-family"
            checkboxValue="Ubuntu"
            v-model:newFontFamily="newFontFamily"
            updateType="update:newFontFamily"
            :shouldBeChecked="newFontFamily"
            additionalClass="font-family-ubuntu"
          />
          <the-input
            inputType="settingsCheckbox"
            label="Roboto"
            name="font-family"
            checkboxValue="Roboto"
            v-model:newFontFamily="newFontFamily"
            updateType="update:newFontFamily"
            :shouldBeChecked="newFontFamily"
            additionalClass="font-family-roboto"
          />
        </div>
      </div>
      <div class="radio-container">
        <div class="radio-container__settings-title">
          Text size
        </div>
        <div class="radio-container__inputs-list">
          <the-input
            inputType="settingsCheckbox"
            label="Small"
            name="font-size"
            checkboxValue="14"
            v-model:newFontSize="newFontSize"
            updateType="update:newFontSize"
            :shouldBeChecked="newFontSize"
            additionalClass="font-size-small"
          />
          <the-input
            inputType="settingsCheckbox"
            label="Medium"
            name="font-size"
            checkboxValue="16"
            v-model:newFontSize="newFontSize"
            updateType="update:newFontSize"
            :shouldBeChecked="newFontSize"
            additionalClass="font-size-medium"
          />
          <the-input
            inputType="settingsCheckbox"
            label="Large"
            name="font-size"
            checkboxValue="18"
            v-model:newFontSize="newFontSize"
            updateType="update:newFontSize"
            :shouldBeChecked="newFontSize"
            additionalClass="font-size-large"
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
import TheInput from "@/components/TheInput.vue";

export default {
  components: {
    TheModal,
    TheButton,
    TheInput
  },
  emits: ["closeModal"],
  data() {
    return {
      savingSettingsFailed: false,
      pomodoroInputFailed: false,
      shortBreakInputFailed: false,
      longBreakInputFailed: false,
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
        return (this.savingSettingsFailed = true);
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
      this.pomodoroInputFailed = false;
      this.shortBreakInputFailed = false;
      this.longBreakInputFailed = false;

      const pomodoroNumber = parseInt(newPomodoroTime);
      const shortBreakNumber = parseInt(newShortBreakTime);
      const longBreakNumber = parseInt(newLongBreakTime);

      const storagePomodoroTime = this.$store.getters.getCounterTotalTime(
        "pomodoro-counter"
      );
      const storageShortBreakTime = this.$store.getters.getCounterTotalTime(
        "short-break"
      );
      const storageLongBreakTime = this.$store.getters.getCounterTotalTime(
        "long-break"
      );

      const smallerThanOne =
        pomodoroNumber < 1 || shortBreakNumber < 1 || longBreakNumber < 1;
      const pomodoroOrLongBreakTimeSmallerThanShortBreak =
        this.getMiliseconds(pomodoroNumber) <= storageShortBreakTime ||
        this.getMiliseconds(longBreakNumber) <= storageShortBreakTime;
      const shortBreakGreaterThanOrEqualPomodoroAndLongBreak =
        this.getMiliseconds(shortBreakNumber) === storageShortBreakTime ||
        this.getMiliseconds(shortBreakNumber) >= storagePomodoroTime ||
        this.getMiliseconds(shortBreakNumber) >= storageLongBreakTime;

      if (smallerThanOne) {
        if (pomodoroNumber < 1) {
          this.pomodoroInputFailed = true;
        }
        if (shortBreakNumber < 1) {
          this.shortBreakInputFailed = true;
        }
        if (longBreakNumber < 1) {
          this.longBreakInputFailed = true;
        }

        return false;
      } else if (pomodoroOrLongBreakTimeSmallerThanShortBreak) {
        if (this.getMiliseconds(pomodoroNumber) <= storageShortBreakTime) {
          this.pomodoroInputFailed = true;
        }
        if (this.getMiliseconds(longBreakNumber) <= storageShortBreakTime) {
          this.longBreakInputFailed = true;
        }

        return false;
      } else if (shortBreakGreaterThanOrEqualPomodoroAndLongBreak) {
        this.shortBreakInputFailed = true;

        return false;
      } else {
        return true;
      }
    },
    setCurrentSettingsIndicators(settings) {
      const { themeColor, font, fontSize } = settings;

      this.newThemeValue = themeColor;
      this.newFontFamily = font;
      this.newFontSize = fontSize;
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
    @include font(auto, 300);
  }

  &__saveFailed {
    @include colors(transparent, $red-color);
    @include font(0.8rem);
    text-align: center;
    transition: 0.3s ease-out;
  }
}

.settings__options {
  @include flex(column, space-around, space-evenly);
  @include font(auto, auto, var(--active-font-family));
  height: 15rem;
}

.radio-container {
  @include flex;
  @include font(auto, auto, var(--active-font-family));
  margin: $modal-padding;

  &__settings-title {
    width: 40%;
  }

  &__inputs-list {
    @include flex(auto, space-between);
    height: 3rem;
    width: 60%;
    margin-top: 1rem;
  }
}

.settings__buttons {
  @include flex(auto, space-evenly);
  width: 100%;
}
</style>
