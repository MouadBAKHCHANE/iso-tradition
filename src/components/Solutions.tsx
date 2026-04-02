"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./Motion";
import BrandIcon from "./BrandIcon";

const solutions = [
  { title: "Fenêtres", slug: "/nos-solutions/fenetres", image: "/images/sol-fenetres.webp" },
  { title: "Baies coulissantes", slug: "/nos-solutions/baies-coulissantes", image: "/images/sol-baies.webp" },
  { title: "Portes d'entrée", slug: "/nos-solutions/portes-entree", image: "/images/sol-portes.webp" },
  { title: "Volets", slug: "/nos-solutions/volets", image: "/images/sol-volets.webp" },
  { title: "Portes de garage", slug: "/nos-solutions/portes-garage", image: "/images/sol-garage.webp" },
  { title: "Stores bannes", slug: "/nos-solutions/stores-bannes", image: "/images/sol-stores.webp" },
  { title: "Films solaires", slug: "/nos-solutions/films-solaires", image: "/images/sol-film.webp" },
  { title: "Carports & Pergolas", slug: "/nos-solutions/carports-pergolas", image: "/images/sol-carport.webp" },
];

function Card({ sol }: { sol: (typeof solutions)[number] }) {
  return (
    <Link href={sol.slug} className="group relative flex-shrink-0 w-[160px] sm:w-[180px] lg:w-[200px] xl:w-[220px] 2xl:w-[240px] 3xl:w-[280px] touch-manipulation">
      <div className="relative rounded-xl overflow-hidden shadow-md group-hover:shadow-2xl group-active:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 group-active:-translate-y-3">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={sol.image}
            alt={sol.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 2xl:p-5 3xl:p-6">
            <h3 className="font-bold text-white text-xs sm:text-sm 2xl:text-base 3xl:text-xl drop-shadow-md">
              {sol.title}
            </h3>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </div>
    </Link>
  );
}

export default function Solutions() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="services" className="py-14 sm:py-16 lg:py-10 xl:py-12 2xl:py-14 3xl:py-20 bg-white relative overflow-hidden">
      {/* Background decorative icon */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-20 opacity-[0.07] pointer-events-none">
        <BrandIcon className="w-[600px] h-auto" color="#032742" />
      </div>

      {/* Header */}
      <div className="text-center px-4 mb-5 sm:mb-6 lg:mb-6 xl:mb-8 2xl:mb-10 3xl:mb-14 relative z-10">
        <FadeIn>
          <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
            <span className="h-px w-10 bg-primary/40" />
            <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">
              Nos solutions
            </span>
            <span className="h-px w-10 bg-primary/40" />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-6xl font-bold text-primary leading-tight mb-3 sm:mb-4">
            Des solutions pour chaque{" "}
            <span className="text-accent">besoin</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="flex items-center justify-center gap-4 mt-1 sm:mt-2">
            <a
              href="/nos-solutions"
              className="inline-flex items-center gap-3 border-2 border-primary/30 hover:border-accent text-primary hover:text-accent font-semibold px-6 py-2.5 2xl:px-8 2xl:py-3 3xl:px-12 3xl:py-5 rounded-full transition-all text-sm 2xl:text-base 3xl:text-2xl uppercase tracking-wider group"
            >
              Toutes nos solutions
              <svg className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 3xl:w-6 3xl:h-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Cards — horizontal scroll with arrows */}
      <div className="relative z-10">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-accent hover:text-white ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Défiler à gauche"
        >
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className={`absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-accent hover:text-white ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Défiler à droite"
        >
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
        >
          <div className="flex gap-4 sm:gap-5 lg:gap-6 px-6 sm:px-8 lg:px-[5vw] xl:px-[8vw] 2xl:px-[6vw] 3xl:px-10 w-max mx-auto 3xl:w-full 3xl:justify-center pb-4">
            {solutions.map((sol) => (
              <Card key={sol.title} sol={sol} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
