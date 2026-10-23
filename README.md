# buildsync.ai

This is the official repo of buildsync.ai

## Development

Next.js (App Router) marketing site. Homepage lives in `app/(marketing)/page.tsx`.

```
npm install
npm run dev     # http://localhost:3000
npm run build
```

Pricing slots read from `lib/site.ts` (`{{PRICE}}` until final). The workspace
previews are SVG stand-ins (`components/WorkspaceMock.tsx`) until the real
workspace screenshots / `<Workspace demo />` are available.
