<template>
  <teleport to="body">
    <div class="background" @click="$emit('closeModal')"></div>
    <div class="modal-container">
      <div class="modal-container__title">
        <slot name="title"></slot>
      </div>
      <div class="modal-container__content">
        <slot></slot>
      </div>
      <div class="modal-container__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  emits: ["closeModal"]
};
</script>

<style lang="scss" scoped>
@import "@/scss/_base.scss";

.background {
  width: 100vw;
  height: 100vh;
  background: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
}

.modal-container {
  position: fixed;
  padding: $modal-padding;
  align-items: center;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  height: 75vh;
  max-width: 35rem;
  max-height: 50rem;
  background: $white;
  color: $base-color;
  border-radius: $modal-border-radius;
  animation: 0.4s modalAnimation ease-in-out;

  &__title {
    width: 100%;
    text-align: center;
    font-family: $base-font-family;
  }

  &__content {
    margin-top: 1rem;
  }

  @media (min-width: 450px) {
    width: 80vw;
  }

  @media (min-width: 650px) {
    width: 60vw;
  }

  @media (min-width: 850px) {
    width: 40vw;
  }
}

@keyframes modalAnimation {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(80px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) translateY(0);
  }
}
</style>
