<script setup lang="ts">
const { allTags } = useNotes()
</script>

<template>
  <div class="container">
    <h2>Tags</h2>
    <div style="display:flex;flex-wrap:wrap;gap:8px">
      <NuxtLink v-for="t in allTags" :key="t" :to="`/tags/${encodeURIComponent(t)}`" class="badge">#{{ t }}</NuxtLink>
    </div>
  </div>
</template>
