import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const request = axios.create({
  baseURL: 'https://phonebookapi-34346-default-rtdb.firebaseio.com/',
  timeout: 10000
})

export const useContactsStore = defineStore('contacts', () => {
  const contacts = ref([])
  async function loadContact() {
    try {
      const { data } = await request.get('contactdb.json')
      contacts.value = Object.keys(data).map((key) => Object.assign({ id: key }, data[key]))
    } catch (e) {
      console.log(e)
      contacts.value = []
    }
  }
  async function addContact(name, phone) {
    try {
      const id = Date.now().toString()
      contacts.value.push({ id, name, phone })
      const { data } = await request.post('contactdb.json', { name, phone })
      contacts.value = contacts.value.map((item) => {
        if (item.id === id) return { id: data.name, name, phone }
        return item
      })
    } catch (e) {
      console.log(e)
    }
  }
  async function removeContact(id) {
    try {
      await request.delete(`contactdb/${id}.json`)
      contacts.value = contacts.value.filter((item) => item.id !== id)
    } catch (e) {
      console.log(e)
    }
  }

  return { contacts, addContact, removeContact, loadContact }
})
