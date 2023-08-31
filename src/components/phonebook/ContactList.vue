<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import ContactItem from './ContactItem.vue'

import { useContactsStore } from '@/stores/contacts'

const { query, searchParam, sortType, currentSort } = defineProps({
  query: {
    type: String,
    required: true
  },
  searchParam: {
    type: Array,
    required: true
  },
  sortType: {
    type: Object,
    required: true
  },
  currentSort: {
    type: String,
    required: true
  }
})

const store = useContactsStore()

const { contacts } = storeToRefs(store)

console.log(contacts)
const ITEMS_PER_PAGE = 10

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
