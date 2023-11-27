<template>
  <div class="toasts">
    <UiToast
      v-for="(toaster, index) in toasters"
      :key="toaster.id"
      :toster-status="toaster.status"
      :toster-icon="toaster.icon"
      @delete-toast="$emit('delete-toast', index)"
    >
      <span>{{ toaster.text }} {{ toaster.timestamp }}</span>
    </UiToast>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from './UiToast.vue';

export default {
  name: 'TheToaster',

  components: { UiIcon, UiToast },

  emits: ['delete-toast'],

  props: {
    toasters: {
      type: Array,
      required: true,
    },
  },

  methods: {
    deleteToast(index) {
      this.$emit('delete-toast');
    },
  },
};
</script>

<style scoped lang="scss">
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
