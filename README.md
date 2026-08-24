# Shruthi Swara Laya website

The website is built with a React + TypeScript frontend and a Node.js + Express + TypeScript API. It remains contact-based: there is no public application form, login, database, or admin portal because the current site does not require them.

## Project structure

| Directory | Purpose |
| --- | --- |
| `src/` | React frontend |
| `public/` | Public images, fonts, audio, and event PDFs |
| `server/src/` | Express API source |
| `server/dist/` | Compiled API output; generated and ignored by Git |

The API currently supplies the featured-event content and a health check. This establishes a clean backend foundation without creating unnecessary user accounts or databases.

## Requirements

- Node.js 20 or later
- npm 10 or later

## Local development

```bash
npm install
npm --prefix server install
```

Start the API in one terminal:

```bash
npm run dev:api
```

Start the frontend in another terminal:

```bash
npm run dev:web
```

Open `http://localhost:5173`. Vite proxies `/api` requests to the local API at `http://localhost:8787`.

## Production build

```bash
npm run build:all
npm run preview
```

`npm run build` writes the frontend to `dist/`; `npm run build:api` writes the API to `server/dist/`.

Deploy the frontend and API separately, or put both behind one reverse proxy. Configure the frontend host to return `index.html` for unknown routes so direct visits to `/events`, `/contact`, and other routes work. In a split deployment, create `.env` from the root `.env.example` before building the frontend, set `VITE_API_URL` to the API's public URL, and configure `server/.env` from `server/.env.example` with the frontend's public URL.

## Content maintenance

| What to update | Where |
| --- | --- |
| Featured upcoming event, date, venue, and resource links | `server/src/siteContent.ts` |
| Featured event PDFs | `public/events/<event-slug>/` |
| Past-event archive | `src/events/past-events.txt` |
| Related organisations | `src/events/relatedOrganizations.ts` |
| Faculty biographies | `src/founders/foundersData.ts` |
| Contact details | `src/contact/ContactPage.tsx` |
| Gallery videos | `src/gallery/GalleryPage.tsx` |

When replacing the featured event, add its documents under a new folder in `public/events/`, then update `server/src/siteContent.ts`. Keep finished events in the past-events archive rather than deleting their files if they remain useful. The frontend keeps a last-known-content fallback so visitors can still read the event page during a temporary API outage.

## Repository hygiene and handover

- Keep source code, assets, and content in Git; never commit `node_modules/`, `dist/`, `.env`, or `server/.env`.
- Do not add `.env` files, SSL/private-key files, hosting backups, databases, server logs, or the legacy PHP/cPanel archive. That archive contains sensitive server material and is not source code for this project.
- Make small commits with clear messages, such as `content: add BAKU 2027 event resources`.
- Run `npm run build:all` before each deployment.
- Keep deployment credentials in the host's secret manager, not in this repository.

## Future editing portal

If Shruthi Swara Laya later needs browser-based editing, add authentication and a CMS/database behind this API. That change should be treated as a separate project because it adds permissions, asset uploads, backups, and hosting configuration.
