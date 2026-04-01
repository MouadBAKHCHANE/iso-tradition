# Sanity CMS + Next.js Integration Guide

A complete, step-by-step developer playbook for integrating **Sanity v3** (headless CMS) with a **Next.js 14 App Router** frontend. Covers every pattern used in production — from basic setup to dynamic page builders, marketing analytics, theme control, SEO, and email handling.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites](#2-prerequisites)
3. [Project Setup & Dependencies](#3-project-setup--dependencies)
4. [Sanity Configuration](#4-sanity-configuration)
5. [Schema Architecture](#5-schema-architecture)
6. [Reusable Schema Helpers](#6-reusable-schema-helpers)
7. [Dynamic Section Ordering (Page Builder)](#7-dynamic-section-ordering-page-builder)
8. [Marketing & Analytics Settings](#8-marketing--analytics-settings)
   - 8.2 [Full Pixel Implementations](#82-full-pixel-implementations-frontend-components) (Facebook, TikTok, LinkedIn, GTM)
   - 8.3 [Conversion Tracking Events](#83-conversion-tracking-events-for-cta-clicks-form-submissions)
   - 8.4 [Assembling All Tracking in Layout](#84-assembling-all-tracking-in-layout)
   - 8.5 [GROQ Query for Marketing Settings](#85-groq-query-for-marketing-settings)
   - 8B. [Per-Page SEO Schema (Reusable)](#8b-per-page-seo-schema-reusable)
   - 8B.4 [Blog Post SEO Schema](#8b4-blog-post-seo-schema)
   - 8B.5 [Blog Post JSON-LD + Metadata](#8b5-blog-post-json-ld--metadata-frontend)
   - 8B.6 [Product Page SEO + JSON-LD](#8b6-product-page-seo--json-ld)
9. [Theme Settings (CMS-Controlled Design)](#9-theme-settings-cms-controlled-design)
10. [Legal Pages Pattern](#10-legal-pages-pattern)
11. [Client Setup & Image Builder](#11-client-setup--image-builder)
12. [GROQ Queries](#12-groq-queries)
13. [Embedding Sanity Studio in Next.js](#13-embedding-sanity-studio-in-nextjs)
14. [Desk Structure Customization](#14-desk-structure-customization)
15. [Frontend Data Consumption](#15-frontend-data-consumption)
16. [Image Handling](#16-image-handling)
17. [On-Demand Revalidation (ISR)](#17-on-demand-revalidation-isr)
18. [Contact Form & Email (Nodemailer)](#18-contact-form--email-nodemailer)
19. [SEO — Metadata & JSON-LD](#19-seo--metadata--json-ld)
20. [Seed Scripts](#20-seed-scripts)
21. [Deployment Checklist](#21-deployment-checklist)
22. [Common Patterns & Tips](#22-common-patterns--tips)
23. [Complete File Structure](#23-complete-file-structure)
24. [Troubleshooting](#24-troubleshooting)

---

## 1. Architecture Overview

```
┌─────────────────┐       GROQ over HTTPS        ┌──────────────────┐
│   Next.js App   │  ◄──────────────────────────► │  Sanity Content  │
│  (App Router)   │                               │     Lake         │
│                 │       Webhook (POST)           │                  │
│  /api/revalidate│  ◄─────────────────────────── │  (on publish)    │
│                 │                               │                  │
│  /api/contact   │  ── Nodemailer / SMTP ──────► │  Mailbox         │
│                 │                               │                  │
│  /studio (embed)│  ── Sanity Studio UI ──────►  │                  │
└─────────────────┘                               └──────────────────┘
```

**How it works:**
- Content is stored in Sanity's hosted **Content Lake** (no self-hosted DB)
- The Next.js app fetches data at build/request time via **GROQ queries**
- Sanity Studio is embedded as a route in your Next.js app (`/studio`)
- On content publish, a **webhook** hits your `/api/revalidate` endpoint to refresh pages (ISR)
- Images are served from `cdn.sanity.io` with on-the-fly transforms
- Contact form submissions are sent via **Nodemailer** through any SMTP provider

---

## 2. Prerequisites

- **Node.js** ≥ 18
- **npm**, **pnpm**, or **yarn**
- A **Sanity account** — sign up at [sanity.io](https://www.sanity.io/)
- A **Sanity project** — create one at [sanity.io/manage](https://www.sanity.io/manage) or via CLI:
  ```bash
  npx sanity init
  ```
  This gives you a **Project ID** and **Dataset** (usually `production`).
- An **API token** with Editor or higher permissions (for seed scripts and webhooks):
  → Sanity Dashboard → Project → API → Tokens → Add API Token
- An **SMTP email account** (for contact form — e.g., Infomaniak, Gmail, SendGrid)

---

## 3. Project Setup & Dependencies

### 3.1 Install packages

```bash
# Core Sanity packages
npm install sanity next-sanity @sanity/client @sanity/image-url

# Studio UI & types (needed for custom desk structure and schema helpers)
npm install @sanity/icons @sanity/ui @sanity/types

# Peer dependency required by Sanity (may cause build errors if missing)
npm install react-is

# Email handling (for contact form API route)
npm install nodemailer
npm install -D @types/nodemailer

# Styled components (used by Sanity Studio internals)
npm install styled-components
```

| Package | Purpose |
|---------|---------|
| `sanity` | Sanity Studio core (v3) |
| `next-sanity` | Next.js integration helpers (NextStudio, visual editing) |
| `@sanity/client` | GROQ query client for fetching data |
| `@sanity/image-url` | URL builder for responsive image transforms |
| `@sanity/icons` | Icons for schema/desk customization |
| `@sanity/ui` | UI components for Studio custom inputs |
| `@sanity/types` | TypeScript definitions for Sanity schemas |
| `react-is` | Peer dependency required by Sanity — **install explicitly to avoid build errors** |
| `styled-components` | Required by Sanity Studio UI rendering |
| `nodemailer` | SMTP email transport for contact forms |

> **Common build error:** `Module not found: Can't resolve 'react-is'` — this happens because Sanity depends on it as a peer dependency. Always install it explicitly.

### 3.2 Environment variables

Create `.env.local` at project root:

```env
# ── Sanity ──
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SANITY_REVALIDATE_SECRET=any_random_secret_string

# ── SMTP (contact form) ──
SMTP_HOST=mail.infomaniak.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@yourdomain.com
SMTP_PASS=your_smtp_password
```

> **`NEXT_PUBLIC_`** prefix = exposed to browser (needed for embedded Studio).
> **Without prefix** = server-only (tokens, secrets — never leak these).
> **SMTP vars** must also be added to your hosting platform (Vercel, etc.) — `.env.local` is git-ignored and never deployed.

### 3.3 Next.js config — image CDN + security headers

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:all*(webp|avif|woff2|woff|ttf|png)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}
module.exports = nextConfig
```

---

## 4. Sanity Configuration

### 4.1 Studio config

```ts
// sanity.config.ts (project root)
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'my-project',
  title: 'My Project',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio',  // URL where Studio is mounted

  plugins: [
    structureTool(),     // Default desk structure (customize later — see Section 14)
  ],

  schema: {
    types: schemaTypes,
  },
})
```

### 4.2 CLI config

```ts
// sanity.cli.ts (project root)
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  },
})
```

---

## 5. Schema Architecture

Schemas define the content model. They live in `sanity/schemas/`.

### 5.1 File structure

```
sanity/
  schemas/
    index.ts                ← Registers all schemas
    helpers/
      textStyle.ts          ← Reusable styling object (Section 6.1)
      sectionOrder.ts       ← Dynamic section ordering (Section 7)
    siteSettings.ts         ← Singleton: global settings
    homePage.ts             ← Singleton: home page content
    aboutPage.ts            ← Singleton: about page
    contactPage.ts          ← Singleton: contact page
    servicesPage.ts         ← Singleton: services overview
    panneauxSolairesPage.ts ← Singleton: service detail page
    pompeChaleurPage.ts     ← Singleton: service detail page
    boilerPage.ts           ← Singleton: service detail page
    pvCleanPage.ts          ← Singleton: service detail page
    marketingSettings.ts    ← Singleton: analytics & pixels (Section 8)
    themeSettings.ts        ← Singleton: CMS-controlled design (Section 9)
    blog.ts                 ← Collection: blog posts
    faq.ts                  ← Collection: FAQs
    legalPage.ts            ← Collection: legal pages (Section 10)
```

### 5.2 Schema registry

```ts
// sanity/schemas/index.ts
import textStyle from './helpers/textStyle'
import siteSettings from './siteSettings'
import homePage from './homePage'
import aboutPage from './aboutPage'
import contactPage from './contactPage'
import servicesPage from './servicesPage'
import panneauxSolairesPage from './panneauxSolairesPage'
import pompeChaleurPage from './pompeChaleurPage'
import boilerPage from './boilerPage'
import pvCleanPage from './pvCleanPage'
import blog from './blog'
import faq from './faq'
import legalPage from './legalPage'
import marketingSettings from './marketingSettings'
import themeSettings from './themeSettings'

export const schemaTypes = [
  textStyle,
  siteSettings,
  homePage,
  aboutPage,
  contactPage,
  servicesPage,
  panneauxSolairesPage,
  pompeChaleurPage,
  boilerPage,
  pvCleanPage,
  blog,
  faq,
  legalPage,
  marketingSettings,
  themeSettings,
]
```

### 5.3 Singleton pattern (one-of-a-kind pages)

Use for pages where only ONE document should exist (home, about, contact, settings).

```ts
// sanity/schemas/siteSettings.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General' },
    { name: 'logos', title: 'Logos' },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Social Links' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    // ── General ──
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description (SEO)',
      type: 'text',
      rows: 3,
      group: 'general',
    }),
    defineField({
      name: 'typeformUrl',
      title: 'Typeform URL (CTA link)',
      type: 'url',
      group: 'general',
    }),

    // ── Logos ──
    defineField({
      name: 'logoLight',
      title: 'Logo (light — for dark backgrounds)',
      type: 'image',
      group: 'logos',
    }),
    defineField({
      name: 'logoDark',
      title: 'Logo (dark — for light backgrounds)',
      type: 'image',
      group: 'logos',
    }),
    defineField({
      name: 'logoIcon',
      title: 'Logo (icon only)',
      type: 'image',
      group: 'logos',
    }),

    // ── Contact ──
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact' }),
    defineField({ name: 'address', title: 'Address', type: 'string', group: 'contact' }),
    defineField({
      name: 'googleMapUrl',
      title: 'Google Maps URL',
      type: 'url',
      group: 'contact',
    }),

    // ── Social Links ──
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'X (Twitter)', value: 'twitter' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                ],
              },
              validation: (r: any) => r.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (r: any) => r.required(),
            },
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        },
      ],
    }),

    // ── Footer ──
    defineField({ name: 'footerAbout', title: 'Footer About text', type: 'text', rows: 3, group: 'footer' }),
    defineField({ name: 'footerNewsletter', title: 'Footer Newsletter text', type: 'text', rows: 2, group: 'footer' }),
    defineField({ name: 'copyright', title: 'Copyright text', type: 'string', group: 'footer' }),
  ],
  preview: {
    prepare() { return { title: 'Site Settings' } },
  },
})
```

### 5.4 Collection pattern (multiple documents)

Use for blog posts, FAQs, legal pages — anything with multiple entries.

```ts
// sanity/schemas/blog.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tech', value: 'tech' },
          { title: 'News', value: 'news' },
          { title: 'Tutorial', value: 'tutorial' },
        ],
      },
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (min)',
      type: 'string',
    }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'heading', type: 'string', title: 'Heading' }),
            defineField({ name: 'body', type: 'text', title: 'Body' }),
            defineField({
              name: 'list',
              type: 'array',
              title: 'Bullet Points',
              of: [{ type: 'string' }],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage', date: 'date' },
    prepare({ title, media, date }) {
      return {
        title,
        media,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
      }
    },
  },
})
```

### 5.5 FAQ schema with structured answers

```ts
// sanity/schemas/faq.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answerIntro',
      title: 'Answer — Introduction',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'answerBullets',
      title: 'Answer — Bullet Points',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'bold', type: 'string', title: 'Bold Part' }),
            defineField({ name: 'text', type: 'string', title: 'Text' }),
          ],
        },
      ],
    }),
    defineField({ name: 'answerOutro', title: 'Answer — Conclusion', type: 'text', rows: 2 }),
    defineField({
      name: 'answerLink',
      title: 'Answer — Link',
      type: 'object',
      fields: [
        defineField({ name: 'text', type: 'string', title: 'Link Text' }),
        defineField({ name: 'href', type: 'string', title: 'URL' }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'question', subtitle: 'order' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `#${subtitle}` : '' }
    },
  },
})
```

### 5.6 Common field types reference

| Type | Example | Notes |
|------|---------|-------|
| `string` | Titles, labels | Single-line text |
| `text` | Descriptions | Multi-line, `rows` option |
| `number` | Prices, counts | |
| `boolean` | Toggles | |
| `datetime` | Publish dates | ISO 8601 |
| `slug` | URL slugs | `options: { source: 'title' }` |
| `image` | Photos | `options: { hotspot: true }` for cropping |
| `url` | External links | Auto-validates URL format |
| `array` | Lists, sections | `of: [{ type: '...' }]` — items need `_key` |
| `object` | Inline groups | Inline structured data |
| `reference` | Relations | `to: [{ type: 'author' }]` |
| `blockContent` | Rich text | Portable Text (WYSIWYG) |

### 5.7 Field groups (tabs in the editor)

```ts
defineType({
  name: 'homePage',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero Section', default: true },
    { name: 'services', title: 'Services Section' },
    { name: 'pricing', title: 'Pricing Section' },
    { name: 'layout', title: 'Layout' },  // For section ordering
  ],
  fields: [
    defineField({ name: 'seoTitle', type: 'string', group: 'seo' }),
    defineField({ name: 'heroTitle', type: 'string', group: 'hero' }),
    defineField({ name: 'servicesTitle', type: 'string', group: 'services' }),
    // Fields can belong to multiple groups
    defineField({ name: 'sharedField', type: 'string', group: ['hero', 'services'] }),
  ],
})
```

### 5.8 Validation rules

```ts
defineField({
  name: 'price',
  type: 'number',
  validation: (Rule) => Rule.required().min(0).max(99999),
})

