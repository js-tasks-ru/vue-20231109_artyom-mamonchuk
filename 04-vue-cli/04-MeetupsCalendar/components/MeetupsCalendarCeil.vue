<template>
	<div class="calendar-view__cell" tabindex="0" :class="decor">
		<div class="calendar-view__cell-day">
			<span>
				{{ label }}
			</span>
		</div>
		<div class="calendar-view__cell-content">
			<MeetupsCalendarEvent v-for="event in dayEvents" :key="event.id" :title="event.title" :id="event.id" />
		</div>
	</div>
</template>

<script>
import MeetupsCalendarEvent from './MeetupsCalendarEvent.vue';
export default {
	name: 'MeetupsCalendarCeil',

	components: {
		MeetupsCalendarEvent,
	},

	props: {
		date: {
			type: String,
			required: true,
		},
		day: {
			type: Object,
			required: true,
		},
		isToday: {
			type: Boolean,
			default: false,
		},
		events: {
			type: Array,
			default: () => [],
		},
	},

	computed: {
		decor()
		{
			return {
				'calendar-view__cell_inactive': !this.day?.isCurrentMonth,
				'calendar-view__cell_today': this.day?.isCurrentMonth && this.isToday,
			};
		},
		label()
		{
			return new Date(this.day?.date).getDate();
		},
		dayEvents()
		{
			return this.events.filter((e) => new Date(e.date).getDate() === new Date(`${this.date}`).getDate());
		},
	},
};
</script>

<style lang="scss" scoped>
.calendar-view__cell {
	position: relative;
	height: auto;
	padding: 5px;
	background-color: var(--white);
	color: var(--grey-8);
	font-weight: 400;
	font-size: 16px;
	line-height: 24px;
	border-bottom: 1px solid var(--grey);
	border-left: 1px solid var(--grey);
	text-align: right;

	span {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: 34px;
		height: 34px;
		padding: 5px;
		border-radius: 50%;
	}

	&.calendar-view__cell_inactive {
		background-color: var(--grey-light);
	}

	&.calendar-view__cell_today {
		span {
			background-color: var(--grey);
		}
	}
}

@media all and (max-width: 767px) {
	.calendar-view__cell:nth-child(5n + 1) {
		border-left: none;
	}
}

@media all and (min-width: 767px) {
	.calendar-view__cell {
		height: 144px;
	}

	.calendar-view__cell:nth-child(7n + 1) {
		border-left: none;
	}
}
</style>
