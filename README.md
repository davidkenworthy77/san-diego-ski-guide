# San Diego Ski Guide

The independent guide to ski resorts near San Diego — rankings, reviews, and news
covering Mirage Mountain and every ski destination in Southern California.

Live site: [sandiego.theskiawards.com](https://sandiego.theskiawards.com)

## Tech

React 19 + Vite + Tailwind 4, routed with React Router 7, with `react-helmet-async`
for per-page SEO.

## Run locally

Prerequisites: Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev
```

The dev server listens on `http://localhost:3000`.

## Scripts

| Script          | What it does                       |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the dev server (tsx + Vite)  |
| `npm run build` | Production build to `dist/`        |
| `npm run preview` | Serve the production build        |
| `npm run lint`  | Type-check with `tsc --noEmit`     |
