# ADR 003: Data Fetching and State Management

## Status

Proposed

## Context

The application needs to handle asynchronous data from Supabase (snippets, tags, and file URLs). We need a strategy that handles loading states, error handling, and—most importantly—caching, so that navigating between snippets feels instantaneous.

## Decision

We will use **TanStack Query (React Query)** in conjunction with the **Supabase JS Client**.

### Rationale

- **Declarative Code:** Moves fetching logic out of `useEffect` and into clean, reusable hooks.
- **Caching & Stale-While-Revalidate:** Snippets will be cached in memory. If a user views a snippet and comes back to it, it loads instantly while the app checks for updates in the background.
- **Optimistic Updates:** When a user creates a new snippet, it will appear in the list immediately before the database confirms the "Save," making the app feel like a local desktop application.
- **Search Integration:** React Query makes "search-as-you-type" easy to implement with debouncing and query keys.

### Implementation Pattern

- **Supabase Client:** Acts as the "Data Requester."
- **React Query:** Acts as the "Data Manager."

Example Hook Structure:
`useSnippets()` -> Calls Supabase `select` -> Wrapped in React Query `useQuery`.
