# Image Specifications for Appointments & Booking Articles

## Overview
This document contains detailed mockup specifications for 22 images needed across 4 Appointments & Booking academy articles.

---

## Article 1: Managing Your Calendar (4 images)

### IMAGE 1: calendar-overview.svg
**DESCRIPTION:** Browser mockup showing the main NeonO calendar interface in weekly view

**DETAILS:**
- Weekly view displayed (Mon-Sun columns)
- Time slots visible from 8:00 AM - 8:00 PM (left axis)
- Current day column has subtle highlight/background color
- 5-6 appointments visible across different days:
  - "Emma Johnson - Balayage" (2 hours) on Tuesday 10am
  - "Lisa Chen - Haircut & Style" (1 hour) on Tuesday 2pm
  - "Michael Torres - Men's Cut" (45 min) on Wednesday 11am
  - "Sophie Williams - Full Color" (2.5 hours) on Thursday 9am
  - "David Park - Beard Trim" (30 min) on Friday 3pm
- Appointments color-coded by status (blue for confirmed, green for checked-in)
- Left sidebar showing: NeonO logo, Calendar (active/highlighted), Clients, Sales, Reports, Settings icons
- Top toolbar showing:
  - Date range: "January 26 - February 1, 2026"
  - View toggles: Day | Week | Month (Week selected)
  - Staff dropdown: "All Staff ▼"
  - Today button
  - "+ New Appointment" button (purple/primary color)
- Current time indicator (red horizontal line) if showing today

**HIGHLIGHTS:** Purple circle/ring around the Calendar icon in sidebar navigation

**SIZE:** 1200x800px

---

### IMAGE 2: calendar-view-toggles.svg
**DESCRIPTION:** Cropped view of calendar toolbar focusing on the view toggle buttons

**DETAILS:**
- Clean toolbar section isolated
- Three toggle buttons clearly visible:
  - "Day" button (unselected, gray/outline style)
  - "Week" button (selected, filled purple/primary)
  - "Month" button (unselected, gray/outline style)
- Date picker showing "January 27, 2026"
- < > navigation arrows on either side of date
- "Today" button

**HIGHLIGHTS:** Purple circle around the Week button showing it's the current selection

**SIZE:** 800x200px

---

### IMAGE 3: calendar-staff-filter.svg
**DESCRIPTION:** Staff filter dropdown expanded showing team member options

**DETAILS:**
- Calendar background (slightly dimmed/blurred)
- Staff dropdown expanded in open state
- Dropdown header showing "Staff ▼"
- Options listed:
  - ✓ All Staff (currently selected, with checkmark)
  - — (divider line)
  - Avatar circle + "Sarah Martinez"
  - Avatar circle + "James Wilson"
  - Avatar circle + "Emily Brown"
  - Avatar circle + "Carlos Garcia"
  - Avatar circle + "Ashley Kim"
- Each staff name has small colored dot (their calendar color)

**HIGHLIGHTS:** Pointer cursor hovering over "James Wilson" option with hover state

**SIZE:** 600x400px

---

### IMAGE 4: calendar-status-legend.svg
**DESCRIPTION:** Calendar section showing appointments in different status colors with a legend overlay

**DETAILS:**
- Portion of weekly calendar visible (2-3 days)
- 4 appointments visible, each in different status:
  - Blue appointment: "10:00 AM - Emma J. - Haircut" (Confirmed)
  - Orange appointment: "11:30 AM - New Client - Consultation" (Pending)
  - Green appointment: "2:00 PM - Lisa C. - Color" (Checked In)
  - Gray appointment: "9:00 AM - Michael T. - Cut" (Completed)
- Floating legend card/tooltip showing:
  - 🔵 Confirmed
  - 🟠 Pending
  - 🟢 Checked In
  - ⚫ Completed
- Legend card has subtle shadow, white background

**HIGHLIGHTS:** None (legend is the focus)

**SIZE:** 900x500px

---

## Article 2: Creating a New Appointment (7 images)

### IMAGE 5: appointment-new-button.svg
**DESCRIPTION:** Calendar view with prominent +New Appointment button

**DETAILS:**
- Full calendar weekly view (similar to calendar-overview)
- Top right corner prominently showing:
  - "+ New Appointment" button
  - Purple/primary color
  - White text
  - Slightly larger than other buttons
- Rest of calendar slightly faded to draw attention to button
- A few appointments visible in background

**HIGHLIGHTS:** Purple circle/ring around the "+New Appointment" button, annotation arrow pointing to it

**SIZE:** 1000x600px

---

### IMAGE 6: appointment-client-search.svg
**DESCRIPTION:** New Appointment modal with client search field active

