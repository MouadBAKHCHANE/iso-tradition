import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";

export const metadata: Metadata = {
  title: "Portes de garage – ISO Tradition",
  description: "Portes de garage sectionnelles, enroulables et latérales. Aluminium, acier et bois.",
};

const product = {
  name: "Portes de garage",
  heroImage: "/images/sol-garage.jpg",
  intro: "La porte de garage est un élément clé de votre maison : elle protège votre véhicule, renforce la sécurité et contribue à l'esthétique de votre façade.",
  materials: ["Aluminium", "Acier", "Bois", "Électrique", "Manuel"],
  whyTitle: "Sécurité, confort et esthétique pour votre garage",
  whyText: "Avec des solutions modernes et personnalisables, il est possible de combiner design, confort et performance, tout en répondant aux normes suisses de sécurité et d'isolation thermique.",
  advantages: [
    "Sécurité renforcée pour votre véhicule et votre maison",
    "Isolation thermique et acoustique pour plus de confort intérieur",
    "Compatibilité avec tous les types d'architecture",
    "Durabilité et entretien adapté selon le matériau",
    "Confort d'usage grâce à l'automatisation électrique",
    "Finitions décoratives et couleurs personnalisables",
    "Hublots possibles pour la lumière naturelle",
  ],
  types: [
    { name: "Sectionnelle haut", description: "S'ouvre verticalement et se loge au plafond. Gain de place optimal devant et dans le garage." },
    { name: "Sectionnelle latérale", description: "S'ouvre latéralement le long du mur. Idéale quand la hauteur sous plafond est limitée." },
    { name: "Enroulable coffre", description: "S'enroule dans un coffre compact. Solution discrète pour les garages avec peu d'espace." },
  ],
  faq: [
    { question: "Quelle motorisation choisir ?", answer: "Nous proposons des motorisations électriques silencieuses avec télécommande, compatibles avec la domotique. Le choix dépend de la taille et du poids de la porte." },
    { question: "La porte de garage contribue-t-elle à l'isolation ?", answer: "Oui, nos portes sectionnelles à double paroi offrent une excellente isolation thermique, réduisant les pertes de chaleur du garage vers la maison." },
    { question: "Peut-on intégrer une porte piétonne ?", answer: "Oui, une porte piétonne peut être intégrée directement dans la porte de garage pour un accès quotidien sans ouvrir la porte principale." },
    { question: "Quel entretien est nécessaire ?", answer: "Un entretien annuel simple : lubrification des mécanismes, vérification des joints et nettoyage des rails suffit pour assurer la longévité." },
  ],
};

export default function PortesGarage() {
  return <ProductPage product={product} />;
}
