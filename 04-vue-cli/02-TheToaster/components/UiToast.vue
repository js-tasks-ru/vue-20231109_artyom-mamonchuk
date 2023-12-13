<template>
	<div class="toast" :class="toastClass">
		<UiIcon class="toast__icon" :icon="toastIcon" />
		<span>{{ toaster.text }}</span>
		<button class="toast__btn btn btn-close" @click="$emit('deleteToast')">
		</button>
	</div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
	name: 'UiToast',

	components: { UiIcon },

	emits: ['deleteToast'],

	props: {
		toaster: {
			type: Object,
			required: true,
		},
	},
	computed: {
		toastClass()
		{
			return {
				toast_success: this.toaster.status === 'success',
				toast_error: this.toaster.status === 'error',
				toast_warning: this.toaster.status === 'warning',
				toast_info: this.toaster.status === 'info',
			}

		},
		toastIcon()
		{
			switch (this.toaster.status) {
				case 'success':
					return 'check-circle';
				case 'error':
					return 'alert-circle';
				case 'warning':
					return 'trash';
				case 'info':
					return 'chevron-down';
				default:
					return '';
			}
		},
	},
};
</script>

<style scoped lang="scss">
.toast {
	position: relative;
	display: flex;
	column-gap: 10px;
	align-items: center;
	padding: 16px 35px 16px 16px;
	background: #ffffff;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
	border-radius: 4px;
	font-size: 18px;
	line-height: 28px;
	width: auto;

	&.toast_success {
		color: var(--green);
	}

	&.toast_error {
		color: var(--red);
	}

	&.toast_info {
		color: #0dcaf0;
	}

	&.toast_warning {
		color: #ffc107;
	}

	&+.toast {
		margin-top: 20px;
	}
}

.toast__btn {
	position: absolute;
	top: 50%;
	right: 10px;
	translate: 0 -50%;
	display: flex;
	width: 16px;
	height: 16px;
	padding: 0;
	background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23dc3545'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e");
	border: none;
	opacity: 1;
}

.toast__icon {
	margin-right: 12px;
}
</style>
