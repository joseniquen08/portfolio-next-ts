# CLAUDE.md

Guidance for Claude Code (and future contributors) when working in this repo.

## Admin module: Server Action auth (MANDATORY)

Every `"use server"` function under `src/app/(admin)/admin/(protected)/**/actions.ts`
MUST start with:

```ts
const supabase = await requireAdmin();
```

(`requireAdmin()` lives in `src/lib/supabase/server.ts`.) Do NOT use `createClient()`
directly in these files.

**Why this is non-negotiable:** Next.js Server Actions are invoked by an action ID
resolved from a build-wide manifest, not scoped to the page/layout that renders them.
A POST carrying a valid action ID executes the function regardless of the request's
URL — so the `(protected)` layout's session check (which only runs when that layout
is part of the render tree) does **not** protect Server Actions. Each action must
self-authenticate. This exact gap existed in this codebase (fixed in commit
`e0fffce`, tightened further for `savePreference`) — do not reintroduce it in new
admin modules.

## Supabase schema changes

The database schema is tracked in `supabase/migrations/` (baseline captured
2026-07-18 via `pg_dump` against the linked project). Project ref is `dzvjivnnziuqwkghddyu`
(name: `portafolio`).

- New schema changes: `supabase migration new <name>`, write the SQL, then
  `supabase db push --linked` (requires `supabase link --project-ref dzvjivnnziuqwkghddyu`
  once per machine).
- Every new table needs RLS enabled + an owner-scoped policy, mirroring the existing
  pattern: `using (user_id = auth.uid()) with check (user_id = auth.uid())`.
- Do NOT apply schema changes by hand in the SQL Editor without also committing the
  same SQL as a migration file — a manually-applied, uncommitted DDL (`income_entries`)
  went unnoticed for weeks until a security audit caught the table simply didn't exist
  in production. Migrations are the source of truth, not memory/docs.
- After hand-applying anything urgent, run `supabase migration repair --status applied <version> --linked`
  so the remote migration history matches the committed migration file.

## Env vars

See `.env.example`. `ADMIN_EMAIL` is the single-admin allowlist checked by both the
`(protected)` layout and `requireAdmin()` — the two independent auth boundaries in
the admin module.
