<template>
  <the-modal @closeModal="$emit('closeModal')" class="info">
    <template #title>
      <h2 class="info__title">pomodoro information</h2>
    </template>
    <template #default>
      <div class="info__content">
        <section class="info__container">
          <h3 class="info__subtitle">About Pomodoro</h3>
          <p class="info__about indent">
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
  position: relative;

  &__content {
    font-family: $base-font-family;
    padding: $modal-padding;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__subtitle {
    font-size: 1.2rem;
    text-align: center;
    margin: 0.8rem 0;
  }

  &__about,
  &__procedure-item {
    text-align: justify;
    font-size: 0.8rem;
    letter-spacing: 0.1rem;
  }

  &__procedure-list {
    display: flex;
    flex-direction: column;
    padding: $modal-padding;
    margin: 0 2rem;
  }

  &__fact {
    font-size: 0.8rem;
    letter-spacing: 0.1rem;
    text-align: center;
  }

  &__button-container {
    width: 100%;
    text-align: center;
  }
}

.indent {
  text-indent: 0.8rem;
}
</style>
