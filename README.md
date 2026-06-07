# NeuroLearn

NeuroLearn is an AI-powered learning accountability platform for students. It helps learners plan daily study tasks, maintain streaks, write learning reflections, receive AI evaluations, answer AI-generated questions, and track measurable improvement over time.

## Tech Stack

- Frontend: React.js, Tailwind CSS, Recharts
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT
- AI: OpenAI API via configurable backend service

## Folder Structure

```text
NeuroLearn/
  backend/
    app.js
    server.js
    config/db.js
    controller/                 # existing auth/learning/tracking controllers
    controllers/                # planner, journal, analytics, admin APIs
    middleware/authMiddleware.js
    models/
      User.js
      Task.js
      LearningJournal.js
      AIEvaluation.js
      Question.js
      Answer.js
      Streak.js
      Achievement.js
      Analytics.js
    prompts/aiPrompts.js
    routes/
    services/
      openaiService.js
      streakService.js
  frontend/
    src/
      components/
      hooks/
      lib/api.ts
      pages/
        AuthPage.tsx
        Dashboard.tsx
        PlannerPage.tsx
        JournalPage.tsx
        AnalyticsPage.tsx
        RecommendationsPage.tsx
        CalendarPage.tsx
        ProfilePage.tsx
        AdminPage.tsx
  docs/
    DEPLOYMENT.md
```

## Core Modules

1. Authentication: registration, login, logout, forgot password token generation, profile management.
2. Daily Learning Planner: create, edit, complete, delete, prioritize, and summarize daily tasks.
3. Daily Learning Journal: submit reflections with study minutes, date, time, and user ID.
4. AI Reflection Evaluation: score out of 10, concepts, feedback, improvement areas, and understanding type.
5. AI Question Generation: 3 easy, 2 medium, and 1 hard question from the journal.
6. AI Answer Evaluation: marks, corrections, mistake explanations, and feedback.
7. Streaks and Achievements: current/longest streaks, monthly consistency, Bronze/Silver/Gold/Champion badges.
8. Analytics Dashboard: learning hours, task completion, journal count, AI scores, charts.
9. Smart Recommendations: weak topics, revision goals, tomorrow goals, study duration, weekly AI summary.
10. Admin Dashboard: total users, active users, platform statistics, user management.

## MongoDB Collections

- `users`
- `tasks`
- `learningjournals`
- `aievaluations`
- `questions`
- `answers`
- `streaks`
- `achievements`
- `analytics`

## REST API Summary

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`

### Tasks

- `GET /api/tasks?date=YYYY-MM-DD`
- `POST /api/tasks`
- `GET /api/tasks/summary/today`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Journals and AI

- `GET /api/journals`
- `POST /api/journals`
- `GET /api/journals/:id`

When a journal is created, the backend evaluates the reflection and generates questions automatically.

### Answers

- `GET /api/answers`
- `POST /api/answers/:questionId`

### Analytics, Recommendations, Admin

- `GET /api/analytics`
- `GET /api/recommendations`
- `GET /api/admin/stats`
- `GET /api/admin/users`
- `PUT /api/admin/users/:id/role`

## Environment Variables

Create `backend/.env`:

```bash
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

The AI service includes a local fallback for demo mode, but production should use `OPENAI_API_KEY`.

## Running Locally

Backend:

```bash
cd backend
npm install
npm start
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL, usually `http://localhost:8080` or `http://localhost:8081`.

## HR Demo Path

If MongoDB Atlas blocks login because the current IP is not whitelisted, use **Open HR Demo** on the login page. It lets reviewers see the planner, journal, AI evaluation demo, analytics, recommendations, calendar, profile, and admin screens without database friction.

## Notes

- The backend uses JWT auth and protects student routes.
- Admin APIs require a user with `role: "admin"`.
- Recharts powers the analytics graphs.
- The app uses a modern dark UI with purple accents and responsive dashboard layouts.
