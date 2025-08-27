<script setup lang="ts">
const { isAuthenticated } = useAuth()
</script>

<template>
  <slot v-if="isAuthenticated" />
  <AuthPanel v-else />
</template>
