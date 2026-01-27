--- ============================================
-- NeonO Academy - Appointments Articles
-- Inserting 6 articles
-- ============================================

INSERT INTO academy_articles (category_id, slug, title, description, content, order_index) VALUES

-- Article 1: Managing Your Calendar
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

**Quick Search:**
Type client name in search box to jump to their appointments.

## Color Coding

Appointments colored by:
- **Status:** Confirmed (green), Pending (yellow), Cancelled (red)
- **Staff:** Each staff member has unique color
- **Service Type:** Group by service category

**Customize Colors:**
Settings → Calendar → Color Scheme

## Calendar Settings

**Time Increments:**
- 15 minutes (default)
- 30 minutes
- 60 minutes

**Display Options:**
- Show/hide cancelled appointments
- Show/hide blocked time
- Show/hide client phone numbers
- Compact or expanded view

## Multi-Staff View

See multiple calendars at once:
1. Enable **Multi-Staff View**
2. Select staff members to display
3. View side-by-side or stacked

**Best for:**
- Receptionists booking for multiple stylists
- Managers monitoring schedule
- Coordinating team breaks

## Booking Conflicts

NeonO prevents double-booking:
- ❌ Same staff, overlapping times
- ❌ Resource conflicts (pedicure chair)
- ✓ Different staff, same time (allowed)

**Warning shown when:**
- Staff on break
- Outside business hours
- Close to other appointment

## Time Blocks

Block time for:
- Staff meetings
- Lunch breaks
- Education/training
- Admin work
- Cleaning/maintenance

**Create Block:**
1. Click time slot
2. Select **Block Time**
3. Add title and notes
4. Set repeat frequency

## Printing Your Schedule

Print daily/weekly schedules:
1. Select date range
2. Click **Print**
3. Choose:
   - Full details
   - Compact view
   - Client phone numbers

**Pro Tip:** Print tomorrow''s schedule at end of each day.

## Next Steps

