<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import ContactItem from './ContactItem.vue'

import { useContactsStore } from '@/stores/contacts'

const store = useContactsStore()

const { contacts } = storeToRefs(store)

const { loadContact } = store

onMounted(async () => {
  await loadContact()
})
</script>

<template>
  <div id="main">
    <ContactItem
      v-for="todo in contacts"
      :name="todo.name"
      :phone="todo.phone"
      :key="todo.id"
      :id="todo.id"
    />
  </div>
</template>
