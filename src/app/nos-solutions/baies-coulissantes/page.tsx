import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";

export const metadata: Metadata = {
  title: "Baies coulissantes – ISO Tradition",
  description: "Baies coulissantes PVC et aluminium. Luminosité maximale et design contemporain pour votre habitat.",
};

const product = {
  name: "Baies coulissantes",
  heroImage: "/images/sol-baies.jpg",
  intro: "Des baies vitrées généreuses apportent une luminosité exceptionnelle et créent une atmosphère de confort et de bien-être. Elles offrent une connexion unique avec l'extérieur.",
  materials: ["PVC", "Aluminium", "Double vitrage", "Triple vitrage"],
  whyTitle: "Des pièces lumineuses pour un cadre de vie unique",
  whyText: "Les différentes configurations possibles mettent en valeur une architecture contemporaine et élégante. Les baies coulissantes transforment votre espace de vie en ouvrant votre intérieur sur l'extérieur.",
  advantages: [
    "Apport maximal de lumière naturelle, même en hiver",
    "Vue dégagée et effet panoramique grâce aux grandes surfaces vitrées",
    "Gain de place : aucun battement vers l'intérieur",
    "Circulation fluide entre les espaces avec possibilité de seuil bas",
    "Confort thermique et acoustique adapté au climat suisse",
    "Esthétique moderne qui valorise le bien immobilier",
    "Couleurs personnalisables",
  ],
  types: [
    { name: "Coulissant classique", description: "Solution éprouvée pour les grandes ouvertures. Fonctionnement fluide et entretien minimal." },
    { name: "Coulissant à levage", description: "Pour les très grandes dimensions. Mécanisme de levage pour une ouverture sans effort." },
    { name: "Coulissant d'angle", description: "Ouverture d'angle pour une transparence totale. Effet architectural saisissant." },
  ],
  faq: [
    { question: "Quelle largeur maximale pour une baie coulissante ?", answer: "Selon le matériau et le système choisi, les baies coulissantes peuvent atteindre jusqu'à 6 mètres de largeur avec des vantaux de 3 mètres." },
    { question: "Les baies coulissantes sont-elles sécurisées ?", answer: "Oui, nos baies coulissantes intègrent des systèmes de fermeture multipoints et peuvent être équipées de vitrages de sécurité anti-effraction." },
    { question: "Le seuil bas est-il possible ?", answer: "Oui, nous proposons des seuils bas (encastrés) pour faciliter le passage et l'accessibilité, notamment pour les personnes à mobilité réduite." },
    { question: "Quel entretien pour les baies coulissantes ?", answer: "Un nettoyage régulier des rails et des joints suffit. Les baies en aluminium ou PVC nécessitent très peu d'entretien." },
  ],
};

export default function BaiesCoulissantes() {
  return <ProductPage product={product} />;
}
