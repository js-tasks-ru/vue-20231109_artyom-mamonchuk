import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupView from './components/MeetupView.js';
import meetups from './api/meetups.js';

export default defineComponent({
  name: 'App',

  components: {
    MeetupView,
  },

  data() {
    return {
      meetups,
      selectedMeetup: 0,
    };
  },

  computed: {
    currentMeetup() {
      return this.meetups[this.selectedMeetup];
    },
  },

  template: `
   <div class="page-meetup container pt-5 pb-5">
  		<h1 class="mb-4 text-center">Выберите meetup</h1>
  		<select v-model="selectedMeetup" class="form-select mb-5">
			<option v-for="(meetup, index) in meetups" :key="meetup.id" :value="index">
				{{ index }}: {{ meetup.title }}
			</option>
		</select>
   	<meetup-view :meetup="currentMeetup"></meetup-view>
   </div>
  `,
});
