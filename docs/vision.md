# Vision & Master Specification — Arogya Path E-Commerce Website

> **Document status:** Master project vision and implementation specification  
> **Audience:** Antigravity / development AI, frontend developers, backend developers, DevOps, designers, content team  
> **Project type:** Production-ready direct-to-consumer wellness / dietary-supplement e-commerce website  
> **Primary stack:** React + TypeScript + Vite + Tailwind CSS  
> **Backend direction:** Supabase  
> **Deployment direction:** GitHub + GitHub Actions + Cloudflare Pages  
> **Payments direction:** Razorpay  
> **Email direction:** Resend  
> **Working product shown in the supplied references:** Arogya Path — TESTO Natural Power+ Capsules  
> **Important:** Product/brand claims, regulatory text, pricing, certifications, ingredient quantities, dosage, and all medical/wellness statements must be treated as source-controlled business content and legally/compliance reviewed before production.

---

# 1. Executive Vision

We are building a real, deployable, production-quality e-commerce website for a wellness/supplement brand.

The website must combine two things:

1. **The proven commerce architecture of the supplied reference store**
2. **A completely original brand experience and visual/storytelling language**

The reference store is a **functional and UX reference**, not a visual-copying target.

The goal is NOT:

> “Make another version of the reference website.”

The goal is:

> “Build a better, more intentional commerce experience using the reference site's useful e-commerce structure while creating our own brand world.”

A visitor should understand what the brand sells, who the product is for, what the product represents, and why the brand exists almost immediately after landing on the website.

The first screen must not feel like a generic Shopify product grid.

It should feel like a brand.

The site should communicate:

- confidence
- vitality
- modern wellness
- premium quality
- natural ingredients
- purposeful formulation
- trust
- transparency
- performance
- an aspirational but believable lifestyle

The exact tone and final brand story must be refined from the supplied product material and future brand decisions. Do not invent unsupported brand promises.

---

# 2. Current Working Brand and Product Context

The supplied product references show:

**Brand:** Arogya Path  
**Tagline shown on packaging:** “the path to wellness”  
**Product:** TESTO Natural Power+ Capsules  
**Pack:** 30 vegetarian capsules  
**Positioning shown on packaging:** dietary supplement / natural wellness product  
**Product category:** men's wellness / vitality / performance-oriented supplement

The supplied packaging contains regulatory/product information including:

- supplement facts
- ingredients
- serving size
- capsule count
- FSSAI information
- batch/manufacturing information
- MRP area
- manufacturing/marketing information
- vegetarian marking
- quality/certification marks
- storage/use instructions
- dietary supplement disclaimer

These details must never be fabricated or changed casually.

The website's product information must ultimately be driven by structured product data and approved content, not hard-coded marketing copy scattered throughout components.

---

# 3. Core Product Experience

The website should make the customer journey feel like this:

```text
DISCOVER
    ↓
UNDERSTAND
    ↓
TRUST
    ↓
EXPLORE
    ↓
CHOOSE
    ↓
PURCHASE
    ↓
RECEIVE
    ↓
REORDER / RETURN
```

The website must support both:

### Story-first discovery

A visitor who has never heard of the brand can understand the product category and brand positioning.

### Commerce-first shopping

A visitor who already knows the product can immediately:

- search
- browse
- open the product
- choose a pack/variant
- add to cart
- checkout
- pay
- track the order

Both journeys must coexist.

---

# 4. Reference Website Philosophy

The supplied reference website, AR Ayurveda, is useful because it demonstrates a complete e-commerce structure.

Reference:
https://www.arayurveda.shop/

The reference currently includes a broad product catalog, category/concern navigation, product cards, pricing/discount presentation, product detail pages, reviews, cart functionality, policies, FAQ, contact/about information and footer commerce navigation.

The reference site should therefore be treated as a **functional benchmark**.

We should learn from:

- information architecture
- shopping flow
- product discovery
- collection pages
- product cards
- product detail structure
- cart behavior
- account behavior
- reviews
- FAQ
- policy pages
- delivery information
- promotional messaging
- footer organization
- mobile responsiveness
- commerce states

We should NOT copy:

- their logo
- exact colors
- typography
- exact page composition
- exact copy
- exact imagery
- exact animations
- exact illustrations
- exact visual hierarchy
- exact section order unless it genuinely makes sense
- their branding
- their marketing claims
- their product descriptions
- their testimonials
- their reviews
- their visual assets

The final website must be recognizably its own brand.

---

# 5. Supplied Visual Reference Analysis

The supplied references establish the current visual direction and content possibilities.

## 5.1 Packaging / label reference

The main label shows a black container with a predominantly white label, deep red/maroon product panels, green natural/plant accents, and bold condensed typography.

Important visual cues:

- black packaging
- white information fields
- dark red / maroon hero color
- green botanical accent
- strong condensed uppercase typography
- high contrast
- product photography featuring a male/female lifestyle image
- ingredient and regulatory information
- premium supplement packaging language

The packaging should influence the website's visual system, but the website should NOT simply become a giant copy of the label.

---

## 5.2 Seller/marketplace screenshot

The supplied Flipkart Seller Hub screenshot is an operational reference.

It demonstrates:

- product onboarding
- mandatory brand information
- FSSAI documentation
- approval status
- vertical/category information
- seller compliance workflow
- document upload
- inventory/orders/payments/growth/reporting ecosystem

This is NOT a visual reference for the customer website.

It is useful as a reminder that the business itself needs structured product/compliance/order operations behind the storefront.

The website architecture should therefore leave room for:

- product records
- compliance information
- SKU
- inventory
- order records
- payment records
- fulfillment status
- customer records
- reporting
- admin management

---

## 5.3 Product lifestyle photography

The supplied lifestyle images show:

- a male customer holding the product
- intimate/dark lifestyle lighting
- bedroom/home environments
- confident male subjects
- cinematic lighting
- red and blue accent lighting
- product held visibly toward camera
- premium advertising style

These suggest a visual language of:

**cinematic + masculine + premium + intimate + modern + confident**

The final brand should avoid looking cheap, overly clinical, overly generic Ayurveda, or like a typical marketplace listing.

---

## 5.4 Ingredient imagery

The supplied ingredient references show:

- Ashwagandha
- Fenugreek
- Tribulus terrestris
- Tongkat Ali
- Mucuna pruriens
- Shilajit
- Safed musli
- Zinc
- product bottle integrated with ingredient visuals

The website should use ingredient storytelling to create understanding and trust.

Ingredient sections should feel editorial and premium, not like a pasted specification sheet.

Each ingredient should have structured data:

```text
name
botanical_name
image
short_description
approved_benefit_statement
quantity
source
evidence/reference
display_order
```

