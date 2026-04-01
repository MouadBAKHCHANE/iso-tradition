"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandIcon from "@/components/BrandIcon";
import { FadeIn } from "@/components/Motion";
import { useParams } from "next/navigation";

/* ── Article data ── */
const articles = [
  {
    slug: "subventions-2026-suisse",
    tag: "Subventions",
    title: "Les subventions 2026 en Suisse pour la rénovation énergétique",
    date: "15 mars 2026",
    image: "/images/blog-1.webp",
    body: [
      {
        heading: "Un soutien financier renforcé pour 2026",
        text: "En 2026, la Confédération et les cantons suisses continuent de renforcer les programmes de soutien à la rénovation énergétique des bâtiments. Le Programme Bâtiments, financé par la taxe sur le CO2, propose des subventions substantielles pour le remplacement de fenêtres, l'isolation thermique et l'installation de systèmes de chauffage renouvelables. Les montants varient selon les cantons, mais peuvent couvrir jusqu'à 40 % du coût total des travaux dans certaines régions.",
      },
      {
        heading: "Les fenêtres : un poste clé de la rénovation",
        text: "Le remplacement des anciennes fenêtres par des modèles à haute performance énergétique constitue l'un des investissements les plus rentables en matière de rénovation. Les fenêtres modernes avec un coefficient Uw inférieur à 1.0 W/m²K permettent de réduire les pertes thermiques de manière significative. En Suisse, les subventions pour le remplacement de fenêtres peuvent atteindre 70 CHF par mètre carré de surface vitrée, voire davantage dans certains cantons comme Vaud ou Genève.",
      },
      {
        heading: "Comment bénéficier des aides en 2026 ?",
        text: "Pour obtenir les subventions, il est essentiel de déposer votre demande avant le début des travaux. Les démarches se font généralement en ligne via le portail du Programme Bâtiments de votre canton. Un audit énergétique préalable, le CECB (Certificat Énergétique Cantonal des Bâtiments), est souvent requis pour les rénovations globales. Chez ISO Tradition, nous vous accompagnons dans l'ensemble des démarches administratives afin de maximiser les aides auxquelles vous avez droit.",
      },
      {
        heading: "Combiner subventions et déductions fiscales",
        text: "Au-delà des subventions directes, les travaux de rénovation énergétique sont déductibles de vos impôts sur le revenu en Suisse. Cette combinaison d'avantages fiscaux et de subventions peut réduire le coût net de votre projet de 50 à 60 %. Il est conseillé de planifier vos travaux sur plusieurs exercices fiscaux pour optimiser les déductions. N'hésitez pas à consulter votre fiduciaire ou nos conseillers pour établir un plan financier adapté à votre situation.",
      },
    ],
  },
  {
    slug: "triple-ou-double-vitrage",
    tag: "Conseils",
    title: "Triple vitrage ou double vitrage ? Le guide complet",
    date: "10 mars 2026",
    image: "/images/blog-2.webp",
    body: [
      {
        heading: "Comprendre la différence fondamentale",
        text: "Le double vitrage se compose de deux plaques de verre séparées par une lame d'air ou de gaz argon, offrant un coefficient d'isolation thermique Ug d'environ 1.1 W/m²K. Le triple vitrage ajoute une troisième plaque de verre et une seconde lame de gaz, atteignant des valeurs Ug aussi basses que 0.5 W/m²K. Cette différence peut sembler minime, mais elle se traduit par une réduction significative des pertes de chaleur, surtout dans les régions au climat rigoureux comme la Suisse.",
      },
      {
        heading: "Quand choisir le triple vitrage ?",
        text: "Le triple vitrage est particulièrement recommandé pour les constructions neuves à haute performance énergétique (label Minergie-P ou Minergie-A), les façades orientées nord qui reçoivent peu de soleil, et les bâtiments situés en altitude ou dans des régions à hivers froids. Son poids plus élevé (environ 30 kg/m² contre 20 kg/m² pour le double vitrage) nécessite des cadres renforcés et une quincaillerie adaptée, ce qui augmente légèrement le coût global.",
      },
      {
        heading: "Les avantages du double vitrage moderne",
        text: "Le double vitrage reste un excellent choix pour la rénovation, offrant un rapport qualité-prix optimal. Les verres à couche basse émissivité de dernière génération permettent d'atteindre des performances remarquables, avec un Ug de 1.0 W/m²K. Le double vitrage est plus léger, ce qui le rend compatible avec la majorité des cadres existants lors d'une rénovation. Il offre également un meilleur apport solaire, ce qui peut être un avantage pour les façades sud en hiver.",
      },
      {
        heading: "Notre recommandation pour la Suisse romande",
        text: "Pour la plupart des projets de rénovation en Suisse romande, nous recommandons le double vitrage haute performance avec gaz argon et verre à faible émissivité. Pour les constructions neuves ou les rénovations lourdes visant un label énergétique élevé, le triple vitrage constitue un investissement judicieux sur le long terme. Dans tous les cas, la qualité du cadre et la pose professionnelle comptent autant que le vitrage lui-même pour garantir une isolation optimale.",
      },
    ],
  },
  {
    slug: "normes-uw",
    tag: "Réglementation",
    title: "Les normes Uw : qu'est-ce que c'est et pourquoi c'est important ?",
    date: "5 mars 2026",
    image: "/images/blog-3.webp",
    body: [
      {
        heading: "Définition du coefficient Uw",
        text: "Le coefficient Uw (U pour transmittance thermique, w pour window) mesure la capacité d'une fenêtre complète -- vitrage et cadre -- à laisser passer la chaleur. Il s'exprime en W/m²K (watts par mètre carré et par degré Kelvin). Plus la valeur Uw est basse, meilleure est l'isolation thermique de la fenêtre. Une fenêtre ancienne en simple vitrage peut avoir un Uw de 5.0 W/m²K, tandis qu'une fenêtre moderne performante descend en dessous de 1.0 W/m²K.",
      },
      {
        heading: "Les exigences réglementaires en Suisse",
        text: "En Suisse, les normes SIA 380/1 et le MoPEC (Modèle de prescriptions énergétiques des cantons) fixent les exigences minimales en matière d'isolation thermique. Pour les fenêtres, la valeur Uw maximale autorisée est généralement de 1.3 W/m²K pour les rénovations et de 1.0 W/m²K pour les constructions neuves. Certains cantons, comme Genève, imposent des exigences encore plus strictes. Le respect de ces normes est obligatoire pour obtenir un permis de construire.",
      },
      {
        heading: "Comment se calcule le Uw ?",
        text: "Le Uw prend en compte trois composantes : le coefficient du vitrage (Ug), celui du cadre (Uf) et la conductance linéaire du joint entre le vitrage et le cadre (Psi). La formule intègre les surfaces respectives du vitrage et du cadre. C'est pourquoi deux fenêtres avec le même vitrage mais des cadres différents peuvent avoir des valeurs Uw très différentes. Les cadres en PVC et en bois offrent généralement de meilleures valeurs Uf que l'aluminium sans rupture de pont thermique.",
      },
      {
        heading: "Aller au-delà des normes pour plus de confort",
        text: "Respecter les normes minimales est un bon début, mais viser des performances supérieures apporte des bénéfices concrets : meilleur confort thermique en hiver, réduction des courants d'air froid près des fenêtres, diminution de la condensation et économies d'énergie substantielles. Les fenêtres que nous installons chez ISO Tradition dépassent systématiquement les exigences réglementaires, avec des valeurs Uw comprises entre 0.7 et 0.9 W/m²K selon les modèles.",
      },
    ],
  },
  {
    slug: "choisir-materiau-fenetres",
    tag: "Matériaux",
    title: "Choisir le bon matériau pour vos nouvelles fenêtres",
    date: "28 février 2026",
    image: "/images/blog-4.webp",
    body: [
      {
        heading: "Le PVC : le choix économique et performant",
        text: "Les fenêtres en PVC représentent aujourd'hui plus de 60 % du marché suisse de la rénovation. Ce matériau offre un excellent rapport qualité-prix avec de très bonnes performances d'isolation thermique (Uf de 1.0 à 1.3 W/m²K). Le PVC ne nécessite quasiment aucun entretien, résiste parfaitement aux intempéries et se décline désormais dans de nombreux coloris et finitions, y compris des imitations bois très réalistes. Sa durée de vie dépasse 40 ans avec un entretien minimal.",
      },
      {
        heading: "Le bois : l'authenticité et la chaleur naturelle",
        text: "Le bois reste le matériau de prédilection pour les bâtiments historiques, les zones protégées et les amateurs de matériaux naturels. Le chêne, le mélèze et le pin sont les essences les plus courantes. Les fenêtres en bois offrent une excellente isolation thermique et acoustique, ainsi qu'une esthétique incomparable. En revanche, elles nécessitent un entretien régulier (peinture ou lasure tous les 5 à 8 ans) pour conserver leurs propriétés et leur aspect.",
      },
      {
        heading: "L'aluminium : la modernité et la robustesse",
        text: "L'aluminium séduit par ses lignes fines et contemporaines, permettant de maximiser la surface vitrée. Grâce aux profilés à rupture de pont thermique de dernière génération, les fenêtres en aluminium atteignent désormais des performances thermiques comparables au PVC (Uf de 1.2 à 1.5 W/m²K). L'aluminium est extrêmement durable, ne se déforme pas et offre une palette de couleurs RAL quasi illimitée. C'est le choix idéal pour les grandes baies vitrées et les architectures modernes.",
      },
      {
        heading: "Le mixte bois-aluminium : le meilleur des deux mondes",
        text: "Les fenêtres mixtes bois-aluminium combinent la chaleur et les qualités isolantes du bois à l'intérieur avec la résistance et l'absence d'entretien de l'aluminium à l'extérieur. C'est la solution premium qui offre les meilleures performances globales, tant en isolation thermique qu'en durabilité. Son coût plus élevé est compensé par l'absence d'entretien extérieur et une durée de vie exceptionnelle. Chez ISO Tradition, nous proposons cette solution pour les clients qui recherchent l'excellence sans compromis.",
      },
    ],
  },
  {
    slug: "entretien-fenetres-bois",
    tag: "Entretien",
    title: "Comment entretenir vos fenêtres en bois pour qu'elles durent",
    date: "20 février 2026",
    image: "/images/blog-5.webp",
    body: [
      {
        heading: "L'importance d'un entretien régulier",
        text: "Les fenêtres en bois sont un investissement durable, mais elles nécessitent un entretien régulier pour conserver leurs qualités esthétiques et fonctionnelles. Sans soins appropriés, le bois peut se dégrader sous l'effet des UV, de l'humidité et des variations de température. Un entretien bien planifié permet de prolonger la durée de vie de vos fenêtres au-delà de 50 ans, tout en maintenant leurs performances d'isolation thermique et acoustique.",
      },
      {
        heading: "Le nettoyage saisonnier : la base de l'entretien",
        text: "Nettoyez vos fenêtres en bois au moins deux fois par an, idéalement au printemps et en automne. Utilisez une éponge douce avec de l'eau tiède et un savon neutre, en évitant les produits abrasifs ou les solvants qui pourraient endommager la finition. Portez une attention particulière aux rainures de drainage et aux joints d'étanchéité. Vérifiez le bon fonctionnement des quincailleries (poignées, charnières, mécanismes oscillo-battants) et lubrifiez-les avec un spray silicone si nécessaire.",
      },
      {
        heading: "Quand refaire la peinture ou la lasure ?",
        text: "La fréquence de remise en peinture dépend de l'exposition de vos fenêtres. Les faces sud et ouest, plus exposées au soleil et à la pluie, nécessitent une attention plus fréquente. En règle générale, prévoyez une couche de lasure ou de peinture tous les 5 à 8 ans. Les signes qui indiquent qu'il est temps d'agir : la couleur pâlit, la surface devient rugueuse au toucher, de petites fissures apparaissent dans la couche de finition. N'attendez pas que le bois nu soit exposé pour intervenir.",
      },
      {
        heading: "Les gestes préventifs pour éviter les problèmes",
        text: "Inspectez régulièrement les joints de mastic entre le vitrage et le cadre, ainsi que les joints périphériques. Remplacez-les dès qu'ils montrent des signes de vieillissement. Assurez-vous que l'eau de pluie s'écoule correctement et ne stagne pas sur les appuis de fenêtre. En hiver, évitez la condensation excessive en aérant régulièrement et en maintenant une hygrométrie intérieure raisonnable (entre 40 % et 60 %). Si vous constatez des signes de pourriture, contactez rapidement un professionnel.",
      },
      {
        heading: "Faire appel à un professionnel",
        text: "Pour les travaux de remise en état plus importants -- ponçage, traitement fongicide, application de plusieurs couches de finition -- il est souvent préférable de faire appel à un spécialiste. Chez ISO Tradition, nous proposons un service d'entretien et de rénovation de fenêtres en bois. Nos artisans qualifiés utilisent des produits professionnels adaptés à chaque essence de bois, garantissant un résultat durable et esthétique.",
      },
    ],
  },
  {
    slug: "deperditions-thermiques",
    tag: "Énergie",
    title: "Identifier et réduire les déperditions thermiques de votre habitat",
    date: "14 février 2026",
    image: "/images/blog-6.webp",
    body: [
      {
        heading: "Comprendre les déperditions thermiques",
        text: "Les déperditions thermiques désignent les pertes de chaleur d'un bâtiment vers l'extérieur. Dans une maison mal isolée, ces pertes se répartissent typiquement ainsi : 25 à 30 % par le toit, 20 à 25 % par les murs, 10 à 15 % par les fenêtres et portes, 7 à 10 % par le sol et 20 à 25 % par le renouvellement d'air (ventilation et infiltrations). Comprendre ces proportions est essentiel pour prioriser les travaux de rénovation et maximiser le retour sur investissement.",
      },
      {
        heading: "Les fenêtres : un maillon crucial de l'enveloppe thermique",
        text: "Bien que les fenêtres ne représentent en moyenne que 10 à 15 % de la surface de l'enveloppe d'un bâtiment, elles peuvent être responsables d'une part importante des déperditions thermiques, surtout si elles sont anciennes. Une fenêtre en simple vitrage laisse échapper 4 à 5 fois plus de chaleur qu'une fenêtre moderne à double vitrage performant. Le remplacement des fenêtres offre un retour sur investissement rapide, généralement entre 5 et 10 ans grâce aux économies de chauffage.",
      },
      {
        heading: "Comment diagnostiquer les pertes de chaleur ?",
        text: "Plusieurs méthodes permettent d'identifier les déperditions thermiques de votre habitat. La thermographie infrarouge est la plus efficace : une caméra thermique révèle les zones de fuite de chaleur sur les façades et autour des fenêtres. Le test d'infiltrométrie (blower door test) mesure l'étanchéité à l'air globale du bâtiment. Plus simplement, vous pouvez détecter les courants d'air froid autour de vos fenêtres en passant la main le long des joints un jour de vent.",
      },
      {
        heading: "Les solutions pour réduire les pertes",
        text: "Le remplacement des fenêtres anciennes par des modèles à haute isolation thermique est l'une des mesures les plus efficaces. Complétez cette action par l'isolation des caissons de volets roulants, souvent négligés mais source importante de ponts thermiques. L'installation de joints de calfeutrage neufs et le réglage des mécanismes de fermeture améliorent l'étanchéité à l'air. Pour une approche globale, combinez le remplacement des fenêtres avec l'isolation de la toiture et des murs pour des résultats optimaux.",
      },
      {
        heading: "L'accompagnement ISO Tradition",
        text: "Chez ISO Tradition, nous réalisons un diagnostic complet de votre habitat avant chaque projet de rénovation. Nos experts évaluent l'état de vos fenêtres actuelles, identifient les ponts thermiques et vous proposent des solutions adaptées à votre budget et à vos objectifs d'économie d'énergie. Nous vous accompagnons également dans les démarches pour obtenir les subventions cantonales et fédérales, qui peuvent financer une part significative de vos travaux.",
      },
    ],
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <>
        <Header forceVisible />
        <main className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4">Article introuvable</h1>
            <Link
              href="/actualites"
              className="text-accent hover:text-accent-hover font-semibold transition-colors"
            >
              Retour aux actualités
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  /* Related articles: pick up to 3 others, preferring same tag */
  const sameTag = articles.filter((a) => a.slug !== slug && a.tag === article.tag);
  const others = articles.filter((a) => a.slug !== slug && a.tag !== article.tag);
  const related = [...sameTag, ...others].slice(0, 3);

  return (
    <>
      <Header forceVisible />

      {/* ── Hero ── */}
      <section className="relative h-[50vh] min-h-[360px] lg:min-h-[440px] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="relative z-10 flex flex-col justify-end h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 lg:pb-14">
          <FadeIn>
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium mb-5 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Retour aux actualités
            </Link>
          </FadeIn>
          <FadeIn delay={0.05}>
            <span className="inline-block bg-accent text-primary-dark text-[12px] font-bold px-3 py-1 rounded-full mb-3">
              {article.tag}
            </span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[44px] font-bold text-white leading-tight max-w-3xl">
              {article.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-white/60 text-sm mt-3">{article.date}</p>
          </FadeIn>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {article.body.map((block, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className={i > 0 ? "mt-10" : ""}>
                <h2 className="text-xl lg:text-2xl font-bold text-primary mb-4">
                  {block.heading}
                </h2>
                <p className="text-primary/70 text-[15px] lg:text-base leading-relaxed">
                  {block.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Related Articles ── */}
      <section className="py-14 lg:py-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary text-center mb-10 lg:mb-14">
              Articles similaires
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {related.map((rel, i) => (
              <FadeIn key={rel.slug} delay={i * 0.1}>
                <Link href={`/actualites/${rel.slug}`} className="group block">
                  <div className="relative rounded-[20px] overflow-hidden mb-4">
                    <span className="absolute top-4 left-4 z-10 bg-white text-primary text-[12px] font-semibold px-3 py-1 rounded-full shadow-md">
                      {rel.tag}
                    </span>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-primary leading-snug mb-2 group-hover:text-accent transition-colors">
                    {rel.title}
                  </h3>
                  <p className="text-primary/50 text-sm">{rel.date}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
        <BrandIcon className="absolute -right-16 bottom-[-80px] w-[400px] h-[400px] text-primary opacity-[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-primary leading-tight mb-4">
              Obtenez un <span className="text-accent">devis gratuit</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-primary/60 text-[15px] leading-relaxed max-w-2xl mx-auto mb-8">
              Nos experts se déplacent gratuitement pour évaluer votre projet et vous proposer
              une solution sur mesure.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://form.typeform.com/to/astTYipT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-dark font-bold px-8 py-3.5 rounded-full text-[15px] transition-colors group"
              >
                Demander un offre
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-dark/15 transition-transform group-hover:translate-x-0.5">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </a>
              <a
                href="tel:0216245300"
                className="inline-flex items-center gap-2 border border-primary/20 hover:border-primary/40 text-primary font-semibold px-8 py-3.5 rounded-full text-[15px] transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                021 624 53 00
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
