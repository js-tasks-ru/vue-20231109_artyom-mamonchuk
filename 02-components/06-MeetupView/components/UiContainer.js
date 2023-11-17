import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'UiContainer',

  template: `
    <div>
      <slot></slot>
    </div>`,
});