Only approved statements should be shown publicly.

---

# 6. The First Landing Experience

This is one of the most important requirements in the entire project.

The homepage must NOT begin with:

```text
Header
↓
Generic discount banner
↓
Product grid
```

The first experience should establish the brand.

A visitor should quickly answer:

### What is this?

A wellness/supplement brand.

### What does it sell?

Products designed around a specific wellness/lifestyle need.

### Who is it for?

The intended customer segment defined by the brand.

### Why should I care?

A clear brand promise supported by product quality, formulation, transparency, and experience.

### Why should I trust it?

Visible evidence such as:

- product information
- ingredients
- manufacturing information
- certifications where legitimately applicable
- transparent labeling
- reviews
- policies
- secure checkout
- customer support
- clear shipping/returns information

---

# 7. Homepage Storytelling Direction

The homepage should behave like a visual narrative.

A recommended conceptual sequence:

```text
CHAPTER 01 — THE WORLD
Who we are / what this brand represents

CHAPTER 02 — THE NEED
The modern lifestyle problem or aspiration

CHAPTER 03 — THE PRODUCT
Introduce the hero product

CHAPTER 04 — THE FORMULA
Show what is inside

CHAPTER 05 — THE EXPERIENCE
Show the product in real life

CHAPTER 06 — THE DETAILS
Transparency / formulation / quality

CHAPTER 07 — THE PROOF
Reviews / social proof / evidence that can legitimately be shown

CHAPTER 08 — THE COLLECTION
Other products / shop

CHAPTER 09 — THE BRAND
Why the company exists

CHAPTER 10 — PURCHASE
Strong final CTA
```

This is a conceptual narrative, not a mandatory exact section order.

The final section order should be chosen based on actual brand storytelling.

---

# 8. Hero Section

The hero must be exceptional.

Requirements:

- immediate product/category understanding
- strong visual
- minimal but meaningful copy
- clear CTA
- strong contrast
- mobile-safe composition
- fast loading
- graceful fallback if video fails

Possible visual treatments:

- cinematic product video
- slow-motion product/lifestyle footage
- premium still image
- product emerging from darkness
- ingredient/product motion
- subtle atmospheric movement
- parallax
- controlled lighting transitions

Avoid:

- random stock hero
- overly busy hero
- 5–6 competing CTAs
- huge paragraphs
- generic “Welcome to our website”
- template-like slider behavior
- excessive popups before the visitor understands the brand

---

# 9. Storytelling Through Motion

Motion should reinforce the story.

Use motion for:

- reveal
- transition
- emphasis
- depth
- product presentation
- ingredient storytelling
- navigation feedback
- section transitions

Do NOT animate everything.

Motion should feel intentional.

Preferred animation characteristics:

- smooth
- premium
- restrained
- cinematic
- responsive
- interruptible
- accessible
- performance-conscious

Use:

- Motion / Framer Motion where appropriate
- CSS transitions for simple effects
- transform/opacity for performance
- IntersectionObserver for scroll-triggered behavior
- lazy loading for non-critical media

Avoid:

- heavy scroll-jacking
- forced delays
- excessive parallax
- animations that block navigation
- animations that make the page feel slow
- inaccessible motion

Respect:

```css
prefers-reduced-motion
```

---

# 10. Visual Identity Direction

The current product references suggest a visual system based around:

### Primary visual anchors

- deep maroon / red
- black
- white
- restrained botanical green
- warm skin tones
- natural earthy tones

These are starting references, not final locked colors.

The final design system should define:

```text
Primary
Secondary
Accent
Background
Surface
Text
Muted text
Border
Success
Warning
Error
```

Color values must be centralized in the design system.

Do not scatter hex codes throughout components.

---

# 11. Typography

The packaging suggests bold condensed display typography.

The website can use:

### Display

A strong condensed or editorial display typeface for:

- hero headings
- major statements
- product campaign titles

### Body

A highly readable modern sans-serif for:

- descriptions
- navigation
- product information
- checkout
- forms
- legal content

Typography hierarchy should include:

```text
Display XL
Display L
Heading XL
Heading L
Heading M
Heading S
Body L
Body M
Body S
Caption
Label
Price
Button
```

Typography must be responsive.

Do not use too many font families.

---

# 12. Design System

Create a reusable design system before building dozens of pages.

Components should include:

- Button
- IconButton
- Badge
- ProductCard
- ProductGrid
- ProductImageGallery
- Price
- Rating
- ReviewCard
- Input
- Select
- Checkbox
- Radio
- Modal
- Drawer
- Toast
- Accordion
- Tabs
- Breadcrumbs
- Pagination
- QuantitySelector
- CartItem
- CartSummary
- OrderStatus
- EmptyState
- ErrorState
- Skeleton
- LoadingIndicator
- SectionHeading
- EditorialImage
- VideoSection
- IngredientCard
- IngredientTimeline
- TrustBadge
- FAQItem
- NewsletterForm
- Footer

Build these once and reuse them.

---

# 13. Complete Website Information Architecture

Minimum production route structure:

```text
/
 /shop
 /collections/:slug
 /products/:slug

 /search
 /cart
 /checkout

 /account
 /account/login
 /account/register
 /account/forgot-password
 /account/orders
 /account/orders/:id
 /account/profile
 /account/addresses

 /about
 /contact
 /faq
 /shipping
 /returns
 /privacy
 /terms

 /admin
 /admin/login
 /admin/dashboard
 /admin/products
 /admin/products/new
 /admin/products/:id
 /admin/orders
 /admin/orders/:id
 /admin/customers
 /admin/reviews
 /admin/coupons
 /admin/inventory
 /admin/settings
```

Additional pages can be added later.

---

# 14. Header

Desktop header should provide:

- logo
- primary navigation
- shop/collection navigation
- search
- account
- cart
- promotional message where appropriate

Mobile header:

- menu
- logo
- search
- cart

Navigation should never become overcrowded.

The header may change appearance on scroll.

Possible behavior:

```text
Top of page
→ transparent/brand-specific

After scroll
→ compact solid header
```

Only use this if it improves the experience.

---

# 15. Announcement Bar

Optional.

Possible uses:

- shipping threshold
- current promotion
- new product
- limited campaign
- customer service message

It must be:

- dismissible if persistent
- accessible
- not visually dominant
- configurable through site settings

Do not hard-code campaign text.

---

# 16. Search

Search must be functional.

Requirements:

- product name search
- SKU search
- category search
- ingredient/tag search where appropriate
- typo tolerance where feasible
- empty state
- loading state
- result count
- mobile-friendly search UI

Later enhancements:

