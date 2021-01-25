<template>
  <the-counter
    @counter-clicked="counterClicked"
    :counter-type="counterType"
    :counter-state="getCounterState"
    :time="getCounterTimeLeft"
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
    getCounterTimeLeft() {
      return this.$store.getters.getCounterTimeLeft(this.counterType);
    },
    getCounterState() {
      return this.$store.getters.getCounterState(this.counterType);
    }
  }
};
</script>
