import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cav3bi02",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skL48XjYDduYKJJTzyGtNfepfKtB9vpsQMvJ8Mu5Ud8XfWVSjcEZmxah8s56EfhSxno7ls2RzytaCBs0JyEA5et65qfnCfqIr7ph98whhH12oPCGxOKplGSkZlw8afXSl8X8Mv0VQ4k9QPBPUUblJF7o22vJ1BG1ToUiuZq6rHN9Ddn5QYMU",
  useCdn: false,
});

function toBlocks(sections) {
  const blocks = [];
  let k = 0;
  for (const s of sections) {
    blocks.push({
      _type: "block", _key: "b" + k++, style: "h2",
      children: [{ _type: "span", _key: "s" + k, text: s.heading, marks: [] }],
      markDefs: [],
    });
    blocks.push({
      _type: "block", _key: "b" + k++, style: "normal",
      children: [{ _type: "span", _key: "s" + k, text: s.text, marks: [] }],
      markDefs: [],
    });
  }
  return blocks;
}

const articles = [
  {
    id: "blog-1",
    body: [
      { heading: "Un soutien financier renforcé pour 2026", text: "En 2026, la Confédération et les cantons suisses continuent de renforcer les programmes de soutien à la rénovation énergétique des bâtiments. Le Programme Bâtiments, financé par la taxe sur le CO2, propose des subventions substantielles pour le remplacement de fenêtres, l'isolation thermique et l'installation de systèmes de chauffage renouvelables. Les montants varient selon les cantons, mais peuvent couvrir jusqu'à 40 % du coût total des travaux dans certaines régions." },
      { heading: "Les fenêtres : un poste clé de la rénovation", text: "Le remplacement des anciennes fenêtres par des modèles à haute performance énergétique constitue l'un des investissements les plus rentables en matière de rénovation. Les fenêtres modernes avec un coefficient Uw inférieur à 1.0 W/m²K permettent de réduire les pertes thermiques de manière significative. En Suisse, les subventions pour le remplacement de fenêtres peuvent atteindre 70 CHF par mètre carré de surface vitrée, voire davantage dans certains cantons comme Vaud ou Genève." },
      { heading: "Comment bénéficier des aides en 2026 ?", text: "Pour obtenir les subventions, il est essentiel de déposer votre demande avant le début des travaux. Les démarches se font généralement en ligne via le portail du Programme Bâtiments de votre canton. Un audit énergétique préalable, le CECB (Certificat Énergétique Cantonal des Bâtiments), est souvent requis pour les rénovations globales. Chez ISO Tradition, nous vous accompagnons dans l'ensemble des démarches administratives afin de maximiser les aides auxquelles vous avez droit." },
      { heading: "Déductibilité fiscale : un avantage supplémentaire", text: "En plus des subventions, les travaux de rénovation énergétique restent fiscalement déductibles en Suisse jusqu'en 2028. Cela signifie que le coût net de votre investissement peut être considérablement réduit lorsque l'on combine subventions cantonales et déductions fiscales. N'hésitez pas à consulter votre fiduciaire ou nos conseillers pour une estimation personnalisée." },
    ],
  },
  {
    id: "blog-2",
    body: [
      { heading: "Comprendre la différence fondamentale", text: "Le double vitrage se compose de deux plaques de verre séparées par une lame d'air ou de gaz (argon), tandis que le triple vitrage en utilise trois. Cette couche supplémentaire améliore sensiblement l'isolation thermique, mais augmente aussi le poids et le prix de la menuiserie. En Suisse romande, le triple vitrage devient progressivement la norme pour les constructions neuves et les rénovations ambitieuses." },
      { heading: "Performance thermique comparée", text: "Un double vitrage standard affiche un coefficient Ug d'environ 1.1 W/m²K, contre 0.5 à 0.7 W/m²K pour un triple vitrage. En pratique, cela signifie que le triple vitrage réduit les pertes thermiques par les fenêtres de près de 50 % par rapport au double vitrage. Pour une maison individuelle en Suisse, cette différence peut représenter une économie de chauffage de 10 à 15 % sur l'année." },
      { heading: "Quand privilégier le double vitrage ?", text: "Le double vitrage reste pertinent pour les rénovations courantes où le rapport qualité-prix est prioritaire. Il convient parfaitement aux façades bien exposées au soleil (sud, sud-ouest), car il laisse passer davantage de lumière et de chaleur solaire gratuite. Dans les cantons où la valeur Uw exigée est de 1.3 W/m²K (comme le Valais), le double vitrage peut suffire à respecter les normes en vigueur." },
      { heading: "Quand opter pour le triple vitrage ?", text: "Le triple vitrage s'impose pour les façades nord, les bâtiments Minergie, les constructions neuves et les rénovations énergétiques globales. Il offre un confort thermique supérieur en hiver et réduit les courants d'air froid près des fenêtres. Si vous envisagez une rénovation globale avec un certificat CECB, le triple vitrage maximisera vos chances d'obtenir des subventions cantonales." },
    ],
  },
  {
    id: "blog-3",
    body: [
      { heading: "Qu'est-ce que la valeur Uw ?", text: "La valeur Uw (U-window) mesure la performance thermique globale d'une fenêtre, cadre compris. Elle s'exprime en W/m²K (watts par mètre carré kelvin). Plus la valeur est basse, meilleure est l'isolation. Une fenêtre avec un Uw de 0.8 W/m²K est deux fois plus isolante qu'une fenêtre avec un Uw de 1.6 W/m²K. Cette valeur prend en compte le vitrage (Ug), le cadre (Uf) et le joint entre les deux (Ψg)." },
      { heading: "Les exigences suisses par canton", text: "En Suisse, les exigences varient selon les cantons. Les cantons de Vaud, Genève, Neuchâtel et Fribourg exigent généralement un Uw ≤ 1.0 W/m²K pour le remplacement de fenêtres. Le Valais est un peu moins strict avec un Uw ≤ 1.3 W/m²K dans certains cas. Ces normes sont définies par les lois cantonales sur l'énergie et le modèle intercantonal MoPEC." },
      { heading: "Impact sur le choix des matériaux", text: "Le choix du matériau de cadre influence directement la valeur Uw. Le PVC offre naturellement une bonne isolation (Uf autour de 1.0-1.3 W/m²K). L'aluminium, conducteur thermique, nécessite des ruptures de pont thermique pour atteindre des performances équivalentes. Le bois, excellent isolant naturel, permet d'obtenir d'excellentes valeurs Uf. Le bois-aluminium combine les avantages des deux matériaux." },
      { heading: "Pourquoi c'est important pour vos subventions", text: "Les programmes de subventions cantonaux exigent des performances minimales pour accorder les aides financières. Si vos nouvelles fenêtres ne respectent pas les valeurs Uw requises, votre demande de subvention sera refusée. C'est pourquoi il est essentiel de vérifier les normes applicables dans votre canton avant de choisir vos menuiseries. Nos conseillers ISO Tradition vous guident dans ce processus." },
    ],
  },
  {
    id: "blog-4",
    body: [
      { heading: "Le PVC : rapport qualité-prix imbattable", text: "Le PVC est le matériau le plus répandu pour les fenêtres en Suisse. Ses atouts sont nombreux : excellent rapport qualité-prix, très bonne isolation thermique, entretien minimal (un simple nettoyage à l'eau savonneuse suffit), et une durée de vie de 30 à 40 ans. Les profilés modernes en PVC sont disponibles dans de nombreuses couleurs et finitions, y compris des décors bois très réalistes." },
      { heading: "L'aluminium : finesse et modernité", text: "L'aluminium séduit par la finesse de ses profilés, qui maximisent la surface vitrée et la luminosité. Il est idéal pour les baies coulissantes et les grandes ouvertures. Résistant aux intempéries et ne nécessitant aucun entretien, l'aluminium est disponible dans une palette de couleurs RAL quasi illimitée. Grâce aux ruptures de pont thermique, les fenêtres alu modernes atteignent d'excellentes performances thermiques." },
      { heading: "Le bois : chaleur naturelle et authenticité", text: "Le bois apporte une esthétique chaleureuse et un caractère authentique inégalé. C'est un excellent isolant thermique et acoustique naturel. Les essences utilisées (chêne, mélèze, pin) garantissent robustesse et longévité. Le bois nécessite cependant un entretien régulier (lasure ou peinture tous les 5 à 8 ans) pour conserver ses qualités et son aspect." },
      { heading: "Le bois-aluminium : le meilleur des deux mondes", text: "La fenêtre bois-aluminium combine la chaleur du bois à l'intérieur avec la résistance de l'aluminium à l'extérieur. Le bois crée une atmosphère intérieure agréable tandis que l'aluminium protège contre les intempéries sans aucun entretien extérieur. C'est la solution premium, idéale pour ceux qui recherchent performance, esthétique et durabilité sans compromis." },
    ],
  },
  {
    id: "blog-5",
    body: [
      { heading: "Un entretien régulier pour une longévité maximale", text: "Les fenêtres en bois sont réputées pour leur beauté naturelle et leurs excellentes propriétés isolantes. Pour qu'elles conservent ces qualités pendant des décennies, un entretien régulier est indispensable. Un contrôle visuel annuel permet de détecter rapidement les signes d'usure : écaillage de la peinture, grisonnement du bois, apparition de moisissures ou gonflement dû à l'humidité." },
      { heading: "Nettoyage et traitement de surface", text: "Nettoyez vos fenêtres en bois une à deux fois par an avec de l'eau tiède et un savon doux (pas de produits abrasifs). Séchez soigneusement les surfaces. Tous les 5 à 8 ans, un rafraîchissement de la lasure ou de la peinture est recommandé. Poncez légèrement les surfaces, appliquez un traitement antifongique si nécessaire, puis deux couches de lasure ou peinture microporeuse." },
      { heading: "Les points critiques à surveiller", text: "Portez une attention particulière aux traverses basses (où l'eau stagne), aux angles du cadre et aux joints d'étanchéité. Ces zones sont les plus exposées aux intempéries. Vérifiez que les canaux de drainage ne sont pas obstrués. Remplacez les joints vieillis pour maintenir l'étanchéité. Graissez les ferrures et quincailleries une fois par an avec un lubrifiant adapté." },
      { heading: "Quand faire appel à un professionnel ?", text: "Si vous constatez des dégâts importants (bois pourri, déformation du cadre, condensation entre les vitrages), il est temps de faire appel à un professionnel. Chez ISO Tradition, nous proposons un service d'entretien et de rénovation pour prolonger la durée de vie de vos menuiseries en bois. Dans certains cas, un remplacement peut s'avérer plus économique qu'une rénovation complète." },
    ],
  },
  {
    id: "blog-6",
    body: [
      { heading: "Les principales sources de déperditions thermiques", text: "Dans une maison individuelle en Suisse, les déperditions thermiques se répartissent généralement ainsi : le toit (25-30 %), les murs (20-25 %), les fenêtres (15-20 %), le sol (7-10 %) et la ventilation (20-25 %). Les fenêtres anciennes, en particulier celles à simple vitrage, sont de véritables passoires thermiques qui laissent s'échapper la chaleur en hiver et la laissent entrer en été." },
      { heading: "Comment détecter les fuites thermiques", text: "Plusieurs méthodes permettent d'identifier les déperditions : la thermographie infrarouge (caméra thermique) est la plus précise et révèle les ponts thermiques invisibles à l'œil nu. Le test de la main (sentir les courants d'air froid près des fenêtres) est une méthode simple mais limitée. Le CECB (Certificat Énergétique Cantonal des Bâtiments) fournit un diagnostic complet de la performance énergétique de votre logement." },
      { heading: "Les solutions pour réduire les pertes", text: "Le remplacement des fenêtres est l'une des mesures les plus efficaces : des fenêtres modernes à triple vitrage peuvent réduire les déperditions par les ouvertures de 70 à 80 %. L'isolation des murs par l'extérieur et du toit complètent le dispositif. L'installation de volets roulants ajoute une couche d'isolation supplémentaire et peut réduire les pertes thermiques par les fenêtres de 20 à 30 % supplémentaires." },
      { heading: "Un investissement rentable à long terme", text: "Une rénovation énergétique globale (fenêtres + isolation) permet de réduire la consommation de chauffage de 40 à 60 %. Avec les prix de l'énergie en Suisse, l'investissement est généralement rentabilisé en 8 à 12 ans. En ajoutant les subventions cantonales et les déductions fiscales, le retour sur investissement peut être encore plus rapide. Sans compter la valorisation de votre bien immobilier." },
    ],
  },
];

for (const a of articles) {
  const blocks = toBlocks(a.body);
  await client.patch(a.id).set({ body: blocks }).commit();
  console.log(`✅ ${a.id}`);
}

console.log("\n🎉 All blog content pushed to Sanity!");
