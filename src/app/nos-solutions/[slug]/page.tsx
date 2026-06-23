import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";
import { getProductBySlug, getProductSlugs } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity";

// ── Static params for ISR / SSG ──
export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

// ── SEO metadata ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    alternates: { canonical: `/nos-solutions/${slug}` },
    title: product.seoTitle ?? `${product.name} – ISO Tradition`,
    description:
      product.seoDescription ??
      product.intro ??
      "",
    openGraph: product.ogImage
      ? { images: [{ url: product.ogImage.asset?.url ?? urlForImage(product.ogImage).url() }] }
      : undefined,
  };
}

// ── Helpers to convert Sanity image refs → URL strings ──

function imageUrl(img: unknown, width?: number): string {
  if (!img) return "";
  // If the GROQ query already resolved `asset->`, the url lives at img.asset.url
  const resolved = (img as Record<string, unknown> & { asset?: { url?: string } })?.asset?.url;
  if (resolved) return resolved;
  // Fallback: build via the image-url builder
  const b = urlForImage(img);
  return width ? b.width(width).url() : b.url();
}

function transformProduct(raw: Record<string, unknown>): {
  name: string;
  heroImage: string;
  intro: string;
  materials?: string[];
  options?: { label: string; values: string[] }[];
  whyTitle: string;
  whyText: string;
  whyImage?: string;
  advantages: string[];
  advantagesImage?: string;
  typesLabel?: string;
  typesVertical?: boolean;
  types?: { name: string; description: string; image?: string }[];
  personalisationLabel?: string;
  personalisation?: { name: string; description: string; image?: string }[];
  personalisationOptions?: {
    icon: string;
    label: string;
    values?: string[];
    items?: { name: string; image?: string }[];
  }[];
  didYouKnow?: string;
  faq: { question: string; answer: string }[];
  sections?: { id: string; visible: boolean }[];
} {
  return {
    name: raw.name as string,
    heroImage: imageUrl(raw.heroImage, 1800),
    intro: raw.intro as string,

    ...(raw.materials ? { materials: raw.materials as string[] } : {}),
    ...(raw.options
      ? { options: raw.options as { label: string; values: string[] }[] }
      : {}),

    whyTitle: raw.whyTitle as string,
    whyText: raw.whyText as string,
    ...(raw.whyImage ? { whyImage: imageUrl(raw.whyImage, 1800) } : {}),

    advantages: raw.advantages as string[],
    ...(raw.advantagesImage
      ? { advantagesImage: imageUrl(raw.advantagesImage, 1800) }
      : {}),

    ...(raw.typesLabel ? { typesLabel: raw.typesLabel as string } : {}),
    ...(raw.typesVertical ? { typesVertical: true } : {}),
    ...(raw.types
      ? {
          types: (
            raw.types as { name: string; description: string; image?: unknown }[]
          ).map((t) => ({
            name: t.name,
            description: t.description,
            ...(t.image ? { image: imageUrl(t.image, 1800) } : {}),
          })),
        }
      : {}),

    ...(raw.personalisationLabel
      ? { personalisationLabel: raw.personalisationLabel as string }
      : {}),
    ...(raw.personalisation
      ? {
          personalisation: (
            raw.personalisation as {
              name: string;
              description: string;
              image?: unknown;
            }[]
          ).map((p) => ({
            name: p.name,
            description: p.description,
            ...(p.image ? { image: imageUrl(p.image, 1800) } : {}),
          })),
        }
      : {}),

    ...(raw.personalisationOptions
      ? {
          personalisationOptions: (
            raw.personalisationOptions as {
              icon: string;
              label: string;
              values?: string[];
              items?: { name: string; image?: unknown }[];
            }[]
          ).map((opt) => ({
            icon: opt.icon,
            label: opt.label,
            ...(opt.values ? { values: opt.values } : {}),
            ...(opt.items
              ? {
                  items: opt.items.map((item) => ({
                    name: item.name,
                    ...(item.image ? { image: imageUrl(item.image) } : {}),
                  })),
                }
              : {}),
          })),
        }
      : {}),

    ...(raw.didYouKnow ? { didYouKnow: raw.didYouKnow as string } : {}),

    faq: (raw.faq as { question: string; answer: string }[]) ?? [],

    // Section visibility & ordering
    ...(raw.sections ? { sections: (raw.sections as { id: string; visible: boolean }[]).map(s => ({ id: s.id, visible: s.visible })) } : {}),
  };
}

// ── Page component (Server Component) ──
export default async function ProductSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const raw = await getProductBySlug(slug);

  if (!raw) {
    notFound();
  }

  const product = transformProduct(raw);

  return <ProductPage product={product} />;
}
