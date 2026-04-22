# Sanity CMS — Modèle Générique Réutilisable

Document de référence pour dupliquer la même architecture Sanity sur **n'importe quel projet Next.js**, quel que soit le secteur (services, e-commerce, restaurant, immobilier, agence, portfolio, association, etc.).

> **Principe clé** : séparer ce qui ne change jamais (infrastructure, helpers, patterns) de ce qui change à chaque projet (schémas métier, contenu).

---

## ⚙️ ARCHITECTURE EN 2 COUCHES

### Couche 1 — INFRASTRUCTURE (toujours identique)
À copier-coller tel quel sur chaque nouveau projet :
- Dépendances NPM
- Configuration Studio + CLI + Next.js
- Helpers de schéma (SEO, blockContent, image, CTA, link, button, section, etc.)
- Client Sanity + image URL builder
- Composants tracking (GA, GTM, FB, TikTok, LinkedIn, etc.)
- Composant JSON-LD générique
- Webhook revalidation
- Formulaire contact + Nodemailer
- Script de seed (template)
- Configuration Next.js (headers, images CDN)
- Sitemap + robots dynamiques

### Couche 2 — SCHÉMAS MÉTIER (adaptés au projet)
À créer/adapter selon les besoins spécifiques :
- Quels singletons (pages uniques)
- Quelles collections (entrées multiples)
- Quels champs dans chaque schéma
- Quelle structure du desk
- Quelles requêtes GROQ
- Quels composants frontend

> **Exemples par type de site** : voir section 26.

---

## 1. Dépendances NPM à installer

```bash
# Core Sanity
npm install sanity next-sanity @sanity/client @sanity/image-url

# UI / icons / types
npm install @sanity/icons @sanity/ui @sanity/types

# Peer dependency (sinon erreur de build)
npm install react-is styled-components

# Email (formulaire de contact)
npm install nodemailer
npm install -D @types/nodemailer
```

---

## 2. Variables d'environnement (`.env.local`)

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skXXXX...               # Token Editor pour seed/revalidate
SANITY_REVALIDATE_SECRET=random_secret   # Sécurise le webhook

# SMTP (Infomaniak ou autre)
SMTP_HOST=mail.infomaniak.com
SMTP_PORT=587
SMTP_USER=contact@domain.ch
SMTP_PASS=********
SMTP_FROM=contact@domain.ch
```

> Sur Vercel : ajouter les mêmes variables dans Settings → Environment Variables (Production + Preview + Development).

---

## 3. Structure de fichiers complète

```
project-root/
├── sanity.config.ts                     # Config principale Studio
├── sanity.cli.ts                        # Config CLI
├── sanity/
│   ├── deskStructure.ts                 # Structure latérale custom du Studio
│   ├── schemas/
│   │   ├── index.ts                     # Export de tous les schémas
│   │   ├── helpers/
│   │   │   ├── seoFields.ts             # Champs SEO réutilisables
│   │   │   ├── blockContent.ts          # Rich text réutilisable
│   │   │   └── ctaField.ts              # CTA réutilisable (label + url)
│   │   ├── singletons/
│   │   │   ├── siteSettings.ts          # Infos globales (1 instance)
│   │   │   ├── marketingSettings.ts     # Tracking pixels (1 instance)
│   │   │   ├── themeSettings.ts         # Couleurs/fonts (optionnel, 1 instance)
│   │   │   ├── homepage.ts              # Page d'accueil (1 instance)
│   │   │   ├── aboutPage.ts             # Qui sommes-nous (1 instance)
│   │   │   ├── contactPage.ts           # Contact (1 instance)
│   │   │   └── solutionsPage.ts         # Liste des solutions (1 instance)
│   │   └── collections/
│   │       ├── product.ts               # Produits/services (multiple)
│   │       ├── blogPost.ts              # Articles de blog (multiple)
│   │       └── legalPage.ts             # Pages légales (multiple)
│   └── seed/
│       └── seed.ts                      # Script d'import initial
├── src/
│   ├── app/
│   │   ├── studio/[[...tool]]/page.tsx  # Studio embarqué à /studio
│   │   ├── api/
│   │   │   ├── revalidate/route.ts      # Webhook ISR
│   │   │   └── contact/route.ts         # Envoi email Nodemailer
│   │   ├── sitemap.ts                   # Sitemap dynamique depuis Sanity
│   │   └── robots.ts
│   ├── lib/
│   │   ├── sanity.ts                    # Client + image URL builder
│   │   ├── queries.ts                   # Toutes les requêtes GROQ
│   │   └── jsonld.ts                    # Helpers Schema.org
│   └── components/
│       ├── tracking/
│       │   ├── GoogleAnalytics.tsx
│       │   ├── GoogleTagManager.tsx
│       │   ├── FacebookPixel.tsx
│       │   ├── TikTokPixel.tsx
│       │   ├── LinkedInInsight.tsx
│       │   └── CustomScripts.tsx
│       └── seo/
│           └── JsonLd.tsx
```

---

## 4. Configuration Studio (`sanity.config.ts`)

Options à inclure :
- `name` + `title` du projet
- `projectId` et `dataset` depuis env
- `basePath: "/studio"` (route Next.js)
- Plugins :
  - `structureTool` avec `deskStructure` custom
  - (Optionnel) `visionTool` pour tester les requêtes GROQ
  - (Optionnel) `media` plugin pour gestion centralisée des images
- Schema types importés depuis `./sanity/schemas`

---

## 5. Desk Structure custom (`sanity/deskStructure.ts`)

Organisation du panneau latéral du Studio en sections logiques :

```
📁 Configuration globale (en haut, avec icônes)
   - Infos du site (siteSettings)
   - Marketing & Analytics (marketingSettings)
   - Thème & Design (themeSettings)

