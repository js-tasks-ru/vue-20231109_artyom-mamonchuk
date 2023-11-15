import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      email: '',
      emails: [],
      isMarked: false,
    };
  },
  mounted() {
    this.getEmails();
  },
  computed: {
    highlighted() {
      return this.emails.map((email, index) => {
        return {
          id: index,
          email,
          isMarked: !!this.email && email.toLowerCase().trim().includes(this.email.toLowerCase().trim()),
        };
      });
    },
  },
  methods: {
    getEmails() {
      fetch('https://jsonplaceholder.typicode.com/comments?_limit=10')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.forEach((comment) => {
            if (comment?.email) {
              this.emails.push(comment?.email);
            }
          });
        })
        .catch((error) => {
          console.error(error?.message);
        });
    },
  },
}).mount('#app');
