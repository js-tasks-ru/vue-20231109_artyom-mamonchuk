<script lang="jsx">
export default {
	name: 'UiTabs',

	data()
	{
		return {
			tabs: this.$slots.default?.().filter(tab => tab?.type.name === 'UiTab'),
		}
	},

	props: {
		active: String,
	},

	emits: ['update:active'],

	computed: {
		tabContent()
		{
			return this.tabs.filter(tab => tab.props.name === this.active);
		}
	},

	methods: {
		setActive(tabId)
		{
			this.$emit('update:active', tabId);
		},
	},

	render()
	{
		return (
			<div div class="tabs">
				<div class="tabs__nav" role="tablist">
					{
						this.tabs.map(tab =>
						(
							<a
								role="tab"
								class={['tabs__tab', { 'tabs__tab_active': this.active === tab.props.name }]}
								onClick={() => this.setActive(tab.props.name)}
							>{tab.props.title}</a>
						)
						)
					}
				</div>
				<div class="tabs__content">
					{this.tabContent}
				</div>
			</div>
		);
	},
};

</script>

<style lang="scss" scoped>
.tabs {
	margin: 0;
}

.tabs__nav {
	display: flex;
	flex-direction: row;
	position: relative;

	&:before {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 2px;
		background-color: var(--grey-2);
	}
}

.tabs__tab {
	display: inline-flex;
	padding: 10px 0;
	font-weight: 400;
	font-size: 18px;
	text-decoration: none;
	line-height: 28px;
	color: var(--grey-8);
	border-bottom: 2px solid transparent;
	cursor: pointer;
	margin-right: 18px;
	transition-duration: 0.2s;
	transition-property: border-color, color;
	box-shadow: none;
	background-color: transparent;
	outline: none;
	position: relative;
	z-index: 1;

	&:hover,
	&.tabs__tab_active {
		border-bottom-color: var(--blue);
		color: var(--blue);
	}
}
</style>
