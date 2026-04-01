import { defineType, defineField } from "sanity";

export default defineType({
  name: "marketingSettings",
  title: "Marketing & Analytics",
  type: "document",
  groups: [
    { name: "analytics", title: "Analytics", default: true },
    { name: "pixels", title: "Pixels & Ads" },
    { name: "custom", title: "Scripts personnalisés" },
    { name: "consent", title: "Cookies" },
  ],
  fields: [
    // Analytics
    defineField({
      name: "googleAnalyticsId",
      title: "Google Analytics 4 — Measurement ID",
      type: "string",
      group: "analytics",
      description: "Format : G-XXXXXXXXXX",
      validation: (Rule) => Rule.regex(/^G-[A-Z0-9]+$/).warning('ID doit commencer par "G-"'),
    }),
    defineField({
      name: "googleTagManagerId",
      title: "Google Tag Manager — Container ID",
      type: "string",
      group: "analytics",
      description: "Format : GTM-XXXXXXX",
    }),
    defineField({
      name: "googleSearchConsoleVerification",
      title: "Google Search Console — Code de vérification",
      type: "string",
      group: "analytics",
    }),

    // Pixels
    defineField({ name: "facebookPixelId", title: "Meta (Facebook) Pixel ID", type: "string", group: "pixels" }),
    defineField({ name: "tiktokPixelId", title: "TikTok Pixel ID", type: "string", group: "pixels" }),
    defineField({ name: "linkedinPartnerId", title: "LinkedIn Insight Tag — Partner ID", type: "string", group: "pixels" }),
    defineField({ name: "googleAdsId", title: "Google Ads — Conversion ID", type: "string", group: "pixels", description: "Format : AW-XXXXXXXXX" }),
    defineField({ name: "snapchatPixelId", title: "Snapchat Pixel ID", type: "string", group: "pixels" }),
    defineField({ name: "pinterestTagId", title: "Pinterest Tag ID", type: "string", group: "pixels" }),

    // Custom Scripts
    defineField({
      name: "headScripts",
      title: "Scripts dans <head>",
      type: "text",
      rows: 10,
      group: "custom",
      description: "HTML/JS injecté dans <head>. Pour Hotjar, Crisp, etc.",
    }),
    defineField({ name: "bodyStartScripts", title: "Scripts après ouverture <body>", type: "text", rows: 8, group: "custom" }),
    defineField({ name: "bodyEndScripts", title: "Scripts avant fermeture </body>", type: "text", rows: 8, group: "custom" }),

    // Cookie Consent
    defineField({ name: "cookieConsentEnabled", title: "Activer la bannière cookies", type: "boolean", group: "consent", initialValue: false }),
    defineField({ name: "cookieConsentMessage", title: "Message de la bannière", type: "text", rows: 3, group: "consent" }),
    defineField({ name: "cookieConsentPrivacyLink", title: "Lien politique de confidentialité", type: "string", group: "consent" }),
  ],
  preview: {
    prepare() {
      return { title: "Marketing & Analytics" };
    },
  },
});
