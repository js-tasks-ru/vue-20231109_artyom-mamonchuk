<template>
	<div class="calendar-view">
		<MeetupsCalendarControls v-model:year="year" v-model:month="month" />
		<MeetupsCalendarWeekDays />
		<div class="calendar-view__grid">
			<MeetupsCalendarCeil v-for="day in days" :key="day.id" :day="day" :is-today="today === day.date" :events="events"
				:date="day.date" />
		</div>
	</div>
</template>

<script>
import MeetupsCalendarControls from './MeetupsCalendarControls.vue';
import MeetupsCalendarWeekDays from './MeetupsCalendarWeekDays.vue';
import MeetupsCalendarCeil from './MeetupsCalendarCeil.vue';

export default {
	name: 'MeetupsCalendar',

	components: {
		MeetupsCalendarControls,
		MeetupsCalendarWeekDays,
		MeetupsCalendarCeil,
	},

	props: {
		meetups: {
			type: Array,
			required: true,
		},
	},

	data()
	{
		return {
			selectedDate: new Date(),
			month: new Date().getMonth() + 1,
			year: new Date().getFullYear(),
		};
	},
	methods: {
		// Проверить, какой день недели является первым днем в выбранном месяце
		getWeekday(date)
		{
			return new Date(date).getDay();
		},
	},

	computed: {
		today()
		{
			return `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
		},

		// Количество дней в текущем месяце
		numberOfDaysInMonth()
		{
			return new Date(this.year, this.month, 0).getDate();
		},

		// Дни текущего месяца
		currentMonthDays()
		{
			return [...Array(this.numberOfDaysInMonth)].map((day, index) =>
			{
				return {
					id: Math.floor(Math.random() * 100000),
					date: `${this.year}-${this.month}-${index + 1}`,
					isCurrentMonth: true,
				};
			});
		},

		/*
			  Нужно проверить, какой день был последним понедельником в предыдущем месяце.
			  Это значение нам нужно для того, чтобы знать, сколько дней из предыдущего месяца должно быть видно в представлении текущего месяца.
			  Можем получить это значение, вычитая значение дня недели из первого дня текущего месяца.
			  Далее создаем массив объектов дней, начиная с последнего понедельника предыдущего месяца и заканчивая концом этого месяца.
		  */
		previousMonthDays()
		{
			// Первый день в выбранном месяце
			const firstDayOfTheMonthWeekday = this.getWeekday(this.currentMonthDays[0].date);

			// Количество дней с предыдущего месяца в текущем месяце
			const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6;

			const currentDateObj = new Date(this.currentMonthDays[0].date);

			// Последний понедельник предыдущего месяца
			const previousMonthLastMondayDayOfMonth = new Date(
				currentDateObj.setDate(currentDateObj.getDate() - ((currentDateObj.getDay() + 6) % 7)),
			);

			return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) =>
			{
				return {
					id: Math.floor(Math.random() * 100000),
					date: `${previousMonthLastMondayDayOfMonth.getFullYear()}-${previousMonthLastMondayDayOfMonth.getMonth() + 1
						}-${previousMonthLastMondayDayOfMonth.getDate() + index}`,
					isCurrentMonth: false,
				};
			});
		},

		nextMonthDays()
		{
			// Количество дней со следующего месяца в текущем месяце
			const lastDayOfTheMonthWeekday = this.getWeekday(`${this.year}-${this.month}-${this.currentMonthDays.length}`);

			const currentDateObj = new Date(this.currentMonthDays[0].date);
			const nextMonth = currentDateObj.getMonth() + 1 < this.month ? currentDateObj.getMonth() + 2 : 1;
			const nextYear = nextMonth <= this.month ? currentDateObj.getFullYear() : currentDateObj.getFullYear() + 1;

			const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
				? 7 - lastDayOfTheMonthWeekday
				: lastDayOfTheMonthWeekday;

			return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) =>
			{
				return {
					id: Math.floor(Math.random() * 100000),
					date: `${nextYear}-${nextMonth}-${index + 1}`,
					isCurrentMonth: false,
				};
			});
		},

		days()
		{
			return [...this.previousMonthDays, ...this.currentMonthDays, ...this.nextMonthDays];
		},

		events()
		{
			return this.meetups.filter((event) =>
			{
				const eventDate = new Date(event.date);
				const year = eventDate.getFullYear() === this.year;
				const month = eventDate.getMonth() + 1 === this.month;
				return year && month;
			});
		},
	},
};
</script>

<style scoped>
.calendar-view__grid {
	display: grid;
	grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
	border: 1px solid var(--grey);
	border-bottom: none;
}

@media all and (min-width: 767px) {
	.calendar-view__grid {
		grid-template-columns: repeat(7, 1fr);
	}
}

.calendar-event {
	--max-lines: 2;
	--line-height: 16px;

	display: block;
	text-align: left;
	text-decoration: none;
	text-overflow: ellipsis;
	overflow: hidden;
	font-size: 14px;
	font-weight: 600;
	line-height: var(--line-height);
	color: var(--white);
	padding: 4px 6px;
	border-radius: 2px;
	background-color: var(--blue);
	margin-top: 4px;
}

@media all and (min-width: 767px) {
	.calendar-event {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		max-height: calc(var(--max-lines) * var(--line-height) + 6px);
	}
}
</style>
