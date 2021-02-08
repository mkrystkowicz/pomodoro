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
      value: ["counter", "primary", "flat"]
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_base.scss";

.btn {
  box-sizing: border-box;
  font-size: $base-font-size;
  font-family: var(--active-font-family);
  padding: 5px 25px;
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
  border: none;

  &:hover {
    background-color: $base-color;
    color: $white;
  }
}

.primary {
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
</style>
