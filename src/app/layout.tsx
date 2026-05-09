import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
  title: "Sematelmed — Tecnología y Equipos Médicos en Ilo, Perú",
  description:
    "Sematelmed: Soluciones integrales en cómputo, telecomunicaciones, equipos médicos y energía solar. Siempre a la vanguardia en Ilo, Perú.",
  keywords: [
    "Sematelmed",
    "tecnología Ilo",
    "equipos médicos Ilo",
    "cómputo Perú",
    "telecomunicaciones Ilo",
    "energía solar Ilo",
    "Moquegua",
  ],
  authors: [{ name: "Sematelmed" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Sematelmed — Siempre a la vanguardia",
    description:
      "Soluciones integrales en cómputo, telecomunicaciones, equipos médicos y energía solar en Ilo, Perú.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${montserrat.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
