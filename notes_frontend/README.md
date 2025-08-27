# Notes Frontend (Nuxt 3)

Minimalistic light-theme notes application with:
- User authentication (mock, localStorage)
- Create, read, update, delete notes
- Organize by folders and tags
- Search and filter (starred, recent, archived)
- Responsive layout with header, sidebar, and main content

Colors:
- Primary: #1976d2
- Secondary: #424242
- Accent: #ffca28

## Setup

Install dependencies:
```bash
npm install
```

## Development

Start dev server at http://localhost:3000
```bash
npm run dev
```

## Production

Build and preview:
```bash
npm run build
npm run preview
```

## Notes

- Authentication is mocked; any email/password combination logs in.
- Data is stored in localStorage (`notes_data_v1`). Clearing browser storage resets data.
- Pinia is used for state management.
