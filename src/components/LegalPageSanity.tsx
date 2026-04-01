"use client";

import Header from "./Header";
import Footer from "./Footer";
import { FadeIn } from "./Motion";
import SanityBlockContent from "./SanityBlockContent";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface LegalPageSanityProps {
  title: string;
  lastUpdated: string;
  body: any;
}

export default function LegalPageSanity({ title, lastUpdated, body }: LegalPageSanityProps) {
  return (
    <>
      <Header forceVisible />
      <main className="pt-28 lg:pt-32 pb-14 lg:pb-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-primary/40" />
              <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">
                Informations légales
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {title && (
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary leading-tight mb-4">
                {title}
              </h1>
            )}
            {lastUpdated && (
              <p className="text-primary/50 text-sm mb-10 lg:mb-14">
                Dernière mise à jour : {lastUpdated}
              </p>
            )}
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="space-y-3">
              <SanityBlockContent value={body} />
            </div>
          </FadeIn>
        </div>
      </main>
      <Footer />
    </>
  );
}
