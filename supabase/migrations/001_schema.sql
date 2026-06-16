-- CalTrack Database Schema
-- Run this in Supabase SQL Editor
-- IMPORTANT: In Supabase Dashboard → Authentication → Settings → disable "Enable email confirmations"

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS profiles (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username            TEXT UNIQUE NOT NULL,
  email               TEXT,
  sex                 TEXT CHECK (sex IN ('male', 'female')),
  age                 INTEGER,
  height_cm           NUMERIC(5,1),
  current_weight_kg   NUMERIC(5,2),
  target_weight_kg    NUMERIC(5,2),
  activity_level      TEXT CHECK (activity_level IN (
                        'sedentary','lightly_active','moderately_active','very_active','extra_active'
                      )),
  goal_type           TEXT CHECK (goal_type IN ('lose','maintain','gain')),
  maintenance_calories INTEGER,
  daily_calorie_goal  INTEGER,
  protein_goal        INTEGER,
  carb_goal           INTEGER,
  fat_goal            INTEGER,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS foods (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  serving_label TEXT NOT NULL DEFAULT '1 serving',
  calories      NUMERIC(8,1) NOT NULL,
  protein       NUMERIC(6,1) NOT NULL DEFAULT 0,
  carbs         NUMERIC(6,1) NOT NULL DEFAULT 0,
  fat           NUMERIC(6,1) NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS food_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  food_id       UUID NOT NULL REFERENCES foods(id),
  food_name     TEXT NOT NULL,
  serving_label TEXT NOT NULL,
  quantity      NUMERIC(6,2) NOT NULL DEFAULT 1,
  calories      NUMERIC(8,1) NOT NULL,
  protein       NUMERIC(6,1) NOT NULL DEFAULT 0,
  carbs         NUMERIC(6,1) NOT NULL DEFAULT 0,
  fat           NUMERIC(6,1) NOT NULL DEFAULT 0,
  logged_at     DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS weight_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  weight_kg   NUMERIC(5,2) NOT NULL,
  logged_at   DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, logged_at)
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_food_logs_user_date ON food_logs (user_id, logged_at);
CREATE INDEX IF NOT EXISTS idx_food_logs_user_created ON food_logs (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_weight_logs_user_date ON weight_logs (user_id, logged_at DESC);
CREATE INDEX IF NOT EXISTS idx_foods_user ON foods (user_id);
CREATE INDEX IF NOT EXISTS idx_foods_name ON foods (name);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles    ENABLE ROW LEVEL SECURITY;
ALTER TABLE foods       ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_logs   ENABLE ROW LEVEL SECURITY;
ALTER TABLE weight_logs ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Foods (global foods readable by all authenticated users)
CREATE POLICY "foods_select" ON foods
  FOR SELECT USING (user_id IS NULL OR user_id = auth.uid());
CREATE POLICY "foods_insert" ON foods
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "foods_update" ON foods
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "foods_delete" ON foods
  FOR DELETE USING (auth.uid() = user_id);

-- Food logs
CREATE POLICY "food_logs_select" ON food_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "food_logs_insert" ON food_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "food_logs_update" ON food_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "food_logs_delete" ON food_logs FOR DELETE USING (auth.uid() = user_id);

-- Weight logs
CREATE POLICY "weight_logs_select" ON weight_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "weight_logs_insert" ON weight_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "weight_logs_update" ON weight_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "weight_logs_delete" ON weight_logs FOR DELETE USING (auth.uid() = user_id);

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Used during signup to check if a username is available (public)
CREATE OR REPLACE FUNCTION is_username_available(p_username TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM profiles WHERE username = LOWER(TRIM(p_username))
  );
END;
$$;

-- Auto-update updated_at on profiles
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
