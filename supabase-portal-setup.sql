-- ============================================
-- Portal Tables for Client Task Management
-- ============================================
-- このSQLをSupabaseダッシュボードの SQL Editor で実行してください
-- URL: https://supabase.com/dashboard/project/yqluegvlauzvgqywnejj/sql/new

-- 1) タスクテーブル（プロジェクト横断）
CREATE TABLE IF NOT EXISTS portal_tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL DEFAULT 'default',
  title TEXT NOT NULL,
  assignee TEXT DEFAULT '',
  date TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'todo',
  category TEXT DEFAULT '',
  phase TEXT DEFAULT '',
  description TEXT DEFAULT '',
  starred BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2) 議事録テーブル
CREATE TABLE IF NOT EXISTS portal_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL DEFAULT 'default',
  date TEXT NOT NULL,
  topic TEXT NOT NULL,
  content TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3) 予祝テーブル
CREATE TABLE IF NOT EXISTS portal_yoshuku (
  id SERIAL PRIMARY KEY,
  project_id TEXT NOT NULL UNIQUE,
  text TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS有効化
ALTER TABLE portal_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_yoshuku ENABLE ROW LEVEL SECURITY;

-- アクセスポリシー（anon keyでの読み書きを許可）
CREATE POLICY "Allow all for portal_tasks" ON portal_tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for portal_logs" ON portal_logs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for portal_yoshuku" ON portal_yoshuku FOR ALL USING (true) WITH CHECK (true);

-- インデックス
CREATE INDEX idx_portal_tasks_project ON portal_tasks(project_id);
CREATE INDEX idx_portal_logs_project ON portal_logs(project_id);
