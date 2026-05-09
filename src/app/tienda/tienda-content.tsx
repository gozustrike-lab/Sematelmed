"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SectionTransition } from "@/components/SectionTransition";
import {
  CATEGORY_LABELS,
  getWhatsAppURL,
  type ProductCategory,
} from "@/constants/data";
import {
  type SanityProduct,
  plainText,
  urlFor,
} from "@/lib/sanity.client";

// ── Icon mapper ──
const ICON_MAP: Record<string, React.ElementType> = {
  monitor: Monitor,
  wifi: Wifi,
  "heart-pulse": HeartPulse,
  sun: Sun,
};

function getCategoryIcon(category: string): React.ElementType {
  return ICON_MAP[
    category === "computo"
      ? "monitor"
      : category === "telecomunicaciones"
        ? "wifi"
        : category === "equipos-medicos"
          ? "heart-pulse"
          : "sun"
  ] || Package;
}

function getCategoryColor(category: string): string {
  switch (category) {
    case "computo":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "telecomunicaciones":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "equipos-medicos":
      return "bg-red-50 text-red-700 border-red-200";
    case "energia-solar":
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
}

// ── All categories + "Todos" ──
const ALL_CATEGORIES: {
  key: ProductCategory | "all";
  label: string;
  icon: React.ElementType;
}[] = [
  { key: "all", label: "Todos", icon: Package },
  { key: "computo", label: CATEGORY_LABELS.computo, icon: Monitor },
  {
    key: "telecomunicaciones",
    label: CATEGORY_LABELS.telecomunicaciones,
    icon: Wifi,
  },
  {
    key: "equipos-medicos",
    label: CATEGORY_LABELS["equipos-medicos"],
    icon: HeartPulse,
  },
  { key: "energia-solar", label: CATEGORY_LABELS["energia-solar"], icon: Sun },
];

// ── Animation variants ──
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } },
};

// ── Props ──
interface TiendaContentProps {
  products: SanityProduct[];
  source: "sanity" | "fallback";
}

export function TiendaContent({ products, source }: TiendaContentProps) {
  const [activeCategory, setActiveCategory] = useState<
    ProductCategory | "all"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // ── Conteo por categoría ──
  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // ── Productos filtrados (client-side) ──
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
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

  return (
    <>
      {/* ── Header (oscuro) ── */}
      <section className="relative bg-gradient-to-br from-brand-dark via-brand-dark-light to-brand-dark py-16 md:py-24 overflow-hidden">
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

      {/* Transición: Header (oscuro) → Products (claro) */}
      <SectionTransition variant="dark-to-light" height={120} />

      {/* ── Filters + Products ── */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search + Filter toggle */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-xl border-white/40 focus:border-brand-blue focus:ring-brand-blue/20 text-sm bg-white/70 backdrop-blur-md"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 px-5 border-border/60 rounded-xl text-sm font-semibold hover:bg-brand-blue/5 hover:border-brand-blue/30 transition-all duration-200"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {showFilters ? "Ocultar filtros" : "Mostrar filtros"}
            </Button>
          </div>

          {/* Category pills (mobile toggle) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 overflow-hidden"
              >
                <div className="flex flex-wrap gap-2">
                  {ALL_CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat.key;
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.key}
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
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Always show category pills on desktop */}
          <div className="hidden sm:flex flex-wrap gap-2 mb-8">
            {ALL_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/25"
                      : "bg-white text-brand-dark border border-border/60 hover:border-brand-blue/30 hover:bg-brand-blue/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Results count */}
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

          {/* ── Product Grid ── */}
          {filteredProducts.length > 0 ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, i) => {
                  const Icon = getCategoryIcon(product.category);
                  const imageUrl = product.image
                    ? urlFor(product.image)
                        .width(400)
                        .height(300)
                        .fit("crop")
                        .url()
                    : null;

                  return (
                    <motion.div
                      key={product._id}
                      variants={fadeUp}
                      custom={i}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="group h-full border border-white/40 hover:border-brand-blue/30 shadow-sm hover:shadow-xl hover:shadow-brand-blue/15 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02] bg-white/75 backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col">
                        {/* Product image (from Sanity) */}
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
                            {product.featured && (
                              <Badge className="absolute top-3 right-3 bg-brand-orange text-white border-0 text-[10px] font-bold shadow-lg">
                                ⭐ Destacado
                              </Badge>
                            )}
                            {product.stock === 0 && (
                              <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0 text-[10px] font-bold shadow-lg">
                                Agotado
                              </Badge>
                            )}
                          </div>
                        ) : (
                          /* Fallback: colored bar if no image */
                          <div className="h-1.5 bg-[#4726BF] group-hover:bg-brand-orange transition-all duration-500" />
                        )}

                        <CardContent className="p-5 flex flex-col flex-1">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <Badge
                              className={`text-xs font-medium shrink-0 ${getCategoryColor(product.category)}`}
                            >
                              {CATEGORY_LABELS[product.category] ||
                                product.category}
                            </Badge>
                          </div>

                          {/* Product icon (fallback when no image) */}
                          {!imageUrl && (
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 flex items-center justify-center mb-3 group-hover:bg-[#4726BF] transition-all duration-500">
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

      {/* Transición: Products (claro) → Footer (oscuro) */}
      <SectionTransition variant="light-to-dark" height={120} />
    </>
  );
}
