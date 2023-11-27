<template>
  <div class="toast" :class="statusClass">
    <UiIcon class="toast__icon" :icon="tosterIcon" />
    <slot />
    <button class="toast__btn" @click="$emit('delete-toast')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',

  components: { UiIcon },

  emits: ['delete-toast'],

  props: {
    tosterStatus: {
      type: String,
      required: true,
      validator: (status) => ['success', 'error', 'info', 'warning'].includes(status),
    },
    tosterIcon: {
      type: String,
      required: true,
    },
  },
  computed: {
    statusClass() {
      return { [`toast_${this.tosterStatus}`]: this.tosterStatus };
    },
  },
};
</script>

<style scoped lang="scss">
.toast {
  position: relative;
  display: flex;
  column-gap: 10px;
  align-items: center;
  padding: 16px 35px 16px 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;

  &.toast_success {
    color: var(--green);
  }

  &.toast_error {
    color: var(--red);
  }

  &.toast_info {
    color: #0dcaf0;
  }

  &.toast_warning {
    color: #ffc107;
  }

  & + .toast {
    margin-top: 20px;
  }
}

.toast__btn {
  position: absolute;
  top: 50%;
  right: 10px;
  translate: 0 -50%;
  display: flex;
  width: 20px;
  height: 20px;
  padding: 0;
  background-color: transparent;
  border: none;
  color: #dc3545;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
}
</style>
