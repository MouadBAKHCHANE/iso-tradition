import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";

export const metadata: Metadata = {
  title: "Films solaires – ISO Tradition",
  description: "Films solaires anti-UV, anti-éblouissement et anti-chaleur. Solution simple et efficace sans remplacement de vitrage.",
};

const product = {
  name: "Films solaires",
  heroImage: "/images/sol-film.png",
  intro: "Les films solaires sont une solution simple et efficace pour améliorer le confort intérieur, sans remplacer les vitrages existants. Appliqués directement sur les vitres, ils réduisent la chaleur, l'éblouissement et les UV.",
  materials: ["Anti-UV", "Anti-éblouissement", "Effet miroir", "Décoratif"],
  whyTitle: "Confort thermique sans travaux lourds",
  whyText: "Les films solaires permettent de réduire significativement la chaleur intérieure et l'éblouissement tout en conservant la luminosité naturelle. Adaptés aux maisons individuelles, vérandas, verrières et baies coulissantes.",
  whyImage: "/images/products/films-solaires/why.jpg",
  advantagesImage: "/images/products/films-solaires/advantages.jpg",
  advantages: [
    "Réduction importante de la chaleur (rejet infrarouge jusqu'à 98%)",
    "Diminution importante des dépenses de climatisation",
    "Amélioration du confort thermique sans travaux lourds",
    "Discrétion et esthétique préservées",
    "Réduction de l'éblouissement (jusqu'à 99%)",
    "Protection des meubles et sols contre les UV",
    "Jusqu'à 30% de réduction de déperdition de chaleur",
  ],
  personalisationOptions: [
    { 
      icon: "variantes", 
      label: "Variantes", 
      items: [
        { name: "Anti-UV", image: "/images/icons/lumiere.png" },
        { name: "Anti-éblouissement", image: "/images/icons/lumiere.png" },
        { name: "Effet miroir", image: "/images/icons/vitrage.png" },
        { name: "Décoratif", image: "/images/icons/couleurs.png" }
      ] 
    },
    { 
      icon: "applications", 
      label: "Applications", 
      items: [
        { name: "Maisons individuelles", image: "/images/icons/config.png" },
        { name: "Vérandas", image: "/images/icons/vitrage.png" },
        { name: "Verrières", image: "/images/icons/vitrage.png" },
        { name: "Baies coulissantes", image: "/images/icons/vitrage.png" }
      ] 
    },
  ],
  types: [
    { name: "Anti-UV", description: "Bloque jusqu'à 99% des rayons ultraviolets. Protège les meubles, sols et œuvres d'art de la décoloration." },
    { name: "Anti-éblouissement", description: "Réduit l'éblouissement tout en conservant une vue claire vers l'extérieur. Idéal pour les bureaux et pièces de vie." },
    { name: "Effet miroir", description: "Offre une intimité en journée grâce à l'effet réfléchissant, tout en conservant la vue depuis l'intérieur." },
    { name: "Décoratif", description: "Films à motifs ou dépolis pour personnaliser vos vitrages et créer des espaces intimes." },
  ],
  didYouKnow: "Les films solaires modernes peuvent rejeter jusqu'à 98% des rayons infrarouges responsables de la chaleur, tout en laissant passer jusqu'à 70% de la lumière naturelle visible.\nContrairement aux stores, le film solaire agit 24h/24 sans aucune action manuelle — une solution passive idéale pour les grandes surfaces vitrées difficiles d'accès.",
  faq: [
    { question: "Le film solaire réduit-il la luminosité ?", answer: "Non, les films solaires modernes sont conçus pour réduire la chaleur et les UV tout en laissant passer la lumière naturelle. La transmission lumineuse reste élevée." },
    { question: "Quelle est la durée de vie d'un film solaire ?", answer: "Un film solaire de qualité professionnelle dure entre 10 et 15 ans. Nos films sont garantis contre le décollement et la décoloration." },
    { question: "Peut-on appliquer un film sur du double vitrage ?", answer: "Oui, mais il faut choisir le bon type de film pour éviter le stress thermique. Nos techniciens évaluent chaque situation pour recommander la solution adaptée." },
    { question: "L'installation est-elle rapide ?", answer: "Oui, l'application est rapide et propre. Comptez environ 30 minutes par mètre carré. Pas de travaux, pas de poussière." },
  ],
};

export default function FilmsSolaires() {
  return <ProductPage product={product} />;
}
