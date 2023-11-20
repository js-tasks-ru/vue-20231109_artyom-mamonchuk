<template>
	<div class="mb-5 meetup-cover" :class="{ 'meetup-cover--image': image }">
		<h1 class="meetup-cover__title">{{ title }}</h1>
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	title: {
		type: String,
		default: 'Demo meetup',
	},
	image: {
		type: String,
	}
});

const imgUrl = computed(() => props.image && `url(${props.image})`)

</script>

<style scoped>
.meetup-cover {
	background-size: cover;
	background-position: center;
	background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--default-cover);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 410px;
}

.meetup-cover--image {
	background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
		v-bind(imgUrl);
}

.meetup-cover__title {
	color: var(--white);
	font-family: Roboto, sans-serif;
	font-weight: 700;
	font-size: 36px;
	line-height: 48px;
	padding: 0 16px;
	text-align: center;
}

@media all and (min-width: 992px) {
	.meetup-cover__title {
		font-size: 72px;
		line-height: 84px;
	}
}
</style>
