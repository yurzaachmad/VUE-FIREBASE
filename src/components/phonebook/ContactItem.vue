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
          @click="confirmRemoveContact"
          :icon="['fas', 'fa-trash-can']"
        />
      </div>
      <div v-if="showConfirmDialog" class="confirm-dialog">
        <p>Are you sure you want to remove this contact?</p>
        <button @click="removeContact(id)">Yes</button>
        <button @click="cancelRemoveContact">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showConfirmDialog: false
    }
  },
  methods: {
    confirmRemoveContact() {
      this.showConfirmDialog = true
    },
    removeContact(id) {
      removeContact(id)
      this.showConfirmDialog = false
    },
    cancelRemoveContact() {
      this.showConfirmDialog = false
    }
  }
}
</script>

<style scoped>
.confirm-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
}

.confirm-dialog p {
  margin-bottom: 20px;
}

.confirm-dialog button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirm-dialog button:hover {
  background-color: #0056b3;
}
</style>
