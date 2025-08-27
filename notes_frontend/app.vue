<script setup lang="ts">
const { isAuthenticated, user, logout } = useAuth()
const { sidebarFolders, allTags, createFolder } = useNotes()

// Sidebar new folder
const newFolderName = ref('')
function addFolder() {
  if (!newFolderName.value.trim()) return
  createFolder(newFolderName.value.trim())
  newFolderName.value = ''
}
</script>

<template>
  <div class="app-shell">
    <header class="header">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:10px;height:10px;border-radius:999px;background:var(--color-accent)"></div>
        <strong>Notes</strong>
      </div>

      <div class="container" style="display:flex;align-items:center;gap:8px;justify-content:flex-end;padding:0">
        <NuxtLink class="btn secondary" to="/">All Notes</NuxtLink>
        <NuxtLink class="btn secondary" to="/tags">Tags</NuxtLink>
        <NuxtLink class="btn secondary" to="/folders">Folders</NuxtLink>

        <div v-if="isAuthenticated" style="display:flex;align-items:center;gap:8px;margin-left:8px">
          <span class="badge">{{ user?.email }}</span>
          <button class="btn ghost" @click="logout">Logout</button>
        </div>
      </div>
    </header>

    <aside class="sidebar">
      <div class="nav-section">
        <div class="label">Quick</div>
        <div class="nav-list">
          <NuxtLink class="nav-item" to="/">All</NuxtLink>
          <NuxtLink class="nav-item" to="/?filter=starred">Starred</NuxtLink>
          <NuxtLink class="nav-item" to="/?filter=recent">Recent</NuxtLink>
          <NuxtLink class="nav-item" to="/?filter=archived">Archived</NuxtLink>
        </div>
      </div>

      <div class="nav-section">
        <div class="label">Folders</div>
        <div class="nav-list">
          <NuxtLink
            v-for="f in sidebarFolders"
            :key="f.id"
            class="nav-item"
            :to="`/folders/${encodeURIComponent(f.name)}`"
          >
            <span style="width:8px;height:8px;border-radius:999px;background:#cbd5e1"></span>
            <span>{{ f.name }}</span>
          </NuxtLink>
        </div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <input class="input" placeholder="New folder" v-model="newFolderName" @keyup.enter="addFolder" />
          <button class="btn" @click="addFolder">Add</button>
        </div>
      </div>

      <div class="nav-section">
        <div class="label">Tags</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          <NuxtLink
            v-for="t in allTags"
            :key="t"
            class="badge"
            :to="`/tags/${encodeURIComponent(t)}`"
          >#{{ t }}</NuxtLink>
        </div>
      </div>
    </aside>

    <main class="main container">
      <AuthGate>
        <NuxtPage />
      </AuthGate>
    </main>
  </div>
</template>
