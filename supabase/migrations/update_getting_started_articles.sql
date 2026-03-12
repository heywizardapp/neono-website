-- ============================================
-- NeonO Academy - Getting Started Articles
-- Updated with step-specific images (49 total)
-- Run in Supabase SQL Editor
-- ============================================

-- Article 1: Creating Your Salon Profile (7 images)
UPDATE academy_articles 
SET content = '# Creating Your Salon Profile

Set up your business information to start accepting online bookings.

## Before You Begin

Make sure you have:
- Your business name and legal address
- Contact phone number and email
- Business hours for each day
- Your logo image file (optional, PNG or JPG)

## Steps

### 1. Open Business Settings

Click the **Settings** icon in the left sidebar, then select **Business Profile**.

![Screenshot: Settings sidebar with Business Profile highlighted](/images/academy/profile-step1-settings-sidebar.svg)

### 2. Enter Your Business Name

Type your salon''s name in the **Business Name** field. This appears on your booking page and receipts.

![Screenshot: Business name field with example "Bella Salon"](/images/academy/profile-step2-business-name.svg)

**💡 Pro Tip:** Use your legal business name for consistency across invoices and tax documents.

### 3. Add Contact Information

Fill in your phone number, email address, and website URL (optional).

![Screenshot: Contact information section with phone, email, and website fields](/images/academy/profile-step3-contact-info.svg)

### 4. Set Your Location

Enter your complete business address including street, city, province, and postal code.

![Screenshot: Address form with map preview](/images/academy/profile-step4-address.svg)

**💡 Pro Tip:** Double-check your postal code—it helps clients find you and improves local SEO.

### 5. Configure Business Hours

Click **Business Hours** and set your operating times for each day of the week.

![Screenshot: Weekly business hours grid with toggles and time selectors](/images/academy/profile-step5-business-hours.svg)

### 6. Upload Your Logo

Click **Upload Logo** and select your image file. Recommended size: 500×500px.

![Screenshot: Logo upload section with drag-and-drop zone](/images/academy/profile-step6-logo-upload.svg)

**💡 Pro Tip:** Use a square logo with a transparent background for the cleanest look.

### 7. Save Your Changes

Click the purple **Save Changes** button at the bottom of the page.

![Screenshot: Save Changes button with success confirmation](/images/academy/profile-step7-save-button.svg)

## What''s Next

- [Adding Your First Team Member](/academy/getting-started/adding-your-first-team-member)
- [Setting Up Services](/academy/getting-started/setting-up-services)
- [Customizing Your Booking Page](/academy/getting-started/customizing-your-booking-page)
',
updated_at = NOW()
WHERE slug = 'creating-your-salon-profile';

-- Article 2: Adding Your First Team Member (6 images)
UPDATE academy_articles 
SET content = '# Adding Your First Team Member

Invite staff members and configure their roles, services, and availability.

## Before You Begin

Make sure you have:
- Staff member''s email address
- Their role (Owner, Manager, Stylist, Receptionist)
- List of services they''ll perform
- Their working schedule

## Steps

### 1. Navigate to Staff

Click **Staff** in the main menu, then click the purple **+ Add Team Member** button.

![Screenshot: Staff page with Add Team Member button highlighted](/images/academy/team-step1-staff-menu.svg)

### 2. Enter Basic Information

Fill in the staff member''s name, email address, and job title.

![Screenshot: Basic info form with name, email, and job title fields](/images/academy/team-step2-basic-info.svg)

**💡 Pro Tip:** Use professional titles clients recognize—"Color Specialist" sounds better than "Colorist Level 2."

### 3. Select Their Role

Choose a permission level from the dropdown menu.

![Screenshot: Role dropdown showing Owner, Manager, Stylist, Receptionist options](/images/academy/team-step3-role-dropdown.svg)

### 4. Assign Services

Click the **Services** tab and check which services they can perform.

![Screenshot: Services checklist with pricing options per staff member](/images/academy/team-step4-services.svg)

**💡 Pro Tip:** Senior stylists can have premium pricing—set their rate higher than the base service price.

### 5. Set Availability

Click the **Availability** tab and configure their working hours for each day.

![Screenshot: Weekly availability schedule with time pickers](/images/academy/team-step5-availability.svg)

### 6. Send the Invitation

Review the details and click **Send Invitation** to email them a login link.

![Screenshot: Invitation confirmation with Send Invitation button](/images/academy/team-step6-send-invite.svg)

