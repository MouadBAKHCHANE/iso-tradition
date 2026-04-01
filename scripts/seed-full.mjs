import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { basename, extname } from "path";

const client = createClient({
  projectId: "cav3bi02",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const IMG_BASE = "public/images";

// Upload image to Sanity and return asset reference
async function uploadImage(localPath) {
  const fullPath = localPath.startsWith("public/") ? localPath : `${IMG_BASE}/${localPath}`;
  if (!existsSync(fullPath)) {
    console.log(`  ⚠️  Missing: ${fullPath}`);
    return undefined;
  }
  const ext = extname(fullPath).slice(1);
  const contentType = ext === "webp" ? "image/webp" : ext === "png" ? "image/png" : "image/jpeg";
  const buffer = readFileSync(fullPath);
  const asset = await client.assets.upload("image", buffer, {
    filename: basename(fullPath),
    contentType,
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

// Helper: image ref for array items
async function imgRef(localPath) {
  const fullPath = localPath.startsWith("/") ? `public${localPath}` : localPath;
  return await uploadImage(fullPath);
}

async function seed() {
  console.log("🌱 Full Sanity Seed — with images\n");

  // ═══════════════════════════════════════
  // SITE SETTINGS
  // ═══════════════════════════════════════
  console.log("📦 Site Settings...");
  const logoCouleur = await uploadImage("public/images/logo-couleur.webp");
  const logoBlanc = await uploadImage("public/images/logo-blanc.webp");

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "ISO Tradition",
    siteDescription: "Spécialiste en fenêtres, portes, volets et protections solaires en Suisse romande. Qualité suisse, conseil personnalisé et installation professionnelle.",
    logo: logoCouleur,
    logoWhite: logoBlanc,
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
  console.log("✅ Site Settings\n");

  // ═══════════════════════════════════════
  // MARKETING SETTINGS
  // ═══════════════════════════════════════
  await client.createOrReplace({
    _id: "marketingSettings",
    _type: "marketingSettings",
    cookieConsentEnabled: false,
  });
  console.log("✅ Marketing Settings\n");

  // ═══════════════════════════════════════
  // HOMEPAGE
  // ═══════════════════════════════════════
  console.log("📦 Homepage...");
  const heroImg = await imgRef("/images/hero-terrace.webp");
  const aboutLakeImg = await imgRef("/images/about-lake.webp");
  const whyReplaceImg = await imgRef("/images/why-replace.webp");
  const serviceAreaImg = await imgRef("/images/suisse-paysage.webp");
  const strength3Img = await imgRef("/images/strength-3.webp");
  const strengthLivingImg = await imgRef("/images/strength-living.webp");
  const strengthWorkerImg = await imgRef("/images/strength-worker.webp");

  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    // Hero
    heroOverline: "Fenêtres & Portes Suisses",
    heroTitle: "Votre nouvel",
    heroTitleAccent: "art de vivre",
    heroSubtitle: "Des fenêtres et portes d'exception, alliant savoir-faire traditionnel suisse et technologies de pointe pour un confort inégalé.",
    heroImage: heroImg,
    heroCtaText: "Nos solutions",
    heroCtaLink: "/nos-solutions",

    // About preview
    aboutImage: aboutLakeImg,
    aboutStatNumber: "+35",
    aboutStatLabel: "années d'expérience",
    aboutTitle: "L'excellence",
    aboutTitleAccent: "suisse",
    aboutText: "Basés à Mies, Route de Suisse 7A, nous intervenons dans toute la Suisse romande avec une équipe de professionnels certifiés. Notre mission : allier tradition artisanale et technologies modernes pour des fenêtres et portes d'exception.",
    aboutRating: "4.9/5",
    aboutRatingLabel: "avis clients",

    // Solutions
    solutionsOverline: "Nos solutions",
    solutionsTitle: "Des solutions pour chaque",
    solutionsTitleAccent: "besoin",

    // Why Replace
    whyReplaceTitle: "Pourquoi remplacer vos",
    whyReplaceTitleAccent: "portes & fenêtres ?",
    whyReplaceImage: whyReplaceImg,
    whyReplaceReasons: [
      { _key: "wr1", title: "Économies d'énergie", description: "Réduisez jusqu'à 30% vos pertes de chaleur avec des fenêtres à haute isolation thermique. Des menuiseries performantes diminuent votre consommation de chauffage et climatisation." },
      { _key: "wr2", title: "Sécurité renforcée", description: "Profitez de vitrages anti-effraction et de serrures multipoints pour protéger votre foyer. Nos solutions répondent aux normes de sécurité les plus exigeantes." },
      { _key: "wr3", title: "Confort acoustique", description: "Isolez-vous des nuisances sonores extérieures grâce à des vitrages haute performance. Profitez d'un intérieur calme et serein, même en milieu urbain." },
      { _key: "wr4", title: "Valorisation du bien", description: "Augmentez la valeur de votre propriété avec des menuiseries modernes et certifiées. Un investissement rentable qui améliore l'attrait et la performance de votre habitat." },
    ],

    // Strengths
    strengthsOverline: "Nos atouts",
    strengthsTitle: "Pourquoi choisir",
    strengthsTitleAccent: "Iso Tradition ?",
    strengths: [
      { _key: "st1", title: "+2'500 Portes & fenêtres posées", description: "Un volume qui témoigne de la confiance de nos clients et de notre capacité d'exécution.", image: strength3Img },
      { _key: "st2", title: "100% Pose par nos équipes internes", description: "Aucune sous-traitance. Chaque installation est réalisée par nos poseurs qualifiés pour un résultat irréprochable.", image: strengthLivingImg },
      { _key: "st3", title: "+35 Années d'expérience", description: "Plus de trois décennies de savoir-faire au service de votre confort et de votre sécurité.", image: strengthWorkerImg },
    ],

    // CTA
    ctaTitle: "Prêt à transformer votre",
    ctaTitleAccent: "habitat",
    ctaSubtitle: "Contactez-nous pour une visite technique gratuite et un devis personnalisé.",

    // Service Area
    serviceAreaTitle: "Nous intervenons dans toute la",
    serviceAreaTitleAccent: "Suisse romande",
    serviceAreaImage: serviceAreaImg,
    serviceAreaZones: ["Canton de Vaud", "Canton de Genève", "Canton de Fribourg", "Canton du Valais", "Canton de Neuchâtel"],

    // FAQ
    faq: [
      { _key: "faq1", question: "Combien de temps dure une installation de fenêtres ?", answer: "Une installation standard dure 1 à 3 jours selon le nombre de fenêtres et la complexité du chantier. Nous établissons un planning précis avant chaque intervention pour minimiser les désagréments." },
      { _key: "faq2", question: "Quels types de matériaux proposez-vous ?", answer: "Nous travaillons avec le PVC, l'aluminium et le bois. Chaque matériau a ses avantages : le PVC pour le rapport qualité-prix, l'aluminium pour la finesse et la modernité, le bois pour l'authenticité et l'isolation naturelle." },
      { _key: "faq3", question: "Proposez-vous des garanties sur vos installations ?", answer: "Oui, tous nos produits bénéficient d'une garantie fabricant de 5 à 10 ans selon le type de menuiserie. Notre pose est garantie 2 ans. Nous restons disponibles pour tout service après-vente." },
      { _key: "faq4", question: "Intervenez-vous dans toute la Suisse romande ?", answer: "Nous intervenons principalement dans le canton de Vaud, Genève, Fribourg et Valais. Pour les autres cantons romands, contactez-nous pour vérifier notre disponibilité." },
      { _key: "faq5", question: "Comment obtenir un devis gratuit ?", answer: "Vous pouvez nous contacter par téléphone au 021 624 53 00, via notre formulaire en ligne, ou nous envoyer un e-mail. Nous organisons une visite gratuite pour prendre les mesures et vous proposer un devis détaillé sous 48h." },
    ],
  });
  console.log("✅ Homepage\n");

  // ═══════════════════════════════════════
  // ABOUT PAGE
  // ═══════════════════════════════════════
  console.log("📦 About Page...");
  const aboutInstallImg = await imgRef("/images/about-install.webp");
  const aboutFamilyImg = await imgRef("/images/about-family.webp");
  const aboutGateImg = await imgRef("/images/about-gate.webp");
  const carteImg = await imgRef("/images/carte.webp");
  const aboutCozyImg = await imgRef("/images/about-cozy.webp");
  const suissePaysageImg = await imgRef("/images/suisse-paysage.webp");

  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: "L'excellence suisse au service de votre",
    heroTitleAccent: "habitat",
    heroSubtitle: "Chez Iso Tradition, nous accompagnons les propriétaires en Suisse romande depuis plus de 35 ans avec des fenêtres, portes et volets d'exception.",
    heroImage: suissePaysageImg,
    gallery: [
      { ...aboutInstallImg, _key: "g1", alt: "Technicien installant une fenêtre" },
      { ...aboutFamilyImg, _key: "g2", alt: "Famille profitant du confort de son intérieur" },
      { ...aboutGateImg, _key: "g3", alt: "Installation portail par nos équipes" },
    ],
    missionOverline: "À propos",
    missionTitle: "Une entreprise familiale ancrée en",
    missionTitleAccent: "Suisse romande",
    missionText: "Basés à Mies, Route de Suisse 7A, Iso Tradition est née de la passion pour le travail bien fait et de la conviction que chaque habitat mérite des menuiseries d'exception. Depuis notre création, nous avons accompagné des milliers de propriétaires dans leurs projets de rénovation et de construction neuve.\n\nNotre équipe de professionnels certifiés intervient dans toute la Suisse romande avec une exigence constante : allier le savoir-faire traditionnel suisse aux technologies les plus avancées pour garantir performance énergétique, confort acoustique et esthétique durable.",
    missionImage: aboutCozyImg,
    stats: [
      { _key: "s1", number: "+35", label: "années d'expérience" },
      { _key: "s2", number: "+2500", label: "projets réalisés" },
      { _key: "s3", number: "100%", label: "pose interne" },
      { _key: "s4", number: "4.9/5", label: "avis clients" },
    ],
    valuesOverline: "Nos atouts",
    valuesTitle: "Pourquoi choisir",
    valuesTitleAccent: "Iso Tradition ?",
    values: [
      "Une expérience éprouvée sur le marché suisse",
      "Performance, sécurité et esthétique",
      "Des experts-métiers à votre service",
      "Un process clé en main 100% internalisé",
      "Un conseil personnalisé & sur-mesure",
      "Un engagement éco-responsable",
    ],
    processTitle: "Un process 100%",
    processTitleAccent: "intégré",
    processSteps: [
      { _key: "p1", title: "Prise de contact", description: "Nos experts locaux vous recontactent pour une prise de RDV." },
      { _key: "p2", title: "1ère rencontre", description: "L'un de nos experts se déplace chez vous pour évaluer votre besoin." },
      { _key: "p3", title: "Visite technique", description: "Recueil des données techniques du projet et relevé des dimensions." },
      { _key: "p4", title: "Choix des solutions", description: "Nous vous proposons des solutions sur mesure (vitrage, matériau, finitions, couleurs)." },
      { _key: "p5", title: "Aides & subventions", description: "Notre service administratif se charge de la demande des subventions (le cas échéant)." },
      { _key: "p6", title: "Planification de la pose", description: "Nous fixons avec vous l'échéancier pour la dépose et la pose de vos nouvelles menuiseries." },
      { _key: "p7", title: "Pose & dépose", description: "La pose des nouvelles portes et fenêtres est réalisée par nos experts qualifiés dans les règles de l'art." },
      { _key: "p8", title: "Contrôle du chantier", description: "Contrôle visuel et fonctionnel des nouvelles menuiseries puis réception de chantier finale." },
      { _key: "p9", title: "Conseils d'utilisation", description: "Chaque client reçoit des conseils d'entretien pour préserver la longévité des menuiseries." },
    ],
    zonesTitle: "Basés à Mies, présents dans toute la",
    zonesTitleAccent: "Suisse romande",
    zonesImage: suissePaysageImg,
    zones: ["Canton de Vaud", "Canton de Genève", "Canton de Fribourg", "Canton du Valais", "Canton de Neuchâtel"],
    ctaTitle: "Prêt à transformer votre",
    ctaTitleAccent: "habitat",
    ctaSubtitle: "Contactez-nous dès aujourd'hui pour une visite technique gratuite et sans engagement. Nos experts vous accompagnent à chaque étape de votre projet.",
  });
  console.log("✅ About Page\n");

  // ═══════════════════════════════════════
  // CONTACT PAGE
  // ═══════════════════════════════════════
  console.log("📦 Contact Page...");
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    heroTitle: "Nous sommes là pour vous",
    heroTitleAccent: "aider !",
    heroSubtitle: "Des questions ? Besoin d'un devis ? Contactez-nous pour une assistance rapide ou un devis gratuit !",
    infoTitle: "Nous sommes là pour tous vos projets de menuiserie",
    infoSubtitle: "Nous nous déplaçons gratuitement pour une visite technique et un devis personnalisé.",
    formServices: ["Fenêtres", "Baies coulissantes", "Portes d'entrée", "Volets", "Portes de garage", "Stores bannes", "Films solaires", "Carports & pergolas"],
    formSuccessMessage: "Message envoyé avec succès ! Nous vous recontacterons rapidement.",
    mapTitle: "Rendez-nous visite",
    mapSubtitle: "Nos bureaux sont situés à Mies (VD), au bord du lac Léman. Nous vous accueillons du lundi au vendredi pour discuter de votre projet.",
  });
  console.log("✅ Contact Page\n");

  // ═══════════════════════════════════════
  // SOLUTIONS PAGE
  // ═══════════════════════════════════════
  console.log("📦 Solutions Page...");
  const progBatImg = await imgRef("/images/programme-batiments.webp");
  const scanWindowImg = await imgRef("/images/scandinavian-window.webp");

  await client.createOrReplace({
    _id: "solutionsPage",
    _type: "solutionsPage",
    heroTitle: "Nos",
    heroTitleAccent: "solutions",
    heroSubtitle: "Des menuiseries 100% personnalisables pour tous les besoins et tous les styles d'habitat. Matériaux, vitrage, couleurs, finitions : à l'infini !",
    whyChooseTitle: "Pourquoi remplacer vos",
    whyChooseTitleAccent: "portes & fenêtres",
    whyChooseCards: [
      { _key: "w1", title: "Confort de vie optimal", description: "une température intérieure plus stable, un confort optimal été comme hiver, une meilleure luminosité", icon: "confort" },
      { _key: "w2", title: "Réduction des factures", description: "limite les déperditions de chaleur, réduit les besoins en chauffage, conserve l'énergie produite", icon: "reductions" },
      { _key: "w3", title: "Impact écologique", description: "réduction des émissions de CO₂, utilisation responsable des ressources, démarche durable d'avenir", icon: "impact" },
      { _key: "w4", title: "Isolation acoustique", description: "circulation routière, voisinage, environnement urbain ou périurbain", icon: "isolation" },
      { _key: "w5", title: "Sécurité renforcée", description: "ferrures renforcées, vitrages de sécurité, systèmes de fermeture multipoints", icon: "securite" },
      { _key: "w6", title: "Plus-value du bien", description: "étiquette verte, matériaux robustes et durables, finitions personnalisables et élégantes", icon: "plusvalue" },
    ],
    subventionsTitle: "Normes, réglementations &",
    subventionsTitleAccent: "subventions",
    subventionsText: "En Suisse, le remplacement des fenêtres et des portes est encadré par des exigences énergétiques élevées. Les solutions que nous proposons y répondent sans exception. Les subventions sont possibles uniquement dans le cadre d'une rénovation énergétique globale, et les travaux sont encore fiscalement déductibles, jusqu'en 2028.",
    subventionsImage: progBatImg,
    ctaTitle: "Prêt à lancer votre",
    ctaTitleAccent: "projet ?",
    ctaSubtitle: "Nos experts se déplacent gratuitement pour évaluer votre projet et vous proposer une solution sur mesure.",
  });
  console.log("✅ Solutions Page\n");

  // ═══════════════════════════════════════
  // BLOG POSTS
  // ═══════════════════════════════════════
  console.log("📦 Blog Posts...");
  const blog1Img = await imgRef("/images/blog-1.webp");
  const blog2Img = await imgRef("/images/blog-2.webp");
  const blog3Img = await imgRef("/images/blog-3.webp");

  const blogPosts = [
    { _id: "blog-1", title: "Comment choisir les bonnes fenêtres pour votre habitat", slug: { _type: "slug", current: "choisir-bonnes-fenetres" }, excerpt: "Guide complet pour choisir les fenêtres idéales en fonction de vos besoins d'isolation, de sécurité et d'esthétique.", image: blog1Img, category: "conseils", date: "2025-03-15" },
    { _id: "blog-2", title: "Réduire sa facture énergétique grâce à l'isolation des fenêtres", slug: { _type: "slug", current: "reduire-facture-energetique" }, excerpt: "Découvrez comment le remplacement de vos fenêtres peut réduire significativement votre consommation d'énergie.", image: blog2Img, category: "conseils", date: "2025-02-28" },
    { _id: "blog-3", title: "Les tendances 2025 en menuiserie et design intérieur", slug: { _type: "slug", current: "tendances-2025-menuiserie" }, excerpt: "Les dernières tendances en matière de fenêtres, portes et aménagements intérieurs pour cette année.", image: blog3Img, category: "actualites", date: "2025-02-10" },
  ];
  for (const post of blogPosts) {
    await client.createOrReplace({ _type: "blogPost", ...post });
    console.log(`  ✅ Blog: ${post.title}`);
  }
  console.log("");

  // ═══════════════════════════════════════
  // PRODUCTS — with ALL images
  // ═══════════════════════════════════════
  console.log("📦 Products...");

  // -- FENETRES --
  const fenHero = await imgRef("/images/sol-fenetres.webp");
  const fenWhy = await imgRef("/images/products/fenetres/why.webp");
  const fenAdv = await imgRef("/images/products/fenetres/advantages.webp");
  const fenPvc = await imgRef("/images/products/fenetres/pvc.webp");
  const fenAlu = await imgRef("/images/products/fenetres/alu.webp");
  const fenBois = await imgRef("/images/products/fenetres/bois.webp");
  const fenBoisAlu = await imgRef("/images/products/fenetres/bois-alu.webp");
  const fenDV = await imgRef("/images/products/fenetres/double-vitrage-v2.webp");
  const fenTV = await imgRef("/images/products/fenetres/triple-vitrage.webp");
  // Icons
  const icoRect = await imgRef("/images/icons/rectangulaire.webp");
  const icoRonde = await imgRef("/images/icons/ronde.webp");
  const icoTrapeze = await imgRef("/images/icons/trapeze.webp");
  const icoTriang = await imgRef("/images/icons/triangulaire.webp");
  const icoCouleurs = await imgRef("/images/icons/couleurs.webp");
  const icoConfig = await imgRef("/images/icons/config.webp");
  const icoAlu = await imgRef("/images/icons/alu.webp");
  const icoBois = await imgRef("/images/icons/bois.webp");
  const icoPvc = await imgRef("/images/icons/pvc.webp");
  const icoMoteur = await imgRef("/images/icons/moteur.webp");
  const icoSolaire = await imgRef("/images/icons/solaire.webp");
  const icoManuel = await imgRef("/images/icons/manuel.webp");
  const icoBso = await imgRef("/images/icons/bso.webp");
  const icoAcier = await imgRef("/images/icons/acier.webp");
  const icoGarageHaut = await imgRef("/images/icons/garage-haut.webp");
  const icoGarageLat = await imgRef("/images/icons/garage-lateral.webp");
  const icoGarageEnr = await imgRef("/images/icons/garage-enroulable.webp");
  const icoFinitions = await imgRef("/images/icons/finitions-deco.webp");
  const icoLumiere = await imgRef("/images/icons/lumiere.webp");
  const icoAdosse = await imgRef("/images/icons/adosse.webp");
  const icoAutoportant = await imgRef("/images/icons/autoportant.webp");
  const icoToitureTendue = await imgRef("/images/icons/toiture-tendue.webp");
  const icoToitureFixe = await imgRef("/images/icons/toiture-fixe.webp");
  const icoToiturePleine = await imgRef("/images/icons/toiture-pleine.webp");
  const icoToitureTranslucide = await imgRef("/images/icons/toiture-translucide.webp");
  const icoToitureOrientable = await imgRef("/images/icons/toiture-orientable.webp");
  const icoChauffage = await imgRef("/images/icons/chauffage.webp");
  const icoVitrage = await imgRef("/images/icons/vitrage.webp");
  const icoSolUv = await imgRef("/images/icons/sol-uv.webp");
  const icoSolGlare = await imgRef("/images/icons/sol-glare.webp");
  const icoSolMirror = await imgRef("/images/icons/sol-mirror.webp");
  const icoSolDeco = await imgRef("/images/icons/sol-deco.webp");
  const icoAppMaison = await imgRef("/images/icons/app-maison.webp");
  const icoAppVeranda = await imgRef("/images/icons/app-veranda.webp");
  const icoAppVerriere = await imgRef("/images/icons/app-verriere.webp");
  const icoAppBaie = await imgRef("/images/icons/app-baie.webp");

  await client.createOrReplace({
    _id: "product-fenetres", _type: "product",
    name: "Fenêtres & portes-fenêtres",
    slug: { _type: "slug", current: "fenetres" },
    heroImage: fenHero, intro: "Le remplacement de vos fenêtres représente de nombreux atouts. Il empêche les courants d'air, fait baisser la facture de chauffage et améliore la qualité de l'habitat.",
    materials: ["PVC", "Bois", "Aluminium", "Bois-Aluminium", "Double vitrage", "Triple vitrage"],
    whyTitle: "Pourquoi remplacer vos fenêtres ?",
    whyText: "Des fenêtres performantes sont essentielles pour le confort thermique, l'isolation acoustique et la sécurité de votre habitat. Les anciennes fenêtres sont souvent responsables de 25% des déperditions de chaleur.",
    whyImage: fenWhy, advantagesImage: fenAdv,
    advantages: ["Isolation thermique renforcée","Réduction des nuisances sonores","Meilleure luminosité naturelle","Sécurité anti-effraction","Réduction de la facture énergétique","Formes personnalisables (rectangulaire, ronde, trapèze, triangulaire)","Couleurs personnalisables à l'infini","Entretien facilité selon le matériau","Valorisation de votre bien immobilier"],
    typesLabel: "Matériaux",
    types: [
      { _key: "t1", name: "PVC", description: "Remarquables caractéristiques techniques en isolation, durabilité et étanchéité. Faciles d'entretien et compétitives au niveau prix.", image: fenPvc },
      { _key: "t2", name: "Aluminium", description: "Adaptées aux grandes surfaces vitrées, peu d'entretien. Sécurité renforcée grâce aux systèmes de verrouillage multipoints.", image: fenAlu },
      { _key: "t3", name: "Bois", description: "Aspect naturel pour un grand nombre d'applications. Robustes et intelligemment conçues, une solution durable et élégante.", image: fenBois },
      { _key: "t4", name: "Bois-Aluminium", description: "Le meilleur des deux mondes : chaleur du bois à l'intérieur, résistance de l'aluminium à l'extérieur.", image: fenBoisAlu },
    ],
    personalisationLabel: "Vitrages",
    personalisation: [
      { _key: "p1", name: "Double vitrage", description: "Convient à la plupart des rénovations courantes. Bonne isolation thermique et acoustique.", image: fenDV },
      { _key: "p2", name: "Triple vitrage", description: "Plus performant, maximise le confort, réduit les pertes de chaleur et améliore l'efficacité énergétique.", image: fenTV },
    ],
    personalisationOptions: [
      { _key: "po1", icon: "formes", label: "Formes", items: [
        { _key: "i1", name: "Rectangulaire", image: icoRect },
        { _key: "i2", name: "Ronde", image: icoRonde },
        { _key: "i3", name: "Trapèze", image: icoTrapeze },
        { _key: "i4", name: "Triangulaire", image: icoTriang },
      ]},
      { _key: "po2", icon: "couleurs", label: "Couleurs", items: [
        { _key: "i1", name: "Couleurs à l'infini", image: icoCouleurs },
      ]},
    ],
    didYouKnow: "Le double vitrage convient à la plupart des rénovations courantes et offre déjà une bonne isolation thermique et acoustique.\nLe triple vitrage, plus performant, maximise le confort, réduit encore les pertes de chaleur et améliore l'efficacité énergétique.",
    faq: [
      { _key: "f1", question: "Quel type de vitrage choisir : double ou triple ?", answer: "Le double vitrage convient à la plupart des rénovations courantes. Le triple vitrage, plus performant, est recommandé pour les constructions neuves ou les rénovations énergétiques globales. En Suisse romande, le triple vitrage devient la solution de référence." },
      { _key: "f2", question: "Quelles subventions sont disponibles pour le remplacement de fenêtres ?", answer: "Le Programme Bâtiments peut financer jusqu'à 30% des coûts. Cependant, le seul remplacement des fenêtres n'est pas éligible : le projet doit s'inscrire dans une rénovation énergétique globale avec un certificat CECB." },
      { _key: "f3", question: "Combien de temps dure l'installation ?", answer: "En général, le remplacement d'une fenêtre prend entre 2 et 4 heures par ouverture. Pour une maison complète, comptez 2 à 5 jours selon le nombre de fenêtres." },
      { _key: "f4", question: "Les travaux sont-ils fiscalement déductibles ?", answer: "Oui, les travaux de rénovation énergétique sont fiscalement déductibles jusqu'en 2028 (abolition de la valeur locative)." },
      { _key: "f5", question: "Quelle est la durée de garantie ?", answer: "Nos fenêtres bénéficient d'une garantie fabricant de 10 à 20 ans selon les produits, et d'une garantie de 2 ans sur la pose." },
    ],
  });
  console.log("  ✅ Fenêtres");

  // -- BAIES COULISSANTES --
  const baiesHero = await imgRef("/images/sol-baies.webp");
  const baiesWhy = await imgRef("/images/products/baies-coulissantes/why.webp");
  const baiesAdv = await imgRef("/images/products/baies-coulissantes/advantages.webp");
  const baiesClassique = await imgRef("/images/products/baies-coulissantes/classique.webp");
  const baiesLevage = await imgRef("/images/products/baies-coulissantes/levage.webp");
  const baiesAngle = await imgRef("/images/products/baies-coulissantes/angle.webp");

  await client.createOrReplace({
    _id: "product-baies", _type: "product",
    name: "Baies coulissantes", slug: { _type: "slug", current: "baies-coulissantes" },
    heroImage: baiesHero, intro: "Des baies vitrées généreuses apportent une luminosité exceptionnelle et créent une atmosphère de confort et de bien-être. Elles offrent une connexion unique avec l'extérieur.",
    materials: ["PVC", "Aluminium", "Double vitrage", "Triple vitrage"],
    whyTitle: "Des pièces lumineuses pour un cadre de vie unique",
    whyText: "Les différentes configurations possibles mettent en valeur une architecture contemporaine et élégante. Les baies coulissantes transforment votre espace de vie en ouvrant votre intérieur sur l'extérieur.",
    whyImage: baiesWhy, advantagesImage: baiesAdv,
    advantages: ["Apport maximal de lumière naturelle, même en hiver","Vue dégagée et effet panoramique grâce aux grandes surfaces vitrées","Gain de place : aucun battement vers l'intérieur","Circulation fluide entre les espaces avec possibilité de seuil bas","Confort thermique et acoustique adapté au climat suisse","Esthétique moderne qui valorise le bien immobilier","Couleurs personnalisables"],
    typesLabel: "Type",
    types: [
      { _key: "t1", name: "Coulissant classique", description: "Solution éprouvée pour les grandes ouvertures. Fonctionnement fluide et entretien minimal.", image: baiesClassique },
      { _key: "t2", name: "Coulissant à levage", description: "Pour les très grandes dimensions. Mécanisme de levage pour une ouverture sans effort.", image: baiesLevage },
      { _key: "t3", name: "Coulissant d'angle", description: "Ouverture d'angle pour une transparence totale. Effet architectural saisissant.", image: baiesAngle },
    ],
    personalisationOptions: [
      { _key: "po1", icon: "couleurs", label: "Couleurs", items: [{ _key: "i1", name: "Couleurs personnalisables", image: icoCouleurs }]},
    ],
    didYouKnow: "Une baie coulissante à levage peut atteindre plusieurs mètres de largeur tout en restant légère à manœuvrer grâce à son mécanisme de levage intégré.\nLe coulissant d'angle permet de supprimer le poteau de coin, créant une ouverture à 90° pour une transparence totale — un effet architectural rare et spectaculaire.",
    faq: [
      { _key: "f1", question: "Quelle largeur maximale pour une baie coulissante ?", answer: "Selon le matériau et le système choisi, les baies coulissantes peuvent atteindre jusqu'à 6 mètres de largeur avec des vantaux de 3 mètres." },
      { _key: "f2", question: "Les baies coulissantes sont-elles sécurisées ?", answer: "Oui, nos baies coulissantes intègrent des systèmes de fermeture multipoints et peuvent être équipées de vitrages de sécurité anti-effraction." },
      { _key: "f3", question: "Le seuil bas est-il possible ?", answer: "Oui, nous proposons des seuils bas (encastrés) pour faciliter le passage et l'accessibilité, notamment pour les personnes à mobilité réduite." },
      { _key: "f4", question: "Quel entretien pour les baies coulissantes ?", answer: "Un nettoyage régulier des rails et des joints suffit. Les baies en aluminium ou PVC nécessitent très peu d'entretien." },
    ],
  });
  console.log("  ✅ Baies coulissantes");

  // -- PORTES D'ENTREE --
  const portesHero = await imgRef("/images/sol-portes.webp");
  const portesWhy = await imgRef("/images/products/portes-entree/why.webp");
  const portesAdv = await imgRef("/images/products/portes-entree/advantages.webp");
  const portesPvc = await imgRef("/images/products/portes-entree/pvc.webp");
  const portesAlu = await imgRef("/images/products/portes-entree/alu-v2.webp");
  const portesBois = await imgRef("/images/products/portes-entree/bois-v2.webp");
  const portesBoisAlu = await imgRef("/images/products/portes-entree/bois-alu-v3.webp");

  await client.createOrReplace({
    _id: "product-portes-entree", _type: "product",
    name: "Portes d'entrée", slug: { _type: "slug", current: "portes-entree" },
    heroImage: portesHero, intro: "La porte d'entrée n'est pas seulement le passage principal de votre maison : elle reflète l'identité de votre habitation, assure la sécurité de votre foyer, et contribue à l'efficacité énergétique.",
    materials: ["PVC", "Bois", "Aluminium", "Bois-Aluminium"],
    whyTitle: "Quel type de porte est fait pour vous ?",
    whyText: "Chaque matériau offre des avantages spécifiques en termes d'isolation, de sécurité, d'esthétique et d'entretien. Nous vous guidons vers la solution la plus adaptée à votre habitat et votre style de vie.",
    whyImage: portesWhy, advantagesImage: portesAdv,
    advantages: ["Sécurité renforcée avec serrures multipoints","Isolation thermique et acoustique performante","Design personnalisable (couleurs, motifs décoratifs)","Formes rectangulaires ou cintrées","Résistance aux intempéries","Large choix de matériaux","Valorisation esthétique de votre façade"],
    typesLabel: "Matériaux", typesVertical: true,
    types: [
      { _key: "t1", name: "PVC", description: "Pratique, économique et facile à entretenir. Isolation thermique efficace, idéal pour les maisons modernes ou rénovations.", image: portesPvc },
      { _key: "t2", name: "Aluminium", description: "Design moderne, robustesse et durabilité. Profilés fins et design épuré, excellente résistance aux intempéries.", image: portesAlu },
      { _key: "t3", name: "Bois", description: "Chaleur, authenticité et prestige naturel. Esthétique chaleureuse et traditionnelle, isolation naturelle et confortable.", image: portesBois },
      { _key: "t4", name: "Bois-Aluminium", description: "Esthétique et performance réunies. Bois à l'intérieur pour la chaleur, aluminium à l'extérieur pour la protection.", image: portesBoisAlu },
    ],
    personalisationOptions: [
      { _key: "po1", icon: "formes", label: "Formes", items: [{ _key: "i1", name: "Rectangulaire", image: icoRect },{ _key: "i2", name: "Cintrée", image: icoRonde }]},
      { _key: "po2", icon: "motifs", label: "Motifs", items: [{ _key: "i1", name: "Motifs décoratifs", image: icoConfig }]},
      { _key: "po3", icon: "couleurs", label: "Couleurs", items: [{ _key: "i1", name: "Couleurs RAL", image: icoCouleurs }]},
    ],
    didYouKnow: "La porte d'entrée représente environ 10% des déperditions thermiques d'une maison. Remplacer une vieille porte par un modèle moderne permet de réduire significativement les pertes de chaleur.\nUne porte bois-aluminium combine le meilleur des deux matériaux : la chaleur et l'esthétique du bois à l'intérieur, la résistance aux intempéries de l'aluminium à l'extérieur.",
    faq: [
      { _key: "f1", question: "Quelle est la durée de vie d'une porte d'entrée ?", answer: "Une porte d'entrée de qualité dure entre 25 et 40 ans selon le matériau et l'entretien. Les portes en aluminium ont la plus longue durée de vie." },
      { _key: "f2", question: "Quel niveau de sécurité proposez-vous ?", answer: "Toutes nos portes intègrent des serrures multipoints (3 à 5 points de fermeture) et peuvent être équipées de cylindres de haute sécurité et de charnières anti-dégondage." },
      { _key: "f3", question: "Peut-on personnaliser le design ?", answer: "Oui, entièrement : couleurs RAL, motifs décoratifs, vitrages, poignées et accessoires. Nous proposons aussi des formes cintrées sur mesure." },
      { _key: "f4", question: "L'installation perturbe-t-elle le quotidien ?", answer: "L'installation d'une porte d'entrée prend généralement une demi-journée. Votre domicile reste sécurisé pendant toute la durée des travaux." },
    ],
  });
  console.log("  ✅ Portes d'entrée");

  // -- VOLETS --
  const voletsHero = await imgRef("/images/sol-volets.webp");
  const voletsWhy = await imgRef("/images/products/volets/why.webp");
  const voletsAdv = await imgRef("/images/products/volets/advantages.webp");
  const voletsRoulants = await imgRef("/images/products/volets/roulants.webp");
  const voletsBattantsAlu = await imgRef("/images/products/volets/battants-alu.webp");
  const voletsPers = await imgRef("/images/products/volets/battants-persiennes.webp");
  const voletsBattantsClass = await imgRef("/images/products/volets/battants-classique.webp");

  await client.createOrReplace({
    _id: "product-volets", _type: "product",
    name: "Volets roulants & battants", slug: { _type: "slug", current: "volets" },
    heroImage: voletsHero, intro: "Les volets jouent un rôle essentiel dans le confort de l'habitat. Ils améliorent l'isolation thermique, renforcent la sécurité, protègent de la lumière et participent à la gestion de la chaleur été comme hiver.",
    materials: ["PVC", "Aluminium", "Bois", "Électrique", "Solaire", "Manuel"],
    whyTitle: "Pourquoi installer des volets ?",
    whyText: "En Suisse, où les écarts de température sont marqués selon les saisons, les volets constituent une solution efficace pour réduire les pertes de chaleur en hiver et limiter la surchauffe estivale.",
    whyImage: voletsWhy, advantagesImage: voletsAdv,
    advantages: ["Amélioration du confort thermique toute l'année","Réduction des déperditions énergétiques","Gain de place : aucun battement vers l'intérieur (roulants)","Protection solaire efficace","Occultation totale ou partielle selon les besoins","Renforcement de la sécurité du logement","Amélioration du confort acoustique","Contribution à la valorisation du bien immobilier","Esthétique traditionnelle et personnalisable (battants)"],
    typesLabel: "Types",
    types: [
      { _key: "t1", name: "Volets roulants", description: "Motorisés (électrique ou solaire) ou manuels. Gain de place maximal, occultation totale, isolation thermique renforcée. Brise solaire orientable disponible.", image: voletsRoulants },
      { _key: "t2", name: "Volets battants aluminium", description: "Légèreté et robustesse. Design épuré qui s'intègre parfaitement aux façades modernes et contemporaines.", image: voletsBattantsAlu },
      { _key: "t3", name: "Volets à persiennes", description: "Lames orientables pour un contrôle précis de la lumière et de la ventilation, tout en préservant l'intimité.", image: voletsPers },
      { _key: "t4", name: "Volets battants classiques", description: "Style traditionnel intemporel. Idéaux pour les rénovations et les maisons à l'architecture classique.", image: voletsBattantsClass },
    ],
    personalisationOptions: [
      { _key: "po1", icon: "materiaux", label: "Matériaux", items: [{ _key: "i1", name: "PVC", image: icoPvc },{ _key: "i2", name: "Aluminium", image: icoAlu },{ _key: "i3", name: "Bois", image: icoBois }]},
      { _key: "po2", icon: "couleurs", label: "Couleurs", items: [{ _key: "i1", name: "Personnalisables", image: icoCouleurs }]},
      { _key: "po3", icon: "configuration", label: "Configuration", items: [{ _key: "i1", name: "Électrique", image: icoMoteur },{ _key: "i2", name: "Solaire", image: icoSolaire },{ _key: "i3", name: "Manuel", image: icoManuel },{ _key: "i4", name: "Brise solaire orientable", image: icoBso }]},
    ],
    didYouKnow: "Les volets roulants peuvent réduire les déperditions thermiques par les fenêtres de 20 à 30% en hiver, en créant une lame d'air isolante entre le vitrage et le volet fermé.\nLa motorisation solaire fonctionne même par temps couvert grâce à des batteries de stockage intégrées — aucun câblage électrique n'est nécessaire.",
    faq: [
      { _key: "f1", question: "Volets roulants ou battants : comment choisir ?", answer: "Les volets roulants sont idéaux pour le confort moderne (motorisation, gain de place). Les volets battants conviennent aux façades traditionnelles et offrent un charme authentique." },
      { _key: "f2", question: "La motorisation solaire est-elle fiable en Suisse ?", answer: "Oui, les panneaux solaires intégrés fonctionnent même par temps couvert. C'est une solution autonome qui ne nécessite aucun câblage électrique." },
      { _key: "f3", question: "Peut-on motoriser des volets existants ?", answer: "Dans la plupart des cas, oui. Nos techniciens évaluent la faisabilité lors de la visite technique et proposent la meilleure solution." },
      { _key: "f4", question: "Quels sont les avantages du brise solaire orientable ?", answer: "Le brise solaire orientable permet de régler la luminosité et la ventilation en ajustant l'angle des lames, tout en conservant une vue vers l'extérieur." },
    ],
  });
  console.log("  ✅ Volets");

  // -- PORTES DE GARAGE --
  const garageHero = await imgRef("/images/sol-garage.webp");
  const garageWhy = await imgRef("/images/products/portes-garage/why.webp");
  const garageAdv = await imgRef("/images/products/portes-garage/advantages.webp");
  const garageSH = await imgRef("/images/products/portes-garage/sectionnel-haut-v2.webp");
  const garageSL = await imgRef("/images/products/portes-garage/sectionnel-lateral-v2.webp");
  const garageEnr = await imgRef("/images/products/portes-garage/enroulable.webp");

  await client.createOrReplace({
    _id: "product-portes-garage", _type: "product",
    name: "Portes de garage", slug: { _type: "slug", current: "portes-garage" },
    heroImage: garageHero, intro: "La porte de garage est un élément clé de votre maison : elle protège votre véhicule, renforce la sécurité et contribue à l'esthétique de votre façade.",
    materials: ["Aluminium", "Acier", "Bois", "Électrique", "Manuel"],
    whyTitle: "Sécurité, confort et esthétique pour votre garage",
    whyText: "Avec des solutions modernes et personnalisables, il est possible de combiner design, confort et performance, tout en répondant aux normes suisses de sécurité et d'isolation thermique.",
    whyImage: garageWhy, advantagesImage: garageAdv,
    advantages: ["Sécurité renforcée pour votre véhicule et votre maison","Isolation thermique et acoustique pour plus de confort intérieur","Compatibilité avec tous les types d'architecture","Durabilité et entretien adapté selon le matériau","Confort d'usage grâce à l'automatisation électrique","Finitions décoratives et couleurs personnalisables","Hublots possibles pour la lumière naturelle"],
    typesLabel: "Types",
    types: [
      { _key: "t1", name: "Sectionnelle haut de plafond", description: "S'ouvre verticalement et se loge au plafond. Gain de place optimal devant et dans le garage.", image: garageSH },
      { _key: "t2", name: "Sectionnelle latérale", description: "S'ouvre latéralement le long du mur. Idéale quand la hauteur sous plafond est limitée.", image: garageSL },
      { _key: "t3", name: "Enroulable coffre", description: "S'enroule dans un coffre compact. Solution discrète pour les garages avec peu d'espace.", image: garageEnr },
    ],
    personalisationOptions: [
      { _key: "po1", icon: "materiaux", label: "Matériaux", items: [{ _key: "i1", name: "Aluminium", image: icoAlu },{ _key: "i2", name: "Acier", image: icoAcier },{ _key: "i3", name: "Bois", image: icoBois }]},
      { _key: "po2", icon: "configuration", label: "Configuration", items: [{ _key: "i1", name: "Sectionnelle haut", image: icoGarageHaut },{ _key: "i2", name: "Sectionnelle latérale", image: icoGarageLat },{ _key: "i3", name: "Enroulable", image: icoGarageEnr },{ _key: "i4", name: "Hublots possibles", image: icoRonde }]},
      { _key: "po3", icon: "couleurs", label: "Personnalisation", items: [{ _key: "i1", name: "Finitions décoratives", image: icoFinitions },{ _key: "i2", name: "Couleurs personnalisables", image: icoCouleurs }]},
    ],
    didYouKnow: "Une porte de garage sectionnelle bien isolée peut contribuer à réduire les déperditions de chaleur du garage vers la maison, surtout lorsque le garage est attenant et chauffé.\nLa porte sectionnelle haut de plafond ne déborde pas sur l'allée — idéale pour les garages avec peu d'espace devant la maison.",
    faq: [
      { _key: "f1", question: "Quelle motorisation choisir ?", answer: "Nous proposons des motorisations électriques silencieuses avec télécommande, compatibles avec la domotique. Le choix dépend de la taille et du poids de la porte." },
      { _key: "f2", question: "La porte de garage contribue-t-elle à l'isolation ?", answer: "Oui, nos portes sectionnelles à double paroi offrent une excellente isolation thermique, réduisant les pertes de chaleur du garage vers la maison." },
      { _key: "f3", question: "Peut-on intégrer une porte piétonne ?", answer: "Oui, une porte piétonne peut être intégrée directement dans la porte de garage pour un accès quotidien sans ouvrir la porte principale." },
      { _key: "f4", question: "Quel entretien est nécessaire ?", answer: "Un entretien annuel simple : lubrification des mécanismes, vérification des joints et nettoyage des rails suffit pour assurer la longévité." },
    ],
  });
  console.log("  ✅ Portes de garage");

  // -- STORES BANNES --
  const storesHero = await imgRef("/images/sol-stores.webp");
  const storesWhy = await imgRef("/images/products/stores-bannes/why.webp");
  const storesAdv = await imgRef("/images/products/stores-bannes/advantages.webp");
  const storesCoffre = await imgRef("/images/products/stores-bannes/coffre-integral.webp");
  const storesSemi = await imgRef("/images/products/stores-bannes/semi-coffre.webp");
  const storesMono = await imgRef("/images/products/stores-bannes/monobloc.webp");

  await client.createOrReplace({
    _id: "product-stores", _type: "product",
    name: "Stores bannes", slug: { _type: "slug", current: "stores-bannes" },
    heroImage: storesHero, intro: "Les stores bannes sont la solution idéale pour profiter pleinement de vos espaces extérieurs, en toute saison. Ils protègent du soleil, des UV et de la chaleur, tout en offrant une esthétique moderne.",
    materials: ["Aluminium", "Manuel", "Électrique"],
    whyTitle: "Confort, protection solaire et style pour vos terrasses",
    whyText: "Adaptés aux maisons individuelles, les stores bannes permettent de créer des zones ombragées et agréables, tout en ajoutant une touche décorative à votre façade ou votre terrasse.",
    whyImage: storesWhy, advantagesImage: storesAdv,
    advantages: ["Protection efficace contre le soleil et la chaleur","Style et personnalisation multiples","Facilité d'utilisation manuelle ou électrique","Éclairage intégré possible pour les soirées","Lambrequin déroulable pour ajuster l'ombre","Augmentation du confort sur terrasse ou balcon","Toiles et couleurs de coffre personnalisables"],
    types: [
      { _key: "t1", name: "Store coffre intégral", description: "La toile et le mécanisme sont entièrement protégés dans un coffre fermé. Durabilité maximale et esthétique épurée.", image: storesCoffre },
      { _key: "t2", name: "Store semi-coffre", description: "Protection partielle du mécanisme. Bon compromis entre protection et budget.", image: storesSemi },
      { _key: "t3", name: "Store monobloc", description: "Solution économique sans coffre. Idéale pour les installations sous avancée de toit.", image: storesMono },
    ],
    personalisationOptions: [
      { _key: "po1", icon: "configuration", label: "Configuration", items: [{ _key: "i1", name: "Manuel", image: icoManuel },{ _key: "i2", name: "Électrique", image: icoMoteur },{ _key: "i3", name: "Éclairage intégré", image: icoLumiere }]},
      { _key: "po2", icon: "personnalisation", label: "Personnalisation", items: [{ _key: "i1", name: "Toiles", image: icoCouleurs },{ _key: "i2", name: "Couleurs coffre", image: icoCouleurs }]},
    ],
    didYouKnow: "Un store banne bien positionné peut réduire la température intérieure d'une pièce exposée au soleil de 3 à 8°C, diminuant ainsi le recours à la climatisation.\nLe store coffre intégral protège la toile et le mécanisme lorsqu'il est replié, prolongeant significativement sa durée de vie face aux intempéries.",
    faq: [
      { _key: "f1", question: "Quelle largeur maximale pour un store banne ?", answer: "Les stores bannes peuvent atteindre jusqu'à 7 mètres de largeur et 4 mètres d'avancée, selon le modèle et la structure de fixation." },
      { _key: "f2", question: "Le store résiste-t-il au vent ?", answer: "Nos stores sont équipés de capteurs vent optionnels qui replient automatiquement le store en cas de rafales. Ils résistent à des vents jusqu'à 38 km/h en position déployée." },
      { _key: "f3", question: "Peut-on ajouter un éclairage LED ?", answer: "Oui, nous proposons des rampes LED intégrées au coffre ou aux bras pour profiter de votre terrasse en soirée." },
      { _key: "f4", question: "Quel entretien pour la toile ?", answer: "Un nettoyage annuel à l'eau savonneuse suffit. Les toiles sont traitées anti-UV et anti-moisissures pour une longue durée de vie." },
    ],
  });
  console.log("  ✅ Stores bannes");

  // -- FILMS SOLAIRES --
  const filmsHero = await imgRef("/images/sol-film.webp");
  const filmsWhy = await imgRef("/images/products/films-solaires/why.webp");
  const filmsAdv = await imgRef("/images/products/films-solaires/advantages.webp");
  const filmsBlack = await imgRef("/images/products/films-solaires/variant-black.webp");
  const filmsMixt = await imgRef("/images/products/films-solaires/variant-mixt.webp");
  const filmsDeco = await imgRef("/images/products/films-solaires/variant-deco.webp");

  await client.createOrReplace({
    _id: "product-films", _type: "product",
    name: "Films solaires", slug: { _type: "slug", current: "films-solaires" },
    heroImage: filmsHero, intro: "Les films solaires sont une solution simple et efficace pour améliorer le confort intérieur, sans remplacer les vitrages existants. Appliqués directement sur les vitres, ils réduisent la chaleur, l'éblouissement et les UV.",
    materials: ["Anti-UV", "Anti-éblouissement", "Effet miroir", "Décoratif"],
    whyTitle: "Confort thermique sans travaux lourds",
    whyText: "Les films solaires permettent de réduire significativement la chaleur intérieure et l'éblouissement tout en conservant la luminosité naturelle. Adaptés aux maisons individuelles, vérandas, verrières et baies coulissantes.",
    whyImage: filmsWhy, advantagesImage: filmsAdv,
    advantages: ["Réduction importante de la chaleur (rejet infrarouge jusqu'à 98%)","Diminution importante des dépenses de climatisation","Amélioration du confort thermique sans travaux lourds","Discrétion et esthétique préservées","Réduction de l'éblouissement (jusqu'à 99%)","Protection des meubles et sols contre les UV","Jusqu'à 30% de réduction de déperdition de chaleur"],
    types: [
      { _key: "t1", name: "Anti-UV", description: "Bloque jusqu'à 99% des rayons ultraviolets. Protège les meubles, sols et œuvres d'art de la décoloration.", image: filmsBlack },
      { _key: "t2", name: "Anti-éblouissement", description: "Réduit l'éblouissement tout en conservant une vue claire vers l'extérieur. Idéal pour les bureaux et pièces de vie.", image: filmsBlack },
      { _key: "t3", name: "Effet miroir", description: "Offre une intimité en journée grâce à l'effet réfléchissant, tout en conservant la vue depuis l'intérieur.", image: filmsMixt },
      { _key: "t4", name: "Décoratif", description: "Films à motifs ou dépolis pour personnaliser vos vitrages et créer des espaces intimes.", image: filmsDeco },
    ],
    personalisationOptions: [
      { _key: "po1", icon: "variantes", label: "Variantes", items: [{ _key: "i1", name: "Anti-UV", image: icoSolUv },{ _key: "i2", name: "Anti-éblouissement", image: icoSolGlare },{ _key: "i3", name: "Effet miroir", image: icoSolMirror },{ _key: "i4", name: "Décoratif", image: icoSolDeco }]},
      { _key: "po2", icon: "applications", label: "Applications", items: [{ _key: "i1", name: "Maisons individuelles", image: icoAppMaison },{ _key: "i2", name: "Vérandas", image: icoAppVeranda },{ _key: "i3", name: "Verrières", image: icoAppVerriere },{ _key: "i4", name: "Baies coulissantes", image: icoAppBaie }]},
    ],
    didYouKnow: "Les films solaires modernes peuvent rejeter jusqu'à 98% des rayons infrarouges responsables de la chaleur, tout en laissant passer jusqu'à 70% de la lumière naturelle visible.\nContrairement aux stores, le film solaire agit 24h/24 sans aucune action manuelle — une solution passive idéale pour les grandes surfaces vitrées difficiles d'accès.",
    faq: [
      { _key: "f1", question: "Le film solaire réduit-il la luminosité ?", answer: "Non, les films solaires modernes sont conçus pour réduire la chaleur et les UV tout en laissant passer la lumière naturelle. La transmission lumineuse reste élevée." },
      { _key: "f2", question: "Quelle est la durée de vie d'un film solaire ?", answer: "Un film solaire de qualité professionnelle dure entre 10 et 15 ans. Nos films sont garantis contre le décollement et la décoloration." },
      { _key: "f3", question: "Peut-on appliquer un film sur du double vitrage ?", answer: "Oui, mais il faut choisir le bon type de film pour éviter le stress thermique. Nos techniciens évaluent chaque situation pour recommander la solution adaptée." },
      { _key: "f4", question: "L'installation est-elle rapide ?", answer: "Oui, l'application est rapide et propre. Comptez environ 30 minutes par mètre carré. Pas de travaux, pas de poussière." },
    ],
  });
  console.log("  ✅ Films solaires");

  // -- CARPORTS & PERGOLAS --
  const carpHero = await imgRef("/images/sol-carport.webp");
  const carpWhy = await imgRef("/images/products/carports-pergolas/why.webp");
  const carpAdv = await imgRef("/images/products/carports-pergolas/advantages.webp");
  const carpAdosse = await imgRef("/images/products/carports-pergolas/carport-adosse.webp");
  const carpAuto = await imgRef("/images/products/carports-pergolas/carport-autoportant.webp");
  const pergAdossee = await imgRef("/images/products/carports-pergolas/pergola-adossee.webp");
  const pergAuto = await imgRef("/images/products/carports-pergolas/pergola-autoportante.webp");

  await client.createOrReplace({
    _id: "product-carports", _type: "product",
    name: "Carports & Pergolas", slug: { _type: "slug", current: "carports-pergolas" },
    heroImage: carpHero, intro: "Le carport protège votre véhicule avec une architecture ouverte et moderne. La pergola crée un véritable espace de vie extérieur, utilisable une grande partie de l'année. Deux solutions complémentaires pour valoriser votre habitat.",
    materials: ["Aluminium", "Bois", "Adossé", "Autoportant"],
    whyTitle: "Protection, design et praticité pour votre extérieur",
    whyText: "Carports et pergolas s'intègrent harmonieusement à l'architecture de la maison et valorisent durablement votre habitat. Grâce à leurs différentes options, ils s'adaptent à tous les styles.",
    whyImage: carpWhy, advantagesImage: carpAdv,
    advantages: ["Protection contre la pluie, la neige, le soleil et le gel","Structure ouverte qui évite l'humidité et la condensation (carport)","Création d'un espace de vie supplémentaire (pergola)","Esthétique moderne et personnalisable","Valorisation du bien immobilier","Accès rapide et facilité au véhicule (carport)","Solution durable, adaptée au climat suisse","Confort extérieur optimal, été comme mi-saison","Options domotique, éclairage LED et chauffage (pergola)"],
    typesLabel: "Types",
    types: [
      { _key: "t1", name: "Carport adossé", description: "Fixé contre la façade de la maison. Solution compacte et élégante qui s'intègre naturellement à l'architecture existante.", image: carpAdosse },
      { _key: "t2", name: "Carport autoportant", description: "Structure indépendante pouvant être placée librement. Plus de flexibilité dans l'implantation.", image: carpAuto },
      { _key: "t3", name: "Pergola adossée", description: "Extension naturelle de votre terrasse. Toiture à lames orientables, fixe ou tendue selon vos besoins.", image: pergAdossee },
      { _key: "t4", name: "Pergola autoportante", description: "Espace indépendant au jardin. Idéale pour créer un salon d'été ou un coin détente éloigné de la maison.", image: pergAuto },
    ],
    personalisationOptions: [
      { _key: "po1", icon: "materiaux", label: "Matériaux", items: [{ _key: "i1", name: "Aluminium", image: icoAlu },{ _key: "i2", name: "Bois", image: icoBois }]},
      { _key: "po2", icon: "configuration", label: "Configuration", items: [{ _key: "i1", name: "Adossé", image: icoAdosse },{ _key: "i2", name: "Autoportant", image: icoAutoportant },{ _key: "i3", name: "Toiture tendue", image: icoToitureTendue },{ _key: "i4", name: "Toiture fixe", image: icoToitureFixe },{ _key: "i5", name: "Toiture pleine", image: icoToiturePleine },{ _key: "i6", name: "Toiture translucide", image: icoToitureTranslucide },{ _key: "i7", name: "Toiture orientable", image: icoToitureOrientable }]},
      { _key: "po3", icon: "personnalisation", label: "Personnalisation", items: [{ _key: "i1", name: "Éclairage intégré", image: icoLumiere },{ _key: "i2", name: "Chauffage", image: icoChauffage },{ _key: "i3", name: "Couleurs", image: icoCouleurs },{ _key: "i4", name: "Domotique", image: icoMoteur },{ _key: "i5", name: "Fermetures latérales", image: icoVitrage }]},
    ],
    didYouKnow: "Un carport protège aussi efficacement contre la grêle qu'un garage fermé, tout en évitant la condensation et l'humidité grâce à sa structure ouverte — un avantage souvent méconnu.\nUne pergola bioclimatique à lames orientables peut être utilisée 9 à 10 mois par an en Suisse romande, en régulant naturellement la lumière, l'ombre et la ventilation.",
    faq: [
      { _key: "f1", question: "Faut-il un permis de construire ?", answer: "En Suisse, les règles varient selon les cantons et communes. En général, les structures de moins de 10 m² ne nécessitent pas de permis. Nous vous accompagnons dans les démarches administratives." },
      { _key: "f2", question: "Quelles options de toiture pour la pergola ?", answer: "Nous proposons des toitures à lames orientables (bioclimatiques), des toiles tendues rétractables et des toitures fixes en polycarbonate ou aluminium." },
      { _key: "f3", question: "Le carport protège-t-il aussi bien qu'un garage ?", answer: "Le carport protège efficacement contre les intempéries (pluie, neige, grêle, soleil). La structure ouverte évite la condensation et l'humidité, ce qui est un avantage par rapport au garage fermé." },
      { _key: "f4", question: "Peut-on ajouter des fermetures latérales au carport ?", answer: "Oui, des panneaux latéraux en verre, aluminium ou stores peuvent être ajoutés pour une protection supplémentaire contre le vent et la pluie." },
    ],
  });
  console.log("  ✅ Carports & Pergolas");

  console.log("\n🎉 Full seed complete! All images uploaded, all content matched to website.");
}

seed().catch(console.error);
