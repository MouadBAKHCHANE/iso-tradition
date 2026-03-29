import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";

export const metadata: Metadata = {
  title: "Portes d'entrée – ISO Tradition",
  description: "Portes d'entrée PVC, bois, aluminium et bois-aluminium. Sécurité, isolation et design personnalisé.",
};

const product = {
  name: "Portes d'entrée",
  heroImage: "/images/sol-portes.jpg",
  intro: "La porte d'entrée n'est pas seulement le passage principal de votre maison : elle reflète l'identité de votre habitation, assure la sécurité de votre foyer, et contribue à l'efficacité énergétique.",
  materials: ["PVC", "Bois", "Aluminium", "Bois-Aluminium"],
  whyTitle: "Quel type de porte est fait pour vous ?",
  whyText: "Chaque matériau offre des avantages spécifiques en termes d'isolation, de sécurité, d'esthétique et d'entretien. Nous vous guidons vers la solution la plus adaptée à votre habitat et votre style de vie.",
  advantages: [
    "Sécurité renforcée avec serrures multipoints",
    "Isolation thermique et acoustique performante",
    "Design personnalisable (couleurs, motifs décoratifs)",
    "Formes rectangulaires ou cintrées",
    "Résistance aux intempéries",
    "Large choix de matériaux",
    "Valorisation esthétique de votre façade",
  ],
  types: [
    { name: "PVC", description: "Pratique, économique et facile à entretenir. Isolation thermique efficace, idéal pour les maisons modernes ou rénovations." },
    { name: "Aluminium", description: "Design moderne, robustesse et durabilité. Profilés fins et design épuré, excellente résistance aux intempéries." },
    { name: "Bois", description: "Chaleur, authenticité et prestige naturel. Esthétique chaleureuse et traditionnelle, isolation naturelle et confortable." },
    { name: "Bois-Aluminium", description: "Esthétique et performance réunies. Bois à l'intérieur pour la chaleur, aluminium à l'extérieur pour la protection. Design haut de gamme." },
  ],
  faq: [
    { question: "Quelle est la durée de vie d'une porte d'entrée ?", answer: "Une porte d'entrée de qualité dure entre 25 et 40 ans selon le matériau et l'entretien. Les portes en aluminium ont la plus longue durée de vie." },
    { question: "Quel niveau de sécurité proposez-vous ?", answer: "Toutes nos portes intègrent des serrures multipoints (3 à 5 points de fermeture) et peuvent être équipées de cylindres de haute sécurité et de charnières anti-dégondage." },
    { question: "Peut-on personnaliser le design ?", answer: "Oui, entièrement : couleurs RAL, motifs décoratifs, vitrages, poignées et accessoires. Nous proposons aussi des formes cintrées sur mesure." },
    { question: "L'installation perturbe-t-elle le quotidien ?", answer: "L'installation d'une porte d'entrée prend généralement une demi-journée. Votre domicile reste sécurisé pendant toute la durée des travaux." },
  ],
};

export default function PortesEntree() {
  return <ProductPage product={product} />;
}
