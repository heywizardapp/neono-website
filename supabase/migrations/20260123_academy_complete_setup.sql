-- ============================================
-- NeonO Academy - COMPLETE Database Setup
-- Generated: January 23, 2026
-- ============================================
-- 
-- INSTRUCTIONS:
-- 1. Open Supabase Dashboard → SQL Editor
-- 2. Paste this entire script
-- 3. Click "Run" to execute
-- 4. Verify with the query at the bottom
--
-- This script will:
-- - Drop existing academy tables (clean slate)
-- - Create all necessary tables
-- - Set up Row Level Security (RLS)
-- - Create indexes for performance
-- - Insert 8 categories
-- - Insert 17 articles with full content
-- - Insert article tags for search
-- ============================================

-- ============================================
-- PART 1: DROP EXISTING TABLES (Clean Slate)
-- ============================================

DROP TABLE IF EXISTS academy_search_queries CASCADE;
DROP TABLE IF EXISTS academy_article_feedback CASCADE;
DROP TABLE IF EXISTS academy_article_tags CASCADE;
DROP TABLE IF EXISTS academy_articles CASCADE;
DROP TABLE IF EXISTS academy_categories CASCADE;

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS search_academy_articles(TEXT);
DROP FUNCTION IF EXISTS increment_article_views(UUID);
DROP FUNCTION IF EXISTS update_academy_article_timestamp() CASCADE;

-- ============================================
-- PART 2: ENABLE EXTENSIONS
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PART 3: CREATE TABLES
-- ============================================

-- 3.1 Categories Table
CREATE TABLE academy_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Icon name from lucide-react (e.g., 'Rocket', 'Calendar')
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.2 Articles Table
CREATE TABLE academy_articles (
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
  read_time_minutes INTEGER DEFAULT 3,
  status TEXT DEFAULT 'published', -- published, draft, archived
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.3 Article Tags Table
CREATE TABLE academy_article_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES academy_articles(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(article_id, tag)
);

-- 3.4 Article Feedback Table
CREATE TABLE academy_article_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES academy_articles(id) ON DELETE CASCADE,
  user_id UUID,
  session_id TEXT NOT NULL,
  helpful BOOLEAN NOT NULL,
  feedback_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(article_id, session_id)
);

