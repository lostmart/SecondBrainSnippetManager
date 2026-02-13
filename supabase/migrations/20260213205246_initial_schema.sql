-- 1. Create a table for Public Profiles (linked to Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Create the Snippets table
create table public.snippets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  code_content text not null,
  description text,
  language text not null default 'javascript',
  is_favorite boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  
  -- Search vector for Full-Text Search
  fts_vector tsvector generated always as (
    to_tsvector('english', title || ' ' || description || ' ' || code_content)
  ) stored
);

-- 3. Create an index for the Full-Text Search
create index snippets_fts_idx on public.snippets using gin (fts_vector);

-- 4. Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.snippets enable row level security;

-- 5. Policies for Profiles (Users can only see/edit their own profile)
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- 6. Policies for Snippets (Privacy First)
create policy "Users can manage their own snippets" on public.snippets
  for all using (auth.uid() = user_id);

-- 7. Automated Profile Creation (Trigger)
-- This creates a row in public.profiles every time a user signs up via Supabase Auth
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();