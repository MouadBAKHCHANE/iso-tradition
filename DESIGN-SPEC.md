# ISO TRADITION - Design Specification

## 1. DESIGN TOKENS

### 1.1 Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | #215e84 | Brand blue - headings, nav, dark cards |
| `primary-dark` | #1a4b6a | Hover states, deeper elements |
| `secondary` | #ebe9e5 | Warm beige backgrounds |
| `accent` | #f8ad0c | CTAs, key title words, active states |
| `accent-hover` | #e09a00 | Button hover |
| `white` | #ffffff | Section backgrounds, text on dark |
| `gray-200` | - | Borders, dividers |
| `gray-400` | - | Inactive icons |
| `gray-500` | - | Body text, descriptions |

**Accent Color Rules (client directive):**
- Use accent/yellow ONLY for: CTA buttons, key title keywords, FAQ active state, footer menu titles
- Do NOT use yellow text on white/beige backgrounds for body text (poor readability)
- Dominant colors: blue, beige, white
- Section tags use `text-primary/60` (muted blue), NOT accent

**Opacity scale used:** `/[0.06]`, `/[0.07]`, `/10`, `/15`, `/20`, `/25`, `/30`, `/40`, `/50`, `/60`, `/70`, `/75`, `/80`, `/85`, `/90`

### 1.2 Typography

**Font Families:**
- Primary (baseline): `Bai Jamjuree` — headings, body, CTAs
- Secondary: `Outfit` — section tags, overlines, labels

**Font Sizes per breakpoint:**

| Element | Mobile | sm | lg | xl | 2xl |
|---------|--------|-----|-----|-----|------|
| Hero H1 | text-[26px] | text-4xl | text-5xl | text-[56px] | text-[72px] |
| Section H2 | text-2xl | text-3xl | text-5xl | text-5xl | text-6xl |
| About H2 | text-2xl | text-3xl | text-[32px] | text-[44px] | text-[56px] |
| Solutions H2 | text-2xl | text-3xl | text-4xl | text-5xl | text-6xl |
| Body | text-base | text-base | text-base | text-base | text-lg |
| Section tags | text-sm | text-sm | text-sm | text-sm | text-sm |
| Card text | text-[14px] | text-[14px] | text-[14px] | text-[14px] | text-[14px] |
| Nav links | - | - | text-[12px] | text-[14px] | text-[16px] |
| CTA buttons | text-xs | text-xs | text-xs | text-sm | text-base |

**Font Weights:**
- `font-medium` (500): labels, nav links, secondary text
- `font-semibold` (600): body emphasis, some CTAs
- `font-bold` (700): all headings, CTA buttons, stat numbers

**Line Heights:**
- `leading-[1.2]`: Hero headline (tight)
- `leading-[1.3]`: Section headings
- `leading-tight`: General headings
- `leading-relaxed`: Body copy
- `leading-snug`: Blog card titles

**Letter Spacing:**
- `tracking-[0.2em]`: Section tags/overlines
- `tracking-wider`: Uppercase button labels

### 1.3 Border Radius

| Value | Usage |
|-------|-------|
| `rounded-[20px]` | Hero container, footer, header bar, major cards |
| `rounded-b-[20px]` | Nav bar (flat top, rounded bottom) |
| `rounded-r-[20px]` | About image (flush left) |
| `rounded-l-2xl` | WhyReplace image (flush right) |
| `rounded-xl` | Blog images, mobile menu items |
| `rounded-full` | All CTA buttons, badges, avatars, icons |
| `rounded-bl-[16px]/[24px]` | Stat badge corner cutout |

### 1.4 Shadows

| Value | Usage |
|-------|-------|
| `shadow-md` | Solution cards (rest), blog tags |
| `shadow-lg` | Scrolled header, mobile menu |
| `shadow-2xl` | Card hover states |
| `drop-shadow-md` | Text on images |

---

## 2. LAYOUT

### 2.1 Container Widths

- `max-w-7xl` (1280px): Standard section content
- `max-w-[1540px]`: Footer, scrolled header
- `max-w-xl / max-w-3xl / max-w-4xl`: Hero text container per breakpoint

