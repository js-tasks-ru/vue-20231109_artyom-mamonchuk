import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      value1: 0,
      value2: 0,
      operator: 'sum',
    };
  },
  computed: {
    sum() {
      switch (this.operator) {
        case 'sum':
          return this.value1 + this.value2;
        case 'subtract':
          return this.value1 - this.value2;
        case 'multiply':
          return this.value1 * this.value2;
        default:
          return this.value1 / this.value2;
      }
    },
  },
}).mount('#app');
