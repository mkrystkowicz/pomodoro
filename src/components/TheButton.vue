<template>
  <button class="btn" :class="look">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    look: {
      type: String,
      value: ["counter", "primary", "flat", "svg-button", "svg-button-colored"]
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_base.scss";

.btn {
  box-sizing: border-box;
  font-family: var(--active-font-family);
  padding: $button-padding;
  border: 0.1rem solid transparent;
  border-radius: $base-border-radius;
  transition: all 0.2s ease-out;
  cursor: pointer;

  &:focus,
  &:active {
    outline: none;
  }
}

.counter {
  color: $base-color;
  background-color: $white;
  font-size: 1.2rem;
  border: none;

  &:hover {
    background-color: $base-color;
    color: $white;
  }
}

.primary {
  font-size: 1rem;
  background-color: var(--active-theme-color);
  color: $white;

  &:hover {
    background-color: $white;
    border: 0.1rem solid var(--active-theme-color);
    color: var(--active-theme-color);
    transform: scale(1.1);
  }
}

.flat {
  font-size: 1rem;
  background-color: $white;
  color: var(--active-theme-color);
  border: 0.1rem solid var(--active-theme-color);

  &:hover {
    background-color: var(--active-theme-color);
    border: 0.1rem solid transparent;
    color: $white;
    transform: scale(1.1);
  }
}

.svg-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0.3rem;
  color: $lighter-gray-color;
  background: none;

  &:hover {
    background: darken($lighter-gray-color, 10%);
    border-radius: 50%;
  }
}

.svg-button-colored {
  @extend .svg-button;
  background: var(--active-theme-color);

  &:hover {
    transform: scale(1.2);
  }
}
</style>