### 2.2 Grid Systems

| Layout | Columns | Gap |
|--------|---------|-----|
| Hero nav | flex row | gap-4 lg:gap-5 xl:gap-8 2xl:gap-10 |
| About | 2-col at lg | gap-12 lg:gap-16 |
| WhyReplace | 2-col at lg | gap-10 lg:gap-6 xl:gap-16 |
| Strengths | 3-col bento at md | gap-4 |
| ProjectCTA | 2-col at lg (sticky left) | gap-12 lg:gap-20 |
| Blog | 3-col at lg, 2-col at md | gap-6 |
| FAQ | sidebar + content at lg | gap-10 lg:gap-20 |
| Footer | 5-col at lg | gap-10 lg:gap-8 |

### 2.3 Section Structure Pattern

```
<section className="py-14 lg:py-20 bg-{color}">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <!-- Tag line -->
    <FadeIn>
      <div className="flex items-center gap-3 mb-3">
        <span className="h-px w-10 bg-primary/40" />
        <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">
          SECTION TAG
        </span>
      </div>
    </FadeIn>
    <!-- Title with accent keyword -->
    <FadeIn delay={0.1}>
      <h2 className="text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-primary leading-tight">
        Title with <span className="text-accent">keyword</span>
      </h2>
    </FadeIn>
    <!-- Content -->
  </div>
</section>
```

---

## 3. SPACING

### 3.1 Section Vertical Padding

| Section | Mobile | lg | xl | 2xl |
|---------|--------|-----|-----|------|
| Hero | min-h-[85vh] | min-h-[85vh] | same | same |
| About | py-14 | py-20 | py-20 | py-20 |
| Solutions | h-screen (sticky) | same | same | same |
| WhyReplace | py-14 | py-8 | py-12 | py-12 |
| Strengths | py-16 | py-20 | py-20 | py-20 |
| ProjectCTA | py-14 | py-20 | py-20 | py-20 |
| Blog | py-14 | py-20 | py-20 | py-20 |
| ServiceArea | py-14 | py-20 | py-20 | py-20 |
| FAQ | py-14 | py-20 | py-20 | py-20 |
| Footer | py-16 lg:py-20 | same | same | same |

### 3.2 Horizontal Padding

| Context | Mobile | sm | lg | 2xl |
|---------|--------|-----|-----|------|
| Standard sections | px-4 | px-6 | px-8 | px-8 |
| Hero outer | px-2 | px-4 | px-4 | px-4 |
| Hero content | px-5 | px-12 | px-20 | px-28 |
| Footer inner | px-6 | px-10 | px-16 | px-16 |

### 3.3 Internal Spacing

- Tag to title: `mb-3` to `mb-4`
- Title to content: `mb-4` to `mb-10`
- Content to CTA: `mb-8` to `mb-10`
- Card grid gaps: `gap-4` to `gap-6`
- Nav items: `gap-4 lg:gap-5 xl:gap-8 2xl:gap-10`

---

## 4. PADDING

### 4.1 Buttons

| Variant | Padding | Text |
|---------|---------|------|
| Hero nav CTA | px-4 lg:px-5 xl:px-6 2xl:px-8 py-2 xl:py-2.5 2xl:py-3 | text-xs xl:text-sm 2xl:text-base |
| Scrolled header CTA | px-4 xl:px-6 py-2 xl:py-2.5 | text-xs xl:text-sm |
| Section CTA (large) | px-6 py-3 to px-8 py-3.5 | text-[15px] |
| About CTA (responsive) | px-5 lg:px-5 xl:px-6 py-2.5 lg:py-2 xl:py-3 | text-[13px] lg:text-[13px] xl:text-[15px] |
| Section CTA (medium) | px-6 py-2.5 | text-sm |
| Mobile menu CTA | px-4 py-3 | text-sm |

### 4.2 Cards

| Card Type | Padding |
|-----------|---------|
| Stat/Feature (Strengths) | p-8 |
| Process steps (ProjectCTA) | p-7 |
| Solution cards | p-4 (text overlay) |
| Nav bar white | px-5 lg:px-6 xl:px-10 2xl:px-14 py-3 xl:py-4 2xl:py-5 |
| Mobile menu | px-6 py-5 |

