-- ============================================
-- NeonO Academy (Knowledge Base) Schema
-- Migration: 20260122_create_academy_tables
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. ACADEMY CATEGORIES
-- ============================================
CREATE TABLE IF NOT EXISTS academy_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Icon name from lucide-react (e.g., 'BookOpen', 'Calendar')
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for ordering
CREATE INDEX idx_academy_categories_order ON academy_categories(order_index);

-- ============================================
-- 2. ACADEMY ARTICLES
-- ============================================
CREATE TABLE IF NOT EXISTS academy_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES academy_categories(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT, -- Markdown content
  featured_image_url TEXT,
  views INTEGER DEFAULT 0,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_academy_articles_category ON academy_articles(category_id, order_index);
CREATE INDEX idx_academy_articles_slug ON academy_articles(slug);
CREATE INDEX idx_academy_articles_featured ON academy_articles(is_featured) WHERE is_featured = TRUE;

-- Full-text search index
ALTER TABLE academy_articles ADD COLUMN IF NOT EXISTS search_vector tsvector 
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) STORED;

CREATE INDEX idx_academy_articles_search ON academy_articles USING GIN(search_vector);

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_academy_article_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_academy_articles_updated
  BEFORE UPDATE ON academy_articles
  FOR EACH ROW
  EXECUTE FUNCTION update_academy_article_timestamp();

-- ============================================
-- 3. ACADEMY ARTICLE TAGS
-- ============================================
CREATE TABLE IF NOT EXISTS academy_article_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES academy_articles(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(article_id, tag)
);

-- Index for finding articles by tag
CREATE INDEX idx_academy_article_tags_article ON academy_article_tags(article_id);
CREATE INDEX idx_academy_article_tags_tag ON academy_article_tags(tag);

-- ============================================
-- 4. ACADEMY ARTICLE FEEDBACK
-- ============================================
CREATE TABLE IF NOT EXISTS academy_article_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES academy_articles(id) ON DELETE CASCADE,
  user_id UUID, -- NULL for anonymous users
  session_id TEXT NOT NULL, -- For anonymous tracking
  helpful BOOLEAN NOT NULL, -- true = helpful, false = not helpful
  feedback_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Prevent duplicate feedback from same session
  UNIQUE(article_id, session_id)
);

-- Index for analytics
CREATE INDEX idx_academy_feedback_article ON academy_article_feedback(article_id);
CREATE INDEX idx_academy_feedback_helpful ON academy_article_feedback(helpful);

