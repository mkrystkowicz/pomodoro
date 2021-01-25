<template>
  <the-counter
    @counter-clicked="counterClicked"
    :counter-type="counterType"
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
      counterType: "short-break"
    };
  },
  methods: {
    counterClicked(counterType) {
      this.$store.dispatch("handleCounter", counterType);
    }
  },
  computed: {
    counterTimeInMs() {
      return this.$store.getters.getCounterTime(this.counterType);
    }
  }
};
</script>
