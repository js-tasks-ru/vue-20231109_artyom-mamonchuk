<template>
	<div>
		<slot name="pending" v-if="pending"></slot>
		<slot name="fulfilled" :result="fulfilled" v-else-if="fulfilled"></slot>
		<slot name="rejected" :error="rejected" v-else></slot>
	</div>
</template>

<script>
export default {
	name: 'PromiseWrapper',

	data()
	{
		return {
			pending: true,
			fulfilled: null,
			rejected: null,
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
				this.pending = true;
				this.fulfilled = null;
				this.rejected = null;

				try {
					this.fulfilled = await newValue;
				} catch (error) {
					this.rejected = error;
				} finally {
					this.pending = false;
				}
			}
		}
	}
};
</script>
