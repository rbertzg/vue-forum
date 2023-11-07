<template>
  <header
    v-click-outside="() => (mobileNavMenu = false)"
    v-page-scroll="() => (mobileNavMenu = false)"
    class="header"
    id="header"
  >
    <RouterLink
      :to="{ name: 'Home' }"
      class="logo"
    >
      <img src="../assets/vueschool-logo.svg" />
    </RouterLink>
    <div
      @click="mobileNavMenu = !mobileNavMenu"
      class="btn-hamburger"
    >
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>
    <nav
      class="navbar"
      :class="{ 'navbar-open': mobileNavMenu }"
    >
      <ul>
        <li
          v-if="authUser"
          class="navbar-user"
        >
          <a
            @click.prevent="userDropdownOpen = !userDropdownOpen"
            v-click-outside="() => (userDropdownOpen = false)"
          >
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
        <li
          v-if="authUser"
          class="navbar-mobile-item"
        >
          <RouterLink :to="{ name: 'Profile' }">View Profile</RouterLink>
        </li>
        <li
          v-if="authUser"
          class="navbar-mobile-item"
        >
          <RouterLink :to="{ name: 'SignOut' }">Sign Out</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/AuthStore'

  const router = useRouter()

  const authStore = useAuthStore()
  const { authUser } = storeToRefs(authStore)
  const { signOut } = authStore

  const userDropdownOpen = ref(false)
  const mobileNavMenu = ref(false)

  router.beforeEach(() => {
    mobileNavMenu.value = false
  })
</script>
