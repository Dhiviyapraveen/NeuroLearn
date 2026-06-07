# NeuroLearn Deployment Guide

## 1. Prepare MongoDB

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Add your deployment server IP to Network Access.
4. Copy the connection string into `MONGO_URI`.

## 2. Backend Deployment

Recommended platforms: Render, Railway, Fly.io, or a VPS.

Set environment variables:

```bash
PORT=3001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
```

Commands:

```bash
cd backend
npm install
npm start
```

Health check:

```text
GET /api/health
```

## 3. Frontend Deployment

Recommended platforms: Vercel, Netlify, or static hosting.

Build:

```bash
cd frontend
npm install
npm run build
```

Deploy the `frontend/dist` folder.

Update the API base URL in `frontend/src/lib/api.ts` for production:

```ts
baseURL: 'https://your-backend-domain.com/api'
```

For a stronger production setup, move the API URL into a Vite env variable:

```bash
VITE_API_URL=https://your-backend-domain.com/api
```

## 4. OpenAI Setup

The backend calls the OpenAI API from `backend/services/openaiService.js`.

Use server-side calls only. Do not expose `OPENAI_API_KEY` in the frontend.

AI workflows:

- Journal submission -> AI reflection evaluation
- Journal evaluation -> AI question generation
- Question answer -> AI answer evaluation
- Recommendation page -> AI weekly summary

## 5. Production Checklist

- Use a strong `JWT_SECRET`.
- Whitelist the backend server IP in MongoDB Atlas.
- Configure CORS for only your frontend domain.
- Store secrets in platform environment variables.
- Create the first admin user by setting `role: "admin"` in MongoDB.
- Enable HTTPS.
- Add monitoring/logging for backend errors.
- Consider rate limiting AI routes to control cost.
- Consider code-splitting frontend chart pages if bundle size matters.

## 6. Suggested Future Enhancements

- Email-based password reset instead of returning a demo token.
- Real reminder notifications using email, push, or cron jobs.
- PDF export using a backend PDF service.
- Teacher/admin cohort dashboards.
- Fine-grained rubric settings for AI evaluation.
