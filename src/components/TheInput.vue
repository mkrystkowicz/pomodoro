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
    :class="inputFailed ? 'failed' : ''"
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
  @include flex(auto, space-between);
  position: relative;

  &::after {
    @include colors(transparent, $base-color);
    @include font(0.8rem, lighter, var(--active-font-family));
    content: "min";
    display: block;
    position: absolute;
    top: -40%;
    right: 0;
    transform: rotate(45deg) translate(50%, -50%);
    margin-right: $modal-padding;
  }

  &__label {
    @include font($settings-input-label-font-size);
    margin-left: $modal-padding;
  }

  &__input {
    @include colors($white);
    @include font(auto, auto, var(--active-font-family));
    width: $settings-input-width;
    padding: 0.3rem;
    border: none;
    border-bottom: 2px solid $base-color;
    text-align: right;
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
  @include flex(column, space-around);
  width: 2rem;
  height: 100%;
}

.radio-container__input-label {
  @include font(0.8rem);
}

.radio-container__input {
  position: relative;
  cursor: pointer;
  &::after {
    @include colors($base-color);
    content: "";
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:checked {
    &::before {
      @include colors(var(--active-theme-color));
      content: "";
      display: block;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
  }
}

.stats-input {
  @extend .input-container__input;
  @include colors(transparent, $lighter-gray-color);
  width: 100%;
  border-bottom-color: $lighter-gray-color;
  text-align: left;
  letter-spacing: 0;

  &::placeholder {
    @include colors(transparent, $lighter-gray-color);
  }
}
</style>
