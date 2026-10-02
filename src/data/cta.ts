import site from "./site.json";

/** Link do botão "Agendar diagnóstico": WhatsApp se já houver URL; senão email (até chegar o WhatsApp). */
export const whatsappUrl: string | null = site.placeholders.whatsapp.url;

export const ctaHref: string =
  whatsappUrl ??
  `mailto:${site.profile.email}?subject=${encodeURIComponent(site.placeholders.emailSubject)}`;

export const ctaExternal = Boolean(whatsappUrl);
