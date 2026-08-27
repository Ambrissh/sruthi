# Shruthi Swara Laya — baseline migration

This is a static React and TypeScript migration of the existing public Shruthi Swara Laya website. It intentionally retains the original pages, content, image-based navigation, and fixed-width visual presentation. No new pages, content, administration features, database, login, or backend are included.

## Run locally

```bash
npm install
npm run dev
```

## Verify a production build

```bash
npm run build
```

The site is static and can be deployed to Vercel or any static hosting service. The `vercel.json` rule allows direct links to legacy page paths such as `/about.php` and `/events.php`.

## Security and handover

- Only public website content, images, and linked documents are included.
- No PHP runtime, database connection, API, credentials, SSL keys, hosting backups, server logs, mail data, or `.env` files are included.
- Keep the supplied cPanel/PHP archive outside this repository; it contains private hosting material and is not part of the migrated application.