-- 3.5 Search Queries Table (Analytics)
CREATE TABLE academy_search_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  query TEXT NOT NULL,
  results_count INTEGER DEFAULT 0,
  clicked_article_id UUID REFERENCES academy_articles(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PART 4: CREATE INDEXES
-- ============================================

CREATE INDEX idx_academy_categories_order ON academy_categories(order_index);
CREATE INDEX idx_academy_articles_category ON academy_articles(category_id, order_index);
CREATE INDEX idx_academy_articles_slug ON academy_articles(slug);
CREATE INDEX idx_academy_articles_featured ON academy_articles(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_academy_articles_status ON academy_articles(status);
CREATE INDEX idx_academy_article_tags_article ON academy_article_tags(article_id);
CREATE INDEX idx_academy_article_tags_tag ON academy_article_tags(tag);
CREATE INDEX idx_academy_feedback_article ON academy_article_feedback(article_id);
CREATE INDEX idx_academy_search_created ON academy_search_queries(created_at);

-- Full-text search vector column
ALTER TABLE academy_articles ADD COLUMN search_vector tsvector 
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) STORED;

CREATE INDEX idx_academy_articles_search ON academy_articles USING GIN(search_vector);

-- ============================================
-- PART 5: CREATE FUNCTIONS
-- ============================================

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

-- Function to search articles
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
    AND a.status = 'published'
  ORDER BY rank DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;

-- Function to increment article views
CREATE OR REPLACE FUNCTION increment_article_views(p_article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE academy_articles
  SET views = views + 1
  WHERE id = p_article_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- PART 6: ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE academy_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_article_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_search_queries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PART 7: CREATE RLS POLICIES
-- ============================================

-- Categories: Public read, authenticated write
CREATE POLICY "Categories are publicly readable"
  ON academy_categories FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert categories"
  ON academy_categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON academy_categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete categories"
  ON academy_categories FOR DELETE
  TO authenticated
  USING (true);

-- Articles: Public read, authenticated write
CREATE POLICY "Articles are publicly readable"
  ON academy_articles FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert articles"
  ON academy_articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update articles"
  ON academy_articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete articles"
  ON academy_articles FOR DELETE
  TO authenticated
  USING (true);

-- Tags: Public read, authenticated write
CREATE POLICY "Tags are publicly readable"
  ON academy_article_tags FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert tags"
  ON academy_article_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tags"
  ON academy_article_tags FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tags"
  ON academy_article_tags FOR DELETE
  TO authenticated
  USING (true);

-- Feedback: Anyone can submit, admins can read all
CREATE POLICY "Anyone can submit feedback"
  ON academy_article_feedback FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read feedback"
  ON academy_article_feedback FOR SELECT
  TO authenticated
  USING (true);

-- Search queries: Anyone can insert/update, admins can read
CREATE POLICY "Anyone can log search queries"
  ON academy_search_queries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update their search queries"
  ON academy_search_queries FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read search analytics"
  ON academy_search_queries FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- PART 8: INSERT CATEGORIES
-- ============================================

INSERT INTO academy_categories (slug, title, description, icon, order_index) VALUES
('getting-started', 'Getting Started', 'Everything you need to launch your salon on NeonO', 'Rocket', 1),
('appointments', 'Appointments', 'Master your calendar and booking workflow', 'Calendar', 2),
('client-management', 'Client Management', 'Build lasting relationships with your clients', 'Users', 3),
('pos-payments', 'POS & Payments', 'Process payments and manage transactions', 'CreditCard', 4),
('marketing', 'Marketing', 'Grow your business with powerful marketing tools', 'Megaphone', 5),
('staff-management', 'Staff Management', 'Manage your team effectively', 'UserCog', 6),
('reports-analytics', 'Reports & Analytics', 'Understand your business performance', 'BarChart3', 7),
('advanced-features', 'Advanced Features', 'Power features for growing salons', 'Settings', 8);

-- ============================================
-- PART 9: INSERT ARTICLES
-- ============================================

-- ==========================================
-- GETTING STARTED ARTICLES (8)
-- ==========================================

-- Article 1: Creating Your Salon Profile
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'getting-started'), 
'creating-your-salon-profile',
'Creating Your Salon Profile',
'Set up your salon profile with business information, location, hours, and branding.',
'# Creating Your Salon Profile

Setting up your salon profile is the first step to getting started with NeonO. Your profile information appears on your booking page and in client communications.

## Before You Begin

Make sure you have:
- Your business name and address
- Contact phone and email
- Business hours
- Your logo (optional)

## Step 1: Navigate to Settings

1. Log in to your NeonO dashboard
2. Click the **Settings** icon in the left sidebar
3. Select **Business Profile**

## Step 2: Enter Basic Information

Fill in the following fields:

### Business Name
Enter your salon''s legal or operating name. This appears on:
- Your online booking page
- Email confirmations
- Receipts

### Contact Information
- **Phone:** Primary contact number clients can call
- **Email:** Business email for notifications
- **Website:** Your salon''s website URL (optional)

## Step 3: Add Your Location

Enter your full business address. This will be used for:
- Google Maps integration on your booking page
- Direction links in confirmation emails
- Local SEO optimization

## Step 4: Set Business Hours

Configure your operating hours for each day:

1. Click **Business Hours**
2. For each day, toggle on/off if you''re open
3. Set opening and closing times
4. Add break times if needed

**Pro Tip:** You can set different hours for different days!

## Step 5: Upload Your Logo

1. Click **Upload Logo**
2. Choose an image file (PNG or JPG)
3. Recommended size: 500x500px
4. Click **Save**

## Step 6: Configure Preferences

Set your preferences for:
- **Time Zone:** Ensure appointments show correct times
- **Currency:** CAD, USD, etc.
- **Language:** English, French, etc.
- **Date Format:** MM/DD/YYYY or DD/MM/YYYY

## Next Steps

Now that your profile is set up, you''re ready to:
- Add your first team member →
- Set up your services →
- Customize your booking page →

## Frequently Asked Questions

**Q: Can I change my business name later?**
A: Yes, you can update your business name anytime in Settings.

**Q: Do I need to add a logo?**
A: No, it''s optional. Your business name will appear as text if no logo is added.

## Need Help?

Still have questions? Contact our support team or book a demo.',
true, 1, 5);

-- Article 2: Adding Your First Team Member
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'getting-started'), 
'adding-your-first-team-member',
'Adding Your First Team Member',
'Invite staff members, set their roles and permissions, and configure their services.',
'# Adding Your First Team Member

Learn how to add staff members, set their permissions, and configure their availability.

## Before You Begin

Have ready:
- Staff member''s email address
- Their role (Stylist, Receptionist, Manager)
- Services they will perform
- Their working hours

## Step 1: Navigate to Staff

1. Go to **Staff** in the main menu
2. Click **Add Team Member**

## Step 2: Enter Staff Details

### Basic Information
- **Full Name:** Their display name
- **Email:** Used for login and notifications
- **Phone:** Optional, for internal contact
- **Job Title:** Displayed to clients (e.g., "Senior Stylist")

### Set Role & Permissions

Choose their role:
- **Owner:** Full access to everything
- **Manager:** Can manage staff, view reports, no financial access
- **Stylist:** Can manage own bookings and clients
- **Receptionist:** Can manage bookings for all staff

## Step 3: Assign Services

1. Click **Services** tab
2. Select which services they can perform
3. Set individual pricing if different from base price
4. Set duration if they work at different speeds

**Pro Tip:** You can set different prices per stylist for premium services!

## Step 4: Set Availability

Configure their working schedule:
1. Click **Availability** tab
2. Set working days and hours
3. Add recurring time off
4. Set break times

## Step 5: Send Invitation

1. Review all information
2. Click **Send Invitation**
3. Staff member receives email with login link
4. They set their password on first login

## Staff Member Dashboard

Once they log in, they can:
- View their schedule
- Accept/decline bookings (if enabled)
- Add client notes
- Clock in/out for time tracking
- View their commission

## Next Steps

- Set up commission tracking →
- Configure staff scheduling →
- Set up time-off requests →',
true, 2, 4);

