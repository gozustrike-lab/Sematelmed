// ============================================================
// FAST PAGE PRO — Esquema de Guía de Uso del Studio
// Documento singleton que contiene instrucciones paso a paso
// para crear productos, editar inline y gestionar el sitio
// ============================================================

import { defineField, defineType } from "sanity";

export default defineType({
  name: "studioGuide",
  title: "Guía de Uso del Studio",
  type: "document",
  icon: () => "📖",

  // ── Fieldsets: pasos organizados por tema ──
  fieldsets: [
    {
      name: "crear",
      title: "📦 Paso 1: Crear un Producto",
      description: "Instrucciones para añadir un nuevo producto al catálogo.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "editar",
      title: "✏️ Paso 2: Editar un Producto",
      description: "Cómo modificar un producto existente y ver los cambios en vivo.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "preview",
      title: "👁️ Paso 3: Live Preview (Edición en Vivo)",
      description: "Cómo usar la vista previa en tiempo real desde el Studio.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "inline",
      title: "🖱️ Paso 4: Edición Inline (Sobre la página)",
      description: "Cómo editar directamente en la vista previa de la web.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "config",
      title: "⚙️ Paso 5: Configuración del Sitio",
      description: "Cómo gestionar los datos de la empresa que aparecen en toda la web.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "tips",
      title: "💡 Consejos y Buenas Prácticas",
      description: "Recomendaciones para mantener tu catálogo organizado y profesional.",
      options: { collapsible: true, collapsed: true },
    },
  ],

  fields: [
    // ── Paso 1: Crear un Producto ──
    defineField({
      name: "step1",
      title: "Cómo crear un producto nuevo",
      fieldset: "crear",
      description:
        "Sigue estos pasos para añadir un producto a tu catálogo online.",
      type: "array",
      of: [{ type: "block" }],
      initialValue: [
        {
          _type: "block",
          _key: "s1-1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1-1a",
              text: "1. Haz clic en ",
              marks: [],
            },
            {
              _type: "span",
              _key: "s1-1b",
              text: '"Contenido de Tienda"',
              marks: ["strong"],
            },
            {
              _type: "span",
              _key: "s1-1c",
              text: " en el menú izquierdo del Studio.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s1-2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1-2a",
              text: "2. Haz clic en el botón azul ",
              marks: [],
            },
            {
              _type: "span",
              _key: "s1-2b",
              text: '"Crear producto"',
              marks: ["strong"],
            },
            {
              _type: "span",
              _key: "s1-2c",
              text: " (esquina superior derecha).",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s1-3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1-3a",
              text: '3. Completa los campos obligatorios: Nombre, Imagen, Categoría, Descripción y Precio.',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s1-4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1-4a",
              text: '4. El campo "URL amigable (slug)" se genera automáticamente desde el nombre. Solo edítalo si necesitas una URL personalizada.',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s1-5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1-5a",
              text: '5. Activa "Producto Destacado" si quieres que aparezca en la página principal.',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s1-6",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1-6a",
              text: '6. Usa "Orden de Aparición" (número) para controlar la posición del producto en la tienda. Menor número = aparece primero.',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s1-7",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1-7a",
              text: '7. Haz clic en el botón verde "Publicar" (esquina superior derecha) para guardar los cambios.',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s1-8",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s1-8a",
              text: "8. La web se actualizará automáticamente en un máximo de 60 segundos.",
              marks: ["strong"],
            },
          ],
          markDefs: [],
        },
      ],
    }),

    // ── Paso 2: Editar un Producto ──
    defineField({
      name: "step2",
      title: "Cómo editar un producto existente",
      fieldset: "editar",
      description:
        "Modifica cualquier campo de un producto que ya esté publicado.",
      type: "array",
      of: [{ type: "block" }],
      initialValue: [
        {
          _type: "block",
          _key: "s2-1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s2-1a",
              text: "1. Ve a ",
              marks: [],
            },
            {
              _type: "span",
              _key: "s2-1b",
              text: '"Contenido de Tienda"',
              marks: ["strong"],
            },
            {
              _type: "span",
              _key: "s2-1c",
              text: " en el menú izquierdo.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s2-2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s2-2a",
              text: '2. Haz clic en el producto que quieres editar de la lista.',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s2-3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s2-3a",
              text: "3. Modifica los campos que necesites (texto, imagen, precio, etc.).",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s2-4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s2-4a",
              text: '4. Si necesitas cambiar la imagen, haz clic en la imagen actual y sube una nueva. Recomendado: 1200x630px, formato JPG o PNG.',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s2-5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s2-5a",
              text: '5. Haz clic en "Publicar" para guardar. Los cambios se reflejarán en la web en menos de 1 minuto.',
              marks: ["strong"],
            },
          ],
          markDefs: [],
        },
      ],
    }),

    // ── Paso 3: Live Preview ──
    defineField({
      name: "step3",
      title: "Cómo usar el Live Preview",
      fieldset: "preview",
      description:
        "Vista previa en tiempo real desde el panel del Studio.",
      type: "array",
      of: [{ type: "block" }],
      initialValue: [
        {
          _type: "block",
          _key: "s3-1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3-1a",
              text: "El ",
              marks: [],
            },
            {
              _type: "span",
              _key: "s3-1b",
              text: "Live Preview",
              marks: ["strong"],
            },
            {
              _type: "span",
              _key: "s3-1c",
              text: " te permite ver tu web completa dentro del Studio. Se actualiza al instante cuando guardas cambios.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s3-2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3-2a",
              text: "1. Selecciona un documento (producto o configuración del sitio).",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s3-3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3-3a",
              text: '2. Haz clic en el ícono de "Presentación" (ojo) en la barra superior del documento.',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s3-4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3-4a",
              text: "3. Se abrirá un panel con tu web visible al lado derecho del editor.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s3-5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3-5a",
              text: '4. Edita cualquier campo en el panel izquierdo y verás los cambios reflejados al instante en la vista previa (derecha).',
              marks: ["strong"],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s3-6",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s3-6a",
              text: "5. Puedes navegar por toda tu web dentro del panel de vista previa usando los enlaces y menús.",
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    }),

    // ── Paso 4: Edición Inline ──
    defineField({
      name: "step4",
      title: "Edición Inline (sobre la página)",
      fieldset: "inline",
      description:
        "Edita directamente sobre la vista previa de la web sin cambiar de panel.",
      type: "array",
      of: [{ type: "block" }],
      initialValue: [
        {
          _type: "block",
          _key: "s4-1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s4-1a",
              text: "La ",
              marks: [],
            },
            {
              _type: "span",
              _key: "s4-1b",
              text: "edición inline",
              marks: ["strong"],
            },
            {
              _type: "span",
              _key: "s4-1c",
              text: " te permite hacer clic directamente en los elementos de tu web para editarlos, sin tener que ir al formulario del Studio.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s4-2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s4-2a",
              text: "1. Abre el ",
              marks: [],
            },
            {
              _type: "span",
              _key: "s4-2b",
              text: "Live Preview",
              marks: ["strong"],
            },
            {
              _type: "span",
              _key: "s4-2c",
              text: " como se explica en el Paso 3.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s4-3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s4-3a",
              text: "2. Verás una barra flotante en la parte inferior de la vista previa con el nombre del documento activo.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s4-4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s4-4a",
              text: '3. Haz clic en los campos editables directamente en la página (nombre del producto, precio, descripción, etc.). Se abrirá un mini-editor inline.',
              marks: ["strong"],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s4-5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s4-5a",
              text: "4. Escribe los cambios directamente sobre la vista previa.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s4-6",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s4-6a",
              text: "5. Los cambios se guardan automáticamente y la web se actualiza al instante.",
              marks: ["strong"],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s4-7",
          style: "h4",
          children: [
            {
              _type: "span",
              _key: "s4-7a",
              text: "Nota importante:",
              marks: ["strong"],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s4-8",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s4-8a",
              text: "La edición inline está disponible para los productos que se muestran en la página /tienda. Los campos editables incluyen nombre, precio, descripción y categoría. Para cambios más complejos (imágenes, especificaciones), usa el formulario completo del Studio.",
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    }),

    // ── Paso 5: Configuración del Sitio ──
    defineField({
      name: "step5",
      title: "Configuración del Sitio",
      fieldset: "config",
      description:
        "Datos de la empresa que aparecen en toda la web.",
      type: "array",
      of: [{ type: "block" }],
      initialValue: [
        {
          _type: "block",
          _key: "s5-1",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5-1a",
              text: "La ",
              marks: [],
            },
            {
              _type: "span",
              _key: "s5-1b",
              text: "Configuración del Sitio",
              marks: ["strong"],
            },
            {
              _type: "span",
              _key: "s5-5c",
              text: " es un documento único (singleton) que controla la información que aparece en toda la web: Misión, Visión, datos de contacto, redes sociales y ubicación.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s5-2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5-2a",
              text: "1. Ve a ",
              marks: [],
            },
            {
              _type: "span",
              _key: "s5-2b",
              text: '"Información Corporativa"',
              marks: ["strong"],
            },
            {
              _type: "span",
              _key: "s5-2c",
              text: " en el menú izquierdo.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s5-3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5-3a",
              text: '2. Haz clic en "Configuración del Sitio" para abrir el documento.',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s5-4",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5-4a",
              text: '3. Los datos están organizados en secciones: "Misión y Visión", "Contacto", "Redes Sociales", "Ubicación" y "SEO".',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s5-5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5-5a",
              text: "4. Actualiza cualquier campo y publica. Los cambios se reflejan en toda la web (página de inicio, nosotros, footer).",
              marks: ["strong"],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s5-6",
          style: "h4",
          children: [
            {
              _type: "span",
              _key: "s5-6a",
              text: "Campos importantes:",
              marks: ["strong"],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s5-7",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5-7a",
              text: "• WhatsApp: es el número que se usa para el botón de cotización. Debe incluir código de país (ej: 51976983333).",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "s5-8",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "s5-8a",
              text: "• Latitud/Longitud: coordenadas para Google Maps en la página Nosotros.",
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    }),

    // ── Consejos ──
    defineField({
      name: "tips",
      title: "Consejos y Buenas Prácticas",
      fieldset: "tips",
      description: "Recomendaciones para mantener tu catálogo profesional.",
      type: "array",
      of: [{ type: "block" }],
      initialValue: [
        {
          _type: "block",
          _key: "t1",
          style: "h4",
          children: [
            {
              _type: "span",
              _key: "t1a",
              text: "Imágenes de producto",
              marks: ["strong"],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "t2",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "t2a",
              text: "• Sube imágenes de alta calidad, mínimo 800px de ancho. Lo ideal es 1200x630px.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "t3",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "t3a",
              text: "• Usa el hotspot (punto caliente) para centrar la imagen en el producto.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "t4",
          style: "h4",
          children: [
            {
              _type: "span",
              _key: "t4a",
              text: "Precios",
              marks: ["strong"],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "t5",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "t5a",
              text: '• Puedes escribir precios como "Desde S/ 1,299", "Cotizar" o "S/ 899.00". Es texto libre.',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "t6",
          style: "h4",
          children: [
            {
              _type: "span",
              _key: "t6a",
              text: "Orden y organización",
              marks: ["strong"],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "t7",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "t7a",
              text: '• Usa "Orden de Aparición" para controlar qué productos se muestran primero. El número 0 aparece al inicio.',
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "t8",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "t8a",
              text: "• Mantén las categorías consistentes para que los filtros funcionen correctamente.",
              marks: [],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "t9",
          style: "h4",
          children: [
            {
              _type: "span",
              _key: "t9a",
              text: "Tiempo de actualización",
              marks: ["strong"],
            },
          ],
          markDefs: [],
        },
        {
          _type: "block",
          _key: "t10",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "t10a",
              text: "• Después de publicar, la web se actualiza automáticamente en un máximo de 60 segundos. No necesitas hacer nada más.",
              marks: [],
            },
          ],
          markDefs: [],
        },
      ],
    }),
  ],

  // ── Preview ──
  preview: {
    prepare() {
      return {
        title: "Guía de Uso del Studio",
        subtitle: "Instrucciones paso a paso para gestionar tu web",
      };
    },
  },
});
