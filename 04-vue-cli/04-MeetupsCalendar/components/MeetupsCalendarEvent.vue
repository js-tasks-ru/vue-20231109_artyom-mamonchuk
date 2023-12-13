<template>
	<a class="calendar-event" :href="'/meetups/' + id">{{ title }}</a>
</template>

<script>
export default {
	name: 'MeetupsCalendarEvent',

	props: {
		title: {
			type: String,
			required: true,
		},
		id: {
			type: Number,
			required: true
		}
	},
};
</script>

<style scoped lang="scss">
.calendar-event {
	display: block;
	padding: 5px;
	line-height: 1;
	color: var(--white);
	background-color: var(--blue-2);
	text-align: left;
	text-decoration: none;
	transition: all 0.3s ease-in-out;

	&:not(:last-child) {
		margin-bottom: 5px;
	}

	&:hover {
		background-color: var(--blue);
	}
}
</style>
