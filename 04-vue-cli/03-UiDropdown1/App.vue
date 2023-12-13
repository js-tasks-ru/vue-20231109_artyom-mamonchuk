<template>
	<div class="container pt-5 pb-5">
		<div class="alert alert-light mb-4">
			<h2>With icons</h2>
			<p>selectedType = {{ selectedType }}</p>
			<p><button class="btn btn btn-outline-success" @click="selectedType = 'registration'">Set registration</button>
			</p>
			<p><button class="btn btn-outline-danger" @click="updateOptions">Remove last option</button></p>
			<p>
				<UiDropdown v-model="selectedType" :options="agendaItemTypes" title="Событие" ref="ui-dropdown-with-icons" />
			</p>
		</div>

		<div class="alert alert-light mb-4">
			<h2>Without icons</h2>
			<p>selectedLang = {{ selectedLang }}</p>
			<p>
				<UiDropdown v-model="selectedLang" :options="langOptions" title="Язык" ref="ui-dropdown-without-icons" />
			</p>
		</div>

		<div class="alert alert-light">
			<h2>Mixed icons</h2>
			<UiDropdown v-model="selectedMixed" :options="mixedIconsOptions" title="Mixed icons"
				ref="ui-dropdown-mixed-icons" />
		</div>
	</div>
</template>

<script>
import UiDropdown from './components/UiDropdown.vue';

const agendaIconMap = {
	registration: 'key',
	opening: 'cal-sm',
	talk: 'tv',
	break: 'clock',
	coffee: 'coffee',
	closing: 'key',
	afterparty: 'cal-sm',
	other: 'cal-sm',
};

const agendaItemTypes = [
	{
		value: 'registration',
		text: 'Регистрация',
	},
	{
		value: 'opening',
		text: 'Открытие',
	},
	{
		value: 'break',
		text: 'Перерыв',
	},
	{
		value: 'coffee',
		text: 'Coffee Break',
	},
	{
		value: 'closing',
		text: 'Закрытие',
	},
	{
		value: 'afterparty',
		text: 'Afterparty',
	},
	{
		value: 'talk',
		text: 'Доклад',
	},
	{
		value: 'other',
		text: 'Другое',
	},
].map((item) => ({
	...item,
	icon: agendaIconMap[item.value],
}));

export default {
	name: 'App',
	components: { UiDropdown },

	data()
	{
		return {
			agendaItemTypes,

			langOptions: [
				{ value: 'EN', text: 'EN' },
				{ value: 'RU', text: 'RU' },
			],

			mixedIconsOptions: [
				{ value: 'with-icon', text: 'With icon', icon: 'tv' },
				{ value: 'without-icon', text: 'Without icon' },
			],

			selectedLang: 'EN',
			selectedType: undefined,
			selectedMixed: undefined,
		};
	},

	methods: {
		updateOptions()
		{
			this.agendaItemTypes.pop();
		},
	},
};
</script>

<style>
</style>
