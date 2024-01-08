<template>
	<slot name="pending" v-if="state === 'pending'"></slot>
	<slot name="fulfilled" :result="response" v-else-if="state === 'fulfilled'"></slot>
	<slot name="rejected" :error="response" v-else></slot>
</template>

<script>
export default {
	name: 'PromiseWrapper',

	data()
	{
		return {
			state: undefined,
			response: undefined
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
				this.state = 'pending';
				this.response = undefined;

				try {
					this.response = await newValue;
					this.state = 'fulfilled';
				} catch (error) {
					this.response = error;
					this.state = 'rejected';
				}
			}
		}
	}
};
</script>