**DETAILS:**
- Modal overlay on dimmed calendar background
- Modal title: "New Appointment"
- Client search field at top, active state with cursor
- Search text entered: "Emma"
- Dropdown showing search results:
  - "Emma Johnson" - emma.j@email.com - (555) 123-4567
  - "Emma Williams" - emma.w@email.com - (555) 987-6543
  - Divider line
  - "+ Add New Client" option with plus icon
- Other form fields visible but empty:
  - Service (dropdown)
  - Staff Member (dropdown)
  - Date & Time

**HIGHLIGHTS:** Purple border on the active search field

**SIZE:** 700x600px

---

### IMAGE 7: appointment-service-select.svg
**DESCRIPTION:** Service selection dropdown expanded in the appointment modal

**DETAILS:**
- Modal showing with client already selected: "Emma Johnson"
- Service dropdown expanded showing services:
  - Category header: "Hair Services"
    - Haircut & Style - 45 min - $65
    - Balayage - 2h 30min - $185
    - Full Color - 2h - $120
    - Root Touch-Up - 1h 15min - $85
  - Category header: "Treatments"
    - Deep Conditioning - 30 min - $35
    - Keratin Treatment - 3h - $250
- Each service shows name, duration, and price
- Search/filter field at top of dropdown

**HIGHLIGHTS:** Hover state on "Haircut & Style" option

**SIZE:** 700x550px

---

### IMAGE 8: appointment-staff-select.svg
**DESCRIPTION:** Staff member selector showing availability

**DETAILS:**
- Modal with client and service already selected
- Service showing: "Haircut & Style - 45 min"
- Staff dropdown expanded:
  - "Sarah Martinez" - ✅ Available (green checkmark)
  - "James Wilson" - ✅ Available (green checkmark)
  - "Emily Brown" - ⚠️ Busy until 2pm (orange warning)
  - "Carlos Garcia" - ❌ Day Off (red X, grayed out)
- Each staff member has avatar, name, and availability status
- Selected time context shown: "for January 27, 10:00 AM"

**HIGHLIGHTS:** Sarah Martinez row highlighted as if being selected

**SIZE:** 700x500px

---

### IMAGE 9: appointment-datetime-picker.svg
**DESCRIPTION:** Date and time selection interface

**DETAILS:**
- Modal section showing date/time fields
- Mini calendar picker open:
  - January 2026 calendar
  - Current date (27) highlighted
  - Past dates grayed out
  - Selected date (27) has filled circle
  - Navigation arrows for month
- Time dropdown showing:
  - Available slots in 15-min increments:
    - 10:00 AM
    - 10:15 AM (grayed - unavailable)
    - 10:30 AM (grayed - unavailable)
    - 10:45 AM
    - 11:00 AM
    - etc.
- End time auto-calculated: "10:00 AM - 10:45 AM (45 min)"

**HIGHLIGHTS:** Selected date and time fields with purple borders

**SIZE:** 800x500px

---

### IMAGE 10: appointment-notes-field.svg
**DESCRIPTION:** Notes section of the appointment modal

**DETAILS:**
- Lower portion of appointment modal
- "Add Notes" section expanded
- Text area containing example note:
  "Client prefers warm tones. Used 7N + 7G last visit. 
   Sensitive scalp - use gentle products.
   Running 10 mins late - called ahead."
- Character count shown: "156/500"
- Icons for formatting (bold, italic, bullet list - optional)
- "Internal note - not visible to client" label

**HIGHLIGHTS:** Text cursor in the notes field

**SIZE:** 700x350px

---

### IMAGE 11: appointment-confirmation.svg
**DESCRIPTION:** Success state after booking confirmation

**DETAILS:**
- Split view or overlay showing:
- Left/Top: Success message card
  - Green checkmark icon
  - "Appointment Booked!"
  - Summary: "Emma Johnson - Haircut & Style"
  - "Tuesday, Jan 27 at 10:00 AM with Sarah Martinez"
  - "Confirmation sent to emma.j@email.com"
  - "View Appointment" button
  - "Book Another" button
- Right/Bottom: Calendar snippet showing the new appointment
  - New appointment block visible on calendar
  - Subtle animation/glow effect on new block

**HIGHLIGHTS:** Green success checkmark, new appointment block on calendar

**SIZE:** 1000x600px

---

## Article 3: Managing Resources & Rooms (5 images)

### IMAGE 12: resources-dashboard.svg
**DESCRIPTION:** Resources list page showing all configured resources

**DETAILS:**
- Page header: "Resources"
- Subheader: "Manage rooms and equipment for your services"
- "+ Add Resource" button (top right, purple)
- Table/list of resources:
  | Name | Type | Linked Services | Status |
  |------|------|-----------------|--------|
  | Massage Table 1 | Equipment | Massage, Hot Stone | Active |
  | Massage Table 2 | Equipment | Massage, Hot Stone | Active |
  | Pedicure Chair 1 | Equipment | Pedicure, Gel Pedicure | Active |
  | Pedicure Chair 2 | Equipment | Pedicure, Gel Pedicure | Maintenance |
  | VIP Treatment Room | Room | Facials, Body Wraps | Active |
  | Styling Station 1-4 | Equipment | All Hair Services | Active |
