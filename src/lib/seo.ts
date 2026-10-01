// The root layout's title template appends " – ISO Tradition";
// strip any brand suffix already present (e.g. in Sanity seoTitle) so it appears once.
export function pageTitle(title?: string | null): string | undefined {
  const cleaned = title?.replace(/\s*[–|-]\s*ISO Tradition\s*$/i, "").trim();
  return cleaned || undefined;
}
