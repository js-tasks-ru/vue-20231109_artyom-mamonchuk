<template>
  <UiCalendarView :meetups="meetups">
    <template #default="{ events }">
      <UiCalendarEvent v-for="event in events" :key="event.id" tag="a" :href="`/meetups/${event.id}`">
        {{ event.title }}
      </UiCalendarEvent>
    </template>
  </UiCalendarView>
</template>

<script>
import UiCalendarView from './UiCalendarView.vue';
import UiCalendarEvent from './UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    events() {
      return this.meetups.filter((event) => {
        const eventDate = new Date(event.date);
        const year = eventDate.getFullYear() === this.year;
        const month = eventDate.getMonth() + 1 === this.month;
        return year && month;
      });
    },
    dayEvents() {
      return this.events.filter((e) => new Date(e.date).getDate() === new Date(`${this.date}`).getDate());
    },
  },
};
</script>

<style scoped></style>