### 4.3 Header Heights

- Scrolled header: `h-16 lg:h-[68px]`
- Hero logo: `h-16 lg:h-16 xl:h-20 2xl:h-24`
- Footer logo: `h-20 lg:h-24`

---

## 5. ANIMATIONS

### 5.1 Easing

Global easing: `[0.25, 0.1, 0.25, 1]` (custom cubic-bezier)

### 5.2 FadeIn Component

| Prop | Options | Default |
|------|---------|---------|
| direction | "up" / "down" / "left" / "right" | "up" |
| delay | 0 - 0.5s | 0 |
| duration | - | 0.6s |
| viewport | - | once: true, margin: "-80px" |

**Offset by direction:**
- up: `y: 40 → 0`
- down: `y: -40 → 0`
- left: `x: 40 → 0`
- right: `x: -40 → 0`

### 5.3 Hero Entrance Sequence

| Element | Delay | Duration | Animation |
|---------|-------|----------|-----------|
| Background image | 0s | 8s | scale 1.08 → 1 (easeOut) |
| Overline | 0.3s | 0.6s | opacity 0→1, x: -30→0 |
| Headline | 0.5s | 0.7s | opacity 0→1, y: 30→0 |
| Subtext | 0.7s | 0.6s | opacity 0→1, y: 20→0 |
| CTA + phone | 0.9s | 0.6s | opacity 0→1, y: 20→0 |

### 5.4 Accordion (WhyReplace, FAQ)

- **Expand:** height: 0→auto, opacity: 0→1, duration: 0.35s
- **Collapse:** height: auto→0, opacity: 1→0, duration: 0.35s
- **Image swap (WhyReplace):** mode: "wait", scale: 1.05→1 (enter), 1→0.95 (exit), duration: 0.5s

### 5.5 Solutions Horizontal Scroll

| Property | Mobile | lg (1024px) | xl (1280px) | 2xl (1536px+) |
|----------|--------|-------------|-------------|---------------|
| Scroll range | [0.05, 0.85] | [0.05, 0.85] | [0.05, 0.85] | [0.05, 0.85] |
| X translate | "-75%" | "-55%" | "-35%" | "-25%" |
| Section height | 250vh | 280vh | 200vh | 200vh |
| Scroll hint fade | [0, 0.15] → [1, 0] | same | same | same |
| Scroll hint bounce | y: [0, 8, 0], 1.5s, infinite | same | same | same |
| Scroll hint style | text + circle border with arrow, bouncing animation | same | same | same |

### 5.6 Card Entrance (Strengths, ProjectCTA)

**Strengths cards:**
- Initial: `opacity: 0, y: 40, scale: 0.95`
- Animate: `opacity: 1, y: 0, scale: 1`
- Duration: 0.6s
- Stagger: `delay = index * 0.12`
- Viewport: `once: true, amount: 0.3`

**ProjectCTA cards:**
- Initial: `opacity: 0, y: 50, scale: 0.92`
- Animate: `opacity: 1, y: 0, scale: 1`
- Duration: 0.55s
- Stagger: `delay = colIdx * 0.18`
- Viewport: `once: true, amount: 0.4`

### 5.7 Hover Effects

| Element | Effect | Duration |
|---------|--------|----------|
| Solution cards | -translate-y-3, shadow-2xl, image scale-110, accent line | 500ms |
| Blog cards | image scale-105, title text-accent | 700ms |
| CTA buttons | bg-accent → bg-accent-hover, arrow translate-x-0.5 | default |
| Nav links | text-primary/70 → text-primary, underline width 0→100% | default |
| Footer links | text-white/60 → text-accent | default |
| Phone link | text-white/80 → text-accent | default |
| FAQ open question | text-primary → text-accent, icon bg-accent | default |
| WhyReplace active | text-primary/60 → text-primary (no accent) | 300ms |

### 5.8 Mobile Menu

- Enter: `opacity: 0, y: -10` → `opacity: 1, y: 0`, 0.25s
- Exit: reverse