**💡 Pro Tip:** Staff members can set their own password when they first log in.

## What''s Next

- [Setting Up Services](/academy/getting-started/setting-up-services)
- [Configuring Business Hours](/academy/getting-started/configuring-business-hours)
- [Managing Staff Schedules](/academy/staff/individual-schedules)
',
updated_at = NOW()
WHERE slug = 'adding-your-first-team-member';

-- Article 3: Setting Up Services (7 images)
UPDATE academy_articles 
SET content = '# Setting Up Services

Create your service menu with pricing, durations, and staff assignments.

## Before You Begin

Make sure you have:
- List of services you offer
- Pricing for each service
- Duration for each service
- Categories to organize services (Hair, Nails, Spa, etc.)

## Steps

### 1. Open Services

Click **Services** in the main menu to view your service list.

![Screenshot: Services page with service categories and Add Service button](/images/academy/services-step1-services-page.svg)

### 2. Add a New Service

Click the purple **+ Add Service** button to open the service creation modal.

![Screenshot: Add Service modal with empty form fields](/images/academy/services-step2-add-service-modal.svg)

### 3. Set Pricing

Enter the service price. Choose **Fixed** for set prices or **From** for variable pricing.

![Screenshot: Pricing section with fixed and variable options](/images/academy/services-step3-pricing.svg)

**💡 Pro Tip:** Use "From $X" pricing for services that vary by length or complexity—like color services.

### 4. Set Duration

Select the service duration in 15-minute increments from the dropdown.

![Screenshot: Duration dropdown showing time options](/images/academy/services-step4-duration.svg)

### 5. Add a Description

Write a brief description of what''s included. Keep it under 2 sentences.

![Screenshot: Description text field with example text](/images/academy/services-step5-description.svg)

**💡 Pro Tip:** Mention what makes this service special—clients read descriptions when deciding.

### 6. Assign Staff Members

Select which team members can perform this service.

![Screenshot: Staff assignment checkboxes with individual pricing options](/images/academy/services-step6-staff-assignment.svg)

### 7. Set Visibility

Choose where the service appears: Online Booking, In-Store Only, or Archived.

![Screenshot: Visibility toggle options](/images/academy/services-step7-visibility.svg)

**💡 Pro Tip:** Use "In-Store Only" for services you want to upsell in person but not show online.

## What''s Next

- [Customizing Your Booking Page](/academy/getting-started/customizing-your-booking-page)
- [Creating Service Packages](/academy/services/service-packages)
- [Setting Up Add-on Services](/academy/services/add-on-services)
',
updated_at = NOW()
WHERE slug = 'setting-up-services';

-- Article 4: Configuring Business Hours (5 images)
UPDATE academy_articles 
SET content = '# Configuring Business Hours

Set your salon''s operating hours, breaks, and holiday closures.

## Before You Begin

Make sure you know:
- Opening and closing times for each day
- Any days you''re closed
- Break times (lunch, team meetings)
- Upcoming holidays you''ll close for

## Steps

### 1. Open Business Hours

Go to **Settings** → **Business Hours** to see the weekly schedule overview.

![Screenshot: Business Hours settings page with weekly grid](/images/academy/hours-step1-settings-hours.svg)

### 2. Set Daily Hours

For each day, toggle **Open/Closed** and set your start and end times.

![Screenshot: Daily hours editor with time pickers](/images/academy/hours-step2-daily-hours.svg)

**💡 Pro Tip:** Have late nights? Set Wednesday/Thursday to close at 8 PM for clients who work 9-to-5.

### 3. Add Break Times

Click **+ Add Break** to create lunch breaks or team meeting times.

![Screenshot: Break time configuration with add/remove buttons](/images/academy/hours-step3-breaks.svg)

### 4. Add Holiday Closures

Click **Add Closure** to block out holidays and special closures.

![Screenshot: Holiday closure modal with date picker and reason field](/images/academy/hours-step4-holiday-closure.svg)

**💡 Pro Tip:** Add your holiday closures at the start of each year so clients can''t book those dates.

### 5. Set Booking Lead Time

Configure minimum and maximum advance booking times.

![Screenshot: Lead time settings with minimum and maximum fields](/images/academy/hours-step5-lead-time.svg)

**💡 Pro Tip:** Require at least 2-hour lead time to avoid last-minute bookings you can''t prepare for.

## What''s Next

