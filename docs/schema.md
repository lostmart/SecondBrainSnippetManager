# Database Schema: Second Brain

## 1. Entity Relationship Diagram (Conceptual)

[Users] 1 --- ∞ [Snippets]
[Snippets] 1 --- ∞ [Tags]
[Snippets] 1 --- ∞ [Attachments]

## 2. Tables

### 2.1 `profiles` (Managed via Supabase Auth triggers)

| Column       | Type      | Description              |
| :----------- | :-------- | :----------------------- |
| `id`         | uuid (PK) | References auth.users.id |
| `username`   | text      | Unique display name      |
| `avatar_url` | text      | Link to profile picture  |
| `updated_at` | timestamp | Last profile update      |

### 2.2 `snippets`

| Column         | Type      | Description                                    |
| :------------- | :-------- | :--------------------------------------------- |
| `id`           | uuid (PK) | Unique identifier                              |
| `user_id`      | uuid (FK) | References profiles.id                         |
| `title`        | text      | Title of the snippet                           |
| `code_content` | text      | The raw code block                             |
| `description`  | text      | Markdown notes                                 |
| `language`     | text      | Programming language (for syntax highlighting) |
| `is_favorite`  | boolean   | Default: false                                 |
| `created_at`   | timestamp | Auto-generated                                 |
| `fts_vector`   | tsvector  | Generated column for Full-Text Search          |

### 2.3 `attachments`

| Column       | Type      | Description                                 |
| :----------- | :-------- | :------------------------------------------ |
| `id`         | uuid (PK) | Unique identifier                           |
| `snippet_id` | uuid (FK) | References snippets.id (On Delete: Cascade) |
| `file_path`  | text      | Path to the file in Supabase Storage        |
| `file_type`  | text      | MIME type (e.g., image/png)                 |

## 3. Security Policies (RLS)

- **Table `snippets`:**
  - `SELECT`: `auth.uid() == user_id`
  - `INSERT`: `auth.uid() == user_id`
  - `UPDATE`: `auth.uid() == user_id`
  - `DELETE`: `auth.uid() == user_id`