- popular searches
- recent searches
- recommended products
- autocomplete
- search analytics

Initial implementation can use Supabase/PostgreSQL search.

Do not introduce Algolia/Elastic/etc. unless scale requires it.

---

# 17. Shop / Collection Pages

Collection pages should support:

- title
- description
- optional editorial hero
- product count
- product grid
- sorting
- filters
- pagination or load more
- mobile filter drawer
- empty state
- loading state

Sorting:

```text
Featured
Best selling
Newest
Price low → high
Price high → low
Alphabetical
```

Filters can include:

- category
- concern
- price
- availability
- product type
- ingredient
- format
- pack size

Only expose filters that make sense for the actual catalog.

---

# 18. Product Cards

Product cards should show:

- product image
- hover/secondary image if available
- product name
- short descriptor
- rating
- review count
- price
- compare-at/MRP if legitimate
- discount badge if applicable
- stock state
- quick add
- wishlist if implemented

Product cards should not become cluttered.

---

# 19. Product Detail Page

This is a major conversion page.

Recommended structure:

```text
Breadcrumb
↓
Product gallery
↓
Product title
↓
Rating
↓
Short positioning statement
↓
Price
↓
Discount/MRP if applicable
↓
Variant / pack selector
↓
Quantity
↓
Add to cart
↓
Buy now
↓
Trust information
↓
Shipping information
↓
Product story
↓
Ingredients
↓
How to use
↓
Benefits / approved wellness positioning
↓
Supplement facts
↓
Quality / manufacturing information
↓
Reviews
↓
FAQ
↓
Related products
```

The exact order may change based on conversion testing.

---

# 20. Product Gallery

Support:

- primary product image
- front label
- back label
- lifestyle image
- ingredient image
- infographic
- usage image
- video

Features:

- desktop thumbnails
- mobile swipe
- fullscreen viewer
- zoom where appropriate
- video playback
- lazy loading
- alt text

Do not distort packaging.

---

# 21. Product Data Model

Every product should be data-driven.

Suggested fields:

```text
id
slug
sku
name
subtitle
short_description
description
category_id
collection_ids
status
price
compare_at_price
currency
tax_class
stock_quantity
low_stock_threshold
weight
dimensions
pack_size
servings
capsule_count
ingredients
supplement_facts
directions
warnings
storage
disclaimer
images
videos
rating
review_count
featured
best_seller
new_arrival
tags
seo_title
seo_description
og_image
created_at
updated_at
```

Do not hard-code product details into JSX.

---

# 22. Product Variants

Products may have:

```text
1 bottle
2 bottle pack
3 bottle pack
subscription later
```

Variants must be modeled separately when price/inventory/SKU differs.

Suggested:

```text
product_variants
id
product_id
sku
name
price
compare_at_price
stock_quantity
weight
is_default
```

---

# 23. Ingredients

Ingredient content should be editorial and structured.

Each ingredient may contain:

```text
name
botanical_name
image
description
approved_benefit
quantity
source
display_order
```

Important:

Do not automatically turn traditional ingredient associations into medical claims.

Every public claim must be approved.

---

# 24. How-To-Use Section

The supplied references show an infographic-style usage section.

The website should transform this into an interactive/editorial component rather than simply embedding a low-resolution poster.

Possible structure:

```text
01 — Dosage
02 — Timing
03 — How to take
04 — Routine
05 — Storage
06 — Safety / warnings
```

Content must match the official product label and approved instructions.

Never invent dosage.

---

# 25. Benefits / Wellness Positioning

The supplied materials use language such as:

- vitality
- energy
- stamina
- strength
- men's wellness
- performance
- reproductive wellness
- testosterone-related positioning

These are sensitive claims in a regulated product category.

Therefore:

**The website must not invent, exaggerate, guarantee, or medically strengthen claims.**

Do not use language like:

- guaranteed results
- cures
- treats disease
- permanent testosterone increase
- clinically proven unless documented
- zero side effects unless substantiated
- instant results
- guaranteed sexual performance

Approved product claims must come from the business/compliance source of truth.

---

# 26. Supplement Facts

Create a clear structured section.

Example conceptual data:

```text
Serving size
Servings per container
Ingredient
Amount per serving
Daily value if applicable
Other ingredients
```

The website should allow the admin to update this without changing code.

---

# 27. Trust Section

Trust should be built through evidence, not decorative badges.

Possible trust signals:

- transparent ingredient information
- authentic packaging
- legitimate certifications
- manufacturing information
- FSSAI information where appropriate
- secure payment
- shipping transparency
- customer support
- real reviews
- return/refund policy
- privacy policy

Only display certification logos that are actually applicable and verified.

---

# 28. Reviews

Review system:

```text
reviews
id
product_id
user_id
order_id
rating
title
body
verified_purchase
status
featured
created_at
```

Statuses:

```text
pending
approved
rejected
```

Only approved reviews appear publicly.

If “verified purchase” is displayed, it must be based on actual order data.

Never fabricate testimonials.

---

# 29. Cart

Cart must support:

- add item
- remove item
- quantity change
- variant change
- subtotal
- discount
- shipping estimate
- tax where applicable
- total
- coupon
- empty cart
- persistent cart
- cart drawer
- cart page

Cart should remain usable on mobile.

---

# 30. Checkout

Checkout must be simple.

Minimum:

```text
Contact information
Shipping address
Order summary
Coupon
Payment
Confirmation
```

Do not collect unnecessary personal information.

Checkout must clearly show:

- item
- quantity
- price
- discount
- shipping
- taxes
- total
- payment method

---

# 31. Payments

Primary payment integration:

**Razorpay**

Important architecture:

```text
Frontend
   ↓
Create order request
   ↓
Server / Supabase Edge Function
   ↓
Razorpay order
   ↓
Checkout
   ↓
Payment
   ↓
Webhook
   ↓
Verify signature
   ↓
Update order
   ↓
Send confirmation email
```

Never trust only the client-side success callback.

Payment must be verified server-side.

Never expose:

```text
Razorpay secret
Supabase service role key
email API secret
```

in frontend code.

---

# 32. Orders

Suggested order fields:

```text
id
order_number
user_id
customer_name
customer_email
phone
shipping_address
billing_address
subtotal
discount
shipping_fee
tax
total
currency
payment_status
fulfillment_status
payment_provider
payment_reference
coupon_id
notes
created_at
updated_at
```

Payment states:

```text
pending
authorized
paid
failed
refunded
partially_refunded
```

Fulfillment:

```text
pending
processing
packed
shipped
delivered
cancelled
returned
```

---

# 33. Order Tracking

Customer should be able to see:

```text
Order placed
Payment confirmed
Processing
Packed
Shipped
Out for delivery
Delivered
```

