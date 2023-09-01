{
  /* <template>
  <div id="main">
    <ContactItem v-for="student in currentItems" :key="student.id" :student="student" />
    <div style="height: 600px"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
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
const contacts = ref([])

onMounted(async () => {
  await store.loadContact()
  contacts.value = store.contacts
})

const ITEMS_PER_PAGE = 10
const currentPage = ref(1)
const currentItems = ref([])

// Watch for changes in contacts, currentPage, and currentSort, and update currentItems accordingly
watch([contacts, currentPage, currentSort], () => {
  const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  currentItems.value = contacts.value
    .slice()
    .sort(sortType[currentSort].fn)
    .slice(startIndex, endIndex)
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
</script> */
}