-- Article 3: Setting Up Services
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'getting-started'), 
'setting-up-services',
'Setting Up Services',
'Create your service menu with pricing, durations, and staff assignments.',
'# Setting Up Services

Your service menu is what clients see when booking. Learn how to create, organize, and optimize your offerings.

## Creating Your First Service

1. Go to **Services** in the main menu
2. Click **Add Service**
3. Enter service details:
   - **Name:** What clients see (e.g., "Haircut & Blow Dry")
   - **Category:** Organize services (e.g., "Hair Services")
   - **Price:** Starting price or fixed price
   - **Duration:** How long it takes (15-min increments)
   - **Description:** Optional details shown during booking

## Service Categories

Organize services into categories:
- **Hair Services** (Cuts, Color, Styling)
- **Nail Services** (Manicure, Pedicure, Gel)
- **Spa Services** (Massage, Facials, Waxing)
- **Packages** (Combined services)

**Pro Tip:** Good categorization makes booking faster for clients!

## Pricing Options

### Fixed Pricing
Set one price for all clients.

### Variable Pricing
Set price ranges (final price determined at consultation).

### Staff-Specific Pricing
Different prices per stylist level.

## Service Duration

Set realistic durations including:
- Service time
- Processing time
- Cleanup between clients
- Buffer time if needed

## Add-On Services

Create services that can be added to main services:
- Deep Conditioning Treatment (+$20, +15 min)
- Scalp Massage (+$15, +10 min)
- Paraffin Wax Treatment (+$10, +10 min)

## Service Visibility

Control when services appear:
- **Online Booking:** Visible to public
- **In-Store Only:** Staff can book but not visible online
- **Private:** Only for specific clients
- **Archived:** Hidden but keeps historical data

## Next Steps

- Customize your booking page →
- Set up service packages →
- Configure pricing tiers →',
false, 3, 4);

-- Article 4: Configuring Business Hours
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'getting-started'), 
'configuring-business-hours',
'Configuring Business Hours',
'Set your salon''s operating hours, breaks, and special holiday closures.',
'# Configuring Business Hours

Properly configured business hours ensure clients can only book when you''re actually open.

## Setting Regular Hours

1. Go to **Settings** → **Business Hours**
2. For each day:
   - Toggle **Open** or **Closed**
   - Set opening time
   - Set closing time
   - Add breaks if needed

## Adding Break Times

Prevent bookings during lunch or staff meetings:

1. Click **Add Break**
2. Set break start and end time
3. Choose if it applies to all staff or specific staff members

## Buffer Times

Add padding between appointments:
- **Before:** Prep time before service
- **After:** Cleanup time after service

## Holiday Closures

Block out days you''re closed:

1. Go to **Calendar** → **Closures**
2. Click **Add Closure**
3. Select date(s)
4. Add reason (optional, shown to clients)

**Pro Tip:** Add closures at start of year for all major holidays!

## Special Hours

Override regular hours for specific dates:
- Extended holiday hours
- Special event days
- Reduced summer hours

## Booking Lead Time

Prevent last-minute bookings:
- **Minimum lead time:** How far in advance clients must book
- **Maximum lead time:** How far ahead they can book

## Next Steps

- Managing your calendar →
- Time-off management →
- Special hours setup →',
false, 4, 3);

-- Article 5: Setting Up Payment Methods
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'getting-started'), 
'setting-up-payment-methods',
'Setting Up Payment Methods',
'Configure payment processing, deposits, and accepted payment types.',
'# Setting Up Payment Methods

Accept payments seamlessly with NeonO''s integrated payment processing.

## Available Payment Methods

NeonO supports:
- **Credit/Debit Cards** (Visa, Mastercard, Amex)
- **Digital Wallets** (Apple Pay, Google Pay)
- **Cash**
- **Gift Cards**
- **Memberships**

## Connecting Your Payment Processor

### Step 1: Choose Provider
1. Go to **Settings** → **Payments**
2. Select your processor: Stripe (recommended), Square, or Moneris

### Step 2: Connect Account
1. Click **Connect**
2. Sign in to your processor account
3. Authorize NeonO access
4. Complete verification

## Payment Settings

Enable/disable payment methods:
- ☑ Credit/Debit Cards
- ☑ Cash
- ☑ Gift Cards

Configure tip options:
- Suggested percentages (15%, 18%, 20%, 25%)
- Custom tip amount
- No tip option

## Booking Deposits

Require deposits to reduce no-shows:

1. Go to **Settings** → **Booking Policies**
2. Enable **Require Deposit**
3. Set deposit amount: Fixed amount ($20), Percentage (50%), or Full prepayment

**Best Practice:** Require deposits for appointments over 1 hour or new clients.

## Cancellation Fees

Charge fees for late cancellations:
- Free cancellation up to 24 hours
- 50% charge for 24-12 hours
- 100% charge for <12 hours or no-shows

## Next Steps

- Processing checkout →
- Managing refunds →
- Gift card setup →',
false, 5, 4);

-- Article 6: Customizing Your Booking Page
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'getting-started'), 
'customizing-your-booking-page',
'Customizing Your Booking Page',
'Design your online booking page with branding, photos, and custom settings.',
'# Customizing Your Booking Page

