# Architecture

Venviewer Lite is one Next.js App Router application. Server components read
Prisma directly; server actions own every mutation. Client components are
limited to form pending state, confirmation, and clipboard interaction.

## Routes

- `/[slug]` renders published tours with a title and loading-aware Kuula viewer.
- `/embed/[slug]` renders the loading-aware viewer and is embeddable.
- `/admin/login` authenticates the configured administrator email against its
  bcrypt password hash.
- `/admin/tours`, `/admin/tours/new`, and `/admin/tours/[id]` require a valid
  server-checked session. `/admin` redirects to the list.

The Prisma `Tour` model is the complete persisted domain model. No user or
session records are stored. PostgreSQL is the default production provider in
`prisma/schema.prisma`; local SQLite schema and migrations live under
`prisma/sqlite`.

## Request boundaries

`proxy.ts` gives each browser a CSRF token and adds CSP and security headers.
Actions verify the token, configured-base-URL origin, and administrator session.
Sessions are signed, expiring, HttpOnly cookies. Public and embed lookups always
return a clear inaccessible state for drafts and call Next.js `notFound` for
unknown slugs.
