import Link from "next/link";
import JsonLd from "./seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

type Crumb = { name: string; url: string };

export default function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Fil d'Ariane" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.url} className="flex items-center gap-1.5">
                {i > 0 && (
                  <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                )}
                {isLast ? (
                  <span aria-current="page" className="text-white">{item.name}</span>
                ) : (
                  <Link href={item.url} className="hover:text-white transition-colors">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
