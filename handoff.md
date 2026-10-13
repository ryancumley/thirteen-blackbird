# Handoff: AI Sales Voice landing page → Astro

Build a single-page marketing site in Astro from the approved design mockup. The design is a dark, editorial look borrowed from routtplutonic.com (the owner's other business). All copy, tokens and structure are below. A reference export of the mockup (`Main.dc.html`) ships alongside this file; treat it as the visual source of truth.

## Goals

- Static Astro site, no client framework. Ship zero JS unless a feature below needs it.
- Pixel-close to the mockup at 1440px wide; works down to 360px.
- Lighthouse 95+ on Performance, Accessibility, Best Practices, SEO.
- Easy to swap placeholders: company name, contact details, prices, photos.

## Placeholders still open

| Placeholder | Where | Notes |
| --- | --- | --- |
| `[Your company]` | Nav logo, footer, `<title>` | Business name not chosen yet |
| `[Your name]`, `[email]`, `[phone]` | Contact section | Booking button is a `mailto:` for now |
| `[website]` | Footer | |
| `[Competitor]` | Hero question card | Keep literal brackets |
| Prices | Packages | $7,500 / $30,000 / $3,500 per month are draft numbers |
| 3 photos | Problem, How it works, Contact | Golden retriever puppy stand-ins (see Assets) |

Put every placeholder in one config file (`src/config/site.ts`) so they can be changed in one place.

## Design tokens

Taken from routtplutonic.com's `:root`. Define them as CSS custom properties in a global stylesheet.

```css
:root {
  --ground: #1b1e21;        /* page background */
  --ground-deep: #171a1d;   /* alternating section band */
  --panel: #20252a;         /* cards, table header, contact band */
  --rule: #2e3338;          /* hairlines, section borders */
  --rule-frame: #333a40;    /* card borders */
  --rule-button: #57606a;   /* ghost button border */
  --text: #ece7df;          /* headings, primary text */
  --text-body: #cfc9bf;     /* paragraphs */
  --text-muted: #a39d93;    /* secondary text */
  --text-label: #8b939b;    /* mono labels on cards */
  --clay: #b5563a;          /* primary button fill, highlight borders */
  --clay-hover: #c4623f;
  --clay-light: #e08a6c;    /* eyebrows, italic accent phrases, links */
  --clay-lighter: #f0a88e;  /* link hover */
  --display: "DM Serif Display", serif;
  --serif: "Source Serif 4", Georgia, serif;
  --mono: "JetBrains Mono", monospace;
}
```

### Typography

Load from Google Fonts (or self-host with `@fontsource`): DM Serif Display (regular + italic), Source Serif 4 (400, 600, 400 italic), JetBrains Mono (400, 500).

| Role | Font | Size / line-height | Other |
| --- | --- | --- | --- |
| H1 | display | 72px / 0.98 | letter-spacing -0.01em; scale down to ~44px on phones (`clamp`) |
| H2 | display | 48px / 1 | contact H2 is 56px; ~34px on phones |
| H3 | display | 26–30px / 1.1 | |
| Big price | display | 52px / 1 | |
| Body | serif | 17px / 1.5 | lede 20–21px |
| Eyebrow | mono | 13px | uppercase, letter-spacing 0.18em, `--clay-light` |
| Card label / caption | mono | 12px | uppercase, letter-spacing 0.14–0.16em, `--text-label` |

**Signature move:** every H1/H2 ends with an italic phrase in `--clay-light`, e.g. `Your buyers ask AI. <em>Teach it what your best rep knows.</em>`. Make this a prop on a heading component (`accent="…"`).

### Other styles

- Square corners everywhere (no border-radius).
- Buttons: primary = `--clay` fill, white text, hover `--clay-hover`; ghost = 1px `--rule-button` border, `--text` text, hover border `--text-muted`. Min height 44px (hero buttons 52px).
- Content container: `max-width: 1200px`, side padding 40px (24px on phones), section vertical padding 104–112px (64px on phones).
- Sections alternate `--ground` and `--ground-deep` with 1px `--rule` top/bottom borders.
- Cards: `--panel` background, 1px `--rule-frame` border, 28–36px padding.

## Page structure and copy

Use semantic sections with `id`s for in-page nav. Copy below is final unless marked as a placeholder.

### 1. Header / nav
- Logo text: `[Your company]` (display, 26px) linking to `#top`.
- Links: How it works (`#how`), What you get (`#get`), Packages (`#packages`).
- Primary button: "Book a call" → `#contact`.
- Bottom border 1px `--rule`. Wraps on small screens (no hamburger needed).

### 2. Hero (`#top`, ground)
Two columns (text ~60%, card ~40%), stacking on mobile.
- Eyebrow: "AEO from your sales floor"
- H1: "Your buyers ask AI." + accent "Teach it what your best rep knows."
- Lede: "We interview your top salespeople and turn what they say on calls into content ChatGPT, Perplexity and Gemini can find, trust and repeat."
- Buttons: primary "Get a free AI check" → `#contact`; ghost "See packages" → `#packages`.
- Side card (`--panel`), label: "What buyers ask AI · what your site never says". Four quoted questions separated by hairlines (19px):
  - "How do you compare to [Competitor]?"
  - "Who is this *not* a fit for?" (italic clay "not")
  - "Why does it cost what it costs?"
  - "What goes wrong in implementation?"
- Card footnote (muted, 15px): "Your reps answer these every day. AI tools can't, until it's written down."

### 3. The problem (ground-deep)
Two columns.
- Left: eyebrow "The problem"; H2 "AI only knows what's public." + accent "Your best answers aren't."; then **Photo 1** (4:3, full column width) with caption "Placeholder · a rep mid-call, explaining what the website doesn't".
- Right, 20px body:
  - "Buyers now ask AI assistants which vendor to choose. Those tools build answers from public pages, and your website rarely says what your best rep says on a call."
  - "Most AEO tools monitor AI answers and rewrite the content you already have. They can't add knowledge that was never written down."

### 4. How it works (`#how`, ground)
- Eyebrow "How it works"; H2 "One set of interviews." + accent "Every AI channel."
- Three numbered steps (`<ol>`, 3-column grid, each with a 2px `--clay` top border, mono number in clay):
  1. **01 · Interview your reps** — "Recorded 60-minute calls with your top sellers: objections, competitive wins, pricing logic, who is and isn't a fit."
  2. **02 · Build the knowledge base** — "Every answer organized by question, buyer type and competitor, then approved by your team before anything goes live."
  3. **03 · Deliver it everywhere** — "The same approved knowledge reaches public AI answers, buyers' AI apps, your chatbot and your reps."
- Three channel cards (`--panel`):
  - Label "Channel · Public AI answers" / title "Answer pages" / "Specific, factual pages that ChatGPT, Perplexity and Google AI can crawl and cite."
  - Label "Channel · Buyers' AI tools" / title "Your own AI app" / "An MCP server and ChatGPT / Claude app that answers straight from your knowledge base."
  - Label "Channel · Your team" / title "Chatbot + rep tools" / "Your site chatbot and your reps' AI assistants say exactly what your best rep would."
- Row: **Photo 2** (16:9, ~55%) with caption "Placeholder · an interview in progress, or a real answer page", beside italic 20px text "Ongoing: gaps we find in AI answers become next month's interview questions."

### 5. What you get (`#get`, ground-deep)
- Eyebrow "What you get"; H2 "Five deliverables." + accent "Zero homework for marketing."
- Grid of five items (auto-fit, min 340px), each with a 1px top rule, H3 + paragraph:
  - **Sales knowledge base** — "Every interview answer, organized by question, buyer type and competitor, approved by your team."
  - **Public answer pages** — "Comparisons, pricing logic, fit and implementation pages, with structured data AI crawlers can read."
  - **Your own AI connector** — "An MCP server and ChatGPT / Claude app, listed in the public app directories."
  - **Internal reuse** — "The same knowledge in your website chatbot and your reps' AI tools, so every channel says the same thing."
  - **AI visibility report** — "How often and how favorably AI assistants mention you, before and after."

### 6. Why it's different (ground)
- Eyebrow "Why it's different"; H2 "Not another dashboard." + accent "New knowledge, delivered."
- Real `<table>` inside an `overflow-x: auto` wrapper (min-width 640px). Header row on `--panel` in mono labels; the "This service" header in `--clay-light`. Row headers use `<th scope="row">`; the "typical" column is muted, "this service" column is `--text`.

| | Typical AEO / GEO tool | This service |
| --- | --- | --- |
| Source material | Your existing website | New knowledge from your sales team |
| Output | Dashboards and rewrite suggestions | Published pages plus your own AI connector |
| Who does the work | Your marketing team | We interview, write and publish |
| Reach | Public AI answers only | Public AI answers, AI apps, your chatbot and your reps |

### 7. Packages (`#packages`, ground-deep)
- Eyebrow "Packages"; H2 "Start small." + accent "Prove it, then scale."
- Three equal-height cards; the middle one has a 2px `--clay` border and a primary button, the others ghost buttons. All buttons → `#contact`.

| Card | Label | Price | Sub-line | Bullets | Button |
| --- | --- | --- | --- | --- | --- |
| Pilot | Pilot · 3 weeks | $7,500 | one-time · credited toward Launch within 60 days | 5 rep interviews; 15 answer pages; AI visibility baseline | Start a pilot |
| Launch (featured) | Launch · 6–8 weeks | $30,000 | one-time | 12 rep interviews; 40 answer pages; MCP server + ChatGPT / Claude app; App directory listings; Website chatbot hookup | Plan a launch |
| Ongoing | Ongoing · 6-month minimum | $3,500/mo | after Launch | 2 interviews a month; 8 new or refreshed pages a month; Connector upkeep; Monthly visibility report | Talk about ongoing |

Drive the cards from a data array in `site.ts` so prices are easy to change.

### 8. How we measure it (ground)
Two columns.
- Left: eyebrow "How we measure it"; H2 "Before and after," + accent "in AI's own words."
- Right: `<ol>` with mono clay numbers and hairlines between items (19px):
  1. Share of AI answers that mention you, across your 25 most important buyer questions
  2. Citations of your new pages in ChatGPT, Perplexity and Google AI answers
  3. Visitors and leads arriving from AI tools
  4. Questions your AI connector and chatbot answer each month

### 9. Contact / CTA (`#contact`, panel background)
Three parts in a wrapping row: **Photo 3** (220×220 square) with caption "Placeholder · your headshot"; text block; button block.
- H2 (56px): "Find out what AI says about you." + accent "Free."
- Body: "On a 30-minute call we'll check what AI assistants say about you today and pick the five questions your Pilot should answer first."
- Primary button "Book a 30-minute call" (`mailto:` placeholder for now; easy to swap for a Calendly/Cal.com link via config).
- Under it, muted and centered: "[Your name] · [email] · [phone]".

### 10. Footer
Logo text `[Your company]` (display, 18px) left; "Front Range, Colorado · [website]" right, 14px `--text-label`. 1px top rule.

## Assets

Three placeholder photos, all free under the Unsplash License. Download full-resolution versions (the copies in the mockup are low-res browser captures) and run them through Astro's `<Image>` / `astro:assets` for responsive WebP/AVIF.

| Slot | Unsplash photo | Final image needed |
| --- | --- | --- |
| Photo 1 (Problem, 4:3) | https://unsplash.com/photos/1611250282006-4484dd3fba6b (puppy, blue collar) | A rep on a sales call |
| Photo 2 (How it works, 16:9) | https://unsplash.com/photos/1583160247711-2191776b4b91 (puppy in daisies) | An interview in progress, or a real answer page |
| Photo 3 (Contact, 1:1) | https://unsplash.com/photos/1760615303284-64a42fac2e98 (puppy sleeping on floor) | Founder headshot |

If those page URLs don't resolve, the direct image URLs are `https://images.unsplash.com/photo-<id>?w=1600&q=80`. All photos get a 1px `--rule-frame` border and a mono uppercase caption underneath. Alt text should describe the actual photo (e.g. "Golden retriever puppy with a blue collar") until real images replace them.

## Suggested Astro structure

```
src/
  config/site.ts          # placeholders, contact info, packages data, nav links
  styles/global.css       # tokens, base type, buttons, container
  layouts/Base.astro      # <head>, fonts, meta/OG tags, header + footer
  components/
    Header.astro
    Eyebrow.astro
    SectionHeading.astro  # props: text, accent, level, size
    Button.astro          # props: href, variant: primary|ghost
    QuestionCard.astro
    Steps.astro
    ChannelCard.astro
    FeatureGrid.astro
    CompareTable.astro
    PackageCard.astro
    MeasureList.astro
    PlaceholderFigure.astro  # image + mono caption
    ContactCTA.astro
    Footer.astro
  pages/index.astro
  assets/photos/          # downloaded Unsplash images
```

Use plain CSS (scoped `<style>` in components plus `global.css`); no Tailwind needed. Layout is flexbox/grid with `flex-wrap` and `repeat(auto-fit, minmax(...))`, matching the mockup.

## SEO and AEO (practice what we preach)

This site sells AI visibility, so it should be a good example:
- Real `<title>`, meta description and Open Graph tags from `site.ts`.
- JSON-LD: `Organization` (or `ProfessionalService`) plus `Service` entries for the three packages with prices, and an `FAQPage` if FAQ content is added later.
- Generate `sitemap.xml` (`@astrojs/sitemap`), a `robots.txt` that allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended), and an `/llms.txt` summarizing the offer.
- Server-rendered HTML only; nothing important behind JavaScript.

## Accessibility

- One H1; headings in order. `<nav aria-label="Main">`.
- Text contrast is 4.5:1 or better on all grounds; keep `--text-label` (#8b939b) for labels only, not body copy.
- Visible focus styles on links and buttons (2px `--clay-light` outline, offset 2px).
- Respect `prefers-reduced-motion` if any motion is added (none is planned).

## Acceptance checklist

- [ ] All ten sections present with the copy above, in order
- [ ] Tokens, fonts and italic clay accents match the mockup
- [ ] In-page nav links scroll to the right sections
- [ ] Layout holds at 1440, 1024, 768 and 375px with no horizontal scroll (except the comparison table's own scroll box)
- [ ] Placeholders and package data live in `src/config/site.ts`
- [ ] Photos optimized via `astro:assets`, with captions and alt text
- [ ] JSON-LD, sitemap, robots.txt and llms.txt in place
- [ ] Lighthouse 95+ across the board
