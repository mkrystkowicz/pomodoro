<template>
  <div class="counter">
    <div class="counter__face" @click="handleClick">
      <div
        class="counter__border"
        :style="counterState ? transformBorder : ''"
      ></div>
      <div class="counter__timer">
        <div class="counter__time unselectable">
          {{ convertedTime }}
        </div>
        <span class="counter__action unselectable">{{ indicateState }}</span>
        <the-button
          look="counter"
          class="counter__btn unselectable"
          id="reset-btn"
          >Reset</the-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import TheButton from "@/components/TheButton.vue";

export default {
  components: { TheButton },
  props: ["totalTime", "time", "counterType", "counterState"],
  methods: {
    handleClick(e) {
      if (e.target.id === "reset-btn") {
        this.$store.commit("resetCounter", this.counterType);
      } else {
        this.$emit("counterClicked", this.counterType);
      }
    },
    calculateTimePassed() {
      const totalTime = this.totalTime;
      const timeLeft = this.time;

      return totalTime - timeLeft;
    },
    playAudio() {
      const audio = new Audio(
        "http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3"
      );
      audio.play();
    }
  },
  watch: {
    time() {
      if (this.time === 0) {
        if (document.hidden) this.playAudio();
        else this.playAudio();
      }
    }
  },
  computed: {
    convertedTime() {
      const timeInMs = this.time;
      const minutes = Math.floor(timeInMs / 60000);
      let seconds = ((timeInMs % 60000) / 1000).toFixed(0);

      if (parseInt(seconds) === 60) {
        return minutes + 1 + "'" + "00";
      } else {
        return minutes + "'" + (seconds < 10 ? "0" : "") + seconds;
      }
    },
    indicateState() {
      if (!this.counterState) return "play";
      else return "pause";
    },
    transformBorder() {
      const timePassed = this.calculateTimePassed();
      const totalTime = this.totalTime;
      const timePassedInPercentages = ((timePassed / totalTime) * 100) / 100;
      const degrees = 360 * timePassedInPercentages;
      const reverseDegrees = -degrees;

      const cssRules = `
        transform: 
          translate(-50%,-50%)
          rotate(${reverseDegrees}deg);
      `;

      return cssRules;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_base.scss";

.counter {
  &__face {
    @include colors(darken($base-color, 2%));
    width: $mobile-clock-face;
    height: $mobile-clock-face;
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

    @media (min-width: 2000px) {
      width: $wide-desktop-clock-face;
      height: $wide-desktop-clock-face;
    }
  }

  &__border {
    border: 0.5rem solid var(--active-theme-color);
    position: absolute;
    width: $mobile-clock-border;
    height: $mobile-clock-border;
    top: 50%;
    left: 50%;
    transform-origin: center;
    transform: translate(-50%, -50%) rotate(0deg);
    border-radius: 50rem;
    transition: 0.3s linear;

    &::after {
      @include colors($white);
      content: "";
      width: 0.3rem;
      height: 1.3rem;
      position: absolute;
      border-radius: 5px;
      top: 0;
      left: 50%;
      transform: translate(-50%, -70%);
    }

    @media (min-width: 1200px) {
      width: $desktop-clock-border;
      height: $desktop-clock-border;
    }

    @media (min-width: 2000px) {
      width: $wide-desktop-clock-border;
      height: $wide-desktop-clock-border;
    }
  }

  &__timer {
    @include flex(column, center);
    @include colors(transparent, $white);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__time {
    @include font(3rem, 600, var(--active-font-family), italic);
    text-align: center;
    letter-spacing: 0.2rem;
    user-select: none;
  }

  &__action {
    @include font(1rem, 300, var(--active-font-family), normal);
    text-align: center;
    user-select: none;
  }

  &__btn {
    margin-top: 30px;

    &:hover {
      padding: 8px 30px;
    }
  }
}
</style>
