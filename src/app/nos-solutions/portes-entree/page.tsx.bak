import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";

export const metadata: Metadata = {
  title: "Portes d'entrée – ISO Tradition",
  description: "Portes d'entrée PVC, bois, aluminium et bois-aluminium. Sécurité, isolation et design personnalisé.",
};

const product = {
  name: "Portes d'entrée",
  heroImage: "/images/sol-portes.webp",
  intro: "La porte d'entrée n'est pas seulement le passage principal de votre maison : elle reflète l'identité de votre habitation, assure la sécurité de votre foyer, et contribue à l'efficacité énergétique.",
  materials: ["PVC", "Bois", "Aluminium", "Bois-Aluminium"],
  whyTitle: "Quel type de porte est fait pour vous ?",
  whyText: "Chaque matériau offre des avantages spécifiques en termes d'isolation, de sécurité, d'esthétique et d'entretien. Nous vous guidons vers la solution la plus adaptée à votre habitat et votre style de vie.",
  whyImage: "/images/products/portes-entree/why.webp",
  advantagesImage: "/images/products/portes-entree/advantages.webp",
  advantages: [
    "Sécurité renforcée avec serrures multipoints",
    "Isolation thermique et acoustique performante",
    "Design personnalisable (couleurs, motifs décoratifs)",
    "Formes rectangulaires ou cintrées",
    "Résistance aux intempéries",
    "Large choix de matériaux",
    "Valorisation esthétique de votre façade",
  ],
  typesLabel: "Matériaux",
  personalisationOptions: [
    { 
      icon: "formes", 
      label: "Formes", 
      items: [
        { name: "Rectangulaire", image: "/images/icons/rectangulaire.webp" },
        { name: "Cintrée", image: "/images/icons/ronde.webp" }
      ] 
    },
    { 
      icon: "motifs", 
      label: "Motifs", 
      items: [
        { name: "Motifs décoratifs", image: "/images/icons/config.webp" }
      ] 
    },
    { 
      icon: "couleurs", 
      label: "Couleurs", 
      items: [
        { name: "Couleurs RAL", image: "/images/icons/couleurs.webp" }
      ] 
    },
  ],
  types: [
    { name: "PVC", description: "Pratique, économique et facile à entretenir. Isolation thermique efficace, idéal pour les maisons modernes ou rénovations.", image: "/images/products/portes-entree/pvc.webp" },
    { name: "Aluminium", description: "Design moderne, robustesse et durabilité. Profilés fins et design épuré, excellente résistance aux intempéries.", image: "/images/products/portes-entree/alu-v2.webp" },
    { name: "Bois", description: "Chaleur, authenticité et prestige naturel. Esthétique chaleureuse et traditionnelle, isolation naturelle et confortable.", image: "/images/products/portes-entree/bois-v2.webp" },
    { name: "Bois-Aluminium", description: "Esthétique et performance réunies. Bois à l'intérieur pour la chaleur, aluminium à l'extérieur pour la protection.", image: "/images/products/portes-entree/bois-alu-v3.webp" },
  ],
  didYouKnow: "La porte d'entrée représente environ 10% des déperditions thermiques d'une maison. Remplacer une vieille porte par un modèle moderne permet de réduire significativement les pertes de chaleur.\nUne porte bois-aluminium combine le meilleur des deux matériaux : la chaleur et l'esthétique du bois à l'intérieur, la résistance aux intempéries de l'aluminium à l'extérieur.",
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
