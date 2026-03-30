import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";

export const metadata: Metadata = {
  title: "Fenêtres – ISO Tradition",
  description: "Fenêtres PVC, bois, aluminium et bois-aluminium. Double et triple vitrage. Installation par nos équipes en Suisse romande.",
};

const product = {
  name: "Fenêtres & portes-fenêtres",
  heroImage: "/images/sol-fenetres.jpg",
  intro: "Le remplacement de vos fenêtres représente de nombreux atouts. Il empêche les courants d'air, fait baisser la facture de chauffage et améliore la qualité de l'habitat.",
  materials: ["PVC", "Bois", "Aluminium", "Bois-Aluminium", "Double vitrage", "Triple vitrage"],
  whyTitle: "Pourquoi remplacer vos fenêtres ?",
  whyText: "Des fenêtres performantes sont essentielles pour le confort thermique, l'isolation acoustique et la sécurité de votre habitat. Les anciennes fenêtres sont souvent responsables de 25% des déperditions de chaleur.",
  whyImage: "/images/products/fenetres/why.jpg",
  advantagesImage: "/images/products/fenetres/advantages.jpg",
  advantages: [
    "Isolation thermique renforcée",
    "Réduction des nuisances sonores",
    "Meilleure luminosité naturelle",
    "Sécurité anti-effraction",
    "Réduction de la facture énergétique",
    "Formes personnalisables (rectangulaire, ronde, trapèze, triangulaire)",
    "Couleurs personnalisables à l'infini",
    "Entretien facilité selon le matériau",
    "Valorisation de votre bien immobilier",
  ],
  types: [
    { name: "PVC", description: "Remarquables caractéristiques techniques en isolation, durabilité et étanchéité. Faciles d'entretien et compétitives au niveau prix.", image: "/images/products/fenetres/pvc.jpg" },
    { name: "Aluminium", description: "Adaptées aux grandes surfaces vitrées, peu d'entretien. Sécurité renforcée grâce aux systèmes de verrouillage multipoints.", image: "/images/products/fenetres/alu.jpg" },
    { name: "Bois", description: "Aspect naturel pour un grand nombre d'applications. Robustes et intelligemment conçues, une solution durable et élégante.", image: "/images/products/fenetres/bois.jpg" },
    { name: "Bois-Aluminium", description: "Le meilleur des deux mondes : chaleur du bois à l'intérieur, résistance de l'aluminium à l'extérieur.", image: "/images/products/fenetres/bois-alu.jpg" },
  ],
  typesLabel: "Matériaux",
  personalisationLabel: "Vitrages",
  personalisationOptions: [
    { 
      icon: "formes", 
      label: "Formes", 
      items: [
        { name: "Rectangulaire", image: "/images/icons/rectangulaire.png" },
        { name: "Ronde", image: "/images/icons/ronde.png" },
        { name: "Trapèze", image: "/images/icons/trapeze.png" },
        { name: "Triangulaire", image: "/images/icons/triangulaire.png" }
      ] 
    },
    { 
      icon: "couleurs", 
      label: "Couleurs", 
      items: [
        { name: "Couleurs à l'infini", image: "/images/icons/couleurs.png" }
      ] 
    },
  ],
  personalisation: [
    { name: "Double vitrage", description: "Convient à la plupart des rénovations courantes. Bonne isolation thermique et acoustique.", image: "/images/products/fenetres/double-vitrage-v2.jpg" },
    { name: "Triple vitrage", description: "Plus performant, maximise le confort, réduit les pertes de chaleur et améliore l'efficacité énergétique.", image: "/images/products/fenetres/triple-vitrage.jpg" },
  ],
  didYouKnow: "Le double vitrage convient à la plupart des rénovations courantes et offre déjà une bonne isolation thermique et acoustique.\nLe triple vitrage, plus performant, maximise le confort, réduit encore les pertes de chaleur et améliore l'efficacité énergétique.",
  faq: [
    { question: "Quel type de vitrage choisir : double ou triple ?", answer: "Le double vitrage convient à la plupart des rénovations courantes. Le triple vitrage, plus performant, est recommandé pour les constructions neuves ou les rénovations énergétiques globales. En Suisse romande, le triple vitrage devient la solution de référence." },
    { question: "Quelles subventions sont disponibles pour le remplacement de fenêtres ?", answer: "Le Programme Bâtiments peut financer jusqu'à 30% des coûts. Cependant, le seul remplacement des fenêtres n'est pas éligible : le projet doit s'inscrire dans une rénovation énergétique globale avec un certificat CECB." },
    { question: "Combien de temps dure l'installation ?", answer: "En général, le remplacement d'une fenêtre prend entre 2 et 4 heures par ouverture. Pour une maison complète, comptez 2 à 5 jours selon le nombre de fenêtres." },
    { question: "Les travaux sont-ils fiscalement déductibles ?", answer: "Oui, les travaux de rénovation énergétique sont fiscalement déductibles jusqu'en 2028 (abolition de la valeur locative)." },
    { question: "Quelle est la durée de garantie ?", answer: "Nos fenêtres bénéficient d'une garantie fabricant de 10 à 20 ans selon les produits, et d'une garantie de 2 ans sur la pose." },
  ],
};

export default function Fenetres() {
  return <ProductPage product={product} />;
}
