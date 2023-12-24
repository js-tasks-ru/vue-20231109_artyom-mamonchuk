<template>
	<div id="app" class="pt-5 pb-5 container">
		<p>
			<CounterButton class="btn btn-primary" v-model:count="count" /> - count = {{ count }}
		</p>
		<p>
			<CounterButton class="btn btn-primary" v-model:count="count" /> - независимый счётчик
		</p>
	</div>
</template>

<script>
import CounterButton from './components/CounterButton.vue';

export default {
	name: 'App',

	components: { CounterButton },

	data()
	{
		return {
			count: 1,
		};
	},
};
</script>

<style>
@import '@/assets/styles/_container.css';
</style>
