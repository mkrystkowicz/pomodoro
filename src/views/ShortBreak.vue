<template>
  <the-counter
    @counter-clicked="counterClicked"
    :counter-type="counterType"
    :time="pomodoroTimeInMs"
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
      counterType: "short-break"
    };
  },
  methods: {
    counterClicked(counterType) {
      this.$store.dispatch("handleCounter", counterType);
    }
  },
  computed: {
    pomodoroTimeInMs() {
      return this.$store.getters.getPomodoroTime(this.counterType);
    }
  }
};
</script>