- [Setting Up Payment Methods](/academy/getting-started/setting-up-payment-methods)
- [Managing Staff Schedules](/academy/staff/individual-schedules)
- [Time-Off Management](/academy/staff/time-off-management)
',
updated_at = NOW()
WHERE slug = 'configuring-business-hours';

-- Article 5: Setting Up Payment Methods (6 images)
UPDATE academy_articles 
SET content = '# Setting Up Payment Methods

Configure payment processing, deposits, and cancellation policies.

## Before You Begin

Make sure you have:
- A Stripe account (or create one during setup)
- Your bank account details for payouts
- Decided on deposit and cancellation policies

## Steps

### 1. Open Payment Settings

Go to **Settings** → **Payments** to configure your payment options.

![Screenshot: Payment settings page with payment methods overview](/images/academy/payments-step1-payments-page.svg)

### 2. Connect Stripe

Click **Connect with Stripe** and follow the prompts to link your account.

![Screenshot: Stripe Connect button and authorization flow](/images/academy/payments-step2-connect-stripe.svg)

**💡 Pro Tip:** Stripe has the lowest fees and fastest payouts for most salons.

### 3. Enable Payment Types

Check which payment methods you''ll accept: cards, cash, and gift cards.

![Screenshot: Payment type toggles for cards, cash, gift cards](/images/academy/payments-step3-deposit-settings.svg)

### 4. Configure Deposits

Toggle **Require Deposits** and set your deposit amount or percentage.

![Screenshot: Deposit configuration with percentage and fixed amount options](/images/academy/payments-step4-cancellation.svg)

**💡 Pro Tip:** Require deposits for appointments over 1 hour or for new clients to reduce no-shows.

### 5. Set Cancellation Policy

Configure cancellation windows and fees for late cancellations.

![Screenshot: Cancellation policy settings with time windows and fee percentages](/images/academy/payments-step5-tax-settings.svg)

### 6. Save Your Settings

Review your configuration and click **Save** to apply changes.

![Screenshot: Payment setup complete with summary and Save button](/images/academy/payments-step6-complete.svg)

**💡 Pro Tip:** Test your checkout flow by creating a test appointment to ensure everything works.

## What''s Next

- [Customizing Your Booking Page](/academy/getting-started/customizing-your-booking-page)
- [Processing Checkout](/academy/payments/processing-checkout)
- [Setting Up Gift Cards](/academy/payments/gift-cards)
',
updated_at = NOW()
WHERE slug = 'setting-up-payment-methods';

-- Article 6: Customizing Your Booking Page (6 images)
UPDATE academy_articles 
SET content = '# Customizing Your Booking Page

Design your online booking page with your brand colors, logo, and photos.

## Before You Begin

Make sure you have:
- Your logo (500×500px, PNG or JPG)
- A cover photo (1920×600px recommended)
- Your brand color hex code
- A short description of your salon

## Steps

### 1. Open Booking Page Settings

Go to **Settings** → **Online Booking** to access the customization options.

![Screenshot: Booking page settings with design panel](/images/academy/booking-step1-customization.svg)

### 2. Customize Your URL

Set your custom booking page URL (e.g., yoursalon.neono.app).

![Screenshot: URL customization with availability check](/images/academy/booking-step2-url.svg)

**💡 Pro Tip:** Use your salon name without spaces for a clean, memorable URL.

### 3. Add Your Content

Write your salon description, confirmation message, and policy links.

![Screenshot: Content editor with description and policy fields](/images/academy/booking-step3-content.svg)

### 4. Configure Display Settings

Choose which services to show and whether clients can select specific staff.

![Screenshot: Display options with service visibility and staff selection toggles](/images/academy/booking-step4-settings.svg)

**💡 Pro Tip:** Let clients choose their preferred stylist—it increases booking completion by 40%.

### 5. Share Your Booking Page

Copy your booking link, share on social media, or generate a QR code.

![Screenshot: Share options with copy link, social buttons, and QR code](/images/academy/booking-step5-share.svg)

### 6. Preview Your Page

Click **Preview** to see exactly how clients will experience your booking page.

![Screenshot: Live preview of booking page with mobile and desktop views](/images/academy/booking-step6-live-preview.svg)

**💡 Pro Tip:** Test the booking flow yourself to catch any issues before going live.

## What''s Next