defineField({
  name: 'email',
  type: 'string',
  validation: (Rule) => Rule.email().required(),
})

defineField({
  name: 'tags',
  type: 'array',
  of: [{ type: 'string' }],
  validation: (Rule) => Rule.max(5).unique(),
})

// Custom regex validation
defineField({
  name: 'hexColor',
  type: 'string',
  validation: (Rule) =>
    Rule.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
      .error('Must be a hex color (e.g., #ff0000)'),
})
```

### 5.9 Conditional fields

```ts
defineField({ name: 'showBanner', type: 'boolean' }),
defineField({
  name: 'bannerText',
  type: 'string',
  hidden: ({ parent }) => !parent?.showBanner,
}),
```

---

## 6. Reusable Schema Helpers

Create helper types and functions to avoid repeating patterns across schemas.

### 6.1 Text Style helper (per-field styling)

Allows editors to customize font size, family, and color on any text field.

```ts
// sanity/schemas/helpers/textStyle.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'textStyle',
  title: 'Text Style',
  type: 'object',
  fields: [
    defineField({
      name: 'fontSize',
      title: 'Font Size (px)',
      type: 'number',
      description: 'Leave empty for default.',
      validation: (r) => r.min(8).max(200),
    }),
    defineField({
      name: 'fontFamily',
      title: 'Font Family',
      type: 'string',
      description: 'Leave empty for default.',
      options: {
        list: [
          { title: 'Inter', value: 'Inter' },
          { title: 'Barlow', value: 'Barlow' },
          { title: 'Space Grotesk', value: 'Space Grotesk' },
          { title: 'Jost', value: 'Jost' },
        ],
      },
    }),
    defineField({
      name: 'fontColor',
      title: 'Color',
      type: 'string',
      description: 'Hex color code (e.g., #ff0000). Leave empty for default.',
      validation: (r) =>
        r.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
          .error('Invalid hex format (e.g., #ff0000)'),
    }),
  ],
  options: { collapsible: true, collapsed: true },
})
```

**Usage in any schema:**

```ts
// In homePage.ts or any page schema
defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string', group: 'hero' }),
defineField({ name: 'heroTitleStyle', title: 'Hero Title — Style', type: 'textStyle', group: 'hero' }),
```

**Usage in frontend components:**

```tsx
function StyledText({ text, style }: { text: string; style?: any }) {
  const css: React.CSSProperties = {}
  if (style?.fontSize) css.fontSize = `${style.fontSize}px`
  if (style?.fontFamily) css.fontFamily = style.fontFamily
  if (style?.fontColor) css.color = style.fontColor
  return <span style={css}>{text}</span>
}
```

> Register `textStyle` in your schema index (`sanity/schemas/index.ts`) as a regular schema type. Sanity automatically resolves `type: 'textStyle'` references.

### 6.2 Why helpers matter

Without helpers, you'd copy-paste the same 3 fields (fontSize, fontFamily, fontColor) for every styled text. With the `textStyle` object type, you just add `type: 'textStyle'` — one line per styled field.

---

## 7. Dynamic Section Ordering (Page Builder)

Allow editors to **reorder and show/hide sections** on any page via drag-and-drop in Sanity Studio.

### 7.1 The section order helper

```ts
// sanity/schemas/helpers/sectionOrder.ts
import { defineField } from 'sanity'

interface SectionOption {
  title: string
  value: string
}

export function makeSectionOrderField(sections: SectionOption[]) {
  const labels = Object.fromEntries(sections.map((s) => [s.value, s.title]))

  return defineField({
    name: 'sectionOrder',
    title: 'Section Order & Visibility',
    description: 'Drag to reorder. Toggle to show/hide sections.',
    type: 'array',
    group: 'layout',
    validation: (Rule) =>
      Rule.custom((entries: any[] | undefined) => {
        if (!entries) return true
        const ids = entries.map((e) => e.sectionId)
        return ids.length === new Set(ids).size
          ? true
          : 'Each section can only appear once.'
      }),
    of: [
      {
        type: 'object',
        name: 'sectionEntry',
        fields: [
          defineField({
            name: 'sectionId',
            title: 'Section',
            type: 'string',
            options: { list: sections },
            readOnly: true,   // Prevent editors from changing the ID
          }),
          defineField({
            name: 'enabled',
            title: 'Show this section',
            type: 'boolean',
            initialValue: true,
          }),
        ],
        preview: {
          select: { sectionId: 'sectionId', enabled: 'enabled' },
          prepare({ sectionId, enabled }: { sectionId: string; enabled: boolean }) {
            return {
              title: `${enabled === false ? '🚫 ' : '✅ '}${labels[sectionId] || sectionId}`,
            }
          },
        },
      },
    ],
  })
}

