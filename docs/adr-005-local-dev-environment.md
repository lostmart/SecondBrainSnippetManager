# ADR 005: Local Development Environment

## Status

Accepted

## Context

We need a consistent way to develop and test database changes without affecting a production instance.

## Decision

We will use the **Supabase CLI** powered by **Docker**.

### Local Commands

- `npx supabase start`: Launches the local containers.
- `npx supabase stop`: Shuts down the local stack.
- `npx supabase status`: View local credentials and URLs.
- `npx supabase db reset`: Resets the local database to the current migration state.

### Tools Included

- **Supabase Studio:** Accessible at `localhost:54323`.
- **In-bucket Emails:** Accessible via Inbucket at `localhost:54324` (to test local sign-ups).
