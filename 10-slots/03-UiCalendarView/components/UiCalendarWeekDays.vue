<template>
  <div class="calendar-view__weekdays">
    <div v-for="(day, index) in days" :key="index">{{ day }}</div>
  </div>
</template>

<script>
const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
export default {
  name: 'MeetupsCalendarWeekDays',

  computed: {
    days() {
      return DAYS;
    },
  },
};
</script>

<style lang="scss" scoped>
.calendar-view__weekdays {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  border: 1px solid var(--grey);
  border-bottom: none;

  div {
    padding: 6px 8px;
    background-color: var(--white);
    color: var(--white);
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    background-color: var(--grey-8);
    border-bottom: 1px solid var(--grey);
    border-left: 1px solid var(--grey);
    text-align: right;
    text-transform: uppercase;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__weekdays {
    grid-template-columns: repeat(7, 1fr);

    div:nth-child(7n + 1) {
      border-left: none;
    }
  }
}
</style>
