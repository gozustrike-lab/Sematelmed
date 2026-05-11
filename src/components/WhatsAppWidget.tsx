"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

// ── Config ──
const COMPANY = "Sematelmed";
const PHONE = "51976983333";
const INITIAL_MESSAGE =
  "Hola Sematelmed, vengo de su web y tengo una consulta general.";
const BUBBLE_TEXT = "¡Hola! 👋 ¿Consultas sobre soporte técnico o equipos?";
const BUBBLE_DELAY_MS = 5000; // 5 segundos
const STORAGE_KEY = "fpp-wa-bubble-closed"; // persistencia por sesión

// ── Animation Variants ──

const pulseVariants = {
  idle: { scale: 1 },
  pulse: {
    scale: [1, 1.12, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const bubbleVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.92,
    x: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 22,
      stiffness: 260,
      delay: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.92,
    transition: { duration: 0.2 },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 260,
    },
  },
};

// ── Component ──

export function WhatsAppWidget() {
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleClosed, setBubbleClosed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check session storage on mount (client-only)
  useEffect(() => {
    try {
      const closed = sessionStorage.getItem(STORAGE_KEY);
      if (closed) {
        setBubbleClosed(true);
        return;
      }
    } catch {
      // sessionStorage may be blocked
    }

    // Show bubble after delay
    const timer = setTimeout(() => {
      setShowBubble(true);
    }, BUBBLE_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const closeBubble = useCallback(() => {
    setShowBubble(false);
    setBubbleClosed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors
    }
  }, []);

  const waURL = `https://wa.me/${PHONE}?text=${encodeURIComponent(INITIAL_MESSAGE)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex items-end gap-3">
      {/* ── Bubble Tooltip ── */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            variants={bubbleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative max-w-[260px]"
          >
            {/* Bubble content */}
            <div className="relative bg-white rounded-2xl rounded-br-sm shadow-xl shadow-black/10 border border-gray-100 px-4 py-3">
              <p className="text-sm text-gray-700 leading-snug font-medium">
                {BUBBLE_TEXT}
              </p>
              <button
                onClick={closeBubble}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-3 h-3 text-gray-500" />
              </button>
            </div>

            {/* Bubble arrow */}
            <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WhatsApp Button ── */}
      <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.a
          href={waURL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat por WhatsApp"
          animate={!isHovered && !showBubble ? "pulse" : "idle"}
          variants={pulseVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-green-600/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-green-600/40"
          style={{
            background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
          }}
        >
          {/* Ring glow effect */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-green-400" />

          <MessageCircle className="w-7 h-7 text-white relative z-10" fill="white" />
        </motion.a>
      </motion.div>
    </div>
  );
}
