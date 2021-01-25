<template>
  <div class="counter">
    <div class="counter__face" @click="handleClick">
      <div class="counter__border"></div>
      <div class="counter__timer">
        <div class="counter__time uselectable">{{ convertedTime }}</div>
        <span class="counter__action uselectable">{{ indicateState }}</span>
        <button class="counter__btn uselectable" id="reset-btn">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["time", "counterType", "counterState"],
  methods: {
    handleClick(e) {
      if (e.target.id === "reset-btn") {
        this.$store.commit("resetCounter", this.counterType);
      } else {
        this.$emit("counterClicked", this.counterType);
      }
    },
    resetCounter() {}
  },
  computed: {
    convertedTime() {
      const timeInMs = this.time;
      const minutes = Math.floor(timeInMs / 60000);
      const seconds = ((timeInMs % 60000) / 1000).toFixed(0);

      return minutes + "'" + (seconds < 10 ? "0" : "") + seconds;
    },
    indicateState() {
      if (!this.counterState) return "play";
      else return "pause";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_base.scss";

.counter {
  display: flex;
  height: 70vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__face {
    width: $mobile-clock-face;
    height: $mobile-clock-face;
    background-color: darken($base-color, 2%);
    border-radius: 150%;
    position: relative;
    box-shadow: $base-box-shadow;
    transition: 0.3s ease-out;
    cursor: pointer;

    &:hover {
      box-shadow: $hover-box-shadow;
    }

    @media (min-width: 1200px) {
      width: $desktop-clock-face;
      height: $desktop-clock-face;
    }
  }

  &__border {
    border: 0.5rem solid $sec-color;
    position: absolute;
    width: $mobile-clock-border;
    height: $mobile-clock-border;
    top: 50%;
    left: 50%;
    transform-origin: center;
    transform: translate(-50%, -50%);
    border-radius: 50rem;

    &::after {
      content: "";
      width: 0.3rem;
      height: 1.3rem;
      // background-color: darken($base-color, 2%);
      background-color: white;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -70%);
    }

    @media (min-width: 1200px) {
      width: $desktop-clock-border;
      height: $desktop-clock-border;
    }
  }

  &__timer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $white;
  }

  &__time {
    font-size: 3rem;
    text-align: center;
    font-weight: 600;
    font-style: italic;
    letter-spacing: 0.2rem;
    user-select: none;
  }

  &__action {
    font-size: 1rem;
    font-weight: lighter;
    text-align: center;
    font-weight: 300;
    font-style: normal;
    user-select: none;
  }

  &__btn {
    font-size: $base-font-size;
    font-family: $base-font-family;
    margin-top: 30px;
    padding: 5px 25px;
    color: $base-color;
    background-color: $white;
    border-radius: $base-border-radius;
    border: none;
    transition: all 0.2s ease-out;
    cursor: pointer;

    &:hover {
      background-color: $base-color;
      color: $white;
      padding: 8px 30px;
    }
  }
}
</style>
