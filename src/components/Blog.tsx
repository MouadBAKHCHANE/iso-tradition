"use client";

import { motion } from "framer-motion";
import { FadeIn } from "./Motion";

interface BlogPost {
  slug?: string;
  image: string;
  tag: string;
  title: string;
  date: string;
}

const defaultPosts: BlogPost[] = [
  {
    image: "/images/blog-1.webp",
    tag: "Subventions",
    title: "Les subventions 2026 en Suisse pour la rénovation énergétique",
    date: "15 mars 2026",
  },
  {
    image: "/images/blog-2.webp",
    tag: "Conseils",
    title: "Triple vitrage ou double vitrage ? Le guide complet",
    date: "10 mars 2026",
  },
  {
    image: "/images/blog-3.webp",
    tag: "Réglementation",
    title: "Les normes Uw : qu'est-ce que c'est et pourquoi c'est important ?",
    date: "5 mars 2026",
  },
];

interface BlogProps {
  posts?: BlogPost[];
}

export default function Blog({ posts: postsProp }: BlogProps) {
  const posts = postsProp && postsProp.length > 0 ? postsProp : defaultPosts;
  return (
    <section id="actualites" className="py-14 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-10 bg-primary/40" />
                <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">
                  Actualités
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-primary leading-tight">
                Nos derniers <span className="text-accent">articles</span>
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.15}>
            <a
              href="/actualites"
              className="inline-flex items-center gap-2 border-2 border-primary/30 hover:border-accent text-primary hover:text-accent font-semibold px-6 py-2.5 rounded-full transition-colors text-sm group"
            >
              Voir tout
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </FadeIn>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.slug ? `/actualites/${post.slug}` : "/actualites"}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="group"
            >
              {/* Image wrapper — tag floats above */}
              <div className="relative mt-5 mb-5">
                {/* Tag badge — overlapping top edge */}
                <div className="absolute -top-4 left-5 z-10">
                  <span className="bg-white text-[13px] font-medium text-gray-700 px-5 py-2 rounded-full shadow-md">
                    {post.tag}
                  </span>
                </div>
                <div className="relative rounded-[20px] overflow-hidden aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Text */}
              <h3 className="font-bold text-primary text-lg leading-snug mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <span className="text-gray-400 text-sm">{post.date}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
