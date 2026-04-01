import LegalPage from "@/components/LegalPage";
import LegalPageSanity from "@/components/LegalPageSanity";
import { getLegalPageBySlug } from "@/lib/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales – ISO Tradition",
  description: "Mentions légales du site isotradition.ch. Informations sur l'éditeur, l'hébergeur et la propriété intellectuelle.",
};

const sections = [
  {
    title: "1. Éditeur du site",
    content: [
      "Le site isotradition.ch est édité par :",
      "Iso Tradition SA\nRoute de Suisse 7A\n1295 Mies, Vaud, Suisse",
      "Téléphone : 021 624 53 00\nEmail : contact@isotradition.ch",
      "Numéro IDE : CHE-XXX.XXX.XXX\nRegistre du commerce : Canton de Vaud",
    ],
  },
  {
    title: "2. Directeur de la publication",
    content: [
      "Le directeur de la publication est le représentant légal de la société Iso Tradition SA.",
    ],
  },
  {
    title: "3. Hébergement",
    content: [
      "Le site est hébergé par :",
      "Vercel Inc.\n440 N Barranca Ave #4133\nCovina, CA 91723, États-Unis\nSite web : vercel.com",
    ],
  },
  {
    title: "4. Propriété intellectuelle",
    content: [
      "L'ensemble du contenu du site isotradition.ch (textes, images, graphismes, logo, icônes, vidéos, sons, logiciels, bases de données, etc.) est protégé par le droit d'auteur suisse et international.",
      "Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable d'Iso Tradition SA.",
      "Les marques, logos et signes distinctifs présentés sur le site sont la propriété exclusive d'Iso Tradition SA ou de ses partenaires. Toute utilisation non autorisée constitue une contrefaçon au sens du droit suisse.",
    ],
  },
  {
    title: "5. Crédits",
    content: [
      "Conception et développement du site : MouaDev",
      "Photographies : Iso Tradition SA et banques d'images sous licence.",
    ],
  },
  {
    title: "6. Limitation de responsabilité",
    content: [
      "Iso Tradition SA s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur son site, dont elle se réserve le droit de modifier le contenu à tout moment et sans préavis.",
      "Iso Tradition SA ne saurait être tenue responsable des erreurs, omissions, ou des résultats qui pourraient être obtenus par un mauvais usage de ces informations.",
      "Les liens hypertextes mis en place vers d'autres sites ne sauraient engager la responsabilité d'Iso Tradition SA quant au contenu de ces sites.",
    ],
  },
  {
    title: "7. Droit applicable et juridiction",
    content: [
      "Le présent site et ses mentions légales sont régis par le droit suisse. En cas de litige, les tribunaux du canton de Vaud seront seuls compétents.",
    ],
  },
];

export default async function MentionsLegales() {
  const sanityData = await getLegalPageBySlug("mentions-legales");

  if (sanityData?.body && Array.isArray(sanityData.body) && sanityData.body.length > 0) {
    return (
      <LegalPageSanity
        title={sanityData.title || "Mentions légales"}
        lastUpdated={sanityData.lastUpdated || "28 mars 2026"}
        body={sanityData.body}
      />
    );
  }

  return (
    <LegalPage
      title="Mentions légales"
      lastUpdated="28 mars 2026"
      sections={sections}
    />
  );
}
