import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:count'],
  template: `
	<button type="button" class="btn btn-primary"
		:value="count"
		@click="$emit('update:count', Number($event.target.value) + 1)">{{ count }}
	</button>
  `,
});
