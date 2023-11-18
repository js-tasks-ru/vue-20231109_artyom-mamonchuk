import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupView from './MeetupView.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
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
      meetup: null,
      downloadMessage: true,
      errorMessage: false,
      errorText: '',
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
        this.errorText = error.message;
      });
  },
  watch: {
    meetupId(newMeetupId) {
      this.downloadMessage = true;
      this.errorMessage = false;
      this.errorText = '';
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
          this.errorText = error.message;
        });
    },
  },
  template: `
   <div class="page-meetup">
		<ui-container v-if="downloadMessage">
      	<ui-alert class="alert alert-info">Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="errorMessage">
      	<UiAlert class="alert alert-danger">{{ errorText }}</UiAlert>
      </ui-container>

      <meetup-view :meetup="meetup" v-if="meetup"></meetup-view>
   </div>`,
});
