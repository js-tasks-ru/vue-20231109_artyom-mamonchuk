<template>
	<div class="sample container">
		<UiPanes>
			<template #default>
				<div>
					1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum harum id labore repellat sequi. Aliquam at
					consequuntur dolorem doloremque dolorum eum excepturi, incidunt laudantium, molestias quidem reprehenderit
					sunt suscipit ullam.
				</div>
				<UiButton variant="primary">Pane</UiButton>
				<UiInput placeholder="Input" />
				<div>
					<UiIcon icon="search" />
					<UiIcon icon="tv" />
					<UiIcon icon="coffee" />
					<UiIcon icon="key" />
				</div>
			</template>
		</UiPanes>
	</div>
</template>

<script>
import UiPanes from './components/UiPanes.vue';
import UiButton from './components/UiButton.vue';
import UiInput from './components/UiInput.vue';
import UiIcon from './components/UiIcon.vue';

export default {
	name: 'App',

	components: { UiIcon, UiInput, UiButton, UiPanes },
};
</script>

<style>
</style>
