# AutoMex Frontend – React + Vite + Tailwind

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (make sure Django is running on port 8000)
npm run dev
```

Open http://localhost:5173

## Folder Structure

```
src/
├── pages/
│   ├── Home.jsx       ← Hero, Services, Projects, Testimonials, CTA
│   ├── About.jsx      ← Company info, Stats, Team
│   ├── Services.jsx   ← Full services grid
│   ├── Projects.jsx   ← Filterable projects grid
│   ├── Contact.jsx    ← Contact form + info
│   └── NotFound.jsx
├── components/
│   ├── layout/
│   │   └── Layout.jsx ← Navbar + Footer (shared)
│   └── ui/
│       └── index.jsx  ← Spinner, SectionHeading, Badge, MediaImage, etc.
├── lib/
│   ├── api.js         ← All Django API calls (axios)
│   └── useInView.js   ← Scroll reveal hook
├── App.jsx            ← Router
├── main.jsx
└── index.css          ← Tailwind + global styles
```

## API Endpoints Used

| Page     | Endpoint            |
|----------|---------------------|
| Home     | GET /api/home/      |
| About    | GET /api/about/     |
| Services | GET /api/services/  |
| Projects | GET /api/projects/  |
| Contact  | POST /api/contact/  |

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy to Vercel, Netlify, or any static host.

## Environment Variables

Copy `.env` and update for production:
```
VITE_API_URL=https://your-django-backend.com/api
```
