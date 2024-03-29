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
      else {
        const currentTask = window.localStorage.getItem("currentTask");

        if (currentTask) {
          const filteredStats = state.stats.filter(
            stat => stat.name === currentTask
          );

          if (counterType === "pomodoro-counter")
            filteredStats[0].pomodoroTime += 200;
          else if (counterType === "short-break")
            filteredStats[0].shortBreakTime += 200;
          else if (counterType === "long-break")
            filteredStats[0].longBreakTime += 200;
        }

        return (counter.timeLeft -= 200);
      }
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
        shortBreakTime: 0,
        longBreakTime: 0
      };

      return state.stats.push(newStat);
    },
    saveStatsInStorage(state) {
      return window.localStorage.setItem(
        "allStats",
        JSON.stringify(state.stats)
      );
    },
    importStatsFromStorage(state) {
      const storageStats = JSON.parse(window.localStorage.getItem("allStats"));

      if (!storageStats) {
        return;
      } else {
        return (state.stats = storageStats);
      }
    },
    deleteStat(state, id) {
      const currentStat = window.localStorage.getItem("currentTask");
      const stat = state.stats.filter(stat => stat.id === id)[0];

      if (currentStat === stat.name) {
        window.localStorage.setItem("currentTask", "");
      }

      const newList = state.stats.filter(stat => stat.id !== id);
      return (state.stats = newList);
    },
    setTimeLeft(state, payload) {
      const { counterType, timeLeft } = payload;
      const counter = state.counters.find(
        counter => counter.counterType === counterType
      );

      return (counter.timeLeft = timeLeft);
    }
  },
  actions: {
    handleCounter({ state, commit }, counterType) {
      const counter = state.counters.find(
        counter => counter.counterType === counterType
      );

      let interval;
      const startedAtTime = new Date().getTime();
      const counterTimeLeft = this.getters.getCounterTimeLeft(counterType);
      const endingTime = startedAtTime + counterTimeLeft;

      if (!counter.isRunning) {
        counter.isRunning = true;
        interval = setInterval(() => {
          if (document.hidden || !document.hasFocus()) {
            const currentTime = new Date().getTime();
            let timeLeft = endingTime - currentTime;
            if (timeLeft <= 0) timeLeft = 0;
            commit("setTimeLeft", { counterType, timeLeft });
          }
          if (!counter.isRunning) clearInterval(interval);
          commit("decrementTime", counterType);
        }, 200);
      } else if (counter.isRunning) {
        counter.isRunning = false;
        clearInterval(interval);
      }
    }
  }
});
