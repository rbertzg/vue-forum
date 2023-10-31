<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form
        @submit.prevent="signIn"
        class="card card-form"
      >
        <h1 class="text-center">Login</h1>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="form.email"
            id="email"
            type="text"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="form.password"
            id="password"
            type="password"
            class="form-input"
          />
        </div>
        <div class="push-top">
          <button
            type="submit"
            class="btn-blue btn-block"
          >
            Log in
          </button>
        </div>

        <div class="form-actions text-right">
          <RouterLink :to="{ name: 'Register' }">Create an account?</RouterLink>
        </div>
      </form>
      <div class="push-top text-center">
        <button
          @click="signInGoogle"
          class="btn-red btn-xsmall"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useUsersStore } from '../stores/UsersStore'

  const usersStore = useUsersStore()
  const { signInWithEmailAndPassword, signInWithGoogle } = usersStore

  const form = reactive({
    email: '',
    password: '',
  })

  const router = useRouter()
  const route = useRoute()

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(form)
      successRedirect()
    } catch (error) {
      alert(error.message)
    }
  }

  const signInGoogle = async () => {
    await signInWithGoogle()
    successRedirect()
  }

  const successRedirect = () => {
    const redirectTo = route.query.redirectTo || { name: 'Home' }
    router.push(redirectTo)
  }
</script>
