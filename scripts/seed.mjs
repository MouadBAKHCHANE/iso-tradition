import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cav3bi02",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function seed() {
  console.log("🌱 Seeding Sanity...");

  // ── Site Settings ──
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "ISO Tradition",
    siteDescription: "Spécialiste en fenêtres, portes, volets et protections solaires en Suisse romande.",
    phone: "021 624 53 00",
    email: "contact@isotradition.ch",
    address: "Route de Suisse 7A",
    city: "Mies",
    postalCode: "1295",
    openingHours: "Lun - Ven : 8h00 - 17h00",
    byAppointment: true,
    ctaText: "Demander une offre",
    ctaUrl: "https://form.typeform.com/to/astTYipT",
  });
  console.log("✅ Site Settings");

  // ── Marketing Settings ──
  await client.createOrReplace({
    _id: "marketingSettings",
    _type: "marketingSettings",
    cookieConsentEnabled: false,
  });
  console.log("✅ Marketing Settings");

  // ── Homepage ──
  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    heroOverline: "Fenêtres & Portes Suisses",
    heroTitle: "Votre nouvel",
    heroTitleAccent: "art de vivre",
    heroSubtitle: "Des fenêtres et portes d'exception, alliant savoir-faire traditionnel suisse et technologies de pointe pour un confort inégalé.",
    heroCtaText: "Nos solutions",
    heroCtaLink: "/nos-solutions",
    aboutStatNumber: "+35",
    aboutStatLabel: "années d'expérience",
    aboutTitle: "L'excellence",
    aboutTitleAccent: "suisse",
    aboutText: "Basés à Mies, Route de Suisse 7A, nous intervenons dans toute la Suisse romande avec une équipe de professionnels certifiés. Notre mission : allier tradition artisanale et technologies modernes pour des fenêtres et portes d'exception.",
    aboutRating: "4.9/5",
    aboutRatingLabel: "avis clients",
    solutionsOverline: "Nos solutions",
    solutionsTitle: "Des solutions pour chaque",
    solutionsTitleAccent: "besoin",
    ctaTitle: "Prêt à transformer votre",
    ctaTitleAccent: "habitat",
    ctaSubtitle: "Contactez-nous pour une visite technique gratuite et un devis personnalisé.",
    serviceAreaTitle: "Nous intervenons dans toute la",
    serviceAreaTitleAccent: "Suisse romande",
    serviceAreaZones: ["Canton de Vaud", "Canton de Genève", "Canton de Fribourg", "Canton du Valais", "Canton de Neuchâtel"],
    faq: [
      { _key: "faq1", question: "Quels types de fenêtres proposez-vous ?", answer: "Nous proposons des fenêtres en PVC, bois, aluminium et bois-aluminium, avec double ou triple vitrage." },
      { _key: "faq2", question: "Intervenez-vous dans toute la Suisse romande ?", answer: "Oui, nous couvrons les cantons de Vaud, Genève, Fribourg, Valais et Neuchâtel." },
      { _key: "faq3", question: "Proposez-vous des devis gratuits ?", answer: "Oui, nous nous déplaçons gratuitement pour réaliser une visite technique et établir un devis personnalisé." },
      { _key: "faq4", question: "Les travaux sont-ils fiscalement déductibles ?", answer: "Oui, les travaux de rénovation énergétique sont fiscalement déductibles jusqu'en 2028." },
      { _key: "faq5", question: "Quelle est la durée de garantie ?", answer: "Nos produits bénéficient d'une garantie fabricant de 10 à 20 ans selon les produits, et d'une garantie de 2 ans sur la pose." },
    ],
  });
  console.log("✅ Homepage");

  // ── About Page ──
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: "Qui",
    heroTitleAccent: "sommes-nous",
    heroSubtitle: "Découvrez l'histoire et les valeurs d'ISO Tradition, votre partenaire de confiance pour vos projets de menuiserie en Suisse romande.",
    missionOverline: "Notre mission",
    missionTitle: "L'excellence suisse au service de votre",
    missionTitleAccent: "habitat",
    missionText: "Depuis plus de 35 ans, ISO Tradition s'engage à offrir des solutions de menuiserie sur mesure, alliant qualité artisanale et innovation technologique.",
    stats: [
      { _key: "s1", number: "+35", label: "années d'expérience" },
      { _key: "s2", number: "+3000", label: "projets réalisés" },
      { _key: "s3", number: "5", label: "cantons couverts" },
      { _key: "s4", number: "4.9/5", label: "avis clients" },
    ],
    valuesOverline: "Nos atouts",
    valuesTitle: "Pourquoi choisir",
    valuesTitleAccent: "ISO Tradition",
    values: [
      "Conseil personnalisé et visite technique gratuite",
      "Produits certifiés de fabricants européens reconnus",
      "Équipes de pose qualifiées et expérimentées",
      "Garantie fabricant de 10 à 20 ans",
      "Suivi après-vente réactif",
      "Accompagnement pour les subventions",
    ],
    processTitle: "Notre",
    processTitleAccent: "processus",
    processSteps: [
      { _key: "p1", title: "Prise de contact", description: "Appelez-nous ou remplissez le formulaire en ligne." },
      { _key: "p2", title: "Visite technique", description: "Un expert se déplace gratuitement chez vous." },
      { _key: "p3", title: "Devis personnalisé", description: "Offre détaillée sous 48h." },
      { _key: "p4", title: "Installation", description: "Pose par nos équipes certifiées." },
      { _key: "p5", title: "Suivi", description: "Service après-vente réactif et garantie." },
    ],
    zonesTitle: "Nos bureaux & zones",
    zonesTitleAccent: "d'intervention",
    zones: ["Canton de Vaud", "Canton de Genève", "Canton de Fribourg", "Canton du Valais", "Canton de Neuchâtel"],
    ctaTitle: "Prêt à transformer votre",
    ctaTitleAccent: "habitat",
    ctaSubtitle: "Contactez-nous pour une visite technique gratuite et un devis personnalisé.",
  });
  console.log("✅ About Page");

  // ── Contact Page ──
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    heroTitle: "Contactez",
    heroTitleAccent: "nous",
    heroSubtitle: "Notre équipe est à votre disposition pour répondre à toutes vos questions.",
    infoTitle: "Parlons de votre projet",
    infoSubtitle: "Nous nous déplaçons gratuitement pour une visite technique et un devis personnalisé.",
    formServices: ["Fenêtres", "Baies coulissantes", "Portes d'entrée", "Volets", "Portes de garage", "Stores bannes", "Films solaires", "Carports & Pergolas", "Autre"],
    formSuccessMessage: "Merci ! Votre message a bien été envoyé. Nous vous recontacterons dans les plus brefs délais.",
    mapTitle: "Nous trouver",
    mapSubtitle: "Route de Suisse 7A, 1295 Mies",
  });
  console.log("✅ Contact Page");

  // ── Solutions Page ──
  await client.createOrReplace({
    _id: "solutionsPage",
    _type: "solutionsPage",
    heroTitle: "Nos",
    heroTitleAccent: "solutions",
    heroSubtitle: "Des solutions complètes pour la rénovation et l'amélioration de votre habitat.",
    whyChooseTitle: "Pourquoi",
    whyChooseTitleAccent: "nous choisir",
    whyChooseCards: [
      { _key: "w1", title: "Isolation performante", description: "Réduction des déperditions thermiques jusqu'à 40%.", icon: "isolation" },
      { _key: "w2", title: "Confort optimal", description: "Isolation acoustique et thermique pour un habitat agréable.", icon: "confort" },
      { _key: "w3", title: "Sécurité renforcée", description: "Vitrages et serrures de dernière génération.", icon: "securite" },
      { _key: "w4", title: "Économies d'énergie", description: "Réduction de votre facture de chauffage.", icon: "reductions" },
      { _key: "w5", title: "Plus-value immobilière", description: "Valorisation de votre bien immobilier.", icon: "plusvalue" },
      { _key: "w6", title: "Impact environnemental", description: "Contribution à la réduction des émissions CO₂.", icon: "impact" },
    ],
    subventionsTitle: "Subventions &",
    subventionsTitleAccent: "aides financières",
    subventionsText: "Le Programme Bâtiments peut financer jusqu'à 30% des coûts de rénovation énergétique. Nous vous accompagnons dans toutes les démarches.",
    ctaTitle: "Prêt à transformer votre",
    ctaTitleAccent: "habitat",
    ctaSubtitle: "Contactez-nous pour une visite technique gratuite et un devis personnalisé.",
  });
  console.log("✅ Solutions Page");

  // ── Products ──
  const products = [
    {
      _id: "product-fenetres",
      name: "Fenêtres & portes-fenêtres",
      slug: { _type: "slug", current: "fenetres" },
      intro: "Le remplacement de vos fenêtres représente de nombreux atouts. Il empêche les courants d'air, fait baisser la facture de chauffage et améliore la qualité de l'habitat.",
      materials: ["PVC", "Bois", "Aluminium", "Bois-Aluminium", "Double vitrage", "Triple vitrage"],
      whyTitle: "Pourquoi remplacer vos fenêtres ?",
      whyText: "Des fenêtres performantes sont essentielles pour le confort thermique, l'isolation acoustique et la sécurité de votre habitat. Les anciennes fenêtres sont souvent responsables de 25% des déperditions de chaleur.",
      typesLabel: "Matériaux",
      personalisationLabel: "Vitrages",
      advantages: [
        "Isolation thermique renforcée",
        "Réduction des nuisances sonores",
        "Meilleure luminosité naturelle",
        "Sécurité anti-effraction",
        "Réduction de la facture énergétique",
        "Formes personnalisables",
        "Couleurs personnalisables à l'infini",
        "Entretien facilité selon le matériau",
        "Valorisation de votre bien immobilier",
      ],
      types: [
        { _key: "t1", name: "PVC", description: "Remarquables caractéristiques techniques en isolation, durabilité et étanchéité." },
        { _key: "t2", name: "Aluminium", description: "Adaptées aux grandes surfaces vitrées, peu d'entretien." },
        { _key: "t3", name: "Bois", description: "Aspect naturel, robustes et intelligemment conçues." },
        { _key: "t4", name: "Bois-Aluminium", description: "Le meilleur des deux mondes : chaleur du bois à l'intérieur, résistance de l'aluminium à l'extérieur." },
      ],
      personalisation: [
        { _key: "p1", name: "Double vitrage", description: "Convient à la plupart des rénovations courantes." },
        { _key: "p2", name: "Triple vitrage", description: "Plus performant, maximise le confort." },
      ],
      didYouKnow: "Le double vitrage convient à la plupart des rénovations courantes et offre déjà une bonne isolation thermique et acoustique.\nLe triple vitrage, plus performant, maximise le confort, réduit encore les pertes de chaleur et améliore l'efficacité énergétique.",
      faq: [
        { _key: "f1", question: "Quel type de vitrage choisir : double ou triple ?", answer: "Le double vitrage convient à la plupart des rénovations courantes. Le triple vitrage est recommandé pour les constructions neuves ou les rénovations énergétiques globales." },
        { _key: "f2", question: "Quelles subventions sont disponibles ?", answer: "Le Programme Bâtiments peut financer jusqu'à 30% des coûts dans le cadre d'une rénovation énergétique globale avec un certificat CECB." },
        { _key: "f3", question: "Combien de temps dure l'installation ?", answer: "Entre 2 et 4 heures par ouverture. Pour une maison complète, comptez 2 à 5 jours." },
      ],
    },
    {
      _id: "product-baies-coulissantes",
      name: "Baies coulissantes",
      slug: { _type: "slug", current: "baies-coulissantes" },
      intro: "Des baies vitrées généreuses apportent une luminosité exceptionnelle et créent une atmosphère de confort et de bien-être.",
      materials: ["PVC", "Aluminium", "Double vitrage", "Triple vitrage"],
      whyTitle: "Des pièces lumineuses pour un cadre de vie unique",
      whyText: "Les différentes configurations possibles mettent en valeur une architecture contemporaine et élégante.",
      typesLabel: "Matériaux",
      advantages: [
        "Apport maximal de lumière naturelle",
        "Vue dégagée et effet panoramique",
        "Gain de place : aucun battement vers l'intérieur",
        "Circulation fluide entre les espaces",
        "Confort thermique et acoustique",
        "Esthétique moderne",
        "Couleurs personnalisables",
      ],
      types: [
        { _key: "t1", name: "Coulissant classique", description: "Solution éprouvée pour les grandes ouvertures." },
        { _key: "t2", name: "Coulissant à levage", description: "Pour les très grandes dimensions." },
        { _key: "t3", name: "Coulissant d'angle", description: "Ouverture d'angle pour une transparence totale." },
      ],
      didYouKnow: "Une baie coulissante à levage peut atteindre plusieurs mètres de largeur tout en restant légère à manœuvrer.\nLe coulissant d'angle permet de supprimer le poteau de coin, créant une ouverture à 90° spectaculaire.",
      faq: [
        { _key: "f1", question: "Quelle largeur maximale pour une baie coulissante ?", answer: "Jusqu'à 6 mètres de largeur avec des vantaux de 3 mètres." },
        { _key: "f2", question: "Les baies coulissantes sont-elles sécurisées ?", answer: "Oui, avec systèmes de fermeture multipoints et vitrages de sécurité." },
      ],
    },
    {
      _id: "product-portes-entree",
      name: "Portes d'entrée",
      slug: { _type: "slug", current: "portes-entree" },
      intro: "La porte d'entrée est la carte de visite de votre maison. Elle allie sécurité, isolation et esthétique.",
      materials: ["PVC", "Aluminium", "Bois", "Bois-Aluminium"],
      whyTitle: "Sécurité, isolation et design pour votre entrée",
      whyText: "La porte d'entrée joue un rôle crucial dans l'isolation thermique et la sécurité de votre maison.",
      typesLabel: "Matériaux",
      typesVertical: true,
      advantages: [
        "Sécurité renforcée (serrures multipoints)",
        "Isolation thermique et acoustique",
        "Large choix de designs et couleurs",
        "Formes personnalisables",
        "Motifs décoratifs au choix",
        "Durabilité selon le matériau",
        "Valorisation de votre bien",
      ],
      types: [
        { _key: "t1", name: "PVC", description: "Pratique, économique et facile à entretenir." },
        { _key: "t2", name: "Aluminium", description: "Design moderne, robustesse et durabilité." },
        { _key: "t3", name: "Bois", description: "Chaleur, authenticité et prestige naturel." },
        { _key: "t4", name: "Bois-Aluminium", description: "Esthétique et performance réunies." },
      ],
      didYouKnow: "La porte d'entrée représente environ 10% des déperditions thermiques d'une maison.\nUne porte bois-aluminium combine le meilleur des deux matériaux.",
      faq: [
        { _key: "f1", question: "Quelle est la durée de vie d'une porte d'entrée ?", answer: "Entre 30 et 50 ans selon le matériau et l'entretien." },
      ],
    },
    {
      _id: "product-volets",
      name: "Volets roulants & battants",
      slug: { _type: "slug", current: "volets" },
      intro: "Les volets jouent un rôle essentiel dans le confort de l'habitat.",
      materials: ["PVC", "Aluminium", "Bois", "Électrique", "Solaire", "Manuel"],
      whyTitle: "Pourquoi installer des volets ?",
      whyText: "Les volets constituent une solution efficace pour réduire les pertes de chaleur en hiver et limiter la surchauffe estivale.",
      typesLabel: "Types",
      advantages: [
        "Amélioration du confort thermique",
        "Réduction des déperditions énergétiques",
        "Gain de place (roulants)",
        "Protection solaire efficace",
        "Occultation totale ou partielle",
        "Renforcement de la sécurité",
        "Amélioration du confort acoustique",
        "Valorisation du bien immobilier",
        "Esthétique traditionnelle (battants)",
      ],
      types: [
        { _key: "t1", name: "Volets roulants", description: "Motorisés ou manuels. Gain de place maximal, occultation totale." },
        { _key: "t2", name: "Volets battants aluminium", description: "Légèreté et robustesse. Design épuré." },
        { _key: "t3", name: "Volets à persiennes", description: "Lames orientables pour un contrôle précis de la lumière." },
        { _key: "t4", name: "Volets battants classiques", description: "Style traditionnel intemporel." },
      ],
      didYouKnow: "Les volets roulants peuvent réduire les déperditions thermiques de 20 à 30% en hiver.\nLa motorisation solaire fonctionne même par temps couvert.",
      faq: [
        { _key: "f1", question: "Volets roulants ou battants : comment choisir ?", answer: "Les roulants pour le confort moderne, les battants pour le charme traditionnel." },
      ],
    },
    {
      _id: "product-portes-garage",
      name: "Portes de garage",
      slug: { _type: "slug", current: "portes-garage" },
      intro: "La porte de garage est un élément clé de votre maison.",
      materials: ["Aluminium", "Acier", "Bois", "Électrique", "Manuel"],
      whyTitle: "Sécurité, confort et esthétique pour votre garage",
      whyText: "Des solutions modernes et personnalisables combinant design, confort et performance.",
      typesLabel: "Types",
      advantages: [
        "Sécurité renforcée",
        "Isolation thermique et acoustique",
        "Compatibilité avec tous les types d'architecture",
        "Durabilité et entretien adapté",
        "Confort d'usage grâce à l'automatisation",
        "Finitions décoratives et couleurs personnalisables",
        "Hublots possibles pour la lumière naturelle",
      ],
      types: [
        { _key: "t1", name: "Sectionnelle haut de plafond", description: "S'ouvre verticalement et se loge au plafond." },
        { _key: "t2", name: "Sectionnelle latérale", description: "S'ouvre latéralement le long du mur." },
        { _key: "t3", name: "Enroulable coffre", description: "S'enroule dans un coffre compact." },
      ],
      didYouKnow: "Une porte de garage sectionnelle bien isolée peut contribuer à réduire les déperditions de chaleur.",
      faq: [
        { _key: "f1", question: "Quelle motorisation choisir ?", answer: "Motorisations électriques silencieuses avec télécommande, compatibles domotique." },
      ],
    },
    {
      _id: "product-stores-bannes",
      name: "Stores bannes",
      slug: { _type: "slug", current: "stores-bannes" },
      intro: "Les stores bannes sont la solution idéale pour profiter de vos espaces extérieurs.",
      materials: ["Aluminium", "Manuel", "Électrique"],
      whyTitle: "Confort, protection solaire et style pour vos terrasses",
      whyText: "Adaptés aux maisons individuelles pour créer des zones ombragées et agréables.",
      advantages: [
        "Protection efficace contre le soleil",
        "Style et personnalisation multiples",
        "Facilité d'utilisation",
        "Éclairage intégré possible",
        "Lambrequin déroulable",
        "Augmentation du confort terrasse",
        "Toiles et couleurs personnalisables",
      ],
      types: [
        { _key: "t1", name: "Store coffre intégral", description: "Toile et mécanisme entièrement protégés." },
        { _key: "t2", name: "Store semi-coffre", description: "Protection partielle. Bon compromis." },
        { _key: "t3", name: "Store monobloc", description: "Solution économique sans coffre." },
      ],
      didYouKnow: "Un store banne peut réduire la température intérieure de 3 à 8°C.",
      faq: [
        { _key: "f1", question: "Quelle largeur maximale ?", answer: "Jusqu'à 7 mètres de largeur et 4 mètres d'avancée." },
      ],
    },
    {
      _id: "product-films-solaires",
      name: "Films solaires",
      slug: { _type: "slug", current: "films-solaires" },
      intro: "Les films solaires sont une solution simple et efficace pour améliorer le confort intérieur.",
      materials: ["Anti-UV", "Anti-éblouissement", "Effet miroir", "Décoratif"],
      whyTitle: "Confort thermique sans travaux lourds",
      whyText: "Les films solaires réduisent significativement la chaleur intérieure et l'éblouissement tout en conservant la luminosité.",
      advantages: [
        "Réduction de la chaleur (rejet infrarouge jusqu'à 98%)",
        "Diminution des dépenses de climatisation",
        "Amélioration du confort sans travaux",
        "Discrétion et esthétique préservées",
        "Réduction de l'éblouissement (jusqu'à 99%)",
        "Protection des meubles contre les UV",
        "Jusqu'à 30% de réduction de déperdition de chaleur",
      ],
      types: [
        { _key: "t1", name: "Anti-UV", description: "Bloque jusqu'à 99% des rayons ultraviolets." },
        { _key: "t2", name: "Anti-éblouissement", description: "Réduit l'éblouissement tout en conservant la vue." },
        { _key: "t3", name: "Effet miroir", description: "Intimité en journée grâce à l'effet réfléchissant." },
        { _key: "t4", name: "Décoratif", description: "Films à motifs ou dépolis pour personnaliser vos vitrages." },
      ],
      didYouKnow: "Les films solaires modernes rejettent jusqu'à 98% des rayons infrarouges tout en laissant passer 70% de la lumière visible.",
      faq: [
        { _key: "f1", question: "Le film réduit-il la luminosité ?", answer: "Non, les films modernes laissent passer la lumière naturelle." },
      ],
    },
    {
      _id: "product-carports-pergolas",
      name: "Carports & Pergolas",
      slug: { _type: "slug", current: "carports-pergolas" },
      intro: "Les carports et pergolas sont des solutions d'aménagement extérieur qui protègent et valorisent votre habitat.",
      materials: ["Aluminium", "Bois", "Toiture orientable", "Toiture fixe"],
      whyTitle: "Protection et style pour vos extérieurs",
      whyText: "Des structures modulables, durables et esthétiques qui prolongent votre espace de vie vers l'extérieur.",
      typesLabel: "Types",
      advantages: [
        "Protection du véhicule contre les intempéries",
        "Espace de vie extérieur toute l'année",
        "Valorisation du bien immobilier",
        "Personnalisation complète",
        "Options domotique",
        "Éclairage et chauffage intégrés (pergolas)",
        "Durabilité des matériaux",
      ],
      types: [
        { _key: "t1", name: "Carport adossé", description: "Fixé contre la façade. Solution compacte et élégante." },
        { _key: "t2", name: "Carport autoportant", description: "Structure indépendante. Plus de flexibilité." },
        { _key: "t3", name: "Pergola adossée", description: "Extension naturelle de votre terrasse." },
        { _key: "t4", name: "Pergola autoportante", description: "Espace indépendant au jardin." },
      ],
      didYouKnow: "Un carport protège aussi efficacement contre la grêle qu'un garage fermé, tout en évitant la condensation.\nUne pergola bioclimatique peut être utilisée 9 à 10 mois par an en Suisse romande.",
      faq: [
        { _key: "f1", question: "Faut-il un permis de construire ?", answer: "Selon la taille et la commune, un permis peut être requis. Nous vous accompagnons dans les démarches." },
      ],
    },
  ];

  for (const p of products) {
    await client.createOrReplace({ _type: "product", ...p });
    console.log(`✅ Product: ${p.name}`);
  }

  console.log("\n🎉 Seeding complete!");
}

seed().catch(console.error);
