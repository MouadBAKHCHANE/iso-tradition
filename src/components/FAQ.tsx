"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./Motion";

const faqs = [
  {
    question: "Combien de temps dure une installation de fenêtres ?",
    answer:
      "Une installation standard dure 1 à 3 jours selon le nombre de fenêtres et la complexité du chantier. Nous établissons un planning précis avant chaque intervention pour minimiser les désagréments.",
  },
  {
    question: "Quels types de matériaux proposez-vous ?",
    answer:
      "Nous travaillons avec le PVC, l'aluminium et le bois. Chaque matériau a ses avantages : le PVC pour le rapport qualité-prix, l'aluminium pour la finesse et la modernité, le bois pour l'authenticité et l'isolation naturelle.",
  },
  {
    question: "Proposez-vous des garanties sur vos installations ?",
    answer:
      "Oui, tous nos produits bénéficient d'une garantie fabricant de 5 à 10 ans selon le type de menuiserie. Notre pose est garantie 2 ans. Nous restons disponibles pour tout service après-vente.",
  },
  {
    question: "Intervenez-vous dans toute la Suisse romande ?",
    answer:
      "Nous intervenons principalement dans le canton de Vaud, Genève, Fribourg et Valais. Pour les autres cantons romands, contactez-nous pour vérifier notre disponibilité.",
  },
  {
    question: "Comment obtenir un devis gratuit ?",
    answer:
      "Vous pouvez nous contacter par téléphone au 021 624 53 00, via notre formulaire en ligne, ou nous envoyer un e-mail. Nous organisons une visite gratuite pour prendre les mesures et vous proposer un devis détaillé sous 48h.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-20">
          {/* Left — Title */}
          <FadeIn>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-accent" />
                <span className="font-secondary text-accent font-light text-sm uppercase tracking-[0.2em]">
                  FAQ
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary leading-tight">
                Questions
                <br />
                fréquentes
              </h2>
            </div>
          </FadeIn>

          {/* Right — Accordion */}
          <div>
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <FadeIn key={faq.question} delay={0.05 * i}>
                  <div className="border-b border-gray-200">
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
                    >
                      <span
                        className={`font-semibold text-[17px] pr-8 transition-colors duration-300 ${
                          isOpen
                            ? "text-accent"
                            : "text-primary group-hover:text-primary/70"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                          isOpen
                            ? "bg-accent text-white"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.25, 0.1, 0.25, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="text-gray-500 text-[15px] leading-relaxed pb-6 max-w-2xl">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
