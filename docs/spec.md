# Functional Specification: Second Brain Snippet Manager

## 1. Overview

A lightweight, high-performance web application for developers to store, tag, and search code snippets, technical notes, and reference images.

## 2. Target Audience

Developers and researchers who need a persistent, searchable "external memory" for technical knowledge.

## 3. Core Features

### 3.1 Snippet Management

- **Create/Read/Update/Delete (CRUD):** Users can manage code snippets with titles, descriptions, and syntax highlighting.
- **Rich Text/Markdown:** Support for Markdown in the description field.
- **Categories & Tags:** Organize snippets by language (e.g., Python, SQL) or project name.

### 3.2 Advanced Search

- **Full-Text Search:** Implementation of PostgreSQL tsvector for fast searching across titles, tags, and code content.
- **Filter by Language:** Quick filtering based on the programming language.

### 3.3 Media Attachments

- **Image Uploads:** Ability to attach screenshots or diagrams to a snippet (via Supabase Storage).

### 3.4 Security & Access

- **Authentication:** Google OAuth and Email/Password sign-in.
- **Privacy (RLS):** Every snippet is private to the creator by default. Users cannot see or modify others' snippets.

## 4. Technical Stack

- **Frontend:** React (Vite), Tailwind CSS, Lucide React (Icons).
- **Backend:** Supabase (PostgreSQL, Auth, Storage).
- **Documentation:** Markdown-based ADRs and specs.
