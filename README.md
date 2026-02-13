# Second Brain Snippet Manager

A web application for managing and organizing code snippets using Supabase backend and Gemini CLI integration.

## Features

- **Create/Read/Update/Delete (CRUD) snippets**
- **Rich Text/Markdown** descriptions
- **Categories & Tags** for organizing snippets
- **Full-Text Search** with caching and debouncing
- **Image Uploads** with Supabase Storage
- **Authentication** with Google OAuth and Email/Password sign-in
- **Privacy (RLS)**: Every snippet is private to the creator by default. Users cannot see or modify others' snippets.

![react frontend](react.webp "React Js")
![supabase backend](supabase.webp "Supabase")

## Technology Stack

- **Frontend**:
  - React 19 + TypeScript
  - Vite (build tool)
  - Tailwind CSS (styling)
  - ESLint (code quality)
  - PostCSS + Autoprefixer (CSS processing)
- **Backend**: Supabase (PostgreSQL database with RLS)
- **AI Integration**: Google Gemini CLI
- **Package Manager**: npm

## Development Workflow

Use Claude Code to help with:

- Frontend development tasks (React, TypeScript, Vite)
- Database schema design and migrations
- Feature implementation
- Bug fixes and debugging
- Code refactoring