Actual tracking integrations can be added later.

Do not fake carrier tracking.

---

# 34. Customer Accounts

Support:

- register
- login
- logout
- password reset
- email verification
- profile
- addresses
- orders
- order detail

Guest checkout should remain possible unless business requirements say otherwise.

---

# 35. Authentication

Use Supabase Auth.

Potential methods:

- email/password
- magic link if desired
- Google OAuth if desired

Admin authentication must be separate from ordinary customer permissions.

Use database-level authorization.

---

# 36. Authorization

Use Supabase Row Level Security.

Rules:

### Customer

Can:

- read own profile
- read own orders
- manage own addresses
- submit reviews for eligible products

Cannot:

- read other customers
- modify product prices
- modify inventory
- access admin tables
- approve reviews

### Admin

Can:

- manage products
- manage inventory
- manage orders
- manage reviews
- manage coupons
- view customers
- manage site settings

Admin access must be role-controlled.

---

# 37. Admin Dashboard

A production store needs an admin system.

Dashboard:

```text
Revenue
Orders
Customers
Products
Low stock
Pending reviews
Recent orders
Recent activity
```

Product management:

```text
Create
Edit
Archive
Publish
Unpublish
Images
Variants
Pricing
Inventory
Ingredients
Directions
Warnings
SEO
```

Order management:

```text
View
Filter
Search
Update status
View payment
View customer
View address
Refund workflow where supported
```

Review management:

```text
Pending
Approve
Reject
Feature
Delete
```

Coupon management:

```text
Create
Edit
Deactivate
Expiry
Usage limit
Minimum order
Percentage discount
Fixed discount
Product/collection restriction
```

---

# 38. Inventory

Inventory should be real.

Fields:

```text
SKU
stock quantity
reserved quantity
available quantity
low-stock threshold
inventory status
```

Do not allow negative stock unless explicitly designed.

Cart reservation behavior should be considered when implementing checkout.

---

# 39. Coupons

Support:

```text
percentage
fixed amount
minimum order
maximum discount
start date
end date
usage limit
per-customer limit
product restriction
collection restriction
```

Coupon validation must happen server-side.

---

# 40. Email

Use Resend.

Emails:

```text
Welcome
Email verification
Password reset
Order confirmation
Payment confirmation
Order processing
Order shipped
Order delivered
Cancellation
Refund
Contact form notification
Admin order notification
```

Emails should use a reusable branded template.

Do not send emails from the browser with exposed API keys.

---

# 41. Contact

Contact page should include:

- support email
- phone/WhatsApp if approved
- business information
- contact form
- response expectation
- FAQ link

Contact form fields:

```text
name
email
phone optional
order number optional
subject
message
```

Add spam/rate protection.

---

# 42. FAQ

FAQ categories may include:

```text
Product
Usage
Ingredients
Shipping
Orders
Payments
Returns
Account
Safety
```

FAQ content must be editable.

Do not use generic AI-generated health advice.

---

# 43. Legal / Policy Pages

Required pages:

```text
Privacy Policy
Terms & Conditions
Shipping / Delivery Policy
Return / Refund Policy
Disclaimer
```

Potentially:

```text
Cookie Policy
Consent preferences
```

These documents must be business/legal-approved.

Do not fabricate legal guarantees.

---

# 44. Regulatory and Compliance Principles

This is a wellness/supplement website.

Therefore compliance is a first-class requirement.

The system must support:

- accurate product label information
- ingredient transparency
- applicable FSSAI information
- applicable warnings
- dietary supplement disclaimer
- age restrictions if legally/business-required
- privacy requirements
- payment compliance
- secure handling of customer data

The website must not:

- fabricate certification
- fabricate testing
- fabricate doctor endorsements
- fabricate customer testimonials
- make unsupported medical claims
- claim to diagnose/treat/cure disease
- alter approved dosage
- claim guaranteed outcomes

All final product claims must be approved before production.

---

# 45. Age Gate

If the business/legal requirements require age verification, implement an age gate.

Behavior:

```text
First visit
↓
Age gate
↓
Confirm eligibility
↓
Store consent appropriately
↓
Continue
```

Do not use an age gate merely because a reference site has one.

It must be based on actual product/business requirements.

---

# 46. Homepage Sections — Suggested System

Potential sections:

```text
Announcement
Header

Hero
Brand statement

Problem / aspiration
Product introduction

Product spotlight
Ingredient story

Formula / composition
Lifestyle section

How it fits into routine
Quality / transparency

Social proof
Featured products

Shop by need
Brand story

FAQ
Newsletter

Final CTA
Footer
```

This is a storytelling framework, not a rigid template.

---

# 47. Editorial Commerce

The homepage should feel closer to a premium campaign website that happens to sell products.

Use:

- large imagery
- controlled whitespace
- strong typography
- editorial composition
- immersive product sections
- cinematic photography
- carefully paced transitions
- product detail moments

Commerce elements should remain accessible without destroying the visual experience.

---

# 48. Product Photography Direction

Future generated/commissioned images should follow a consistent art direction.

### Product-only

- clean
- premium
- realistic
- accurate packaging
- no distorted labels
- controlled shadows
- consistent lighting

### Lifestyle

- authentic-looking people
- realistic skin/hands
- believable environments
- product clearly visible
- cinematic lighting
- no excessive sexualization
- no misleading medical imagery

### Ingredient

- botanical realism
- clean editorial presentation
- consistent framing

### Campaign

- premium
- cinematic
- high contrast
- emotionally strong
- brand-consistent

---

# 49. Image Generation Rules

AI-generated images may be used for marketing visuals where appropriate.

However:

- never generate fake certification documents
- never generate fake lab reports
- never generate fake customer testimonials
- never fabricate medical professionals
- never create misleading before/after medical results
- never alter product label facts
- never make the product packaging unreadable
- never misrepresent an ingredient

If the real product packaging is supplied, use it as the reference for product renders.

---

# 50. Video Strategy

The architecture must support:

- hero video
- product video
- lifestyle video
- ingredient motion graphics
- short campaign videos
- muted autoplay loops
- click-to-play sound where appropriate

Video requirements:

- responsive source
- poster image
- lazy loading
- mobile fallback
- captions where needed
- reduced-motion alternative
- compressed assets
- no blocking page load

Do not autoplay sound.

The supplied video references should be treated as style references for:

- pacing
- transitions
- lighting
- product reveal
- camera movement
- storytelling rhythm

Not as content to copy.

---

# 51. Responsive Design

The site must be designed for:

```text
Mobile
Small tablet
Tablet
Laptop
Desktop
Large desktop
```