- Status badges: green "Active", orange "Maintenance"
- Edit/Delete icons on each row

**HIGHLIGHTS:** None

**SIZE:** 1100x600px

---

### IMAGE 13: resources-add-modal.svg
**DESCRIPTION:** Add Resource modal form

**DETAILS:**
- Modal title: "Add New Resource"
- Form fields:
  - Resource Name: text field with placeholder "e.g., Massage Table 1"
  - Resource Type: dropdown showing options:
    - Room (selected)
    - Equipment
  - Capacity: number input showing "1"
    - Helper text: "How many clients can use this at once?"
  - Description: text area (optional)
    - Placeholder: "Add details about this resource..."
- Toggle switches at bottom:
  - "Block time slot when in use" - ON
  - "Require resource for linked services" - ON
- Cancel and "Add Resource" buttons

**HIGHLIGHTS:** Resource Type dropdown in open state

**SIZE:** 600x550px

---

### IMAGE 14: resources-service-linking.svg
**DESCRIPTION:** Service linking interface with checkboxes

**DETAILS:**
- Section of resource edit page or modal
- Header: "Link to Services"
- Subtext: "Select which services require this resource"
- Checkbox list grouped by category:
  - **Massage Services**
    - ☑️ Swedish Massage (60 min)
    - ☑️ Deep Tissue Massage (60 min)
    - ☑️ Hot Stone Massage (90 min)
    - ☐ Couples Massage
  - **Body Treatments**
    - ☐ Body Wrap
    - ☐ Body Scrub
    - ☑️ Aromatherapy Session
- "Select All" / "Deselect All" links at top
- Search/filter field: "Filter services..."
- Counter showing: "4 services selected"

**HIGHLIGHTS:** Purple checkmarks on selected services

**SIZE:** 600x500px

---

### IMAGE 15: resources-calendar-view.svg
**DESCRIPTION:** Resource-specific calendar showing bookings

**DETAILS:**
- Page header: "Massage Table 1" with back arrow
- Tabs: "Details" | "Calendar" (Calendar selected)
- Weekly calendar view for this specific resource
- Time slots from 9 AM - 6 PM
- Bookings shown as blocks:
  - Monday 10am: "Emma J. - Swedish Massage" (1h)
  - Monday 2pm: "Tom S. - Deep Tissue" (1h)
  - Tuesday 9am: "Lisa C. - Hot Stone" (1.5h)
  - Wednesday 11am: "Maria G. - Swedish Massage" (1h)
  - Thursday 3pm: "John D. - Deep Tissue" (1h)
- Empty slots clearly visible
- Legend: "Booked" (blue) | "Available" (white/empty)

**HIGHLIGHTS:** None

**SIZE:** 1000x600px

---

### IMAGE 16: resources-conflict-alert.svg
**DESCRIPTION:** Warning message when attempting to double-book a resource

**DETAILS:**
- Appointment booking modal in background (dimmed)
- Alert/warning overlay:
  - Orange/yellow warning icon
  - Title: "Resource Unavailable"
  - Message: "Massage Table 1 is already booked at this time."
  - Current booking shown: "10:00 AM - Emma Johnson - Swedish Massage"
  - Options:
    - "Choose Different Time" button (primary)
    - "Choose Different Resource" button (secondary)
    - "Override (Admin)" link (subtle, red text)
  - Warning note: "Overriding will double-book this resource"

**HIGHLIGHTS:** Orange warning icon, red override text

**SIZE:** 600x400px

---

## Article 4: Setting Closed Periods & Time Off (6 images)

### IMAGE 17: closures-dashboard.svg
**DESCRIPTION:** Closed Periods list page showing upcoming closures

**DETAILS:**
- Page header: "Closed Periods"
- Subheader: "Manage holidays, time off, and business closures"
- "+ Add Closure" button (top right, purple)
- Filter tabs: "Upcoming" (selected) | "Past" | "All"
- Table/list of closures:
  | Date(s) | Reason | Type | Affected Staff |
  |---------|--------|------|----------------|
  | Dec 25, 2025 | Christmas Day | Business | All Staff |
  | Dec 31 - Jan 1 | New Year Holiday | Business | All Staff |
  | Jan 15-22, 2026 | Sarah - Vacation | Staff | Sarah Martinez |
  | Feb 14, 2026 | Team Training Day | Business | All Staff |
  | Mar 5, 2026 | James - Personal | Staff | James Wilson |
- Type badges: purple "Business", blue "Staff"
- Edit/Delete icons on each row

**HIGHLIGHTS:** None

**SIZE:** 1100x600px

---

