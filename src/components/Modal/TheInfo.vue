<template>
  <the-modal @closeModal="$emit('closeModal')" class="info">
    <template #title>
      <h2 class="info__title">pomodoro information</h2>
    </template>
    <template #default>
      <div class="info__content">
        <section class="info__container">
          <h3 class="info__subtitle">About Pomodoro</h3>
          <p class="info__about">
            Pomodoro technique is a method used for time management wrought by
            <span class="bolded">Francesco Cirillo</span> in the 1980s. System
            uses short 25 minutes sections -
            <span class="italic">pomodori</span> - to distribute the work time.
          </p>
        </section>
        <section class="info__container">
          <h3 class="info__subtitle">Pomodoro procedure</h3>
          <ol class="info__procedure-list">
            <li class="info__procedure-item">
              Decide what task has to be done.
            </li>
            <li class="info__procedure-item">
              Set pomodoro counter time frame (usually 25 minutes)
            </li>
            <li class="info__procedure-item">Make hands dirty with a task.</li>
            <li class="info__procedure-item">
              Take a short break (3-5 minutes), when the pomodoro-counter
              countdown stopped - it's one pomodori session
            </li>
            <li class="info__procedure-item">
              After 4 pomodoris take a long break (usually 15-30 minutes)
            </li>
          </ol>
        </section>
        <section class="info__container">
          <h3 class="info__subtitle">Fun fact</h3>
          <p class="info__fact">
            Pomodoro technique's name comes from "kitchen counter" in shape of
            tomato.
          </p>
        </section>
      </div>
    </template>
    <template #footer>
      <div class="info__button-container">
        <the-button
          class="info__close-btn"
          look="primary"
          @click="$emit('closeModal')"
          >close</the-button
        >
      </div>
    </template>
  </the-modal>
</template>

<script>
import TheModal from "@/components/Modal/TheModal.vue";
import TheButton from "@/components/TheButton.vue";

export default {
  components: {
    TheModal,
    TheButton
  },
  emits: ["closeModal"]
};
</script>

<style lang="scss" scoped>
@import "@/scss/_base.scss";

.info {
  &__title {
    @include font(auto, lighter);
  }

  &__content {
    @include font(auto, auto, var(--active-font-family));
    padding: $modal-padding;
  }

  &__subtitle {
    @include font(1.2rem, 300);
    text-align: center;
    margin: 0.8rem 0;
  }

  &__procedure-item {
    @include font(0.8rem);
    text-align: left;
    letter-spacing: 0.1rem;
  }

  &__procedure-list {
    padding: $modal-padding;
    margin: 0 2rem;
  }

  &__about,
  &__fact {
    @include font(0.8rem);
    letter-spacing: 0.1rem;
    text-align: center;
  }

  &__button-container {
    width: 100%;
    text-align: center;
  }
}
</style>
