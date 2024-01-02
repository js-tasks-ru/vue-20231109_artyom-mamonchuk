<template>
	<slot name="pending" v-if="state.pending"></slot>
	<slot name="fulfilled" :result="state.fulfilled" v-else-if="Boolean(state.fulfilled)"></slot>
	<slot name="rejected" :error="state.rejected" v-else></slot>
</template>

<script>
export default {
	name: 'PromiseWrapper',

	data()
	{
		return {
			state: {
				pending: true,
				fulfilled: undefined,
				rejected: undefined
			}
		}
	},

	props: {
		promise: {
			type: Promise,
			required: true,
		},
	},

	watch: {
		promise: {
			immediate: true,
			async handler(newValue)
			{
				this.state.pending = true;
				this.state.fulfilled = undefined;
				this.state.rejected = undefined;

				try {
					this.state.fulfilled = await newValue;
				} catch (error) {
					this.state.rejected = error;
				} finally {
					this.state.pending = false
				}
			}
		}
	}
};
</script>
