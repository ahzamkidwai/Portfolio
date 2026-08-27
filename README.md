# Ahzam Naseem Kidwai — Portfolio

A production-quality personal portfolio built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **React Three Fiber**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Before you deploy

1. **Add your resume**: drop your resume PDF at `public/resume.pdf` (or update `personal.resumeUrl` in `src/lib/data/personal.ts` to point elsewhere).
2. **Add a favicon and OG image**: `public/favicon.ico` and `public/og-image.png` (1200×630). Referenced in `src/app/layout.tsx` and `src/lib/data/personal.ts`.
3. **Set your site URL**: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`.
4. **Connect an email provider** (optional): the contact form posts to `src/app/api/contact/route.ts`, which is intentionally provider-agnostic. Plug in Resend, SendGrid, Postmark, or SMTP there using server-side env vars — never expose API keys to the client.

## Project structure

```
src/
  app/                  App Router pages, layout, SEO (sitemap/robots), API routes
  components/
    layout/             Navbar, Footer, ScrollProgress, CommandPalette
    sections/           One component per page section (Hero, About, Experience, ...)
    ui/                 Reusable primitives (Button, Card, SectionHeading, Container)
    3d/                 Three.js / React Three Fiber node-graph scene + safe wrapper
    effects/            Cursor glow, background grid
  lib/
    data/               All content lives here — edit these files to update the site
    types.ts            Shared TypeScript types for content data
    utils.ts            Small helpers (className merging)
  hooks/                useActiveSection, useMediaQuery, usePrefersReducedMotion
```

## Updating content

All personal information, experience, projects, skills, education, and achievements live in `src/lib/data/*.ts`. Edit those files directly — no component logic needs to change.

**Projects** (`src/lib/data/projects.ts`) currently combine facts extracted from the provided resume and the pinned repositories on `github.com/ahzamkidwai`. A couple of notes:

- `IntelliRAG` exists on GitHub but isn't pinned, so its `githubUrl` is left `undefined` — add the repo link once you have it.
- GitHub metrics (stars/forks) reflect what was publicly visible on the profile at the time this was built; the **GitHub Activity** section additionally fetches live repo/follower counts client-side from the public GitHub API and fails gracefully if the request is unavailable.

## Notable implementation details

- **3D visualization** (`src/components/3d/`): a lightweight node-graph (Software → Data → AI → Agents → Applications) rendered with React Three Fiber, used both ambiently in the hero and interactively in the "Systems View" section. It checks for WebGL support, respects `prefers-reduced-motion`, and falls back to a static text summary on unsupported devices or small screens.
- **Command palette**: press `Cmd/Ctrl + K` to quickly jump to a section, open GitHub/LinkedIn, or view the resume.
- **Accessibility**: semantic landmarks, visible focus rings, keyboard-navigable modal (project details) and command palette, `prefers-reduced-motion` support throughout, and a skip-to-content link.
- **Contact form**: client-side validation (name/email/subject/message) posts JSON to `/api/contact`, which is provider-agnostic by design.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run typecheck` — TypeScript check with no emit
- `npm run lint` — ESLint