📁 Pages (singletons)
   - Accueil (homepage)
   - Qui sommes-nous (aboutPage)
   - Contact (contactPage)
   - Liste solutions (solutionsPage)

📁 Solutions / Produits (collection)
   - Liste des produits

📁 Blog (collection)
   - Articles

📁 Pages légales (collection)
   - CGU, CGV, Mentions, Confidentialité, etc.
```

Chaque singleton doit être :
- Affiché comme **document unique** (pas de liste)
- Sans bouton "Créer nouveau"
- Sans suppression possible

---

## 6. Helpers de schéma réutilisables

### 6.1 Champs SEO (`helpers/seoFields.ts`)

À inclure dans **chaque page** (singletons + collections) :

| Champ | Type | Description |
|---|---|---|
| `seoTitle` | string (max 60) | Meta title — remplace le titre dans Google |
| `seoDescription` | text (max 160) | Meta description |
| `seoKeywords` | array of strings | Mots-clés (tags) |
| `ogImage` | image (1200x630) | Image de partage social (FB, LinkedIn, WhatsApp) |
| `noIndex` | boolean | Masquer aux moteurs de recherche |
| `canonicalUrl` | url (optionnel) | URL canonique custom |

### 6.2 Block Content (`helpers/blockContent.ts`)

Rich text réutilisable pour blogs et pages légales :
- Styles : Normal, H2, H3, H4, blockquote
- Listes : à puces et numérotées
- Marks : gras, italique
- Annotations : liens (avec option `target=_blank`)
- Inline : images avec hotspot et alt

### 6.3 CTA Field (`helpers/ctaField.ts`)

Champ réutilisable pour boutons d'appel à l'action :
- `label` (string)
- `url` (string ou référence)
- `style` (primary/secondary/outline)
- `external` (boolean)

---

## 7. Schémas singletons (1 instance chacun)

### 7.1 `siteSettings.ts` — Infos globales

**Groupes** : `general`, `contact`, `social`, `cta`

| Champ | Type | Description |
|---|---|---|
| `siteName` | string | Nom de l'entreprise |
| `siteTagline` | string | Slogan court |
| `logo` | image | Logo principal (transparent) |
| `logoWhite` | image | Logo blanc (pour fonds sombres) |
| `favicon` | image | Favicon |
| `phone` | string | Téléphone (format international) |
| `email` | string | Email principal |
| `address` | object | rue, ville, CP, pays |
| `openingHours` | text | Horaires d'ouverture |
| `appointmentText` | string | Ex: "Sur rendez-vous" |
| `socialLinks` | array | Facebook, Instagram, LinkedIn, YouTube, TikTok |
| `mainCtaLabel` | string | Texte du CTA principal (ex: "Demander une offre") |
| `mainCtaUrl` | url | URL du CTA principal |
| `secondaryCtaLabel` | string | CTA secondaire |
| `secondaryCtaUrl` | url | URL CTA secondaire |
| `legalCompanyName` | string | Raison sociale (pour mentions légales) |
| `legalTaxNumber` | string | Numéro TVA / IDE |

### 7.2 `marketingSettings.ts` — Tracking & Analytics

**Groupes** : `analytics`, `pixels`, `customScripts`, `consent`

#### Analytics
- `googleAnalyticsId` — Format `G-XXXXXXXXXX` (validation regex)
- `googleTagManagerId` — Format `GTM-XXXXXXX`
- `googleSearchConsoleVerification` — Code de vérification

#### Pixels publicitaires
- `facebookPixelId` — Meta Pixel ID
- `tiktokPixelId` — TikTok Pixel ID
- `linkedinPartnerId` — LinkedIn Insight Tag Partner ID
- `googleAdsId` — Format `AW-XXXXXXXXX`
- `pinterestTagId` — Pinterest Tag ID
- `snapchatPixelId` — Snapchat Pixel ID

#### Scripts custom
- `headScripts` — Texte HTML/JS injecté dans `<head>` (Hotjar, Crisp, Tawk, etc.)
- `bodyStartScripts` — Scripts juste après `<body>` (GTM noscript)
- `bodyEndScripts` — Scripts avant `</body>`

#### Cookie Consent (RGPD)
- `cookieConsentEnabled` (boolean)
- `cookieConsentMessage` (text)
- `cookieConsentPrivacyLink` (string)
- `cookieConsentAcceptLabel` (string)
- `cookieConsentRejectLabel` (string)

### 7.3 `themeSettings.ts` — Design (optionnel mais puissant)

Permet de changer les couleurs/fonts depuis le CMS :
- `primaryColor` (color picker)
- `secondaryColor`
- `accentColor`
- `fontFamily` (select : Inter, Outfit, Bai Jamjuree, etc.)
- `borderRadius` (select : sharp / rounded / pill)

> Injecté en CSS variables au runtime via `<style>` dans le layout.

### 7.4 `homepage.ts` — Page d'accueil

**Groupes** : `hero`, `about`, `solutions`, `whyUs`, `strengths`, `cta`, `faq`, `seo`

Sections complètes :
- **Hero** : overline, titre (avec accent), sous-titre, image fond, CTA principal, CTA tél
- **AboutPreview** : titre, texte, image, badge stat (chiffre + label), CTA
- **Solutions intro** : titre, sous-titre, CTA "voir tout"
- **WhyReplace** : titre, paragraphes (array), liste de bénéfices
- **Strengths** : titre, 3 cards (icône, titre, description, image)
- **ProjectCTA** : titre, sous-titre, CTA, image fond
- **ServiceArea** : titre, liste de cantons/zones, carte
- **FAQ** : titre, liste questions/réponses
- + Champs SEO

### 7.5 `aboutPage.ts` — Qui sommes-nous

- **Hero** : breadcrumb, titre, intro
- **Mission** : titre, paragraphes
- **Stats** : array (chiffre, label, icône)
- **Values / Atouts** : array (titre, description, icône)
- **Team** : array (nom, rôle, photo, bio)
- **History** : timeline (année, événement)
- **Zones d'intervention** : array de cantons + image carte
- + Champs SEO

### 7.6 `contactPage.ts` — Contact

- **Hero** : titre, sous-titre
- **Contact cards** : array (titre, valeur, icône, lien)
- **Form services** : array de strings (services dans le dropdown du form)
- **Map** : lien Google Maps embed, titre, description
- **Hours** : array (jour, horaire) ou texte simple
- **Office image** : image
- + Champs SEO

### 7.7 `solutionsPage.ts` — Liste des solutions

- **Hero** : titre, sous-titre
- **Why choose us** : array (icône, titre, description)
- **Subventions card** : titre, texte, image, CTA
- + Champs SEO

---

## 8. Schémas collections (multiples instances)

### 8.1 `product.ts` — Produits / Services (le plus important)

**Groupes** : `general`, `hero`, `why`, `advantages`, `types`, `personalisation`, `info`, `faq`, `seo`

| Champ | Type | Description |
|---|---|---|
| `name` | string | Nom du produit |
| `slug` | slug (depuis name) | URL du produit |
| `order` | number | Ordre d'affichage |
| `heroImage` | image | Image du hero |
| `intro` | text | Description d'intro |
| `materials` | array of strings | Matériaux disponibles (PVC, Alu, Bois...) |
| `whyTitle` | string | Titre section "Pourquoi" |
| `whyText` | text | Texte section "Pourquoi" |
| `whyImage` | image | Image section "Pourquoi" |
| `advantages` | array of strings | Liste des avantages |
| `advantagesImage` | image | Image fond section atouts |
| `typesLabel` | string | Label de groupe (ex: "Matériaux", "Types") |
| `typesVertical` | boolean | Layout vertical des cards |
| `types` | array of objects | { name, description, image } |
| `personalisationLabel` | string | Label (ex: "Vitrages") |
| `personalisation` | array of objects | { name, description, image } |
| `personalisationOptions` | array of objects | { icon, label, values?, items? } |
| `didYouKnow` | text | Encart "Le saviez-vous ?" |
| `faq` | array of objects | { question, answer } |
| + champs SEO | | |

### 8.2 `blogPost.ts` — Articles de blog

| Champ | Type |
|---|---|
| `title` | string |
| `slug` | slug |
| `excerpt` | text (max 200) |
| `coverImage` | image (avec alt) |
| `category` | string ou référence |
| `tags` | array of strings |
| `publishedAt` | datetime |
| `author` | object ou référence (nom, photo, bio) |
| `readingTime` | number (minutes) |
| `body` | blockContent (rich text) |
| `relatedPosts` | array of references |
| + SEO | |

### 8.3 `legalPage.ts` — Pages légales

| Champ | Type |
|---|---|
| `title` | string |
| `slug` | slug |
| `lastUpdated` | date |
| `body` | blockContent |
| + SEO | |

---

## 9. Singletons — Configuration spéciale

Tous les singletons doivent :
1. Être marqués `__experimental_actions: ["update", "publish"]` (pas de delete/create)
2. Apparaître dans le desk structure comme un seul document
3. Avoir un `id` fixe (ex: `siteSettings`, `homepage`)
4. Être créés une seule fois via le script de seed

---

## 10. Client Sanity (`src/lib/sanity.ts`)

```ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,    // false pour le client de mutation
});

