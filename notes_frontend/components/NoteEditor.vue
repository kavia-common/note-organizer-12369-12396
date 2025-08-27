<script setup lang="ts">
import type { Note } from '~/stores/notes'

const props = defineProps<{
  note: Note
}>()

const emit = defineEmits<{
  (e: 'save', patch: Partial<Note>): void
}>()

const title = ref(props.note.title)
const content = ref(props.note.content)
const tags = ref(props.note.tags.join(', '))
const folder = ref(props.note.folder || '')
const starred = ref(!!props.note.starred)
const archived = ref(!!props.note.archived)

watch(() => props.note.id, () => {
  title.value = props.note.title
  content.value = props.note.content
  tags.value = props.note.tags.join(', ')
  folder.value = props.note.folder || ''
  starred.value = !!props.note.starred
  archived.value = !!props.note.archived
})

function save() {
  emit('save', {
    title: title.value,
    content: content.value,
    tags: tags.value.split(',').map(s => s.trim()).filter(Boolean),
    folder: folder.value || undefined,
    starred: starred.value,
    archived: archived.value,
  })
}
</script>

<template>
  <div class="editor card" style="padding:16px">
    <input class="input title" placeholder="Title" v-model="title" />
    <textarea class="textarea body" placeholder="Write your note..." v-model="content"></textarea>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      <input class="input" placeholder="comma,separated,tags" v-model="tags" />
      <input class="input" placeholder="Folder" v-model="folder" />
    </div>

    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
      <label class="badge"><input type="checkbox" v-model="starred" style="margin-right:6px" /> Starred</label>
      <label class="badge"><input type="checkbox" v-model="archived" style="margin-right:6px" /> Archived</label>
      <button class="btn" @click="save">Save</button>
    </div>
  </div>
</template>
