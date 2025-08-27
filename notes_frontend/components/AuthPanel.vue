<script setup lang="ts">
const mode = ref<'login' | 'signup'>('login')
const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const { login, signup } = useAuth()

async function submit() {
  error.value = null
  try {
    if (mode.value === 'login') login(email.value.trim(), password.value.trim())
    else signup(email.value.trim(), password.value.trim())
  } catch (e: any) {
    error.value = e?.message || 'Failed'
  }
}
</script>

<template>
  <div class="container" style="padding:40px 0;display:grid;place-items:center">
    <div class="card" style="width:min(100%,420px);padding:20px;border-radius:12px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <div style="width:12px;height:12px;border-radius:999px;background:var(--color-accent)"></div>
        <h2 style="margin:0">Welcome</h2>
      </div>
      <p style="margin:0 0 16px;color:var(--color-muted)">Please {{ mode }} to continue.</p>

      <form @submit.prevent="submit" style="display:grid;gap:12px">
        <input class="input" type="email" placeholder="Email" v-model="email" required />
        <input class="input" type="password" placeholder="Password" v-model="password" required />
        <button class="btn" type="submit">{{ mode === 'login' ? 'Log in' : 'Sign up' }}</button>
      </form>

      <p v-if="error" style="color:#b91c1c;margin-top:10px">{{ error }}</p>

      <div style="margin-top:16px;color:var(--color-muted);font-size:14px">
        <button class="btn ghost" @click="mode = mode === 'login' ? 'signup' : 'login'">
          Switch to {{ mode === 'login' ? 'Sign up' : 'Log in' }}
        </button>
      </div>
    </div>
  </div>
</template>
