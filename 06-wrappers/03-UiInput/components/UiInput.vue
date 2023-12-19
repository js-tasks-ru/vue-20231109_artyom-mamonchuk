<!--
	*1*
	<div class="input-group" :class="{
		'input-group_icon': $slots['left-icon'] || $slots['right-icon'],
		'input-group_icon-left': $slots['left-icon'],
		'input-group_icon-right': $slots['right-icon']
	}">
-->

<template>
	<div class="input-group" :class="{
		'input-group_icon': $slots['left-icon'] || $slots['right-icon'],
		'input-group_icon-left': $slots['left-icon'],
		'input-group_icon-right': $slots['right-icon']
	}">
		<div class="input-group__icon" v-if="$slots['left-icon']">
			<slot name="left-icon" class="icon" alt="icon" />
		</div>

		<component :is="tag" :value="modelProxy" @[eventType]="modelProxy = $event.target.value" v-bind="$attrs" ref="input"
			class="form-control" :class="decorClasses">
		</component>

		<div class="input-group__icon" v-if="$slots['right-icon']">
			<slot name="right-icon" class="icon" alt="icon" />
		</div>
	</div>
</template>

<script>
/*
	*1*
	$slots не реактивный
	Не использовать вычисляемые свойства. Значение будет использоваться, как есть.
*/
export default {
	name: 'UiInput',

	inheritAttrs: false,

	props: {
		modelValue: {
			type: String
		},
		small: {
			type: Boolean,
			default: false
		},
		rounded: {
			type: Boolean,
			default: false
		},
		multiline: {
			type: Boolean,
			default: false
		},
		modelModifiers: {
			default: () => ({})
		}
	},
	emits: {
		'update:modelValue': null,
	},
	computed: {
		modelProxy: {
			get()
			{
				return this.modelValue;
			},

			set(value)
			{
				this.$emit('update:modelValue', value);
			},
		},
		tag()
		{
			return this.multiline ? 'textarea' : 'input'
		},
		decorClasses()
		{
			return {
				'form-control_sm': this.small,
				'form-control_rounded': this.rounded
			}
		},
		eventType()
		{
			return this.modelModifiers.lazy ? 'change' : 'input';
		}
	},
	methods: {
		focus()
		{
			this.$refs['input'].focus();
		},
	},
};
</script>

<style lang="scss" scoped>
.form-control {
	padding: 12px 16px;
	height: 52px;
	border-radius: 8px;
	border: 2px solid var(--blue-light);
	font-family: 'Nunito', sans-serif;
	font-weight: 600;
	font-size: 20px;
	line-height: 28px;
	color: var(--body-color);
	transition: 0.2s border-color;
	background-color: var(--white);
	outline: none;
	box-shadow: none;

	&::placeholder {
		font-weight: 400;
		color: var(--blue-2);
	}

	&:focus {
		border-color: var(--blue);
	}

	&.form-control_rounded {
		border-radius: 26px;
	}

	&.form-control_sm.form-control_rounded {
		border-radius: 22px;
	}

	&.form-control_sm {
		padding: 8px 16px;
		height: 44px;
		border-radius: 4px;
	}
}

textarea.form-control {
	width: 100%;
	min-height: 211px;
}

.input-group {
	position: relative;

	.form-control {
		width: 100%;
	}

	&.input-group_icon-left .form-control {
		padding-left: 50px;
	}

	&.input-group_icon-right .form-control {
		padding-right: 50px;
	}

	&.input-group_icon .input-group__icon {
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
	}

	&.input-group_icon.input-group_icon-left .input-group__icon:first-child {
		left: 16px;
	}

	&.input-group_icon.input-group_icon-right .input-group__icon:last-child {
		right: 16px;
	}
}
</style>
