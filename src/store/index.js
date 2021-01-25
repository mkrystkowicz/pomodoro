import { createStore } from "vuex";

export default createStore({
  state: {
    counters: [
      {
        counterType: "pomodoro-counter",
        amount: 10000,
        isRunning: false
      },
      {
        counterType: "short-break",
        amount: 10000,
        isRunning: false
      },
      {
        counterType: "long-break",
        amount: 10000,
        isRunning: false
      }
    ]
  },
  getters: {
    getCounterTime: state => counterType => {
      const counter = state.counters.find(
        counter => counter.counterType === counterType
      );

      return counter.amount;
    },
    getCounterState: state => counterType => {
      const counter = state.counters.find(
        counter => counter.counterType === counterType
      );

      return counter.isRunning;
    }
  },
  mutations: {
    decrementTime: (state, counterType) => {
      const counter = state.counters.find(
        counter => counter.counterType === counterType
      );
      if (counter.amount === 0) return 0;
      else return (counter.amount -= 200);
    }
  },
  actions: {
    handleCounter({ state, commit }, counterType) {
      const counter = state.counters.find(
        counter => counter.counterType === counterType
      );

      let interval;

      if (!counter.isRunning) {
        counter.isRunning = true;
        interval = setInterval(() => {
          if (!counter.isRunning) clearInterval(interval);
          commit("decrementTime", counterType);
        }, 200);
      } else if (counter.isRunning) {
        counter.isRunning = false;
      }
    }
  }
});
