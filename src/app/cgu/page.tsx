import LegalPage from "@/components/LegalPage";
import LegalPageSanity from "@/components/LegalPageSanity";
import { getLegalPageBySlug } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/cgu" },
  title: "Conditions générales d'utilisation – ISO Tradition",
  description: "Conditions générales d'utilisation du site isotradition.ch.",
};

const sections = [
  {
    title: "1. Objet",
    content: [
      "Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») ont pour objet de définir les modalités et conditions dans lesquelles les utilisateurs accèdent et utilisent le site isotradition.ch (ci-après « le Site »), édité par Iso Tradition SA.",
      "L'accès et l'utilisation du Site impliquent l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le Site.",
    ],
  },
  {
    title: "2. Accès au site",
    content: [
      "Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Iso Tradition SA met en œuvre tous les moyens raisonnables pour assurer un accès continu au Site, mais ne saurait garantir une disponibilité permanente.",
      "Iso Tradition SA se réserve le droit de suspendre, modifier ou interrompre temporairement ou définitivement l'accès au Site, sans préavis ni indemnité, notamment pour des raisons de maintenance ou de mise à jour.",
    ],
  },
  {
    title: "3. Utilisation du site",
    content: [
      "L'utilisateur s'engage à utiliser le Site de manière conforme aux lois et réglementations en vigueur en Suisse. Il s'interdit notamment de :",
      [
        "Utiliser le Site à des fins illicites, frauduleuses ou portant atteinte aux droits de tiers",
        "Tenter de porter atteinte au fonctionnement du Site (piratage, introduction de virus, etc.)",
        "Collecter des données personnelles d'autres utilisateurs sans leur consentement",
        "Reproduire, copier ou distribuer le contenu du Site sans autorisation préalable",
        "Utiliser des robots, scrapers ou tout autre moyen automatisé pour accéder au Site",
      ],
    ],
  },
  {
    title: "4. Propriété intellectuelle",
    content: [
      "L'ensemble des éléments du Site (textes, images, vidéos, logos, graphismes, icônes, sons, logiciels, etc.) est protégé par les lois suisses et internationales relatives à la propriété intellectuelle.",
      "Ces éléments restent la propriété exclusive d'Iso Tradition SA. Toute reproduction, représentation, modification ou exploitation de tout ou partie de ces éléments est strictement interdite sans autorisation écrite préalable.",
    ],
  },
  {
    title: "5. Formulaires et données",
    content: [
      "Le Site peut proposer des formulaires de contact ou de demande de devis. Les informations transmises via ces formulaires sont traitées conformément à notre Politique de confidentialité.",
      "L'utilisateur garantit l'exactitude et la véracité des informations fournies via les formulaires du Site.",
    ],
  },
  {
    title: "6. Liens hypertextes",
    content: [
      "Le Site peut contenir des liens hypertextes vers des sites tiers. Iso Tradition SA n'exerce aucun contrôle sur le contenu de ces sites et décline toute responsabilité quant à leur contenu ou à leur politique de confidentialité.",
      "La création de liens hypertextes vers le Site isotradition.ch est soumise à l'autorisation préalable d'Iso Tradition SA.",
    ],
  },
  {
    title: "7. Limitation de responsabilité",
    content: [
      "Iso Tradition SA s'efforce de fournir des informations précises et actualisées sur le Site, mais ne garantit ni l'exactitude, ni l'exhaustivité des informations mises à disposition.",
      "Iso Tradition SA ne saurait être tenue responsable des dommages directs ou indirects résultant de l'utilisation du Site, y compris en cas de virus, bug, ou indisponibilité du Site.",
    ],
  },
  {
    title: "8. Modification des CGU",
    content: [
      "Iso Tradition SA se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le Site. L'utilisation continue du Site après publication des modifications vaut acceptation des CGU modifiées.",
    ],
  },
  {
    title: "9. Droit applicable et juridiction",
    content: [
      "Les présentes CGU sont régies par le droit suisse. Tout litige relatif à l'interprétation ou à l'exécution des présentes sera soumis à la compétence exclusive des tribunaux du canton de Vaud, Suisse.",
    ],
  },
  {
    title: "10. Contact",
    content: [
      "Pour toute question relative aux présentes CGU, vous pouvez nous contacter :",
      "Iso Tradition SA\nRoute de Suisse 7A, 1295 Mies\nTéléphone : 021 624 53 00\nEmail : contact@isotradition.ch",
    ],
  },
];

export default async function CGU() {
  const sanityData = await getLegalPageBySlug("cgu");

  if (sanityData?.body && Array.isArray(sanityData.body) && sanityData.body.length > 0) {
    return (
      <LegalPageSanity
        title={sanityData.title || "Conditions générales d'utilisation"}
        lastUpdated={sanityData.lastUpdated || "28 mars 2026"}
        body={sanityData.body}
      />
    );
  }

  return (
    <LegalPage
      title="Conditions générales d'utilisation"
      lastUpdated="28 mars 2026"
      sections={sections}
    />
  );
}