const builder = imageUrlBuilder(client);
export function urlForImage(source: any) {
  return builder.image(source);
}
```

> Pour les mutations / écritures : créer un second client avec `useCdn: false` + `token: SANITY_API_TOKEN`.

---

## 11. Requêtes GROQ (`src/lib/queries.ts`)

Une fonction par page/document :

- `getSiteSettings()` — singleton
- `getMarketingSettings()` — singleton
- `getHomePage()` — singleton avec toutes les sections
- `getAboutPage()` — singleton
- `getContactPage()` — singleton
- `getSolutionsPage()` — singleton
- `getAllProducts()` — collection ordonnée par `order`
- `getProductBySlug(slug)` — un produit complet
- `getAllBlogPosts()` — collection paginée par `publishedAt`
- `getBlogPostBySlug(slug)` — un post complet + posts liés
- `getAllLegalPages()` — collection
- `getLegalPageBySlug(slug)` — une page légale

**Important** : utiliser `await` dans `generateMetadata` ET dans le composant pour éviter les doubles fetchs (ou utiliser React Cache).

---

## 12. Image Handling

- `urlForImage(image).width(W).height(H).format("webp").quality(85).url()`
- Toujours préciser `width` pour optimiser
- Utiliser `.format("webp")` ou `.auto("format")` pour servir le meilleur format
- Configurer `next.config.ts` :
  ```ts
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    minimumCacheTTL: 31536000,
  }
  ```

---

## 13. Studio embarqué Next.js

Fichier : `src/app/studio/[[...tool]]/page.tsx`

```tsx
"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}

