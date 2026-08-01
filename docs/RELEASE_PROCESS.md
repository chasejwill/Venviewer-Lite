# Release process

1. Confirm the intended version in `package.json` and `VERSION`.
2. Update `RELEASE_NOTES.md`.
3. Run `pnpm install --frozen-lockfile` and `pnpm verify`.
4. Review database migrations and test them against a disposable database using
   the deployment commands.
5. Back up production, apply migrations once, then deploy the immutable build.
6. Smoke-test login, logout, draft visibility, publishing, public links, and an
   embed on an external origin.
7. Tag the verified commit using `vMAJOR.MINOR.PATCH`.

Do not release with placeholder secrets or seed production data. Roll back the
application artifact when needed; restore from the pre-migration backup if a
database migration cannot remain forward-compatible.
