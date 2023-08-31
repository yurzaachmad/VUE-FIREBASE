<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ContactList from '../components/phonebook/ContactList.vue'

const sortTypes = {
  up: {
    class: 'fa-arrow-down-a-z',
    fn: (a, b) => a.name.localeCompare(b.name)
  },
  down: {
    class: 'fa-arrow-up-z-a',
    fn: (a, b) => b.name.localeCompare(a.name)
  }
}

const currentSort = ref('up')

const query = ref('')

const searchParam = ref(['name', 'phone'])

const onSortChange = () => {
  let nexSort

  if (currentSort.value === 'down') nexSort = 'up'
  else if (currentSort.value === 'up') nexSort = 'down'

  currentSort.value = nexSort
}
</script>

<template>
  <main>
    <div class="input-group mb-8" id="search">
      <div id="icon" @click="onSortChange">
        <font-awesome-icon :icon="['fas', sortTypes[currentSort].class]" />
      </div>
      <div class="input-container">
        <font-awesome-icon :icon="['fas', 'fa-magnifying-glass']" id="input-icon" />
        <input
          type="text"
          v-model="query"
          class="form-control"
          aria-describedby="basic-addon1"
          id="input-field"
        />
      </div>
      <RouterLink to="/add">
        <div id="icon">
          <font-awesome-icon :icon="['fas', 'fa-user-plus']" />
        </div>
      </RouterLink>
    </div>
    <ContactList
      :query="query"
      :searchParam="searchParam"
      :sortTypes="sortTypes"
      :currentSort="currentSort"
    />
  </main>
</template>
