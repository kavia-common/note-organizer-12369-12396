<script setup lang="ts">
const { sidebarFolders } = useNotes()
</script>

<template>
  <div class="container">
    <h2>Folders</h2>
    <div style="display:grid;gap:10px;grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">
      <NuxtLink
        v-for="f in sidebarFolders"
        :key="f.id"
        :to="`/folders/${encodeURIComponent(f.name)}`"
        class="card"
        style="padding:16px;border-radius:12px"
      >
        <div style="display:flex;align-items:center;gap:8px">
          <span style="width:10px;height:10px;border-radius:999px;background:#cbd5e1"></span>
          <strong>{{ f.name }}</strong>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