### IMAGE 18: closures-add-button.svg
**DESCRIPTION:** Calendar toolbar showing Add Closure button

**DETAILS:**
- Calendar toolbar section
- Standard toolbar items visible:
  - Date navigation
  - View toggles
  - Staff filter
- Additional button: "Add Closure" or calendar icon with + 
  - Gray/secondary button style
  - Positioned near the +New Appointment button
- Alternatively: Right-click context menu on calendar showing:
  - "New Appointment"
  - "Add Time Block"
  - "Add Closure" ← highlighted
  - "View Day"

**HIGHLIGHTS:** Circle around "Add Closure" button or menu item

**SIZE:** 800x300px

---

### IMAGE 19: closures-type-selector.svg
**DESCRIPTION:** Closure type selection toggle

**DETAILS:**
- Modal or form section: "Add Closure"
- Clear toggle or radio button selection:
  - 🏢 **Business-wide Closure**
    - "Entire salon closed to all bookings"
    - Selected state (filled/highlighted)
  - 👤 **Staff Time Off**
    - "Individual staff member unavailable"
    - Unselected state
- Visual distinction between options (cards, radio buttons, or toggle)
- Icon for each option
- Description text below each option

**HIGHLIGHTS:** Business-wide option shown as selected

**SIZE:** 700x350px

---

### IMAGE 20: closures-date-picker.svg
**DESCRIPTION:** Date range selection for closures

**DETAILS:**
- Form section showing date fields
- "Start Date" field with calendar picker open:
  - February 2026 calendar
  - Date 14 selected (highlighted)
- "End Date" field showing "February 14, 2026"
- Range visualization if multi-day:
  - Start date: filled circle
  - End date: filled circle
  - Days between: highlighted background
- Quick options below calendar:
  - "Single Day" (selected)
  - "Date Range"
  - "Recurring" (for annual holidays)

**HIGHLIGHTS:** Selected dates on calendar with purple fill

**SIZE:** 700x450px

---

### IMAGE 21: closures-staff-select.svg
**DESCRIPTION:** Staff member selection checkboxes for closures

**DETAILS:**
- Form section (when "Staff Time Off" is selected)
- Header: "Select Affected Staff"
- Checkbox list:
  - ☐ Select All
  - ☑️ Sarah Martinez (avatar + name)
  - ☑️ James Wilson (avatar + name)
  - ☐ Emily Brown (avatar + name)
  - ☐ Carlos Garcia (avatar + name)
  - ☐ Ashley Kim (avatar + name)
- Each row shows:
  - Checkbox
  - Staff avatar (small circle)
  - Staff name
  - Role/title in gray (e.g., "Senior Stylist")
- Counter: "2 staff members selected"

**HIGHLIGHTS:** Checked checkboxes with purple fill

**SIZE:** 600x400px

---

### IMAGE 22: closures-calendar-view.svg
**DESCRIPTION:** Calendar showing grayed-out closure period

**DETAILS:**
- Weekly calendar view
- Closure visible spanning Thursday-Friday:
  - Entire columns for those days have gray overlay
  - Or gray blocks from top to bottom of time slots
  - Label on closure: "Team Training Day"
  - Different pattern/shade than regular appointments
- Regular appointments visible on other days:
  - Monday-Wednesday normal appointments
  - Saturday-Sunday normal
- Closure clearly distinguishable from regular bookings
- Legend showing: "Closed" in gray

**HIGHLIGHTS:** The closure period stands out visually from regular appointments

**SIZE:** 1000x600px

---

## Design Specifications (All Images)

### Color Palette
- **Primary Purple:** #7C3AED (buttons, selections, highlights)
- **Success Green:** #10B981 (checkmarks, available status)
- **Warning Orange:** #F59E0B (pending, warnings)
- **Error Red:** #EF4444 (conflicts, delete)
- **Neutral Gray:** #6B7280 (secondary text, disabled)
- **Background:** #F9FAFB (light gray)
- **Card/Modal:** #FFFFFF (white)
- **Text Primary:** #111827 (near black)
- **Text Secondary:** #6B7280 (gray)

### Typography
- **Headings:** Inter or system font, semibold
- **Body:** Inter or system font, regular
- **Monospace:** For times/codes if needed

### UI Style
- Rounded corners (8px for cards, 4px for buttons)
- Subtle shadows for modals and dropdowns
- Clean, minimal design matching modern SaaS aesthetic
- Consistent padding and spacing
- Mobile-responsive considerations (but desktop primary)

### Annotation Style
- Purple circles/rings for highlights (#7C3AED with 2px stroke)
- Annotation arrows in purple when needed
- Semi-transparent overlay when dimming backgrounds (black at 40% opacity)

### File Format
- SVG preferred for scalability
- PNG fallback at 2x resolution for retina
- Optimize for web (compress, remove unnecessary metadata)
