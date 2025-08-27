import { useNotesStore } from '~/stores/notes'

/**
 * PUBLIC_INTERFACE
 * Provides high-level notes APIs composed from Pinia store for pages/components.
 */
export function useNotes() {
  const store = useNotesStore()

  onMounted(() => {
    if (!store.notes.length) store.load()
  })

  const notes = computed(() => store.notes)
  const allTags = computed(() => store.allTags)
  const sidebarFolders = computed(() => store.folders.map((name) => ({ id: name, name })))

  function search(filter?: Parameters<typeof store.list>[0]) {
    return store.list(filter)
  }

  function createNote(title?: string, folder?: string) {
    return store.createNote({ title, folder })
  }

  function saveNote(id: string, patch: Partial<Parameters<typeof store.updateNote>[1]>) {
    store.updateNote(id, patch)
  }

  function removeNote(id: string) {
    store.deleteNote(id)
  }

  function createFolder(name: string) {
    // a folder is realized once a note references it.
    if (!name.trim()) return
    // if folder not exist, create an empty titled note in that folder then delete title to keep it subtle
    const note = store.createNote({ title: 'New in ' + name, folder: name })
    // leave it as created starter
    return note
  }

  return {
    notes,
    allTags,
    sidebarFolders,
    search,
    createNote,
    saveNote,
    removeNote,
    createFolder,
  }
}
