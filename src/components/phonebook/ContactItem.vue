<script setup>
import { useContactsStore } from '@/stores/contacts'
defineProps({
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
  }
})
const store = useContactsStore()

const { removeContact } = store
</script>

<template>
  <div className="container">
    <div>
      <img src="/images/bussines-man.png" alt="avatar" className="avatar" />

      <input hidden type="file" name="avatar" onChange="{handleAvatarChange}" />
    </div>
    <div className="list">
      <br />
      <p>
        {{ name }}
      </p>
      <br />
      <p>
        {{ phone }}
      </p>
      <br />
      <div>
        <font-awesome-icon class="icon" :icon="['fas', 'fa-pen-to-square']" />
        <font-awesome-icon
          class="icon"
          @click="removeContact(id)"
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