Your booking page is often the first impression clients have of your salon. Make it beautiful and on-brand.

## Accessing Booking Page Settings

1. Go to **Settings** → **Online Booking**
2. Click **Customize Appearance**

Your booking page URL: `yoursalon.neono.app`

## Branding & Design

### Logo & Colors
- Upload your logo (appears in header)
- Set primary color (matches your brand)
- Choose button style (rounded, square)
- Select font style

### Cover Photo
Add a hero image (1920x600px recommended):
- Salon exterior
- Stylish interior shot
- Your team photo

### About Section
Add text about your salon:
- Brief description
- Specialties
- What makes you unique

## Booking Flow Settings

### Service Selection
- Show all services at once
- Group by category
- Show staff photos with services

### Staff Selection
- Show all available staff
- Allow "No Preference" option
- Show staff bio and experience

## Custom Fields

Add fields to booking form:
- Special requests
- Referred by
- First-time visitor?

## Booking Policies

Display important policies:
- Cancellation policy
- Late arrival policy
- Deposit requirements

## SEO & Social

Optimize for search:
- **Meta Title**
- **Meta Description**
- **Social Image** (appears when shared)

## Next Steps

- Share your booking page →
- Social media integration →
- SEO optimization →',
false, 6, 4);

-- Article 7: Inviting Clients
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'getting-started'), 
'inviting-clients',
'Inviting Clients',
'Import existing clients and send invitations to book online.',
'# Inviting Clients

Migrate your existing client base to NeonO and invite them to start booking online.

## Importing Existing Clients

### From Spreadsheet
1. Download our **CSV template**
2. Fill in client data: Name, Email, Phone, Birthday, Notes
3. Go to **Clients** → **Import**
4. Upload your CSV file
5. Map columns to NeonO fields
6. Review and confirm import

### From Another System
NeonO can import from:
- Fresha
- Square Appointments
- Vagaro
- Booker

Contact support for migration assistance.

## Sending Invitations

### Bulk Invitation Email
1. Go to **Clients** → **Invitations**
2. Select clients to invite
3. Customize email message
4. Click **Send Invitations**

### SMS Invitation
Upgrade to send SMS invitations for higher open rates.

## QR Code for In-Salon

Print QR codes for:
- Reception desk
- Service stations
- Washroom mirrors
- Business cards

Clients scan → go directly to booking page.

## Converting Walk-Ins to Regular Clients

After service:
1. **Book Next Appointment**
2. **Hand them booking card** with QR code
3. **Sign up for loyalty program**
4. **Follow-up email** with booking link

## Next Steps

- Client communication tools →
- Setting up loyalty programs →
- Client retention strategies →',
false, 7, 3);

-- Article 8: Your First Appointment
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'getting-started'), 
'your-first-appointment',
'Your First Appointment',
'Walk through creating, confirming, and completing your first appointment.',
'# Your First Appointment

Ready to book your first appointment? This guide walks you through the entire process.

## Creating an Appointment

### Option 1: Online Booking (Client-Initiated)
1. Client visits your booking page
2. Selects service & staff
3. Chooses date & time
4. Enters contact info
5. Confirms booking

### Option 2: Manual Booking (Staff-Initiated)
1. Click **Calendar** → **New Appointment**
2. Select client (or create new)
3. Choose service
4. Assign staff member
5. Pick date & time
6. Add notes
7. Click **Book**

## Appointment Confirmations

Automatic confirmations sent via:
- Email (immediate)
- SMS (24 hours before, if enabled)
- App notification (for clients with app)

## Pre-Appointment Reminders

Send reminders to reduce no-shows:
- **24 hours before:** Email + SMS
- **2 hours before:** SMS only

## Day of Appointment

### Client Arrives
1. Check them in on dashboard
2. Client status changes to "In Progress"
3. Timer starts for service tracking

### During Service
- Add notes to client profile
- Recommend products
- Take before/after photos

### Checkout
1. Click **Complete Appointment**
2. Review services provided
3. Add products purchased
4. Add tips
5. Process payment
6. Book next appointment (optional)
7. Email receipt

## After Appointment

### Ask for Feedback
Send automatic review request (24 hours later).

### Client Notes
Add notes for next visit:
- Formulas used
- Preferences discovered
- Products recommended

## Next Steps

- Managing your calendar →
- Client communication tools →
- Processing checkout →',
false, 8, 4);

-- ==========================================
-- APPOINTMENTS ARTICLES (6)
-- ==========================================

-- Article 9: Managing Your Calendar
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'appointments'), 
'managing-your-calendar',
'Managing Your Calendar',
'Master your calendar views, filters, and organization tools.',
'# Managing Your Calendar

Your calendar is the heart of NeonO. Learn to navigate, customize, and optimize your schedule.

## Calendar Views

Switch between views:
- **Day:** Detailed hourly view
- **Week:** See full week at a glance
- **Month:** High-level overview
- **Agenda:** List view of appointments

**Keyboard Shortcuts:**
- `D` = Day view
- `W` = Week view
- `M` = Month view
- `←` `→` = Navigate dates
- `T` = Return to today

## Filtering & Search

Filter appointments by:
- Staff member
- Service type
- Appointment status
- Location (multi-location)