export const LAYOUT_GROUP = { name: 'layout', title: 'Layout', default: true }
```

### 7.2 Using in a page schema

```ts
// sanity/schemas/homePage.ts
import { makeSectionOrderField, LAYOUT_GROUP } from './helpers/sectionOrder'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    LAYOUT_GROUP,
    { name: 'seo', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'services', title: 'Services' },
    // ... more groups
  ],
  fields: [
    makeSectionOrderField([
      { title: 'Hero', value: 'hero' },
      { title: 'Our Services', value: 'ourServices' },
      { title: 'Services Highlight', value: 'servicesLime' },
      { title: 'About', value: 'about' },
      { title: 'Pricing', value: 'pricing' },
      { title: 'Process', value: 'process' },
      { title: 'Marquee', value: 'marquee' },
      { title: 'FAQ', value: 'faq' },
      { title: 'News', value: 'news' },
    ]),
    // ... SEO fields, hero fields, etc.
  ],
})
```

### 7.3 Frontend: Section Registry + Dynamic Rendering

**Step 1: Define the registry**

```ts
// lib/sectionRegistry.ts
import Hero from '@/components/sections/Hero'
import OurServices from '@/components/sections/OurServices'
import About from '@/components/sections/About'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
// ... import all section components

export interface SectionEntry {
  sectionId: string
  enabled: boolean
}

interface SectionDef {
  component: React.ComponentType<any>
  propsMapper: (pageData: any) => Record<string, any>
}

export const SECTION_REGISTRY: Record<string, SectionDef> = {
  hero: {
    component: Hero,
    propsMapper: (hp) => ({
      title: hp?.heroTitle,
      titleStyle: hp?.heroTitleStyle,
      subtitle: hp?.heroSubtitle,
      bgImage: hp?.heroBgImage,
      cta: hp?.heroCta,
    }),
  },
  ourServices: {
    component: OurServices,
    propsMapper: (hp) => ({
      label: hp?.ourServicesLabel,
      title: hp?.ourServicesTitle,
      cards: hp?.ourServicesCards,
    }),
  },
  // ... map every section
}

export const DEFAULT_SECTION_ORDER: SectionEntry[] = [
  { sectionId: 'hero', enabled: true },
  { sectionId: 'ourServices', enabled: true },
  { sectionId: 'about', enabled: true },
  { sectionId: 'pricing', enabled: true },
  { sectionId: 'faq', enabled: true },
]
```

**Step 2: Use in page.tsx**

```tsx
// app/page.tsx
import { getHomePage } from '@/lib/queries'
import { SECTION_REGISTRY, DEFAULT_SECTION_ORDER } from '@/lib/sectionRegistry'
import type { SectionEntry } from '@/lib/sectionRegistry'

export const revalidate = 0  // Always fetch fresh data (webhook handles cache)

export default async function Home() {
  const hp = await getHomePage()

  // Use Sanity section order if available, otherwise fall back to defaults
  const sections: SectionEntry[] =
    hp?.sectionOrder?.length > 0 ? hp.sectionOrder : DEFAULT_SECTION_ORDER

  return (
    <main>
      {sections
        .filter((s) => s.enabled !== false)
        .map((s) => {
          const def = SECTION_REGISTRY[s.sectionId]
          if (!def) return null
          const Component = def.component
          return <Component key={s.sectionId} {...def.propsMapper(hp)} />
        })}
    </main>
  )
}
```

### 7.4 Seeding default section order

Run this script once to populate the `sectionOrder` array in all Sanity documents:

```bash
SANITY_API_TOKEN=sk_xxx node scripts/init-section-order.mjs
```

See Section 20 for the full seed script.

---

## 8. Marketing & Analytics Settings

CMS-controlled analytics — editors can add/remove tracking codes without touching code.

```ts
// sanity/schemas/marketingSettings.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'marketingSettings',
  title: 'Marketing & Analytics',
  type: 'document',
  groups: [
    { name: 'analytics', title: 'Analytics', default: true },
    { name: 'pixels', title: 'Pixels & Ads' },
    { name: 'custom', title: 'Custom Scripts' },
    { name: 'consent', title: 'Cookie Consent' },
  ],
  fields: [
    // ── Analytics ──
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics 4 — Measurement ID',
      type: 'string',
      group: 'analytics',
      description: 'Format: G-XXXXXXXXXX',
      validation: (Rule) =>
        Rule.regex(/^G-[A-Z0-9]+$/).warning('ID must start with "G-"'),
    }),
    defineField({
      name: 'googleTagManagerId',
      title: 'Google Tag Manager — Container ID',
      type: 'string',
      group: 'analytics',
      description: 'Format: GTM-XXXXXXX',
      validation: (Rule) =>
        Rule.regex(/^GTM-[A-Z0-9]+$/).warning('ID must start with "GTM-"'),
    }),
    defineField({
      name: 'googleSearchConsoleVerification',
      title: 'Google Search Console — Verification Code',
      type: 'string',
      group: 'analytics',
    }),

    // ── Pixels & Ads ──
    defineField({ name: 'facebookPixelId', title: 'Meta (Facebook) Pixel ID', type: 'string', group: 'pixels' }),
    defineField({ name: 'tiktokPixelId', title: 'TikTok Pixel ID', type: 'string', group: 'pixels' }),
    defineField({ name: 'linkedinPartnerId', title: 'LinkedIn Insight Tag — Partner ID', type: 'string', group: 'pixels' }),
    defineField({
      name: 'googleAdsId',
      title: 'Google Ads — Conversion ID',
      type: 'string',
      group: 'pixels',
      description: 'Format: AW-XXXXXXXXX',
    }),

    // ── Custom Scripts ──
    defineField({
      name: 'headScripts',
      title: 'Custom <head> Scripts',
      type: 'text',
      rows: 10,
      group: 'custom',
      description: 'HTML/JS injected into <head>. For tools not listed above (Hotjar, Crisp, etc.).',
    }),
    defineField({ name: 'bodyStartScripts', title: 'Scripts after <body> open', type: 'text', rows: 8, group: 'custom' }),
    defineField({ name: 'bodyEndScripts', title: 'Scripts before </body> close', type: 'text', rows: 8, group: 'custom' }),

    // ── Cookie Consent ──
    defineField({
      name: 'cookieConsentEnabled',
      title: 'Enable Cookie Consent Banner',
      type: 'boolean',
      group: 'consent',
      initialValue: false,
    }),
    defineField({
      name: 'cookieConsentMessage',
      title: 'Banner Message',
      type: 'text',
      rows: 3,
      group: 'consent',
    }),
    defineField({
      name: 'cookieConsentPrivacyLink',
      title: 'Privacy Policy Link',
      type: 'string',
      group: 'consent',
    }),
  ],
  preview: {
    prepare() { return { title: 'Marketing & Analytics' } },
  },
})
```

**Frontend usage (in root layout):**

```tsx
// app/layout.tsx
import { getMarketingSettings } from '@/lib/queries'
import Script from 'next/script'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const marketing = await getMarketingSettings()

  return (
    <html>
      <head>
        {marketing?.googleAnalyticsId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${marketing.googleAnalyticsId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${marketing.googleAnalyticsId}');`}
            </Script>
          </>
        )}
        {marketing?.headScripts && (
          <div dangerouslySetInnerHTML={{ __html: marketing.headScripts }} />
        )}
      </head>
      <body>
        {marketing?.bodyStartScripts && (
          <div dangerouslySetInnerHTML={{ __html: marketing.bodyStartScripts }} />
        )}
        {children}
        {marketing?.bodyEndScripts && (
          <div dangerouslySetInnerHTML={{ __html: marketing.bodyEndScripts }} />
        )}
      </body>
    </html>
  )
}
```

### 8.2 Full Pixel Implementations (Frontend Components)

Each pixel has its own component, loaded conditionally based on Sanity settings:

```tsx
// components/tracking/FacebookPixel.tsx
'use client'
import Script from 'next/script'

export default function FacebookPixel({ pixelId }: { pixelId: string }) {
  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${pixelId}');fbq('track','PageView');`}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} alt="" />
      </noscript>
    </>
  )
}
```

```tsx
// components/tracking/TikTokPixel.tsx
'use client'
import Script from 'next/script'

export default function TikTokPixel({ pixelId }: { pixelId: string }) {
  return (
    <Script id="tt-pixel" strategy="afterInteractive">
      {`!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
      ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group",
      "enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){
      t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)
      ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;
      n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){
      var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];
      ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e+\"_\"+Date.now()]={pid:e,tag:n};
      var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
      var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load('${pixelId}');ttq.page();}(window,document,'ttq');`}
    </Script>
  )
}
```

```tsx
// components/tracking/LinkedInInsight.tsx
'use client'
import Script from 'next/script'

export default function LinkedInInsight({ partnerId }: { partnerId: string }) {
  return (
    <Script id="li-insight" strategy="afterInteractive">
      {`_linkedin_partner_id="${partnerId}";window._linkedin_data_partner_ids=
      window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);
      (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
      window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];
      var b=document.createElement("script");b.type="text/javascript";b.async=true;
      b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
      s.parentNode.insertBefore(b,s);})(window.lintrk);`}
    </Script>
  )
}
```

```tsx
// components/tracking/GoogleTagManager.tsx
'use client'
import Script from 'next/script'

export default function GoogleTagManager({ containerId }: { containerId: string }) {
  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),
        event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),
        dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${containerId}');`}
      </Script>
      {/* GTM noscript iframe — place in body */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}
```

### 8.3 Conversion Tracking Events (for CTA clicks, form submissions)

```ts
// lib/tracking.ts
'use client'

// Call these functions on CTA clicks and form submissions
// They fire events to all active pixels

export function trackLead(data?: { service?: string; source?: string }) {
  // Facebook
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', data)
  }
  // TikTok
  if (typeof window !== 'undefined' && (window as any).ttq) {
    (window as any).ttq.track('SubmitForm', data)
  }
  // LinkedIn
  if (typeof window !== 'undefined' && (window as any).lintrk) {
    (window as any).lintrk('track', { conversion_id: 'CONVERSION_ID' })
  }
  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      event_category: 'Contact',
      event_label: data?.service || 'General',
    })
  }
  // Google Ads
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: 'AW-XXXXXXXXX/CONVERSION_LABEL', // Replace with actual values from Sanity
    })
  }
}

