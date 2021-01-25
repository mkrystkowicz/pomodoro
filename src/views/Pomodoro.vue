<template>
  <the-counter
    @counter-clicked="counterClicked"
    :counter-type="counterType"
    :counter-state="getCounterState"
    :time="counterTimeInMs"
  ></the-counter>
</template>

<script>
import TheCounter from "@/components/TheCounter.vue";

export default {
  components: {
    TheCounter
  },
  data() {
    return {
      counterType: "pomodoro-counter"
    };
  },
  methods: {
    counterClicked(counterType) {
      this.$store.dispatch("handleCounter", counterType);
    }
  },
  computed: {
    counterTimeInMs() {
      return this.$store.getters.getCounterTimeLeft(this.counterType);
    },
    getCounterState() {
      return this.$store.getters.getCounterState(this.counterType);
    }
  }
};
</script>
