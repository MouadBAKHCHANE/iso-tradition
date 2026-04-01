"use client";

interface ThemeColors {
  colorPrimary?: string;
  colorPrimaryDark?: string;
  colorAccent?: string;
  colorAccentHover?: string;
  colorSecondary?: string;
}

export default function ThemeProvider({ colors }: { colors: ThemeColors | null }) {
  if (!colors) return null;

  const vars: Record<string, string> = {};
  if (colors.colorPrimary) vars["--color-primary"] = colors.colorPrimary;
  if (colors.colorPrimaryDark) vars["--color-primary-dark"] = colors.colorPrimaryDark;
  if (colors.colorAccent) vars["--color-accent"] = colors.colorAccent;
  if (colors.colorAccentHover) vars["--color-accent-hover"] = colors.colorAccentHover;
  if (colors.colorSecondary) vars["--color-secondary"] = colors.colorSecondary;

  if (Object.keys(vars).length === 0) return null;

  const cssString = Object.entries(vars)
    .map(([key, val]) => `${key}: ${val};`)
    .join("\n  ");

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `:root {\n  ${cssString}\n}`,
      }}
    />
  );
}