- [Creating manual bookings](#) →
- [Handling walk-ins](#) →
- [Staff scheduling](#) →
',
1),

-- Article 2: Creating Manual Bookings
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

**Example:**
- 2:00 PM - Haircut (45 min)
- 2:45 PM - Color (90 min)
- Total: 2:15 hours

## Booking for Walk-Ins

When client arrives without appointment:
1. Check staff availability
2. Create "Walk-In" appointment
3. Mark as **In Progress** immediately
4. Start service

**Walk-In Tip:** Enable "Show walk-in availability" to see open slots.

## Finding Available Time

**Smart Search:**
1. Click **Find Time**
2. Enter:
   - Client name
   - Service needed
   - Preferred date/time range
   - Preferred staff (or any)
3. See all available slots
4. Click to book

**Looks at:**
- Staff availability
- Service duration
- Business hours
- Existing bookings

## Recurring Appointments

For regular clients:
1. Create first appointment
2. Click **Make Recurring**
3. Set frequency:
   - Weekly
   - Every 2 weeks
   - Every 4 weeks
   - Monthly
   - Custom
4. Set end date or number of occurrences
5. Book series

**Example:**
- Mrs. Johnson gets color every 6 weeks
- Book 4 appointments in advance
- She never forgets her appointment

## Group Bookings

Book multiple clients together:
1. Create first client''s appointment
2. Click **Add to Group**
3. Add additional clients
4. Each has separate service
5. Coordinated start times

**Perfect for:**
- Bridal parties
- Mother-daughter appointments
- Group spa days

## Waitlist Bookings

No available times? Add to waitlist:
1. Click **Add to Waitlist**
2. Select preferred date/time range
3. Client notified when slot opens
4. Auto-book or manual confirmation

## Overbooking

Sometimes you need to squeeze in a client:
1. Enable **Allow Overbooking**
2. Warning shows time conflict
3. Add booking anyway
4. Note why (VIP client, emergency, etc.)

**Use sparingly!** Overbooking causes delays.

## Booking on Behalf

When front desk books for stylist:
1. Calendar shows stylist''s perspective
2. Confirmation sent to client
3. Notification sent to staff member
4. Appears on their schedule

## Next Steps

- [Handling walk-ins](#) →
- [Managing your calendar](#) →
- [Recurring appointments](#) →
',
2),

-- Article 3: Handling Walk-Ins
((SELECT id FROM academy_categories WHERE slug = 'appointments'),
'handling-walk-ins',
'Handling Walk-Ins',
'Efficiently manage walk-in clients and optimize your schedule.',
'# Handling Walk-Ins

Walk-ins can be profitable, but they need efficient handling. Learn to manage spontaneous clients without disrupting your schedule.

## Walk-In Settings

Configure walk-in policies:
1. Go to **Settings** → **Appointments**
2. **Accept Walk-Ins:** Yes/No
3. **Walk-In Display:** Show on calendar
4. **Priority:** After bookings / Equal priority

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

**Pro Tip:** Don''t block time - just keep it open.

### First Available Staff
Use **Round Robin** assignment:
- Distributes walk-ins fairly
- Keeps all staff busy
- Reduces idle time

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
4. Give estimated wait time

**Example SMS:**
```
Hi! We can fit you in at 3:15 PM 
(about 45 minutes). Reply YES to 
hold the spot or CALL to reschedule.
```

## Managing Busy Times

### Peak Hours
During rush times:
- **Assess** wait time honestly
- **Offer** specific return time
- **Book** appointment for later

Don''t overcommit and disappoint clients.

### Staff Coordination
Radio/text staff:
```
Walk-in for color at station 3.
ETA 15 min for Sarah''s client.
Can you take them?
```

### Client Expectations
Be upfront:
- "I can fit you in, but there might be a 10-minute wait"
- "I''m fully booked, but I can take you at 4:30 PM"
- "We''re slammed, but [Other Salon] down the street might have openings"

## Walk-In vs. Appointment Priority

**Appointment Clients:**
- Booked in advance
- Always take priority
- Never make them wait for walk-ins

**Walk-Ins:**
- Fill gaps in schedule
- Acceptable to wait 10-15 min
- Can be rescheduled if needed

## Handling Walk-In Payment

Some salons require:
- **Pay first:** Deposit or full prepayment
- **Card on file:** Before service starts
- **Regular checkout:** After service (more common)

**Reduces no-shows for walk-ins booked later.**

## Converting Walk-Ins to Regular Clients

After service:
1. **Book Next Appointment:**
   "When should we see you next? Let''s get you on the books for 6 weeks."

2. **Online Booking Info:**
   Hand them card with booking URL

3. **Loyalty Program:**
   "You just earned 50 points! Download our app to track rewards."

4. **Follow-Up Email:**
   Automatic "Thanks for visiting" with booking link

## Analytics

Track walk-in performance:
- **Acceptance Rate:** % of walk-ins served
- **Wait Time:** Average time to service
- **Conversion Rate:** % who book next appointment
- **Revenue:** Walk-in contribution to daily sales

## Next Steps

- [No-show prevention](#) →
- [Managing your calendar](#) →
- [Client retention strategies](#) →
',
3),

-- Article 4: Appointment Reminders
((SELECT id FROM academy_categories WHERE slug = 'appointments'),
'appointment-reminders',
'Appointment Reminders',
'Configure automated reminders to reduce no-shows and keep clients informed.',
'# Appointment Reminders

Automated reminders reduce no-shows by 30-40%. Set up email and SMS notifications to keep clients on schedule.

## Reminder Types

**Email Reminders**
- ✓ Free unlimited
- ✓ Include all appointment details
- ✓ Reschedule/cancel links
- ⚠ Lower open rate (~20%)

**SMS Reminders**
- ✓ 98% open rate
- ✓ Read within 3 minutes
- ✓ Direct action links
- ⚠ Costs per message

**Push Notifications**
- ✓ For app users
- ✓ Free
- ✓ Instant delivery

## Default Reminder Schedule

Recommended timing:
- **Confirmation:** Immediately after booking
- **7 Days Before:** Email reminder (for far-out appointments)
- **24 Hours Before:** Email + SMS
- **2 Hours Before:** SMS only
- **30 Minutes Before:** Optional, for chronic late arrivals

## Configuring Reminders

### Step 1: Navigate to Settings
1. Go to **Settings** → **Notifications**
2. Click **Appointment Reminders**

### Step 2: Set Timing
For each reminder:
- Enable/disable
- Set timing (hours before)
- Choose channel (Email, SMS, Both)
- Customize message

### Step 3: Customize Messages

**Variables available:**
- `{ClientName}` - Client first name
- `{ServiceName}` - Service booked
- `{StaffName}` - Staff member
- `{Date}` - Appointment date
- `{Time}` - Appointment time
- `{Duration}` - Service length
- `{BookingURL}` - Manage booking link

**Sample SMS (160 characters):**
```
Hi {ClientName}! Reminder: {ServiceName} 
tomorrow at {Time} with {StaffName}. 
Reply C to confirm or R to reschedule.
```

**Sample Email:**
```
Subject: Appointment Reminder - Tomorrow at {Time}

Hi {ClientName},

Just a friendly reminder about your upcoming appointment:

📅 {Date} at {Time}
✂️ {ServiceName}
👤 With {StaffName}
📍 Bella Salon, 123 Main St

[Reschedule] [Cancel] [Add to Calendar]

See you soon!
```

## Advanced Options

### Confirmation Required
Ask clients to confirm:
```
Reply YES to confirm or CALL to reschedule
```

**Benefits:**
- Identifies potential no-shows
- Allows time to rebook slot
- Shows commitment

### Custom Reminders by Service
Different reminders for different services:
- **Long services (2+ hours):** 48-hour reminder
- **New clients:** Extra confirmation day-before
- **High-value services:** Personal call day-before

### Holiday Schedule
Adjust reminders for holidays:
- Skip reminders on holidays
- Adjust timing for early closures
- Add holiday greeting

## Client Preferences

Let clients choose:
- Reminder method (Email, SMS, Both)
- Reminder timing
- Frequency
- Opt-out option

**Settings in client portal:**
```
Notification Preferences
☑ Email reminders
☑ SMS reminders  
☐ Push notifications
Reminder timing: 24 hours before
```

## No-Response Protocol

If client doesn''t confirm:
1. **Day before:** Second SMS
   ```
   Please confirm your appointment tomorrow.
   We have other clients waiting. Reply YES 
   to confirm or CALL to reschedule.
   ```

2. **No response:** Call client
3. **Still no response:** Flag for possible no-show

## Reminder Analytics

Track effectiveness:
- **Delivery Rate:** % successfully delivered
- **Open Rate:** % opened (email)
- **Response Rate:** % who confirm
- **No-Show Reduction:** Compare before/after

**Dashboard shows:**
```
This Month:
- Reminders sent: 847
- Confirmed: 621 (73%)
- No-shows: 12 (1.4%)
- Previous month no-shows: 38 (4.8%)
Reduction: 68% ⬇️
```

## Compliance

### SMS Regulations
- Include salon name
- Provide opt-out instructions
- Honor opt-outs immediately
- Only message clients who opted-in

**Compliant Message:**
```
Bella Salon: Appointment tomorrow at 2pm.
Reply STOP to opt out.
```

### GDPR/Privacy
- Store consent records
- Allow data export
- Respect communication preferences
- Secure client phone numbers

## Troubleshooting

**Q: Client says they didn''t receive reminders**
Check:
- Phone number format correct
- Email not in spam
- Opted-in to SMS
- Carrier not blocking messages

**Q: Reminders going to old number**
- Update client profile
- Verify in Clients → Edit

**Q: Too many reminders**
- Review reminder schedule
- Reduce frequency
- Ask client preference

## Next Steps

- [No-show prevention](#) →
- [Client communication tools](#) →
- [SMS marketing](#) →
',
4),

-- Article 5: No-Show Prevention
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
- Staff frustration

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

### How to Implement
1. Go to **Settings** → **Booking Policies**
2. Enable **Require Deposit**
3. Set rules:
   - All bookings
   - New clients only
   - Services over $X
   - Duration over X minutes
4. Choose: Credit card hold or prepayment

**Sample Policy:**
```
New clients: $25 deposit required
Services over $100: 50% deposit
Refundable with 24-hour cancellation notice
```

## Strategy 2: Cancellation Policy

### Policy Examples

**Strict:**
```
- 48 hours notice: Full refund
- 24-48 hours: 50% charge
- Less than 24 hours: Full charge
- No-show: Full charge + card on file
```

**Moderate:**
```
- 24 hours notice: Free cancellation
- Less than 24 hours: $25 fee
- No-show: Full service charge
```

**Lenient:**
```
- 12 hours notice: Free cancellation
- Less than 12 hours: $15 fee
- No-show: $25 fee
- One courtesy waiver per year
```

### Communicating Your Policy
Display everywhere:
- Booking confirmation email
- Website booking page
- In confirmation SMS
- Posted in salon
- On consultation forms

## Strategy 3: Reminder System

**Multi-Touch Reminders:**
1. Email at booking
2. Email 1 week before (for far bookings)
3. Email + SMS 24 hours before
4. SMS 2 hours before
5. Personal call for VIPs/new clients

**Require Confirmation:**
```
Please reply YES to confirm or 
CALL to reschedule. We have other 
clients waiting for your spot!
```

## Strategy 4: Client Education

### First Appointment
Explain policies clearly:
- Cancellation requirements
- Deposit policy
- No-show consequences
- How to reschedule

### Confirmation Script
```
"We require 24-hour notice for 
cancellations. If something comes up, 
just text or call us right away and 
we''ll reschedule. Sound good?"
```

### Build Rapport
Make clients WANT to come:
- Exceptional service
- Personal connection
- Remember details
- Exceed expectations

## Strategy 5: Smart Scheduling

### Risk Assessment
Identify high-risk bookings:
- ⚠️ New clients
- ⚠️ Booked far in advance (3+ weeks)
- ⚠️ Late night appointments
- ⚠️ Monday mornings
- ⚠️ Clients with history

### Risk Mitigation
For high-risk:
- Require deposit
- Double confirmation
- Personal phone call
- Earlier reminder
- Overbook slightly (carefully!)

### Overbooking Strategy
Book 10% more appointments than you can handle:
- Accounts for typical no-show rate
- Only with reliable tracking
- Have backup plan for all-shows
- NEVER tell clients they''re overbooked

## Strategy 6: Waitlist System

When someone cancels:
1. Text waitlist clients immediately
2. First to respond gets spot
3. Reduces lost revenue
4. Makes cancellations less painful

**Waitlist SMS:**
```
Last minute opening at 2pm today! 
Reply YES in next 10 minutes to book it.
```

## Strategy 7: Incentives & Consequences

### Positive Incentives
Reward good behavior:
- **Perfect attendance:** 10% off after 5 appointments
- **Advance booking:** 5% off bookings 3+ weeks out
- **Loyalty points:** 2x points for keeping appointments

### Consequences
For repeated no-shows:
- Require deposits for future bookings
- Charge card on file
- Remove online booking privilege
- Require phone bookings only
- Eventually: decline future bookings

**Three-Strike Policy:**
1. First no-show: Warning + reminder of policy
2. Second no-show: Deposit required for future
3. Third no-show: Online booking disabled

## Strategy 8: Track & Analyze

### Metrics to Monitor
- **No-show rate:** % of appointments
- **Cancellation rate:** % cancelled
- **Cancellation timing:** How far in advance
- **Cost per no-show:** Revenue lost
- **Trends:** Day, time, service, client type

### Dashboard View
```
This Month:
- Total appointments: 487
- Completed: 452 (93%)
- Cancellations: 23 (5%)
- No-shows: 12 (2.5%)
- Lost revenue: $1,680

Top reasons for no-shows:
1. Forgot appointment (58%)
2. Sick (25%)
3. Emergency (12%)
4. No response (5%)
```

## Emergency Situations

Be flexible for:
- Medical emergencies
- Family emergencies
- Car accidents
- Unexpected illness

**Have heart:** Waive fees for legitimate emergencies. Build goodwill.

## Next Steps

- [Appointment reminders](#) →
- [Cancellation fees](#) →
- [Waitlist management](#) →
',
5),

-- Article 6: Recurring Appointments
((SELECT id FROM academy_categories WHERE slug = 'appointments'),
'recurring-appointments',
'Recurring Appointments',
'Set up automatic recurring bookings for regular clients.',
'# Recurring Appointments

Recurring appointments keep your calendar full and clients on schedule. Perfect for maintenance services.

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
- **Spa Treatments:** Monthly
- **Hair Treatments:** Bi-weekly

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

### Option 3: Client Portal
Clients can set up recurring bookings:
1. Log into account
2. View upcoming appointment
3. Click **Repeat This**
4. Confirm frequency

## Configuration Options

### Frequency
- Every week
- Every 2 weeks
- Every 3 weeks
- Every 4 weeks
- Every 6 weeks
- Every 8 weeks
- Monthly
- Every 2 months
- Custom interval

### Duration
- Number of occurrences (e.g., "next 6 visits")
- End date (e.g., "through December")
- Ongoing (until cancelled)

### Time Slot
- **Same time:** Always 2 PM on Tuesdays
- **Same day/time:** Tuesdays at 2 PM
- **Same day, flexible time:** Tuesdays, any time
- **Flexible:** First available

### Staff Assignment
- Same staff member
- First available
- Rotate through team

## Example Scenarios

### Scenario 1: Color Touch-Up
```
Client: Sarah Johnson
Service: Root Touch-Up
Frequency: Every 5 weeks
Day: Saturday
Time: 10:00 AM
Staff: Michelle
Duration: Ongoing
Result: Books through end of year
```

### Scenario 2: Gel Manicure
```
Client: Lisa Wong
Service: Gel Manicure
Frequency: Every 2 weeks
Day: Flexible (weekday)
Time: Lunchtime (11 AM - 1 PM)
Staff: Any available
Duration: Next 10 visits
```

### Scenario 3: Monthly Facial
```
Client: James Chen
Service: Men''s Facial
Frequency: Monthly
Day: First Tuesday
Time: 6:00 PM
Staff: Alex
Duration: Through December
```

## Managing Recurring Series

### View All Occurrences
1. Click any appointment in series
2. See **Part of recurring series**
3. Click **View All**
4. See list of all future appointments

### Modify Series
**Change one appointment:**
- Date/time only
- Affects single occurrence
- Rest of series unchanged

**Change entire series:**
- Modify frequency, staff, service
- Updates all future occurrences
- Past appointments unchanged

### Cancel Series
Options:
- Cancel single occurrence
- Cancel this and future
- Cancel entire series

**Client notified of cancellations.**

## Client Communication

### Initial Setup
```
Subject: Your Appointments Are Booked!

Hi Sarah,

Great news! We''ve booked your color touch-ups
for the next 6 months:

✓ Feb 15 at 10:00 AM
✓ Mar 22 at 10:00 AM
✓ Apr 26 at 10:00 AM
✓ Jun 7 at 10:00 AM
✓ Jul 12 at 10:00 AM
✓ Aug 16 at 10:00 AM

You''ll receive reminders before each.
Manage your appointments anytime at: [Link]
```

### Reminder Emails
Same as regular appointments:
- Note shows "Part of recurring series"
- Easy reschedule option
- Link to manage series

### Renewal Reminders
When series ending:
```
Your recurring appointments end after
your Aug 16 visit. 

Would you like to continue?
[Renew Series] [Book Individually]
```

## Best Practices

### 1. Don''t Overbook Too Far
- **Good:** 3-6 months ahead
- **Too far:** 12+ months

Far bookings = higher cancellation rate.

### 2. Build in Flexibility
Allow clients to:
- Reschedule individual appointments
- Skip one without cancelling series
- Change time/day if needed

### 3. Incentivize Commitment
Offer perks:
- 5% discount on recurring services
- Priority booking times
- Loyalty bonus points
- Skip-the-line service

### 4. Regular Check-Ins
Every 3-4 months:
```
"Are these appointments still 
working for your schedule?"
```

Adjust if needed.

### 5. Send Series Summaries
Monthly email:
```
Your Upcoming Appointments:
• May 8 at 2 PM
• Jun 12 at 2 PM
• Jul 17 at 2 PM

All set! See you soon.
```

## Analytics

Track performance:
- % of clients on recurring
- Revenue from recurring appointments
- Keep vs. cancel rate
- Most popular frequencies

**Example Dashboard:**
```
Recurring Appointments:
- Active series: 47
- Clients: 45
- Monthly recurring revenue: $8,420
- Average frequency: 4.2 weeks
- Keep rate: 87%

Top Services:
1. Color services (18 series)
2. Gel nails (12 series)
3. Haircuts (9 series)
```

## Troubleshooting

**Q: Client can''t make usual time anymore**
A: Edit series, change day/time for future appointments

**Q: Staff member leaving**
A: Reassign all recurring appointments to new staff

**Q: Client wants to pause series**
A: Skip next X appointments, resume after

**Q: Service price changed**
A: Update future appointments, notify client

## Next Steps

- [Managing your calendar](#) →
- [Client retention strategies](#) →
- [Appointment reminders](#) →
',
6);

-- ============================================
-- Verification Query
-- ============================================

SELECT 
  c.title as category,
  COUNT(a.id) as article_count
FROM academy_categories c
LEFT JOIN academy_articles a ON a.category_id = c.id
WHERE c.slug = 'appointments'
GROUP BY c.title, c.order_index
ORDER BY c.order_index;

-- Expected result:
-- Appointments: 6
