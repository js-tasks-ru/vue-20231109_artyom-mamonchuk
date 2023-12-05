<template>
	<div class="calendar-view__controls">
		<div class="calendar-view__controls-inner">
			<button class="calendar-view__control-left" type="button" aria-label="Previous month"
				@click="selectPrevious"></button>
			<div class="calendar-view__date">{{ selectedMonth }}</div>
			<button class="calendar-view__control-right" type="button" aria-label="Next month" @click="selectNext"></button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MeetupsCalendarControls',

	props: {
		year: {
			type: Number,
			default: () => new Date().getFullYear(),
		},
		month: {
			type: Number,
			default: () => new Date().getMonth() + 1,
		},
	},

	computed: {
		selectedMonth()
		{
			return new Date(this.year, this.month, 0).toLocaleDateString(navigator.language, {
				month: 'long',
				year: 'numeric',
			});
		},
	},

	emits: ['update:year', 'update:month'],

	methods: {
		selectPrevious()
		{
			this.$emit('update:month', (this.month - 1) % 12 || 12);
			if (!(this.month - (1 % 12))) {
				this.$emit('update:year', this.year - 1);
			}
		},
		selectNext()
		{
			this.$emit('update:month', (this.month + 1) % 12 || 12);

			if ((this.month + 1) % 12 === 1) {
				this.$emit('update:year', this.year + 1);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.calendar-view__controls {
	text-align: center;
	font-weight: 700;
	font-size: 24px;
	line-height: 1;
	color: var(--blue);
	background-color: var(--blue-extra);
	padding: 24px;
	display: flex;
	justify-content: center;
}

.calendar-view__controls-inner {
	max-width: 325px;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	text-transform: capitalize;

	button {
		border: none;
		padding: 0;
	}
}

.calendar-view__control-left,
.calendar-view__control-right {
	width: 30px;
	height: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	cursor: pointer;
	transition: 0.3s all;
	background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
	background-size: cover;
	transition: all 0.3s ease-in-out;

	&:hover,
	&:hover {
		opacity: 0.8;
	}
}

.calendar-view__control-right {
	transform: rotate(180deg);
}
</style>
