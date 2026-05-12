"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import {
  MessageCircle,
  Search,
  SlidersHorizontal,
  Monitor,
  Wifi,
  HeartPulse,
  Sun,
  Package,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SectionTransition } from "@/components/SectionTransition";
import { ProductModal } from "@/components/ProductModal";
import {
  ProductGridSkeleton,
  CategoryFilterSkeleton,
  SearchBarSkeleton,
} from "@/components/ProductSkeletons";
import {
  type SanityProduct,
  type SanityCategory,
  plainText,
  getCategoryName,
  getCategoryColorClass,
  getCategoryId,
  getProductCategoryColor,
  getProductCategoryIcon,
  getProductImageUrl,
} from "@/lib/sanity.client";
import { getWhatsAppURL, CATEGORY_LABELS, type ProductCategory } from "@/constants/data";

// ── Icon mapper ──
const ICON_MAP: Record<string, React.ElementType> = {
  monitor: Monitor,
  wifi: Wifi,
  "heart-pulse": HeartPulse,
  sun: Sun,
  package: Package,
  tag: Tag,
};

function getCategoryIcon(icon?: string): React.ElementType {
  return (icon && ICON_MAP[icon]) || Package;
}

// ── Badge color map ──
function getBadgeStyle(badge: string): string {
  switch (badge) {
    case "Nuevo": return "bg-blue-500 text-white border-0";
    case "Oferta": return "bg-red-500 text-white border-0";
    case "Destacado": return "bg-amber-500 text-white border-0";
    case "Últimas unidades": return "bg-orange-500 text-white border-0";
    case "Más vendido": return "bg-green-600 text-white border-0";
    default: return "";
  }
}

// ── Animation variants ──
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.4, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.04 } },
};

// ── Category filter item type ──
interface CategoryFilter {
  key: string; // "all" or category._id
  label: string;
  icon: React.ElementType;
  slug?: string;
}

// ── Props ──
interface TiendaContentProps {
  products: SanityProduct[];
  categories?: SanityCategory[];
  source: "sanity" | "fallback";
  loading?: boolean;
}