export function trackCTAClick(label: string) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Contact', { content_name: label })
  }
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cta_click', { event_label: label })
  }
}

export function trackPageView(url: string) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'PageView')
  }
  if (typeof window !== 'undefined' && (window as any).ttq) {
    (window as any).ttq.page()
  }
}
```

**Usage in contact form:**

```tsx
import { trackLead } from '@/lib/tracking'

async function handleSubmit(data) {
  const res = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
  if (res.ok) {
    trackLead({ service: data.service, source: 'contact_form' })
  }
}
```

### 8.4 Assembling All Tracking in Layout

```tsx
// app/layout.tsx
import { getMarketingSettings } from '@/lib/queries'
import Script from 'next/script'
import FacebookPixel from '@/components/tracking/FacebookPixel'
import TikTokPixel from '@/components/tracking/TikTokPixel'
import LinkedInInsight from '@/components/tracking/LinkedInInsight'
import GoogleTagManager from '@/components/tracking/GoogleTagManager'

export default async function RootLayout({ children }) {
  const m = await getMarketingSettings()

  return (
    <html lang="fr">
      <head>
        {/* Google Search Console verification */}
        {m?.googleSearchConsoleVerification && (
          <meta name="google-site-verification" content={m.googleSearchConsoleVerification} />
        )}

        {/* Google Analytics 4 */}
        {m?.googleAnalyticsId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${m.googleAnalyticsId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
              gtag('js',new Date());gtag('config','${m.googleAnalyticsId}');
              ${m.googleAdsId ? `gtag('config','${m.googleAdsId}');` : ''}`}
            </Script>
          </>
        )}

        {/* Google Tag Manager */}
        {m?.googleTagManagerId && <GoogleTagManager containerId={m.googleTagManagerId} />}

        {/* Facebook Pixel */}
        {m?.facebookPixelId && <FacebookPixel pixelId={m.facebookPixelId} />}

        {/* TikTok Pixel */}
        {m?.tiktokPixelId && <TikTokPixel pixelId={m.tiktokPixelId} />}

        {/* LinkedIn Insight */}
        {m?.linkedinPartnerId && <LinkedInInsight partnerId={m.linkedinPartnerId} />}

        {/* Custom head scripts */}
        {m?.headScripts && <div dangerouslySetInnerHTML={{ __html: m.headScripts }} />}
      </head>
      <body>
        {m?.bodyStartScripts && <div dangerouslySetInnerHTML={{ __html: m.bodyStartScripts }} />}
        {children}
        {m?.bodyEndScripts && <div dangerouslySetInnerHTML={{ __html: m.bodyEndScripts }} />}
      </body>
    </html>
  )
}
```

### 8.5 GROQ Query for Marketing Settings

```ts
// lib/queries.ts
export async function getMarketingSettings() {
  return client.fetch(`*[_type == "marketingSettings"][0]{
    googleAnalyticsId,
    googleTagManagerId,
    googleSearchConsoleVerification,
    googleAdsId,
    facebookPixelId,
    tiktokPixelId,
    linkedinPartnerId,
    headScripts,
    bodyStartScripts,
    bodyEndScripts,
    cookieConsentEnabled,
    cookieConsentMessage,
    cookieConsentPrivacyLink,
  }`)
}
```

---

## 8B. Per-Page SEO Schema (Reusable)

Every page and document type should include SEO fields. Create a reusable helper:

### 8B.1 SEO fields helper

```ts
// sanity/schemas/helpers/seoFields.ts
import { defineField } from 'sanity'

export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO — Title (meta title)',
    type: 'string',
    group: 'seo',
    description: 'Max 60 chars. Overrides the page title in search results.',
    validation: (Rule) => Rule.max(60).warning('Keep under 60 characters for best display.'),
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO — Description (meta description)',
    type: 'text',
    rows: 3,
    group: 'seo',
    description: 'Max 160 chars. Shown in Google search results.',
    validation: (Rule) => Rule.max(160).warning('Keep under 160 characters.'),
  }),
  defineField({
    name: 'seoKeywords',
    title: 'SEO — Keywords',
    type: 'array',
    of: [{ type: 'string' }],
    group: 'seo',
    options: { layout: 'tags' },
    description: 'Comma-separated keywords relevant to this page.',
  }),
  defineField({
    name: 'ogImage',
    title: 'SEO — Social Sharing Image (OG Image)',
    type: 'image',
    group: 'seo',
    description: 'Recommended: 1200x630px. Used when sharing on Facebook, LinkedIn, WhatsApp.',
    options: { hotspot: true },
  }),
  defineField({
    name: 'noIndex',
    title: 'SEO — Hide from search engines',
    type: 'boolean',
    group: 'seo',
    initialValue: false,
    description: 'Enable to prevent Google from indexing this page.',
  }),
]
```

### 8B.2 Usage in any schema

```ts
// sanity/schemas/homepage.ts
import { defineType, defineField } from 'sanity'
import { seoFields } from './helpers/seoFields'

export default defineType({
  name: 'homepage',
  title: 'Page d\'accueil',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'content', title: 'Contenu' },
    { name: 'seo', title: 'SEO & Partage' },
  ],
  fields: [
    // ... page content fields ...
    ...seoFields,
  ],
})
```

### 8B.3 Frontend metadata generation (reusable)

```ts
// lib/seo.ts
import type { Metadata } from 'next'
import { urlForImage } from '@/lib/sanity'

interface SeoData {
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string[]
  ogImage?: any
  noIndex?: boolean
}

export function buildMetadata(
  data: SeoData | null,
  defaults: { title: string; description: string; path: string }
): Metadata {
  const title = data?.seoTitle || defaults.title
  const description = data?.seoDescription || defaults.description
  const ogImageUrl = data?.ogImage
    ? urlForImage(data.ogImage).width(1200).height(630).url()
    : '/images/hero-terrace.webp'

  return {
    title,
    description,
    keywords: data?.seoKeywords,
    robots: data?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical: defaults.path },
    openGraph: {
      title,
      description,
      url: defaults.path,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}
```

**Usage in any page:**

```tsx
// app/nos-solutions/[slug]/page.tsx
import { buildMetadata } from '@/lib/seo'
import { getProduct } from '@/lib/queries'

export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug)
  return buildMetadata(product, {
    title: product?.name || 'Nos solutions',
    description: product?.intro || '',
    path: `/nos-solutions/${params.slug}`,
  })
}
```

### 8B.4 Blog Post SEO Schema

```ts
// sanity/schemas/blogPost.ts
import { defineType, defineField } from 'sanity'
import { seoFields } from './helpers/seoFields'

export default defineType({
  name: 'blogPost',
  title: 'Article de blog',
  type: 'document',
  groups: [
    { name: 'content', title: 'Contenu', default: true },
    { name: 'seo', title: 'SEO & Partage' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string', group: 'content', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'URL Slug', type: 'slug', group: 'content', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'excerpt', title: 'Extrait', type: 'text', rows: 3, group: 'content', description: 'Court résumé affiché dans les listes et le partage social.' }),
    defineField({ name: 'mainImage', title: 'Image principale', type: 'image', group: 'content', options: { hotspot: true } }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Fenêtres', value: 'fenetres' },
          { title: 'Portes', value: 'portes' },
          { title: 'Volets', value: 'volets' },
          { title: 'Énergie', value: 'energie' },
          { title: 'Subventions', value: 'subventions' },
          { title: 'Conseils', value: 'conseils' },
        ],
      },
    }),
    defineField({ name: 'publishedAt', title: 'Date de publication', type: 'datetime', group: 'content' }),
    defineField({ name: 'body', title: 'Contenu', type: 'blockContent', group: 'content' }),
    defineField({
      name: 'relatedProducts',
      title: 'Solutions liées',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      group: 'content',
      description: 'Lier cet article à des pages de solutions pour le cross-linking SEO.',
    }),
    ...seoFields,
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', date: 'publishedAt' },
    prepare({ title, media, date }) {
      return { title, subtitle: date ? new Date(date).toLocaleDateString('fr-CH') : 'Brouillon', media }
    },
  },
  orderings: [
    { title: 'Date (récent)', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
})
```

### 8B.5 Blog Post JSON-LD + Metadata (Frontend)

```tsx
// app/actualites/[slug]/page.tsx
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { getBlogPost } from '@/lib/queries'
import { blogPostingJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import JsonLd from '@/components/seo/JsonLd'

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  return buildMetadata(post, {
    title: post?.title || 'Article',
    description: post?.excerpt || '',
    path: `/actualites/${params.slug}`,
  })
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug)

  return (
    <>
      <JsonLd data={blogPostingJsonLd({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        date: post.publishedAt,
        image: post.mainImage,
      })} />
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Accueil', url: '/' },
        { name: 'Actualités', url: '/actualites' },
        { name: post.title, url: `/actualites/${post.slug}` },
      ])} />
      {/* ... post content ... */}
    </>
  )
}
```

### 8B.6 Product Page SEO + JSON-LD

```tsx
// app/nos-solutions/[slug]/page.tsx
import { buildMetadata } from '@/lib/seo'
import { serviceJsonLd, faqPageJsonLd, breadcrumbJsonLd } from '@/lib/jsonld'
import JsonLd from '@/components/seo/JsonLd'

export async function generateMetadata({ params }) {
  const product = await getProduct(params.slug)
  return buildMetadata(product, {
    title: product?.name || 'Solution',
    description: product?.intro || '',
    path: `/nos-solutions/${params.slug}`,
  })
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.slug)

  return (
    <>
      <JsonLd data={serviceJsonLd({
        name: product.name,
        description: product.intro,
        url: `/nos-solutions/${product.slug}`,
      })} />
      {product.faq?.length > 0 && <JsonLd data={faqPageJsonLd(product.faq)} />}
      <JsonLd data={breadcrumbJsonLd([
        { name: 'Accueil', url: '/' },
        { name: 'Nos solutions', url: '/nos-solutions' },
        { name: product.name, url: `/nos-solutions/${product.slug}` },
      ])} />
      {/* ... product content ... */}
    </>
  )
}
```

---

## 9. Theme Settings (CMS-Controlled Design)

Let editors change brand colors and UI styles without deploying code.

```ts
// sanity/schemas/themeSettings.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'themeSettings',
  title: 'Theme & Design',
  type: 'document',
  groups: [
    { name: 'colors', title: 'Colors', default: true },
    { name: 'buttons', title: 'Buttons & Cards' },
  ],
  fields: [
    defineField({
      name: 'colorPrimary',
      title: 'Primary Color',
      type: 'string',
      group: 'colors',
      description: 'Main brand color for buttons, icons, links. Default: #2a9b96',
      validation: (r) => r.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
      initialValue: '#2a9b96',
    }),
    defineField({
      name: 'colorHover',
      title: 'Hover / Accent Color',
      type: 'string',
      group: 'colors',
      description: 'Hover states, secondary accents. Default: #50b5a2',
      validation: (r) => r.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
      initialValue: '#50b5a2',
    }),
    defineField({
      name: 'colorDark',
      title: 'Dark Color (header/footer)',
      type: 'string',
      group: 'colors',
      description: 'Header, footer, dark section backgrounds. Default: #2c6262',
      validation: (r) => r.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
      initialValue: '#2c6262',
    }),
    defineField({
      name: 'buttonStyle',
      title: 'Button Style',
      type: 'string',
      group: 'buttons',
      options: {
        list: [
          { title: 'Rounded (14px corners)', value: 'rounded' },
          { title: 'Square (6px corners)', value: 'square' },
          { title: 'Pill (50px corners)', value: 'pill' },
        ],
        layout: 'radio',
      },
      initialValue: 'rounded',
    }),
    defineField({
      name: 'cardStyle',
      title: 'Card Style',
      type: 'string',
      group: 'buttons',
      options: {
        list: [
          { title: 'Rounded (24px + light shadow)', value: 'rounded' },
          { title: 'Square (8px, minimal)', value: 'square' },
          { title: 'Shadow (24px + heavy shadow)', value: 'shadow' },
        ],
        layout: 'radio',
      },
      initialValue: 'rounded',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Theme & Design' }),
  },
})
```

**Frontend usage — inject as CSS custom properties:**

```tsx
// app/layout.tsx (or a ThemeProvider component)
import { getThemeSettings } from '@/lib/queries'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await getThemeSettings()

  const cssVars = {
    '--color-primary': theme?.colorPrimary || '#2a9b96',
    '--color-hover': theme?.colorHover || '#50b5a2',
    '--color-dark': theme?.colorDark || '#2c6262',
    '--btn-radius': theme?.buttonStyle === 'pill' ? '50px' : theme?.buttonStyle === 'square' ? '6px' : '14px',
    '--card-radius': theme?.cardStyle === 'square' ? '8px' : '24px',
  } as React.CSSProperties

  return (
    <html lang="fr" style={cssVars}>
      <body>{children}</body>
    </html>
  )
}
```

Then use in CSS: `background: var(--color-primary);`

---

## 10. Legal Pages Pattern

A single schema handles multiple legal document types (Terms of Service, Privacy Policy, etc.) via a `pageId` dropdown.

```ts
// sanity/schemas/legalPage.ts
import { defineType, defineField } from 'sanity'

const PAGE_OPTIONS = [
  { value: 'mentions-legales', title: 'Legal Notice' },
  { value: 'cge', title: 'General Maintenance Conditions' },
  { value: 'cgu', title: 'Terms of Use' },
  { value: 'cgv', title: 'Terms of Sale' },
  { value: 'confidentialite', title: 'Privacy Policy & Cookies' },
]

export default defineType({
  name: 'legalPage',
  title: 'Legal Pages',
  type: 'document',
  fields: [
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3 }),

    defineField({
      name: 'pageId',
      title: 'Page Type',
      type: 'string',
      description: 'Unique identifier — maps this document to a specific URL',
      options: { list: PAGE_OPTIONS, layout: 'dropdown' },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'lastUpdated', title: 'Last Updated', type: 'string' }),

    // Conditional field — only for "Legal Notice" page
    defineField({
      name: 'companyInfoItems',
      title: 'Company Info (Legal Notice only)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        },
      ],
      hidden: ({ document }) => document?.pageId !== 'mentions-legales',
    }),

    defineField({
      name: 'sections',
      title: 'Sections / Articles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Section Title', type: 'string' }),
            defineField({ name: 'content', title: 'Content', type: 'text', rows: 10 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'content' },
            prepare({ title, subtitle }) {
              return {
                title: title || '(Untitled section)',
                subtitle: subtitle ? subtitle.slice(0, 80) + '…' : '',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { pageId: 'pageId', heroTitle: 'heroTitle' },
    prepare({ pageId, heroTitle }) {
      const label = PAGE_OPTIONS.find((o) => o.value === pageId)?.title ?? pageId ?? 'New legal page'
      return { title: label, subtitle: heroTitle ?? '' }
    },
  },
})
```

**Frontend route:**

```tsx
// app/legal/[pageId]/page.tsx
import { getLegalPage } from '@/lib/queries'

export async function generateStaticParams() {
  return [
    { pageId: 'mentions-legales' },
    { pageId: 'cge' },
    { pageId: 'cgu' },
    { pageId: 'cgv' },
    { pageId: 'confidentialite' },
  ]
}

export default async function LegalPage({ params }: { params: { pageId: string } }) {
  const page = await getLegalPage(params.pageId)
  if (!page) return <div>Page not found</div>

  return (
    <article>
      <h1>{page.heroTitle}</h1>
      {page.lastUpdated && <p>Last updated: {page.lastUpdated}</p>}

      {page.companyInfoItems?.map((item: any, i: number) => (
        <div key={i}><strong>{item.label}:</strong> {item.value}</div>
      ))}

      {page.sections?.map((section: any, i: number) => (
        <section key={i}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </section>
      ))}
    </article>
  )
}
```

**GROQ query:**

```ts
export async function getLegalPage(pageId: string) {
  return client.fetch(
    `*[_type == "legalPage" && pageId == $pageId][0] {
      seoTitle, seoDescription,
      pageId, heroTitle, lastUpdated,
      companyInfoItems[]{ label, value },
      sections[]{ title, content }
    }`,
    { pageId }
  )
}
```

---

## 11. Client Setup & Image Builder

### 11.1 Sanity client

```ts
// lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',  // Use a fixed date for API stability
  useCdn: false,             // false for fresh data; true for speed (cached)
})

// Image URL builder — generates responsive image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

**When to use `useCdn: true`:**
- Static/public content that doesn't change frequently
- When using ISR (content updates via webhook revalidation)

**When to use `useCdn: false`:**
- Draft/preview content
- When you need real-time accuracy (e.g., Studio preview)

### 11.2 Using the image builder

```tsx
import { urlFor } from '@/lib/sanity'

// Basic usage
<img src={urlFor(post.coverImage).url()} alt="Cover" />

// With transforms
<img src={urlFor(post.coverImage).width(800).height(600).fit('crop').url()} />

// With Next.js Image component
<Image
  src={urlFor(post.coverImage).width(1200).url()}
  alt="Cover"
  width={1200}
  height={800}
/>
```

---

## 12. GROQ Queries

GROQ (Graph-Relational Object Queries) is Sanity's query language.

### 12.1 Syntax basics

```groq
// All documents of a type
*[_type == "blog"]

// Filter + order + slice
*[_type == "blog"] | order(date desc) [0..9]

// Single document (singleton)
*[_type == "homePage"][0]

// With projection (select specific fields)
*[_type == "blog"] {
  title,
  "slug": slug.current,
  excerpt,
  coverImage
}

// Parameterized query (prevents injection)
*[_type == "blog" && slug.current == $slug][0]
```

### 12.2 Query functions pattern

Organize all queries in a single file:

```ts
// lib/queries.ts
import { client } from './sanity'

// ── Singleton queries ────────────────────────────

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      siteName, siteDescription, typeformUrl,
      logoLight, logoDark, logoIcon,
      phone, email, address, googleMapUrl,
      socialLinks[]{ platform, url },
      footerAbout, footerNewsletter, copyright
    }`
  )
}

export async function getHomePage() {
  return client.fetch(
    `*[_type == "homePage"][0] {
      sectionOrder[]{ sectionId, enabled },
      seoTitle, seoDescription,
      heroBadge, heroTitle, heroTitleStyle, heroSubtitle, heroSubtitleStyle,
      heroBgImage, heroCta, heroCtaLink,
      // ... all section fields
    }`
  )
}

export async function getMarketingSettings() {
  return client.fetch(
    `*[_type == "marketingSettings"][0] {
      googleAnalyticsId, googleTagManagerId, googleSearchConsoleVerification,
      facebookPixelId, tiktokPixelId, linkedinPartnerId, googleAdsId,
      headScripts, bodyStartScripts, bodyEndScripts,
      cookieConsentEnabled, cookieConsentMessage, cookieConsentPrivacyLink
    }`
  )
}

export async function getThemeSettings() {
  return client.fetch(
    `*[_type == "themeSettings"][0] {
      colorPrimary, colorHover, colorDark, buttonStyle, cardStyle
    }`
  )
}

// ── Collection queries ───────────────────────────

export async function getAllBlogs() {
  return client.fetch(
    `*[_type == "blog"] | order(date desc) { ${blogFields} }`
  )
}

export async function getBlogBySlug(slug: string) {
  return client.fetch(
    `*[_type == "blog" && slug.current == $slug][0] { ${blogFields} }`,
    { slug }  // Pass parameters safely (prevents injection)
  )
}

export async function getAllBlogSlugs() {
  return client.fetch<string[]>(`*[_type == "blog"].slug.current`)
}

export async function getLegalPage(pageId: string) {
  return client.fetch(
    `*[_type == "legalPage" && pageId == $pageId][0] {
      seoTitle, seoDescription, pageId, heroTitle, lastUpdated,
      companyInfoItems[]{ label, value },
      sections[]{ title, content }
    }`,
    { pageId }
  )
}

export async function getAllFAQs() {
  return client.fetch(
    `*[_type == "faq"] | order(order asc) {
      question,
      answerIntro,
      answerBullets[]{ bold, text },
      answerOutro,
      answerLink{ text, href },
      order
    }`
  )
}
```

### 12.3 Shared field projections (DRY)

Avoid repeating the same field list across multiple queries:

```ts
const servicePageFields = `
  sectionOrder[]{ sectionId, enabled },
  seoTitle, seoDescription,
  heroTitle, heroTitleStyle, heroBgImage, breadcrumbLabel,
  mainImage, overlayHeadline, overlayHeadlineStyle,
  contractsTitle, contractsTitleStyle,
  contractFeatures[]{ label, acces, equilibre, plus },
  discountHeadline, discountText, discountBadge, disclaimer,
  whyTitle, whyTitleStyle, whyIntro, whyBullets, detailImages,
  faqTitle, faqTitleStyle, faqs[]{ question, answer }
`

export async function getPanneauxSolairesPage() {
  return client.fetch(
    `*[_type == "panneauxSolairesPage"][0] {
      ${servicePageFields},
      pvCleanTitle, pvCleanImage, pvCleanFeatures, pvCleanDisclaimer
    }`
  )
}

export async function getBoilerPage() {
  return client.fetch(
    `*[_type == "boilerPage"][0] { ${servicePageFields} }`
  )
}
```

### 12.4 GROQ cheat sheet

| Pattern | Example |
|---------|---------|
| All of type | `*[_type == "blog"]` |
| By ID | `*[_id == "siteSettings"]` |
| By slug | `*[_type == "blog" && slug.current == $slug][0]` |
| By custom field | `*[_type == "legalPage" && pageId == $pageId][0]` |
| Order | `\| order(date desc)` |
| Limit | `[0..4]` (first 5) |
| Count | `count(*[_type == "blog"])` |
| Dereference | `author->{ name, image }` |
| Coalesce | `coalesce(customTitle, title)` |
| Computed field | `"slug": slug.current` |
| Array element projection | `items[]{ title, desc }` |
| Existence check | `*[_type == "blog" && defined(coverImage)]` |

---

## 13. Embedding Sanity Studio in Next.js

Mount Sanity Studio as a route inside your Next.js app — no separate deployment needed.

### 13.1 Studio page (catch-all route)

```tsx
// app/studio/[[...tool]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

### 13.2 Studio layout (hide app chrome)

Hide your site's header/footer when viewing the Studio:

```tsx
// app/studio/layout.tsx
export const metadata = { title: 'Sanity Studio' }

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* CSS to hide the site header, footer, and scroll button inside Studio */}
      <style>{`
        header, footer, .scroll-to-top { display: none !important; }
        main { padding: 0 !important; }
      `}</style>
      <div style={{ height: '100vh' }}>{children}</div>
    </>
  )
}
```

### 13.3 `basePath` must match

In `sanity.config.ts`, ensure `basePath` matches the route:

```ts
export default defineConfig({
  // ...
  basePath: '/studio',  // Must match app/studio/[[...tool]]/
})
```

Now visit `http://localhost:3000/studio` to access the CMS.

