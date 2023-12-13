<template>
	<div class="dropdown" :class="{ 'dropdown_opened': isOpened }" ref="dropDown">
		<button type="button" class="dropdown__toggle" :class="{ 'dropdown__toggle_icon': existIcon }"
			@click="toggleVisibilityDropdownMenu">
			<UiIcon v-if="currentOption?.icon" :icon="currentOption.icon" class="dropdown__icon" />
			<span>{{ currentOption?.text || title }}</span>
		</button>

		<transition name="dropdown">
			<div class="dropdown__menu" role="listbox" v-show="isOpened">
				<button class="dropdown__item"
					:class="{ 'dropdown__item_icon': existIcon, 'selected': currentOption?.value === option?.value }"
					role="option" type="button" v-for=" option in options " :key="option.value"
					@click="selectOption(option.value)">
					<UiIcon v-if="option?.icon" :icon="option.icon" class="dropdown__icon" />
					{{ option.text }}
				</button>
			</div>
		</transition>
	</div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
	name: 'UiDropdown',

	components: { UiIcon },

	mounted()
	{
		document.addEventListener('click', this.closeUiDropdown);
	},
	unmounted()
	{
		document.removeEventListener('click', this.closeUiDropdown);
	},

	data()
	{
		return {
			isOpened: false
		}
	},

	emits: ['update:modelValue'],

	props: {
		modelValue: {
			type: String,
			default: ''
		},
		options: {
			type: Array,
			required: true,
		},
		title: {
			type: String,
			required: true
		}
	},
	methods: {
		toggleVisibilityDropdownMenu()
		{
			this.isOpened = !this.isOpened;
		},
		selectOption(optionValue)
		{
			this.isOpened = !this.isOpened;
			this.$emit('update:modelValue', optionValue);
		},
		closeUiDropdown({ target })
		{
			if (!this.$refs.dropDown.contains(target)) {
				this.isOpened = false;
			}
		}
	},
	computed: {
		currentOption()
		{
			const [option] = this.options.filter(option => option.value === this.modelValue);
			return option;
		},
		existIcon()
		{
			return this.options.some(option => Boolean(option.icon));
		}
	}
};
</script>

<style lang="scss" scoped>
.dropdown {
	position: relative;
	display: inline-block;
}

.dropdown__toggle {
	display: inline-block;
	background-color: var(--white);
	background-position: calc(100% - 10px) calc(100% - 10px);
	border: 2px solid var(--blue-light);
	border-radius: 8px;
	position: relative;
	padding: 10px 56px 10px 24px;
	font-weight: 500;
	font-size: 20px;
	line-height: 28px;
	color: initial;
	text-align: center;
	transition-duration: 0.2s;
	transition-property: background-color, fill, color;
	outline: none;
	box-shadow: none;
	cursor: pointer;
	text-decoration: none;

	&:after {
		content: '';
		position: absolute;
		top: 50%;
		right: 16px;
		translate: 0 -50%;
		background: url('@/assets/icons/icon-chevron-down.svg') no-repeat;
		background-size: cover;
		display: block;
		width: 24px;
		height: 24px;
		transition: 0.2s transform;
	}
}


.dropdown__toggle_icon {
	padding-left: 56px;
}

.dropdown_opened {
	.dropdown__toggle {
		border-color: var(--blue);
		border-bottom-color: transparent;
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;

		&:after {
			transform: rotate(180deg);
		}
	}
}

.dropdown__menu {
	position: absolute;
	top: calc(100% - 1px);
	left: 0;
	z-index: 95;
	min-width: 100%;
	border-radius: 0 0 8px 8px;
	border: 2px solid var(--blue);
	border-top: none;
	bottom: auto;
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
	background-color: #fff;
	overflow: hidden;
	transform-origin: top;

}

.dropdown-enter-active,
.dropdown-leave-active {
	opacity: 1;
	visibility: visible;
	transform: scaleY(1);
	transition: all 0.3s cubic-bezier(.86, 0, .07, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
	opacity: 0;
	visibility: hidden;
	transform: scaleY(0);
}

.dropdown__item {
	padding: 8px 16px 8px 24px;
	font-weight: 500;
	font-size: 20px;
	line-height: 28px;
	background-color: var(--white);
	box-shadow: none;
	border: none;
	cursor: pointer;
	text-align: left;
	transition-duration: 0.2s;
	transition-property: background-color, border-color, color;
	outline: none;
	text-decoration: none;

	&:hover,
	&:focus {
		background-color: var(--grey-light);
	}

	&.selected {
		background-color: var(--grey-2);
	}
}

.dropdown__item_icon {
	padding-left: 56px;
	position: relative;
}

.dropdown__item_icon,
.dropdown__toggle_icon {
	.dropdown__icon {
		position: absolute;
		top: 50%;
		left: 16px;
		transform: translate(0, -50%);
	}
}
</style>