**Quick Search:** Type client name to jump to their appointments.

## Color Coding

Appointments colored by:
- **Status:** Confirmed (green), Pending (yellow), Cancelled (red)
- **Staff:** Each staff member has unique color
- **Service Type:** Group by service category

## Multi-Staff View

See multiple calendars at once:
1. Enable **Multi-Staff View**
2. Select staff members to display
3. View side-by-side or stacked

## Time Blocks

Block time for:
- Staff meetings
- Lunch breaks
- Education/training
- Admin work

## Printing Your Schedule

Print daily/weekly schedules:
1. Select date range
2. Click **Print**
3. Choose format

**Pro Tip:** Print tomorrow''s schedule at end of each day.

## Next Steps

- Creating manual bookings →
- Handling walk-ins →
- Staff scheduling →',
true, 1, 4);

-- Article 10: Creating Manual Bookings
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'appointments'), 
'creating-manual-bookings',
'Creating Manual Bookings',
'Book appointments on behalf of clients via phone or in-person.',
'# Creating Manual Bookings

Learn to create appointments manually for phone bookings, walk-ins, and special requests.

## Quick Booking

Fastest way to book:
1. Click any open time slot
2. Start typing client name
3. Select client (or create new)
4. Choose service
5. Confirm booking

**Time:** Less than 30 seconds!

## Detailed Booking

For more complex appointments:
1. Click **+ New Appointment**
2. **Client:** Search or create new
3. **Service:** Select from menu
4. **Staff:** Choose or "First Available"
5. **Date & Time:** Click desired slot
6. **Notes:** Add special requests
7. **Deposit:** Collect if required
8. Click **Book Appointment**

## Booking Multiple Services

Create back-to-back appointments:
1. Book first service
2. Click **Add Service**
3. Select next service
4. Automatically books after first

## Recurring Appointments

For regular clients:
1. Create first appointment
2. Click **Make Recurring**
3. Set frequency (weekly, bi-weekly, monthly)
4. Set end date or number of occurrences
5. Book series

## Group Bookings

Book multiple clients together:
1. Create first client''s appointment
2. Click **Add to Group**
3. Add additional clients
4. Coordinated start times

**Perfect for:** Bridal parties, group spa days

## Waitlist Bookings

No available times? Add to waitlist:
1. Click **Add to Waitlist**
2. Select preferred date/time range
3. Client notified when slot opens

## Next Steps

- Handling walk-ins →
- Managing your calendar →
- Recurring appointments →',
false, 2, 4);

-- Article 11: Handling Walk-Ins
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'appointments'), 
'handling-walk-ins',
'Handling Walk-Ins',
'Efficiently manage walk-in clients and optimize your schedule.',
'# Handling Walk-Ins

Walk-ins can be profitable, but they need efficient handling.

## When Walk-In Arrives

### Check Availability
1. Look at current schedule
2. Identify gaps between appointments
3. Check staff availability
4. Estimate service duration

### Create Walk-In Appointment
1. Click **+ Walk-In**
2. Select client or create new
3. Choose service and staff
4. Mark as **In Progress**
5. Start service immediately

## Walk-In Strategies

### Hold Buffer Time
Reserve slots for walk-ins:
- 10 AM - 10:30 AM
- 2 PM - 2:30 PM
- End of day

### First Available Staff
Use **Round Robin** assignment to distribute walk-ins fairly.

### Express Services
Offer quick services for walk-ins:
- Bang trim (15 min)
- Blow dry (30 min)
- Nail polish change (20 min)

### Waitlist Option
Can''t fit them in now?
1. Add to **Today''s Waitlist**
2. Get their phone number
3. Text when spot opens

## Converting Walk-Ins to Regular Clients

After service:
1. **Book Next Appointment**
2. **Give booking card** with QR code
3. **Sign up for loyalty program**
4. **Send follow-up email**

## Next Steps

- No-show prevention →
- Managing your calendar →
- Client retention strategies →',
false, 3, 3);

-- Article 12: Appointment Reminders
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'appointments'), 
'appointment-reminders',
'Appointment Reminders',
'Configure automated reminders to reduce no-shows and keep clients informed.',
'# Appointment Reminders

Automated reminders reduce no-shows by 30-40%. Set up email and SMS notifications.

## Reminder Types

**Email Reminders**
- ✓ Free unlimited
- ✓ Include all appointment details
- ✓ Reschedule/cancel links
- ⚠ Lower open rate (~20%)

**SMS Reminders**
- ✓ 98% open rate
- ✓ Read within 3 minutes
- ⚠ Costs per message

## Default Reminder Schedule

Recommended timing:
- **Confirmation:** Immediately after booking
- **7 Days Before:** Email reminder (for far-out appointments)
- **24 Hours Before:** Email + SMS
- **2 Hours Before:** SMS only

## Configuring Reminders

1. Go to **Settings** → **Notifications**
2. Click **Appointment Reminders**
3. For each reminder:
   - Enable/disable
   - Set timing (hours before)
   - Choose channel (Email, SMS, Both)
   - Customize message

## Message Variables

Available placeholders:
- `{ClientName}` - Client first name
- `{ServiceName}` - Service booked
- `{StaffName}` - Staff member
- `{Date}` - Appointment date
- `{Time}` - Appointment time
- `{BookingURL}` - Manage booking link