Do not build desktop first and “make it responsive” afterward.

Every major section must have an intentional mobile composition.

Especially:

- hero
- navigation
- product gallery
- ingredient timeline
- product cards
- cart
- checkout
- admin dashboard

---

# 52. Mobile UX

Mobile is critical.

Requirements:

- thumb-friendly controls
- sticky add-to-cart where appropriate
- swipeable galleries
- bottom-sheet filters
- readable typography
- no horizontal overflow
- fast media loading
- compact navigation
- accessible forms

Do not simply shrink desktop layouts.

---

# 53. Performance

Target a fast production experience.

Priorities:

1. First contentful paint
2. Largest contentful paint
3. Interaction responsiveness
4. Cumulative layout stability

Techniques:

- Vite code splitting
- lazy routes
- image optimization
- WebP/AVIF where possible
- responsive image sizes
- lazy loading
- preload only critical assets
- avoid huge JavaScript bundles
- avoid unnecessary dependencies
- optimize video
- minimize layout shifts

Do not ship 10 MB hero videos as uncompressed assets.

---

# 54. SEO

Every indexable page needs:

```text
title
meta description
canonical
Open Graph
social image
structured data where applicable
```

Product pages:

- Product schema
- Offer
- AggregateRating only when valid
- Review schema only when valid

Collection pages:

- collection metadata
- canonical
- breadcrumbs

Site:

```text
robots.txt
sitemap.xml
favicon
manifest where useful
```

Also connect:

**Google Search Console**

Do not use deceptive SEO.

---

# 55. Accessibility

Target WCAG-conscious implementation.

Requirements:

- semantic HTML
- keyboard navigation
- focus states
- accessible labels
- alt text
- sufficient contrast
- screen-reader-friendly dialogs
- accessible forms
- error messages
- reduced motion
- no keyboard traps

Buttons must be buttons.

Links must be links.

Do not use clickable divs when semantic elements exist.

---

# 56. Error Handling

Every async operation needs:

```text
loading
success
error
empty
retry
```

Examples:

### Product loading

Skeleton.

### Product unavailable

Clear unavailable state.

### Cart failure

Explain and allow retry.

### Payment failure

Do not lose cart.

### Network failure

Useful message.

### Search no results

Offer alternatives.

---

# 57. Toasts / Notifications

Use for:

- added to cart
- removed
- coupon applied
- review submitted
- profile saved
- address saved

Do not use toast notifications for critical information that users need to read.

---

# 58. State Management

Use local React state where possible.

Use a small global state layer only where needed.

Potential choices:

- Zustand for cart/UI state
- TanStack Query for server state
- React Hook Form for complex forms
- Zod for validation

Do not introduce a state-management framework just because it is popular.

---

# 59. Data Fetching

Server data should not be duplicated unnecessarily.

Potential architecture:

```text
components
    ↓
features
    ↓
services
    ↓
Supabase
```

Example:

```text
src/services/products.ts
src/services/orders.ts
src/services/reviews.ts
src/services/coupons.ts
```

Keep database access out of random UI components.

---

# 60. Suggested Frontend Structure

```text
src/
├── assets/
├── components/
│   ├── ui/
│   ├── commerce/
│   ├── navigation/
│   ├── editorial/
│   └── forms/
├── features/
│   ├── auth/
│   ├── products/
│   ├── collections/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   ├── reviews/
│   ├── search/
│   └── admin/
├── layouts/
├── pages/
├── hooks/
├── lib/
├── services/
├── store/
├── types/
├── utils/
└── main.tsx
```

Feature logic should remain close to the feature.

---

# 61. Suggested Full Repository Structure

```text
project/
│
├── docs/
│   ├── vision.md
│   ├── architecture.md
│   ├── design-system.md
│   ├── pages.md
│   ├── database.md
│   ├── api.md
│   ├── ecommerce.md
│   ├── seo.md
│   ├── security.md
│   ├── devops.md
│   └── deployment.md
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── features/
│   ├── layouts/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── store/
│   ├── types/
│   └── utils/
│
├── supabase/
│   ├── migrations/
│   ├── functions/
│   └── seed/
│
├── .github/
│   └── workflows/
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── ...
```

---

# 62. Supabase Architecture

Supabase is the preferred backend platform for the initial production build.

Use:

- PostgreSQL
- Auth
- Storage
- Edge Functions
- Row Level Security

Potential database entities:

```text
profiles
roles
products
product_variants
categories
collections
product_images
product_videos
ingredients
product_ingredients
inventory
carts
cart_items
orders
order_items
addresses
reviews
coupons
coupon_redemptions
site_settings
faq_items
contact_messages
newsletter_subscribers
```

---

# 63. Database Principles

Database must be:

- normalized where appropriate
- indexed
- protected by RLS
- migration-controlled
- seeded for development
- free of business logic hidden in UI

Use migrations.

Never manually change production database structure without a migration.

---

# 64. Storage

Supabase Storage can initially hold:

```text
products/
products/gallery/
products/videos/
ingredients/
site/
reviews/
```

Use private buckets for sensitive/internal files.

Use public buckets only for assets intended to be public.

Optimize images before upload.

---

# 65. Environment Variables

Use:

```text
.env.local
.env.example
```

Never commit secrets.

Potential variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY

RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET

RESEND_API_KEY

