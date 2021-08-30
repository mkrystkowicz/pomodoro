<template>
  <teleport to="body">
    <div class="background" @click="$emit('closeModal')"></div>
    <div class="modal-container">
      <div class="modal-container__title">
        <slot name="title"></slot>
      </div>
      <div class="modal-container__content hide-scrollbar">
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
  @include flex(column, flex-start);
  @include colors($white, $base-color);
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
  border-radius: $modal-border-radius;
  animation: 0.4s modalAnimation ease-in-out;

  &__title {
    width: 100%;
    text-align: center;
    @include font(auto, auto, var(--active-font-family));
  }

  &__content {
    margin-top: 1rem;
    width: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 85%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding-bottom: 3rem;
  }

  &__footer {
    @include colors($white);
    margin-top: 1rem;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: $modal-padding;
    border-radius: 0 0 $base-border-radius $base-border-radius;
    z-index: 1;

    &::before {
      content: "";
      display: block;
      width: 90%;
      height: 8px;
      position: absolute;
      top: 0;
      left: 50%;
      box-shadow: 0 0 10px 3px $white;
      transform: translateX(-50%);
    }
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

  @media (min-width: 1000px) {
    width: 35vw;
  }

  @media (min-width: 1400px) {
    width: 25vw;
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
