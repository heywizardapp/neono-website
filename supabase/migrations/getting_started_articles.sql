-- ============================================
-- NeonO Academy - Getting Started Articles
-- Inserting 8 articles
-- ============================================

INSERT INTO academy_articles (category_id, slug, title, description, content, order_index) VALUES

-- Article 1: Creating Your Salon Profile
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

Enter your full business address:

```
Street Address: 123 Main Street
City: Toronto
Province/State: Ontario
Postal/Zip Code: M5V 1A1
Country: Canada
```

This address will be used for:
- Google Maps integration on your booking page
- Direction links in confirmation emails
- Local SEO optimization

## Step 4: Set Business Hours

Configure your operating hours for each day:

1. Click **Business Hours**
2. For each day, toggle on/off if you''re open
3. Set opening and closing times
4. Add break times if needed

**Pro Tip:** You can set different hours for different days. Perfect for salons with extended weekend hours!

## Step 5: Upload Your Logo

1. Click **Upload Logo**
2. Choose an image file (PNG or JPG)
3. Recommended size: 500x500px
4. Click **Save**

Your logo appears on:
- Your booking page header
- Email templates
- Printed receipts

## Step 6: Configure Preferences

Set your preferences for:
- **Time Zone:** Ensure appointments show correct times
- **Currency:** CAD, USD, etc.
- **Language:** English, French, etc.
- **Date Format:** MM/DD/YYYY or DD/MM/YYYY

## Next Steps

