<template>
	<div class="toaster-controls">
		<button type="button" class="btn btn-success" @click="handleClick('success')">Add Success Message</button>
		<button type="button" class="btn btn-danger" @click="handleClick('error')">Add Error Message</button>
		<button type="button" class="btn btn-info" @click="handleClick('info')">Add Info Message</button>
		<button type="button" class="btn btn-warning" @click="handleClick('warning')">Add Warning Message</button>
	</div>
	<TheToaster v-if="toasters.length" :toasters="toasters" @delete-toast="handleDeleteToast" />
</template>

<script>
import TheToaster from './components/TheToaster.vue';

export default {
	name: 'App',

	components: { TheToaster },

	toastersText: [
		{
			status: 'success',
			text: 'Success',
			icon: 'check-circle'
		},
		{
			status: 'error',
			text: 'Error',
			icon: 'alert-circle'
		},
		{
			status: 'info',
			text: 'Info',
			icon: 'chevron-down'
		},
		{
			status: 'warning',
			text: 'Warning',
			icon: 'trash'
		}
	],

	data()
	{
		return {
			toasters: [],
		}
	},

	methods: {
		handleClick(status)
		{
			const toasterFiltered = (this.$options.toastersText.filter(el => el.status === status));
			const [toast] = toasterFiltered;

			const newToaster = {
				id: Date.now(),
				timestamp: new Date().toLocaleTimeString(),
				status: toast.status,
				text: toast.text,
				icon: toast.icon
			}

			this.toasters.push(newToaster);
		},
		handleDeleteToast(index)
		{
			this.toasters.splice(index, 1);

		},
		autoDeleteToast()
		{
			setTimeout(() =>
			{
				this.toasters.shift();
			}, 5000);
		}
	},
	watch: {
		toasters: {
			handler()
			{
				this.autoDeleteToast();
			},
			deep: true
		},
	}
};
</script>

<style scoped lang="scss">
.toaster-controls {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	gap: 10px;
}
</style>
