import LegalPage from "@/components/LegalPage";
import LegalPageSanity from "@/components/LegalPageSanity";
import { getLegalPageBySlug } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/confidentialite" },
  title: "Politique de confidentialité & Cookies – ISO Tradition",
  description: "Politique de confidentialité et gestion des cookies du site isotradition.ch, conforme à la nLPD suisse.",
};

const sections = [
  {
    title: "1. Introduction",
    content: [
      "Iso Tradition SA (ci-après « nous » ou « le Responsable du traitement »), sise Route de Suisse 7A, 1295 Mies, Suisse, s'engage à protéger la vie privée des utilisateurs de son site isotradition.ch.",
      "La présente politique de confidentialité décrit les données personnelles que nous collectons, les finalités de leur traitement, ainsi que vos droits, conformément à la nouvelle Loi fédérale sur la protection des données (nLPD) entrée en vigueur le 1er septembre 2023.",
    ],
  },
  {
    title: "2. Responsable du traitement",
    content: [
      "Iso Tradition SA\nRoute de Suisse 7A\n1295 Mies, Vaud, Suisse",
      "Téléphone : 021 624 53 00\nEmail : contact@isotradition.ch",
    ],
  },
  {
    title: "3. Données collectées",
    content: [
      "Nous collectons les catégories de données personnelles suivantes :",
      [
        "Données d'identification : nom, prénom, adresse postale, adresse email, numéro de téléphone",
        "Données relatives au projet : type de bien, nature des travaux souhaités, photos éventuelles",
        "Données de navigation : adresse IP, type de navigateur, pages visitées, durée de visite, cookies",
        "Données de communication : contenu des messages envoyés via le formulaire de contact ou par email",
      ],
    ],
  },
  {
    title: "4. Finalités du traitement",
    content: [
      "Vos données personnelles sont traitées pour les finalités suivantes :",
      [
        "Répondre à vos demandes de contact et de devis",
        "Établir et exécuter des contrats de vente et d'entretien",
        "Planifier les visites techniques et les interventions",
        "Améliorer la qualité de nos services et de notre site web",
        "Envoyer des communications commerciales (avec votre consentement)",
        "Respecter nos obligations légales et réglementaires",
        "Analyser la fréquentation et l'utilisation du site (statistiques anonymisées)",
      ],
    ],
  },
  {
    title: "5. Base juridique du traitement",
    content: [
      "Le traitement de vos données repose sur les bases juridiques suivantes :",
      [
        "L'exécution d'un contrat ou de mesures précontractuelles (devis, commande)",
        "Votre consentement (formulaire de contact, newsletter, cookies non essentiels)",
        "Nos intérêts légitimes (amélioration du site, sécurité, prévention de la fraude)",
        "Le respect d'obligations légales (facturation, archivage comptable)",
      ],
    ],
  },
  {
    title: "6. Durée de conservation",
    content: [
      "Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :",
      [
        "Données de prospection (demandes de devis sans suite) : 2 ans après le dernier contact",
        "Données clients : pendant la durée de la relation contractuelle, puis 10 ans pour les obligations comptables",
        "Données de navigation et cookies : 13 mois maximum",
        "Données de communication commerciale : jusqu'au retrait de votre consentement",
      ],
    ],
  },
  {
    title: "7. Partage des données",
    content: [
      "Vos données personnelles peuvent être partagées avec :",
      [
        "Nos sous-traitants et partenaires intervenant dans l'exécution de votre projet (fabricants, installateurs)",
        "Nos prestataires techniques (hébergeur, outils d'analyse, plateforme de formulaire)",
        "Les autorités compétentes, en cas d'obligation légale",
      ],
      "Nous ne vendons ni ne louons vos données personnelles à des tiers à des fins commerciales.",
      "Certains de nos prestataires techniques (hébergement, analyse) peuvent être situés hors de Suisse. Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place conformément à la nLPD (décision d'adéquation, clauses contractuelles types).",
    ],
  },
  {
    title: "8. Cookies",
    content: [
      "Notre site utilise des cookies et technologies similaires. Un cookie est un petit fichier texte stocké sur votre appareil lors de votre visite.",
      "Types de cookies utilisés :",
      [
        "Cookies essentiels : nécessaires au fonctionnement du site (pas de consentement requis)",
        "Cookies analytiques : permettent de mesurer l'audience et d'améliorer le site (Google Analytics ou équivalent)",
        "Cookies de préférences : mémorisent vos choix (langue, consentement cookies)",
      ],
      "Vous pouvez gérer vos préférences de cookies à tout moment via le bandeau de consentement affiché lors de votre première visite, ou en modifiant les paramètres de votre navigateur.",
      "Le refus des cookies analytiques n'affecte pas votre utilisation du site. Seuls les cookies essentiels resteront actifs.",
    ],
  },
  {
    title: "9. Vos droits",
    content: [
      "Conformément à la nLPD, vous disposez des droits suivants :",
      [
        "Droit d'accès : obtenir la confirmation que des données vous concernant sont traitées et en recevoir une copie",
        "Droit de rectification : demander la correction de données inexactes ou incomplètes",
        "Droit à l'effacement : demander la suppression de vos données, sous réserve des obligations légales de conservation",
        "Droit d'opposition : vous opposer au traitement de vos données pour des motifs légitimes",
        "Droit à la portabilité : recevoir vos données dans un format structuré et couramment utilisé",
        "Droit de retirer votre consentement : à tout moment, sans effet rétroactif",
      ],
      "Pour exercer vos droits, contactez-nous par email à contact@isotradition.ch ou par courrier à l'adresse indiquée ci-dessus. Nous répondrons dans un délai de 30 jours.",
      "Si vous estimez que le traitement de vos données viole vos droits, vous pouvez déposer une plainte auprès du Préposé fédéral à la protection des données et à la transparence (PFPDT).",
    ],
  },
  {
    title: "10. Sécurité des données",
    content: [
      "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.",
      "Ces mesures comprennent notamment le chiffrement des communications (SSL/TLS), le contrôle des accès, et la sensibilisation de notre personnel.",
    ],
  },
  {
    title: "11. Modifications",
    content: [
      "Nous nous réservons le droit de modifier la présente politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec la date de mise à jour. Nous vous encourageons à consulter régulièrement cette page.",
    ],
  },
  {
    title: "12. Contact",
    content: [
      "Pour toute question relative à la protection de vos données personnelles :",
      "Iso Tradition SA\nRoute de Suisse 7A, 1295 Mies\nTéléphone : 021 624 53 00\nEmail : contact@isotradition.ch",
    ],
  },
];

export default async function Confidentialite() {
  const sanityData = await getLegalPageBySlug("confidentialite");

  if (sanityData?.body && Array.isArray(sanityData.body) && sanityData.body.length > 0) {
    return (
      <LegalPageSanity
        title={sanityData.title || "Politique de confidentialité & Cookies"}
        lastUpdated={sanityData.lastUpdated || "28 mars 2026"}
        body={sanityData.body}
      />
    );
  }

  return (
    <LegalPage
      title="Politique de confidentialité & Cookies"
      lastUpdated="28 mars 2026"
      sections={sections}
    />
  );
}