Now that your profile is set up, you''re ready to:
- [Add your first team member](#) →
- [Set up your services](#) →
- [Customize your booking page](#) →

## Frequently Asked Questions

**Q: Can I change my business name later?**
A: Yes, you can update your business name anytime in Settings. Existing bookings will retain the old name.

**Q: Do I need to add a logo?**
A: No, it''s optional. If you don''t add one, your business name will appear as text.

**Q: How do I add multiple locations?**
A: See our [Multi-Location Management](#) guide for details.

## Need Help?

Still have questions? [Contact our support team](#) or [book a demo](#).
',
1),

-- Article 2: Adding Your First Team Member
((SELECT id FROM academy_categories WHERE slug = 'getting-started'),
'adding-your-first-team-member',
'Adding Your First Team Member',
'Invite staff members, set their roles and permissions, and configure their services.',
'# Adding Your First Team Member

Growing your team? Learn how to add staff members, set their permissions, and configure their availability.

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
3. Add recurring time off (e.g., always off on Mondays)
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

## Managing Multiple Team Members

For larger teams:
- Use **Bulk Import** to add multiple staff at once
- Set up **Service Categories** to organize offerings
- Create **Staff Groups** for easier scheduling

## Next Steps

- [Set up commission tracking](#) →
- [Configure staff scheduling](#) →
- [Set up time-off requests](#) →

## Need Help?

Having trouble? [Contact support](#) for assistance.
',
2),

-- Article 3: Setting Up Services
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
Set one price for all clients:
```
Women''s Haircut: $65
Men''s Haircut: $45
```

### Variable Pricing
Set price ranges:
```
Color Service: $80 - $150
(Final price determined at consultation)
```

### Staff-Specific Pricing
Different prices per stylist:
```
Junior Stylist: $45
Senior Stylist: $65
Master Stylist: $85
```

## Service Duration

Set realistic durations including:
- Service time
- Processing time
- Cleanup between clients
- Buffer time if needed

**Example:**
- Haircut: 45 minutes
- Full Color: 2 hours
- Manicure: 30 minutes

## Add-On Services

Create services that can be added to main services:
- Deep Conditioning Treatment (+$20, +15 min)
- Scalp Massage (+$15, +10 min)
- Paraffin Wax Treatment (+$10, +10 min)

Enable "Can be added to other services" when creating.

## Service Visibility

Control when services appear:
- **Online Booking:** Visible to public
- **In-Store Only:** Staff can book but not visible online
- **Private:** Only for specific clients
- **Archived:** Hidden but keeps historical data

## Resources & Requirements

Assign resources to services:
- Treatment rooms
- Equipment (e.g., pedicure chair)
- Products used (for inventory tracking)

## Next Steps

- [Customize your booking page](#) →
- [Set up service packages](#) →
- [Configure pricing tiers](#) →
',
3),

-- Article 4: Configuring Business Hours
((SELECT id FROM academy_categories WHERE slug = 'getting-started'),
'configuring-business-hours',
'Configuring Business Hours',
'Set your salon''s operating hours, breaks, and special holiday closures.',
'# Configuring Business Hours

Properly configured business hours ensure clients can only book when you''re actually open. Set up regular hours, breaks, and holidays.

## Setting Regular Hours

1. Go to **Settings** → **Business Hours**
2. For each day:
   - Toggle **Open** or **Closed**
   - Set opening time
   - Set closing time
   - Add breaks if needed

**Example Schedule:**
```
Monday:    9:00 AM - 6:00 PM
Tuesday:   9:00 AM - 6:00 PM
Wednesday: 9:00 AM - 8:00 PM (late night)
Thursday:  9:00 AM - 8:00 PM
Friday:    9:00 AM - 6:00 PM
Saturday:  8:00 AM - 5:00 PM
Sunday:    Closed
```

## Adding Break Times

Prevent bookings during lunch or staff meetings:

1. Click **Add Break**
2. Set break start and end time
3. Choose if it applies to:
   - All staff
   - Specific staff members
   - Specific days

**Common Breaks:**
- Lunch: 12:00 PM - 1:00 PM
- Team Meeting: Tuesday 8:00 AM - 9:00 AM

## Buffer Times

Add padding between appointments:
- **Before:** Prep time before service
- **After:** Cleanup time after service

**Example:**
- Service duration: 45 minutes
- After buffer: 15 minutes
- Total blocked time: 60 minutes

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

## Staff-Specific Hours

Override business hours per staff member:
- Part-time staff with limited availability
- Senior stylists with different schedules
- Mobile services with flexible hours

## Booking Lead Time

Prevent last-minute bookings:
- **Minimum lead time:** How far in advance clients must book (e.g., 2 hours)
- **Maximum lead time:** How far ahead they can book (e.g., 90 days)

## Next Steps

- [Managing your calendar](#) →
- [Time-off management](#) →
- [Special hours setup](#) →
',
4),

-- Article 5: Setting Up Payment Methods
((SELECT id FROM academy_categories WHERE slug = 'getting-started'),
'setting-up-payment-methods',
'Setting Up Payment Methods',
'Configure payment processing, deposits, and accepted payment types.',
'# Setting Up Payment Methods

Accept payments seamlessly with NeonO''s integrated payment processing. Set up credit cards, deposits, and payment policies.

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
2. Select your processor:
   - Stripe (recommended)
   - Square
   - Moneris (Canada)

### Step 2: Connect Account
1. Click **Connect**
2. Sign in to your processor account
3. Authorize NeonO access
4. Complete verification

**Processing typically starts within 1-2 business days.**

## Payment Settings

### Accepted Payment Types
Enable/disable payment methods:
- ☑ Credit/Debit Cards
- ☑ Cash
- ☑ Gift Cards
- ☐ Checks (not recommended)

### Tipping
Configure tip options:
- Suggested percentages (15%, 18%, 20%, 25%)
- Custom tip amount
- No tip option
- Default tip percentage

### Receipts
- Email receipts automatically
- Print receipts at checkout
- Include itemized services
- Show tip separately

## Booking Deposits

Require deposits to reduce no-shows:

1. Go to **Settings** → **Booking Policies**
2. Enable **Require Deposit**
3. Set deposit amount:
   - Fixed amount ($20)
   - Percentage (50%)
   - Full prepayment (100%)

**Best Practice:** Require deposits for appointments over 1 hour or new clients.

## Cancellation Fees

Charge fees for late cancellations:
- Free cancellation up to 24 hours
- 50% charge for 24-12 hours
- 100% charge for <12 hours or no-shows

## Payment At Checkout

When checking out a client:
1. Review services and products
2. Add tips
3. Select payment method
4. Process payment
5. Email or print receipt

## Refunds & Voids

- **Void:** Cancel transaction (same day only)
- **Refund:** Return payment (partial or full)
- **Refund to gift card:** Store credit option

## Next Steps

- [Processing checkout](#) →
- [Managing refunds](#) →
- [Gift card setup](#) →
',
5),

-- Article 6: Customizing Your Booking Page
((SELECT id FROM academy_categories WHERE slug = 'getting-started'),
'customizing-your-booking-page',
'Customizing Your Booking Page',
'Design your online booking page with branding, photos, and custom settings.',
'# Customizing Your Booking Page

Your booking page is often the first impression clients have of your salon. Make it beautiful and on-brand.

## Accessing Booking Page Settings

1. Go to **Settings** → **Online Booking**
2. Click **Customize Appearance**

Your booking page URL:
```
yoursalon.neono.app
```

## Branding & Design

### Logo & Colors
- Upload your logo (appears in header)
- Set primary color (matches your brand)
- Choose button style (rounded, square)
- Select font style

**Pro Tip:** Use your brand colors for a cohesive look!

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

**Example:**
```
Welcome to Bella Salon! With 15 years of experience,
we specialize in color correction and modern cuts.
Our team of 8 stylists is here to make you look
and feel your best.
```

## Booking Flow Settings

### Service Selection
- Show all services at once
- Group by category
- Show staff photos with services

### Staff Selection
- Show all available staff
- Allow "No Preference" option
- Show staff bio and experience

### Date & Time Selection
- Calendar view or time slot list
- Show available slots only
- Display wait time for popular slots

## Custom Fields

Add fields to booking form:
- Special requests
- Referred by
- First-time visitor?
- Parking validation needed?

## Booking Policies

Display important policies:
- Cancellation policy
- Late arrival policy
- Deposit requirements
- COVID-19 protocols

**Example Policy:**
```
Please arrive 5 minutes early for your appointment.
Late arrivals may result in shortened service time.
Cancellations require 24 hours notice.
```

## SEO & Social

Optimize for search:
- **Meta Title:** "Bella Salon - Premier Hair Salon in Toronto"
- **Meta Description:** 155-character description
- **Keywords:** Add relevant terms
- **Social Image:** Appears when shared on social media

## Booking Page Features

Enable optional features:
- ☑ Allow gift card purchases
- ☑ Show reviews/testimonials
- ☑ Display Instagram feed
- ☑ Show promotions banner
- ☐ Require account creation

## Mobile Preview

Always check mobile view:
1. Click **Preview Mobile**
2. Test booking flow
3. Verify all text is readable
4. Ensure buttons are easy to tap

## Custom Domain

Upgrade to use your own domain:
```
book.yoursalon.com
```

Instead of:
```
yoursalon.neono.app
```

## Next Steps

- [Share your booking page](#) →
- [Social media integration](#) →
- [SEO optimization](#) →
',
6),

-- Article 7: Inviting Clients
((SELECT id FROM academy_categories WHERE slug = 'getting-started'),
'inviting-clients',
'Inviting Clients',
'Import existing clients and send invitations to book online.',
'# Inviting Clients

Migrate your existing client base to NeonO and invite them to start booking online.

## Importing Existing Clients

### From Spreadsheet
1. Download our **CSV template**
2. Fill in client data:
   - First name, Last name
   - Email, Phone
   - Birthday (optional)
   - Notes (optional)
3. Go to **Clients** → **Import**
4. Upload your CSV file
5. Map columns to NeonO fields
6. Review and confirm import

**Template Columns:**
```
FirstName, LastName, Email, Phone, Birthday, Notes
John, Doe, john@email.com, 416-555-0100, 1985-06-15, Prefers Sarah
```

### From Another System
NeonO can import from:
- Fresha
- Square Appointments
- Vagaro
- Booker
- Salon Iris

Contact support for migration assistance.

## Manual Client Entry

Add clients one at a time:
1. Click **Add Client**
2. Enter basic details
3. Add notes about preferences
4. Save client profile

## Sending Invitations

### Bulk Invitation Email
1. Go to **Clients** → **Invitations**
2. Select clients to invite
3. Customize email message
4. Click **Send Invitations**

**Sample Email:**
```
Hi {FirstName},

We''re excited to announce that you can now book
appointments online 24/7!

Visit our booking page:
[Book Now Button]

- View available times
- Manage your appointments
- Earn loyalty points

See you soon!
- The Bella Salon Team
```

### SMS Invitation
Upgrade to send SMS:
```
Hi {FirstName}! Book your next appointment online
at bella.neono.app. See you soon! - Bella Salon
```

## Client Onboarding

When clients first visit:
1. They see your booking page
2. Create account (or guest checkout)
3. Select service & staff
4. Choose date & time
5. Confirm booking

**First-time perks:**
- Send welcome discount code
- Offer loyalty program signup
- Include service menu PDF

## QR Code for In-Salon

Print QR codes for:
- Reception desk
- Service stations
- Washroom mirrors
- Retail display

Clients scan → go directly to booking page.

**Generate QR Code:**
1. Go to **Marketing** → **QR Codes**
2. Download high-res PNG
3. Print on business cards, stickers, posters

## Next Steps

- [Client communication tools](#) →
- [Setting up loyalty programs](#) →
- [Client retention strategies](#) →
',
7),

-- Article 8: Your First Appointment
((SELECT id FROM academy_categories WHERE slug = 'getting-started'),
'your-first-appointment',
'Your First Appointment',
'Walk through creating, confirming, and completing your first appointment.',
'# Your First Appointment

Ready to book your first appointment? This guide walks you through the entire process from booking to checkout.

## Creating an Appointment

### Option 1: Online Booking (Client-Initiated)
1. Client visits your booking page
2. Selects service & staff
3. Chooses date & time
4. Enters contact info
5. Confirms booking

You receive automatic notification.

### Option 2: Manual Booking (Staff-Initiated)
1. Click **Calendar** → **New Appointment**
2. Select client (or create new)
3. Choose service
4. Assign staff member
5. Pick date & time
6. Add notes
7. Click **Book**

**Pro Tip:** Use manual booking for phone-in appointments or walk-ins.

## Appointment Confirmations

Automatic confirmations sent via:
- Email (immediate)
- SMS (24 hours before, if enabled)
- App notification (for clients with app)

**Confirmation includes:**
- Service details
- Staff member name
- Date, time, location
- Cancellation policy
- Add to calendar link

## Pre-Appointment Reminders

Send reminders to reduce no-shows:
- **24 hours before:** Email + SMS
- **2 hours before:** SMS only
- **Custom timing:** Set your own

**Reminder message:**
```
Hi {ClientName},

Reminder: You have a {ServiceName} appointment
tomorrow at {Time} with {StaffName}.

Reply CONFIRM or tap here to manage:
[Manage Booking]

See you soon!
```

## Day of Appointment

### Client Arrives
1. Check them in on dashboard
2. Client status changes to "In Progress"
3. Timer starts for service tracking

### During Service
- Add notes to client profile
- Recommend products
- Upsell additional services
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
Send automatic review request (24 hours later):
```
How was your experience at Bella Salon?

[5 Star Rating]

Share your experience:
[Leave Review Button]
```

### Client Notes
Add notes for next visit:
- Formulas used
- Preferences discovered
- Products recommended
- Next service suggestions

**Example Note:**
```
6/15/24 - Color: L''Oreal 7N + 20vol (30 min)
Loved the result. Next: Add highlights.
Interested in purple shampoo for retail.
```

## Rescheduling & Cancellations

### Client-Initiated
Clients can reschedule/cancel from:
- Confirmation email
- Their account dashboard
- Mobile app

### Staff-Initiated
1. Find appointment on calendar
2. Click **Reschedule** or **Cancel**
3. Add reason (optional)
4. Automatic notification sent to client

## No-Shows

If client doesn''t arrive:
1. Mark as **No-Show**
2. Cancellation fee charged (if configured)
3. Client marked for follow-up

**Follow-up SMS:**
```
We missed you today! Life happens. 
Reply to reschedule - we''d love to see you soon.
```

## Next Steps

- [Managing your calendar](#) →
- [Client communication tools](#) →
- [Processing checkout](#) →

## Troubleshooting

**Q: Client didn''t receive confirmation**
Check: Email spelling, spam folder, SMS opt-in status

**Q: Appointment not showing on calendar**
Check: Correct date selected, staff member assigned, not filtered out

**Q: Can''t process payment**
Check: Payment processor connected, card reader charged, internet connection
',
8);

-- ============================================
-- Verification Query
-- ============================================

SELECT 
  c.title as category,
  COUNT(a.id) as article_count
FROM academy_categories c
LEFT JOIN academy_articles a ON a.category_id = c.id
WHERE c.slug = 'getting-started'
GROUP BY c.title, c.order_index
ORDER BY c.order_index;

-- Expected result:
-- Getting Started: 8
