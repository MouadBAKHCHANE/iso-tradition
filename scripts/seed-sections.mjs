import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cav3bi02",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function makeSections(items) {
  return items.map((item, i) => ({
    _key: `sec${i}`,
    _type: "object",
    id: item.id,
    label: item.label,
    visible: true,
  }));
}

// Homepage
await client.patch("homepage").set({
  sections: makeSections([
    { id: "hero", label: "Hero" },
    { id: "aboutPreview", label: "Aperçu Qui sommes-nous" },
    { id: "solutions", label: "Nos solutions" },
    { id: "whyReplace", label: "Pourquoi remplacer" },
    { id: "strengths", label: "Nos forces" },
    { id: "projectCta", label: "CTA Projet" },
    { id: "blog", label: "Blog" },
    { id: "serviceArea", label: "Zone d'intervention" },
    { id: "faq", label: "FAQ" },
  ]),
}).commit();
console.log("✅ Homepage sections");

// About page
await client.patch("aboutPage").set({
  sections: makeSections([
    { id: "hero", label: "Hero" },
    { id: "gallery", label: "Galerie" },
    { id: "mission", label: "Mission" },
    { id: "stats", label: "Chiffres clés" },
    { id: "values", label: "Atouts" },
    { id: "process", label: "Processus" },
    { id: "zones", label: "Zones d'intervention" },
    { id: "cta", label: "CTA" },
  ]),
}).commit();
console.log("✅ About sections");

// Solutions page
await client.patch("solutionsPage").set({
  sections: makeSections([
    { id: "hero", label: "Hero" },
    { id: "whyChoose", label: "Pourquoi nous choisir" },
    { id: "subventions", label: "Subventions" },
    { id: "cta", label: "CTA" },
  ]),
}).commit();
console.log("✅ Solutions sections");

// Contact page
await client.patch("contactPage").set({
  sections: makeSections([
    { id: "hero", label: "Hero" },
    { id: "info", label: "Informations" },
    { id: "form", label: "Formulaire" },
    { id: "map", label: "Carte" },
  ]),
}).commit();
console.log("✅ Contact sections");

// All products
const products = await client.fetch('*[_type == "product"]{ _id }');
for (const p of products) {
  await client.patch(p._id).set({
    sections: makeSections([
      { id: "why", label: "Pourquoi changer" },
      { id: "advantages", label: "Atouts" },
      { id: "types", label: "Types & options" },
      { id: "didYouKnow", label: "Le saviez-vous" },
      { id: "faq", label: "FAQ" },
    ]),
  }).commit();
  console.log(`✅ Product: ${p._id}`);
}

console.log("\n🎉 All sections seeded!");
