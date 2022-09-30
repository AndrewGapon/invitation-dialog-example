<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style lang="scss">
.button {
  padding: 11px 23px;
  border-radius: var(--border-radius);
  border: 1px solid var(--button-border-color);
  color: var(--button-text-color);
  background: var(--button-bg-color);
  font-size: 1rem;
  font-weight: 600;
  transition: var(--transition);
  box-shadow: 0 0;

  &:not(:disabled) {
    &:hover {
      box-shadow: var(--box-shadow);
    }

    &:active {
      background: var(--gradient-brown-2);
    }
  }

  &:disabled {
    opacity: 0.56;
    color: var(--button-disabled-text-color);
    border-color: var(--button-disabled-border-color);
    background: var(--button-disabled-bg-color);
  }
}
</style>
