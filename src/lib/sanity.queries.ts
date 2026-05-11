// ============================================================
// SEMATELMED — GROQ Queries Centralizadas
// Todas las consultas a Sanity en un solo archivo
// Categoría: reference con join -> expand (backward compatible con strings)
// Galería: gallery[] con asset-> expandido
// ============================================================

// ── Categorías ──

/** Todas las categorías, ordenadas por campo `order` */
export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    color,
    icon,
    order
  }
`;

// ── Productos ──

/** Fragmento reutilizable de producto con categoría expandida
 *  BACKWARD COMPATIBLE: coalesce() maneja tanto:
 *  - Products NUEVOS con category como reference (category-> expande el documento)
 *  - Products VIEJOS con category como string ("computo", "telecomunicaciones", etc.)
 *  Para strings viejos, category retorna null y el frontend usa fallback.
 */
const PRODUCT_FIELDS = `
  _id,
  _createdAt,
  _updatedAt,
  name,
  "slug": slug.current,
  image {
    asset->,
    alt,
    hotspot,
    crop
  },
  gallery[] {
    asset->,
    alt,
    caption,
    hotspot,
    crop
  },
  "category": coalesce(
    category->{
      _id,
      name,
      "slug": slug.current,
      color,
      icon
    },
    // Fallback para category como string (productos viejos)
    // Retorna null → el frontend lo maneja con CATEGORY_LABELS_MAP
    null
  ),
  "categoryRaw": category,
  description,
  price,
  specs,
  stock,
  badge,
  featured,
  order
`;

/** Todos los productos publicados, ordenados por campo `order` */
export const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(order asc) {
    ${PRODUCT_FIELDS}
  }
`;

/** Solo productos destacados (para home page) */
export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true] | order(order asc) {
    ${PRODUCT_FIELDS}
  }[0..7]
`;

/** Un producto por slug (para detalle) */
export function productBySlugQuery(slug: string) {
  return `
    *[_type == "product" && slug.current == "${slug}"][0] {
      ${PRODUCT_FIELDS}
    }
  `;
}

/** Productos por categoría slug */
export function productsByCategoryQuery(categorySlug: string) {
  return `
    *[_type == "product" && category->slug.current == "${categorySlug}"] | order(order asc) {
      ${PRODUCT_FIELDS}
    }
  `;
}

// ── Configuración del sitio ──

/** Configuración del sitio (singleton) */
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    _id,
    mission,
    vision,
    address,
    phone,
    whatsapp,
    email,
    description,
    facebookUrl,
    tiktokUrl,
    mapLatitude,
    mapLongitude
  }
`;

// ── Slugs para generación estática ──

/** Todos los slugs de productos (para generateStaticParams) */
export const ALL_PRODUCT_SLUGS_QUERY = `
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`;
