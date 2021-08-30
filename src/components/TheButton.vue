<template>
  <button class="btn" :class="look" :aria-label="ariaLabel">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    look: {
      type: String,
      value: ["counter", "primary", "flat", "svg-button", "svg-button-colored"]
    },
    ariaLabel: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_base.scss";

.btn {
  @include font(auto, auto, var(--active-font-family));
  box-sizing: border-box;
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
  @include colors($white, $base-color);
  @include font(1.2rem);
  border: none;

  &:hover {
    @include colors($base-color, $white);
  }
}

.primary {
  @include font(1rem);
  @include colors(var(--active-theme-color), $white);

  &:hover {
    @include colors($white, var(--active-theme-color));
    border: 0.1rem solid var(--active-theme-color);
    transform: scale(1.1);
  }
}

.flat {
  @include colors($white, var(--active-theme-color));
  @include font(1rem);
  border: 0.1rem solid var(--active-theme-color);

  &:hover {
    @include colors(var(--active-theme-color), $white);
    border: 0.1rem solid transparent;
    transform: scale(1.1);
  }
}

.svg-button {
  @include flex;
  @include colors(transparent, $lighter-gray-color);
  width: 2rem;
  height: 2rem;
  padding: 0.3rem;
  background: none;

  &:hover {
    @include colors(darken($lighter-gray-color, 15%));
    border-radius: 50%;
  }
}

.svg-button-colored {
  @extend .svg-button;
  @include colors(var(--active-theme-color));

  &:hover {
    transform: scale(1.2);
  }
}
</style>