## Confirmation Required

Ask clients to confirm:
```
Reply YES to confirm or CALL to reschedule
```

Benefits:
- Identifies potential no-shows
- Allows time to rebook slot
- Shows commitment

## Next Steps

- No-show prevention →
- Client communication tools →
- SMS marketing →',
true, 4, 4);

-- Article 13: No-Show Prevention
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'appointments'), 
'no-show-prevention',
'No-Show Prevention',
'Reduce no-shows with deposits, policies, and smart strategies.',
'# No-Show Prevention

No-shows cost salons thousands. Implement these strategies to reduce no-shows by up to 80%.

## The Cost of No-Shows

**Average Impact:**
- $150 lost revenue per no-show
- 1-2 hours of empty chair time
- Missed opportunity for other clients

**Industry average:** 10-15% no-show rate
**With prevention:** 2-5% no-show rate

## Strategy 1: Require Deposits

### When to Require
- New clients (first 2-3 visits)
- Appointments over 90 minutes
- Services over $100
- Clients with no-show history

### Deposit Amounts
- **Standard:** $20-$30 fixed
- **Percentage:** 25-50% of service
- **High-end services:** Full prepayment

## Strategy 2: Cancellation Policy

**Sample Policy:**
- 24 hours notice: Free cancellation
- Less than 24 hours: $25 fee
- No-show: Full service charge

Display everywhere:
- Booking confirmation email
- Website booking page
- In confirmation SMS
- Posted in salon

## Strategy 3: Reminder System

**Multi-Touch Reminders:**
1. Email at booking
2. Email 1 week before (for far bookings)
3. Email + SMS 24 hours before
4. SMS 2 hours before

## Strategy 4: Waitlist System

When someone cancels:
1. Text waitlist clients immediately
2. First to respond gets spot
3. Reduces lost revenue

## Three-Strike Policy

1. **First no-show:** Warning + reminder of policy
2. **Second no-show:** Deposit required for future
3. **Third no-show:** Online booking disabled

## Next Steps

- Appointment reminders →
- Cancellation fees →
- Waitlist management →',
false, 5, 5);

-- Article 14: Recurring Appointments
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'appointments'), 
'recurring-appointments',
'Recurring Appointments',
'Set up automatic recurring bookings for regular clients.',
'# Recurring Appointments

Recurring appointments keep your calendar full and clients on schedule.

## Benefits of Recurring Appointments

**For Salons:**
- Predictable revenue stream
- Fuller calendar months in advance
- Reduced last-minute gaps
- Better staff scheduling

**For Clients:**
- Never forget to book
- Guaranteed preferred time slot
- Regular service = better results
- Convenience

## Ideal Services for Recurring

- **Hair Color:** Every 4-6 weeks
- **Haircuts:** Every 4-8 weeks
- **Gel Nails:** Every 2-3 weeks
- **Waxing:** Every 4-6 weeks
- **Lash Extensions:** Every 2-3 weeks

## Setting Up Recurring Appointments

### Option 1: At Checkout
1. Complete current appointment
2. Click **Book Next**
3. Check **Make Recurring**
4. Set frequency
5. Book series

### Option 2: From Calendar
1. Find existing appointment
2. Click **Make Recurring**
3. Configure settings
4. Create series

## Configuration Options

### Frequency
- Every week
- Every 2 weeks
- Every 4 weeks
- Every 6 weeks
- Monthly
- Custom interval

### Duration
- Number of occurrences (e.g., "next 6 visits")
- End date (e.g., "through December")
- Ongoing (until cancelled)

## Managing Recurring Series

### View All Occurrences
1. Click any appointment in series
2. See **Part of recurring series**
3. Click **View All**

### Modify Series
- Change one appointment: Affects single occurrence
- Change entire series: Updates all future occurrences

### Cancel Series
Options:
- Cancel single occurrence
- Cancel this and future
- Cancel entire series

## Best Practices

1. Don''t overbook too far (3-6 months is good)
2. Build in flexibility
3. Incentivize commitment (5% discount)
4. Regular check-ins

## Next Steps

- Managing your calendar →
- Client retention strategies →
- Appointment reminders →',
false, 6, 4);

-- ==========================================
-- CLIENT MANAGEMENT ARTICLES (3)
-- ==========================================

-- Article 15: Adding Client Profiles
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'client-management'), 
'adding-client-profiles',
'Adding Client Profiles',
'Create comprehensive client profiles with contact info, preferences, and service history.',
'# Adding Client Profiles

Build detailed client profiles to deliver personalized service.

## Creating a New Client Profile

1. Click **Clients** → **Add Client**
2. Enter basic information
3. Add preferences and notes
4. Save profile

## Essential Information

**Contact Details:**
- First and last name
- Email address
- Phone number (mobile preferred)
- Alternate contact (optional)

**Demographics:**
- Birthday (for marketing)
- Gender
- Preferred pronouns
- Language preference

**Marketing Consent:**
- ☑ Email marketing
- ☑ SMS marketing
- ☑ Birthday messages
- ☑ Special offers

## Service Preferences

### Hair Color Formulas
Track exact formulas used with dates and results.

