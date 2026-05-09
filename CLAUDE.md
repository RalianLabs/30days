# CLAUDE.md - 30Days (try30days)

## Proyecto

Digital detox challenge de 30 días con accountability partners. **No es app**, es:

- Emails diarios guiando el detox
- Accountability partner matching (parejas reales)
- Comunidad privada (Discord/Telegram)
- Weekly check-ins

**Live**: https://30days.ralianlabs.com (también `30days-drab.vercel.app`)
**GitHub**: https://github.com/RalianLabs/30days
**Vercel scope**: ralianlabs-projects
**Beehiiv**: try30days.beehiiv.com (free tier 2,500 subs)
**Notion**: https://www.notion.so/30Days-3303ad4ed9e280c0a4ebda7f159db78e

## Stack (todo gratis)

- Landing: HTML/CSS en Vercel
- Email/waitlist: Beehiiv (API V2)
- Formulario qualifying: Tally.so (form `81G5e5`)
- Pagos: Stripe Payment Links
- Comunidad: Discord (canales privados por pareja)
- Analytics: Vercel Analytics
- Serverless: `/api/subscribe.js` → Beehiiv API

## Tipografía

- Títulos: Plus Jakarta Sans (800)
- Cuerpo: Inter (400, 500, 600)

## Tono de marca: honesto-cómplice

Ni suave/wellness ni sermón radical. Como un amigo que te dice la verdad sin juzgarte. Irónico, directo, humano.

**Copy validado por Adrian**:
- "Tu móvil fue diseñado para que no lo sueltes. No eres débil. Solo estás solo contra un algoritmo."
- "Ya has intentado Screen Time limits. Los ignoras en 2 toques."
- "No es tu culpa. Pero sí es tu problema."

## Pricing

- Free waitlist (90% signups)
- Founding Member $19 (primeros 100): lifetime community + badge + input
- Post-launch: $29 challenge / $9/mes comunidad

## Modelo cohort

- Acumular gente en waitlist 2-3 semanas
- Fecha fija de arranque ("Cohort #1 arranca 15 abril")
- Matching manual día antes (Google Sheets por timezone)
- Email presentación con partner + link Discord
- Todos empiezan el mismo día, como una clase

## Datos Beehiiv

- Publication ID (API V2): `pub_0d2b52bf-8988-4372-8a43-d15cb642e851`
- Embed form ID: `dba0921d-d2f8-4d26-ba14-22c14b39f292`
- Handle: try30days
- API Key en Vercel env var `BEEHIIV_API_KEY`
- Integración Beehiiv RESUELTA (27 marzo 2026): serverless `/api/subscribe.js` → Beehiiv API

## Distribución (30 min/día)

1. Reddit 60%: r/nosurf (700K), r/digitalminimalism (300K), r/getdisciplined (1M+)
2. Twitter/X 15%: #buildinpublic, 1 tweet/día (handle PERSONAL Adrian con "building 30Days")
3. TikTok/Shorts 15%: faceless, screen recordings, texto en fondo negro
4. Product Hunt: upcoming page, launch con 200+ signups

## Métricas green light

- >10% conversion landing
- >50 signups o 5 founding members pagando
- Posts Reddit 50+ upvotes

## Convenciones

- **No em dashes** (Adrian dice que gritan AI)
- Idioma de chat con Adrian: **español**
- Tono honesto-cómplice en todo el copy
