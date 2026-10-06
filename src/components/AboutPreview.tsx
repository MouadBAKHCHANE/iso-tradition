"use client";

import Image from "next/image";
import { FadeIn } from "./Motion";

export default function AboutPreview() {
  return (
    <section id="apropos" className="pt-8 pb-2 sm:pb-4 lg:py-12 2xl:py-16 3xl:py-24 bg-white overflow-hidden relative scroll-mt-24 lg:scroll-mt-32">
      {/* Swiss flag background — right side */}
      <div className="absolute bottom-0 right-0 lg:right-4 xl:right-8 pointer-events-none opacity-[0.07]">
        <img loading="lazy" decoding="async" src="/images/swiss-flag-bg.webp" alt="" width={520} height={556} className="h-auto w-48 lg:w-64 xl:w-80 2xl:w-[350px] 3xl:w-[500px] object-contain" />
      </div>
      <div className="grid lg:grid-cols-2 2xl:grid-cols-2 gap-12 lg:gap-16 2xl:gap-18 3xl:gap-24 items-center relative">
        {/* ===== Left — Image flush to left edge ===== */}
        <FadeIn direction="left" className="relative">
          <div className="relative rounded-r-[20px] overflow-hidden lg:ml-0">
            <Image
              src="/images/about-install.webp"
              alt="Technicien ISO Tradition posant une fenêtre"
              width={900}
              height={700}
              className="w-full h-auto object-cover aspect-[4/3]"
            />
          </div>

            {/* Counter badge — top right, overlapping image */}
            <div className="absolute -top-2 right-4 sm:right-6 lg:right-8 2xl:right-10">
              <div className="relative bg-white flex flex-col items-center text-center pt-3 pb-3.5 px-2.5 lg:pt-3.5 lg:pb-4 lg:px-3 2xl:pt-4 2xl:pb-5 2xl:px-4 rounded-b-[16px] shadow-sm">
                <span className="block text-3xl lg:text-4xl 2xl:text-5xl font-bold leading-none">
                  <span className="text-[#f7ad0c]">+</span>
                  <span className="text-primary">35</span>
                </span>
                <span className="block text-[11px] lg:text-xs 2xl:text-sm text-primary font-medium leading-tight mt-1">
                  années<br />d&apos;expérience
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
                <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[40px] 2xl:text-[48px] 3xl:text-[60px] font-bold text-primary leading-[1.2] mb-3 lg:mb-3 xl:mb-6 2xl:mb-7 3xl:mb-8">
                  L&apos;excellence <span className="text-accent">suisse</span>
                  <br />
                  au service de votre habitat
                </h2>
              </FadeIn>

              <FadeIn direction="right" delay={0.2}>
                <p className="text-gray-500 leading-[1.6] text-[14px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px] 3xl:text-[18px] mb-4 lg:mb-3 xl:mb-6 2xl:mb-8 3xl:mb-10 max-w-lg 2xl:max-w-lg 3xl:max-w-xl">
                  Basés à Mies, Route de Suisse 7A, nous intervenons dans toute la
                  Suisse romande avec une équipe de professionnels certifiés.
                  Notre mission : allier tradition artisanale et technologies
                  modernes pour des fenêtres et portes d&apos;exception.
                </p>
              </FadeIn>

              <FadeIn direction="right" delay={0.3}>
                <a
                  href="/qui-sommes-nous"
                  className="btn border-2 border-primary/30 hover:border-accent text-primary hover:text-accent group"
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

            {/* Bottom block: tagline */}
            <div>
              <FadeIn direction="up" delay={0.5}>
                <p className="text-gray-500 leading-[1.6] text-[14px] lg:text-[13px] xl:text-[15px] 2xl:text-[16px] 3xl:text-[18px] max-w-lg 2xl:max-w-lg 3xl:max-w-xl">
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
