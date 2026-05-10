// ============================================================
// SEMATELMED — GROQ Queries Centralizadas
// Todas las consultas a Sanity en un solo archivo
// ============================================================

// ── Productos ──

/** Todos los productos publicados, ordenados por campo `order` */
export const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(order asc) {
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
    category,
    description,
    price,
    specs,
    stock,
    featured,
    order
  }
`;

/** Solo productos destacados (para home page) */
export const FEATURED_PRODUCTS_QUERY = `
  *[_type == "product" && featured == true] | order(order asc) {
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
    category,
    description,
    price,
    specs,
    stock,
    featured,
    order
  }[0..7]
`;

/** Un producto por slug (para detalle) */
export function productBySlugQuery(slug: string) {
  return `
    *[_type == "product" && slug.current == "${slug}"][0] {
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
      category,
      description,
      price,
      specs,
      stock,
      featured,
      order
    }
  `;
}

/** Productos por categoría */
export function productsByCategoryQuery(category: string) {
  return `
    *[_type == "product" && category == "${category}"] | order(order asc) {
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
      category,
      description,
      price,
      specs,
      stock,
      featured,
      order
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
