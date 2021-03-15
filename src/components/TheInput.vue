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
    v-if="inputType === 'settingsCheckbox'"
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
</template>

<script>
export default {
  props: {
    inputType: String,
    label: String,
    inputFailed: Boolean,
    name: String,
    currentValue: Number,
    updateType: String,
    checkboxValue: String,
    shouldBeChecked: Boolean,
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

    &.failed {
      box-shadow: $modal-input-failed;
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
</style>
