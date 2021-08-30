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
                <p class="stats__item-text-information">
                  Pomodoro:
                  <span
                    class="stats__item-text-information-amount font-weight-bold"
                    >{{ convertTime(stat.pomodoroTime) }}</span
                  >
                </p>
                <p class="stats__item-text-information">
                  Short breaks:
                  <span
                    class="stats__item-text-information-amount font-weight-bold "
                    >{{ convertTime(stat.shortBreakTime) }}</span
                  >
                </p>
                <p class="stats__item-text-information">
                  Long breaks:
                  <span
                    class="stats__item-text-information-amount font-weight-bold "
                    >{{ convertTime(stat.longBreakTime) }}</span
                  >
                </p>
                <p class="stats__item-text-information">
                  Pomodoris count:
                  <span
                    class="stats__item-text-information-amount font-weight-bold "
                    >{{ getPomodoris(stat.pomodoroTime) }}</span
                  >
                </p>
                <p class="stats__item-text-information">
                  Total time:
                  <span
                    class="stats__item-text-information-amount font-weight-bold "
                    >{{
                      getTotalTime(
                        stat.pomodoroTime,
                        stat.shortBreakTime,
                        stat.longBreakTime
                      )
                    }}</span
                  >
                </p>
                <div class="stats__item-button-container">
                  <the-button
                    class="stats__item-delete-btn"
                    look="svg-button-colored"
                    @click="deleteStat(stat.name, stat.id)"
                    ><DeleteIcon color="#edf2f4"
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
  emits: ["closeModal"],
  methods: {
    getStats() {
      return this.$store.getters.getStats;
    },
    getTotalTime(pomodoroTime, shortBreakTime, longBreakTime) {
      const total = pomodoroTime + shortBreakTime + longBreakTime;
      return this.convertTime(total);
    },
    getPomodoris(pomodoroTimePassed) {
      const totalPomodoroTime = this.$store.getters.getCounterTotalTime(
        "pomodoro-counter"
      );

      const pomodorisCouunter = Math.floor(
        pomodoroTimePassed / totalPomodoroTime
      );

      return `${pomodorisCouunter}`;
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
    @include font(auto, lighter);
  }
  &__content {
    @include colors(transparent, $lighter-gray-color);
    padding: $modal-padding;
  }
  &__list {
    list-style-type: none;

    &-is-empty {
      @include font(1rem, auto, var(--active-font-family));
      text-align: center;
      margin-top: 1rem;
    }
  }
  &__item {
    @include font(auto, auto, var(--active-font-family));
    margin-bottom: 10px;
    background: $white;
    cursor: pointer;

    &-title {
      padding: 10px 15px;
      display: block;
      transition: 0.4s ease-in;
      border-radius: $base-border-radius;
      transition: all 0.2s ease-out;

      &:hover {
        @include colors(lighten($lighter-gray-color, 20%));
      }
    }

    &-content {
      @include colors($white);
      @include font(0.8rem);
      padding: 5px 15px;
    }

    &-text-information {
      line-height: 2.2;
    }

    &-text-information-amount {
      @include font(1rem);
    }

    &-button-container {
      @include flex(auto, flex-end);
      width: 100%;
    }
  }
  &__button-container {
    width: 100%;
    text-align: center;
  }
}
</style>
