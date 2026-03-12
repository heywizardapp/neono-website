-- ============================================
-- SQL INSERT STATEMENTS FOR APPOINTMENTS & BOOKING ARTICLES
-- NeonO Academy - Appointments Category
-- ============================================

-- ARTICLE 1: Managing Your Calendar
INSERT INTO academy_articles (category_id, slug, title, description, content, order_index) VALUES
((SELECT id FROM academy_categories WHERE slug = 'appointments'),
 'managing-your-calendar',
 'Managing Your Calendar',
 'Master the daily, weekly, and staff views of your appointment book.',
 '# Managing Your Calendar

Learn how to navigate, filter, and customize your appointment calendar to stay on top of your daily bookings.

## Before You Begin

Make sure you have:
- Access to your NeonO dashboard
- At least one staff member added to your account
- Business hours configured (optional but recommended)

## Steps

### 1. Navigate to Your Calendar

Click the **Calendar** icon in the main navigation sidebar. Your calendar opens to today''s date in the default weekly view, showing all scheduled appointments.

![Screenshot: Main navigation with Calendar icon highlighted](/images/academy/calendar-overview.svg)

**💡 Pro Tip:** Press `C` on your keyboard from anywhere in NeonO to jump directly to your calendar.

### 2. Switch Between Calendar Views

Use the view toggle buttons in the top toolbar to switch between **Day**, **Week**, and **Month** views. Day view shows detailed time slots, Week view gives you a balanced overview, and Month view helps with long-term planning.

![Screenshot: Calendar toolbar showing Day, Week, Month view toggle buttons](/images/academy/calendar-view-toggles.svg)

### 3. Filter by Staff Member

Click the **Staff** dropdown in the toolbar to filter appointments by team member. Select a specific stylist to see only their bookings, or choose **All Staff** to view everyone''s schedule side by side.

![Screenshot: Staff filter dropdown expanded showing team member names](/images/academy/calendar-staff-filter.svg)

**💡 Pro Tip:** In Week view with "All Staff" selected, each column represents a different team member—perfect for seeing your whole team''s availability at a glance.

### 4. Navigate Between Dates

Use the **arrow buttons** (< >) next to the date header to move forward or backward. Click the **date picker** to jump to a specific date, or click **Today** to instantly return to the current date.

### 5. Understand Appointment Status Colors

Appointments are color-coded by status so you can see your day''s progress at a glance:

| Color | Status | Meaning |
|-------|--------|---------|
| 🔵 Blue | Confirmed | Appointment is booked and confirmed |
| 🟠 Orange | Pending | Awaiting client confirmation |
| 🟢 Green | Checked In | Client has arrived |
| ⚫ Gray | Completed | Service finished and paid |

![Screenshot: Calendar showing appointments in different status colors with legend](/images/academy/calendar-status-legend.svg)

**💡 Pro Tip:** Click any appointment block to see full details, check in the client, or start the checkout process.

### 6. Create Quick Time Blocks

Click any empty time slot on the calendar to create a **time block**. Use these to mark lunch breaks, team meetings, or personal appointments. Enter a note describing the block and click **Save**.

## What''s Next

- [Creating a New Appointment](/academy/appointments/creating-new-appointment)
- [Setting Closed Periods & Time Off](/academy/appointments/setting-closed-periods)
- [Managing Resources & Rooms](/academy/appointments/managing-resources-rooms)',
 1);

