<script setup>
import { ref } from 'vue'
import InvitePopup from '@/components/InvitePopup/InvitePopup.vue'
import BaseButton from '@/components/forms/BaseButton.vue'
import Modal from '@/components/common/Modal.vue'
import Row from '@/components/common/Row.vue'

const showInvitePopup = ref(false)
const showSuccessPopup = ref(false)

const handleSubmit = (data) => {
  console.log(data)

  showSuccessPopup.value = true
  showInvitePopup.value = false
}
</script>

<template>
  <main>
    <BaseButton type="button" @click="showInvitePopup = true">
      Invite Now
    </BaseButton>

    <InvitePopup
      :show="showInvitePopup"
      @close="showInvitePopup = false"
      @submit="handleSubmit"
    />

    <Modal :show="showSuccessPopup" @close="showSuccessPopup = false">
      <template #header>
        <Row justify-content="center">
          <h3 class="text-md">Congratulations</h3>
        </Row>
      </template>

      <Row justify-content="center">
        The invitations were sent successfully
      </Row>

      <template #footer="{ triggerClose }">
        <Row justify-content="center">
          <BaseButton type="button" @click="triggerClose"> Ok </BaseButton>
        </Row>
      </template>
    </Modal>
  </main>
</template>

<style>
main {
  padding: 1rem;
}
</style>
