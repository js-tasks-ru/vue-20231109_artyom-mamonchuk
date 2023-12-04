<template>
  <div class="calendar-view__meetup">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendarEvent',

  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.calendar-view__meetup {
  padding: 5px;
  line-height: 1;
  color: var(--white);
  background-color: var(--blue);
  text-align: left;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
}
</style>
