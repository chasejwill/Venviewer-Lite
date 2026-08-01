# Architecture

Venviewer Lite is one Next.js App Router application. Server components read
Prisma directly; server actions own every mutation. Client components are
limited to form pending state, confirmation, and clipboard interaction.

## Routes

- `/[slug]` fills the viewport with one centered gradient title header and a
  loading-aware Kuula viewer in the remaining space.
- `/embed/[slug]` renders only the full-dimension loading-aware viewer and is
  embeddable.
- `/admin/login` authenticates the configured administrator email against its
  bcrypt password hash.
- `/admin/tours`, `/admin/tours/new`, and `/admin/tours/[id]` require a valid
  server-checked session. `/admin` redirects to the list.

The Prisma `Tour` model is the complete persisted domain model. No user or
session records are stored. PostgreSQL is the default production provider in
`prisma/schema.prisma`; local SQLite schema and migrations live under
`prisma/sqlite`.

## Request boundaries

`proxy.ts` gives each browser a CSRF token, adds security headers, and redirects
unauthenticated admin document requests before rendering. Pages and actions
still verify authorization; actions also verify the token and configured-base-
URL origin. Sessions are signed, expiring, HttpOnly cookies. Public and embed
metadata resolve unknown tours through Next.js `notFound` before document
streaming. Public metadata uses `VENVIEWER_LITE_BASE_URL` for its canonical URL;
drafts are marked `noindex` and return a clear inaccessible state without a
player.

Kuula remains the cross-origin renderer and owns all content inside its iframe,
including any title, branding, or controls it displays. Venviewer Lite neither
inspects nor conceals that content. Configure Kuula-owned UI through official
Kuula export/share settings, then store the resulting share URL on the tour.
