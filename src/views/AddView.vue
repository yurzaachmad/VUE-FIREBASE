<script setup>
import { RouterLink } from 'vue-router'
import { useContactsStore } from '@/stores/contacts'
import { ref } from 'vue'

const store = useContactsStore()

const { addContact } = store

const user = ref('')
const phone = ref('')

const submitContact = (event) => {
  event.preventDefault()
  addContact(user.value, phone.value)
  user.value = ''
  phone.value = ''
}
</script>

<template>
  <div class="input-group mb-8" id="search">
    <form class="formAdd" @submit="submitContact">
      <div>
        <div class="mb-3">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon3"> Name </span>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="user"
              aria-describedby="basic-addon3 basic-addon4"
              name="name"
            />
          </div>
        </div>
        <div class="mb-3">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon3"> Phone </span>
            <input
              type="text"
              class="form-control"
              id="phone"
              name="phone"
              v-model="phone"
              aria-describedby="basic-addon3 basic-addon4"
            />
          </div>
        </div>
        <div class="button">
          <button type="submit" class="btn">Save</button>
          <button type="button" class="btn"><RouterLink to="/">Cancel</RouterLink></button>
        </div>
      </div>
    </form>
  </div>
</template>
