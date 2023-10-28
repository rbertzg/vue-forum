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
      <!--      <ul>-->
      <!--        <li class="navbar-item">-->
      <!--          <a href="index.html">Home</a>-->
      <!--        </li>-->
      <!--        <li class="navbar-item">-->
      <!--          <a href="category.html">Category</a>-->
      <!--        </li>-->
      <!--        <li class="navbar-item">-->
      <!--          <a href="forum.html">Forum</a>-->
      <!--        </li>-->
      <!--        <li class="navbar-item">-->
      <!--          <a href="thread.html">Thread</a>-->
      <!--        </li>-->
      <!--        &lt;!&ndash; Show these option only on mobile&ndash;&gt;-->
      <!--        <li class="navbar-item mobile-only">-->
      <!--          <a href="profile.html">My Profile</a>-->
      <!--        </li>-->
      <!--        <li class="navbar-item mobile-only">-->
      <!--          <a href="#">Logout</a>-->
      <!--        </li>-->
      <!--      </ul>-->
    </nav>
  </header>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import { useUsersStore } from '../stores/UsersStore'

  const usersStore = useUsersStore()
  const { authUser } = storeToRefs(usersStore)
  const { signOut } = usersStore

  const userDropdownOpen = ref(false)
</script>
