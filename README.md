# AI Calorie Tracker

Aplicación web mobile-first para registrar comidas y estimar calorías y macronutrientes a partir de una foto, usando IA multimodal.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- PostgreSQL + Prisma
- Auth.js (NextAuth)
- IA multimodal con fallback entre proveedores gratuitos (Gemini → OpenRouter → Groq)
- PWA instalable desde el navegador del celular

## Requisitos

- Node.js 20.9+
- PostgreSQL corriendo localmente

## Getting started

```bash
npm install
cp .env.example .env.local   # completar las variables (DB, auth, claves de IA)
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Estructura

```text
app/            # rutas (App Router): dashboard, meals, settings, api/analyze-food
components/     # componentes UI (ui/, meals/, nutrition/, dashboard/)
lib/            # lógica de negocio: ai/, db/, auth/, nutrition/
prisma/         # schema y migraciones
types/          # tipos compartidos
```

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run lint     # ESLint
```
