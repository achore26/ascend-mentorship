-- ============================================================
-- ASCEND MENTORSHIP PLATFORM — DATABASE SCHEMA
-- Run this entire file in Supabase SQL Editor
-- ============================================================


-- ============================================================
-- 1. PROFILES
-- Extends auth.users. Created automatically on signup via trigger.
-- ============================================================
create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text not null,
  full_name   text,
  role        text not null check (role in ('mentee', 'mentor', 'admin')) default 'mentee',
  phone       text,
  country     text,
  field       text,
  bio         text,
  avatar_url  text,
  created_at  timestamptz default now()
);


-- ============================================================
-- 2. APPLICATIONS
-- Public form submissions — no account required to apply.
-- Admin reviews and approves/rejects.
-- ============================================================
create table public.applications (
  id               uuid default gen_random_uuid() primary key,
  type             text not null check (type in ('mentee', 'mentor')),
  full_name        text not null,
  email            text not null,
  phone            text,
  country          text,
  field            text not null,
  current_role     text,
  organization     text,
  experience_years int,          -- mentors: years of experience
  goals            text,         -- mentees: what they want to achieve
  motivation       text,         -- why they want to join Ascend
  linkedin_url     text,
  status           text not null check (status in ('pending', 'approved', 'rejected')) default 'pending',
  reviewed_by      uuid references public.profiles(id),
  reviewed_at      timestamptz,
  profile_id       uuid references public.profiles(id), -- linked after account is created
  created_at       timestamptz default now()
);


-- ============================================================
-- 3. PROGRAMS
-- Mentorship programs created and managed by admin.
-- ============================================================
create table public.programs (
  id          uuid default gen_random_uuid() primary key,
  title       text not null,
  description text,
  field       text,
  start_date  date,
  end_date    date,
  status      text not null check (status in ('upcoming', 'active', 'completed')) default 'upcoming',
  created_by  uuid references public.profiles(id),
  created_at  timestamptz default now()
);


-- ============================================================
-- 4. MATCHES
-- Admin-assigned mentee ↔ mentor pairings within a program.
-- ============================================================
create table public.matches (
  id          uuid default gen_random_uuid() primary key,
  mentee_id   uuid references public.profiles(id) not null,
  mentor_id   uuid references public.profiles(id) not null,
  program_id  uuid references public.programs(id),
  status      text not null check (status in ('active', 'completed', 'terminated')) default 'active',
  notes       text,
  created_by  uuid references public.profiles(id),
  created_at  timestamptz default now()
);


-- ============================================================
-- 5. SESSIONS
-- Admin-scheduled sessions. Anyone can view and join via link.
-- ============================================================
create table public.sessions (
  id               uuid default gen_random_uuid() primary key,
  title            text not null,
  description      text,
  program_id       uuid references public.programs(id),
  scheduled_at     timestamptz not null,
  duration_minutes int default 60,
  meeting_link     text,
  created_by       uuid references public.profiles(id),
  created_at       timestamptz default now()
);


-- ============================================================
-- 6. RESOURCES
-- Admin-uploaded materials. Visible to all logged-in users.
-- program_id is nullable — null means available to everyone.
-- ============================================================
create table public.resources (
  id          uuid default gen_random_uuid() primary key,
  title       text not null,
  description text,
  type        text check (type in ('pdf', 'link', 'video', 'document')),
  url         text not null,
  program_id  uuid references public.programs(id),
  created_by  uuid references public.profiles(id),
  created_at  timestamptz default now()
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Controls who can read/write each table.
-- ============================================================

alter table public.profiles    enable row level security;
alter table public.applications enable row level security;
alter table public.programs    enable row level security;
alter table public.matches     enable row level security;
alter table public.sessions    enable row level security;
alter table public.resources   enable row level security;


-- Helper: get the current user's role
create or replace function public.get_my_role()
returns text
language sql
security definer
as $$
  select role from public.profiles where id = auth.uid();
$$;


-- PROFILES
create policy "Users view own profile"
  on public.profiles for select
  using (auth.uid() = id or get_my_role() = 'admin');

create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins manage all profiles"
  on public.profiles for all
  using (get_my_role() = 'admin');

create policy "System inserts profile on signup"
  on public.profiles for insert
  with check (auth.uid() = id);


-- APPLICATIONS
create policy "Anyone can submit application"
  on public.applications for insert
  with check (true);

create policy "Admins view and manage all applications"
  on public.applications for all
  using (get_my_role() = 'admin');


-- PROGRAMS
create policy "Authenticated users view programs"
  on public.programs for select
  using (auth.role() = 'authenticated');

create policy "Admins manage programs"
  on public.programs for all
  using (get_my_role() = 'admin');


-- MATCHES
create policy "Users view own matches"
  on public.matches for select
  using (
    auth.uid() = mentee_id or
    auth.uid() = mentor_id or
    get_my_role() = 'admin'
  );

create policy "Admins manage matches"
  on public.matches for all
  using (get_my_role() = 'admin');


-- SESSIONS
create policy "Authenticated users view sessions"
  on public.sessions for select
  using (auth.role() = 'authenticated');

create policy "Admins manage sessions"
  on public.sessions for all
  using (get_my_role() = 'admin');


-- RESOURCES
create policy "Authenticated users view resources"
  on public.resources for select
  using (auth.role() = 'authenticated');

create policy "Admins manage resources"
  on public.resources for all
  using (get_my_role() = 'admin');


-- ============================================================
-- TRIGGER: Auto-create profile when a user signs up
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    coalesce(new.raw_user_meta_data->>'role', 'mentee')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
