<script setup>
defineProps({
  direction: {
    type: String,
    default: () => 'row',
  },
  alignItems: {
    type: String,
    default: () => 'flex-start',
  },
  justifyContent: {
    type: String,
    default: () => 'flex-start',
  },
})
</script>

<template>
  <div class="row">
    <slot></slot>
  </div>
</template>

<style>
.row {
  display: flex;
  flex-direction: v-bind(direction);
  align-items: v-bind(alignItems);
  justify-content: v-bind(justifyContent);
}
</style>
