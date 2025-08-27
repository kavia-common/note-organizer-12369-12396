<script setup lang="ts">
import { useNotesStore } from '~/stores/notes'

const store = useNotesStore()
const q = ref<string>((useRoute().query.q as string) || '')
const filterParam = computed(() => (useRoute().query.filter as string) || '')
const selectedId = ref<string | null>(null)

onMounted(() => {
  store.load()
})

const filtered = computed(() => {
  const f: any = { q: q.value }
  if (filterParam.value === 'starred') f.starred = true
  if (filterParam.value === 'archived') f.archived = true
  if (filterParam.value === 'recent') f.sort = 'updated'
  return store.list(f)
})

function openNote(id: string) {
  selectedId.value = id
  navigateTo(`/notes/${id}`)
}

function createNew() {
  const note = store.createNote({ title: 'Untitled' })
  selectedId.value = note.id
  navigateTo(`/notes/${note.id}`)
}

function remove(id: string) {
  if (confirm('Delete this note?')) {
    store.deleteNote(id)
  }
}
function toggleStar(id: string) {
  const n = store.notes.find(n => n.id === id)
  if (!n) return
  store.updateNote(id, { starred: !n.starred })
}
function toggleArchive(id: string) {
  const n = store.notes.find(n => n.id === id)
  if (!n) return
  store.updateNote(id, { archived: !n.archived })
}
</script>

<template>
  <div class="container" style="display:grid;gap:12px">
    <div style="display:flex;gap:8px;align-items:center;justify-content:space-between">
      <SearchBar v-model="q" @enter="" />
      <button class="btn" @click="createNew">New Note</button>
    </div>

    <NoteList
      :notes="filtered"
      :active-id="selectedId || undefined"
      @open="openNote"
      @delete="remove"
      @toggleStar="toggleStar"
      @toggleArchive="toggleArchive"
    />
  </div>
</template>
