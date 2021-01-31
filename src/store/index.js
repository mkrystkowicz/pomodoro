import { createStore } from "vuex";

export default createStore({
  state: {
    counters: [
      {
        counterType: "pomodoro-counter",
        totalTime: 60000,
        timeLeft: 60000,
        isRunning: false
      },
      {
        counterType: "short-break",
        totalTime: 10000,
        timeLeft: 10000,
        isRunning: false
      },
      {
        counterType: "long-break",
        totalTime: 10000,
        timeLeft: 10000,
        isRunning: false
      }
    ]
  },
  getters: {
    getCounterTotalTime: state => counterType => {
      const counter = state.counters.find(
        counter => counter.counterType === counterType
      );

      if (counter.totalTime === 0) {
        return 0;
      } else {
        return counter.totalTime;
      }
    },
    getCounterTimeLeft: state => counterType => {
      const counter = state.counters.find(
        counter => counter.counterType === counterType
      );

      return counter.timeLeft;
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
      if (counter.timeLeft === 0) return 0;
      else return (counter.timeLeft -= 200);
    },
    resetCounter: (state, counterType) => {
      const counter = state.counters.find(
        counter => counter.counterType === counterType
      );

      counter.timeLeft = counter.totalTime;
      counter.isRunning = false;
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
