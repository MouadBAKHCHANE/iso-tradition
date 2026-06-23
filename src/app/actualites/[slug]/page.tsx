import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity";
import BlogPostClient from "./BlogPostClient";

/* eslint-disable @typescript-eslint/no-explicit-any */

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("fr-CH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  if (!posts) return [];
  return posts
    .filter((p: any) => p.slug)
    .map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    alternates: { canonical: `/actualites/${slug}` },
    title: post.seoTitle || `${post.title} – ISO Tradition`,
    description: post.seoDescription || post.excerpt || undefined,
    openGraph: {
      title: post.seoTitle || post.title || undefined,
      description: post.seoDescription || post.excerpt || undefined,
      ...(post.ogImage?.asset?.url && {
        images: [{ url: post.ogImage.asset.url }],
      }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  // If Sanity has no data for this slug, fall back to client-side hardcoded data
  if (!post) {
    return <BlogPostClient slug={slug} />;
  }

  // Fetch all posts for related articles
  const allPosts = await getAllBlogPosts();
  const relatedRaw = allPosts
    ? allPosts
        .filter((p: any) => p.slug && p.slug !== slug)
        .sort((a: any, b: any) => {
          // Prefer same category
          if (a.category === post.category && b.category !== post.category) return -1;
          if (b.category === post.category && a.category !== post.category) return 1;
          return 0;
        })
        .slice(0, 3)
    : [];

  const related = relatedRaw.map((p: any) => ({
    slug: p.slug,
    tag: p.category || "Article",
    title: p.title,
    date: formatDate(p.date),
    image: p.image?.asset
      ? urlForImage(p.image).width(800).height(600).url()
      : "/images/blog-1.webp",
  }));

  const article = {
    slug: post.slug,
    tag: post.category || "Article",
    title: post.title || "",
    date: formatDate(post.date),
    image: post.image?.asset
      ? urlForImage(post.image).width(1600).height(900).url()
      : "/images/blog-1.webp",
    body: post.body || null,
  };

  return (
    <BlogPostClient
      slug={slug}
      sanityArticle={article}
      sanityRelated={related}
    />
  );
}