---

## 14. Desk Structure Customization

Control how documents appear in the Studio sidebar.

### 14.1 Full production desk structure

```ts
// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'
import {
  CogIcon, HomeIcon, UsersIcon, EnvelopeIcon, BoltIcon,
  SunIcon, ControlsIcon, DropIcon, SparklesIcon,
  DocumentTextIcon, HelpCircleIcon, BookIcon,
  BarChartIcon, ColorWheelIcon,
} from '@sanity/icons'

const singletonTypes = [
  'siteSettings', 'homePage', 'aboutPage', 'contactPage', 'servicesPage',
  'panneauxSolairesPage', 'pompeChaleurPage', 'boilerPage', 'pvCleanPage',
  'marketingSettings', 'themeSettings',
]

// Helper: create a singleton list item
const singleton = (S: any, title: string, schemaType: string, icon?: any) => {
  const item = S.listItem()
    .title(title)
    .id(schemaType)
    .child(S.document().schemaType(schemaType).documentId(schemaType))
  return icon ? item.icon(icon) : item
}

export default defineConfig({
  name: 'my-project',
  title: 'My Project',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ── Settings (singletons) ──
            singleton(S, 'Site Settings', 'siteSettings', CogIcon),
            singleton(S, 'Marketing & Analytics', 'marketingSettings', BarChartIcon),
            singleton(S, 'Theme & Design', 'themeSettings', ColorWheelIcon),
            S.divider(),

            // ── Main Pages (singletons) ──
            singleton(S, 'Home Page', 'homePage', HomeIcon),
            singleton(S, 'About Page', 'aboutPage', UsersIcon),
            singleton(S, 'Contact Page', 'contactPage', EnvelopeIcon),
            singleton(S, 'Services Page', 'servicesPage', BoltIcon),
            S.divider(),

            // ── Nested sub-menu for service detail pages ──
            S.listItem()
              .title('Service Detail Pages')
              .icon(BoltIcon)
              .child(
                S.list()
                  .title('Service Detail Pages')
                  .items([
                    singleton(S, 'Solar Panels', 'panneauxSolairesPage', SunIcon),
                    singleton(S, 'Heat Pump', 'pompeChaleurPage', ControlsIcon),
                    singleton(S, 'Boiler', 'boilerPage', DropIcon),
                    singleton(S, 'PV Clean', 'pvCleanPage', SparklesIcon),
                  ])
              ),
            S.divider(),

            // ── Dynamic content (collections) ──
            S.listItem()
              .title('Articles')
              .icon(BookIcon)
              .child(S.documentTypeList('blog').title('Articles')),
            S.listItem()
              .title('FAQ')
              .icon(HelpCircleIcon)
              .child(S.documentTypeList('faq').title('FAQ')),
            S.listItem()
              .title('Legal Pages')
              .icon(DocumentTextIcon)
              .child(S.documentTypeList('legalPage').title('Legal Pages')),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Prevent singletons from appearing in "New document" menu
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },
})
```

