import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',
  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  template: `
    <div class="meetup-cover" :style="imgUrl">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
  computed: {
    imgUrl() {
      return this.image && { '--bg-url': `url(${this.image})` };
    },
  },
});