-- ARTICLE 2: Creating a New Appointment
INSERT INTO academy_articles (category_id, slug, title, description, content, order_index) VALUES
((SELECT id FROM academy_categories WHERE slug = 'appointments'),
 'creating-new-appointment',
 'Creating a New Appointment',
 'Book services for walk-ins or phone clients manually.',
 '# Creating a New Appointment

Book services for walk-in clients, phone reservations, or manual bookings directly from your calendar.

## Before You Begin

Make sure you have:
- At least one service set up in your menu
- Staff members added with their service abilities defined
- Business hours configured for your location

## Steps

### 1. Open the New Appointment Modal

Click the **+ New Appointment** button in the top right corner of your calendar. Alternatively, click any empty time slot directly on the calendar to pre-fill that date and time.

![Screenshot: Calendar view with +New Appointment button highlighted in top right](/images/academy/appointment-new-button.svg)

**💡 Pro Tip:** Double-click an empty time slot to open the new appointment modal with that time already selected—saves you an extra click!

### 2. Search and Select a Client

Start typing the client''s name, phone number, or email in the search field. Select the matching client from the dropdown results. For first-time visitors, click **+ Add New Client** to create their profile on the spot.

![Screenshot: Client search field with dropdown showing matching results and Add New Client option](/images/academy/appointment-client-search.svg)

### 3. Choose the Service

Select a service from the dropdown menu. Services are automatically filtered based on the selected staff member''s abilities. The service duration and price display next to each option.

![Screenshot: Service selection dropdown showing available services with duration and price](/images/academy/appointment-service-select.svg)

**💡 Pro Tip:** Need multiple services? Click **+ Add Another Service** to book a combo appointment (like cut + color) in a single booking.

### 4. Assign a Staff Member

Choose which team member will perform the service. The system shows each staff member''s availability for your selected time, with green checkmarks indicating who''s free.

![Screenshot: Staff selector showing team members with availability indicators](/images/academy/appointment-staff-select.svg)

### 5. Select Date and Time

Click the date field to open the calendar picker and choose the appointment date. Then select an available time slot from the dropdown. The system automatically calculates the end time based on service duration.

![Screenshot: Date picker calendar and time slot dropdown](/images/academy/appointment-datetime-picker.svg)

**💡 Pro Tip:** Time slots already booked appear grayed out, so you''ll never accidentally double-book.

### 6. Add Appointment Notes (Optional)

Click **Add Notes** to include special requests, color formulas, or important reminders. These notes are visible to the assigned staff member when they view the appointment.

![Screenshot: Notes field expanded with example text about client preferences](/images/academy/appointment-notes-field.svg)

### 7. Confirm the Booking

Review all appointment details in the summary panel. Click **Book Appointment** to confirm. The client receives an automatic confirmation via their preferred contact method (email or SMS).

![Screenshot: Appointment confirmation success message with new appointment visible on calendar](/images/academy/appointment-confirmation.svg)

## What''s Next

- [Managing Your Calendar](/academy/appointments/managing-your-calendar)
- [Processing a Sale (Checkout)](/academy/pos-payments/processing-sale-checkout)
- [Adding & Managing Clients](/academy/client-management/adding-managing-clients)',
 2);

-- ARTICLE 3: Managing Resources & Rooms
INSERT INTO academy_articles (category_id, slug, title, description, content, order_index) VALUES
((SELECT id FROM academy_categories WHERE slug = 'appointments'),
 'managing-resources-rooms',
 'Managing Resources & Rooms',
 'Assign equipment or rooms to services to prevent double-booking.',
 '# Managing Resources & Rooms

Set up equipment and rooms as bookable resources to prevent double-booking and optimize your space.

## Before You Begin

Make sure you have:
- Admin or manager permissions in NeonO
- Services already created in your menu
- A clear list of resources you need to track (rooms, chairs, equipment)

## Steps

### 1. Navigate to Resources

Click **Settings** in the main navigation, then select **Business Setup** > **Resources**. You''ll see a list of any existing resources, or an empty state if you''re starting fresh.

![Screenshot: Resources dashboard showing list of existing resources with name, type, and linked services](/images/academy/resources-dashboard.svg)

**💡 Pro Tip:** Resources are essential for services that require specific equipment—like massage tables, pedicure chairs, or treatment rooms—where only one client can use them at a time.

### 2. Add a New Resource

Click the **+ Add Resource** button. Enter a clear, descriptive name (e.g., "Massage Table 1", "Pedicure Chair 2", "VIP Treatment Room"). Select the resource type: **Room** for physical spaces or **Equipment** for items like styling chairs or nail stations.

![Screenshot: Add Resource modal with name field, type dropdown, and capacity setting](/images/academy/resources-add-modal.svg)

### 3. Link the Resource to Services

Select which services require this resource by checking the boxes next to each service name. Enable **Block time slot when in use** to prevent the resource from being double-booked during appointments.

![Screenshot: Service linking interface showing checkboxes for each service that requires the resource](/images/academy/resources-service-linking.svg)

**💡 Pro Tip:** Name resources descriptively: "Room 1 - Massage" is clearer than just "Room 1" when your staff is quickly scanning the calendar.

### 4. View the Resource Calendar

Click on any resource to open its dedicated calendar view. This shows exactly when the resource is booked, making it easy to identify availability gaps or scheduling conflicts.

![Screenshot: Resource-specific calendar view showing bookings across the week](/images/academy/resources-calendar-view.svg)

### 5. Handle Resource Conflicts

When someone tries to book a service that requires an already-booked resource, NeonO displays a warning message. The system prevents the double-booking by default. Admins can override this in emergencies, but a warning persists.

![Screenshot: Conflict alert modal showing resource unavailable warning with override option](/images/academy/resources-conflict-alert.svg)

**💡 Pro Tip:** Put resources in "Maintenance Mode" when they need cleaning or repairs—this blocks all bookings until you mark them available again.

## What''s Next

- [Creating a New Appointment](/academy/appointments/creating-new-appointment)
- [Setting Up Services](/academy/getting-started/setting-up-services)
- [Setting Closed Periods & Time Off](/academy/appointments/setting-closed-periods)',
 3);

