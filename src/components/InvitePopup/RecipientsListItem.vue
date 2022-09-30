<script setup>
import { computed } from 'vue'
import Row from '@/components/common/Row.vue'
import IconRemove from '@/components/icons/IconRemove.vue'
import RoleDropdown from './RoleDropdown.vue'
import { ROLE_IDS, roles } from './constants'

const props = defineProps({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    validator(value) {
      return Object.values(ROLE_IDS).includes(value)
    },
  },
})

const emit = defineEmits(['update:role', 'remove'])

const userRole = computed({
  get() {
    return props.role
  },
  set(val) {
    emit('update:role', val)
  },
})
</script>

<template>
  <li class="recipients-item">
    <Row
      align-items="center"
      justify-content="space-between"
      class="recipients-item__content"
    >
      <div class="recipients-item__info">
        <p class="name">{{ name }}</p>
        <p class="email text-secondary text-xs">{{ email }}</p>
      </div>
      <div class="recipients-item__role">
        <RoleDropdown v-model="userRole" :roles="roles" :name="email" />
      </div>
    </Row>
    <button
      class="recipients-item__remove"
      type="button"
      @click="$emit('remove')"
    >
      <IconRemove v-once />
    </button>
  </li>
</template>

<style scoped lang="scss">
.recipients-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  &__content {
    padding: 6px 12px;
    flex-grow: 1;
    background-color: var(--color-content-bg-2);
    border-radius: var(--border-radius);
  }

  &__info {
    .email {
      line-height: 1.33;
    }
  }

  &__remove {
    color: var(--color-gray-2);
    display: flex;

    &:hover {
      color: var(--color-gray-3);
    }
  }
}
</style>
