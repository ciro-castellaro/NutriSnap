# AI Calorie Tracker

Mobile-first web application for tracking meals and estimating calories and macronutrients from a photo using multimodal AI.

## Stack

* Next.js (App Router) + TypeScript
* Tailwind CSS + shadcn/ui
* PostgreSQL + Prisma
* Auth.js (NextAuth)
* Multimodal AI with fallback between free providers (Gemini → OpenRouter → Groq)
* Installable PWA from a mobile browser

## Requirements

* Node.js 20.9+
* PostgreSQL running locally

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in the required variables (DB, auth, AI API keys)
npm run dev
```

Open http://localhost:3000.

## Project Structure

```text
app/            # routes (App Router): dashboard, meals, settings, api/analyze-food
components/     # UI components (ui/, meals/, nutrition/, dashboard/)
lib/            # business logic: ai/, db/, auth/, nutrition/
prisma/         # schema and migrations
types/          # shared types
```

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run lint     # ESLint
```
