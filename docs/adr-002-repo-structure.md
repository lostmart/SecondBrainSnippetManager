# ADR 002: Repository Structure

## Status

Proposed

## Context

We need a structure that supports a React frontend and a Supabase backend while keeping documentation and database migrations organized. We want to avoid a "flat" structure where config files for different tools clutter the root directory.

## Decision

We will adopt a **Monolithic Repository (Monorepo)** pattern. Even though Supabase is a BaaS, we will treat the database configuration, seed scripts, and Edge Functions as a "backend" entity.

### Directory Layout

```text
/
├── docs/               # Architectural decisions, specs, and diagrams
├── frontend/           # React (Vite) application
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/      # Custom hooks for Supabase logic
│   │   ├── lib/        # Supabase client initialization
│   │   └── types/      # TypeScript definitions
│   └── public/
├── supabase/           # Supabase CLI configuration
│   ├── migrations/     # SQL files for version-controlled schema
│   ├── functions/      # Supabase Edge Functions (Deno)
│   └── seed.sql        # Initial data for local development
├── .gitignore          # Root ignore file
└── README.md           # Project entry point
```
