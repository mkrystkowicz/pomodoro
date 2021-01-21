import { createStore } from "vuex";

export default createStore({
  state: {
    counters: [
      {
        counterType: "pomodoro-counter",
        amount: 10000,
        paused: false,
        isRunning: false
      },
      {
        counterType: "short-break",
        amount: 10000,
        paused: false,
        isRunning: false
      },
      {
        counterType: "long-break",
        amount: 10000,
        paused: false,
        isRunning: false
      }
    ]
  },
  getters: {
    getPomodoroTime: state => counterType => {
      const counter = state.counters.find(
        counter => counter.counterType === counterType
      );

      return counter.amount;
    }
  },
  mutations: {
    decrementTime: (state, counterType) => {
      const counter = state.counters.find(
        counter => counter.counterType === counterType
      );
      if (counter.amount === 0) return 0;
      else return (counter.amount -= 1000);
    }
  },
  actions: {
    handleCounter({ commit }, payload) {
      commit("decrementTime", payload);
    }
  }
});
