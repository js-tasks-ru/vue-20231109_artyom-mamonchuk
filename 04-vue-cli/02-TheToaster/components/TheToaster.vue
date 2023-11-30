<template>
	<div class="toasts">
		<UiToast v-for="(toaster, index) in toasters" :key="toaster.id" :toster-status="toaster.status"
			:toster-icon="toaster.icon" @delete-toast="deleteToast(index)">
			<span>{{ toaster.text }} {{ toaster.timestamp }}</span>
		</UiToast>
	</div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from './UiToast.vue';

export default {
	name: 'TheToaster',

	components: { UiIcon, UiToast },

	toastersText: [
		{
			status: 'success',
			icon: 'check-circle'
		},
		{
			status: 'error',
			icon: 'alert-circle'
		},
		{
			status: 'info',
			icon: 'chevron-down'
		},
		{
			status: 'warning',
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
		success(toastMessage)
		{
			const toasterFiltered = (this.$options.toastersText.filter(el => el.status === 'success'));
			const [toast] = toasterFiltered;

			const newToaster = {
				id: Date.now(),
				timestamp: new Date().toLocaleTimeString(),
				status: toast.status,
				text: toastMessage,
				icon: toast.icon
			}

			this.toasters.push(newToaster);
		},
		error(toastMessage)
		{
			const toasterFiltered = (this.$options.toastersText.filter(el => el.status === 'error'));
			const [toast] = toasterFiltered;

			const newToaster = {
				id: Date.now(),
				timestamp: new Date().toLocaleTimeString(),
				status: toast.status,
				text: toastMessage,
				icon: toast.icon
			}

			this.toasters.push(newToaster);
		},
		info(toastMessage)
		{
			const toasterFiltered = (this.$options.toastersText.filter(el => el.status === 'info'));
			const [toast] = toasterFiltered;

			const newToaster = {
				id: Date.now(),
				timestamp: new Date().toLocaleTimeString(),
				status: toast.status,
				text: toastMessage,
				icon: toast.icon
			}

			this.toasters.push(newToaster);
		},
		warning(toastMessage)
		{
			const toasterFiltered = (this.$options.toastersText.filter(el => el.status === 'warning'));
			const [toast] = toasterFiltered;

			const newToaster = {
				id: Date.now(),
				timestamp: new Date().toLocaleTimeString(),
				status: toast.status,
				text: toastMessage,
				icon: toast.icon
			}

			this.toasters.push(newToaster);
		},
		deleteToast(index)
		{
			this.toasters.splice(index, 1);
		},
		autoDeleteToast()
		{
			const timeout = setTimeout(() =>
			{
				this.toasters.shift();

			}, 5000);

			if (this.toasters.length < 1) {
				clearTimeout(timeout);
			}
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
.toasts {
	position: fixed;
	bottom: 8px;
	right: 8px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	white-space: pre-wrap;
	z-index: 999;
}

@media all and (min-width: 992px) {
	.toasts {
		bottom: 72px;
		right: 112px;
	}
}
</style>