- [Inviting Clients](/academy/getting-started/inviting-clients)
- [Setting Up Promotions](/academy/marketing/promotions)
- [Custom Domain Setup](/academy/settings/custom-domain)
',
updated_at = NOW()
WHERE slug = 'customizing-your-booking-page';

-- Article 7: Inviting Clients (5 images)
UPDATE academy_articles 
SET content = '# Inviting Clients

Import your existing clients and invite them to book online.

## Before You Begin

Make sure you have:
- A CSV file with client data (or add clients manually)
- Client emails and/or phone numbers
- Client names (first and last)

## Steps

### 1. Open the Clients Page

Click **Clients** in the main menu to view your client database.

![Screenshot: Clients page with Add Client and Import buttons](/images/academy/clients-step1-clients-page.svg)

### 2. Add a Client Manually

Click **+ Add Client** and enter their name, email, and phone number.

![Screenshot: Add Client modal with form fields](/images/academy/clients-step2-add-client.svg)

**💡 Pro Tip:** Check "Send welcome email" to automatically invite them to book.

### 3. Import from CSV

Click **Import** to upload a CSV file with multiple clients at once.

![Screenshot: CSV import wizard with file upload and column mapping](/images/academy/clients-step3-import.svg)

### 4. Send Welcome Emails

Select clients and click **Send Invitation** to email them your booking link.

![Screenshot: Welcome email preview with booking button](/images/academy/clients-step4-welcome-email.svg)

**💡 Pro Tip:** Personalize the welcome email with your salon''s voice—friendly beats formal.

### 5. View Your Client List

See all your clients with their contact info, visit history, and booking status.

![Screenshot: Client list with status badges and search filters](/images/academy/clients-step5-client-list.svg)

## What''s Next

- [Your First Appointment](/academy/getting-started/your-first-appointment)
- [Setting Up Automated Reminders](/academy/communications/appointment-reminders)
- [Creating a Loyalty Program](/academy/marketing/loyalty-programs)
',
updated_at = NOW()
WHERE slug = 'inviting-clients';

-- Article 8: Your First Appointment (7 images)
UPDATE academy_articles 
SET content = '# Your First Appointment

Book, manage, and complete your first appointment from start to finish.

## Before You Begin

Make sure you have:
- At least one service set up
- At least one staff member configured
- Business hours configured

## Steps

### 1. Open the Calendar

Click **Calendar** in the main menu to view your appointment schedule.

![Screenshot: Calendar view with week layout and time slots](/images/academy/appointment-step1-calendar.svg)

### 2. Select a Client

Click **+ New Appointment** and search for an existing client or add a new one.

![Screenshot: Client selection with search and recent clients](/images/academy/appointment-step2-select-client.svg)

**💡 Pro Tip:** For walk-ins, use "Walk-In Client" to track appointments without client details.

### 3. Choose the Service

Select a service from your menu. Duration auto-fills based on your settings.

![Screenshot: Service selection dropdown with categories and prices](/images/academy/appointment-step3-select-service.svg)

### 4. Assign a Staff Member

Choose which team member will perform the service.

![Screenshot: Staff selection with availability indicators](/images/academy/appointment-step4-select-staff.svg)

**💡 Pro Tip:** Only staff assigned to that service appear in the list.

### 5. Pick Date and Time

Select the appointment date and choose an available time slot.

![Screenshot: Date picker and time slot grid with availability](/images/academy/appointment-step5-select-time.svg)

### 6. Review and Confirm

Check all details and click **Confirm** to book the appointment.

![Screenshot: Appointment summary with confirm button](/images/academy/appointment-step6-confirmation.svg)

### 7. Appointment Booked!

The appointment is added to your calendar and the client receives a confirmation email.

![Screenshot: Success confirmation with calendar preview and next actions](/images/academy/appointment-step7-complete.svg)

**💡 Pro Tip:** Book their next appointment at checkout—clients are 80% more likely to return when they leave with a booking.

## What''s Next

- [Setting Up Appointment Reminders](/academy/appointments/reminders)
- [Handling Cancellations](/academy/appointments/cancellations)
- [Processing Checkout](/academy/payments/processing-checkout)
',
updated_at = NOW()
WHERE slug = 'your-first-appointment';

-- ============================================
-- Verification Query
-- ============================================
SELECT slug, title, LENGTH(content) as content_length, updated_at
FROM academy_articles
WHERE category_id = (SELECT id FROM academy_categories WHERE slug = 'getting-started')
ORDER BY order_index;