SITE_URL
```

Only variables genuinely required in the browser should use the `VITE_` prefix.

Never expose server secrets with `VITE_`.

---

# 66. Git Strategy

Use:

```text
main
development
feature/*
```

Recommended flow:

```text
feature
   ↓
development
   ↓
testing
   ↓
main
   ↓
production
```

Do not directly build everything on `main`.

Commits should be meaningful:

```text
feat: add product detail page
feat: add cart drawer
fix: prevent duplicate checkout orders
chore: configure CI
```

---

# 67. CI/CD

GitHub Actions should eventually run:

```text
Install
↓
Lint
↓
Typecheck
↓
Unit tests
↓
Build
↓
Deployment
```

Pull requests should not be merged if required checks fail.

Production deployment should be connected to the production branch.

Preview deployments should be available for development/PR review where supported.

---

# 68. Hosting

Initial frontend hosting:

**Cloudflare Pages**

Architecture:

```text
Developer
   ↓
Git
   ↓
GitHub
   ↓
GitHub Actions / deployment
   ↓
Cloudflare Pages
   ↓
Production site
```

The frontend is a Vite-generated static application.

Backend functionality is handled through Supabase and server-side/Edge Functions.

---

# 69. Domain

The project should eventually use the brand's own domain.

The domain is expected to be a paid business expense even if the rest of the initial infrastructure remains on free tiers.

The domain must be configured with:

- HTTPS
- DNS
- production deployment
- email domain authentication where required
- canonical site URL

---

# 70. Email Domain

For production email, configure:

- SPF
- DKIM
- DMARC

through the email provider/domain DNS.

Do not rely permanently on development/test sender addresses.

---

# 71. Analytics

Initial analytics:

**Google Analytics 4**

Track:

```text
page_view
view_item
view_item_list
search
add_to_cart
remove_from_cart
view_cart
begin_checkout
add_payment_info
purchase
sign_up
login
newsletter_signup
```

Use ecommerce event conventions consistently.

Do not send sensitive personal data into analytics.

---

# 72. UX Analytics

Optional initial tool:

**Microsoft Clarity**

Useful for:

- session recordings
- heatmaps
- rage clicks
- dead clicks
- navigation problems

Use privacy-conscious configuration.

---

# 73. Monitoring

Production should eventually have:

- frontend error monitoring
- backend logs
- payment webhook logs
- failed email logs
- order failure visibility
- database monitoring

Start simple.

Do not over-engineer observability before there is real traffic.

---

# 74. Security Requirements

Minimum:

```text
HTTPS
Secure cookies where applicable
RLS
Role-based authorization
Server-side payment verification
Webhook signature validation
Input validation
Output sanitization
Rate limiting
CSRF-conscious architecture
No secrets in client bundle
Secure password handling through Supabase Auth
Admin protection
Audit-friendly order/payment records
```

Do not trust:

- price sent from client
- coupon result sent from client
- payment success sent from client
- user role sent from client
- inventory sent from client

All important values must be validated server-side.

---

# 75. Admin Security

Admin area must be treated as sensitive.

Requirements:

- authenticated admin
- role check
- protected routes
- database-level permissions
- no admin credentials stored in localStorage
- session handling
- audit-friendly actions

Potential future additions:

- 2FA
- audit logs
- admin activity history
- IP/security monitoring

---

# 76. Privacy

Customer data may include:

- name
- email
- phone
- address
- order history
- payment reference
- account information

Only collect what is needed.

Do not expose customer data through:

- public APIs
- client-side database queries
- analytics
- review endpoints
- search indexes

RLS is mandatory.

---

# 77. Free-First Infrastructure Strategy

The initial architecture should prioritize free tiers.

Target:

```text
React              Free
TypeScript         Free
Vite               Free
Tailwind           Free
Motion             Free
Lucide             Free
Git                Free
GitHub             Free tier
GitHub Actions     Free tier allowance
Supabase           Free tier
Cloudflare Pages   Free tier
Resend             Free tier
Google Analytics   Free
Microsoft Clarity  Free
```

Paid or usage-dependent:

```text
Domain
Razorpay payment transaction fees
Higher infrastructure usage
Paid email volume
Paid storage/CDN if scale requires it
Premium services only if justified later
```

Do not introduce paid services merely because they are convenient.

---

# 78. Initial Infrastructure Target

The first deployable version should be possible with:

```text
Frontend:
React + Vite + Tailwind

Backend:
Supabase

Database:
PostgreSQL

Storage:
Supabase Storage

Auth:
Supabase Auth

Payments:
Razorpay

Email:
Resend

Repository:
GitHub

CI/CD:
GitHub Actions

Hosting:
Cloudflare Pages

Analytics:
GA4 + optional Clarity
```

This is the preferred baseline.

---

# 79. What NOT to Use Initially

Do not add unless justified:

```text
Shopify
WooCommerce
AWS
DigitalOcean
Algolia
ElasticSearch
paid CMS
paid image CDN
paid analytics
paid UI kits
paid animation libraries
complex microservices
Kubernetes
Redis
Kafka
```

The first version should be a clean modular application, not an enterprise architecture exercise.

---

# 80. Scalability

The architecture should allow later migration/expansion.

Potential future additions:

```text
CDN media storage
advanced search
warehouse integration
shipping API
WhatsApp notifications
subscriptions
loyalty
referrals
affiliate system
abandoned cart emails
marketing automation
CRM
ERP
marketplace synchronization
multi-language
multi-currency
international shipping
```

Do not build these now unless required.

Build the foundation so they can be added later.

---

# 81. Shipping Architecture

Initial shipping can be simple:

```text
shipping zones
shipping fee
free shipping threshold
estimated delivery
```

Later:

```text
Shiprocket
Delhivery
Blue Dart
DTDC
other carrier APIs
```

Only integrate a carrier when the actual fulfillment process is known.

---

# 82. Notifications

Potential channels:

```text
Email
WhatsApp
SMS
```

Initial:

**Email**

Later, WhatsApp/SMS can be added based on cost and business need.

---

# 83. Newsletter

Newsletter component:

```text
email
consent
created_at
source
```

Must not automatically subscribe customers without appropriate consent.

---

# 84. Content Management

Do not create a full CMS initially.

Site content can be structured through:

- Supabase tables
- site settings
- product records
- FAQ records
- editorial content configuration

A CMS can be introduced later if content publishing becomes frequent.

---

# 85. Site Settings

Create a configurable site settings layer.

Potential settings:

```text
brand_name
logo
support_email
support_phone
announcement_text
shipping_message
social_links
footer_content
default_seo_title
default_seo_description
```

Avoid hard-coded global business information.

---

# 86. Loading States

Every major data-driven page needs skeletons.

Examples:

```text
ProductCardSkeleton
ProductPageSkeleton
CollectionSkeleton
ReviewSkeleton
OrderSkeleton
```

Avoid blank screens.

---

# 87. Empty States

Examples:

```text
No search results
Empty collection
Empty cart
No orders
No reviews
No wishlist
No addresses
```

Every empty state should tell the user what to do next.

---

# 88. Error Pages

Create:

```text
404
500
Network error
Payment error
Checkout error
```

The visual language should remain consistent with the brand.

---

# 89. Accessibility for Commerce

Special attention to:

- quantity controls
- product image galleries
- cart drawers
- checkout forms
- payment buttons
- filters
- modals
- accordions
- mobile menus

Keyboard users must be able to complete the purchase journey.

---

# 90. Performance Budget Philosophy

Before adding a library ask:

> Does this materially improve the product?

Before adding a large image/video ask:

> Is this asset worth the performance cost?

Before adding an animation ask:

> Does this improve storytelling or merely look cool?

The site should feel fast.

---

# 91. Testing Strategy

Minimum:

### Unit

- price calculations
- coupon logic
- cart calculations
- validation
- utility functions

### Integration

- add to cart
- checkout creation
- payment verification
- order creation
- review submission

### E2E

Critical customer flow:

```text
Landing
→ Product
→ Add to cart
→ Checkout
→ Payment
→ Confirmation
```

Also:

```text
Login
→ Account
→ Orders
```

Admin:

```text
Login
→ Product
→ Edit
→ Save
```

---

# 92. Quality Assurance Checklist

Before production:

```text
All routes work
All links work
Mobile works
Desktop works
Forms validate
Cart works
Coupons work
Payment verification works
Order creation works
Emails work
Admin works
RLS works
No secrets exposed
SEO metadata exists
Sitemap works
robots works
404 works
Loading states exist
Error states exist
Accessibility checked
Performance checked
Analytics checked
Legal pages exist
Product claims approved
```

---

# 93. Development Phases

## Phase 0 — Foundation

Set up:

- Vite
- React
- TypeScript
- Tailwind
- ESLint
- Prettier if desired
- Git
- GitHub
- folder structure
- docs

No major UI yet.

---

## Phase 1 — Brand & Design System

Define:

- colors
- typography
- spacing
- buttons
- cards
- navigation
- product imagery
- motion rules
- responsive rules

Build the visual foundation.

---

## Phase 2 — Homepage

Build the complete storytelling homepage.

Focus heavily on:

- first impression
- hero
- story
- product introduction
- ingredients
- lifestyle
- trust
- CTA

This phase should establish the brand.

---

## Phase 3 — Storefront

Build:

- shop
- collections
- search
- product cards
- filters
- sorting

---

## Phase 4 — Product System

Build:

- product detail page
- gallery
- variants
- pricing
- ingredients
- directions
- reviews
- related products

---

## Phase 5 — Cart & Checkout

Build:

- cart
- cart drawer
- checkout
- address
- order summary
- coupon
- payment preparation

---

## Phase 6 — Supabase

Connect:

- database
- Auth
- Storage
- RLS
- migrations
- seed data

---

## Phase 7 — Payments

Integrate Razorpay.

Implement:

- order creation
- payment verification
- webhook
- failed payments
- successful payments
- duplicate prevention

---

## Phase 8 — Customer Accounts

Build:

- login
- registration
- profile
- addresses
- orders
- order details

---

## Phase 9 — Admin

Build:

- dashboard
- products
- inventory
- orders
- customers
- reviews
- coupons
- settings

---

## Phase 10 — Emails

Connect Resend.

Implement transactional emails.

---

## Phase 11 — SEO / Analytics / Compliance

Implement:

- metadata
- schema
- sitemap
- robots
- Search Console
- analytics
- legal pages
- approved product content

---

## Phase 12 — QA

Test:

- mobile
- desktop
- checkout
- payment
- account
- admin
- accessibility
- security
- performance

---

## Phase 13 — DevOps

Set up:

- GitHub Actions
- CI
- preview deployment
- production deployment
- environment variables
- domain
- DNS
- email DNS

---

## Phase 14 — Production

Final:

```text
Build
↓
Test
↓
Security review
↓
Content review
↓
Payment test
↓
Production deploy
↓
Smoke test
↓
Monitor
```

---

# 94. Antigravity Development Rules

Antigravity must treat this document as the project's source of truth.

Before implementing a feature:

1. Understand the existing architecture.
2. Check whether a reusable component already exists.
3. Avoid duplicating logic.
4. Follow the design system.
5. Follow the database model.
6. Follow security rules.
7. Keep business logic out of presentation components.
8. Keep secrets out of client code.
9. Test critical flows.
10. Do not silently change requirements.

---

# 95. Antigravity Must NOT

Do not:

- create a generic template store
- copy the reference site's branding
- copy text from the reference site
- invent reviews
- invent certifications
- invent customer statistics
- invent medical claims
- hard-code product data into components
- expose secrets
- skip mobile design
- skip error states
- skip loading states
- create fake checkout success
- trust client-side payment success
- bypass RLS
- use mock data in production
- leave placeholder text in production
- leave broken routes
- install unnecessary dependencies
- over-engineer the application
- add random animations
- use low-quality imagery
- distort product packaging
- create a visually impressive but functionally incomplete website

---

# 96. Reference Site vs Our Site

| Area | Reference | Our Approach |
|---|---|---|
| Commerce structure | Reference | Learn from it |
| Product browsing | Reference | Replicate conceptually |
| Collections | Reference | Keep |
| Product page | Reference | Improve + brand |
| Cart | Reference | Keep/improve |
| Reviews | Reference | Keep |
| FAQ | Reference | Keep |
| Policies | Reference | Keep |
| Homepage | Reference | Reimagine |
| Brand identity | Reference | Completely original |
| Storytelling | Reference | Completely original |
| Photography | Reference | Original |
| Copy | Reference | Original |
| Animations | Reference | Original |
| Product content | Reference | Our approved content |
| Backend | Reference | Our architecture |
| Admin | Reference | Our system |
| DevOps | Reference | Our production pipeline |

---

# 97. The Most Important Design Principle

Do not let the website become:

> “A product catalog with a fancy hero.”

The experience should instead be:

> “A brand story that naturally leads into commerce.”

A visitor should be able to browse quickly if they already know what they want, while someone discovering the brand should receive enough context to understand the product.

---

# 98. Product Page Philosophy

The product page should answer questions in the natural order a customer has them:

```text
What is it?
↓
Is it for me?
↓
What is inside?
↓
How do I use it?
↓
Why should I trust it?
↓
What does it cost?
↓
How will I receive it?
↓
What do other customers say?
↓
Can I buy it now?
```

The page should not feel like a giant wall of marketing copy.

Use visual hierarchy.

---

# 99. Content Philosophy

Copy should be:

- concise
- confident
- clear
- human
- specific
- transparent
- evidence-aware

Avoid:

- exaggerated superlatives
- empty buzzwords
- fake scientific language
- generic AI copy
- repeated “100% natural” claims unless factually supported
- unsupported “clinically proven” language
- guaranteed outcomes

Every statement should have a reason to exist.

---

# 100. Brand Trust Philosophy

For a supplement brand, trust is more important than visual spectacle.

The site should make customers feel:

> “I can see what this is, what is inside it, how it is made/marketed, how to use it, what the company says, and how to contact them.”

Transparency beats hype.

---

# 101. Conversion Philosophy

Conversion does not mean aggressive selling everywhere.

Use:

- clear CTA
- clear price
- clear pack options
- clear benefits/positioning
- trust information
- social proof
- shipping clarity
- frictionless checkout

Avoid:

- constant popup attacks
- fake urgency
- fake countdown timers
- misleading discounts
- hidden shipping fees
- manipulative checkout patterns

---

# 102. Accessibility + Performance + Conversion

These are not competing goals.

A fast, accessible, readable site usually produces a better commerce experience.

Do not sacrifice:

```text
speed
clarity
accessibility
trust
```

for decorative effects.

---

# 103. Future Product Expansion

The architecture must not assume that only one product will ever exist.

Support multiple products and categories.

Possible future structure:

```text
Men's Wellness
Daily Vitality
Energy
Performance
General Wellness
Herbal Formulations
```

Actual categories should be based on the real catalog.

---

# 104. Multi-Product Homepage

When more products exist, homepage can evolve into:

```text
Hero brand story
↓
Featured product
↓
Shop by goal
↓
Formula philosophy
↓
Best sellers
↓
Ingredient world
↓
Lifestyle
↓
Reviews
↓
Collection
↓
Brand story
```

---

# 105. Admin Content Principle

If business users need to change something regularly, do not hard-code it.

Examples:

```text
price
stock
announcement
product name
product images
FAQ
coupon
shipping threshold
product description
SEO title
SEO description
```

These should be data/config driven.

---

# 106. Database-First Commerce Principle

The UI should represent the database state.

Example:

```text
Database says stock = 0
→ UI says Out of stock

Database says coupon expired
→ UI rejects coupon

Database says payment failed
→ order is not marked paid

Database says review pending
→ review is not public
```

Never make UI assumptions that contradict backend truth.

---

# 107. Payment Safety Principle

Payment is the most sensitive commerce flow.

Never:

```text
Frontend says success
→ automatically mark order paid
```

Instead:

```text
Frontend initiates payment
→ provider processes payment
→ server verifies
→ webhook confirms
→ database updates
→ customer notified
```

Idempotency and duplicate webhook handling must be considered.

---

# 108. Production Environment

Separate:

```text
development
staging/preview
production
```

Do not use production payment credentials locally.

Use test Razorpay credentials during development.

---

# 109. Backup Philosophy

Database and critical configuration should be recoverable.

At minimum:

- migrations in Git
- seed scripts
- environment documentation
- exported critical business data where appropriate
- storage organization

Do not depend on manually configured dashboards that nobody documented.

---

# 110. Documentation

The project should remain understandable after the original developer leaves.

Maintain:

```text
README
architecture
database
deployment
environment variables
payment setup
email setup
admin setup
```

The `docs/` folder should remain useful throughout the project.

---

# 111. Definition of Done — Frontend

A frontend feature is done only when:

- desktop works
- mobile works
- loading state exists
- error state exists
- empty state exists where applicable
- keyboard interaction works
- design system is followed
- no console errors
- no TypeScript errors
- no broken links
- no obvious layout shift
- responsive behavior is intentional

---

# 112. Definition of Done — Backend

Backend feature is done only when:

- schema exists
- migration exists
- RLS is considered
- validation exists
- authorization exists
- error handling exists
- duplicate operations are handled
- secrets are protected
- frontend cannot bypass critical rules

---

# 113. Definition of Done — Commerce

Commerce is done only when:

```text
Product
→ Cart
→ Checkout
→ Payment
→ Verification
→ Order
→ Email
→ Admin
```

works end-to-end.

---

# 114. Definition of Done — Production

Production is done only when:

- domain works
- HTTPS works
- production environment works
- payment production flow tested
- email works
- database works
- RLS verified
- admin works
- analytics works
- SEO works
- sitemap works
- policies exist
- mobile QA completed
- desktop QA completed
- performance reviewed
- no critical console errors
- no secrets exposed

---

# 115. Visual Reference Files

The following supplied files are part of the current visual/product reference set:

```text
testo booster label.png
WhatsApp Image 2026-08-06 at 11.07.19 PM.jpeg
testo image (4).png
Gemini_Generated_Image_khogpwkhogpwkhog.png
Gemini_Generated_Image_yoi8x4yoi8x4yoi8.png
Gemini_Generated_Image_m7e5ujm7e5ujm7e5.png
Gemini_Generated_Image_5r3c9i5r3c9i5r3c.png
testo ingredients (1).png
testo ingredients (2).png
testo ingredients (3).png
```

Use these as:

- packaging reference
- product photography reference
- lifestyle art-direction reference
- ingredient presentation reference
- campaign composition reference
- usage/benefit information reference

They are not automatically approved final website assets.

---

# 116. Video References

Video references supplied separately should be analyzed for:

```text
camera movement
lighting
pacing
product reveal
transitions
composition
typography integration
sound strategy
loop behavior
mobile cropping
```

Do not directly copy another creator's video.

Use the references to establish the desired emotional and cinematic direction.

---

# 117. Final Creative Direction

The final site should sit somewhere between:

```text
Premium wellness brand
+
Modern editorial website
+
Cinematic product campaign
+
High-converting DTC store
```

It should NOT feel like:

```text
Generic Ayurveda website
Marketplace listing
Cheap supplement store
Template Shopify theme
Medical portal
Overly clinical pharmaceutical site
Over-animated design experiment
```

---

# 118. The Emotional Goal

When a visitor enters the site, the desired reaction is:

> “I immediately understand what this brand is about.”

Then:

> “This looks like a serious product.”

Then:

> “I want to understand what's inside.”

Then:

> “I trust what I'm seeing.”

Then:

> “I want to try it.”

That progression is more important than any individual animation.

---

# 119. Implementation Priority

When there is a conflict between priorities, use this order:

```text
1. Safety / legal correctness
2. Functional correctness
3. Customer trust
4. Usability
5. Performance
6. Accessibility
7. Brand/storytelling
8. Visual polish
9. Decorative effects
```

A beautiful broken checkout is still a broken website.

---

# 120. Final Instruction to Antigravity

Build this project as a real production application.

Do not treat it as a static frontend demo.

Do not stop after producing the homepage.

The final target is:

```text
Brand experience
+
Full storefront
+
Product system
+
Cart
+
Checkout
+
Payments
+
Customer accounts
+
Orders
+
Reviews
+
Inventory
+
Admin
+
Email
+
SEO
+
Analytics
+
Security
+
Testing
+
CI/CD
+
Production deployment
```

The reference store establishes the minimum expected breadth of the commerce experience.

The supplied product imagery establishes the current creative direction.

The brand story and final visual identity must remain original.

The architecture must be maintainable.

The application must be secure.

The product content must be truthful and approved.

The final result must be deployable and usable by a real business.

---

# 121. Final Project North Star

**Build a wellness brand experience, not merely a supplement store.**

The website should tell a story first, make the product understandable second, build trust third, and make purchasing effortless throughout.

The visitor should never wonder:

> “What is this website selling?”

And the customer should never wonder:

> “Can I trust this checkout?”

Everything from the first visual frame to the final order confirmation should feel like one coherent brand experience.

