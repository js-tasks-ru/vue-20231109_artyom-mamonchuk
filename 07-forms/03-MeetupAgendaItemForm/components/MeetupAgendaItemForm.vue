<template>
	<fieldset class="agenda-item-form">
		<button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
			<UiIcon icon="trash" />
		</button>

		<UiFormGroup label="Тип">
			<UiDropdown title="Тип" name="type" v-model="localAgendaItem.type" :options="$options.agendaItemTypeOptions" />
		</UiFormGroup>

		<div class="agenda-item-form__row">
			<div class="agenda-item-form__col">
				<UiFormGroup label="Начало">
					<UiInput type="time" placeholder="00:00" name="startsAt" v-model="localAgendaItem.startsAt" />
				</UiFormGroup>
			</div>

			<div class="agenda-item-form__col">
				<UiFormGroup label="Окончание">
					<UiInput type="time" placeholder="00:00" name="endsAt" v-model="localAgendaItem.endsAt" />
				</UiFormGroup>
			</div>
		</div>

		<UiFormGroup :label="labelTitle">
			<UiInput name="title" v-model="localAgendaItem.title" />
		</UiFormGroup>

		<UiFormGroup label="Докладчик" v-if="isFieldVisible.speaker">
			<UiInput name="speaker" v-model="localAgendaItem.speaker" />
		</UiFormGroup>

		<UiFormGroup label="Описание" v-if="isFieldVisible.description">
			<UiInput multiline name="description" v-model="localAgendaItem.description" />
		</UiFormGroup>

		<UiFormGroup label="Язык" v-if="isFieldVisible.language">
			<UiDropdown title="Язык" :options="$options.talkLanguageOptions" name="language"
				v-model="localAgendaItem.language" />
		</UiFormGroup>
	</fieldset>
</template>

<script>
import { klona } from 'klona';

import UiIcon from './UiIcon.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiInput from './UiInput.vue';
import UiDropdown from './UiDropdown.vue';

const agendaItemTypeIcons = {
	registration: 'key',
	opening: 'cal-sm',
	talk: 'tv',
	break: 'clock',
	coffee: 'coffee',
	closing: 'key',
	afterparty: 'cal-sm',
	other: 'cal-sm',
};

const agendaItemDefaultTitles = {
	registration: 'Регистрация',
	opening: 'Открытие',
	break: 'Перерыв',
	coffee: 'Coffee Break',
	closing: 'Закрытие',
	afterparty: 'Afterparty',
	talk: 'Доклад',
	other: 'Другое',
};

const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
	value: type,
	text: title,
	icon: agendaItemTypeIcons[type],
}));

const talkLanguageOptions = [
	{ value: null, text: 'Не указано' },
	{ value: 'RU', text: 'RU' },
	{ value: 'EN', text: 'EN' },
];

export default {
	name: 'MeetupAgendaItemForm',

	agendaItemTypeOptions,
	talkLanguageOptions,

	components: { UiIcon, UiFormGroup, UiInput, UiDropdown },

	data()
	{
		return {
			localAgendaItem: klona(this.agendaItem),
		}
	},

	props: {
		agendaItem: {
			type: Object,
			required: true,
		},
	},

	emits: ['remove', 'update:agendaItem'],

	computed: {
		isFieldVisible()
		{
			const fieldType = this.localAgendaItem.type;

			return {
				speaker: ['talk'].includes(fieldType),
				description: ['talk', 'other'].includes(fieldType),
				language: ['talk'].includes(fieldType),
			};
		},
		labelTitle()
		{
			const fieldType = this.localAgendaItem.type;

			if (fieldType === 'other') {
				return 'Заголовок'
			}
			if (fieldType === 'talk') {
				return 'Тема'
			} else {
				return 'Нестандартный текст (необязательно)';
			}
		}
	},

	methods: {
		getTimeInMinutes(time)
		{
			const [hours, minutes] = time.split(':').map(el => Number(el));
			return hours * 60 + minutes;
		},
		getFormatedTime(time)
		{
			const hours = Math.floor(time / 60) % 24;
			const minutes = time % 60;

			return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
		},
		calculateNewEndsAt(newStartsAtValue, oldStartsAtValue)
		{
			const oldStartsAt = this.getTimeInMinutes(oldStartsAtValue);
			const oldEndsAt = this.getTimeInMinutes(this.localAgendaItem.endsAt);
			const newStartsAt = this.getTimeInMinutes(newStartsAtValue);
			const newEndsAt = newStartsAt + oldEndsAt - oldStartsAt;

			return this.getFormatedTime(newEndsAt);
		}
	},

	watch: {
		'localAgendaItem.startsAt'(newValue, oldValue)
		{
			if (!oldValue) return;
			this.localAgendaItem.endsAt = this.calculateNewEndsAt(newValue, oldValue);
		},
		localAgendaItem: {
			deep: true,
			handler()
			{
				this.$emit('update:agendaItem', klona(this.localAgendaItem));
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.agenda-item-form {
	border: 2px solid var(--blue-light);
	border-radius: 8px;
	position: relative;
	padding: 20px 10% 0 16px;
}

.agenda-item-form__remove-button {
	position: absolute;
	top: 4px;
	right: 0;
	box-shadow: none;
	border: none;
	background-color: transparent;
	outline: none;
	padding: 4px;
	cursor: pointer;
	transition: 0.2s opacity;


	&:hover {
		opacity: 0.6;
	}
}

.agenda-item-form__row {
	display: flex;
	flex-direction: column;
}

.agenda-item-form__col {
	&+.agenda-item-form__col {
		margin-top: 16px;
	}

	&:first-child {
		margin-left: 0;
	}
}

@media all and (min-width: 992px) {
	.agenda-item-form {
		padding: 28px 25% 4px 24px;
	}

	.agenda-item-form__remove-button {
		top: 20px;
		right: 20px;
	}

	.agenda-item-form__row {
		flex-direction: row;
		justify-content: space-between;
		margin: 0 -12px;
	}

	.agenda-item-form__col {
		flex: 1 1 auto;
		padding: 0 12px;

		&+.agenda-item-form__col {
			margin-top: 0;
		}

		&:first-child {
			margin-left: 0;
		}
	}
}
</style>