export const dynamic = "force-static";
```

> URL : `https://www.domain.com/studio` — protégé par mot de passe Sanity

---

## 14. Webhook de revalidation (`src/app/api/revalidate/route.ts`)

- Reçoit POST de Sanity quand un document est publié
- Vérifie le secret dans le header
- Appelle `revalidatePath` ou `revalidateTag` selon le type de document
- Logique :
  - `homepage` → revalidate `/`
  - `aboutPage` → revalidate `/qui-sommes-nous`
  - `product` → revalidate `/nos-solutions/[slug]` + `/nos-solutions`
  - `blogPost` → revalidate `/actualites/[slug]` + `/actualites`
  - `siteSettings`, `marketingSettings` → revalidate `/` (layout)

**Configuration côté Sanity** :
1. Sanity Manage → API → Webhooks → Add
2. URL : `https://www.domain.com/api/revalidate`
3. Trigger on : Create, Update, Delete
4. HTTP Method : POST
5. Header : `Authorization: Bearer {SANITY_REVALIDATE_SECRET}`

---

## 15. Composants Tracking (front)

Un composant client par tracker, chargé conditionnellement depuis le layout root selon les valeurs dans `marketingSettings` :

### `GoogleAnalytics.tsx`
```tsx
"use client";
import Script from "next/script";
export default function GA({ id }: { id: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');`}</Script>
    </>
  );
}
```

### `GoogleTagManager.tsx`
- Script `<head>` + `<noscript>` iframe en début de `<body>`

### `FacebookPixel.tsx`
- Script `fbq('init', PIXEL_ID); fbq('track', 'PageView');`
- + image noscript de fallback

### `TikTokPixel.tsx`
- Script TikTok Events SDK

### `LinkedInInsight.tsx`
- Script LinkedIn Partner

### `CustomScripts.tsx`
- Composant qui injecte les `headScripts` / `bodyStartScripts` / `bodyEndScripts` du CMS via `dangerouslySetInnerHTML`

### Intégration dans `layout.tsx`

```tsx
const marketing = await getMarketingSettings();

