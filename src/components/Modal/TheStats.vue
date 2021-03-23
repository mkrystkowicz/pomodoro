<template>
  <the-modal @closeModal="$emit('closeModal')" class="stats">
    <template #title>
      <h2 class="stats__title">stats information</h2>
    </template>
    <template #default>
      <div class="stats__content">
        <ul class="stats__list">
          <p v-if="!getStats().length" class="stats__list-is-empty">
            There is no stats in memory - please add some.
          </p>
          <li
            class="stats__item"
            :key="stat.name"
            v-for="stat in getStats()"
            v-else
          >
            <details>
              <summary class="stats__item-title">{{ stat.name }}</summary>
              <div class="stats__item-content content">
                <p>Pomodoro: {{ convertTime(stat.pomodoroTime) }}</p>
                <p>
                  Short breaks:
                  {{ convertTime(stat.shortBreakTime) }}
                </p>
                <p>Long breaks: {{ convertTime(stat.longBreakTime) }}</p>
                <p>
                  Total:
                  {{
                    getTotalTime(
                      stat.pomodoroTime,
                      stat.shortBreakTime,
                      stat.longBreakTime
                    )
                  }}
                </p>
                <div class="stats__item-button-container">
                  <the-button
                    class="stats__item-delete-btn"
                    look="svg-button"
                    @click="deleteStat(stat.name, stat.id)"
                    ><DeleteIcon color="#494949"
                  /></the-button>
                </div>
              </div>
            </details>
          </li>
        </ul>
      </div>
    </template>
    <template #footer>
      <div class="stats__button-container">
        <the-button
          class="stats__close-btn"
          look="primary"
          @click="$emit('closeModal')"
          >close</the-button
        >
      </div>
    </template>
  </the-modal>
</template>

<script>
import TheModal from "@/components/Modal/TheModal.vue";
import TheButton from "@/components/TheButton.vue";
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";

export default {
  components: {
    TheModal,
    TheButton,
    DeleteIcon
  },
  methods: {
    getStats() {
      return this.$store.getters.getStats;
    },
    getTotalTime(pomodoroTime, shortBreakTime, longBreakTime) {
      const total = pomodoroTime + shortBreakTime + longBreakTime;
      return this.convertTime(total);
    },
    convertTime(ms) {
      const seconds = Math.floor((ms / 1000) % 60);
      const minutes = Math.floor((ms / (60 * 1000)) % 60);
      const hours = Math.floor((ms / (3600 * 1000)) % 3600);
      return `${hours < 10 ? "0" + hours : hours}h ${
        minutes < 10 ? "0" + minutes : minutes
      }m ${seconds < 10 ? "0" + seconds : seconds}s`;
    },
    deleteStat(name, id) {
      this.$emit("statDeleted", name);
      return this.$store.commit("deleteStat", id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_base.scss";
.stats {
  &__title {
    font-weight: lighter;
  }
  &__content {
    padding: $modal-padding;
    color: $lighter-gray-color;
  }
  &__list {
    list-style-type: none;

    &-is-empty {
      font-family: var(--active-font-family);
      text-align: center;
      font-size: 1rem;
      margin-top: 1rem;
    }
  }
  &__item {
    margin-bottom: 10px;
    background: white;

    &-title {
      padding: 10px 15px;
      transition: 0.4s ease-in;
    }

    &-content {
      padding: 5px 15px;
      background: $white;
      font-size: 0.8rem;
    }

    &-button-container {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
  &__button-container {
    width: 100%;
    text-align: center;
  }
}
</style>