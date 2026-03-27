"use client";

import Image from "next/image";
import { FadeIn } from "./Motion";

export default function ServiceArea() {
  return (
    <section className="relative py-14 lg:py-20 overflow-hidden">
      {/* Background Swiss landscape */}
      <div className="absolute inset-0">
        <Image
          src="/images/suisse-paysage.jpg"
          alt="Paysage suisse"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Map — appears after text on mobile, left on desktop */}
          <FadeIn direction="left" className="order-2 lg:order-1">
            <div className="relative rounded-[20px] overflow-hidden h-[280px] sm:h-[350px] lg:h-full lg:min-h-[480px] shadow-2xl">
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white text-primary font-bold text-xs px-4 py-2 rounded-full shadow-md uppercase tracking-wider">
                  Suisse romande
                </span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d174765.26168010652!2d6.1!3d46.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c650693d02aad%3A0x13e2510e39f5bc6b!2sRoute%20de%20Suisse%207A%2C%201295%20Mies!5e0!3m2!1sfr!2sch!4v1711460000000!5m2!1sfr!2sch"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Iso Tradition — Mies, Suisse"
              />
            </div>
          </FadeIn>

          {/* Content — appears first on mobile, right on desktop */}
          <div className="order-1 lg:order-2">
            <FadeIn direction="right">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-10 bg-white/40" />
                <span className="font-secondary text-white/70 font-medium text-sm uppercase tracking-[0.2em]">
                  Zone d&apos;intervention
                </span>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-white leading-tight mb-5">
                Nous intervenons dans toute la{" "}
                <span className="text-accent">Suisse romande</span>
              </h2>
            </FadeIn>
            <FadeIn direction="right" delay={0.15}>
              <p className="text-white/80 text-[15px] leading-relaxed mb-10 max-w-md">
                Basés à Mies (VD), nous couvrons les cantons de Vaud, Genève,
                Fribourg, Valais et Neuchâtel avec un service rapide et
                professionnel.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn direction="right" delay={0.25}>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://form.typeform.com/to/astTYipT" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-6 py-3 rounded-full transition-colors text-[15px] group"
                >
                  Demander une offre
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </a>
                <a
                  href="tel:0216245300"
                  className="inline-flex items-center gap-2 text-white font-semibold text-[15px] hover:text-accent transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  021 624 53 00
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
