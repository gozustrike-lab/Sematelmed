import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import { draftMode } from "next/headers";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidBackground, WhatsAppWidget } from "@/components/LazyLayoutComponents";
import { SanityLive } from "@/sanity/live";
import { VisualEditing } from "@/components/VisualEditing";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sematelmed | Tecnología de Vanguardia",
  description:
    "Líderes en soluciones integrales de fibra óptica, mantenimiento médico y energía solar. Vanguardia y compromiso tecnológico al servicio de tu empresa en Ilo, Perú.",
  keywords: [
    "Sematelmed",
    "tecnología Ilo",
    "equipos médicos Ilo",
    "cómputo Perú",
    "telecomunicaciones Ilo",
    "fibra óptica",
    "energía solar Ilo",
    "Moquegua",
    "servicio técnico",
    "venta de laptops",
    "cámaras de seguridad",
    "paneles solares",
  ],
  authors: [{ name: "Sematelmed" }],
  creator: "Sematelmed",
  publisher: "Sematelmed",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
  },
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://sematelmed.com.pe"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sematelmed — Siempre a la vanguardia",
    description:
      "Expertos en telecomunicaciones, equipos médicos y soporte técnico especializado. ¡Cotiza con nosotros por WhatsApp!",
    siteName: "Sematelmed",
    images: [
      {
        url: "https://sematelmed.vercel.app/og-image-sematelmed.jpg",
        width: 1200,
        height: 630,
        alt: "Sematelmed - Soluciones Tecnológicas de Vanguardia",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sematelmed | Tecnología de Vanguardia",
    description:
      "Servicio técnico especializado y venta de equipos en Ilo, Moquegua. ¡Cotiza con nosotros!",
    images: ["https://sematelmed.vercel.app/og-image-sematelmed.jpg"],
  },
  other: {
    "theme-color": "#0AAB68",
    "msapplication-TileColor": "#0AAB68",
  },
};

// ── RootLayout (Server Component + async) ──
// draftMode() permite detectar si el Preview Mode está activo.
// Cuando está activo:
//   - SanityLive: revalidación en tiempo real via WebSocket
//   - VisualEditing: overlay de edición inline sobre la página
//
// REGLA FAST PAGE PRO:
// El crédito "Diseño y desarrollo web por Fast Page Pro" en el Footer
// es HARDCODED y NO tiene etiquetas de edición visual (stega).
// Es estático, intocable e inamovible por diseño.
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const draft = await draftMode();

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Open Graph fallback for clients that don't support meta tags */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased text-foreground min-h-screen flex flex-col`}
      >
        <FluidBackground />
        <Navbar />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <Footer />
        <Toaster />
        {/* SanityLive: revalidación en tiempo real (siempre activo) */}
        <SanityLive />
        {/* VisualEditing: overlay de edición inline (SOLO en Draft Mode) */}
        {draft.isEnabled && <VisualEditing />}
        {/* WhatsApp Widget: botón flotante independiente del CMS (Fast Page Pro) */}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
