<script setup>
defineProps({
  modelValue: {
    type: String,
  },
  error: {
    type: String,
  },
  showError: {
    type: Boolean,
    default: () => true,
  },
  autofocus: {
    type: Boolean,
  },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input">
    <input
      v-bind="$attrs"
      v-autofocus="autofocus"
      :class="{
        input__field: true,
        invalid: error,
      }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <Transition>
      <div class="input__error" v-if="showError && error">
        {{ error }}
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.input {
  flex-grow: 1;
  width: 100%;

  &__field {
    width: 100%;
    border-radius: var(--border-radius);
    padding: 11px 16px;
    font-size: var(--font-size-base);
    color: var(--color-text-main);
    border: 1px solid var(--input-border-color);
    transition: var(--transition);

    &:focus {
      border-color: var(--input-focus-border-color);
    }

    &.invalid {
      border-color: var(--input-invalid-border-color);
    }

    &::placeholder {
      color: var(--placeholder-color);
    }
  }

  &__error {
    margin-top: 4px;
    color: var(--input-invalid-border-color);
    font-size: var(--font-size-xs);
  }
}
</style>
