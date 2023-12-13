<template>
	<div class="toasts">
		<UiToast v-for="(toaster, index) in toasters" :key="toaster.id" :toaster="toaster"
			@delete-toast="deleteToast(index)">
		</UiToast>
	</div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from './UiToast.vue';

export default {
	name: 'TheToaster',

	components: { UiIcon, UiToast },

	data()
	{
		return {
			toasters: [],
		}
	},

	methods: {
		success(toastMessage)
		{
			const newToaster = {
				id: Math.floor(Math.random() * 1000),
				status: 'success',
				text: toastMessage,
			}

			this.toasters.push(newToaster);

			this.autoDeleteToast();
		},
		error(toastMessage)
		{
			const newToaster = {
				id: Math.floor(Math.random() * 1000),
				status: 'error',
				text: toastMessage,
			}

			this.toasters.push(newToaster);

			this.autoDeleteToast();
		},
		info(toastMessage)
		{
			const newToaster = {
				id: Math.floor(Math.random() * 1000),
				status: 'info',
				text: toastMessage,
			}

			this.toasters.push(newToaster);

			this.autoDeleteToast();
		},
		warning(toastMessage)
		{
			const newToaster = {
				id: Math.floor(Math.random() * 1000),
				status: 'warning',
				text: toastMessage,
			}

			this.toasters.push(newToaster);

			this.autoDeleteToast();
		},
		deleteToast(index)
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
