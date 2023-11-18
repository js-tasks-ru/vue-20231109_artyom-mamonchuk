import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupView from './MeetupView.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import meetups from '../api/meetups.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  data() {
    return {
      meetups,
      meetup: null,
      downloadMessage: true,
      errorMessage: false,
    };
  },
  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    fetchMeetupById(this.meetupId)
      .then((result) => {
        this.downloadMessage = false;
        this.meetup = result;
      })
      .catch((error) => {
        this.downloadMessage = false;
        this.errorMessage = true;
        console.error(error);
      });
  },
  watch: {
    meetupId(newMeetupId) {
      this.downloadMessage = true;
      this.errorMessage = false;
      this.meetup = null;

      fetchMeetupById(newMeetupId)
        .then((result) => {
          this.downloadMessage = false;
          this.errorMessage = false;
          this.meetup = result;
        })
        .catch((error) => {
          this.downloadMessage = false;
          this.errorMessage = true;
          this.meetup = null;
          console.error(error);
        });
    },
  },
  template: `
   <div class="page-meetup">
		<ui-container v-if="downloadMessage">
      	<ui-alert class="alert alert-info">Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="errorMessage">
      	<UiAlert class="alert alert-danger">error</UiAlert>
      </ui-container>

      <meetup-view :meetup="meetup" v-if="meetup"></meetup-view>
   </div>`,
});
