<template>
	<form class="meetup-form" @submit.prevent="submit">
		<div class="meetup-form__content">
			<fieldset class="meetup-form__section">
				<UiFormGroup label="Название">
					<UiInput name="title" v-model="localMeetup.title" />
				</UiFormGroup>
				<UiFormGroup label="Дата">
					<UiInputDate type="date" name="date" v-model="localMeetup.date" />
				</UiFormGroup>
				<UiFormGroup label="Место">
					<UiInput name="place" v-model="localMeetup.place" />
				</UiFormGroup>
				<UiFormGroup label="Описание">
					<UiInput multiline rows="3" name="description" v-model="localMeetup.description" />
				</UiFormGroup>
				<UiFormGroup label="Изображение">
					<UiImageUploader v-model="localMeetup.image" :preview="localMeetup.image" @select="selectImageUploader"
						@remove="localMeetup.image = null" />
				</UiFormGroup>
			</fieldset>

			<h3 class="meetup-form__agenda-title">Программа</h3>
			<MeetupAgendaItemForm v-for="(item, index) in localMeetup.agenda" :key="item.id"
				v-model:agendaItem="localMeetup.agenda[index]" :count="meetupAgendaItemCount" class="meetup-form__agenda-item"
				@update-agenda-item="setAgendaItemField({ index, ...$event })" @remove="removeAgendaItem(index)" />

			<div class="meetup-form__append">
				<button class="meetup-form__append-button" type="button" data-test="addAgendaItem" @click="addAgendaItem">
					+ Добавить этап программы
				</button>
			</div>
		</div>

		<div class="meetup-form__aside">
			<div class="meetup-form__aside-stick">
				<!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
				<UiButton variant="secondary" block class="meetup-form__aside-button" data-test="cancel" @click="cancel">
					Отмена
				</UiButton>
				<UiButton variant="primary" block class="meetup-form__aside-button" data-test="submit" type="submit">
					{{ submitText }}
				</UiButton>
			</div>
		</div>
	</form>
</template>

<script>
import { klona } from 'klona';

import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import UiButton from './UiButton.vue';
import UiFormGroup from './UiFormGroup.vue';
import UiImageUploader from './UiImageUploader.vue';
import UiInput from './UiInput.vue';
import UiInputDate from './UiInputDate.vue';
import { createAgendaItem } from '../meetupService.js';

export default {
	name: 'MeetupForm',

	components: {
		MeetupAgendaItemForm,
		UiButton,
		UiFormGroup,
		UiImageUploader,
		UiInput,
		UiInputDate,
	},

	data()
	{
		return {
			localMeetup: klona(this.meetup),
		}
	},

	computed: {
		meetupAgendaItemCount()
		{
			return this.localMeetup.agenda.length
		}
	},

	props: {
		meetup: {
			type: Object,
			required: true,
		},

		submitText: {
			type: String,
			default: '',
		},
	},

	emits: ['submit', 'cancel'],

	methods: {
		submit()
		{
			this.$emit('submit', klona(this.localMeetup));
		},
		cancel()
		{
			this.$emit('cancel');
		},
		selectImageUploader(file)
		{
			this.localMeetup.image = file?.name;
		},
		addAgendaItem()
		{
			this.localMeetup.agenda.push(createAgendaItem());

			if (this.meetupAgendaItemCount > 1) {
				this.localMeetup.agenda[this.meetupAgendaItemCount - 1]['startsAt'] = this.localMeetup.agenda[this.meetupAgendaItemCount - 2]['endsAt'];
			}
		},
		removeAgendaItem(index)
		{
			this.localMeetup.agenda.splice(index, 1);
		},
		setAgendaItemField({ index, field, value })
		{
			this.localMeetup.agenda[index][field] = value;
		}
	}
};
</script>

<style scoped>
.meetup-form__section {
	border: none;
}

.meetup-form__agenda-title {
	font-weight: 700;
	font-size: 28px;
	line-height: 150%;
	color: var(--body-color);
	margin: 0 0 24px 0;
}

.meetup-form__aside {
	margin: 48px 0;
}

.meetup-form__aside-button {
	margin: 0 0 12px 0;
}

.meetup-form__agenda-item+.meetup-form__agenda-item {
	margin-top: 24px;
}

.meetup-form__append {
	margin-top: 24px;
}

.meetup-form__append-button {
	box-shadow: none;
	border: none;
	background-color: transparent;
	padding: 0;
	outline: none;
	color: var(--blue);
	cursor: pointer;
	font-size: 20px;
	line-height: 28px;
}

.meetup-form__append-button:hover {
	text-decoration: underline;
}

@media all and (min-width: 992px) {
	.meetup-form {
		display: flex;
		flex-direction: row;
	}

	.meetup-form__content {
		flex: 1 0 calc(100% - 320px);
	}

	.meetup-form__aside {
		flex: 1 0 320px;
		max-width: 320px;
		width: 100%;
		padding-left: 137px;
		margin: 0;
	}

	.meetup-form__aside-stick {
		position: sticky;
		top: 32px;
	}
}
</style>
