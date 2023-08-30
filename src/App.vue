<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import ContactList from './components/phonebook/ContactList.vue'
</script>

<template>
  <div className="input-group mb-8" id="search">
    <div id="icon">
      <font-awesome-icon :icon="['fas', 'fa-arrow-up-z-a']" />
    </div>
    <div className="input-container">
      <font-awesome-icon :icon="['fas', 'fa-magnifying-glass']" id="input-icon" />
      <input
        type="text"
        className="form-control"
        aria-describedby="basic-addon1"
        id="input-field"
      />
    </div>
    <div id="icon">
      <RouterLink to="/add"><font-awesome-icon :icon="['fas', 'fa-user-plus']" /></RouterLink>
    </div>
  </div>
  <RouterView />
</template>
