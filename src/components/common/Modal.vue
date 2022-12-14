<script>
export default {
  inheritAttrs: false,
}
</script>
<script setup>
import { watch } from 'vue'
import IconClose from '@/components/icons/IconClose.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: () => false,
  },
})
const emit = defineEmits(['close'])

watch(
  () => props.show,
  (value) => {
    document.body.classList.toggle('no-scroll', value)
  },
)

const triggerClose = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="#modals-container">
    <Transition>
      <div v-if="show" class="modal-overlay">
        <div v-bind="$attrs" class="modal" v-outside-click="triggerClose">
          <button class="modal__close-button" @click="triggerClose">
            <IconClose />
          </button>
          <div v-if="$slots.header" class="modal__header">
            <slot name="header" :triggerClose="triggerClose"></slot>
          </div>
          <div v-if="$slots.default" class="modal__body">
            <slot :triggerClose="triggerClose"></slot>
          </div>
          <div v-if="$slots.footer" class="modal__footer">
            <slot name="footer" :triggerClose="triggerClose"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
@import 'src/assets/styles/variables';
@import 'src/assets/styles/mixins';

$outer-padding: 24px;

.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background: var(--color-overlay);
}

.modal {
  position: relative;
  background: var(--color-content-bg-1);
  border-radius: var(--border-radius);
  width: 598px;
  max-height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;

  &__close-button {
    display: flex;
    position: absolute;
    top: $outer-padding + 4px;
    right: $outer-padding;

    &:hover {
      color: var(--color-text-active);
    }
  }

  &__header {
    padding: $outer-padding;
    border-bottom: 1px solid var(--color-separator);
  }

  &__body {
    @include custom-scroll(4px, $color-scroll-thumb, $color-scroll-track, 16px);

    padding: 16px 14px 16px $outer-padding;
    margin-right: 6px;

    &:empty {
      display: none;
    }
  }

  &__footer {
    padding: $outer-padding;
    border-top: 1px solid var(--color-separator);
  }
}
</style>
