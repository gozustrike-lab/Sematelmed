"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ZoomIn,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  type SanityProduct,
  plainText,
  urlFor,
  getCategoryName,
  getCategoryColorClass,
} from "@/lib/sanity.client";
import { getWhatsAppURL } from "@/constants/data";

// ── Props ──
interface ProductModalProps {
  product: SanityProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

// ── Animation variants ──
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 28, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 30,
    transition: { duration: 0.2 },
  },
};

// ── Badge color map ──
function getBadgeStyle(badge: string): string {
  switch (badge) {
    case "Nuevo": return "bg-blue-500 text-white";
    case "Oferta": return "bg-red-500 text-white";
    case "Destacado": return "bg-amber-500 text-white";
    case "Últimas unidades": return "bg-orange-500 text-white";
    case "Más vendido": return "bg-green-600 text-white";
    default: return "bg-gray-500 text-white";
  }
}

// ── Zoomable Image Component ──
function ZoomableImage({
  src,
  alt,
  fill,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  }, []);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden cursor-zoom-in transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"} ${className || ""}`}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

// ── Main Modal Component ──
export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Build all images: main image first, then gallery
  const allImages = product
    ? [
        product.image,
        ...(product.gallery || []),
      ].filter(Boolean) as Array<NonNullable<SanityProduct["image"]>>
    : [];

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  }, [allImages.length]);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  }, [allImages.length]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    },
    [onClose, goToPrev, goToNext],
  );

  // Reset slide when product changes
  useState(() => {
    setCurrentSlide(0);
  });

  if (!product) return null;

  const imageUrl = product.image
    ? urlFor(product.image).width(800).height(600).fit("crop").url()
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop (glassmorphism blur) ── */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-xl"
            onClick={onClose}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          />

          {/* ── Modal Container ── */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/20 border border-white/50 overflow-hidden pointer-events-auto flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Close Button ── */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              {/* ── Left: Image Carousel ── */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-gray-900/5 flex-shrink-0">
                {allImages.length > 0 ? (
                  <>
                    {/* Main image with zoom */}
                    <div className="relative w-full h-full min-h-[300px] md:min-h-[500px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSlide}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="absolute inset-0"
                        >
                          <ZoomableImage
                            src={
                              urlFor(allImages[currentSlide])
                                .width(800)
                                .height(600)
                                .fit("crop")
                                .url()
                            }
                            alt={
                              allImages[currentSlide].caption ||
                              product.name
                            }
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="w-full h-full"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Zoom hint */}
                      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
                        <ZoomIn className="w-3.5 h-3.5 text-white/70" />
                        <span className="text-[10px] text-white/70 font-medium">
                          Zoom
                        </span>
                      </div>

                      {/* Navigation arrows */}
                      {allImages.length > 1 && (
                        <>
                          <button
                            onClick={goToPrev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                            aria-label="Foto anterior"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={goToNext}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                            aria-label="Foto siguiente"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail strip */}
                    {allImages.length > 1 && (
                      <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
                        {allImages.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${
                              idx === currentSlide
                                ? "bg-white w-5"
                                : "bg-white/40 hover:bg-white/60"
                            }`}
                            aria-label={`Ir a foto ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* No image fallback */
                  <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-orange/10">
                    <Package className="w-16 h-16 text-brand-blue/20" />
                  </div>
                )}
              </div>

              {/* ── Right: Product Info ── */}
              <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
                {/* Category + Badge */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <Badge
                    className={`text-xs font-medium ${getCategoryColorClass(product.category?.color)}`}
                  >
                    {getCategoryName(product)}
                  </Badge>
                  {product.badge && (
                    <Badge className={`text-xs font-bold ${getBadgeStyle(product.badge)}`}>
                      {product.badge}
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <Badge className="bg-red-500 text-white text-xs font-bold">
                      Agotado
                    </Badge>
                  )}
                </div>

                {/* Name */}
                <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-3 leading-tight">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-3xl font-extrabold text-brand-blue">
                    {product.price}
                  </span>
                  {product.stock > 0 && (
                    <span className="text-sm text-green-600 font-semibold">
                      En stock
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Descripción
                  </h4>
                  <p className="text-sm text-brand-dark/80 leading-relaxed">
                    {plainText(product.description)}
                  </p>
                </div>

                {/* Specs */}
                {product.specs && product.specs.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Especificaciones
                    </h4>
                    <div className="grid grid-cols-1 gap-1.5">
                      {product.specs.map((spec, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-brand-dark/70"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-border/30">
                  {product.stock > 0 ? (
                    <a
                      href={getWhatsAppURL("producto", product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold shadow-lg shadow-green-600/25 transition-all duration-300 hover:-translate-y-0.5 h-12 gap-2">
                        <MessageCircle className="w-5 h-5" />
                        Cotizar por WhatsApp
                      </Button>
                    </a>
                  ) : (
                    <Button
                      variant="outline"
                      disabled
                      className="w-full h-12 font-semibold"
                    >
                      Producto agotado
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