### 14.2 Key concepts

- **`singleton()`**: Opens a single document directly (no list view)
- **`S.divider()`**: Visual separator in the sidebar
- **Nested sub-menus**: Use `S.listItem().child(S.list().items([...]))` for grouping
- **Icons**: Import from `@sanity/icons` — adds visual clarity to the sidebar
- **`templates` filter**: Prevents users from creating duplicate singletons via "+ New"

---

## 15. Frontend Data Consumption

### 15.1 Server components (recommended)

Fetch data directly in async server components — no `useEffect` or loading states:

```tsx
// app/page.tsx (Server Component — default in App Router)
import { getHomePage } from '@/lib/queries'

export const revalidate = 0  // Fetch on every request (webhook handles freshness)

export default async function HomePage() {
  const page = await getHomePage()

  return (
    <main>
      <h1>{page?.heroTitle}</h1>
    </main>
  )
}
```

### 15.2 Handling deleted content — the conditional rendering pattern

**The problem:** If you use `??` (nullish coalescing) for defaults, editors cannot clear fields in Sanity — the default value always shows up instead.

```tsx
// ❌ BAD — hardcoded defaults that can't be "deleted" from CMS
<h2>{title ?? 'Default Title'}</h2>
<p>{desc ?? 'Default description text here'}</p>
```

**The solution:** Set defaults to empty strings (`''`) and use conditional rendering:

```tsx
// ✅ GOOD — empty string + conditional rendering
function MySection({
  title = '',     // Empty string, not a hardcoded default
  desc = '',
  cta = '',
}: {
  title?: string
  desc?: string
  cta?: string
}) {
  return (
    <section>
      {title && <h2>{title}</h2>}
      {desc && <p>{desc}</p>}
      {cta && <button>{cta}</button>}
    </section>
  )
}
```

**Why this works:**
1. Sanity returns `null` when a field is cleared
2. The `v()` helper or `??` converts `null` → `undefined`
3. JavaScript destructuring defaults activate: `undefined` → `''`
4. Empty string is falsy → `{'' && <h2>...}` renders nothing
5. Editor deletes text → it actually disappears from the page

> **Rule of thumb:** Every text field that editors should be able to clear must default to `''`, not a hardcoded string.

### 15.3 Server → Client component split

When you need interactivity (animations, state, browser APIs), fetch data in a server component and pass it down:

```tsx
// app/services/page.tsx (Server)
import { getServicesPage } from '@/lib/queries'
import ServicesClient from './ServicesClient'

export default async function ServicesPage() {
  const data = await getServicesPage()
  return <ServicesClient data={data} />
}
```

```tsx
// app/services/ServicesClient.tsx (Client)
'use client'

import { motion } from 'framer-motion'

export default function ServicesClient({ data }: { data: any }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {data?.title && <h1>{data.title}</h1>}
    </motion.div>
  )
}
```

### 15.4 Dynamic routes with generateStaticParams

