-- ============================================
-- NeonO Academy - Client Management Articles
-- Inserting 3 articles
-- ============================================

INSERT INTO academy_articles (category_id, slug, title, description, content, is_featured, order_index) VALUES

-- Article 1: Adding Client Profiles
((SELECT id FROM academy_categories WHERE slug = 'client-management'), 
'adding-client-profiles',
'Adding Client Profiles',
'Create comprehensive client profiles with contact info, preferences, and service history.',
'# Adding Client Profiles

Build detailed client profiles to deliver personalized service and track client relationships.

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
Track exact formulas used:
```
Date: Jan 15, 2024
Formula: L''Oréal 7N + 20vol
Processing: 30 minutes
Result: Perfect match
Next: Add lowlights
```

### Product Preferences
- Favorite products
- Allergies/sensitivities
- Products to avoid
- Recommended retail

### Service Preferences
- Preferred staff member
- Preferred day/time
- Consultation needs
- Service frequency

## Client Notes

### Service Notes
Document each visit:
- What was done
- Products used
- Client feedback
- Recommendations for next time

### Personal Notes
Remember details:
- Occupation
- Family info (kids, pets)
- Hobbies/interests
- Conversation topics
- Special occasions

**Example:**
```
Elementary school teacher
2 kids: Emma (8), Noah (5)
Loves hiking and photography
Anniversary in June
Prefers quiet morning appointments
```

### Alerts & Warnings
Flag important info:
- Allergies (highlight in red)
- Scalp sensitivity
- Previous bad reactions
- Payment issues
- Special accommodations needed

## Custom Fields

Add salon-specific fields:
- Referral source
- Client type (VIP, Regular, Occasional)
- Membership level
- Gift card balance
- Loyalty points

## Profile Photos

Upload client photos:
- Helps staff recognize clients
- Document hairstyle evolution
- Show color history
- Marketing (with permission)

**Before/After Gallery per client**

## Client Tags

Organize with tags:
- VIP
- First-time client
- Referral source
- Service interests
- Marketing segments

**Example Tags:**
#ColorClient #HighValue #Instagram #Referrals #BirthdayMonth

## Client History

Automatic tracking of:
- All appointments (past and future)
- Services received
- Products purchased
- Total lifetime value
- Last visit date
- Average ticket
- Visit frequency

## Privacy & Security

### Data Protection
- Secure storage
- Access controls
- GDPR compliance
- Right to deletion
- Data export option

### Consent Management
Track consent for:
- Marketing emails
- SMS messages
- Photo usage
- Reviews/testimonials
- Referral sharing

## Bulk Import

Import existing clients:
1. Download CSV template
2. Fill in client data
3. Map columns
4. Validate data
5. Import

**Template includes:**
- Name, email, phone
- Birthday, notes
- Marketing consent
- Custom fields

## Client Portal Access

Clients can manage their own profile:
- Update contact info
- Set communication preferences
- View service history
- Manage payment methods
- Update profile photo

## Next Steps

- [Client history & notes](#) →
- [Client communication tools](#) →
- [Loyalty programs](#) →
',
true, 1),

-- Article 2: Client History & Notes
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

**Filter by:**
- Date range
- Service type
- Staff member
- Location

### Service Analytics
Per client:
- Total visits
- Favorite services
- Average ticket
- Lifetime value
- Visit frequency
- Last visit date
- Next scheduled appointment

### Color History
Special tracking for color services:
- Formula used
- Processing time
- Developer volume
- Brand/line
- Result photos
- Client satisfaction
- Re-touch interval

**Formula Library per Client:**
```
Jan 2024: 7N + 20vol, 30min
Nov 2023: 7N + 20vol, 30min
Sep 2023: 8N + 20vol, 25min
```

## Note Types

### Service Notes
Document during/after service:
- What was performed
- Techniques used
- Products applied
- Results achieved
- Issues encountered
- Recommendations

**Example:**
```
Added face-framing highlights using
foil technique. Client loved the result.
Next visit: All-over balayage.
Recommend Olaplex treatment before.
```

### Consultation Notes
Track client goals:
- Desired look
- Inspiration photos
- Concerns/fears
- Budget considerations
- Timeline/expectations

### Personal Notes
Remember details that matter:
- Life events
- Preferences
- Conversation topics
- Relationship building

**Example:**
```
Daughter''s wedding in June - wants
to grow hair long. Planning color 
change to cover grays. Loves chat
about gardening.
```

### Technical Notes
Critical information:
- Allergies
- Sensitivities
- Contraindications
- Special requirements
- Medical considerations

**Alert displayed prominently!**

## Adding Notes

### Quick Notes
During appointment:
1. Tap client name
2. Click **Add Note**
3. Type note
4. Save

Auto-timestamped and credited to staff member.

### Detailed Notes
After service:
1. Open client profile
2. **Service History** → **Last Visit**
3. Click **Edit Notes**
4. Add comprehensive details
5. Attach photos
6. Tag with categories
7. Save

### Voice Notes
For busy stylists:
1. Tap microphone icon
2. Speak notes
3. Automatically transcribed
4. Review and save

**Perfect for capturing notes without stopping work.**

## Note Organization

### Categories
Tag notes:
- Service
- Formula
- Personal
- Alert
- Recommendation
- Follow-up

### Search
Find notes quickly:
- Search by keyword
- Filter by category
- Filter by date
- Filter by staff member

### Pinned Notes
Pin important notes to top:
- Critical allergies
- Standing instructions
- VIP preferences

## Sharing Notes

### Team Visibility
Control who sees notes:
- **Private:** Only you
- **Team:** All staff
- **Management:** Managers only

### Note at Booking
Show specific notes:
- When anyone books this client
- On calendar appointment
- At checkout

**Example:**
```
⚠️ ALERT: Latex allergy
💡 TIP: Prefers Sarah
💰 VIP: 20% loyalty discount
```

## Photo Documentation

### Before/After Photos
Take and store:
- Multiple angles
- Different lighting
- Close-ups of details
- Full length

### Photo Gallery
Organized by:
- Date
- Service type
- Staff member

### Client Access
Clients can:
- View their photo history
- Download images
- Share on social (with watermark)
- Request deletion

### Marketing Use
Get permission to use photos:
- Social media
- Website portfolio
- In-salon displays
- Marketing materials

**Consent form attached to photo.**

## Product History

Track products:
- Retail purchases
- In-service products used
- Recommendations made
- Samples given
- Refill reminders

## Communication History

Log all interactions:
- Appointment confirmations
- Reminder messages
- Marketing emails sent
- SMS conversations
- Phone calls
- Review requests

## Analytics Per Client

### Service Patterns
- Most booked services
- Average visit interval
- Preferred days/times
- Seasonal patterns

### Financial Metrics
- Lifetime value
- Average ticket
- Retail vs. service ratio
- Payment methods used
- Outstanding balance

### Engagement
- Response to marketing
- Referrals made
- Social media engagement
- Loyalty participation
- Review/feedback given

## Exporting History

Generate reports:
- Full client history (PDF)
- Service timeline
- Financial summary
- Photo gallery
- Email to client or print

**Use for:**
- Client requests
- Insurance documentation
- Legal requirements
- Changing salons

## GDPR & Privacy

### Client Rights
- View all data
- Export all data
- Request corrections
- Request deletion
- Limit processing

### Data Retention
- Active clients: Indefinitely
- Inactive (2+ years): Archive
- After deletion request: 30 days
- Legal requirement: Up to 7 years

## Best Practices

### 1. Note After Every Service
Make it routine:
- Formula used
- Result achieved
- Next step recommended

### 2. Be Specific
Bad: "Colored hair"
Good: "Applied L''Oréal 7N root touch-up, 30min processing. Perfect gray coverage. Next: 5 weeks"

### 3. Update Preferences
After each visit:
- Confirmed likes/dislikes
- New allergies
- Changed contact info
- Life updates

### 4. Use Templates
Create templates for:
- Common services
- Consultation notes
- Formula documentation

### 5. Review Before Appointment
Spend 2 minutes reviewing:
- Last service notes
- Standing preferences
- Upcoming life events
- Recommended next steps

## Next Steps

- [Client communication tools](#) →
- [Product recommendations](#) →
- [Client retention strategies](#) →
',
false, 2),

-- Article 3: Client Communication Tools
((SELECT id FROM academy_categories WHERE slug = 'client-management'), 
'client-communication-tools',
'Client Communication Tools',
'Use email, SMS, and messaging to stay connected with clients.',
'# Client Communication Tools

Effective communication builds relationships, increases retention, and boosts revenue. Master these tools.

## Communication Channels

### Email
**Best for:**
- Newsletters
- Promotions
- Long-form content
- Appointment confirmations
- Educational content

**Pros:**
- Free unlimited
- Rich content (images, links)
- High detail

**Cons:**
- Lower open rates (20-30%)
- Delayed reading
- Spam folder risk

### SMS
**Best for:**
- Reminders
- Urgent updates
- Quick questions
- Time-sensitive offers
- High-priority messages

**Pros:**
- 98% open rate
- Read within 3 minutes
- Direct response

**Cons:**
- Costs per message
- Character limit
- Requires opt-in

### In-App Messaging
**Best for:**
- App users
- Push notifications
- Rich content
- Two-way chat

**Pros:**
- Free
- Instant
- Feature-rich

**Cons:**
- Requires app download
- Limited audience

### Phone Calls
**Best for:**
- VIP clients
- Complex issues
- Complaints
- High-value opportunities

**Pros:**
- Personal touch
- Immediate resolution
- Build rapport

**Cons:**
- Time intensive
- Not scalable

## Automated Campaigns

### Welcome Series
New client sequence:
1. **Day 0:** Welcome email
2. **Day 3:** How to book online
3. **Day 7:** Introduce loyalty program
4. **Day 14:** Service recommendations
5. **Day 30:** Request review

### Reactivation
For inactive clients:
1. **60 days:** "We miss you" email
2. **90 days:** Special offer (20% off)
3. **120 days:** SMS reminder
4. **150 days:** Last chance email
5. **180 days:** Archive as inactive

### Birthday Campaign
Automated birthday messages:
- **Week before:** Birthday email
- **Day of:** Special SMS
- **Offer:** Free service or discount
- **Week after:** Reminder if not redeemed

**Example:**
```
🎉 Happy Birthday, Sarah!

Celebrate with a complimentary blow-dry
or 20% off any service this month!

Book now: [Link]
```

### Post-Appointment
Follow-up sequence:
1. **Same day:** Thank you + rebook
2. **Next day:** How was your service?
3. **3 days:** Request review
4. **2 weeks:** Product recommendation
5. **4 weeks:** Time to rebook reminder

### Seasonal Campaigns
Timed campaigns:
- Back to school (August)
- Holiday party season (November)
- Valentine''s Day (February)
- Summer refresh (June)

## Manual Messaging

### Individual Messages
Send one-off messages:
1. Select client
2. Choose channel (Email/SMS)
3. Write message
4. Send or schedule

**Quick messages:**
- Running late
- Appointment confirmation
- Follow-up question
- Personal note

### Bulk Messages
Message multiple clients:
1. Filter clients by:
   - Service type
      - Last visit date
         - Tags
            - Birthday month
            2. Compose message
            3. Preview
            4. Send to all

            **Use cases:**
            - Announce new services
            - Promote slow days
            - Holiday hours
            - Special events
            - Last-minute openings

            ### Segmented Campaigns
            Target specific groups:
            - **Color clients:** Color care tips
            - **Inactive (90+ days):** Comeback offer
            - **VIPs:** Exclusive preview
            - **New clients (<3 visits):** Education content
            - **High-value:** Personal stylist note

            ## Message Templates

            ### Appointment Reminders
            ```
            Hi {Name}! Reminder: {Service} 
            tomorrow at {Time} with {Staff}.
            Reply C to confirm.
            ```

            ### Last-Minute Openings
            ```
            Opening at 2pm today! First to 
            reply gets it. {Service} with 
            {Staff}. Reply YES to book.
            ```

            ### Reactivation
            ```
            {Name}, we haven''t seen you in a 
            while! Come back this month and 
            get 20% off. Book: {Link}
            ```

            ### Review Request
            ```
            Thanks for visiting {SalonName}!
            How was your experience? Leave a 
            review: {Link}
            ```

            ### Product Recommendation
            ```
            Hi {Name}! Based on your recent
            {Service}, we recommend {Product}
            for best results. Shop: {Link}
            ```

            ### Birthday
            ```
            🎂 Happy Birthday {Name}! Enjoy a 
            complimentary blow-dry this month.
            Book: {Link} Valid through {Date}
            ```

            ## Two-Way Messaging

            ### Client-Initiated
            Allow clients to text/message:
            - Booking questions
            - Reschedule requests
            - Product questions
            - Service inquiries

            **Dedicated salon phone number** receives messages.

            ### Respond Quickly
            Best practices:
            - Reply within 1 hour (business hours)
            - Auto-reply after hours
            - Route to appropriate staff
            - Track conversation history

            ### Conversation View
            See full message thread:
            - All messages with client
            - Across all channels
            - Full context
            - Quick replies

            ## Email Marketing

            ### Newsletter
            Regular email (monthly):
            - Salon news
            - Staff spotlights
            - Seasonal tips
            - Special offers
            - Client features

            **Example Structure:**
            ```
            📰 Bella Salon Monthly

            ✂️ What''s New
            • New balayage techniques
            • Meet our new stylist, Alex

            💡 Tip of the Month
            • How to maintain summer color

            🌟 Client Spotlight
            • Sarah''s amazing transformation!

            🎁 This Month''s Special
            • 15% off all color services
            ```

            ### Promotional Emails
            One-off campaigns:
            - Flash sales
            - New service launch
            - Event invitations
            - Referral programs

            ### Drip Campaigns
            Automated sequences:
            - New client onboarding
            - Service education
            - Product education
            - Loyalty program

            ## SMS Marketing

            ### Compliance
            Requirements:
            - Get explicit opt-in
            - Include salon name
            - Provide opt-out (STOP)
            - Honor opt-outs immediately
            - Keep records

            **Compliant Message:**
            ```
            BellaSalon: Special today! 15% off
            color. Book: bit.ly/bella Reply 
            STOP to opt out.
            ```

            ### SMS Best Practices
            - Keep under 160 characters
            - Use URL shorteners
            - Clear call-to-action
            - Send during business hours
            - Limit frequency (max 4/month)
            - Provide value

            ### High-Performing SMS
            - ✓ Time-sensitive offers
            - ✓ Appointment reminders
            - ✓ Last-minute openings
            - ✓ Birthday wishes
            - ✓ Reactivation offers

            - ✗ Long content
            - ✗ Complex information
            - ✗ Multiple links
            - ✗ Frequent promotions

            ## Communication Preferences

            ### Let Clients Choose
            Preference center:
            - Email: Yes/No
            - SMS: Yes/No
            - Frequency: Often/Normal/Rarely
            - Content: All/Offers Only/Appointments Only

            ### Respect Preferences
            - Honor opt-outs immediately
            - Don''t send after unsubscribe
            - Allow granular control
            - Make opt-out easy

            ## Analytics & Tracking

            ### Email Metrics
            - **Open rate:** % who opened
            - **Click rate:** % who clicked links
            - **Conversion rate:** % who booked
            - **Unsubscribe rate:** % who opted out
            - **Revenue generated:** From campaign

            ### SMS Metrics
            - **Delivery rate:** % delivered
            - **Response rate:** % who replied
            - **Redemption rate:** % who used offer
            - **Opt-out rate:** % who unsubscribed

            ### Campaign Performance
            Compare campaigns:
            - Which subject lines work best
            - Optimal send time
            - Most effective offers
            - Best performing segments

            **Dashboard:**
            ```
            Campaign: Summer Color Special
            Sent: 847 emails
            Opened: 312 (37%)
            Clicked: 94 (11%)
            Booked: 23 (2.7%)
            Revenue: $3,220
            ROI: 16:1
            ```

            ## Best Practices

            ### 1. Be Personal
            Use personalization:
            - First name
            - Last service
            - Preferences
            - Birthday

            ### 2. Provide Value
            Every message should:
            - Inform
            - Entertain
            - Offer benefit
            - Solve problem

            ### 3. Clear Call-to-Action
            Every message needs:
            - One primary action
            - Clear next step
            - Easy to complete

            ### 4. Mobile-Optimized
            Design for mobile:
            - Short subject lines
            - Scannable content
            - Large tap targets
            - Fast loading

            ### 5. Test & Optimize
            A/B test:
            - Subject lines
            - Send times
            - Content
            - Offers
            - CTAs

            ## Next Steps

            - [Email campaigns](#) →
            - [SMS marketing](#) →
            - [Client retention](#) →
            ',
            false, 3);

            -- ============================================
            -- Verification Query
            -- ============================================

            SELECT 
              c.title as category,
                COUNT(a.id) as article_count
                FROM academy_categories c
                LEFT JOIN academy_articles a ON a.category_id = c.id
                WHERE c.slug = 'client-management'
                GROUP BY c.title, c.order_index
                ORDER BY c.order_index;

                -- Expected result:
                -- Client Management: 3
                