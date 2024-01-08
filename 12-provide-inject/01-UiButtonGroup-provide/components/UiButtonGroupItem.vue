<template>
	<button class="button-group__button" :class="{ 'button-group__button_active': isActive }" type="button"
		:aria-selected="isActive" @click="updateParentModel">
		<slot></slot>
	</button>
</template>

<script>

export default {
	name: 'UiButtonGroupItem',

	props: {
		value: {
			required: true,
		},
	},

	inject: ['model', 'setParentModel'],

	computed: {
		isActive()
		{
			return this.value === this.model;
		}
	},

	methods: {
		updateParentModel()
		{
			this.setParentModel(this.value);
		}
	}
};
</script>

<style lang="scss" scoped>
.button-group__button {
	background-color: var(--white);
	border: 2px solid var(--blue);
	border-left: none;
	height: 44px;
	padding: 0 8px;
	color: var(--blue);
	font-weight: 400;
	font-size: 20px;
	font-family: inherit;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	transition-duration: 0.3s;
	transition-property: background-color, fill;
	box-shadow: none;
	outline: none;
	cursor: pointer;

	&:first-child {
		border-radius: 22px 0 0 22px;
		border-left: 2px solid var(--blue);
		padding-left: 10px;
		padding-right: 6px;
	}

	&:last-child {
		border-radius: 0 22px 22px 0;
		padding-right: 10px;
	}

	&:hover,
	&.button-group__button_active {
		background-color: var(--blue);
		color: var(--white);
	}

	:slotted(svg) {
		fill: var(--blue);
	}

	&:hover :slotted(svg),
	&.button-group__button_active :slotted(svg) {
		fill: var(--white);
	}
}
</style>
