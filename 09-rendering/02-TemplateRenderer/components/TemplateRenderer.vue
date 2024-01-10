<script>
import { h, defineComponent, compile } from 'vue';

export default {
	name: 'TemplateRenderer',

	props: {
		template: {
			type: String,
			required: true,
		},

		bindings: {
			type: Object,
			default: () => ({}),
		},

		components: {
			type: Object,
			default: () => ({}),
		},
	},

	computed: {
		renderFunction()
		{
			return compile(this.template);
		},
		renderComponent()
		{
			return defineComponent({
				components: this.components,
				props: ['bindings'],
				render: this.renderFunction
			})
		}
	},

	render()
	{
		return h(this.renderComponent, { bindings: this.bindings })
	}
};
</script>