export function TiendaContent({
  products,
  categories = [],
  source,
  loading = false,
}: TiendaContentProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<SanityProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(loading);

  // Simulate loading state for skeleton demo
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // ── Build category filter list ──
  const categoryFilters: CategoryFilter[] = useMemo(() => {
    // If we have dynamic categories from Sanity, use them
    if (categories.length > 0) {
      return [
        { key: "all", label: "Todos", icon: Package },
        ...categories.map((cat) => ({
          key: cat._id,
          label: cat.name,
          icon: getCategoryIcon(cat.icon),
          slug: cat.slug,
        })),
      ];
    }
    // Fallback: hardcoded categories from constants
    return [
      { key: "all", label: "Todos", icon: Package },
      { key: "computo", label: CATEGORY_LABELS.computo, icon: Monitor },
      { key: "telecomunicaciones", label: CATEGORY_LABELS.telecomunicaciones, icon: Wifi },
      { key: "equipos-medicos", label: CATEGORY_LABELS["equipos-medicos"], icon: HeartPulse },
      { key: "energia-solar", label: CATEGORY_LABELS["energia-solar"], icon: Sun },
    ];
  }, [categories]);

  // ── Category count ──
  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      const key = getCategoryId(p);
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [products]);

  // ── Filtered products ──
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      const productCategoryKey = getCategoryId(p);
      const matchesCategory =
        activeCategory === "all" || productCategoryKey === activeCategory;

      // Search filter
      const plainDesc = plainText(p.description).toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plainDesc.includes(searchQuery.toLowerCase()) ||
        (p.specs || []).some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, products]);

  // ── Open Modal ──
  const openModal = (product: SanityProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      {/* ── Header (oscuro) ── */}
      <section className="relative bg-gradient-to-br from-brand-dark via-brand-dark-light to-brand-dark pt-24 md:pt-28 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-brand-blue rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-brand-orange rounded-full blur-[150px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20 px-4 py-1.5 text-sm font-medium mb-5 backdrop-blur-sm">
              <Package className="w-3.5 h-3.5 mr-1.5" />
              Catálogo
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
              Nuestra <span className="text-brand-orange">Tienda</span>
            </h1>
            <p className="mt-4 text-white/60 max-w-xl mx-auto text-base md:text-lg">
              Explora nuestro catálogo completo. Todos los productos incluyen
              soporte técnico y garantía.
            </p>
            {source === "fallback" && (
              <p className="mt-3 text-xs text-white/30">
                Datos precargados — Conecta el CMS para gestión en tiempo real
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <SectionTransition variant="dark-to-light" height={120} />

      {/* ── Filters + Products ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + Filter toggle */}
          {isLoading ? (
            <SearchBarSkeleton />
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar productos por nombre, descripción o especificaciones..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-xl border-white/40 focus:border-brand-blue focus:ring-brand-blue/20 text-sm bg-white/70 backdrop-blur-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand-dark transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-5 border-border/60 rounded-xl text-sm font-semibold hover:bg-brand-blue/5 hover:border-brand-blue/30 transition-all duration-200 sm:hidden"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                {showFilters ? "Ocultar" : "Filtros"}
              </Button>
            </div>
          )}

          {/* Category pills */}
          {isLoading ? (
            <CategoryFilterSkeleton count={categoryFilters.length} />
          ) : (
            <>
              {/* Mobile: toggle */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8 overflow-hidden sm:hidden"
                  >
                    <LayoutGroup>
                      <div className="flex flex-wrap gap-2">
                        {categoryFilters.map((cat) => {
                          const isActive = activeCategory === cat.key;
                          const Icon = cat.icon;
                          return (
                            <motion.button
                              key={cat.key}
                              layout
                              onClick={() => setActiveCategory(cat.key)}
                              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                isActive
                                  ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/25"
                                  : "bg-white/70 backdrop-blur-md text-brand-dark border border-white/40 hover:border-brand-blue/30 hover:bg-white/80"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              {cat.label}
                              <span className="ml-1 text-xs opacity-70">
                                ({categoryCount[cat.key] || 0})
                              </span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </LayoutGroup>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop: always visible */}
              <LayoutGroup>
                <div className="hidden sm:flex flex-wrap gap-2 mb-8">
                  {categoryFilters.map((cat) => {
                    const isActive = activeCategory === cat.key;
                    const Icon = cat.icon;
                    return (
                      <motion.button
                        key={cat.key}
                        layout
                        onClick={() => setActiveCategory(cat.key)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/25"
                            : "bg-white text-brand-dark border border-border/60 hover:border-brand-blue/30 hover:bg-brand-blue/5"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {cat.label}
                        <span className="text-xs opacity-70">
                          ({categoryCount[cat.key] || 0})
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </>
          )}

          {/* Results count */}
          {!isLoading && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} producto
                {filteredProducts.length !== 1 && "s"} encontrado
                {filteredProducts.length !== 1 && "s"}
              </p>
              {(searchQuery || activeCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="text-sm font-semibold text-brand-blue hover:text-brand-dark transition-colors duration-200"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}

          {/* ── Product Grid ── */}
          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : filteredProducts.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, i) => {
                  const Icon = getCategoryIcon(getProductCategoryIcon(product));
                  const imageUrl = getProductImageUrl(product.image);
                  const allImages = [product.image, ...(product.gallery || [])].filter((img) => img && img.asset);

                  return (
                    <motion.div
                      key={product._id}
                      variants={fadeUp}
                      custom={i}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, layout: { duration: 0.3 } }}
                    >
                      <Card
                        className="group h-full border border-white/40 hover:border-brand-blue/30 shadow-sm hover:shadow-xl hover:shadow-brand-blue/15 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] bg-white/75 backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col cursor-pointer"
                        onClick={() => openModal(product)}
                      >
                        {/* Product image */}
                        {imageUrl ? (
                          <div className="relative w-full h-44 overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                            {/* Badge */}
                            {product.badge && (
                              <Badge className={`absolute top-3 left-3 text-[10px] font-bold shadow-lg ${getBadgeStyle(product.badge)}`}>
                                {product.badge}
                              </Badge>
                            )}

                            {/* Featured */}
                            {!product.badge && product.featured && (
                              <Badge className="absolute top-3 right-3 bg-brand-orange text-white border-0 text-[10px] font-bold shadow-lg">
                                ⭐ Destacado
                              </Badge>
                            )}

                            {/* Out of stock */}
                            {product.stock === 0 && (
                              <Badge className="absolute top-3 right-3 bg-red-500 text-white border-0 text-[10px] font-bold shadow-lg">
                                Agotado
                              </Badge>
                            )}

                            {/* Gallery indicator */}
                            {allImages.length > 1 && (
                              <div className="absolute bottom-3 right-3 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                                <svg className="w-3 h-3 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6M4 6l2-2h12l2 2" /></svg>
                                <span className="text-[10px] text-white/70 font-medium">{allImages.length}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="h-1.5 bg-[#1dbd6b] group-hover:bg-brand-orange transition-all duration-500" />
                        )}

                        <CardContent className="p-5 flex flex-col flex-1">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <Badge
                              className={`text-xs font-medium shrink-0 ${getCategoryColorClass(getProductCategoryColor(product))}`}
                            >
                              {getCategoryName(product)}
                            </Badge>
                          </div>

                          {/* Icon fallback */}
                          {!imageUrl && (
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 flex items-center justify-center mb-3 group-hover:bg-[#1dbd6b] transition-all duration-500">
                              <Icon className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors duration-500" />
                            </div>
                          )}

                          <h3 className="text-base font-bold text-brand-dark mb-2 line-clamp-2 min-h-[2.5rem]">
                            {product.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-4 line-clamp-2 flex-1">
                            {plainText(product.description)}
                          </p>

                          {/* Specs */}
                          {product.specs && product.specs.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {product.specs.slice(0, 3).map((spec, si) => (
                                <span
                                  key={si}
                                  className="text-[10px] bg-muted text-muted-foreground px-2 py-0.5 rounded-md font-medium"
                                >
                                  {spec}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Price + CTA */}
                          <div className="flex items-center justify-between pt-3 border-t border-border/50">
                            <span className="text-lg font-extrabold text-brand-blue">
                              {product.price}
                            </span>
                            {product.stock > 0 ? (
                              <a
                                href={getWhatsAppURL("producto", product.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white text-xs font-semibold shadow-md shadow-green-600/20 hover:shadow-green-600/40 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 mr-1" />
                                  Cotizar
                                </Button>
                              </a>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                disabled
                                className="text-xs font-semibold"
                              >
                                Agotado
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-brand-dark mb-2">
                No se encontraron productos
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Intenta con otros filtros o términos de búsqueda.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-sm font-semibold text-brand-blue hover:text-brand-dark transition-colors duration-200"
              >
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </section>

      <SectionTransition variant="light-to-dark" height={120} />

      {/* ── Product Modal ── */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