```tsx
// app/blog/[slug]/page.tsx
import { getBlogBySlug, getAllBlogSlugs } from '@/lib/queries'

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return (slugs ?? []).map((slug) => ({ slug }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogBySlug(params.slug)
  if (!post) return <div>Post not found</div>

  return (
    <article>
      <h1>{post.title}</h1>
      {post.sections?.map((section: any, i: number) => (
        <section key={i}>
          {section.heading && <h2>{section.heading}</h2>}
          {section.body && <p>{section.body}</p>}
        </section>
      ))}
    </article>
  )
}
```

---

## 16. Image Handling

### 16.1 The `urlFor()` chain API

```ts
import { urlFor } from '@/lib/sanity'

// Basic
urlFor(image).url()

// Resize
urlFor(image).width(800).url()
urlFor(image).width(800).height(600).url()

// Crop & hotspot (requires hotspot: true in schema)
urlFor(image).width(400).height(400).fit('crop').url()

// Format & quality
urlFor(image).format('webp').quality(80).url()

// Chain everything
urlFor(image).width(1200).height(630).fit('crop').format('webp').quality(85).url()
```

### 16.2 With Next.js `<Image>`

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

function CoverImage({ image, alt }: { image: any; alt: string }) {
  if (!image) return null

  return (
    <Image
      src={urlFor(image).width(1200).url()}
      alt={alt}
      width={1200}
      height={800}
      className="rounded-lg"
    />
  )
}
```

### 16.3 Null-safe image rendering

Always check if the image exists before calling `urlFor`:

```tsx
{data?.heroImage && (
  <Image src={urlFor(data.heroImage).width(1920).url()} alt="Hero" fill />
)}
```

### 16.4 Image fallback pattern

Support both Sanity images and local file paths for maximum flexibility:

```tsx
// Schema: two fields
defineField({ name: 'heroImage', title: 'Hero Image (from CMS)', type: 'image' }),
defineField({ name: 'heroImg', title: 'Hero Image (local fallback path)', type: 'string' }),

// Frontend: try CMS image first, fall back to local
const bgUrl = data?.heroImage
  ? urlFor(data.heroImage).width(1920).url()
  : data?.heroImg || '/images/default-hero.jpg'
```

---

## 17. On-Demand Revalidation (ISR)

When editors publish content in Sanity, automatically refresh the affected pages.

### 17.1 API route handler

```ts
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Map Sanity document types → Next.js paths to revalidate
const TYPE_TO_PATHS: Record<string, string[]> = {
  homePage:             ['/'],
  aboutPage:            ['/about-us'],
  contactPage:          ['/contact-us'],
  servicesPage:         ['/services'],
  panneauxSolairesPage: ['/services/panneaux-solaires'],
  pompeChaleurPage:     ['/services/pompe-a-chaleur'],
  boilerPage:           ['/services/boiler-thermodynamique'],
  pvCleanPage:          ['/services/pv-clean'],
  blog:                 ['/blogs'],
  faq:                  ['/'],
  siteSettings:         ['/', '/services', '/about-us', '/contact-us'],
  themeSettings:        ['/', '/services', '/about-us', '/contact-us',
                         '/services/panneaux-solaires', '/services/pompe-a-chaleur',
                         '/services/boiler-thermodynamique', '/services/pv-clean'],
  marketingSettings:    ['/', '/services', '/about-us', '/contact-us'],
}

export async function POST(req: NextRequest) {
  // 1. Validate webhook secret
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    // 2. Parse the webhook body
    const body = await req.json()
    const { _type, slug } = body

    // 3. Revalidate mapped paths
    const paths = TYPE_TO_PATHS[_type]
    if (paths) {
      for (const path of paths) {
        revalidatePath(path)
      }
      // Also revalidate individual slug pages
      if (slug?.current) {
        revalidatePath(`/blogs/${slug.current}`)
        revalidatePath(`/services/${slug.current}`)
      }
      return NextResponse.json({ revalidated: true, paths })
    }

    // 4. Unknown type — revalidate everything
    revalidatePath('/', 'layout')
    return NextResponse.json({ revalidated: true, paths: ['/ (layout)'] })
  } catch {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
```

> **Key points:**
> - `themeSettings` revalidates ALL pages because colors/styles affect every page
> - `siteSettings` revalidates pages that use the header/footer
> - Unknown types fall back to full layout revalidation

### 17.2 Page-level revalidation export

In each page file, set `revalidate = 0` to always fetch fresh data server-side:

```tsx
// app/page.tsx
export const revalidate = 0  // No stale cache — webhook + fresh fetch
```

This means every request hits the server, but the webhook ensures Sanity content is always current.

### 17.3 Sanity webhook setup

1. Go to **Sanity Dashboard → Project → API → Webhooks**
2. Create a new webhook:
   - **URL:** `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** Leave blank (all types) or use GROQ filter
   - **Projection:** `{ _type, slug }`
   - **HTTP method:** POST

---

## 18. Contact Form & Email (Nodemailer)

### 18.1 API route

```ts
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    // Check SMTP config exists (catches missing Vercel env vars)
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('[contact] Missing SMTP environment variables')
      return NextResponse.json({ error: 'Email configuration missing.' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',  // true for 465 (SSL), false for 587 (STARTTLS)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Your Brand" <${process.env.SMTP_USER}>`,
      to: 'recipient@yourdomain.com',
      replyTo: email,           // Reply goes to the visitor
      subject: `New contact — ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table>
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone || '—'}</td></tr>
          <tr><td><strong>Message</strong></td><td>${message}</td></tr>
        </table>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] Email error:', err)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}
```

### 18.2 Frontend form (Client Component)

```tsx
'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {
      setStatus('error')
    } else {
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      <input name="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
      <input name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      <textarea name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send'}
      </button>
      {status === 'success' && <p>Message sent!</p>}
      {status === 'error' && <p>Error — please try again.</p>}
    </form>
  )
}
```

### 18.3 SMTP providers reference

| Provider | Host | Port | Secure |
|----------|------|------|--------|
| Infomaniak | `mail.infomaniak.com` | 587 | false (STARTTLS) |
| Gmail | `smtp.gmail.com` | 587 | false (STARTTLS) |
| Outlook | `smtp-mail.outlook.com` | 587 | false (STARTTLS) |
| SendGrid | `smtp.sendgrid.net` | 587 | false (STARTTLS) |
| Mailgun | `smtp.mailgun.org` | 587 | false (STARTTLS) |

> **Production reminder:** `.env.local` is not deployed. Add all SMTP variables in your hosting platform's environment settings (Vercel → Settings → Environment Variables).

---

## 19. SEO — Metadata & JSON-LD

### 19.1 Dynamic metadata from Sanity

```tsx
// app/page.tsx
import type { Metadata } from 'next'
import { getHomePage } from '@/lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePage()
  return {
    title: data?.seoTitle || 'Default Home Title',
    description: data?.seoDescription || 'Default description.',
    alternates: { canonical: '/' },
  }
}
```

Apply this pattern to every page — each page schema has `seoTitle` and `seoDescription` fields.

### 19.2 JSON-LD Structured Data

Create helper functions for common schema types:

```ts
// lib/jsonld.ts
const SITE_URL = 'https://yourdomain.com'
const COMPANY = {
  name: 'Your Company',
  phone: '+41 21 512 05 74',
  email: 'contact@yourdomain.com',
  streetAddress: '123 Main Street',
  locality: 'Geneva',
  postalCode: '1228',
  region: 'GE',
  country: 'CH',
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY.name,
    url: SITE_URL,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.streetAddress,
      addressLocality: COMPANY.locality,
      postalCode: COMPANY.postalCode,
      addressCountry: COMPANY.country,
    },
  }
}

export function serviceJsonLd(service: { name: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `${SITE_URL}${service.url}`,
    provider: { '@type': 'Organization', name: COMPANY.name },
  }
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function blogPostingJsonLd(post: { title: string; slug: string; excerpt?: string; date?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blogs/${post.slug}`,
    datePublished: post.date,
    author: { '@type': 'Organization', name: COMPANY.name },
  }
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}
```

**Usage in pages:**

```tsx
// components/seo/JsonLd.tsx
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// app/page.tsx
import JsonLd from '@/components/seo/JsonLd'
import { localBusinessJsonLd } from '@/lib/jsonld'

export default async function Home() {
  return (
    <main>
      <JsonLd data={localBusinessJsonLd()} />
      {/* ... */}
    </main>
  )
}
```

---

## 20. Seed Scripts

Populate Sanity with initial content programmatically.

### 20.1 Basic seed script

```js
// scripts/seed.mjs
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_TOKEN
if (!token) { console.error('Missing SANITY_API_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function seed() {
  const transaction = client.transaction()

  // createOrReplace = idempotent (safe to run multiple times)
  transaction.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'My Website',
    phone: '+41 21 512 05 74',
    email: 'contact@example.com',
  })

  transaction.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroTitle: 'Welcome',
    heroSubtitle: 'We do amazing things',
  })

  const result = await transaction.commit()
  console.log(`Seeded ${result.results.length} documents`)
}

seed().catch(console.error)
```

### 20.2 Section order seed script

Populates the `sectionOrder` array for all pages with the page builder:

```js
// scripts/init-section-order.mjs
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_TOKEN
if (!token) { console.error('Missing SANITY_API_TOKEN'); process.exit(1) }

