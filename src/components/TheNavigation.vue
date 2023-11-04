<template>
  <header
    class="header"
    id="header"
  >
    <RouterLink
      :to="{ name: 'Home' }"
      class="logo"
    >
      <img src="../assets/vueschool-logo.svg" />
    </RouterLink>
    <div class="btn-hamburger">
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>
    <nav class="navbar">
      <ul>
        <li
          v-if="authUser"
          class="navbar-user"
        >
          <a @click.prevent="userDropdownOpen = !userDropdownOpen">
            <img
              class="avatar-small"
              :src="authUser.avatar"
              alt=""
            />
            <span>
              {{ authUser.name }}
              <img
                class="icon-profile"
                src="../assets/arrow-profile.svg"
                alt=""
              />
            </span>
          </a>
          <div
            id="user-dropdown"
            :class="{ 'active-drop': userDropdownOpen }"
          >
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <RouterLink :to="{ name: 'Profile' }">View profile</RouterLink>
              </li>
              <li class="dropdown-menu-item">
                <a @click.prevent="signOut">Sign Out</a>
              </li>
            </ul>
          </div>
        </li>
        <li
          v-if="!authUser"
          class="navbar-item"
        >
          <RouterLink :to="{ name: 'SignIn' }">Sign In</RouterLink>
        </li>
        <li
          v-if="!authUser"
          class="navbar-item"
        >
          <RouterLink :to="{ name: 'Register' }">Register</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import { useAuthStore } from '../stores/AuthStore'

  const authStore = useAuthStore()
  const { authUser } = storeToRefs(authStore)
  const { signOut } = authStore

  const userDropdownOpen = ref(false)
</script>
