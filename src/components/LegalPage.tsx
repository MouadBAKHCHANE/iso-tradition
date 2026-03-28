"use client";

import Header from "./Header";
import Footer from "./Footer";
import { FadeIn } from "./Motion";

interface LegalSection {
  title: string;
  content: (string | string[])[];
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export default function LegalPage({ title, lastUpdated, sections }: LegalPageProps) {
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
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary leading-tight mb-4">
              {title}
            </h1>
            <p className="text-primary/50 text-sm mb-10 lg:mb-14">
              Dernière mise à jour : {lastUpdated}
            </p>
          </FadeIn>

          <div className="space-y-10 lg:space-y-12">
            {sections.map((section, i) => (
              <FadeIn key={i} delay={0.05 * i}>
                <section>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.content.map((block, j) => {
                      if (Array.isArray(block)) {
                        return (
                          <ul key={j} className="list-disc list-inside space-y-1.5 text-primary/70 text-[15px] leading-relaxed pl-2">
                            {block.map((item, k) => (
                              <li key={k}>{item}</li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p key={j} className="text-primary/70 text-[15px] leading-relaxed">
                          {block}
                        </p>
                      );
                    })}
                  </div>
                </section>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
