import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";

export const metadata: Metadata = {
  title: "Carports & Pergolas – ISO Tradition",
  description: "Carports et pergolas en aluminium et bois. Protection, design et praticité pour votre extérieur.",
};

const product = {
  name: "Carports & Pergolas",
  heroImage: "/images/sol-carport.jpg",
  intro: "Le carport protège votre véhicule avec une architecture ouverte et moderne. La pergola crée un véritable espace de vie extérieur, utilisable une grande partie de l'année. Deux solutions complémentaires pour valoriser votre habitat.",
  materials: ["Aluminium", "Bois", "Adossé", "Autoportant"],
  whyTitle: "Protection, design et praticité pour votre extérieur",
  whyText: "Carports et pergolas s'intègrent harmonieusement à l'architecture de la maison et valorisent durablement votre habitat. Grâce à leurs différentes options, ils s'adaptent à tous les styles.",
  advantages: [
    "Protection contre la pluie, la neige, le soleil et le gel",
    "Structure ouverte qui évite l'humidité et la condensation (carport)",
    "Création d'un espace de vie supplémentaire (pergola)",
    "Esthétique moderne et personnalisable",
    "Valorisation du bien immobilier",
    "Accès rapide et facilité au véhicule (carport)",
    "Solution durable, adaptée au climat suisse",
    "Confort extérieur optimal, été comme mi-saison",
    "Options domotique, éclairage LED et chauffage (pergola)",
  ],
  types: [
    { name: "Carport adossé", description: "Fixé contre la façade de la maison. Solution compacte et élégante qui s'intègre naturellement à l'architecture existante." },
    { name: "Carport autoportant", description: "Structure indépendante pouvant être placée librement. Plus de flexibilité dans l'implantation." },
    { name: "Pergola adossée", description: "Extension naturelle de votre terrasse. Toiture à lames orientables, fixe ou tendue selon vos besoins." },
    { name: "Pergola autoportante", description: "Espace indépendant au jardin. Idéale pour créer un salon d'été ou un coin détente éloigné de la maison." },
  ],
  faq: [
    { question: "Faut-il un permis de construire ?", answer: "En Suisse, les règles varient selon les cantons et communes. En général, les structures de moins de 10 m² ne nécessitent pas de permis. Nous vous accompagnons dans les démarches administratives." },
    { question: "Quelles options de toiture pour la pergola ?", answer: "Nous proposons des toitures à lames orientables (bioclimatiques), des toiles tendues rétractables et des toitures fixes en polycarbonate ou aluminium." },
    { question: "Le carport protège-t-il aussi bien qu'un garage ?", answer: "Le carport protège efficacement contre les intempéries (pluie, neige, grêle, soleil). La structure ouverte évite la condensation et l'humidité, ce qui est un avantage par rapport au garage fermé." },
    { question: "Peut-on ajouter des fermetures latérales au carport ?", answer: "Oui, des panneaux latéraux en verre, aluminium ou stores peuvent être ajoutés pour une protection supplémentaire contre le vent et la pluie." },
  ],
};

export default function CarportsPergolas() {
  return <ProductPage product={product} />;
}
