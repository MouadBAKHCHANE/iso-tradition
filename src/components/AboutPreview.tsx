"use client";

import Image from "next/image";
import { FadeIn } from "./Motion";
import BrandIcon from "./BrandIcon";

export default function AboutPreview() {
  return (
    <section id="apropos" className="py-14 lg:py-20 bg-white overflow-hidden relative">
      {/* Background brand icon — right side */}
      <div className="absolute bottom-8 right-4 lg:right-8 xl:right-16 pointer-events-none opacity-[0.06]">
        <BrandIcon className="w-40 lg:w-52 xl:w-64" color="#f8ad0c" />
      </div>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start relative">
        {/* ===== Left — Image flush to left edge ===== */}
        <FadeIn direction="left" className="relative">
          <div className="relative rounded-r-[20px] overflow-hidden lg:ml-0">
            <Image
              src="/images/about-lake.jpg"
              alt="Vue panoramique sur un lac depuis l'intérieur d'une villa"
              width={900}
              height={700}
              className="w-full h-auto object-cover aspect-[4/3] scale-125"
            />
          </div>

            {/* Counter badge — top right, overlapping image */}
            <div className="absolute -top-2 right-0 lg:right-[15%]">
              <div className="relative bg-white pt-4 pb-5 px-8 rounded-b-[20px]">
                <span className="block text-5xl lg:text-6xl font-bold leading-none">
                  <span className="text-[#f7ad0c]">+</span>
                  <span className="text-primary">35</span>
                </span>
                <span className="block text-sm text-primary font-medium mt-1">
                  années d&apos;expérience
                </span>
              </div>
            </div>
          </FadeIn>

          {/* ===== Right — Content ===== */}
          <div className="flex flex-col gap-5 lg:gap-4 xl:gap-6 lg:justify-between px-6 sm:px-10 lg:pr-16">
            {/* Top block: title + description + CTA */}
            <div>
              <FadeIn direction="right" delay={0.05}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-primary/40" />
                  <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">
                    Qui sommes-nous
                  </span>
                </div>
              </FadeIn>
              <FadeIn direction="right" delay={0.1}>
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[44px] 2xl:text-[56px] font-bold text-primary leading-[1.3] mb-3 lg:mb-3 xl:mb-6">
                  L&apos;excellence <span className="text-accent">suisse</span>
                  <br />
                  au service de votre habitat
                </h2>
              </FadeIn>

              <FadeIn direction="right" delay={0.2}>
                <p className="text-gray-500 leading-[1.6] text-[14px] lg:text-[13px] xl:text-[15px] mb-4 lg:mb-3 xl:mb-6 max-w-lg">
                  Basés à Mies, Route de Suisse 7A, nous intervenons dans toute la
                  Suisse romande avec une équipe de professionnels certifiés.
                  Notre mission : allier tradition artisanale et technologies
                  modernes pour des fenêtres et portes d&apos;exception.
                </p>
              </FadeIn>

              <FadeIn direction="right" delay={0.3}>
                <a
                  href="/qui-sommes-nous"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-semibold px-5 lg:px-5 xl:px-6 py-2.5 lg:py-2 xl:py-3 rounded-full transition-colors text-[13px] lg:text-[13px] xl:text-[15px] group"
                >
                  En savoir plus
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </a>
              </FadeIn>
            </div>

            {/* Bottom block: avatar stack + rating + tagline */}
            <div>
              <FadeIn direction="up" delay={0.4}>
                <div className="flex items-center gap-4 lg:gap-4 xl:gap-6 mb-4 lg:mb-3 xl:mb-6">
                  {/* Avatar stack */}
                  <div className="flex -space-x-4">
                    {[
                      "bg-primary/20",
                      "bg-accent/30",
                      "bg-primary/30",
                    ].map((bg, i) => (
                      <div
                        key={i}
                        className={`w-12 h-12 lg:w-11 lg:h-11 xl:w-14 xl:h-14 rounded-full ${bg} border-[3px] border-white flex items-center justify-center`}
                      >
                        <svg
                          className="w-6 h-6 text-primary/50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>

                  {/* Rating */}
                  <div>
                    <span className="block text-[15px] font-semibold text-primary">
                      4.9/5 avis clients
                    </span>
                    <div className="flex gap-0.5 mt-1">
                      {[1, 2, 3, 4].map((star) => (
                        <svg
                          key={star}
                          className="w-5 h-5 text-accent"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <svg
                        className="w-5 h-5 text-accent/30"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.5}>
                <p className="text-gray-500 leading-[1.6] text-[14px] lg:text-[13px] xl:text-[15px] max-w-lg">
                  Nous offrons des solutions fiables, adossées à des décennies
                  de savoir-faire, garantissant des résultats de qualité
                  supérieure pour chaque projet.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
    </section>
  );
}
