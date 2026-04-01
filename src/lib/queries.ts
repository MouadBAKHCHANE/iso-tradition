import { client } from "./sanity";

// ── Site Settings ──
export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`);
}

// ── Marketing Settings ──
export async function getMarketingSettings() {
  return client.fetch(`*[_type == "marketingSettings"][0]`);
}

// ── Homepage ──
export async function getHomepage() {
  return client.fetch(`*[_type == "homepage"][0]{
    ...,
    heroImage { asset-> { url, metadata } },
    aboutImage { asset-> { url, metadata } },
    whyReplaceImage { asset-> { url, metadata } },
    serviceAreaImage { asset-> { url, metadata } },
    "strengths": strengths[] {
      title,
      description,
      image { asset-> { url, metadata } }
    },
    ogImage { asset-> { url } }
  }`);
}

// ── About Page ──
export async function getAboutPage() {
  return client.fetch(`*[_type == "aboutPage"][0]{
    ...,
    heroImage { asset-> { url, metadata } },
    gallery[] { asset-> { url, metadata }, alt },
    missionImage { asset-> { url, metadata } },
    zonesImage { asset-> { url, metadata } },
    ogImage { asset-> { url } }
  }`);
}

// ── Contact Page ──
export async function getContactPage() {
  return client.fetch(`*[_type == "contactPage"][0]{
    ...,
    heroImage { asset-> { url, metadata } },
    ogImage { asset-> { url } }
  }`);
}

// ── Solutions Page ──
export async function getSolutionsPage() {
  return client.fetch(`*[_type == "solutionsPage"][0]{
    ...,
    heroImage { asset-> { url, metadata } },
    subventionsImage { asset-> { url, metadata } },
    ogImage { asset-> { url } }
  }`);
}

// ── Products (all) ──
export async function getAllProducts() {
  return client.fetch(`*[_type == "product"] | order(name asc) {
    name,
    "slug": slug.current,
    heroImage { asset-> { url, metadata } },
    intro
  }`);
}

// ── Product (single by slug) ──
export async function getProductBySlug(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      ...,
      "slug": slug.current,
      heroImage { asset-> { url, metadata } },
      whyImage { asset-> { url, metadata } },
      advantagesImage { asset-> { url, metadata } },
      types[] {
        name,
        description,
        image { asset-> { url, metadata } }
      },
      personalisation[] {
        name,
        description,
        image { asset-> { url, metadata } }
      },
      personalisationOptions[] {
        icon,
        label,
        values,
        items[] {
          name,
          image { asset-> { url, metadata } }
        }
      },
      ogImage { asset-> { url } }
    }`,
    { slug }
  );
}

// ── All product slugs (for generateStaticParams) ──
export async function getProductSlugs() {
  return client.fetch(`*[_type == "product"]{ "slug": slug.current }`);
}

// ── Blog posts ──
export async function getAllBlogPosts() {
  return client.fetch(`*[_type == "blogPost"] | order(date desc) {
    title,
    "slug": slug.current,
    excerpt,
    image { asset-> { url, metadata } },
    category,
    date
  }`);
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      ...,
      "slug": slug.current,
      image { asset-> { url, metadata } },
      body[] {
        ...,
        _type == "image" => { asset-> { url, metadata }, alt }
      },
      ogImage { asset-> { url } }
    }`,
    { slug }
  );
}

// ── Legal pages ──
export async function getLegalPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "legalPage" && slug.current == $slug][0]{
      ...,
      "slug": slug.current,
      body[] {
        ...,
        _type == "image" => { asset-> { url, metadata }, alt }
      },
      ogImage { asset-> { url } }
    }`,
    { slug }
  );
}
