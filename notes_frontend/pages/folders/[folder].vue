<script setup lang="ts">
import { useNotesStore } from '~/stores/notes'

const store = useNotesStore()
const route = useRoute()
const folder = computed(() => decodeURIComponent(route.params.folder as string))
const q = ref('')

onMounted(() => store.load())

const filtered = computed(() => store.list({ q: q.value, folder: folder.value }))

function openNote(id: string) { navigateTo(`/notes/${id}`) }
function remove(id: string) { if (confirm('Delete?')) store.deleteNote(id) }
function toggleStar(id: string) {
  const n = store.notes.find(n => n.id === id)
  if (n) store.updateNote(id, { starred: !n.starred })
}
function toggleArchive(id: string) {
  const n = store.notes.find(n => n.id === id)
  if (n) store.updateNote(id, { archived: !n.archived })
}
</script>

<template>
  <div class="container" style="display:grid;gap:12px">
    <div style="display:flex;align-items:center;gap:8px;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:8px">
        <NuxtLink class="btn secondary" to="/folders">Back</NuxtLink>
        <h2 style="margin:0">📁 {{ folder }}</h2>
      </div>
      <SearchBar v-model="q" />
    </div>

    <NoteList
      :notes="filtered"
      @open="openNote"
      @delete="remove"
      @toggleStar="toggleStar"
      @toggleArchive="toggleArchive"
    />
  </div>
</template>
