-- ============================================
-- Security Hardening Migration
-- Fixes overly permissive RLS policies
-- ============================================

-- 1. Create admin_users table for role-based access control
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only admins can read the admin_users table
CREATE POLICY "Admins can read admin_users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 2. Fix academy_categories: restrict write to admins only
DROP POLICY IF EXISTS "Admins can manage categories" ON academy_categories;

CREATE POLICY "Admins can insert categories"
  ON academy_categories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can update categories"
  ON academy_categories FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can delete categories"
  ON academy_categories FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- 3. Fix academy_articles: restrict write to admins only
DROP POLICY IF EXISTS "Admins can manage articles" ON academy_articles;
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON academy_articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON academy_articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON academy_articles;

CREATE POLICY "Admins can insert articles"
  ON academy_articles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can update articles"
  ON academy_articles FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can delete articles"
  ON academy_articles FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- 4. Fix academy_article_tags: restrict write to admins only
DROP POLICY IF EXISTS "Admins can manage tags" ON academy_article_tags;
DROP POLICY IF EXISTS "Authenticated users can insert tags" ON academy_article_tags;
DROP POLICY IF EXISTS "Authenticated users can update tags" ON academy_article_tags;
DROP POLICY IF EXISTS "Authenticated users can delete tags" ON academy_article_tags;

CREATE POLICY "Admins can insert tags"
  ON academy_article_tags FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can update tags"
  ON academy_article_tags FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_users));

CREATE POLICY "Admins can delete tags"
  ON academy_article_tags FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_users));

-- 5. Limit feedback insertion rate by adding a check constraint
-- (Supabase doesn't natively support rate limiting in RLS,
--  but we can limit feedback to one per session per article)
-- The UNIQUE(article_id, session_id) constraint already handles this.

-- 6. Restrict search query logging to reasonable lengths
ALTER TABLE academy_search_queries
  ADD CONSTRAINT search_query_max_length CHECK (length(query) <= 200);

-- 7. Add length constraint to feedback text
ALTER TABLE academy_article_feedback
  ADD CONSTRAINT feedback_text_max_length CHECK (feedback_text IS NULL OR length(feedback_text) <= 2000);
