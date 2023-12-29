<template>
	<div class="image-uploader" @click="handleClick">
		<label class="image-uploader__preview" :class="previewLoadingClass" :style="previewLoadingStyle">
			<span class="image-uploader__text">{{ previewText }}</span>
			<input type="file" accept="image/*" class="image-uploader__input" v-bind="$attrs" ref="imageUploaderInput"
				@change="change" />
		</label>
	</div>
</template>

<script>
export default {
	name: 'UiImageUploader',

	inheritAttrs: false,

	data()
	{
		return {
			image: '',
			processing: false,
			imageUploaderInput: null
		}
	},

	props: {
		preview: {
			type: String,
			default: '',
		},
		uploader: {
			type: Function,
			default: null
		}
	},

	emits: ['select', 'upload', 'remove', 'error'],

	created()
	{
		this.image = this.preview;
	},

	computed: {
		state()
		{
			if (this.processing) return 'loading';
			if (this.image) return 'uploaded';
			return 'download';
		},
		previewText()
		{
			if (this.state === 'loading') {
				return 'Загрузка...';
			}
			if (this.state === 'uploaded') {
				return 'Удалить изображение';
			}
			if (this.state === 'download') {
				return 'Загрузить изображение';
			}
			else {
				return '';
			}
		},
		previewLoadingClass()
		{
			return this.state === 'loading' ? ['image-uploader__preview-loading'] : null;
		},
		previewLoadingStyle()
		{
			return { '--bg-url': this.image ? `url('${this.image}')` : null };
		}
	},

	methods: {
		handleClick(e)
		{
			if (this.state === 'download') {
				return;
			};
			if (this.state === 'uploaded') {
				this.remove();
			};
			e.preventDefault();
		},
		async change(e)
		{
			let file = null;
			let response = null;

			if (!e.target.files.length) { return; }
			else {
				file = e.target.files[0];
			}

			this.$emit('select', file);

			if (!this.uploader) {
				this.image = URL.createObjectURL(file);
				return;
			}

			try {
				this.processing = true;
				response = await this.uploader(file);
				this.$emit('upload', response);

			} catch (error) {
				this.$refs.imageUploaderInput.value = '';
				this.$emit('error', error);
			}

			this.image = response?.image;
			this.processing = false;
		},
		remove()
		{
			this.image = '';
			this.$refs.imageUploaderInput.value = ''
			this.$emit('remove');
		}
	}
};
</script>

<style lang="scss" scoped>
.image-uploader__input {
	opacity: 0;
	height: 0;
}

.image-uploader__preview {
	--bg-url: var(--default-cover);
	background-size: cover;
	background-position: center;
	background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
	border: 2px solid var(--blue-light);
	border-radius: 8px;
	transition: 0.2s border-color;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	max-width: 512px;
	height: 228px;

	&:hover {
		border-color: var(--blue);
	}

	&.image-uploader__preview-loading {
		cursor: no-drop;
	}
}

.image-uploader__text {
	color: var(--white);
	font-family: 'Nunito', sans-serif;
	font-weight: 600;
	font-size: 20px;
	line-height: 28px;
}
</style>
