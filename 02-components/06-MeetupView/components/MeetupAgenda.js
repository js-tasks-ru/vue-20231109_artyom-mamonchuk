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
      required: true,
    },
  },
  template: `
    <ul class="agenda" v-if="agenda.length">
      <li class="agenda__item" v-for="meetup in agenda">
        <meetup-agenda-item :agenda-item="meetup"></meetup-agenda-item>
      </li>
    </ul>`,
});
