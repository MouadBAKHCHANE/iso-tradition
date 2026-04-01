"use client";

import { FadeIn } from "./Motion";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Prise de contact", description: "Nos experts locaux vous recontactent pour une prise de RDV.", icon: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z", color: "accent" as const },
  { num: "02", title: "1ère rencontre", description: "L'un de nos experts se déplace chez vous pour évaluer votre besoin.", icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z", color: "dark" as const },
  { num: "03", title: "Visite technique", description: "Recueil des données techniques du projet et relevé des dimensions.", icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z", color: "light" as const },
  { num: "04", title: "Choix des solutions", description: "Nous vous proposons des solutions sur mesure (vitrage, matériau, finitions, couleurs).", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42", color: "accent" as const },
  { num: "05", title: "Aides & subventions", description: "Notre service administratif se charge de la demande des subventions (le cas échéant).", icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z", color: "dark" as const },
  { num: "06", title: "Planification de la pose", description: "Nous fixons avec vous l'échéancier pour la dépose et la pose de vos nouvelles menuiseries.", icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5", color: "light" as const },
  { num: "07", title: "Pose & dépose", description: "La pose des nouvelles portes et fenêtres est réalisée par nos experts qualifiés dans les règles de l'art.", icon: "M11.42 15.17l-5.658-5.658a3 3 0 010-4.243l.88-.88a3 3 0 014.243 0l.88.88a3 3 0 010 4.243M6.75 21h10.5", color: "accent" as const },
  { num: "08", title: "Contrôle du chantier", description: "Contrôle visuel et fonctionnel des nouvelles menuiseries puis réception de chantier finale.", icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "dark" as const },
  { num: "09", title: "Conseils d'utilisation", description: "Chaque client reçoit des conseils d'entretien pour préserver la longévité des menuiseries.", icon: "M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18", color: "light" as const },
];

const colorMap = {
  accent: { bg: "bg-transparent border-2 border-accent", text: "text-primary", desc: "text-primary/70", numBg: "bg-accent/20", iconColor: "text-accent/20" },
  dark: { bg: "bg-primary", text: "text-white", desc: "text-white/60", numBg: "bg-primary-dark", iconColor: "text-white/[0.07]" },
  light: { bg: "bg-secondary", text: "text-primary", desc: "text-gray-500", numBg: "bg-gray-300", iconColor: "text-primary/[0.06]" },
};

// Group into rows of 2
const rows: (typeof steps)[] = [];
for (let i = 0; i < steps.length; i += 2) {
  rows.push(steps.slice(i, i + 2));
}

function DownArrow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="flex justify-center py-3"
    >
      <div className="flex flex-col items-center gap-1">
        <div className="w-px h-6 bg-accent/40" />
        <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function ProjectCTA() {
  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Left — sticky text */}
          <div className="lg:sticky lg:top-32">
            <FadeIn>
              <div className="flex items-center gap-3 mb-3">
                <span className="h-px w-10 bg-primary/40" />
                <span className="font-secondary text-primary/60 font-medium text-sm uppercase tracking-[0.2em]">
                  Comment ça marche
                </span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-bold text-primary leading-tight mb-5">
                Un process 100% interne{" "}
                <span className="text-accent">par nos équipes</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-10 max-w-md">
                La pose de fenêtres, portes ou volets est un projet technique
                qui mérite une approche méthodique, garantissant la bonne
                conformité aux normes suisses et la longévité des menuiseries.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                <a
                  href="https://form.typeform.com/to/astTYipT" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-primary/30 hover:border-accent text-primary hover:text-accent font-bold px-6 py-3 rounded-full transition-colors text-[15px] group"
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
                  className="inline-flex items-center gap-2 text-primary font-semibold text-[15px] hover:text-accent transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  021 624 53 00
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right — cards 2 per row, scroll-reveal one by one */}
          <div className="flex flex-col">
            {rows.map((row, rowIdx) => (
              <div key={rowIdx}>
                {/* Arrow between rows */}
                {rowIdx > 0 && <DownArrow />}

                <div className={`grid gap-5 ${row.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
                  {row.map((step, colIdx) => {
                    const c = colorMap[step.color];
                    return (
                      <motion.div
                        key={step.num}
                        initial={{ opacity: 0, y: 50, scale: 0.92 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.55,
                          delay: colIdx * 0.18,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        viewport={{ once: true, amount: 0.4 }}
                      >
                        <div
                          className={`relative ${c.bg} rounded-[20px] p-7 overflow-hidden min-h-[180px] flex flex-col justify-end`}
                        >
                          {/* Background icon */}
                          <svg
                            className={`absolute -right-2 -top-2 w-28 h-28 ${c.iconColor}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={0.6}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                          </svg>

                          {/* Step number badge */}
                          <div className="absolute top-0 right-0">
                            <div className={`${c.numBg} ${c.text} rounded-bl-[14px] rounded-tr-[20px] px-3.5 py-1.5 text-xs font-bold`}>
                              {step.num}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="relative z-10">
                            <h3 className={`${c.text} font-bold text-lg mb-2`}>{step.title}</h3>
                            <p className={`${c.desc} text-[13px] leading-relaxed`}>{step.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
