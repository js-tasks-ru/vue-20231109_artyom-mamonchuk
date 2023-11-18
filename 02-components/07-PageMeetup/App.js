import { defineComponent } from './vendor/vue.esm-browser.js';
import PageMeetup from './components/PageMeetup.js';

export default defineComponent({
  name: 'App',

  components: { PageMeetup },
  data() {
    return {
      meetupId: 1,
    };
  },
  template: `
    <div class="container pt-5 pb-5">
		<select v-model="meetupId" class="form-select mb-5">
			<option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
		</select>
      <page-meetup :meetup-id="meetupId"></page-meetup>
    </div>
  `,
});
