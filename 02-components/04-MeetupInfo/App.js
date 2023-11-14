import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupInfo from './components/MeetupInfo.js';
import meetups from './api/meetups.js';

export default defineComponent({
  name: 'App',

  components: {
    MeetupInfo,
  },

  data() {
    return {
      title: 'MeetupInfo',
      meetups,
      selectedMeetup: 0,
    };
  },

  template: `
   <div class="container pt-5 pb-5">
  		<h1 class="mb-4">{{ title }}</h1>
      <select v-model="selectedMeetup" class="form-select mb-4">
         <option v-for="(meetup, index) in meetups" :key="meetup.id" :value="index">
            {{ index }}: {{ meetup.title }}
         </option>
      </select>
      <meetup-info
        :organizer="meetups[selectedMeetup].organizer"
        :place="meetups[selectedMeetup].place"
        :date="meetups[selectedMeetup].date"></meetup-info>
   </div>
  `,
});