const client = createClient({
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

function makeEntries(sectionIds) {
  return sectionIds.map((id) => ({
    _type: 'sectionEntry',
    _key: id,               // _key is REQUIRED for array items
    sectionId: id,
    enabled: true,
  }))
}

const PAGES = [
  { type: 'homePage', sections: ['hero', 'ourServices', 'servicesLime', 'about', 'pricing', 'process', 'marquee', 'faq', 'news'] },
  { type: 'servicesPage', sections: ['hero', 'cards', 'stats', 'experience', 'details', 'cta'] },
  { type: 'aboutPage', sections: ['hero', 'intro', 'whyChoose'] },
  { type: 'contactPage', sections: ['hero', 'contactForm'] },
  { type: 'panneauxSolairesPage', sections: ['hero', 'content', 'contracts', 'pvClean', 'why', 'faq'] },
  { type: 'pompeChaleurPage', sections: ['hero', 'content', 'contracts', 'why', 'faq'] },
  { type: 'boilerPage', sections: ['hero', 'content', 'contracts', 'why', 'faq'] },
  { type: 'pvCleanPage', sections: ['hero', 'content', 'offer', 'why', 'faq'] },
]

async function main() {
  for (const page of PAGES) {
    const doc = await client.fetch(`*[_type == "${page.type}"][0]{ _id }`)
    if (!doc) { console.log(`No ${page.type} document — skipping`); continue }

    await client.patch(doc._id).set({ sectionOrder: makeEntries(page.sections) }).commit()
    console.log(`Seeded ${page.type}`)
  }
  console.log('Done.')
}

main().catch((err) => { console.error(err); process.exit(1) })
```

### 20.3 Running seed scripts

```bash
# Pass the token via environment variable
SANITY_API_TOKEN=sk_xxx node scripts/seed.mjs

# Or read from .env.local
SANITY_API_TOKEN=$(grep SANITY_API_TOKEN .env.local | cut -d '=' -f2) node scripts/seed.mjs
```

### 20.4 Key rules for seed data

- **`_id`**: Required. Use the schema name for singletons (e.g., `'homePage'`).
- **`_type`**: Required. Must match a registered schema name.
- **`_key`**: Required on every item inside an `array` field. Use unique strings.
- **`createOrReplace`**: Idempotent — re-running won't create duplicates.
- **`create`**: Will error if document already exists.

---

## 21. Deployment Checklist

### 21.1 Environment variables

Set these on your hosting platform (Vercel, Netlify, etc.):

| Variable | Value | Scope |
|----------|-------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your project ID | Public (client-side) |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Public (client-side) |
| `SANITY_API_TOKEN` | `sk_xxx...` | Server-only |
| `SANITY_REVALIDATE_SECRET` | Random string | Server-only |
| `SMTP_HOST` | `mail.infomaniak.com` | Server-only |
| `SMTP_PORT` | `587` | Server-only |
| `SMTP_SECURE` | `false` | Server-only |
| `SMTP_USER` | `contact@yourdomain.com` | Server-only |
| `SMTP_PASS` | Your SMTP password | Server-only |

> **Common production error:** Contact form returns 500 → SMTP env vars are missing on the hosting platform. `.env.local` is NOT deployed.

### 21.2 Sanity CORS origins

In **Sanity Dashboard → Project → API → CORS Origins**, add:

- `http://localhost:3000` (dev)
- `https://yourdomain.com` (production)
- `https://your-app.vercel.app` (preview/staging)

Check **"Allow credentials"** for each.

### 21.3 Webhook configuration

- Set webhook URL: `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`
- Trigger on: Create, Update, Delete
- Projection: `{ _type, slug }`
- Test by publishing a document and checking if the page updates

### 21.4 Post-deploy verification

1. Visit `/studio` — Studio should load without CORS errors
2. Edit a field in Studio → publish → check if the page updates (webhook working)
3. Submit the contact form → check recipient inbox (SMTP working)
4. Check Google Search Console for structured data (JSON-LD working)

---

## 22. Common Patterns & Tips

### 22.1 TypeScript types from schemas

```ts
// types/sanity.ts
export interface SiteSettings {
  siteName: string
  siteDescription?: string
  logoLight?: any
  logoDark?: any
  phone?: string
  email?: string
  address?: string
  socialLinks?: { platform: string; url: string }[]
}

export interface BlogPost {
  slug: string
  title: string
  excerpt?: string
  coverImage?: any
  date?: string
  category?: string
  sections?: { heading: string; body: string; list?: string[] }[]
}
```

### 22.2 Error handling in queries

```ts
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(`*[_type == "siteSettings"][0] { ... }`)
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
    return null
  }
}
```

### 22.3 Preview mode (optional)

```ts
// lib/sanity.ts
export const previewClient = createClient({
  ...clientConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export function getClient(preview = false) {
  return preview ? previewClient : client
}
```

### 22.4 Portable Text (rich text)

```bash
npm install @portabletext/react
```

```tsx
import { PortableText } from '@portabletext/react'

<PortableText value={post.body} />
```

---

## 23. Complete File Structure

```
project-root/
├── .env.local                          # Environment variables (gitignored)
├── sanity.config.ts                    # Studio config + desk structure
├── sanity.cli.ts                       # CLI config
├── next.config.js                      # Image CDN + security headers
│
├── sanity/
│   └── schemas/
│       ├── index.ts                    # Schema registry (all types)
│       ├── helpers/
│       │   ├── textStyle.ts            # Reusable text styling object
│       │   └── sectionOrder.ts         # Dynamic section ordering helper
│       ├── siteSettings.ts             # Singleton: site config
│       ├── homePage.ts                 # Singleton: home page
│       ├── aboutPage.ts               # Singleton: about page
│       ├── contactPage.ts             # Singleton: contact page
│       ├── servicesPage.ts            # Singleton: services overview
│       ├── panneauxSolairesPage.ts    # Singleton: service detail
│       ├── pompeChaleurPage.ts        # Singleton: service detail
│       ├── boilerPage.ts             # Singleton: service detail
│       ├── pvCleanPage.ts            # Singleton: service detail
│       ├── marketingSettings.ts       # Singleton: analytics & pixels
│       ├── themeSettings.ts           # Singleton: CMS-controlled design
│       ├── blog.ts                    # Collection: blog posts
│       ├── faq.ts                     # Collection: FAQs
│       └── legalPage.ts              # Collection: legal pages
│
├── lib/
│   ├── sanity.ts                      # Client + urlFor image builder
│   ├── queries.ts                     # All GROQ query functions (16+)
│   ├── sectionRegistry.ts            # Section component registry (page builder)
│   ├── jsonld.ts                      # JSON-LD structured data helpers
│   └── seo.ts                         # SEO constants (company info, URLs)
│
├── components/
│   ├── seo/
│   │   └── JsonLd.tsx                 # JSON-LD script injector
│   ├── sections/
│   │   ├── Hero.tsx                   # Home hero section
│   │   ├── OurServices.tsx            # Services carousel
│   │   ├── About.tsx                  # About section
│   │   ├── Pricing.tsx                # Pricing cards
│   │   ├── FunFact.tsx                # Process/stats section
│   │   ├── FAQ.tsx                    # FAQ accordion
│   │   └── ...                        # More section components
│   └── layout/
│       ├── Header.tsx                 # Site header
│       └── Footer.tsx                 # Site footer
│
├── app/
│   ├── layout.tsx                     # Root layout (theme + analytics injection)
│   ├── page.tsx                       # Home (dynamic section builder)
│   │
│   ├── studio/
│   │   ├── layout.tsx                 # Studio layout (hides app chrome)
│   │   └── [[...tool]]/
│   │       └── page.tsx               # NextStudio mount point
│   │
│   ├── api/
│   │   ├── revalidate/
│   │   │   └── route.ts              # ISR webhook handler
│   │   └── contact/
│   │       └── route.ts              # Contact form email handler
│   │
│   ├── about-us/
│   │   └── page.tsx                   # About page
│   ├── contact-us/
│   │   ├── page.tsx                   # Contact page (server)
│   │   └── ContactUsClient.tsx        # Contact form (client)
│   ├── services/
│   │   ├── page.tsx                   # Services overview
│   │   ├── panneaux-solaires/
│   │   ├── pompe-a-chaleur/
│   │   ├── boiler-thermodynamique/
│   │   └── pv-clean/
│   ├── blogs/
│   │   ├── page.tsx                   # Blog list
│   │   └── [slug]/
│   │       └── page.tsx               # Blog detail
│   └── legal/
│       └── [pageId]/
│           └── page.tsx               # Legal pages (parameterized)
│
└── scripts/
    ├── seed.mjs                       # Initial content seed
    └── init-section-order.mjs         # Section order seed
```

---

## 24. Troubleshooting

### Build error: `Can't resolve 'react-is'`
```bash
npm install react-is
```
Sanity requires this as a peer dependency but doesn't always install it.

### Contact form 500 error in production
Your SMTP environment variables are missing on the hosting platform. `.env.local` is gitignored and never deployed. Add `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` in Vercel → Settings → Environment Variables, then redeploy.

### Deleted text still shows on site
You're using `?? 'Default text'` fallback pattern. Change to `default = ''` + conditional rendering `{field && <Element>}`. See Section 15.2.

### Studio CORS error
Add your domain to Sanity Dashboard → Project → API → CORS Origins with "Allow credentials" checked.

### Webhook not working
1. Check webhook URL includes `?secret=YOUR_SECRET`
2. Check `SANITY_REVALIDATE_SECRET` env var matches on hosting platform
3. Check webhook projection is `{ _type, slug }`
4. Test with: `curl -X POST "https://yourdomain.com/api/revalidate?secret=YOUR_SECRET" -H "Content-Type: application/json" -d '{"_type":"homePage"}'`

### Images not loading
Ensure `cdn.sanity.io` is in `next.config.js` `images.remotePatterns`. Always null-check before calling `urlFor()`.

---

**That's it.** This guide covers the full integration from zero to production. For each new project:

1. Install dependencies (Section 3)
2. Configure Sanity (Section 4)
3. Create schemas (Sections 5-10)
4. Set up client & queries (Sections 11-12)
5. Embed Studio (Section 13-14)
6. Build frontend pages (Section 15-16)
7. Add revalidation webhook (Section 17)
8. Add contact form (Section 18)
9. Add SEO (Section 19)
10. Seed initial content (Section 20)
11. Deploy & verify (Section 21)
