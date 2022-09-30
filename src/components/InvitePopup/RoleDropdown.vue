<script setup>
import { computed } from 'vue'
import IconTriangle from '@/components/icons/IconTriangle.vue'
import IconCheck from '@/components/icons/IconCheck.vue'

const props = defineProps({
  name: {
    type: String,
  },
  modelValue: {
    type: String,
  },
  roles: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const calculatePosition = (dropdownList, component, { width, top, left }) => {
  const menuWidth = 318

  dropdownList.style.left = `calc(${left} - ${menuWidth}px + ${width})`
  dropdownList.style.top = top
  dropdownList.style.width = menuWidth
}
</script>

<template>
  <v-select
    append-to-body
    v-model="value"
    :searchable="false"
    :clearable="false"
    :components="{
      OpenIndicator: IconTriangle,
    }"
    :options="Object.values(roles)"
    :reduce="(role) => role.id"
    :calculatePosition="calculatePosition"
  >
    <template #selected-option-container="{ option }">
      <span class="text-sm">{{ option.title }}</span>
    </template>
    <template #option="{ id, title, description }">
      <div class="role-dropdown-item">
        <div v-if="id === value" class="role-dropdown-item__icon">
          <IconCheck />
        </div>
        <div class="role-dropdown-item__title">
          {{ title }}
        </div>
        <div class="role-dropdown-item__description text-secondary text-xs">
          {{ description }}
        </div>
      </div>
    </template>
  </v-select>
</template>

<style scoped lang="scss">
.role-dropdown-item {
  position: relative;
  padding-left: 36px;

  &__icon {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--color-text-active);
  }

  &__title {
    font-weight: 600;
  }
}
</style>
