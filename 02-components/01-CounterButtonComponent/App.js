import { defineComponent } from './vendor/vue.esm-browser.js';
import CounterButton from './CounterButton.js';

export default defineComponent({
  name: 'App',

  components: {
    CounterButton,
  },

  data() {
    return {
      title: 'Компонент CounterButton',
      count: 0,
    };
  },
  template: `
    <div class="sample container pt-3 pb-3">
  		<h1>{{ title }}</h1>
      <p>count = {{ count }}</p>
      <p>
        <counter-button v-model:count="count"></counter-button>
      </p>
      <p>
       <counter-button v-model:count="count"></counter-button>
      </p>
      <p>
       <counter-button v-model:count="count"></counter-button>
      </p>
    </div>
  `,
});
