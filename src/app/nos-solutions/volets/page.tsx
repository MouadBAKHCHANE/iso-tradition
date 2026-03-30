import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";

export const metadata: Metadata = {
  title: "Volets roulants & battants – ISO Tradition",
  description: "Volets roulants et battants en PVC, aluminium et bois. Protection solaire, isolation et sécurité.",
};

const product = {
  name: "Volets roulants & battants",
  heroImage: "/images/sol-volets.webp",
  intro: "Les volets jouent un rôle essentiel dans le confort de l'habitat. Ils améliorent l'isolation thermique, renforcent la sécurité, protègent de la lumière et participent à la gestion de la chaleur été comme hiver.",
  materials: ["PVC", "Aluminium", "Bois", "Électrique", "Solaire", "Manuel"],
  whyTitle: "Pourquoi installer des volets ?",
  whyText: "En Suisse, où les écarts de température sont marqués selon les saisons, les volets constituent une solution efficace pour réduire les pertes de chaleur en hiver et limiter la surchauffe estivale.",
  whyImage: "/images/products/volets/why.webp",
  advantagesImage: "/images/products/volets/advantages.webp",
  advantages: [
    "Amélioration du confort thermique toute l'année",
    "Réduction des déperditions énergétiques",
    "Gain de place : aucun battement vers l'intérieur (roulants)",
    "Protection solaire efficace",
    "Occultation totale ou partielle selon les besoins",
    "Renforcement de la sécurité du logement",
    "Amélioration du confort acoustique",
    "Contribution à la valorisation du bien immobilier",
    "Esthétique traditionnelle et personnalisable (battants)",
  ],
  typesLabel: "Types",
  personalisationOptions: [
    { 
      icon: "materiaux", 
      label: "Matériaux", 
      items: [
        { name: "PVC", image: "/images/icons/pvc.webp" },
        { name: "Aluminium", image: "/images/icons/alu.webp" },
        { name: "Bois", image: "/images/icons/bois.webp" }
      ] 
    },
    {
      icon: "couleurs",
      label: "Couleurs",
      items: [
        { name: "Personnalisables", image: "/images/icons/couleurs.webp" }
      ]
    },
    {
      icon: "configuration",
      label: "Configuration",
      items: [
        { name: "Électrique", image: "/images/icons/moteur.webp" },
        { name: "Solaire", image: "/images/icons/solaire.webp" },
        { name: "Manuel", image: "/images/icons/manuel.webp" },
        { name: "Brise solaire orientable", image: "/images/icons/bso.webp" }
      ]
    },
  ],
  types: [
    { name: "Volets roulants", description: "Motorisés (électrique ou solaire) ou manuels. Gain de place maximal, occultation totale, isolation thermique renforcée. Brise solaire orientable disponible.", image: "/images/products/volets/roulants.webp" },
    { name: "Volets battants aluminium", description: "Légèreté et robustesse. Design épuré qui s'intègre parfaitement aux façades modernes et contemporaines.", image: "/images/products/volets/battants-alu.webp" },
    { name: "Volets à persiennes", description: "Lames orientables pour un contrôle précis de la lumière et de la ventilation, tout en préservant l'intimité.", image: "/images/products/volets/battants-persiennes.webp" },
    { name: "Volets battants classiques", description: "Style traditionnel intemporel. Idéaux pour les rénovations et les maisons à l'architecture classique.", image: "/images/products/volets/battants-classique.webp" },
  ],
  didYouKnow: "Les volets roulants peuvent réduire les déperditions thermiques par les fenêtres de 20 à 30% en hiver, en créant une lame d'air isolante entre le vitrage et le volet fermé.\nLa motorisation solaire fonctionne même par temps couvert grâce à des batteries de stockage intégrées — aucun câblage électrique n'est nécessaire.",
  faq: [
    { question: "Volets roulants ou battants : comment choisir ?", answer: "Les volets roulants sont idéaux pour le confort moderne (motorisation, gain de place). Les volets battants conviennent aux façades traditionnelles et offrent un charme authentique." },
    { question: "La motorisation solaire est-elle fiable en Suisse ?", answer: "Oui, les panneaux solaires intégrés fonctionnent même par temps couvert. C'est une solution autonome qui ne nécessite aucun câblage électrique." },
    { question: "Peut-on motoriser des volets existants ?", answer: "Dans la plupart des cas, oui. Nos techniciens évaluent la faisabilité lors de la visite technique et proposent la meilleure solution." },
    { question: "Quels sont les avantages du brise solaire orientable ?", answer: "Le brise solaire orientable permet de régler la luminosité et la ventilation en ajustant l'angle des lames, tout en conservant une vue vers l'extérieur." },
  ],
};

export default function Volets() {
  return <ProductPage product={product} />;
}
