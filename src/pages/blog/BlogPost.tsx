import { useParams, Navigate, Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { ShareBar } from '@/components/share/ShareBar';
import { NewsletterForm } from '@/components/newsletter/NewsletterForm';
import { SEOHead } from '@/components/SEO/SEOHead';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { generateEnhancedArticleSchema, generateBlogBreadcrumbSchema } from '@/lib/seo/blogSchema';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';

// Import blog posts data
import { blogPosts } from './blogData';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title, href: `/blog/${post.slug}` }
  ];

  // Get the full blog content based on slug
  const getFullContent = (slug: string) => {
    switch (slug) {
      case 'hidden-costs-salon-software':
        return `
# The Hidden Costs of Salon Software: What They Don't Tell You

When shopping for salon software, the advertised price is just the beginning. Most platforms look affordable until you start adding the features your business actually needs.

## The Base Price Trap

That $50/month price tag? It usually includes:
- Basic scheduling (limited bookings)
- Simple client database
- Basic reporting

But here's what's missing:

## Add-On Costs That Add Up

### Payment Processing
- Most charge 2.9% + $0.30 per transaction
- Premium processors: 2.6% + $0.10
- **Annual impact**: $3,000+ on $100k revenue

### SMS Marketing
- Basic: $20-50/month for 1,000 texts
- Advanced campaigns: $100-200/month
- **Hidden cost**: Per-message overage fees

### Advanced Features
- Inventory management: +$20-40/month
- Staff scheduling: +$15-30/month
- Advanced reporting: +$25-50/month
- Multi-location: +$30-100/month per location

## The True Cost Calculation

**Example**: Advertised at $50/month
- Base software: $50
- Payment processing (2.9%): $250/month
- SMS marketing: $75/month  
- Advanced features: $85/month
- **Real monthly cost**: $460/month ($5,520/year)

## Red Flags to Watch For

1. **"Starting at" pricing** - Always ask for full feature pricing
2. **Transaction fees** - Calculate based on your actual volume
3. **Per-user charges** - Costs multiply with staff growth
4. **Integration fees** - Third-party app connections often cost extra
5. **Setup and training fees** - Can be $500-2,000 upfront

## Smart Shopping Strategy

1. **Calculate total cost of ownership** for 2-3 years
2. **Factor in payment processing** as part of software cost
3. **Ask about bundled pricing** for multiple features
4. **Test the free trial** with real data and workflows
5. **Read the fine print** on overage charges

## The Bottom Line

A $50/month solution can easily become $500/month once you add essential features. Always calculate the true total cost before signing any contract.

*Looking for transparent, all-inclusive pricing? NeonO includes payment processing, SMS marketing, and all advanced features in one flat rate - no hidden fees, no surprises.*
        `;

      case 'sms-marketing-campaigns-salons':
        return `
# 5 SMS Marketing Campaigns That Actually Work for Salons

SMS marketing has a 98% open rate, but most salons waste this opportunity with generic messages. Here are 5 campaigns that drive real bookings.

## 1. The Appointment Reminder Plus

**Standard reminder**: "Hi Sarah, reminder of your appointment tomorrow at 2pm"

**High-converting version**: "Hi Sarah! Excited for your balayage tomorrow at 2pm 💫 BTW, we have a 20% off retail special this week. See you soon! - Lisa"

**Why it works**: Personal touch + upsell opportunity
**Results**: 15% increase in retail sales per appointment

## 2. The Last-Minute Fill Campaign

**When to send**: 4-6 hours before empty slots
**Message**: "Quick! We have a 3pm cancellation today. Perfect timing for that trim you mentioned? Reply YES and it's yours! 💇‍♀️"

**Pro tip**: Only send to clients who've mentioned needing that service
**Results**: 60% booking rate on last-minute slots

## 3. The Birthday VIP Treatment

**Timing**: 1 week before birthday
**Message**: "Your birthday is coming up, Emma! 🎉 We'd love to treat you to 25% off any service this month. Book your birthday glow-up?"

**Follow-up**: If no response in 3 days, send: "Still thinking about your birthday treat? The 25% off expires in 3 days!"
**Results**: 40% birthday month booking rate

## 4. The Seasonal Service Push

**Example - Fall transition**:
"Hey Jessica! 🍂 Ready to switch up your look for fall? We're booking color consultations for September. Want to try that darker shade you were considering?"

**Why it works**: 
- Seasonal relevance
- Refers to past conversations
- Creates urgency with booking timeline

**Results**: 30% higher conversion than generic promotions

## 5. The Loyalty Milestone Celebration

**After 5th visit**:  
"WOW! You're officially one of our VIPs, Maria! 🌟 As a thank you, here's 30% off your next visit + a complimentary deep conditioning treatment. You deserve it!"

**Psychology**: Makes clients feel special and appreciated
**Results**: 85% retention rate for milestone clients

## The Rules That Make SMS Work

### Timing Is Everything
- **Best days**: Tuesday-Thursday
- **Best times**: 10am-12pm, 2pm-4pm
- **Avoid**: Monday mornings, Friday evenings, weekends

### Keep It Personal
- Use first names
- Reference past services
- Include stylist name
- Add relevant emojis (but don't overdo it)

### Always Include Clear CTAs
- "Reply YES to book"
- "Call us at [number]"
- "Book online: [link]"

### Legal Requirements
- Always include opt-out option
- Get explicit consent before sending
- Include business name in messages

## Sample Campaign Calendar

**Week 1**: Appointment reminders + retail upsells
**Week 2**: Birthday messages to monthly list
**Week 3**: Seasonal service promotion
**Week 4**: Last-minute fill campaigns + loyalty milestones

## Measuring Success

Track these metrics:
- **Open rates** (should be 95%+)
- **Response rates** (aim for 20%+)
- **Booking conversion** (target 30%+)
- **Revenue per message** (calculate ROI)

## Common Mistakes to Avoid

❌ Sending too frequently (max 2-3 per month per client)
❌ Generic mass messages
❌ Forgetting to personalize
❌ No clear call-to-action
❌ Sending at wrong times

The key to SMS success is treating it like a personal conversation, not a broadcast. Your clients should feel like you're texting them directly, not blasting a promo to hundreds of people.

*NeonO's SMS marketing includes templates, automated campaigns, and detailed analytics to maximize your text marketing ROI.*
        `;

      case 'client-retention-strategies':
        return `
# Client Retention Strategies That Increased Revenue by 40%

Acquiring new clients costs 5x more than retaining existing ones. Here are the proven strategies top salons use to keep clients coming back.

## Case Study: From 60% to 95% Retention

**Salon**: Urban Hair Studio (3 locations)
**Challenge**: High client turnover, inconsistent bookings
**Timeline**: 18 months
**Results**: 
- Retention rate: 60% → 95%
- Revenue increase: 40%
- Client lifetime value: $2,400 → $4,100

Here's exactly what they did:

## Strategy 1: The Welcome Series

**Problem**: New clients often didn't return after first visit

**Solution**: 3-touch welcome series
1. **24 hours post-visit**: Thank you text with aftercare tips
2. **1 week later**: "How's your hair feeling?" check-in
3. **3 weeks later**: Booking reminder with 15% off next service

**Impact**: First-time return rate increased from 40% to 78%

## Strategy 2: Predictive Rebooking

**The old way**: Wait for clients to call
**The new way**: Proactive outreach based on service history

**System**:
- Color clients: Outreach at 6 weeks
- Cuts: Outreach at 4-5 weeks  
- Treatments: Outreach at 3 weeks

**Message example**: "Hi Lisa! Your balayage is probably ready for a refresh. I have availability next Thursday at 2pm - perfect timing to keep that color vibrant! - Sarah"

**Results**: 65% prebooking rate vs. 25% with reactive approach

## Strategy 3: The Service Journey Map

**What it is**: Planned progression of services for each client

**Example Client Journey**:
- **Visit 1**: Cut + consultation for future color
- **Visit 2**: Partial highlights 
- **Visit 3**: Full color + treatment
- **Visit 4**: Maintenance cut + glossing
- **Visit 5**: Color refresh + retail recommendation

**Key**: Each visit sets up the next one naturally
**Results**: Average services per client increased from 2.1 to 3.8 annually

## Strategy 4: The Loyalty Loop

Instead of generic point systems, create meaningful milestones:

**Tier System**:
- **VIP (5+ visits)**: 15% off all services, priority booking
- **Elite (10+ visits)**: 20% off + complimentary treatments
- **Icon (20+ visits)**: 25% off + exclusive access to new services

**Special touches**:
- Handwritten thank you notes
- Birthday treats
- First access to new stylists/services
- Exclusive client events

**Results**: Elite tier clients visit 40% more frequently

## Strategy 5: Retention Risk Detection

**Early warning signs** tracked in their system:
- Booking intervals getting longer
- Switching stylists frequently  
- Declining add-on services
- Lower satisfaction scores

**Intervention protocol**:
1. **Manager check-in** within 48 hours
2. **Complimentary consultation** to address concerns
3. **Service adjustment** or stylist match if needed
4. **Follow-up** to ensure satisfaction

**Impact**: Saved 70% of at-risk clients

## Strategy 6: The Experience Audit

Monthly review of every touchpoint:
- **Booking process**: How easy? How fast?
- **Wait time**: Are clients kept waiting?
- **Service quality**: Consistent across all staff?
- **Checkout experience**: Smooth and pleasant?
- **Follow-up**: Timely and helpful?

**Key insight**: Small friction points compound over time

## The Technology Stack That Made It Possible

1. **Client database** with service history and preferences
2. **Automated messaging** for timely outreach
3. **Booking analytics** to identify patterns
4. **Satisfaction tracking** after each visit
5. **Revenue reporting** to measure impact

## ROI Breakdown

**Investment**:
- Software upgrade: $150/month
- Staff training: $2,000 one-time
- Process implementation: 20 hours/month

**Returns** (annual):
- Increased revenue: $120,000
- Reduced marketing costs: $18,000
- Higher service prices (premium clients): $24,000
- **Total ROI**: 2,100%

## Implementation Timeline

**Month 1**: Set up tracking and baseline metrics
**Month 2-3**: Implement welcome series and predictive rebooking
**Month 4-5**: Launch loyalty program and service journeys
**Month 6+**: Optimize based on data and add advanced strategies

## Key Metrics to Track

- **Retention rate** (% clients who return within 6 months)
- **Visit frequency** (average time between appointments)
- **Lifetime value** (total revenue per client)
- **Referral rate** (% clients who refer others)
- **Service per visit** (average ticket size)

## The Bottom Line

Client retention isn't about discounts - it's about creating an experience so good that clients can't imagine going anywhere else. 

Focus on systems, not just service, and the revenue growth will follow.

*Ready to implement these strategies? NeonO includes all the tools mentioned above: automated messaging, client journey tracking, loyalty management, and comprehensive analytics.*
        `;

      case 'commission-free-payments':
        return `
# Why Commission-Free Payments Matter (And Save You Money)

Most salon owners don't realize how much they're losing to payment processing fees. Here's the math on commission-free tip processing and how it saves thousands annually.

## The Hidden Tax on Your Revenue

**Standard payment processing costs**:
- Base rate: 2.9% + $0.30 per transaction
- Premium cards (rewards/corporate): 3.5% + $0.30
- International cards: 4.4% + $0.30

**For a $100k annual revenue salon**:
- Average transaction: $85
- Processing fees: $2,900-3,500/year
- **That's like giving away 15-18 free services annually**

## The Tip Processing Problem

Here's where it gets expensive:

**Scenario**: $85 service + $20 tip = $105 total
**Standard processor**: Charges 2.9% on the FULL $105
**Fee**: $3.05 (you pay fees on money that goes to your staff!)

**Annual impact**:
- Average tips: $25,000/year
- Fees on tips: $725/year
- **You're paying fees on money that isn't even yours**

## Commission-Free Tip Processing: The Game Changer

**How it works**:
- Service fee: 2.9% on $85 = $2.47
- Tip fee: $0 on $20 tip
- **Total fee**: $2.47 vs. $3.05
- **Savings per transaction**: $0.58

**Annual savings calculation**:
- Transactions per year: ~1,200
- Savings per transaction: $0.58
- **Total annual savings**: $696

## But Wait, There's More Hidden Costs

### Monthly Fees
- **Standard processors**: $15-30/month gateway fee
- **PCI compliance**: $5-15/month
- **Statement fees**: $10-25/month
- **Total monthly extras**: $30-70

### Per-Transaction Extras
- **Chargeback fees**: $15-25 each
- **Batch fees**: $0.10-0.25 per day
- **International fees**: Additional 1-2%

### Equipment Costs
- **Terminal lease**: $15-40/month
- **Software fees**: $10-25/month
- **Support fees**: $5-15/month

## Real Salon Comparison

**Bella's Beauty Bar** - $150k annual revenue:

### Before (Traditional Processor)
- Base processing: $4,350/year
- Fees on tips: $1,200/year
- Monthly fees: $480/year
- Equipment: $360/year
- **Total**: $6,390/year

### After (Commission-Free Tips)
- Base processing: $4,350/year
- Fees on tips: $0/year
- Monthly fees: $240/year
- Equipment: $0/year (integrated)
- **Total**: $4,590/year

**Annual savings**: $1,800
**ROI**: Immediate - no setup costs

## The Cash Flow Difference

**Traditional setup**:
- Client pays $105
- Processor takes $3.05
- You receive $101.95
- You pay stylist $20 from your $81.95

**Commission-free setup**:
- Client pays $105  
- Processor takes $2.47
- You receive $102.53
- Stylist gets $20 directly
- You keep $82.53

**Net difference**: $0.58 more per transaction in your pocket

## Additional Benefits Beyond Savings

### Staff Satisfaction
- Tips processed instantly
- No waiting for tip payouts
- Transparent tip tracking

### Accounting Simplification  
- Tips don't run through your books
- Cleaner financial statements
- Easier tax reporting

### Compliance
- Automatic tip reporting
- Reduced audit risk
- Simplified payroll

## Implementation Considerations

### What to Look For
- **True 0% on tips** (not just lower rates)
- **No monthly minimums** on tip volume
- **Integrated payroll** for seamless tip distribution
- **Real-time reporting** for transparency

### Questions to Ask Providers
1. "What's the exact fee structure on tips?"
2. "Are there any monthly minimums or volume requirements?"
3. "How quickly do staff receive tips?"
4. "What reporting do I get on tip distribution?"
5. "Is this compliant with local tip regulations?"

## The Math Summary

**For a typical $120k revenue salon**:
- Standard processing cost: $5,500/year
- Commission-free processing: $4,200/year
- **Annual savings**: $1,300
- **Monthly savings**: $108

**That's enough to**:
- Cover 2-3 months of software costs
- Fund additional marketing
- Invest in staff training
- Improve profit margins

## Red Flags to Avoid

❌ **"Low rates" that exclude tips**
❌ **Volume requirements** for tip savings
❌ **Hidden fees** that offset tip savings  
❌ **Complex tip distribution** systems
❌ **No integration** with existing systems

## Making the Switch

**Timeline**: Usually 1-2 weeks
**Disruption**: Minimal with good providers  
**Training needed**: 1-2 hours for staff
**ROI timeline**: Immediate (first transaction)

The bottom line: Commission-free tip processing is one of the fastest ways to improve your salon's profitability without changing anything about how you operate.

*NeonO includes commission-free tip processing as standard - no extra fees, no volume requirements, just more money in your pocket from day one.*
        `;

      default:
        return `
# ${post.title}

${post.excerpt}

*This blog post content is coming soon. Our team is working on creating comprehensive, valuable content for salon owners.*

## What You Can Expect

This post will cover:
- Practical, actionable strategies
- Real-world case studies
- Step-by-step implementation guides
- Measurable results and ROI

Stay tuned for the full content, or [contact our team](/contact) if you have specific questions about this topic.
        `;
    }
  };

  const fullContent = getFullContent(post.slug);

  return (
    <>
      <SEOHead 
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        keywords={post.tags.join(', ')}
        type="article"
        publishedTime={post.publishedAt}
        author={post.author}
        image={post.featuredImage}
      />
      
      {/* Enhanced Article Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateEnhancedArticleSchema({
            title: post.title,
            description: post.excerpt,
            content: fullContent,
            author: post.author,
            publishedTime: post.publishedAt,
            url: `https://www.neono.com/blog/${post.slug}`,
            featuredImage: post.featuredImage,
            category: post.category,
            tags: post.tags
          }))
        }}
      />
      
      {/* Breadcrumb Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBlogBreadcrumbSchema(breadcrumbs))
        }}
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Breadcrumbs customCrumbs={breadcrumbs} />
          
          {/* Back to Blog */}
          <Button variant="ghost" asChild className="mb-6">
            <a href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </a>
          </Button>

          {/* Article Header */}
          <article className="prose prose-lg max-w-none">
            <header className="mb-8 pb-8 border-b">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{post.category}</Badge>
                {post.featured && <Badge>Featured</Badge>}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
                <span>By {post.author}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="my-8 -mx-4 md:mx-0">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="w-full rounded-lg shadow-xl"
                />
              </div>
            )}

            {/* Article Content */}
            <ReactMarkdown
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h1:text-4xl prose-h1:mb-4
                prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-muted-foreground prose-li:mb-2
                prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded
                prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {fullContent}
            </ReactMarkdown>
          </article>

          {/* Related Posts */}
          <RelatedPosts 
            currentPostId={post.id}
            currentCategory={post.category}
            currentTags={post.tags}
            allPosts={blogPosts}
            maxPosts={3}
          />

          {/* Share and Newsletter */}
          <div className="grid gap-6 md:grid-cols-2 mt-12 pt-8 border-t">
            <ShareBar />
            <NewsletterForm variant="inline" />
          </div>
        </div>
      </div>
    </>
  );
}