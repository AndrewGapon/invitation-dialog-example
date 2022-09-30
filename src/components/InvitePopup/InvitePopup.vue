<script setup>
import { computed, ref, watch } from 'vue'
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import Modal from '@/components/common/Modal.vue'
import Row from '@/components/common/Row.vue'
import BaseInput from '@/components/forms/BaseInput.vue'
import BaseButton from '@/components/forms/BaseButton.vue'
import RecipientsListItem from './RecipientsListItem.vue'
import { getRandomName } from './mock'
import { ROLE_IDS } from './constants'

const props = defineProps({
  show: {
    type: Boolean,
  },
})
const emit = defineEmits(['close', 'submit'])

const emailInput = ref('')
const message = ref('')
const recipientsList = ref([])

const rules = computed(() => ({
  email: {
    required,
    email,
  },
}))

const v$ = useVuelidate(rules, { email: emailInput })

const resetEmailInput = () => {
  v$.value.email.$reset()
  emailInput.value = ''
}

const resetAll = () => {
  resetEmailInput()
  recipientsList.value = []
}

watch(
  () => props.show,
  (val) => {
    if (!val) resetAll()
  },
)

const addEmail = async () => {
  const res = await v$.value.$validate()
  if (!res) {
    return
  }

  const data = {
    name: getRandomName(),
    email: emailInput.value,
    role: ROLE_IDS.guest,
  }

  recipientsList.value.push(data)
  resetEmailInput()
}

const removeEmail = (index) => {
  recipientsList.value.splice(index, 1)
}

const changeRole = (index, role) => {
  recipientsList.value[index].role = role
}

const onClose = () => {
  emit('close')
}

const sendInvitations = () => {
  const data = {
    message: message.value,
    recipients: recipientsList.value,
  }

  emit('submit', data)
}

defineExpose({
  reset: resetAll,
})
</script>

<template>
  <Modal class="invite-popup" :show="show" @close="onClose">
    <template #header>
      <Row>
        <h3 class="text-md">Invite others</h3>
      </Row>
      <form
        class="invite-popup__header-form"
        novalidate
        @submit.prevent="addEmail"
      >
        <Row justify-content="space-between">
          <BaseInput
            v-model="v$.email.$model"
            autofocus
            placeholder="Enter people E-mails"
            :error="v$.email.$errors[0]?.$message"
          />
          <BaseButton :disabled="v$.email.$invalid" type="submit">
            Add
          </BaseButton>
        </Row>
      </form>
      <Row align-items="center">
        <p>or add from</p>
        <Row class="invite-popup__third-party-apps">
          <a v-for="i in new Array(4).keys()" href="#" :key="i">
            <img
              :src="`src/assets/images/third-party-apps/icon-${i + 1}.svg`"
              :alt="i + 1"
            />
          </a>
        </Row>
      </Row>
    </template>

    <Transition>
      <ul class="recipients-list" v-if="recipientsList.length">
        <TransitionGroup>
          <RecipientsListItem
            v-for="({ name, email: userEmail, role }, index) in recipientsList"
            :key="userEmail + name"
            :name="name"
            :email="userEmail"
            :role="role"
            @update:role="(value) => changeRole(index, value)"
            @remove="removeEmail(index)"
          />
        </TransitionGroup>
      </ul>
    </Transition>

    <template #footer>
      <form
        novalidate
        class="invite-popup__footer-form"
        @submit.prevent="sendInvitations"
      >
        <Row>
          <BaseInput
            type="text"
            v-model="message"
            placeholder="Personal message (optional)"
          />
        </Row>
        <Row
          class="invite-popup__submit-row"
          justify-content="flex-end"
          align-items="center"
        >
          <p v-if="recipientsList.length" class="text-secondary text-sm">
            {{ recipientsList.length }} recipients
          </p>
          <BaseButton :disabled="!recipientsList.length" type="submit">
            Send
          </BaseButton>
        </Row>
      </form>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.invite-popup {
  .modal__header {
    .row {
      gap: 12px;
    }
  }

  &__header-form {
    margin: 24px 0 16px;
  }

  &__submit-row {
    margin-top: 24px;
    gap: 24px;

    .button {
      width: 160px;
    }
  }
}

.recipients-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
