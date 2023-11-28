<template>
	<div class="toaster-controls">
		<button type="button" class="btn btn-success" @click="handleSuccessClick">Add Success Message</button>
		<button type="button" class="btn btn-danger" @click="handleErrorClick">Add Error Message</button>
		<button type="button" class="btn btn-info" @click="handleInfoClick">Add Info Message</button>
		<button type="button" class="btn btn-warning" @click="handleWarningClick">Add Warning Message</button>
	</div>
	<TheToaster ref="toaster" />
</template>

<script>
import TheToaster from './components/TheToaster.vue';

export default {
	name: 'App',

	components: { TheToaster },

	methods: {
		handleSuccessClick()
		{
			this.$refs.toaster.success('Success ' + new Date().toLocaleTimeString());
		},
		handleErrorClick()
		{
			this.$refs.toaster.error('Error ' + new Date().toLocaleTimeString());
		},
		handleInfoClick()
		{
			this.$refs.toaster.info('Info ' + new Date().toLocaleTimeString());
		},
		handleWarningClick()
		{
			this.$refs.toaster.warning('Warning ' + new Date().toLocaleTimeString());
		}
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
