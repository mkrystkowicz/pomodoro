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
  font-family: $base-font-family;
  padding: 5px 25px;
  border: 0.1rem solid transparent;
  border-radius: $base-border-radius;
  transition: all 0.2s ease-out;
  cursor: pointer;
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
  background-color: $sec-color;
  color: $white;

  &:hover {
    background-color: $white;
    border: 0.1rem solid $sec-color;
    color: $sec-color;
    transform: scale(1.1);
  }
}

.flat {
  background-color: $white;
  color: $sec-color;
  border: 0.1rem solid $sec-color;

  &:hover {
    background-color: $sec-color;
    border: 0.1rem solid transparent;
    color: $white;
    transform: scale(1.1);
  }
}
</style>
