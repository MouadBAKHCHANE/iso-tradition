"use client";

import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import { FadeIn } from "./Motion";

const partners = [
  { name: "Aluplast", logo: "/images/partners/aluplast.webp", width: 428, height: 240 },
  { name: "Fenêtréa", logo: "/images/partners/fenetrea.webp", width: 560, height: 135 },
  { name: "Marquises", logo: "/images/partners/marquises.webp", width: 560, height: 107 },
  { name: "Schüco", logo: "/images/partners/schuco.webp", width: 560, height: 130 },
  { name: "Veka", logo: "/images/partners/veka.webp", width: 222, height: 240 },
];

export default function PartnersPage() {
  return (
    <>
      <Header forceVisible />
      <main className="pt-28 lg:pt-32 pb-14 lg:pb-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-primary/40" />
              <span className="font-secondary text-primary/85 font-medium text-sm uppercase tracking-[0.2em]">
                Nos partenaires
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary leading-tight mb-5">
              Nos partenaires <span className="text-accent">de confiance</span>
            </h1>
            <p className="text-primary/70 text-[15px] lg:text-base leading-relaxed max-w-3xl mb-10 lg:mb-14">
              Grâce à des collaborations de longue date avec nos fabricants partenaires suisses et européens, nous
              sommes en mesure de proposer à nos clients des matériaux de pointe fiables et durables dans le temps.
            </p>
          </FadeIn>

          {/* Logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {partners.map((partner, i) => (
              <FadeIn key={partner.name} delay={0.05 * i}>
                <div className="h-36 lg:h-44 rounded-[20px] border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-shadow flex items-center justify-center p-6 lg:p-10">
                  {/* Same visual area for every logo: wide wordmarks get wider/shorter, square marks taller */}
                  <div
                    className="relative w-[calc(4.25rem*var(--ia))] h-[calc(4.25rem/var(--ia))] lg:w-[calc(6.5rem*var(--ia))] lg:h-[calc(6.5rem/var(--ia))] max-w-full"
                    style={{ "--ia": Math.sqrt(partner.width / partner.height) } as React.CSSProperties}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="(min-width: 1024px) 260px, 40vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTA */}
          <FadeIn delay={0.2}>
            <div className="mt-14 lg:mt-20 rounded-[20px] bg-secondary px-6 py-10 lg:px-12 lg:py-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-primary mb-2">Un projet de rénovation ?</h2>
                <p className="text-primary/70 text-[15px]">
                  Nos experts vous conseillent sur les matériaux et les solutions adaptées à votre habitat.
                </p>
              </div>
              <a
                href="https://form.typeform.com/to/astTYipT"
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-2 border-primary/30 hover:border-accent text-primary hover:text-accent group self-start lg:self-auto"
              >
                Demander une offre
                <span className="btn-arrow bg-primary/10">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