return (
  <html>
    <head>
      {marketing?.googleAnalyticsId && <GoogleAnalytics id={marketing.googleAnalyticsId} />}
      {marketing?.googleTagManagerId && <GoogleTagManager id={marketing.googleTagManagerId} />}
      {marketing?.facebookPixelId && <FacebookPixel id={marketing.facebookPixelId} />}
      {marketing?.tiktokPixelId && <TikTokPixel id={marketing.tiktokPixelId} />}
      {marketing?.linkedinPartnerId && <LinkedInInsight id={marketing.linkedinPartnerId} />}
      {marketing?.headScripts && <CustomScripts position="head" content={marketing.headScripts} />}
    </head>
    <body>
      {marketing?.bodyStartScripts && <CustomScripts position="body-start" content={marketing.bodyStartScripts} />}
      {children}
      {marketing?.bodyEndScripts && <CustomScripts position="body-end" content={marketing.bodyEndScripts} />}
    </body>
  </html>
);
```

---

## 16. SEO dynamique par page

Sur chaque page, utiliser `generateMetadata` :

```tsx
export async function generateMetadata(): Promise<Metadata> {
  const data = await getProductBySlug(params.slug);
  return {
    title: data?.seoTitle || data?.name,
    description: data?.seoDescription || data?.intro,
    keywords: data?.seoKeywords,
    openGraph: {
      title: data?.seoTitle || data?.name,
      description: data?.seoDescription || data?.intro,
      images: data?.ogImage ? [urlForImage(data.ogImage).width(1200).height(630).url()] : [],
    },
    robots: data?.noIndex ? { index: false, follow: false } : undefined,
    alternates: { canonical: `/nos-solutions/${params.slug}` },
  };
}
```

---

## 17. JSON-LD par type de page

Helper `src/lib/jsonld.ts` avec fonctions :
- `localBusinessJsonLd()` — homepage
- `organizationJsonLd()` — layout
- `productJsonLd(product)` — page produit
- `serviceJsonLd(service)` — page service
- `faqPageJsonLd(faqs)` — section FAQ
- `blogPostingJsonLd(post)` — page blog
- `breadcrumbJsonLd(items)` — toutes les pages internes
- `websiteJsonLd()` — homepage avec searchAction

Composant `<JsonLd data={...}/>` qui rend un `<script type="application/ld+json">`.

---

## 18. Sitemap dynamique depuis Sanity

`src/app/sitemap.ts` :

```ts
export default async function sitemap() {
  const [products, blogPosts, legalPages] = await Promise.all([
    getAllProducts(),
    getAllBlogPosts(),
    getAllLegalPages(),
  ]);

  const base = "https://www.domain.com";
  return [
    { url: base, priority: 1, changeFrequency: "monthly" },
    { url: `${base}/qui-sommes-nous`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.7 },
    ...products.map((p) => ({
      url: `${base}/nos-solutions/${p.slug.current}`,
      lastModified: p._updatedAt,
      priority: 0.8,
    })),
    ...blogPosts.map((p) => ({
      url: `${base}/actualites/${p.slug.current}`,
      lastModified: p._updatedAt,
      priority: 0.6,
    })),
    ...legalPages.map((p) => ({
      url: `${base}/${p.slug.current}`,
      priority: 0.2,
    })),
  ];
}
```

---

## 19. Formulaire de contact avec Nodemailer

`src/app/api/contact/route.ts` :
- POST avec `{ name, email, phone, service, message }`
- Validation server-side
- Envoi via Nodemailer (SMTP Infomaniak)
- Email HTML formaté
- Reply-To : email du visiteur
- Réponse JSON `{ success: true }` ou `{ error: "..." }`

Le formulaire frontend appelle `/api/contact` en POST avec gestion d'état (loading, success, error).

---

## 20. Script de seed (`sanity/seed/seed.ts`)

Script Node qui :
1. Lit les `const product = {...}` actuels du code
2. Crée les documents singletons (`siteSettings`, `homepage`, etc.)
3. Crée les produits de la collection
4. Upload les images via `client.assets.upload()`
5. Lance avec `npx sanity exec sanity/seed/seed.ts --with-user-token`

Permet d'avoir un environnement Sanity peuplé en 1 commande après `npx sanity init`.

---

## 21. Configuration Next.js (`next.config.ts`)

```ts
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(webp|avif|woff2|woff|ttf|png|jpg|jpeg)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};
```

---

## 22. Patterns transversaux à reproduire

| Pattern | Description |
|---|---|
| **Singleton avec ID fixe** | Empêche la création de doublons |
| **Champs groupés (groups)** | Onglets dans le Studio pour organiser les champs |
| **Conditional fields (`hidden`)** | Masque/affiche un champ selon un autre (ex: `noIndex` cache `canonicalUrl`) |
| **Validation Zod-like** | `Rule.required().max(60)` etc. |
| **Slug from name** | Auto-génération avec `source: "name"` |
| **Reference filter** | Empêche les références vers soi-même |
| **Ordered list** | Tri par champ `order` ou drag-and-drop |
| **Preview custom** | `prepare()` pour afficher titre + sous-titre + media dans la liste |
| **Image hotspot** | `options: { hotspot: true }` pour cropper depuis le CMS |
| **Initial value** | Valeur par défaut au create |

---

## 23. Checklist de déploiement

- [ ] Variables d'env ajoutées sur Vercel (Production + Preview)
- [ ] Webhook Sanity configuré vers `/api/revalidate`
- [ ] CORS Sanity : ajouter le domaine de prod
- [ ] Studio accessible à `/studio` et protégé
- [ ] Sitemap accessible à `/sitemap.xml`
- [ ] Robots accessible à `/robots.txt`
- [ ] Test : publier un changement dans Sanity → vérifier que la page se met à jour < 30s
- [ ] Test : envoyer un message via le formulaire → vérifier réception email
- [ ] Test : Google Search Console + soumission sitemap
- [ ] Test : Facebook Sharing Debugger (https://developers.facebook.com/tools/debug/)
- [ ] Test : LinkedIn Post Inspector (https://www.linkedin.com/post-inspector/)
- [ ] Test : Rich Results Test Google (JSON-LD)

---

## 24. Pour dupliquer sur un nouveau site

1. Copier la structure de fichiers `sanity/`, `src/lib/`, `src/components/tracking/`, `src/components/seo/`
2. Renommer dans `sanity.config.ts` (`name`, `title`)
3. `npx sanity init` → nouveau projet, nouveau projectId
4. Mettre à jour `.env.local` avec les nouveaux IDs
5. Adapter les schémas selon le type de site (ajouter/retirer des champs métier)
6. Adapter le seed script avec le contenu initial
7. Lancer le seed
8. Configurer le webhook
9. Connecter les composants frontend aux nouvelles requêtes GROQ

> **Temps estimé pour duplication complète** : 2-4h une fois la structure maîtrisée.

---

## 25. Approche modulaire : Page Builder dynamique

**Pour un maximum de flexibilité**, utiliser le pattern "Page Builder" : chaque page est une **liste de sections** réutilisables.

### Principe

```ts
// homepage.ts
fields: [
  defineField({
    name: "sections",
    title: "Sections de la page",
    type: "array",
    of: [
      { type: "heroSection" },
      { type: "textImageSection" },
      { type: "featuresSection" },
      { type: "ctaSection" },
      { type: "faqSection" },
      { type: "testimonialsSection" },
      { type: "blogListSection" },
      { type: "contactFormSection" },
      { type: "galleryGridSection" },
      { type: "pricingTableSection" },
      { type: "videoSection" },
      { type: "mapSection" },
      { type: "newsletterSection" },
      { type: "logoCloudSection" },
      { type: "statsSection" },
      { type: "teamSection" },
      { type: "timelineSection" },
      // ... ajouter selon les besoins
    ],
  }),
]
```

L'éditeur peut **drag & drop** les sections, en ajouter, les supprimer, les réordonner depuis le Studio.

### Composants frontend correspondants

```tsx
// app/page.tsx
const data = await getHomePage();

