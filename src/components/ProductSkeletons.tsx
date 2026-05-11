"use client";

import { motion } from "framer-motion";

// ── Skeleton Card ──
export function ProductCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rounded-2xl overflow-hidden border border-white/40 bg-white/75 backdrop-blur-xl flex flex-col"
    >
      {/* Image skeleton */}
      <div className="w-full h-44 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />

      {/* Content skeleton */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Badge skeleton */}
        <div className="w-20 h-5 rounded-md bg-gray-200 animate-pulse" />

        {/* Title skeleton */}
        <div className="w-full h-5 rounded-md bg-gray-200 animate-pulse" />
        <div className="w-3/4 h-5 rounded-md bg-gray-200 animate-pulse" />

        {/* Description skeleton */}
        <div className="w-full h-3 rounded bg-gray-100 animate-pulse" />
        <div className="w-2/3 h-3 rounded bg-gray-100 animate-pulse" />

        {/* Specs skeleton */}
        <div className="flex gap-1.5 mt-1">
          <div className="w-16 h-5 rounded-md bg-gray-100 animate-pulse" />
          <div className="w-14 h-5 rounded-md bg-gray-100 animate-pulse" />
          <div className="w-18 h-5 rounded-md bg-gray-100 animate-pulse" />
        </div>

        {/* Price + Button skeleton */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100">
          <div className="w-24 h-7 rounded-lg bg-gray-200 animate-pulse" />
          <div className="w-20 h-9 rounded-lg bg-gray-200 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}

// ── Skeleton Grid (multiple cards) ──
export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ── Category Filter Skeleton ──
export function CategoryFilterSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 animate-pulse h-10"
          style={{ width: i === 0 ? 100 : 140 }}
        >
          <div className="w-4 h-4 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

// ── Search Bar Skeleton ──
export function SearchBarSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1 h-12 rounded-xl bg-gray-100 animate-pulse" />
      <div className="h-12 w-40 rounded-xl bg-gray-100 animate-pulse" />
    </div>
  );
}