-- ARTICLE 4: Setting Closed Periods & Time Off
INSERT INTO academy_articles (category_id, slug, title, description, content, order_index) VALUES
((SELECT id FROM academy_categories WHERE slug = 'appointments'),
 'setting-closed-periods',
 'Setting Closed Periods & Time Off',
 'Block out holidays, team events, or staff vacations.',
 '# Setting Closed Periods & Time Off

Block out holidays, vacations, and special events so clients can''t book during unavailable times.

## Before You Begin

Make sure you have:
- Access to your NeonO calendar
- Staff schedules configured (for individual time-off requests)
- A list of upcoming holidays or closures to add

## Steps

### 1. Navigate to Closed Periods

Go to **Settings** > **Business Setup** > **Closed Periods** to manage all your closures in one place. Alternatively, click the **Add Closure** button directly from your calendar toolbar for quick access.

![Screenshot: Closed Periods dashboard showing list of upcoming closures with dates and types](/images/academy/closures-dashboard.svg)

**💡 Pro Tip:** Set up your annual holidays at the start of each year—it takes 5 minutes and saves headaches all year long.

### 2. Choose the Closure Type

Select between two closure types:
- **Business-wide**: The entire salon is closed (holidays, renovations, team events)
- **Staff-specific**: Individual time off for vacations, sick days, or personal appointments

![Screenshot: Closure type toggle showing Business-wide and Staff-specific options](/images/academy/closures-type-selector.svg)

### 3. Select the Date Range

Click the start date field and choose when the closure begins. For multi-day closures, select an end date as well. Single-day closures (like holidays) just need one date selected.

![Screenshot: Date range picker calendar with start and end date selection](/images/academy/closures-date-picker.svg)

**💡 Pro Tip:** For staff vacations, they can submit their own time-off requests through their NeonO app—you''ll just need to approve them.

### 4. Add a Closure Reason

Enter a descriptive reason for the closure. This appears on the calendar and helps your team understand why that time is blocked. Examples:
- "Christmas Day"
- "Annual Team Training"
- "Sarah - Vacation"

### 5. Choose Affected Staff Members

For **Business-wide** closures, all staff are automatically blocked. For **Staff-specific** closures, check the boxes next to each team member who will be unavailable during this period.

![Screenshot: Staff selection interface with checkboxes for each team member](/images/academy/closures-staff-select.svg)

### 6. Publish the Closure

Click **Save Closure** to publish. The closure immediately appears on your calendar as a grayed-out block. Clients are prevented from booking during this time, and any existing appointments in that window display a conflict warning for you to reschedule.

![Screenshot: Calendar view showing grayed-out closure period with closure label](/images/academy/closures-calendar-view.svg)

**💡 Pro Tip:** Need to book during a closure for a VIP client? Admins can override closures on a case-by-case basis—just click the time slot and select "Override Closure."

## What''s Next

- [Managing Your Calendar](/academy/appointments/managing-your-calendar)
- [Setting Staff Schedules & Rosters](/academy/staff-scheduling/setting-staff-schedules)
- [Configuring Business Hours](/academy/getting-started/configuring-business-hours)',
 4);

-- ============================================
-- VERIFICATION QUERY
-- Run this to confirm articles were inserted
-- ============================================
-- SELECT 
--   a.slug, 
--   a.title, 
--   a.order_index,
--   c.name as category
-- FROM academy_articles a
-- JOIN academy_categories c ON a.category_id = c.id
-- WHERE c.slug = 'appointments'
-- ORDER BY a.order_index;
