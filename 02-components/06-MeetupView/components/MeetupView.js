import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupCover from './MeetupCover.js';
import MeetupDescription from './MeetupDescription.js';
import MeetupInfo from './MeetupInfo.js';
import MeetupAgenda from './MeetupAgenda.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';

export default defineComponent({
  name: 'MeetupView',

  components: {
    MeetupCover,
    MeetupDescription,
    MeetupInfo,
    MeetupAgenda,
    UiAlert,
    UiContainer,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
   <div>
      <meetup-cover :title="meetup.title" :image="meetup.image"></meetup-cover>
      <UiContainer>
      	<div class="meetup">
         	<div class="meetup__content">
            	<h3>Описание</h3>
            	<meetup-description :description="meetup.description"></meetup-description>

            	<h3>Программа</h3>
					<meetup-agenda :agenda="meetup.agenda" v-if="meetup.agenda.length"></meetup-agenda>
            	<UiAlert v-else>Программа пока пуста...</UiAlert>
          	</div>
          	<div class="meetup__aside">
            	<meetup-info
						:organizer="meetup.organizer"
						:place="meetup.place"
						:date="meetup.date">
					</meetup-info>
          	</div>
        </div>
      </UiContainer>
   </div>`,
});
