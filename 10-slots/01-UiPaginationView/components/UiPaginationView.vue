<template>
	<div class="pagination-container">
		<slot v-for="item in currentPageData" :item="item" :key="item.id"></slot>
	</div>
</template>

<script>
export default {
	name: 'UiPaginationView',

	props: {
		page: {
			type: Number,
			required: true,
			validator: (value) => value > 0,
		},

		perPage: {
			type: Number,
			required: true,
			validator: (value) => value > 0,
		},

		items: {
			type: Array,
			required: true,
		},
	},

	computed: {
		currentPageData()
		{
			const startFrom = (this.page - 1) * this.perPage;
			const endTo = startFrom + this.perPage;

			return this.items.slice(startFrom, endTo);
		}
	}
};
</script>

<style>
</style>
