<template>
	<button @click="updateCount">{{ localCount }}</button>
</template>

<script>
export default {
	name: 'CounterButton',

	data()
	{
		return {
			localCount: this.count
		}
	},

	props: {
		count: {
			type: Number,
			default: 0
		}
	},

	watch: {
		count()
		{
			this.localCount = this.count
		}
	},

	methods: {
		updateCount()
		{
			this.localCount++;
			this.$emit('update:count', this.localCount)
		}
	},

	emits: ['update:count']
};
</script>
