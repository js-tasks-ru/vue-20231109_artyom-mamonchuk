import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
  components: {
    MeetupAgendaItem,
  },
  props: {
    agenda: {
      type: Array,
      default() {
        return [
          {
            id: 35,
            startsAt: '07:30',
            endsAt: '09:00',
            type: 'registration',
            title: null,
            description: null,
            speaker: null,
            language: null,
          },
        ];
      },
    },
  },
  template: `
    <ul class="agenda">
      <li class="agenda__item" v-for="meetup in agenda">
        <meetup-agenda-item :agenda-item="meetup"></meetup-agenda-item>
      </li>
    </ul>`,
});