return (
  <main>
    {data.sections.map((section) => {
      switch (section._type) {
        case "heroSection":         return <HeroSection key={section._key} {...section} />;
        case "textImageSection":    return <TextImageSection key={section._key} {...section} />;
        case "featuresSection":     return <FeaturesSection key={section._key} {...section} />;
        case "ctaSection":          return <CtaSection key={section._key} {...section} />;
        case "faqSection":          return <FaqSection key={section._key} {...section} />;
        case "testimonialsSection": return <Testimonials key={section._key} {...section} />;
        // ...
      }
    })}
  </main>
);
```

### Bibliothèque de sections génériques (à créer une fois, réutiliser partout)

| Section | Champs | Cas d'usage |
|---|---|---|
| `heroSection` | titre, sous-titre, image, CTA, layout (left/center/right) | Toute page |
| `textImageSection` | titre, texte, image, position image (left/right), CTA | À propos, services |
| `featuresSection` | titre, intro, items[] (icône, titre, texte), columns (2/3/4) | Atouts, services, valeurs |
| `ctaSection` | titre, sous-titre, image fond, CTA principal + secondaire | Conversion |
| `faqSection` | titre, items[] (question, réponse) | Toute page |
| `testimonialsSection` | titre, témoignages[] (nom, rôle, photo, citation, note) | Trust |
| `blogListSection` | titre, nombre d'articles, catégorie filter | Homepage, sidebar |
| `contactFormSection` | titre, sous-titre, services dropdown, success message | Contact, landing |
| `galleryGridSection` | titre, images[], columns | Portfolio, réalisations |
| `pricingTableSection` | titre, plans[] (nom, prix, features, CTA, featured) | SaaS, services |
| `videoSection` | titre, video URL, thumbnail, autoplay | Démo, présentation |
| `mapSection` | titre, lat/lng, zoom, marker text | Contact, localisation |
| `newsletterSection` | titre, sous-titre, placeholder, success message | Footer, blog |
| `logoCloudSection` | titre, logos[] (image, nom, lien) | Partenaires, clients |
| `statsSection` | titre, stats[] (chiffre, label, icône) | About, atouts |
| `teamSection` | titre, membres[] (photo, nom, rôle, bio, social) | About |
| `timelineSection` | titre, événements[] (année, titre, description, image) | Histoire |
| `accordionSection` | titre, items[] (titre, contenu rich text) | Détails, spécifications |
| `tabsSection` | tabs[] (label, contenu) | Documentation |
| `comparisonTableSection` | colonnes[], lignes[] | Comparatif produits |
| `processStepsSection` | titre, étapes[] (numéro, titre, description, icône) | Process, méthodologie |
| `quoteSection` | citation, auteur, photo | Bloc citation |
| `richTextSection` | blockContent | Contenu libre |
| `imageBannerSection` | image full-width, parallax, overlay text | Coupure visuelle |
| `embedSection` | code HTML embed (iframe, codepen, etc.) | Intégrations tierces |

> **Avantage** : un éditeur peut créer une page from scratch sans coder, juste en empilant des sections. Le frontend les rend automatiquement.

### Hybride : Sections + champs fixes

Pour des pages très structurées (ex: page produit e-commerce), mixer :
- **Champs fixes** au top (nom, prix, images principales, etc.)
- **Sections libres** au bottom (description longue, FAQ, témoignages, etc.)

---

## 26. Exemples d'adaptation par type de projet

### 26.1 Site de services (notre cas — ISO Tradition)

| Schéma | Type |
|---|---|
| `siteSettings` | singleton |
| `marketingSettings` | singleton |
| `homepage` | singleton (sections drag-and-drop) |
| `aboutPage` | singleton |
| `contactPage` | singleton |
| `service` (ex-product) | collection |
| `blogPost` | collection |
| `legalPage` | collection |
| `testimonial` | collection (référencé dans sections) |
| `caseStudy` | collection (réalisations) |

### 26.2 E-commerce

| Schéma | Type |
|---|---|
| `siteSettings` | singleton |
| `marketingSettings` | singleton |
| `homepage` | singleton (sections) |
| `category` | collection (avec parent pour hiérarchie) |
| `product` | collection (variantes, prix, stock, SKU, images, specs, related) |
| `collection` | collection (curated products) |
| `brand` | collection |
| `promo` | collection (codes, périodes, conditions) |
| `review` | collection |
| `order` | collection (si gestion interne) |

### 26.3 Restaurant

| Schéma | Type |
|---|---|
| `siteSettings` | singleton |
| `marketingSettings` | singleton |
| `homepage` | singleton (sections) |
| `aboutPage` | singleton |
| `reservationPage` | singleton |
| `menu` | collection (entrées, plats, desserts) |
| `menuCategory` | collection |
| `dish` | collection (nom, prix, allergènes, photo, ingrédients) |
| `event` | collection (événements spéciaux) |
| `chef` | collection |

### 26.4 Immobilier

| Schéma | Type |
|---|---|
| `siteSettings` | singleton |
| `marketingSettings` | singleton |
| `homepage` | singleton |
| `property` | collection (titre, prix, surface, pièces, lat/lng, photos[], status) |
| `propertyType` | collection |
| `agent` | collection |
| `neighborhood` | collection |
| `testimonial` | collection |

### 26.5 Portfolio / Agence

| Schéma | Type |
|---|---|
| `siteSettings` | singleton |
| `marketingSettings` | singleton |
| `homepage` | singleton (sections) |
| `aboutPage` | singleton |
| `project` | collection (titre, client, année, catégories, images, video, description) |
| `service` | collection |
| `client` | collection (logos pour LogoCloud) |
| `teamMember` | collection |
| `award` | collection |
| `blogPost` | collection |

### 26.6 Association / ONG

| Schéma | Type |
|---|---|
| `siteSettings` | singleton |
| `donationSettings` | singleton |
| `homepage` | singleton |
| `mission` | singleton |
| `program` | collection (actions, programmes) |
| `event` | collection |
| `news` | collection |
| `member` | collection |
| `donor` | collection (avec niveau) |
| `report` | collection (rapports annuels PDFs) |

### 26.7 SaaS / Produit tech

| Schéma | Type |
|---|---|
| `siteSettings` | singleton |
| `marketingSettings` | singleton |
| `homepage` | singleton |
| `feature` | collection (page par fonctionnalité) |
| `pricing` | singleton (plans[]) |
| `integration` | collection |
| `useCase` | collection |
| `customer` | collection (case studies) |
| `changelog` | collection |
| `docPage` | collection (documentation) |
| `blogPost` | collection |

---

## 27. Méthodologie pour adapter à un nouveau projet

### Étape 1 — Audit du site cible
- Lister toutes les pages
- Lister toutes les sections de chaque page
- Identifier le contenu **statique** (jamais modifié) vs **dynamique** (à éditer)
- Identifier les **collections** (ce qui se répète : produits, articles, événements...)
- Identifier les **références croisées** (un produit cite des témoignages, un article cite un auteur, etc.)

### Étape 2 — Choix des schémas
- **Singletons** : pour les pages uniques (homepage, about, contact)
- **Collections** : pour les entrées multiples (produits, articles)
- **Sub-documents** (référencés) : pour les éléments réutilisés (auteurs, catégories, témoignages)
- **Inline objects** : pour ce qui n'existe que dans un parent (sections d'une page)

### Étape 3 — Décision page builder vs schéma fixe
- **Page builder** (sections drag-and-drop) → si l'éditeur doit pouvoir restructurer la page
- **Schéma fixe** → si la structure ne change jamais (ex: page produit)
- **Hybride** → champs fixes + bloc de sections libres en bas

### Étape 4 — Réutilisation maximale
Avant de créer un nouveau type, vérifier si un existant convient :
- Besoin d'une "section avec image et texte" ? → réutiliser `textImageSection`
- Besoin d'un "tableau de tarifs" ? → réutiliser `pricingTableSection`
- Besoin d'une "FAQ" ? → réutiliser `faqSection`

### Étape 5 — Helpers communs
Toujours réutiliser :
- `seoFields` (sur chaque page)
- `blockContent` (pour tout texte riche)
- `ctaField` (pour tout bouton)
- `imageWithAlt` (pour toute image)
- `linkField` (interne ou externe)

### Étape 6 — Validation des champs
Toujours ajouter :
- `Rule.required()` sur les champs critiques
- `Rule.max()` sur les titres (60 car. SEO)
- `Rule.regex()` sur les formats (téléphone, codes tracking, etc.)
- `Rule.min().max()` sur les arrays (ex: 3-6 features)

### Étape 7 — Preview custom
Sur chaque schéma, définir un `preview` qui affiche dans le Studio :
- Le titre
- Un sous-titre informatif (slug, date, statut)
- Une image (media)

### Étape 8 — Desk structure
Organiser le panneau latéral logiquement :
- Configuration en haut
- Pages au milieu
- Collections en bas
- Avec icônes et regroupements

---

## 28. Champs courants à connaître (catalogue)

### Champs primitifs
- `string` — court (titre, label)
- `text` — long (description, paragraphe)
- `number` — chiffre
- `boolean` — toggle
- `date` — date seule
- `datetime` — date + heure
- `slug` — URL friendly (avec source)
- `url` — lien externe validé
- `email` — email validé

### Champs composés
- `image` — avec hotspot, alt, caption
- `file` — PDF, vidéo, etc.
- `array` — liste (de strings, d'objets, de références)
- `object` — sous-objet structuré
- `reference` — lien vers un autre document
- `geopoint` — coordonnées GPS (lat/lng)
- `color` — sélecteur couleur (plugin)
- `code` — bloc de code avec syntax highlighting

### Champs riches
- `block` / `blockContent` — éditeur rich text WYSIWYG
- `portableText` — alias

### Options communes (sur tous les champs)
- `validation` — règles
- `description` — aide affichée
- `placeholder` — placeholder dans le champ
- `initialValue` — valeur par défaut
- `readOnly` — lecture seule
- `hidden` — caché conditionnellement (function)
- `group` — onglet du Studio
- `fieldset` — regroupement visuel
- `options` — paramètres spécifiques au type (layout, list, etc.)

### Options sur arrays
- `of: [...]` — types acceptés
- `options.layout: "grid" | "tags"` — affichage
- `options.sortable: true` — drag & drop reorder

### Options sur strings
- `options.list: [...]` — dropdown de choix prédéfinis
- `options.layout: "radio" | "dropdown"` — affichage

### Options sur images
- `options.hotspot: true` — crop depuis le Studio
- `options.metadata: ["lqip", "palette"]` — extraire blurhash, couleurs

---

## 29. Patterns avancés à connaître

### 29.1 Conditional fields
```ts
defineField({
  name: "externalUrl",
  type: "url",
  hidden: ({ parent }) => parent?.linkType !== "external",
})
```

### 29.2 Dynamic initial values
```ts
initialValue: () => ({ publishedAt: new Date().toISOString() })
```

### 29.3 Custom preview avec media
```ts
preview: {
  select: { title: "name", subtitle: "category", media: "image" },
  prepare({ title, subtitle, media }) {
    return { title, subtitle: `Catégorie: ${subtitle}`, media };
  },
}
```

### 29.4 Validation custom
```ts
validation: (Rule) => Rule.custom((value, context) => {
  if (value && context.document?.publishedAt && value < context.document.publishedAt) {
    return "La date de fin doit être après la date de début";
  }
  return true;
})
```

### 29.5 References avec filtre
```ts
defineField({
  name: "relatedProduct",
  type: "reference",
  to: [{ type: "product" }],
  options: {
    filter: "category == $cat",
    filterParams: { cat: "fenetres" },
  },
})
```

### 29.6 Localization (i18n)
```ts
defineField({
  name: "title",
  type: "object",
  fields: [
    { name: "fr", type: "string" },
    { name: "en", type: "string" },
    { name: "de", type: "string" },
  ],
})
```

Ou utiliser le plugin `@sanity/document-internationalization`.

---

## 30. Fonctionnalités optionnelles avancées

| Feature | Use case |
|---|---|
| **Visual Editing** (`@sanity/visual-editing`) | Édition visuelle en ligne avec preview live |
| **Internationalization** (`@sanity/document-internationalization`) | Multi-langue (FR/EN/DE) |
| **Versioning / Drafts** | Workflow de validation avant publication |
| **Roles & Permissions** | Limiter l'accès admin vs éditeur |
| **Scheduled publishing** | Programmer une publication |
| **Media library plugin** | Centralisation des images réutilisables |
| **AI Assist plugin** | Génération de descriptions/SEO automatique |
| **Workflow plugin** | Statuts de validation custom |
| **Color picker plugin** | Sélecteur de couleurs visuel |
