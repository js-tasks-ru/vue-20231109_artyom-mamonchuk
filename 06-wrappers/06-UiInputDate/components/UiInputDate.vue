<template>
	<UiInput :type="type" :step="step" :modelValue="dateValue" @input="setDate">
		<template v-for="slotName in Object.keys($slots)" #[slotName]>
			<slot :name="slotName" />
		</template>
	</UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
	name: 'UiInputDate',

	components: { UiInput },

	props: {
		modelValue: {
			type: Number,
			default: null,
		},
		type: {
			type: String,
			default: 'date',
			validator(value)
			{
				return ['date', 'time', 'datetime-local'].includes(value)
			}
		},
		step: {
			type: [Number, String]
		}
	},

	emits: ['update:modelValue'],

	computed: {
		dateValue()
		{
			if (!this.modelValue) { return '' };

			const currentDate = new Date(this.modelValue).toISOString().slice(0, 19);
			const date = currentDate.slice(0, 10);
			const time = currentDate.slice(11);

			if (this.type === 'date') {
				return date;
			}
			if (this.type === 'time') {
				return time.replace(/(:00)$/, '');
			}
			else {
				return currentDate;
			}
		},
	},
	methods: {
		setDate(e)
		{
			this.$emit('update:modelValue', e.target.valueAsNumber);
		}
	},
};
</script>
