<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import ContactItem from './ContactItem.vue'
import { useContactsStore } from '@/stores/contacts'

// Define props
const props = defineProps({
  query: String,
  searchParam: Array,
  sortTypes: Object,
  currentSort: String
})

const ITEMS_PER_PAGE = 10
const currentPage = ref(1)
const isLoading = ref(false)

const store = useContactsStore()
const contacts = ref([])

const filteredContacts = computed(() => {
  return contacts.value.filter((contact) => {
    return props.searchParam.some((param) => {
      return contact[param].toLowerCase().includes(props.query.toLowerCase())
    })
  })
})

const sortedContacts = computed(() => {
  return [...filteredContacts.value].sort((a, b) => {
    if (props.currentSort === 'up') {
      return a.name.localeCompare(b.name)
    } else {
      return b.name.localeCompare(a.name)
    }
  })
})

const currentItems = computed(() => {
  const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  return sortedContacts.value.slice(0, endIndex)
})

const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight && !isLoading.value) {
    isLoading.value = true
    currentPage.value++
    setTimeout(() => {
      isLoading.value = false
    }, 1000)
  }
}

onMounted(async () => {
  await store.loadContact()
  contacts.value = store.contacts
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div id="main">
    <ContactItem
      v-for="contact in currentItems"
      :name="contact.name"
      :phone="contact.phone"
      :key="contact.id"
      :id="contact.id"
    />
    <div style="height: 600px"></div>
  </div>
</template>
