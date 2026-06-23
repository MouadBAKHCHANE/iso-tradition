import LegalPage from "@/components/LegalPage";
import LegalPageSanity from "@/components/LegalPageSanity";
import { getLegalPageBySlug } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/cg-entretien" },
  title: "Conditions générales d'entretien – ISO Tradition",
  description: "Conditions générales des contrats d'entretien Iso Tradition SA pour fenêtres, portes et volets.",
};

const sections = [
  {
    title: "1. Objet",
    content: [
      "Les présentes Conditions Générales d'Entretien (ci-après « CGE ») régissent les contrats de maintenance et d'entretien proposés par Iso Tradition SA (ci-après « le Prestataire ») pour les produits installés par ses soins : fenêtres, portes, volets, baies coulissantes et autres menuiseries extérieures.",
    ],
  },
  {
    title: "2. Contrat d'entretien",
    content: [
      "Le contrat d'entretien est conclu pour une durée initiale d'un (1) an, renouvelable tacitement par périodes successives d'un an, sauf résiliation par l'une ou l'autre des parties moyennant un préavis de trois (3) mois avant l'échéance.",
      "La résiliation doit être adressée par écrit (courrier recommandé ou email avec accusé de réception) à l'adresse du Prestataire.",
    ],
  },
  {
    title: "3. Prestations incluses",
    content: [
      "Le contrat d'entretien standard comprend :",
      [
        "Une visite d'entretien annuelle avec inspection complète des menuiseries",
        "Vérification et réglage des mécanismes d'ouverture et de fermeture",
        "Lubrification des ferrures, charnières et serrures",
        "Contrôle de l'étanchéité des joints et remplacement si nécessaire",
        "Nettoyage des rails de coulissement et des systèmes de drainage",
        "Vérification du bon fonctionnement des volets roulants et motorisations",
        "Rapport d'intervention détaillé avec recommandations",
      ],
    ],
  },
  {
    title: "4. Prestations exclues",
    content: [
      "Sauf stipulation contraire dans le contrat, les prestations suivantes ne sont pas incluses :",
      [
        "Remplacement de vitrage cassé ou endommagé",
        "Réparations dues à un acte de vandalisme, une catastrophe naturelle ou un cas de force majeure",
        "Dommages résultant d'une utilisation non conforme ou d'un défaut d'entretien courant par le client",
        "Remplacement de pièces d'usure au-delà de l'entretien normal (motorisations, stores, etc.)",
        "Modifications ou transformations des installations existantes",
      ],
      "Ces prestations peuvent être réalisées sur devis séparé.",
    ],
  },
  {
    title: "5. Obligations du client",
    content: [
      "Le client s'engage à :",
      [
        "Assurer un entretien courant de ses menuiseries entre les visites (nettoyage régulier des vitrages, des cadres et des rails)",
        "Signaler sans délai toute anomalie ou dysfonctionnement constaté",
        "Permettre l'accès aux installations lors des visites d'entretien planifiées",
        "Ne pas effectuer de réparations ou modifications susceptibles d'altérer les produits sans accord préalable du Prestataire",
      ],
    ],
  },
  {
    title: "6. Planification des interventions",
    content: [
      "Les visites d'entretien sont planifiées en accord avec le client. Le Prestataire s'engage à proposer un créneau d'intervention dans un délai raisonnable.",
      "En cas d'empêchement, le client doit prévenir le Prestataire au moins 48 heures à l'avance. Toute annulation tardive ou absence non signalée pourra donner lieu à la facturation des frais de déplacement.",
    ],
  },
  {
    title: "7. Interventions d'urgence",
    content: [
      "En cas de panne ou de dysfonctionnement urgent (blocage de porte, problème de sécurité), les clients titulaires d'un contrat d'entretien bénéficient d'un délai d'intervention prioritaire.",
      "Les interventions d'urgence en dehors des heures ouvrables (lundi-vendredi, 8h-17h) pourront faire l'objet d'une majoration tarifaire, communiquée préalablement au client.",
    ],
  },
  {
    title: "8. Tarifs et paiement",
    content: [
      "Le tarif du contrat d'entretien est fixé dans le contrat individuel signé par les parties. Il est révisable annuellement en fonction de l'évolution des coûts, avec notification préalable de 30 jours.",
      "Le paiement est dû à réception de la facture, dans un délai de 30 jours. Les conditions de paiement des prestations supplémentaires (hors contrat) sont régies par les Conditions Générales de Vente.",
    ],
  },
  {
    title: "9. Responsabilité",
    content: [
      "Le Prestataire s'engage à effectuer les prestations d'entretien avec le soin et la diligence requis, conformément aux règles de l'art.",
      "La responsabilité du Prestataire est limitée aux dommages directs résultant d'une faute avérée dans l'exécution de ses prestations d'entretien. Le Prestataire ne saurait être tenu responsable de l'usure normale des produits.",
    ],
  },
  {
    title: "10. Garantie complémentaire",
    content: [
      "La souscription d'un contrat d'entretien régulier constitue une condition de maintien de certaines garanties fabricant étendues. Le client est invité à consulter les conditions de garantie spécifiques de ses produits.",
    ],
  },
  {
    title: "11. Droit applicable et juridiction",
    content: [
      "Les présentes CGE sont soumises au droit suisse. Tout litige sera soumis à la compétence exclusive des tribunaux du canton de Vaud, Suisse.",
    ],
  },
  {
    title: "12. Contact",
    content: [
      "Iso Tradition SA\nRoute de Suisse 7A, 1295 Mies\nTéléphone : 021 624 53 00\nEmail : contact@isotradition.ch",
    ],
  },
];

export default async function CGEntretien() {
  const sanityData = await getLegalPageBySlug("cg-entretien");

  if (sanityData?.body && Array.isArray(sanityData.body) && sanityData.body.length > 0) {
    return (
      <LegalPageSanity
        title={sanityData.title || "Conditions générales d'entretien"}
        lastUpdated={sanityData.lastUpdated || "28 mars 2026"}
        body={sanityData.body}
      />
    );
  }

  return (
    <LegalPage
      title="Conditions générales d'entretien"
      lastUpdated="28 mars 2026"
      sections={sections}
    />
  );
}
