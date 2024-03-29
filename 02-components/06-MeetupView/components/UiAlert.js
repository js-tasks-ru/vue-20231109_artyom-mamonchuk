import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'UiAlert',

  props: {
    text: {
      type: String,
      default: 'No data...',
    },
  },

  template: `
    <div class="alert alert-danger">
      <slot>{{ text }}</slot>
    </div>`,
});
