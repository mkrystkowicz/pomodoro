import { createStore } from "vuex";

export default createStore({
  state: {
    counters: [
      {
        counterType: "pomodoro-counter",
        totalTime: 1500000,
        timeLeft: 1500000,
        isRunning: false
      },
      {
        counterType: "short-break",
        totalTime: 300000,
        timeLeft: 300000,
        isRunning: false
      },
      {
        counterType: "long-break",
        totalTime: 1800000,
        timeLeft: 1800000,
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
    },
    setNewSettings(
      state,
      { newPomodoroTime, newShortBreakTime, newLongBreakTime }
    ) {
      const counters = state.counters;

      counters.forEach(counter => {
        const counterType = counter.counterType;

        if (counterType === "pomodoro-counter") {
          counter.totalTime = newPomodoroTime;
          counter.timeLeft = newPomodoroTime;
          counter.isRunning = false;
        } else if (counterType === "short-break") {
          counter.totalTime = newShortBreakTime;
          counter.timeLeft = newShortBreakTime;
          counter.isRunning = false;
        } else if (counterType === "long-break") {
          counter.totalTime = newLongBreakTime;
          counter.timeLeft = newLongBreakTime;
          counter.isRunning = false;
        }
      });
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
