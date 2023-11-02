import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

createApp({
  data() {
    return {
      id: 1,
      meetupTitle: '',
    };
  },
  created() {
    this.fetchMeetupById(this.id);
  },
  methods: {
    fetchMeetupById(meetupId) {
      fetch(`${API_URL}/meetups/${meetupId}`)
        .then((response) => response.json())
        .then((data) => {
          this.meetupTitle = data?.title;
        })
        .catch((error) => {
          console.error(error?.message);
        });
    },
  },
  watch: {
    id(newId, oldId) {
      this.fetchMeetupById(newId);
    },
  },
}).mount('#app');
