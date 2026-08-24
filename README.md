# Shruthi Swara Laya website

A static, responsive website for Shruthi Swara Laya, built with React and TypeScript. It has no login, database, or backend: public content is stored in the repository and deployed as static files.

## Requirements

- Node.js 20 or later
- npm 10 or later

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

`npm run build` writes the deployable static site to `dist/`. Upload the contents of `dist/` to any static host. Configure the host to return `index.html` for unknown paths so direct visits to `/events`, `/contact`, and other routes work.

## Content maintenance

| What to update | Where |
| --- | --- |
| Featured upcoming event, date, venue, and resource links | `src/events/featuredEvent.ts` |
| Featured event PDFs | `public/events/<event-slug>/` |
| Past-event archive | `src/events/past-events.txt` |
| Related organisations | `src/events/relatedOrganizations.ts` |
| Faculty biographies | `src/founders/foundersData.ts` |
| Contact details | `src/contact/ContactPage.tsx` |
| Gallery videos | `src/gallery/GalleryPage.tsx` |

When replacing the featured event, add its documents under a new folder in `public/events/`, then update `src/events/featuredEvent.ts`. Keep finished events in the past-events archive rather than deleting their files if they remain useful.

## Repository hygiene and handover

- Keep source code, assets, and content in Git; never commit `node_modules/` or `dist/`.
- Do not add `.env` files, SSL/private-key files, hosting backups, databases, server logs, or the legacy PHP/cPanel archive. That archive contains sensitive server material and is not source code for this project.
- Make small commits with clear messages, such as `content: add BAKU 2027 event resources`.
- Run `npm run build` before each deployment.
- Keep deployment credentials in the host's secret manager, not in this repository.

## Future editing portal

The current site is intentionally static. If Shruthi Swara Laya later needs browser-based editing, a CMS can replace these local content files without requiring a visual rebuild. That change should be treated as a separate project because it adds authentication, content permissions, asset uploads, and hosting configuration.