-- ============================================
-- 5. ACADEMY SEARCH QUERIES (Analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS academy_search_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  clicked_article_id UUID REFERENCES academy_articles(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for analytics
CREATE INDEX idx_academy_search_created ON academy_search_queries(created_at);
CREATE INDEX idx_academy_search_query ON academy_search_queries(query);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE academy_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_article_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_search_queries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES: academy_categories
-- ============================================

-- Anyone can read categories (public knowledge base)
CREATE POLICY "Categories are publicly readable"
  ON academy_categories FOR SELECT
  USING (true);

-- Only authenticated admins can modify (you'll need an admin check)
CREATE POLICY "Admins can manage categories"
  ON academy_categories FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- RLS POLICIES: academy_articles
-- ============================================

-- Anyone can read articles (public knowledge base)
CREATE POLICY "Articles are publicly readable"
  ON academy_articles FOR SELECT
  USING (true);

-- Only authenticated users can modify
CREATE POLICY "Admins can manage articles"
  ON academy_articles FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- RLS POLICIES: academy_article_tags
-- ============================================

-- Anyone can read tags
CREATE POLICY "Tags are publicly readable"
  ON academy_article_tags FOR SELECT
  USING (true);

-- Only authenticated users can modify
CREATE POLICY "Admins can manage tags"
  ON academy_article_tags FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- RLS POLICIES: academy_article_feedback
-- ============================================

-- Anyone can submit feedback (with session tracking)
CREATE POLICY "Anyone can submit feedback"
  ON academy_article_feedback FOR INSERT
  WITH CHECK (true);

-- Users can read their own feedback
CREATE POLICY "Users can read own feedback"
  ON academy_article_feedback FOR SELECT
  USING (
    session_id = current_setting('request.headers', true)::json->>'x-session-id'
    OR auth.uid() = user_id
  );

-- Admins can read all feedback
CREATE POLICY "Admins can read all feedback"
  ON academy_article_feedback FOR SELECT
  USING (auth.role() = 'authenticated');

-- ============================================
-- RLS POLICIES: academy_search_queries
-- ============================================

-- Anyone can insert search queries (analytics)
CREATE POLICY "Anyone can log search queries"
  ON academy_search_queries FOR INSERT
  WITH CHECK (true);

-- Only admins can read search analytics
CREATE POLICY "Admins can read search analytics"
  ON academy_search_queries FOR SELECT
  USING (auth.role() = 'authenticated');

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to search articles with full-text search
CREATE OR REPLACE FUNCTION search_academy_articles(search_query TEXT)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  title TEXT,
  description TEXT,
  category_id UUID,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.slug,
    a.title,
    a.description,
    a.category_id,
    ts_rank(a.search_vector, websearch_to_tsquery('english', search_query)) AS rank
  FROM academy_articles a
  WHERE a.search_vector @@ websearch_to_tsquery('english', search_query)
  ORDER BY rank DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;

-- Function to increment article views
CREATE OR REPLACE FUNCTION increment_article_views(article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE academy_articles
  SET views = views + 1
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update helpful counts based on feedback
CREATE OR REPLACE FUNCTION update_article_helpful_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.helpful THEN
      UPDATE academy_articles SET helpful_count = helpful_count + 1 WHERE id = NEW.article_id;
    ELSE
      UPDATE academy_articles SET not_helpful_count = not_helpful_count + 1 WHERE id = NEW.article_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Handle changing vote
    IF OLD.helpful AND NOT NEW.helpful THEN
      UPDATE academy_articles 
      SET helpful_count = helpful_count - 1, not_helpful_count = not_helpful_count + 1 
      WHERE id = NEW.article_id;
    ELSIF NOT OLD.helpful AND NEW.helpful THEN
      UPDATE academy_articles 
      SET helpful_count = helpful_count + 1, not_helpful_count = not_helpful_count - 1 
      WHERE id = NEW.article_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.helpful THEN
      UPDATE academy_articles SET helpful_count = helpful_count - 1 WHERE id = OLD.article_id;
    ELSE
      UPDATE academy_articles SET not_helpful_count = not_helpful_count - 1 WHERE id = OLD.article_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_update_helpful_counts
  AFTER INSERT OR UPDATE OR DELETE ON academy_article_feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_article_helpful_counts();

-- ============================================
-- SEED DATA: Default Categories
-- ============================================

INSERT INTO academy_categories (slug, title, description, icon, order_index) VALUES
  ('getting-started', 'Getting Started', 'Learn the basics of NeonO and get up and running quickly', 'Rocket', 1),
  ('appointments', 'Appointments & Booking', 'Master appointment scheduling, online booking, and calendar management', 'Calendar', 2),
  ('pos-payments', 'POS & Payments', 'Everything about point of sale, payments, and transactions', 'CreditCard', 3),
  ('clients', 'Client Management', 'Manage client profiles, history, and communications', 'Users', 4),
  ('staff', 'Staff & Scheduling', 'Staff management, scheduling, and payroll features', 'UserCog', 5),
  ('marketing', 'Marketing & Growth', 'SMS, email marketing, campaigns, and loyalty programs', 'Megaphone', 6),
  ('reports', 'Reports & Analytics', 'Business insights, dashboards, and data analysis', 'BarChart3', 7),
  ('integrations', 'Integrations', 'Connect NeonO with your favorite tools and services', 'Puzzle', 8),
  ('troubleshooting', 'Troubleshooting', 'Common issues and how to resolve them', 'Wrench', 9),
  ('account', 'Account & Billing', 'Manage your subscription, billing, and account settings', 'Settings', 10)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SAMPLE ARTICLES (Optional - for testing)
-- ============================================

INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index) 
SELECT 
  c.id,
  'quick-start-guide',
  'Quick Start Guide',
  'Get your NeonO account set up and running in under 30 minutes',
  E'# Quick Start Guide\n\nWelcome to NeonO! This guide will help you get started.\n\n## Step 1: Set Up Your Business Profile\n\n1. Go to Settings > Business Profile\n2. Enter your business name and address\n3. Upload your logo\n\n## Step 2: Add Your Services\n\n1. Navigate to Services\n2. Click "Add Service"\n3. Enter service name, duration, and price\n\n## Step 3: Invite Your Team\n\n1. Go to Staff > Invite\n2. Enter team member emails\n3. Assign roles and permissions\n\n## Step 4: Enable Online Booking\n\n1. Go to Settings > Online Booking\n2. Customize your booking page\n3. Share your booking link!',
  TRUE,
  1
FROM academy_categories c
WHERE c.slug = 'getting-started'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO academy_articles (category_id, slug, title, description, content, order_index) 
SELECT 
  c.id,
  'accepting-your-first-payment',
  'Accepting Your First Payment',
  'Learn how to process payments with NeonO POS',
  E'# Accepting Your First Payment\n\nNeonO makes it easy to accept payments from your clients.\n\n## Supported Payment Methods\n\n- Credit/Debit Cards\n- Apple Pay & Google Pay\n- Cash\n- Gift Cards\n\n## Processing a Payment\n\n1. Complete the appointment\n2. Click "Checkout"\n3. Select payment method\n4. Process the transaction\n\n## Tips & Gratuity\n\nClients can add tips during checkout. 100% of tips go to your staff - we never take a cut.',
  1
FROM academy_categories c
WHERE c.slug = 'pos-payments'
ON CONFLICT (slug) DO NOTHING;

-- Add tags for sample articles
INSERT INTO academy_article_tags (article_id, tag)
SELECT a.id, unnest(ARRAY['setup', 'beginner', 'onboarding'])
FROM academy_articles a WHERE a.slug = 'quick-start-guide'
ON CONFLICT DO NOTHING;

INSERT INTO academy_article_tags (article_id, tag)
SELECT a.id, unnest(ARRAY['payments', 'pos', 'checkout', 'tips'])
FROM academy_articles a WHERE a.slug = 'accepting-your-first-payment'
ON CONFLICT DO NOTHING;

-- ============================================
-- GRANTS (for service role access)
-- ============================================

-- Grant usage on functions
GRANT EXECUTE ON FUNCTION search_academy_articles(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_article_views(UUID) TO anon, authenticated;

-- ============================================
-- COMMENTS (for documentation)
-- ============================================

COMMENT ON TABLE academy_categories IS 'Knowledge base categories for organizing help articles';
COMMENT ON TABLE academy_articles IS 'Help center articles with full-text search support';
COMMENT ON TABLE academy_article_tags IS 'Tags for categorizing and filtering articles';
COMMENT ON TABLE academy_article_feedback IS 'User feedback on article helpfulness';
COMMENT ON TABLE academy_search_queries IS 'Analytics for search queries to improve content';
COMMENT ON FUNCTION search_academy_articles IS 'Full-text search across academy articles with ranking';
COMMENT ON FUNCTION increment_article_views IS 'Increment view count for an article (safe for public use)';
