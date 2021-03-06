import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default createStore({
  state: {
    stats: [],
    visualSettings: {
      themeColor: "#e0bc44",
      font: "Poppins",
      fontSize: "16"
    },
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
    },
    getVisualSettings: state => {
      return state.visualSettings;
    },
    getStats: state => {
      return state.stats;
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
      {
        newPomodoroTime,
        newShortBreakTime,
        newLongBreakTime,
        newVisualSettings
      }
    ) {
      const counters = state.counters;
      const currentVisualSettings = state.visualSettings;

      counters.forEach(counter => {
        const counterType = counter.counterType;

        if (counterType === "pomodoro-counter") {
          if (newPomodoroTime) {
            counter.totalTime = newPomodoroTime;
            counter.timeLeft = newPomodoroTime;
            counter.isRunning = false;
          }
        } else if (counterType === "short-break") {
          if (newShortBreakTime) {
            counter.totalTime = newShortBreakTime;
            counter.timeLeft = newShortBreakTime;
            counter.isRunning = false;
          }
        } else if (counterType === "long-break") {
          if (newLongBreakTime) {
            counter.totalTime = newLongBreakTime;
            counter.timeLeft = newLongBreakTime;
            counter.isRunning = false;
          }
        }
      });

      for (let setting in currentVisualSettings) {
        if (currentVisualSettings[setting] !== newVisualSettings[setting]) {
          currentVisualSettings[setting] = newVisualSettings[setting];
        }
      }

      const pomodoroCounter = counters.find(
        obj => obj.counterType === "pomodoro-counter"
      );
      const shortBreakCounter = counters.find(
        obj => obj.counterType === "short-break"
      );
      const longBreakCounter = counters.find(
        obj => obj.counterType === "long-break"
      );

      const settingsBeingSaved = {
        newPomodoroTime: pomodoroCounter.totalTime,
        newShortBreakTime: shortBreakCounter.totalTime,
        newLongBreakTime: longBreakCounter.totalTime,
        newVisualSettings: currentVisualSettings
      };

      window.localStorage.setItem(
        "pomodoroSettings",
        JSON.stringify(settingsBeingSaved)
      );
    },
    addNewStat: (state, statName) => {
      const existingStat = state.stats.find(stat => stat.name === statName);
      if (existingStat || !statName) return;

      const newStat = {
        name: statName,
        id: uuidv4(),
        pomodoroTime: 0,
        shortBreaksTime: 0,
        longBreaksTime: 0,
        totalTime: 0
      };

      return state.stats.push(newStat);
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
