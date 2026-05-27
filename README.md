# ClipCraft MVP

ClipCraft is a lean MVP for a mobile-first short-form video editing app. Creators can manage projects, upload source videos, trim clips, generate AI-style captions, add overlays, choose background music, and export 9:16 videos for TikTok, Reels, and Shorts.

## Stack

- Frontend: Next.js 14, TypeScript, Tailwind, Clerk auth
- Backend: FastAPI, SQLAlchemy, PostgreSQL
- Data model: users, projects, videos, templates
- Integrations prepared: Firebase Auth identity, Whisper API key, Supabase client

## Project structure

```text
frontend/   Next.js app, landing page, protected dashboard, Clerk routes
backend/    FastAPI app, database models, auth routes, video/project API
docker-compose.yml  Local PostgreSQL + backend
.env.example        Required environment variables
```

## Local setup

```bash
cp .env.example .env
docker compose up --build
```

Run frontend separately:

```bash
cd frontend
npm install
npm run dev
```

Backend runs at `http://localhost:8000`. Frontend runs at `http://localhost:3000`.

## Core API

- `POST /auth/register` — create user from Firebase UID and email
- `POST /auth/login` — fetch user by Firebase UID
- `GET /auth/me?firebase_uid=...` — current user lookup
- `POST /api/projects` — create editing project
- `GET /api/projects` — list projects
- `POST /api/videos` — attach uploaded video URL to project
- `PATCH /api/videos/{video_id}/trim` — save trim points
- `POST /api/videos/{video_id}/captions` — generate demo Whisper-style captions
- `POST /api/videos/{video_id}/overlays` — add text overlay
- `PATCH /api/videos/{video_id}/music` — choose music track
- `POST /api/videos/{video_id}/export` — mark video exported as 9:16 MP4
- `GET /api/templates` — list starter edit templates

## Six build rounds

1. Project scaffold
2. Auth + user model
3. Video upload + trim
4. AI captions integration path
5. Export pipeline path
6. Polish + deploy readiness

## Deployment notes

Deploy frontend to Vercel or any Next.js host. Deploy backend to Vercel Python/FastAPI or container host with `DATABASE_URL`, `CORS_ORIGINS`, `FIREBASE_PROJECT_ID`, and `WHISPER_API_KEY` configured.
