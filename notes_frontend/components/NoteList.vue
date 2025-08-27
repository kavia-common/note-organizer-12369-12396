<script setup lang="ts">
import type { Note } from '~/stores/notes'

const props = defineProps<{
  notes: Note[]
  activeId?: string
}>()

const emit = defineEmits<{
  (e: 'open', id: string): void
  (e: 'delete', id: string): void
  (e: 'toggleStar', id: string): void
  (e: 'toggleArchive', id: string): void
}>()

function preview(content: string) {
  return (content || '').replace(/\n+/g, ' ').slice(0, 120)
}
</script>

<template>
  <div class="list">
    <div
      v-for="n in props.notes"
      :key="n.id"
      class="note-item"
      :style="props.activeId === n.id ? 'border-color:#cfe2f6;background:#f8fbff' : ''"
    >
      <div style="min-width:0">
        <div class="note-title" style="display:flex;align-items:center;gap:8px">
          <button class="badge" title="Star" @click="emit('toggleStar', n.id)">
            <span :style="`width:8px;height:8px;border-radius:999px;background:${n.starred ? 'var(--color-accent)' : '#e5e7eb'}`"></span>
            <span style="margin-left:6px">Star</span>
          </button>
          <a href="#" @click.prevent="emit('open', n.id)" style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ n.title }}</a>
        </div>
        <div class="note-meta" style="margin-top:6px">
          {{ preview(n.content) }}
        </div>
        <div style="display:flex;align-items:center;gap:6px;margin-top:8px;flex-wrap:wrap">
          <span v-for="t in n.tags" :key="t" class="badge">#{{ t }}</span>
          <span v-if="n.folder" class="badge">📁 {{ n.folder }}</span>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <button class="btn ghost" title="Archive" @click="emit('toggleArchive', n.id)">Archive</button>
        <button class="btn warn" title="Delete" @click="emit('delete', n.id)">Delete</button>
      </div>
    </div>
  </div>
</template>
