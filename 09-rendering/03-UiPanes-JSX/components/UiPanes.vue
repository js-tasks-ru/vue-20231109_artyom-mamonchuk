<script lang="jsx">
import UiButton from './UiButton.vue';

export default {
	name: 'UiPanes',

	data()
	{
		return {
			panes: this.$slots.default?.(),
		};
	},

	render()
	{
		return (
			<div class="panes">
				{
					this.panes.map((pane, index) =>
					(
						<div class="pane">
							<div class="pane__content">
								{pane}
							</div>
							<div class="pane__controls">
								<UiButton
									variant="secondary"
									block
									onClick={() => this.up(index)}
									class={{ 'pane__disabled-button': index === 0 }}>
									Up
								</UiButton>
								<UiButton
									variant="danger"
									block
									onClick={() => this.down(index)}
									class={{ 'pane__disabled-button': index + 1 === this.panes.length }}>
									Down
								</UiButton>
							</div>
						</div>
					))
				}
			</div>
		)
	},

	methods: {

		up(index)
		{
			const currentPane = this.panes[index];
			this.panes[index] = this.panes[index - 1];
			this.panes[index - 1] = currentPane;
		},
		down(index)
		{
			const currentPane = this.panes[index];
			this.panes[index] = this.panes[index + 1];
			this.panes[index + 1] = currentPane;
		},
	},
};
</script>

<style scoped>
.panes {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.pane {
	display: flex;
	flex-direction: row;
	border: 3px solid var(--blue-light);
}

.pane__content {
	border-right: 3px solid var(--blue-light);
	padding: 8px;
	flex: 1 0;
}

.pane__controls {
	display: flex;
	flex-direction: column;
	gap: 8px;
	padding: 8px;
	width: min-content;
}

.pane__disabled-button {
	visibility: hidden;
}
</style>
