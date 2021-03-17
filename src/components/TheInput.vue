<template>
  <div class="input-container" v-if="inputType === 'settingsInput'">
    <label class="input-container__label" :for="name">{{ label }}</label>
    <input
      class="input-container__input"
      :class="inputFailed ? 'failed' : ''"
      type="number"
      :name="name"
      :placeholder="currentValue"
      v-model="inputValue"
      @input="$emit(updateType, inputValue)"
    />
  </div>
  <div
    class="radio-container__theme-input-container"
    v-else-if="inputType === 'settingsCheckbox'"
  >
    <input
      class="radio-container__input"
      type="radio"
      :name="name"
      :value="checkboxValue"
      v-model="inputValue"
      @click="$emit(updateType, checkboxValue)"
      :checked="shouldBeChecked === checkboxValue ? true : false"
    />
    <label
      class="radio-container__input-label"
      :class="additionalClass"
      for="font-family"
      >{{ label }}</label
    >
  </div>
  <input
    v-else
    class="stats-input"
    type="text"
    :placeholder="currentValue"
    v-model="inputValue"
    @input="$emit(updateType, inputValue)"
    @focus="$emit('statsInputFocused', true)"
  />
</template>

<script>
export default {
  props: {
    inputType: String,
    label: String,
    inputFailed: Boolean,
    name: String,
    currentValue: [Number, String],
    updateType: String,
    checkboxValue: String,
    shouldBeChecked: String,
    additionalClass: String
  },
  data() {
    return {
      inputValue: null
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_base.scss";

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
    padding: 0.3rem;
    border: none;
    border-bottom: 2px solid $base-color;
    color: $base-color;
    text-align: right;
    font-family: var(--active-font-family);
    letter-spacing: 0.2rem;
    transition: all 0.2s ease-in-out;
    margin-right: $modal-padding;
    border-radius: 0;

    &:focus {
      transform: scaleX(1.1);
      outline: none;
    }

    &::placeholder {
      color: lighten($base-color, 60%);
    }

    &.failed {
      border-bottom: 2px solid $red-color;
      color: $red-color;
    }
  }
}

.radio-container__font-input-container,
.radio-container__theme-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 2rem;
  height: 100%;
}

.radio-container__input-label {
  font-size: 0.8rem;
}

.radio-container__input {
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
      background: var(--active-theme-color);
      z-index: 1;
    }
  }
}

.stats-input {
  @extend .input-container__input;

  width: 100%;
  background: transparent;
  border-bottom-color: $lighter-gray-color;
  color: $lighter-gray-color;
  text-align: left;
  letter-spacing: 0;

  &::placeholder {
    color: $lighter-gray-color;
  }
}
</style>
