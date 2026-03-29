import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";

export const metadata: Metadata = {
  title: "Stores bannes – ISO Tradition",
  description: "Stores bannes manuels et électriques. Protection solaire, confort et style pour vos terrasses.",
};

const product = {
  name: "Stores bannes",
  heroImage: "/images/sol-stores.jpg",
  intro: "Les stores bannes sont la solution idéale pour profiter pleinement de vos espaces extérieurs, en toute saison. Ils protègent du soleil, des UV et de la chaleur, tout en offrant une esthétique moderne.",
  materials: ["Aluminium", "Manuel", "Électrique"],
  whyTitle: "Confort, protection solaire et style pour vos terrasses",
  whyText: "Adaptés aux maisons individuelles, les stores bannes permettent de créer des zones ombragées et agréables, tout en ajoutant une touche décorative à votre façade ou votre terrasse.",
  advantages: [
    "Protection efficace contre le soleil et la chaleur",
    "Style et personnalisation multiples",
    "Facilité d'utilisation manuelle ou électrique",
    "Éclairage intégré possible pour les soirées",
    "Lambrequin déroulable pour ajuster l'ombre",
    "Augmentation du confort sur terrasse ou balcon",
    "Toiles et couleurs de coffre personnalisables",
  ],
  types: [
    { name: "Store coffre intégral", description: "La toile et le mécanisme sont entièrement protégés dans un coffre fermé. Durabilité maximale et esthétique épurée." },
    { name: "Store semi-coffre", description: "Protection partielle du mécanisme. Bon compromis entre protection et budget." },
    { name: "Store monobloc", description: "Solution économique sans coffre. Idéale pour les installations sous avancée de toit." },
  ],
  faq: [
    { question: "Quelle largeur maximale pour un store banne ?", answer: "Les stores bannes peuvent atteindre jusqu'à 7 mètres de largeur et 4 mètres d'avancée, selon le modèle et la structure de fixation." },
    { question: "Le store résiste-t-il au vent ?", answer: "Nos stores sont équipés de capteurs vent optionnels qui replient automatiquement le store en cas de rafales. Ils résistent à des vents jusqu'à 38 km/h en position déployée." },
    { question: "Peut-on ajouter un éclairage LED ?", answer: "Oui, nous proposons des rampes LED intégrées au coffre ou aux bras pour profiter de votre terrasse en soirée." },
    { question: "Quel entretien pour la toile ?", answer: "Un nettoyage annuel à l'eau savonneuse suffit. Les toiles sont traitées anti-UV et anti-moisissures pour une longue durée de vie." },
  ],
};

export default function StoresBannes() {
  return <ProductPage product={product} />;
}