---

## 6. RESPONSIVE BREAKPOINTS

### 6.1 Navigation

| Breakpoint | Behavior |
|------------|----------|
| < 1024px | Hamburger menu, logo + menu icon only |
| lg (1024px) | Full nav visible, compact sizes (12px text, gap-5) |
| xl (1280px) | Full nav, standard sizes (14px text, gap-8) |
| 2xl (1536px) | Full nav, larger (16px text, gap-10) |

### 6.2 Hero

| Breakpoint | Height | Title | Content width |
|------------|--------|-------|---------------|
| Mobile | min-h-[85vh] | text-[26px] | max-w-xl |
| sm | min-h-screen | text-4xl | max-w-xl |
| lg | min-h-[85vh] | text-5xl | max-w-xl |
| xl | min-h-[85vh] | text-[56px] | max-w-3xl |
| 2xl | min-h-[85vh] | text-[72px] | max-w-4xl |

### 6.3 About Section (Compact at lg)

| Element | lg (1024px) | xl (1280px+) |
|---------|-------------|--------------|
| Title | text-[32px] | text-[44px] |
| Body text | text-[13px] | text-[15px] |
| Margins | mb-3 | mb-6 |
| Avatars | w-11 h-11 | w-14 h-14 |
| Container gap | gap-4 | gap-6 |
| CTA | text-[13px] py-2 | text-[15px] py-3 |

### 6.4 Layouts

| Breakpoint | About | WhyReplace | Strengths | Blog |
|------------|-------|------------|-----------|------|
| Mobile | 1-col | 1-col (no image) | 1-col | 1-col |
| md | 1-col | 1-col | 2-col bento | 2-col |
| lg | 2-col | 2-col + image | 3-col bento | 3-col |

---

## 7. COMPONENT PATTERNS

### 7.1 Concave Corner (Nav Bar)

Pseudo-element technique using overflow hidden + box-shadow:
- Container: `absolute, w-[24px] h-[24px], overflow-hidden`
- Inner: `w-[48px] h-[48px] rounded-full shadow-[0_0_0_24px_white]`
- Left: `-translate-x-full, inner: -translate-x-[24px]`
- Right: `translate-x-full, inner: translate-x-0`

### 7.2 Edge-to-Edge Images

- About (left flush): No left margin, `rounded-r-[20px]`
- WhyReplace (right flush): `lg:-mr-[calc((100vw-1024px)/2+2rem)]` at lg, `xl:-mr-[calc((100vw-80rem)/2+2rem)]` at xl

### 7.3 Background Decorative Icon

- Component: `BrandIcon` (SVG window frame icon)
- Placement: `absolute, pointer-events-none`
- Opacity: `0.06` to `0.07`
- Sizes: `w-40` to `w-[600px]` depending on section

---

## 8. SECTION ORDER & BACKGROUNDS

| # | Section | Background | Key Feature |
|---|---------|-----------|-------------|
| 1 | Header (sticky) | white | Appears on scroll > 80px |
| 2 | Hero | primary gradient over image | Concave nav, entrance animations |
| 3 | AboutPreview | white | Split layout, counter badge, stars |
| 4 | Solutions | white | Horizontal scroll, sticky |
| 5 | WhyReplace | white | Accordion + image swap |
| 6 | Strengths | secondary (#ebe9e5) | Bento grid, mixed card types |
| 7 | ProjectCTA | white | 9-step process, sticky left, scrolling cards |
| 8 | Blog | white | 3-card grid with tags |
| 9 | ServiceArea | primary/85 overlay on image | Map iframe + content |
| 10 | FAQ | secondary/50 | Sidebar title + accordion |
| 11 | Footer | primary (rounded) | Multi-column, social icons |

---

## 9. EXTERNAL LINKS

| Element | URL |
|---------|-----|
| CTA "Demander une offre" | https://form.typeform.com/to/astTYipT |
| Address link | Google Maps (Iso Tradition, Mies) |
| Phone | tel:+41216245300 |
| Email | mailto:contact@isotradition.ch |
| MouaDev credit | https://wa.me/212611714711 |
