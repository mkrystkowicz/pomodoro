import { createStore } from "vuex";

export default createStore({
  state: {
    clocks: [
      {
        clockType: "pomodoro-clock",
        amount: 10000,
        paused: false,
        isRunning: false
      },
      {
        clockType: "short-break",
        amount: 10000,
        paused: false,
        isRunning: false
      },
      {
        clockType: "long-break",
        amount: 10000,
        paused: false,
        isRunning: false
      }
    ]
  },
  getters: {
    getPomodoroTime: state => clockType => {
      const clock = state.clocks.find(clock => clock.clockType === clockType);

      return clock.amount;
    }
  },
  mutations: {
    decrementTime: (state, clockType) => {
      const clock = state.clocks.find(clock => clock.clockType === clockType);
      if (clock.amount === 0) return 0;
      else return (clock.amount -= 1000);
    }
  },
  actions: {
    handleClock({ commit }, payload) {
      commit("decrementTime", payload);
    }
  }
});
