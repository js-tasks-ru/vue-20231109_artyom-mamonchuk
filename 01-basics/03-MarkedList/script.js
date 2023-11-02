import { createApp } from './vendor/vue.esm-browser.js';

createApp({
  data() {
    return {
      email: '',
      emails: [],
      visible: false,
    };
  },
  mounted() {
    this.getEmails();
  },
  computed: {
    filtered() {
      return this.emails.filter((email) => email.toLowerCase().trim().includes(this.email.toLowerCase().trim()));
    },
  },
  methods: {
    getEmails() {
      fetch('https://jsonplaceholder.typicode.com/comments')
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
    toggleVisible() {
      this.visible = !this.visible;
    },
    func(userEmail) {
      const reg = new RegExp(`${this.email}`, 'gi');

      if (this.email !== '') {
        if (userEmail.search(reg) == -1) {
          return userEmail;
        } else {
          this.visible = true;
          return this.insertMark(userEmail, userEmail.search(reg), this.email.length);
        }
      } else {
        this.visible = false;
        return userEmail;
      }
    },
    insertMark(string, position, len) {
      return (
        string.slice(0, position) +
        '<span>' +
        string.slice(position, position + len) +
        '</span>' +
        string.slice(position + +len)
      );
    },
  },
}).mount('#app');
