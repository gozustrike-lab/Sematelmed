// ============================================================
// SEMATELMED — Esquema de Configuración del Sitio (Sanity v3)
// Optimizado UX: fieldsets agrupados, descripciones, singleton
// ============================================================
// NOTA: El crédito "Diseño y desarrollo web por Fast Page Pro"
// está HARDCODED en el Footer y NO es editable desde el CMS.
// ============================================================

import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Configuración del Sitio",
  type: "document",
  icon: () => "🏢",

  // ── Fieldsets: agrupación visual para UX intuitiva ──
  fieldsets: [
    {
      name: "missionVision",
      title: "📋 Misión y Visión",
      description: "Define la identidad y propósito de la empresa.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "contact",
      title: "📞 Información de Contacto",
      description: "Datos que aparecen en el Footer y la página Nosotros.",
      options: { collapsible: false },
    },
    {
      name: "social",
      title: "🌐 Redes Sociales",
      description: "URLs de perfiles sociales. Se muestran en el Footer.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "location",
      title: "📍 Ubicación (Google Maps)",
      description:
        "Coordenadas para el mapa embebido. Obténlas en Google Maps (clic derecho → coordenadas).",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "seo",
      title: "🔍 SEO y Metadatos",
      description: "Descripción general del sitio para buscadores y compartidos en redes.",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ── Misión y Visión ──
    defineField({
      name: "mission",
      title: "Misión",
      fieldset: "missionVision",
      description:
        "Describe el propósito y la propuesta de valor de la empresa. Máximo 300 caracteres para no romper el diseño.",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.required()
          .max(300)
          .error("La misión es obligatoria (máximo 300 caracteres)."),
    }),

    defineField({
      name: "vision",
      title: "Visión",
      fieldset: "missionVision",
      description:
        "Describe hacia dónde se proyecta la empresa a futuro. Máximo 300 caracteres para no romper el diseño.",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.required()
          .max(300)
          .error("La visión es obligatoria (máximo 300 caracteres).")
    }),

    // ── Información de Contacto ──
    defineField({
      name: "address",
      title: "Dirección",
      fieldset: "contact",
      description: "Dirección física del local o tienda. Se muestra en el Footer y Google Maps.",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(150)
          .error("La dirección es obligatoria (máximo 150 caracteres)."),
    }),

    defineField({
      name: "phone",
      title: "Teléfono",
      fieldset: "contact",
      description: 'Número de teléfono visible. Ejemplo: "+51 976 983 333"',
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(20)
          .error("El teléfono es obligatorio (máximo 20 caracteres)."),
    }),

    defineField({
      name: "whatsapp",
      title: "WhatsApp (número)",
      fieldset: "contact",
      description:
        'Número de WhatsApp sin espacios ni guiones. Se usa para el botón de cotización. Ejemplo: "51976983333"',
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .max(15)
          .error("El número de WhatsApp es obligatorio (solo dígitos y código de país)."),
    }),

    defineField({
      name: "email",
      title: "Correo Electrónico",
      fieldset: "contact",
      description: "Email de contacto de la empresa. Se muestra como enlace mailto:.",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("El correo electrónico es obligatorio."),
    }),

    // ── Redes Sociales ──
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      fieldset: "social",
      description: 'URL completa del perfil de Facebook. Ejemplo: "https://facebook.com/sematelmed"',
      type: "string",
    }),

    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      fieldset: "social",
      description: 'URL completa del perfil de TikTok. Ejemplo: "https://tiktok.com/@sematelmed"',
      type: "string",
    }),

    // ── Ubicación ──
    defineField({
      name: "mapLatitude",
      title: "Latitud",
      fieldset: "location",
      description:
        "Coordenada de latitud para Google Maps. Ejemplo: -17.6152 (Ilo, Moquegua)",
      type: "number",
      validation: (Rule) =>
        Rule.min(-90)
          .max(90)
          .warning("La latitud debe estar entre -90 y 90 grados."),
    }),

    defineField({
      name: "mapLongitude",
      title: "Longitud",
      fieldset: "location",
      description:
        "Coordenada de longitud para Google Maps. Ejemplo: -71.3381 (Ilo, Moquegua)",
      type: "number",
      validation: (Rule) =>
        Rule.min(-180)
          .max(180)
          .warning("La longitud debe estar entre -180 y 180 grados."),
    }),

    // ── SEO y Metadatos ──
    defineField({
      name: "description",
      title: "Descripción del Sitio (SEO)",
      fieldset: "seo",
      description:
        "Texto breve que aparece en los resultados de Google y al compartir el enlace. Recomendado: 150-160 caracteres.",
      type: "text",
      rows: 2,
    }),
  ],

  // ── Preview ──
  preview: {
    prepare() {
      return {
        title: "Configuración del Sitio",
        subtitle: "Misión, Visión, Contacto y Redes Sociales",
      };
    },
  },
});
