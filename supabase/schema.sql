-- Extensiones útiles
create extension if not exists "uuid-ossp";

-- Perfiles
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text unique,
  birth_year int check (birth_year between 1980 and 2015),
  plan text not null default 'free' check (plan in ('free', 'pro')),
  created_at timestamptz not null default now()
);

-- Transacciones
create table if not exists transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles (id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  type text not null check (type in ('income', 'expense')),
  category text not null,
  description text,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Metas / hábitos
create table if not exists goals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles (id) on delete cascade,
  goal_type text not null check (goal_type in ('financial', 'habit')),
  title text not null,
  target_amount numeric(12,2) not null default 0,
  current_amount numeric(12,2) not null default 0,
  target_date date,
  streak_days int not null default 0,
  status text not null default 'active' check (status in ('active', 'completed', 'paused')),
  created_at timestamptz not null default now()
);

create table if not exists goal_logs (
  id uuid primary key default uuid_generate_v4(),
  goal_id uuid not null references goals (id) on delete cascade,
  user_id uuid not null references profiles (id) on delete cascade,
  log_date date not null,
  amount numeric(12,2) not null default 0,
  note text,
  created_at timestamptz not null default now(),
  unique(goal_id, log_date)
);

-- Historial de insights IA
create table if not exists ai_insights (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles (id) on delete cascade,
  period_label text not null,
  summary text not null,
  actions jsonb not null,
  waste_alert text,
  created_at timestamptz not null default now()
);

-- Índices
create index if not exists idx_transactions_user_occurred_at on transactions(user_id, occurred_at desc);
create index if not exists idx_goals_user_status on goals(user_id, status);
create index if not exists idx_ai_insights_user_created_at on ai_insights(user_id, created_at desc);

-- RLS
alter table profiles enable row level security;
alter table transactions enable row level security;
alter table goals enable row level security;
alter table goal_logs enable row level security;
alter table ai_insights enable row level security;

-- Policies
create policy "profiles_select_own" on profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles
  for update using (auth.uid() = id);

create policy "transactions_all_own" on transactions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "goals_all_own" on goals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "goal_logs_all_own" on goal_logs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "ai_insights_all_own" on ai_insights
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
