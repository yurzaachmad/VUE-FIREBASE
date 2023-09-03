<script setup>
import { useContactsStore } from '@/stores/contacts'
import axios from 'axios'
import { ref, computed } from 'vue'
const { name, phone, id, avatar } = defineProps({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  avatar: {
    type: Object,
    required: true
  }
})

const profilePicture = ref(avatar.avatar)

const store = useContactsStore()

const { removeContact, updateContact, updateAvatar } = store

const isEdit = ref(false)
const openAvatarInput = () => {
  document.getElementById('selectAvatar' + id).click()
}
const handleAvatarChange = async (event) => {
  const picture = event.target.files[0]
  const formData = new FormData()
  formData.append('avatar', picture)

  try {
    const response = await axios.post(`http://localhost:3001/upload-avatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    updateAvatar(id, response.data, name, phone)
    profilePicture.value = response.data
  } catch (error) {
    console.error('Upload error', error)
  }
}
const getAvatarSrc = computed(() => {
  if (profilePicture.value === undefined) {
    return '/images/bussines-man.png'
  } else {
    return profilePicture.value instanceof File
      ? URL.createObjectURL(profilePicture.value)
      : '/images/' + profilePicture.value
  }
})
function DeleteUser(id) {
  if (confirm('Do you really want to delete?')) {
    removeContact(id)
  }
}
</script>

<template>
  <div className="container">
    <div @click="openAvatarInput">
      <img :src="getAvatarSrc" alt="avatar" className="avatar" />

      <input
        hidden
        :id="'selectAvatar' + id"
        type="file"
        name="avatar"
        @change="handleAvatarChange"
      />
    </div>
    <div className="list">
      <br />
      <input v-if="isEdit" :value="name" @input="name = $event.target.value" style="width: 60%" />
      <p v-else>
        {{ name }}
      </p>
      <br />
      <input v-if="isEdit" :value="phone" @input="phone = $event.target.value" style="width: 60%" />
      <p v-else>
        {{ phone }}
      </p>
      <br />
      <div v-if="isEdit">
        <font-awesome-icon
          class="icon"
          :icon="['fas', 'fa-floppy-disk']"
          @click="(isEdit = !isEdit), updateContact(id, name, phone, avatar.avatar)"
        />
      </div>
      <div v-else>
        <font-awesome-icon
          class="icon"
          :icon="['fas', 'fa-pen-to-square']"
          @click="isEdit = !isEdit"
        />
        <font-awesome-icon
          class="icon"
          v-on:click="DeleteUser(id)"
          :icon="['fas', 'fa-trash-can']"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.name {
  color: 500;
  font-size: 2.6rem;
}
</style>
