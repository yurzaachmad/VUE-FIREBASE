<script setup>
import { ref, watch, onMounted } from 'vue'
import ContactItem from './ContactItem.vue'
import { useContactsStore } from '@/stores/contacts'

// Define props
const props = defineProps({
  query: String,
  searchParam: Array,
  sortTypes: Object,
  currentSort: String
})

const store = useContactsStore()
const contacts = ref([])

onMounted(async () => {
  await store.loadContact()
  contacts.value = store.contacts

  // Perform initial sorting
  sortContacts()
})

const ITEMS_PER_PAGE = 10
const currentPage = ref(1)
const currentItems = ref([])

const currentSort = ref(props.currentSort)

// Watch for changes in currentPage and currentSort, and update currentItems accordingly
watch([currentPage, () => props.currentSort], () => {
  sortContacts()
})

// Function to handle the scroll event and trigger pagination
const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight) {
    // User has reached the bottom of the page, load more data
    currentPage.value++
  }
}

// Attach the scroll event listener when the component mounts
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Remove the scroll event listener when the component unmounts
  return () => window.removeEventListener('scroll', handleScroll)
})

// Sort contacts based on the currentSort prop
const sortContacts = () => {
  const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const sortedContacts = [...contacts.value].sort(props.sortTypes[props.currentSort].fn)
  currentItems.value = sortedContacts.slice(startIndex, endIndex)
}
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
