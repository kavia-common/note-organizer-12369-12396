import { defineStore } from 'pinia'

export type Note = {
  id: string
  title: string
  content: string
  tags: string[]
  folder?: string
  starred?: boolean
  archived?: boolean
  createdAt: string
  updatedAt: string
}

export type NoteFilter = {
  q?: string
  tags?: string[]
  folder?: string
  starred?: boolean
  archived?: boolean
  sort?: 'updated' | 'created' | 'title'
  order?: 'asc' | 'desc'
}

const STORAGE_KEY = 'notes_data_v1'

function uuid() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    // @ts-ignore
    return crypto.randomUUID()
  }
  return 'id-' + Math.random().toString(36).slice(2)
}

function nowISO() { return new Date().toISOString() }

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Note[],
  }),
  getters: {
    allTags: (s) => {
      const set = new Set<string>()
      s.notes.forEach(n => n.tags.forEach(t => set.add(t)))
      return Array.from(set).sort((a, b) => a.localeCompare(b))
    },
    folders: (s) => {
      const set = new Set<string>()
      s.notes.forEach(n => { if (n.folder) set.add(n.folder) })
      return Array.from(set).sort((a, b) => a.localeCompare(b))
    },
  },
  actions: {
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw) as Note[]
          this.notes = parsed
        } else {
          this.seed()
        }
      } catch {
        this.seed()
      }
    },
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notes))
    },
    seed() {
      // add a simple welcome note
      const base: Note[] = [{
        id: uuid(),
        title: 'Welcome to Notes',
        content: 'Start writing your thoughts here.\n\nUse tags like #personal and organize with folders.',
        tags: ['welcome', 'personal'],
        folder: 'Getting Started',
        starred: true,
        archived: false,
        createdAt: nowISO(),
        updatedAt: nowISO(),
      }]
      this.notes = base
      this.persist()
    },

    // CRUD
    createNote(payload: Partial<Note>) {
      const note: Note = {
        id: uuid(),
        title: payload.title?.trim() || 'Untitled',
        content: payload.content || '',
        tags: (payload.tags || []).map(t => t.trim()).filter(Boolean),
        folder: payload.folder?.trim(),
        starred: !!payload.starred,
        archived: !!payload.archived,
        createdAt: nowISO(),
        updatedAt: nowISO(),
      }
      this.notes.unshift(note)
      this.persist()
      return note
    },
    updateNote(id: string, patch: Partial<Note>) {
      const idx = this.notes.findIndex(n => n.id === id)
      if (idx === -1) return
      const current = this.notes[idx]
      const updated: Note = {
        ...current,
        ...patch,
        title: (patch.title ?? current.title).trim(),
        tags: (patch.tags ?? current.tags).map(t => t.trim()).filter(Boolean),
        folder: (patch.folder ?? current.folder)?.trim(),
        updatedAt: nowISO(),
      }
      this.notes[idx] = updated
      this.persist()
    },
    deleteNote(id: string) {
      this.notes = this.notes.filter(n => n.id !== id)
      this.persist()
    },

    // Helpers
    list(filter?: NoteFilter) {
      let list = [...this.notes]
      if (filter?.q) {
        const q = filter.q.toLowerCase()
        list = list.filter(n =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.tags.some(t => t.toLowerCase().includes(q))
        )
      }
      if (filter?.tags?.length) {
        const set = new Set(filter.tags.map(t => t.toLowerCase()))
        list = list.filter(n => n.tags.some(t => set.has(t.toLowerCase())))
      }
      if (filter?.folder) {
        list = list.filter(n => (n.folder || '').toLowerCase() === filter.folder!.toLowerCase())
      }
      if (typeof filter?.starred === 'boolean') {
        list = list.filter(n => !!n.starred === filter.starred)
      }
      if (typeof filter?.archived === 'boolean') {
        list = list.filter(n => !!n.archived === filter.archived)
      }

      const sort = filter?.sort || 'updated'
      const order = filter?.order || 'desc'
      list.sort((a, b) => {
        let r = 0
        if (sort === 'title') r = a.title.localeCompare(b.title)
        else if (sort === 'created') r = a.createdAt.localeCompare(b.createdAt)
        else r = a.updatedAt.localeCompare(b.updatedAt)
        return order === 'asc' ? r : -r
      })
      return list
    },
  }
})
