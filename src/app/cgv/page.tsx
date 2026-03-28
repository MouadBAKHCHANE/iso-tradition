import LegalPage from "@/components/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales de vente – ISO Tradition",
  description: "Conditions générales de vente d'Iso Tradition SA. Modalités de commande, livraison, garantie et paiement.",
};

const sections = [
  {
    title: "1. Champ d'application",
    content: [
      "Les présentes Conditions Générales de Vente (ci-après « CGV ») s'appliquent à l'ensemble des prestations et produits commercialisés par Iso Tradition SA (ci-après « le Prestataire »), sise Route de Suisse 7A, 1295 Mies, Suisse.",
      "Toute commande passée auprès du Prestataire implique l'acceptation sans réserve des présentes CGV, qui prévalent sur tout autre document du client, sauf dérogation expresse et écrite du Prestataire.",
    ],
  },
  {
    title: "2. Produits et prestations",
    content: [
      "Le Prestataire propose la fourniture et l'installation de :",
      [
        "Fenêtres (bois, PVC, aluminium, mixtes)",
        "Baies coulissantes",
        "Portes d'entrée",
        "Volets roulants et battants",
        "Portes de garage",
        "Stores bannes",
        "Films solaires",
        "Carports et pergolas",
      ],
      "Les caractéristiques des produits sont décrites dans les devis et fiches techniques remis au client. Les photographies et illustrations sur le Site ont une valeur indicative et ne sont pas contractuelles.",
    ],
  },
  {
    title: "3. Devis et commande",
    content: [
      "Tout projet débute par une visite technique gratuite et sans engagement, suivie de l'établissement d'un devis détaillé.",
      "Le devis est valable 30 jours à compter de sa date d'émission, sauf mention contraire. La commande est considérée comme ferme et définitive après signature du devis par le client et versement de l'acompte prévu.",
      "Toute modification de commande après acceptation du devis devra faire l'objet d'un avenant écrit et pourra entraîner une révision du prix et des délais.",
    ],
  },
  {
    title: "4. Prix et modalités de paiement",
    content: [
      "Les prix indiqués dans les devis sont en francs suisses (CHF), toutes taxes comprises (TTC). Ils comprennent la fourniture des matériaux, la main-d'œuvre d'installation et l'évacuation des anciens éléments, sauf mention contraire.",
      "Les modalités de paiement standard sont les suivantes :",
      [
        "30 % d'acompte à la signature du devis",
        "40 % à la livraison des matériaux sur chantier",
        "30 % à la réception des travaux (solde)",
      ],
      "En cas de retard de paiement, un intérêt moratoire de 5 % l'an sera appliqué de plein droit, conformément à l'article 104 du Code des obligations suisse (CO).",
    ],
  },
  {
    title: "5. Délais de livraison et d'installation",
    content: [
      "Les délais de livraison et d'installation sont communiqués à titre indicatif lors de l'acceptation du devis. Le Prestataire s'engage à mettre en œuvre tous les moyens raisonnables pour respecter les délais convenus.",
      "Tout retard de livraison ne pourra donner lieu à des dommages et intérêts ou à l'annulation de la commande, sauf accord écrit contraire. En cas de force majeure (intempéries, rupture d'approvisionnement, etc.), les délais seront prolongés de la durée de l'événement.",
    ],
  },
  {
    title: "6. Réception des travaux",
    content: [
      "À l'achèvement des travaux, une réception contradictoire est organisée entre le client et le Prestataire. Le client vérifie la conformité des travaux réalisés avec le devis accepté.",
      "En cas de réserves, celles-ci doivent être formulées par écrit lors de la réception. Le Prestataire s'engage à remédier aux défauts constatés dans un délai raisonnable.",
      "L'absence de réserves lors de la réception vaut acceptation définitive des travaux.",
    ],
  },
  {
    title: "7. Garanties",
    content: [
      "Les produits fournis par Iso Tradition SA bénéficient des garanties suivantes :",
      [
        "Garantie fabricant sur les produits : selon les conditions du fabricant (généralement 10 à 20 ans selon les produits)",
        "Garantie sur la pose : 2 ans à compter de la réception des travaux",
        "Garantie décennale : conformément aux usages de la branche en Suisse",
      ],
      "La garantie ne couvre pas les dommages résultant d'une utilisation anormale, d'un défaut d'entretien, d'une modification non autorisée ou d'un cas de force majeure.",
    ],
  },
  {
    title: "8. Droit de rétractation",
    content: [
      "Conformément à la législation suisse, il n'existe pas de droit de rétractation légal pour les contrats conclus en dehors d'un établissement commercial. Toutefois, conformément au Code des obligations, le client dispose d'un délai de réflexion de 7 jours pour les contrats conclus à domicile (article 40a CO et suivants).",
      "Ce droit de révocation doit être exercé par écrit (courrier ou email) dans le délai imparti.",
    ],
  },
  {
    title: "9. Responsabilité",
    content: [
      "La responsabilité du Prestataire est limitée aux dommages directs et prévisibles résultant d'un manquement avéré à ses obligations contractuelles.",
      "Le Prestataire ne saurait être tenu responsable des dommages indirects, tels que perte de jouissance, perte de revenus ou préjudice moral.",
    ],
  },
  {
    title: "10. Protection des données",
    content: [
      "Les données personnelles collectées dans le cadre de la relation commerciale sont traitées conformément à notre Politique de confidentialité et à la Loi fédérale sur la protection des données (nLPD).",
    ],
  },
  {
    title: "11. Droit applicable et juridiction",
    content: [
      "Les présentes CGV sont soumises au droit suisse. Tout litige relatif à leur interprétation ou à leur exécution sera soumis à la compétence exclusive des tribunaux du canton de Vaud, Suisse.",
    ],
  },
  {
    title: "12. Contact",
    content: [
      "Iso Tradition SA\nRoute de Suisse 7A, 1295 Mies\nTéléphone : 021 624 53 00\nEmail : contact@isotradition.ch",
    ],
  },
];

export default function CGV() {
  return (
    <LegalPage
      title="Conditions générales de vente"
      lastUpdated="28 mars 2026"
      sections={sections}
    />
  );
}
