/**
 * Configuração única do site: contato, mensagens de WhatsApp, agenda e analytics.
 * Nada aqui é segredo de API. O ID de analytics e a URL de agenda são públicos por natureza.
 * Itens em `null` deixam o recurso desligado: o botão ou o script simplesmente não aparece.
 */

export const config = {
  whatsapp: {
    // Número em partes: o link do wa.me é montado no navegador, nunca escrito no HTML.
    parts: ["55", "51", "99688", "2830"],
    messages: {
      hero: "Oi Pedro, vi seu site e queria agendar um diagnóstico gratuito.",
      angular: "Oi Pedro, vi o serviço de upgrade de Angular no seu site e queria conversar sobre o meu projeto.",
      testes: "Oi Pedro, vi o serviço de resgate de cobertura de testes no seu site e queria conversar sobre o meu projeto.",
      sso: "Oi Pedro, vi o serviço de integração Keycloak/SSO no seu site e queria conversar sobre o meu projeto.",
      "sob-medida": "Oi Pedro, vi o serviço de sistemas sob medida no seu site e queria conversar sobre o meu projeto.",
      cta: "Oi Pedro, vi seu site e queria agendar um diagnóstico gratuito.",
      "mapa-angular": "Oi Pedro, vi no seu site o mapa de upgrade em 48 h e queria receber o do meu projeto Angular. Posso te enviar o package.json?",
    } as Record<string, string>,
  },

  /** URL da agenda (Cal.com ou similar). Com `null`, o botão "Agendar" não é exibido. */
  schedulingUrl: null as string | null,

  /** Analytics sem cookies. Com provider ou id em `null`, nenhum script é carregado. */
  analytics: {
    provider: "umami" as "umami" | "plausible" | null,
    /** Umami: ID do site. Plausible: domínio (ex.: "widholzerr.github.io"). */
    id: "a863b519-e624-44c6-b8ba-3ec94e228d14" as string | null,
    scriptUrl: "https://cloud.umami.is/script.js",
  },
};

export const analyticsOn = Boolean(config.analytics.provider && config.analytics.id);

/** Atributos de evento para um elemento clicável, conforme o provedor configurado. */
export function trackAttrs(event: string, props: Record<string, string> = {}) {
  if (!analyticsOn) return {};
  if (config.analytics.provider === "umami") {
    const a: Record<string, string> = { "data-umami-event": event };
    for (const [k, v] of Object.entries(props)) a[`data-umami-event-${k}`] = v;
    return a;
  }
  // Plausible: eventos por classe CSS (espaços viram "+")
  const cls = [`plausible-event-name=${event.replace(/ /g, "+")}`];
  for (const [k, v] of Object.entries(props)) cls.push(`plausible-event-${k}=${v.replace(/ /g, "+")}`);
  return { class: cls.join(" ") };
}
