import { defineComponent } from '../vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from '../meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',
  agendaItemIcons,
  agendaItemDefaultTitles,
  props: {
    agendaItem: {
      type: Object,
      default() {
        return {
          startsAt: '07:30',
          endsAt: '09:00',
          type: 'registration',
          title: null,
          description: null,
          speaker: null,
          language: null,
        };
      },
    },
  },
  computed: {
    itemIconAlt() {
      return this.$options.agendaItemIcons[this.agendaItem.type] === undefined
        ? ''
        : this.$options.agendaItemIcons[this.agendaItem.type];
    },
    itemIconImg() {
      return `/assets/icons/icon-${this.$options.agendaItemIcons[this.agendaItem.type]}.svg`;
    },
    itemTitle() {
      return this.agendaItem.title === null
        ? this.$options.agendaItemDefaultTitles[this.agendaItem.type]
        : this.agendaItem.title;
    },
  },

  template: `
    <div class="agenda-item mb-4">
      <div class="agenda-item__col">
        <img :src="itemIconImg" class="icon" :alt="itemIconAlt" v-if="$options.agendaItemIcons[this.agendaItem.type]" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ itemTitle }}</h3>
        <p class="agenda-item__talk" v-if="agendaItem.type === 'talk'">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
