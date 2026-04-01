import { defineType, defineField } from "sanity";
import { CogIcon } from '@sanity/icons';

export default defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "Général", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Réseaux sociaux" },
    { name: "cta", title: "Boutons d'action" },
  ],
  fields: [
    defineField({ name: "siteName", title: "Nom du site", type: "string", group: "general", initialValue: "ISO Tradition" }),
    defineField({ name: "siteDescription", title: "Description du site", type: "text", rows: 3, group: "general" }),
    defineField({ name: "logo", title: "Logo (couleur)", type: "image", group: "general", options: { hotspot: true } }),
    defineField({ name: "logoWhite", title: "Logo (blanc)", type: "image", group: "general", options: { hotspot: true } }),

    // Contact
    defineField({ name: "phone", title: "Téléphone", type: "string", group: "contact" }),
    defineField({ name: "email", title: "Email", type: "string", group: "contact" }),
    defineField({ name: "address", title: "Adresse", type: "string", group: "contact" }),
    defineField({ name: "city", title: "Ville", type: "string", group: "contact" }),
    defineField({ name: "postalCode", title: "Code postal", type: "string", group: "contact" }),
    defineField({
      name: "openingHours",
      title: "Horaires d'ouverture",
      type: "string",
      group: "contact",
      initialValue: "Lun - Ven : 8h00 - 17h00",
    }),
    defineField({ name: "byAppointment", title: "Sur rendez-vous", type: "boolean", group: "contact", initialValue: true }),
    defineField({
      name: "googleMapsUrl",
      title: "Lien Google Maps",
      type: "url",
      group: "contact",
      description: "URL d'intégration Google Maps (iframe src). Utilisé sur toutes les pages avec une carte.",
    }),
    defineField({
      name: "googleMapsEmbed",
      title: "Code iframe Google Maps",
      type: "text",
      rows: 4,
      group: "contact",
      description: "L'URL src de l'iframe Google Maps (pas le code HTML complet, juste l'URL).",
    }),

    // Social
    defineField({ name: "instagram", title: "Instagram URL", type: "url", group: "social" }),
    defineField({ name: "facebook", title: "Facebook URL", type: "url", group: "social" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url", group: "social" }),

    // CTA
    defineField({ name: "ctaText", title: "Texte du bouton CTA principal", type: "string", group: "cta", initialValue: "Demander une offre" }),
    defineField({ name: "ctaUrl", title: "URL du CTA", type: "string", group: "cta", initialValue: "https://form.typeform.com/to/astTYipT" }),
  ],
  preview: {
    prepare() {
      return { title: "Paramètres du site" };
    },
  },
});