### Product Preferences
- Favorite products
- Allergies/sensitivities
- Products to avoid

### Service Preferences
- Preferred staff member
- Preferred day/time
- Service frequency

## Client Notes

### Service Notes
Document each visit: What was done, products used, results achieved.

### Personal Notes
Remember details: Occupation, family info, hobbies, conversation topics.

### Alerts & Warnings
Flag important info: Allergies, sensitivities, special accommodations.

## Custom Fields

Add salon-specific fields:
- Referral source
- Client type (VIP, Regular)
- Membership level
- Gift card balance
- Loyalty points

## Next Steps

- Client history & notes →
- Client communication tools →
- Loyalty programs →',
true, 1, 4);

-- Article 16: Client History & Notes
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'client-management'), 
'client-history-notes',
'Client History & Notes',
'Track client service history, formulas, and important notes for personalized service.',
'# Client History & Notes

Detailed client history enables personalized service and builds long-term relationships.

## Viewing Client History

Access from:
- Client profile page
- During appointment
- At checkout
- Calendar appointment details

## Service History

### Complete Timeline
View chronological list:
- Date of service
- Services performed
- Staff member
- Products used
- Amount paid
- Photos (before/after)

### Service Analytics
Per client:
- Total visits
- Favorite services
- Average ticket
- Lifetime value
- Visit frequency

### Color History
Special tracking for color services:
- Formula used
- Processing time
- Developer volume
- Brand/line
- Result photos

## Note Types

### Service Notes
Document during/after service: What was performed, techniques used, results achieved.

### Personal Notes
Remember details that matter: Life events, preferences, conversation topics.

### Technical Notes
Critical information: Allergies, sensitivities, contraindications.

**Alerts displayed prominently!**

## Photo Documentation

### Before/After Photos
Take and store: Multiple angles, different lighting, close-ups.

### Photo Gallery
Organized by: Date, service type, staff member.

## Communication History

Log all interactions:
- Appointment confirmations
- Reminder messages
- Marketing emails sent
- Phone calls

## Best Practices

1. Note after every service
2. Be specific
3. Update preferences regularly
4. Review before appointment

## Next Steps

- Client communication tools →
- Product recommendations →
- Client retention strategies →',
false, 2, 4);

-- Article 17: Client Communication Tools
INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index, read_time_minutes) VALUES
((SELECT id FROM academy_categories WHERE slug = 'client-management'), 
'client-communication-tools',
'Client Communication Tools',
'Use email, SMS, and messaging to stay connected with clients.',
'# Client Communication Tools

Effective communication builds relationships, increases retention, and boosts revenue.

## Communication Channels

### Email
**Best for:** Newsletters, promotions, long-form content, appointment confirmations.
- ✓ Free unlimited
- ✓ Rich content (images, links)
- ⚠ Lower open rates (20-30%)

### SMS
**Best for:** Reminders, urgent updates, quick questions, time-sensitive offers.
- ✓ 98% open rate
- ✓ Read within 3 minutes
- ⚠ Costs per message

## Automated Campaigns

### Welcome Series
New client sequence:
1. **Day 0:** Welcome email
2. **Day 3:** How to book online
3. **Day 7:** Introduce loyalty program
4. **Day 14:** Service recommendations

### Reactivation
For inactive clients:
1. **60 days:** "We miss you" email
2. **90 days:** Special offer (20% off)
3. **120 days:** SMS reminder
4. **180 days:** Archive as inactive

### Birthday Campaign
Automated birthday messages with special offers.

### Post-Appointment
Follow-up sequence:
1. Thank you + rebook
2. How was your service?
3. Request review
4. Product recommendation

## Manual Messaging

### Individual Messages
Send one-off messages: Running late, appointment confirmation, follow-up question.

### Bulk Messages
Message multiple clients filtered by: Service type, last visit date, tags, birthday month.

## Message Templates

Create templates for common messages:
- Appointment reminders
- Last-minute openings
- Reactivation offers
- Review requests
- Birthday wishes

## Two-Way Messaging

Allow clients to text/message:
- Booking questions
- Reschedule requests
- Product questions

**Respond quickly:** Within 1 hour (business hours).

## Compliance

### SMS Regulations
- Get explicit opt-in
- Include salon name
- Provide opt-out (STOP)
- Honor opt-outs immediately

## Next Steps

- Email campaigns →
- SMS marketing →
- Client retention →',
false, 3, 5);

-- ============================================
-- PART 10: INSERT ARTICLE TAGS
-- ============================================

