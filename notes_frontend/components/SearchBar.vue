<script setup lang="ts">
const model = defineModel<string>({ default: '' })
const emit = defineEmits<{ (e: 'enter'): void }>()
</script>

<template>
  <div style="display:flex;gap:8px;align-items:center">
    <input class="search" placeholder="Search notes..." v-model="model" @keyup.enter="emit('enter')" />
  </div>
</template>
