# Ambit — MVP SaaS para jóvenes ambiciosos (18-25)

MVP real y monetizable: finanzas personales + productividad + objetivos + coach IA.

## 1) Arquitectura completa (simple, escalable y rápida)

### Arquitectura de alto nivel
- **Frontend:** Next.js (App Router) + TypeScript + Tailwind.
- **Backend:** API Routes de Next.js (BFF ligero) para lógica sensible y OpenAI.
- **Base de datos:** Supabase Postgres + RLS por usuario.
- **Auth:** Supabase Auth (email magic link + OAuth opcional).
- **IA:** OpenAI vía endpoint seguro (`/api/ai/insights`).
- **Deploy:** Vercel (web) + Supabase (DB/Auth/Storage).

### Principios técnicos de startup
- MVP en una sola app (monorepo simple) para velocidad.
- Dominio modular por features (`finance`, `goals`, `ai`) para escalar sin reescribir.
- Evitar microservicios hasta >50k MAU.
- Server-side para datos iniciales + client components para interacción rápida.

---

## 2) Estructura profesional de carpetas

```txt
src/
  app/
    (dashboard)/
      page.tsx
    api/
      ai/insights/route.ts
    globals.css
    layout.tsx
  components/
    dashboard/
      finance-summary.tsx
      goals-overview.tsx
      ai-insights.tsx
    ui/
      card.tsx
      progress-ring.tsx
  lib/
    ai/
      insight-prompt.ts
      openai-client.ts
    supabase/
      client.ts
      server.ts
    utils/
      cn.ts
  types/
    domain.ts
supabase/
  schema.sql
```

---

## 3) Modelo de datos (tablas clave)

Diseñado para monetizar sin sobrecargar el MVP:
- `profiles`: info del usuario, plan free/pro.
- `transactions`: ingresos/gastos categorizados.
- `goals`: metas financieras y hábitos.
- `goal_logs`: seguimiento diario y streaks.
- `ai_insights`: historial de insights para retención.

> Ver SQL completo en `supabase/schema.sql`.

---

## 4) Cómo conectar Supabase

1. Crear proyecto en Supabase.
2. Ejecutar `supabase/schema.sql` en SQL Editor.
3. Configurar variables de entorno:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

4. Usar cliente browser en UI y cliente server en rutas seguras.

Archivos:
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`

---

## 5) Cómo conectar OpenAI

1. Crear API key.
2. Añadir variable:

```bash
OPENAI_API_KEY=...
```

3. Llamar OpenAI solo desde servidor (API route), nunca desde frontend.
4. Enviar contexto mínimo (agregado mensual + top categorías + progreso metas).

Archivos:
- `src/lib/ai/openai-client.ts`
- `src/lib/ai/insight-prompt.ts`
- `src/app/api/ai/insights/route.ts`

---

## 6) Roadmap MVP en 7 días

### Día 1 — Fundación
- Setup Next + Tailwind + TypeScript.
- Supabase Auth + schema + RLS.
- Layout dashboard dark mode.

### Día 2 — Finanzas base
- CRUD transacciones.
- Categorización automática simple por keyword.
- KPI: gasto mes, ingreso mes, restante.

### Día 3 — Visualización
- Gráfica de gasto por categoría y tendencia semanal.
- Predicción simple fin de mes (proyección lineal).

### Día 4 — Objetivos y hábitos
- Crear metas.
- Tracking diario + streak.
- Barra/ring de progreso.

### Día 5 — IA útil (no gimmick)
- Endpoint de insights.
- 3 consejos accionables + 1 alerta de gasto inútil.
- Historial de insights.

### Día 6 — Monetización y retención
- Limitar free tier (p. ej., 5 insights/mes).
- Paywall suave para Pro.
- Notificación semanal por email (resumen IA).

### Día 7 — Calidad + Deploy
- Pulido UX (loading states, empty states).
- Métricas básicas (activation, WAU/MAU, retention D7).
- Deploy Vercel + pruebas finales.

---

## 7) Priorización real de desarrollo

### P0 (imprescindible)
1. Auth + DB segura.
2. Registro transacciones rápido (<10s).
3. Dashboard con restante mensual claro.
4. 1 insight IA verdaderamente accionable.

### P1 (alta prioridad)
1. Metas + streaks.
2. Predicción mensual simple.
3. Gráficas premium.

### P2 (post-MVP)
1. Integraciones bancarias.
2. IA conversacional continua.
3. Automatizaciones avanzadas.

---

## 8) Decisiones de monetización y retención

- **Monetización inicial:** freemium.
  - Free: tracking + dashboard base + insights limitados.
  - Pro ($6-$10/mes): insights ilimitados, proyección avanzada, metas inteligentes.
- **Loops de retención:**
  - streaks diarios,
  - resumen semanal IA,
  - alertas de sobre-gasto.
- **Métrica norte:** `% usuarios activos que registran >=3 transacciones/semana`.

---

## 9) Ejecutar local

```bash
npm install
npm run dev
```

Abrir: `http://localhost:3000`

---

## Estado actual del código (iteración 2)

- Registro de transacciones en UI con categorización automática por texto.
- Cálculo en vivo de ingresos, gastos y dinero restante.
- Predicción simple de gasto fin de mes (proyección lineal).
- Objetivos con progreso y acción rápida `+$10` para mantener streak.
- Botón de análisis IA que llama al endpoint server `/api/ai/insights`.

## Troubleshooting rápido (si te salen errores de tipos)

Si ves errores como `Cannot find module 'next'` o JSX sin tipos:

1. El problema normalmente es que no se instalaron dependencias.
2. Ejecuta:

```bash
rm -rf node_modules package-lock.json
npm cache verify
npm install
npm run typecheck
```

3. Si estás detrás de proxy/corporate network, revisa tus variables de npm:

```bash
npm config get proxy
npm config get https-proxy
```