-- Getting Started tags
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'setup' FROM academy_articles WHERE slug = 'creating-your-salon-profile';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'profile' FROM academy_articles WHERE slug = 'creating-your-salon-profile';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'branding' FROM academy_articles WHERE slug = 'creating-your-salon-profile';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'onboarding' FROM academy_articles WHERE slug = 'creating-your-salon-profile';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'staff' FROM academy_articles WHERE slug = 'adding-your-first-team-member';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'team' FROM academy_articles WHERE slug = 'adding-your-first-team-member';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'permissions' FROM academy_articles WHERE slug = 'adding-your-first-team-member';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'roles' FROM academy_articles WHERE slug = 'adding-your-first-team-member';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'services' FROM academy_articles WHERE slug = 'setting-up-services';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'pricing' FROM academy_articles WHERE slug = 'setting-up-services';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'menu' FROM academy_articles WHERE slug = 'setting-up-services';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'hours' FROM academy_articles WHERE slug = 'configuring-business-hours';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'schedule' FROM academy_articles WHERE slug = 'configuring-business-hours';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'availability' FROM academy_articles WHERE slug = 'configuring-business-hours';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'payments' FROM academy_articles WHERE slug = 'setting-up-payment-methods';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'deposits' FROM academy_articles WHERE slug = 'setting-up-payment-methods';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'credit-card' FROM academy_articles WHERE slug = 'setting-up-payment-methods';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'stripe' FROM academy_articles WHERE slug = 'setting-up-payment-methods';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'booking-page' FROM academy_articles WHERE slug = 'customizing-your-booking-page';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'online-booking' FROM academy_articles WHERE slug = 'customizing-your-booking-page';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'branding' FROM academy_articles WHERE slug = 'customizing-your-booking-page';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'clients' FROM academy_articles WHERE slug = 'inviting-clients';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'import' FROM academy_articles WHERE slug = 'inviting-clients';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'migration' FROM academy_articles WHERE slug = 'inviting-clients';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'appointments' FROM academy_articles WHERE slug = 'your-first-appointment';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'booking' FROM academy_articles WHERE slug = 'your-first-appointment';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'checkout' FROM academy_articles WHERE slug = 'your-first-appointment';

-- Appointments tags
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'calendar' FROM academy_articles WHERE slug = 'managing-your-calendar';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'scheduling' FROM academy_articles WHERE slug = 'managing-your-calendar';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'views' FROM academy_articles WHERE slug = 'managing-your-calendar';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'booking' FROM academy_articles WHERE slug = 'creating-manual-bookings';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'manual' FROM academy_articles WHERE slug = 'creating-manual-bookings';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'phone' FROM academy_articles WHERE slug = 'creating-manual-bookings';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'walk-ins' FROM academy_articles WHERE slug = 'handling-walk-ins';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'last-minute' FROM academy_articles WHERE slug = 'handling-walk-ins';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'reminders' FROM academy_articles WHERE slug = 'appointment-reminders';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'sms' FROM academy_articles WHERE slug = 'appointment-reminders';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'notifications' FROM academy_articles WHERE slug = 'appointment-reminders';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'email' FROM academy_articles WHERE slug = 'appointment-reminders';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'no-shows' FROM academy_articles WHERE slug = 'no-show-prevention';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'deposits' FROM academy_articles WHERE slug = 'no-show-prevention';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'cancellation' FROM academy_articles WHERE slug = 'no-show-prevention';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'policy' FROM academy_articles WHERE slug = 'no-show-prevention';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'recurring' FROM academy_articles WHERE slug = 'recurring-appointments';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'regular-clients' FROM academy_articles WHERE slug = 'recurring-appointments';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'repeat' FROM academy_articles WHERE slug = 'recurring-appointments';

-- Client Management tags
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'clients' FROM academy_articles WHERE slug = 'adding-client-profiles';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'profiles' FROM academy_articles WHERE slug = 'adding-client-profiles';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'crm' FROM academy_articles WHERE slug = 'adding-client-profiles';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'history' FROM academy_articles WHERE slug = 'client-history-notes';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'notes' FROM academy_articles WHERE slug = 'client-history-notes';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'formulas' FROM academy_articles WHERE slug = 'client-history-notes';

INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'communication' FROM academy_articles WHERE slug = 'client-communication-tools';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'email' FROM academy_articles WHERE slug = 'client-communication-tools';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'sms' FROM academy_articles WHERE slug = 'client-communication-tools';
INSERT INTO academy_article_tags (article_id, tag) SELECT id, 'marketing' FROM academy_articles WHERE slug = 'client-communication-tools';

-- ============================================
-- PART 11: VERIFICATION QUERY
-- ============================================

-- Run this to verify the setup worked correctly
SELECT 
  c.title AS category,
  c.icon,
  COUNT(a.id) AS article_count,
  COUNT(CASE WHEN a.is_featured THEN 1 END) AS featured_count
FROM academy_categories c
LEFT JOIN academy_articles a ON a.category_id = c.id
GROUP BY c.id, c.title, c.icon, c.order_index
ORDER BY c.order_index;

-- Show all articles with their categories
SELECT 
  c.title AS category,
  a.title AS article,
  a.is_featured,
  a.read_time_minutes,
  (SELECT COUNT(*) FROM academy_article_tags t WHERE t.article_id = a.id) AS tag_count
FROM academy_articles a
JOIN academy_categories c ON c.id = a.category_id
ORDER BY c.order_index, a.order_index;

-- ============================================
-- COMPLETE! 
-- ============================================
-- 
-- Summary:
-- - 8 categories created
-- - 17 articles with full markdown content
-- - 50+ article tags for search optimization
-- - Full-text search enabled
-- - RLS policies configured
-- - View count tracking ready
-- - Feedback system ready
-- - Search analytics ready
--
-- Test the full-text search:
-- SELECT * FROM search_academy_articles('booking');
--
-- ============================================
