<template>
	<div class="container pt-5 pb-5">
		<h1 style="text-align: center" class="mb-3">С изображением</h1>
		<MeetupCover :title="meetupWithImage.title" :image="meetupWithImage.image"></MeetupCover>

		<h1 style="text-align: center" class="mb-3">Без изображения</h1>
		<MeetupCover :title="meetupWithoutImage.title" :image="meetupWithoutImage.image"></MeetupCover>
	</div>
</template>

<script setup>
import MeetupCover from './components/MeetupCover.vue';

const meetupWithImage = {
	title: 'VueConf US',
	image: 'https://course-vue.javascript.ru/api/images/5',
};

const meetupWithoutImage = {
	title: 'Demo meetup',
	image: null,
};

</script>

<style>
</style>
