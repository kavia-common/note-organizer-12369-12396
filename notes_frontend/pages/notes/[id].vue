<script setup lang="ts">
import { useNotesStore } from '~/stores/notes'

const store = useNotesStore()
const route = useRoute()
const id = computed(() => route.params.id as string)

onMounted(() => store.load())

const note = computed(() => store.notes.find(n => n.id === id.value))

function save(patch: any) {
  if (!note.value) return
  store.updateNote(note.value.id, patch)
}

function remove() {
  if (!note.value) return
  if (confirm('Delete this note?')) {
    store.deleteNote(note.value.id)
    navigateTo('/')
  }
}
</script>

<template>
  <div class="container" v-if="note">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
      <NuxtLink class="btn secondary" to="/">Back</NuxtLink>
      <button class="btn warn" @click="remove">Delete</button>
    </div>

    <NoteEditor :note="note" @save="save" />
  </div>
  <div v-else class="container">
    <NuxtLink class="btn secondary" to="/">Back to list</NuxtLink>
    <p style="color:var(--color-muted)">Note not found.</p>
  </div>
</template>
