import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    counterIncrement() {
      this.counter++;
    },
  },
}).mount('#app');
