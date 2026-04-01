"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity";

/* eslint-disable @typescript-eslint/no-explicit-any */

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4 mt-10 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl lg:text-2xl font-bold text-primary mb-4 mt-10 first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg lg:text-xl font-bold text-primary mb-3 mt-8 first:mt-0">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base lg:text-lg font-bold text-primary mb-3 mt-6 first:mt-0">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-primary/70 text-[15px] lg:text-base leading-relaxed mb-4">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic text-primary/60 mb-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1.5 text-primary/70 text-[15px] leading-relaxed pl-2 mb-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1.5 text-primary/70 text-[15px] leading-relaxed pl-2 mb-4">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-accent hover:text-accent-hover underline transition-colors"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlForImage(value).width(1200).url();
      if (!url) return null;
      return (
        <div className="my-8 rounded-[20px] overflow-hidden">
          <Image
            src={url}
            alt={value.alt || ""}
            width={1200}
            height={675}
            className="w-full h-auto"
          />
        </div>
      );
    },
  },
};

interface SanityBlockContentProps {
  value: any;
}

export default function SanityBlockContent({ value }: SanityBlockContentProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return <PortableText value={value} components={components} />;
}
