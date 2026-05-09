// ============================================================
// SEMATELMED — Datos centralizados (futuro CMS ready)
// Empresa de tecnología y equipos médicos — Ilo, Perú
// ============================================================

export const COMPANY = {
  name: "Sematelmed",
  slogan: "Siempre a la vanguardia",
  tagline: "Tecnología y equipos médicos que se adaptan a tu necesidad",
  address: "Mercado de Ciudad Nueva Tienda N°12 – ILO",
  phone: "+51 954 123 456",
  email: "contacto@sematelmed.com",
  whatsapp: "51954123456",
  website: "www.sematelmed.com",
  // Año de fundación
  since: 2010,
  description:
    "Somos una empresa ilocana dedicada a brindar soluciones integrales en computo, telecomunicaciones, equipos médicos y energía solar. Nuestro compromiso es llevar tecnología de vanguardia a cada hogar, consultorio y empresa del sur del Perú.",
} as const;

// ----------------------------------------------------------
// Misión y Visión
// ----------------------------------------------------------
export const MISSION =
  "Proveer soluciones tecnológicas y equipos médicos de la más alta calidad, adaptándonos a las necesidades de cada cliente en Ilo y el sur del Perú. Buscamos ser el aliado estratégico que impulse la transformación digital y la salud en la región, con servicio personalizado, precios competitivos y soporte técnico confiable.";

export const VISION =
  "Ser la empresa líder en tecnología y equipamiento médico en el sur del Perú, reconocida por nuestra capacidad de adaptación, innovación constante y compromiso con la excelencia. Visualizamos un futuro donde cada familia, profesional y empresa cuente con las herramientas adecuadas para alcanzar su máximo potencial.";

// ----------------------------------------------------------
// Valores Corporativos
// ----------------------------------------------------------
export const VALUES = [
  {
    id: "adaptabilidad",
    title: "Adaptabilidad",
    icon: "chameleon",
    description:
      "Como el camaleón, nos ajustamos a las necesidades cambiantes del mercado y de cada cliente, ofreciendo soluciones flexibles y personalizadas que se integran de forma natural en su entorno.",
  },
  {
    id: "innovacion",
    title: "Innovación",
    icon: "lightbulb",
    description:
      "Mantenernos siempre a la vanguardia tecnológica, investigando y seleccionando los mejores productos y servicios del mercado global para ofrecerlos a nuestra comunidad local.",
  },
  {
    id: "compromiso",
    title: "Compromiso",
    icon: "handshake",
    description:
      "Cada relación con nuestros clientes es un compromiso a largo plazo. Desde la asesoría inicial hasta el soporte post-venta, estamos presentes en cada paso.",
  },
  {
    id: "confianza",
    title: "Confianza",
    icon: "shield",
    description:
      "Más de una década de trabajo continuo nos respalda. Nuestros clientes confían en nosotros por nuestra transparencia, honestidad y la calidad garantizada de cada producto.",
  },
] as const;

// ----------------------------------------------------------
// Servicios principales
// ----------------------------------------------------------
export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  icon: string;
  features: string[];
}

export const SERVICES: Service[] = [
  {
    id: "computo",
    title: "Cóputo",
    shortDescription:
      "Equipos de escritorio, laptops, servidores y accesorios para hogares y empresas.",
    icon: "monitor",
    features: [
      "Laptops y notebooks",
      "PCs de escritorio y workstations",
      "Servidores y almacenamiento",
      "Impresoras y periféricos",
      "Repuestos y mantenimiento",
    ],
  },
  {
    id: "telecomunicaciones",
    title: "Telecomunicaciones",
    shortDescription:
      "Soluciones de conectividad, redes y comunicación para todo tipo de espacios.",
    icon: "wifi",
    features: [
      "Redes Wi-Fi empresariales",
      "Cableado estructurado",
      "Cámaras de seguridad",
      "Equipos de radio comunicación",
      "Fibra óptica y switches",
    ],
  },
  {
    id: "equipos-medicos",
    title: "Equipos Médicos",
    shortDescription:
      "Instrumental y equipos de diagnóstico para clínicas, consultorios y hospitales.",
    icon: "heart-pulse",
    features: [
      "Equipos de diagnóstico",
      "Instrumental quirúrgico",
      "Monitorización de signos vitales",
      "Mobiliario clínico",
      "Insumos médicos desechables",
    ],
  },
  {
    id: "energia-solar",
    title: "Energía Solar",
    shortDescription:
      "Paneles, inversores y sistemas fotovoltaicos para aprovechar la energía del sol.",
    icon: "sun",
    features: [
      "Paneles solares monocristalinos",
      "Inversores y controladores",
      "Baterías de almacenamiento",
      "Instalación y configuración",
      "Sistemas de bombeo solar",
    ],
  },
];

// ----------------------------------------------------------
// Productos (Catálogo)
// ----------------------------------------------------------
export type ProductCategory = "computo" | "telecomunicaciones" | "equipos-medicos" | "energia-solar";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: string; // Mostrado como "Cotizar" o rango estimado
  description: string;
  specs: string[];
  featured: boolean;
}

export const PRODUCTS: Product[] = [
  // --- Cómputo ---
  {
    id: "laptop-hp-15",
    name: "Laptop HP 15.6\" Ryzen 5",
    category: "computo",
    price: "Desde S/ 2,499",
    description:
      "Ideal para trabajo y estudio. Procesador AMD Ryzen 5, 8 GB de RAM, SSD de 256 GB. Pantalla Full HD antirreflejo para cómoda lectura.",
    specs: ["AMD Ryzen 5 5500U", "8 GB RAM DDR4", "256 GB SSD NVMe", "15.6\" FHD IPS"],
    featured: true,
  },
  {
    id: "pc-gamer-i5",
    name: "PC Gamer Intel Core i5",
    category: "computo",
    price: "Desde S/ 3,299",
    description:
      "Equipo de alto rendimiento para gaming y diseño gráfico. Tarjeta gráfica dedicada, refrigeración avanzada y gabinete RGB.",
    specs: ["Intel Core i5-12400F", "16 GB RAM DDR4", "512 GB SSD + 1 TB HDD", "NVIDIA GTX 1660 Super"],
    featured: true,
  },
  {
    id: "monitor-samsung-24",
    name: 'Monitor Samsung 24" FHD',
    category: "computo",
    price: "Desde S/ 799",
    description:
      "Monitor LED Full HD con tecnología AMD FreeSync, perfecto para productividad y entretenimiento.",
    specs: ['24" IPS FHD 1080p', "75 Hz FreeSync", "HDMI + VGA", "Eye Saver Mode"],
    featured: false,
  },
  {
    id: "impresora-hp-laser",
    name: "Impresora HP LaserJet Pro",
    category: "computo",
    price: "Desde S/ 1,199",
    description:
      "Impresora láser monocromática de alta velocidad y bajo costo de operación por página.",
    specs: ["Impresión láser monocromática", "22 ppm", "Wi-Fi y USB", "250 hojas de bandeja"],
    featured: false,
  },
  // --- Telecomunicaciones ---
  {
    id: "router-tp-link",
    name: "Router TP-Link AX1500",
    category: "telecomunicaciones",
    price: "Desde S/ 299",
    description:
      "Router Wi-Fi 6 de doble banda con cobertura superior y velocidades de hasta 1500 Mbps para hogares y oficinas.",
    specs: ["Wi-Fi 6 AX1500", "Doble banda 2.4/5 GHz", "4 antenas de alta ganancia", "Puerto Gigabit Ethernet"],
    featured: true,
  },
  {
    id: "camara-dahua-4mp",
    name: "Cámara Dahua 4MP Bullet",
    category: "telecomunicaciones",
    price: "Desde S/ 189",
    description:
      "Cámara de seguridad tipo bullet con resolución 4MP, visión nocturna hasta 30 metros y resistencia IP67.",
    specs: ["4MP 2560x1440", "Vision nocturna IR 30m", "IP67 weatherproof", "PoE + DC 12V"],
    featured: false,
  },
  {
    id: "switch-cisco-24",
    name: "Switch Cisco 24 Puertos",
    category: "telecomunicaciones",
    price: "Desde S/ 899",
    description:
      "Switch gestionable de 24 puertos Gigabit Ethernet para infraestructuras de red empresariales.",
    specs: ["24 puertos Gigabit", "Gestionable Layer 2", "Rack mount 19\"", "480 Gbps de capacidad"],
    featured: false,
  },
  {
    id: "kit-cableado-100m",
    name: "Kit de Cableado Estructurado 100m",
    category: "telecomunicaciones",
    price: "Desde S/ 450",
    description:
      "Kit completo que incluye cable UTP Cat 6, conectores RJ45, canaletas y patch panel para 10 puntos de red.",
    specs: ["100m cable UTP Cat 6", "20 conectores RJ45", "Patch panel 12 puertos", "Canaletas PVC incluidas"],
    featured: false,
  },
  // --- Equipos Médicos ---
  {
    id: "tensimetro-digital",
    name: "Tensiómetro Digital de Brazo",
    category: "equipos-medicos",
    price: "Desde S/ 159",
    description:
      "Tensiómetro automático con pantalla LCD grande, memoria para 120 lecturas y manguito universal ajustable.",
    specs: ["Rango: 0-299 mmHg", "Pantalla LCD retroiluminada", "Memoria 2x60 lecturas", "Indicador de arritmia"],
    featured: true,
  },
  {
    id: "oximetro-pulso",
    name: "Oxímetro de Pulso YK-80C",
    category: "equipos-medicos",
    price: "Desde S/ 89",
    description:
      "Oxímetro de pulso tipo pinza para medición rápida y precisa de SpO2 y frecuencia cardíaca.",
    specs: ["SpO2: 70-99%", "Pulso: 30-250 bpm", "Pantalla OLED dual", "Pilas AAA incluidas"],
    featured: false,
  },
  {
    id: "estetoscopio-dual",
    name: "Estetoscopio Dual Profesional",
    category: "equipos-medicos",
    price: "Desde S/ 120",
    description:
      "Estetoscopio profesional de doble campana para auscultación de adultos y pediátricos. Acabado en acero inoxidable.",
    specs: ["Doble campana adulto/pediátrico", "Tubo de acero inoxidable", "Auriculares suaves", "Ligero y duradero"],
    featured: false,
  },
  {
    id: "glucometro-completo",
    name: "Glucometro Completo + 50 Tiras",
    category: "equipos-medicos",
    price: "Desde S/ 199",
    description:
      "Kit completo de glucosa en sangre con glucometro digital, 50 tiras reactivas, lancetas y dispositivo de punción.",
    specs: ["50 tiras reactivas incluidas", "Resultado en 5 segundos", "Memoria 200 lecturas", "Función de promedio"],
    featured: true,
  },
  // --- Energía Solar ---
  {
    id: "panel-solar-550w",
    name: "Panel Solar Monocristalino 550W",
    category: "energia-solar",
    price: "Desde S/ 1,099",
    description:
      "Panel solar de alta eficiencia con células monocristalinas PERC, ideal para instalaciones residenciales y comerciales.",
    specs: ["550W potencia pico", "Monocristalino PERC", "Eficiencia >21%", "12 años de garantía"],
    featured: true,
  },
  {
    id: "inversor-hibrido-3000w",
    name: "Inversor Hibrido 3000W",
    category: "energia-solar",
    price: "Desde S/ 1,899",
    description:
      "Inversor hibrido con cargador MPPT integrado, capaz de gestionar energía solar y red eléctrica de forma inteligente.",
    specs: ["3000W / 6000W pico", "MPPT 48V integrado", "Con display LCD", "Batería 48V compatible"],
    featured: false,
  },
  {
    id: "bateria-litio-48v",
    name: "Batería de Litio 48V 50Ah",
    category: "energia-solar",
    price: "Desde S/ 2,499",
    description:
      "Batería de fosfato de litio (LiFePO4) de larga duración con sistema BMS integrado para máxima seguridad.",
    specs: ["LiFePO4 48V 50Ah", ">6000 ciclos de vida", "BMS integrado", "Peso: 18 kg"],
    featured: false,
  },
  {
    id: "kit-solar-basico",
    name: "Kit Solar Básico 500W",
    category: "energia-solar",
    price: "Desde S/ 2,199",
    description:
      "Kit completo para iniciarse en la energía solar. Incluye panel, controlador, batería y todos los cables de conexión.",
    specs: ["1 panel 500W", "Controlador PWM 30A", "Batería 12V 100Ah", "Cables y conectores incluidos"],
    featured: true,
  },
];

// ----------------------------------------------------------
// Historia / Compromiso
// ----------------------------------------------------------
export const HISTORY = [
  {
    year: "2010",
    title: "Nuestro Inicio",
    text: "Sematelmed nació en Ilo con la visión de llevar tecnología de calidad al sur del Perú. Lo que comenzó como un pequeño local en el mercado de Ciudad Nueva pronto se convirtió en un referente de confianza para la comunidad.",
  },
  {
    year: "2014",
    title: "Expansión de Servicios",
    text: "Incorporamos el rubro de equipos médicos, respondiendo a la necesidad de los centros de salud de la región. Ampliamos nuestro catálogo y comenzamos a ofrecer soporte técnico especializado.",
  },
  {
    year: "2018",
    title: "Energía Solar",
    text: "Ante la demanda creciente de fuentes de energía limpia, lanzamos nuestra línea de energía solar. Hoy instalamos sistemas fotovoltaicos en hogares, empresas e instituciones educativas.",
  },
  {
    year: "2023",
    title: "Consolidación Regional",
    text: "Con más de una década de trayectoria, nos consolidamos como la empresa líder del sur del Perú en tecnología y equipamiento médico, manteniendo siempre nuestro compromiso con la comunidad ilocana.",
  },
];

// ----------------------------------------------------------
// Etiquetas de categoría
// ----------------------------------------------------------
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  computo: "Cómputo",
  telecomunicaciones: "Telecomunicaciones",
  "equipos-medicos": "Equipos Médicos",
  "energia-solar": "Energía Solar",
};

// ----------------------------------------------------------
// Redes sociales
// ----------------------------------------------------------
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/sematelmed",
  tiktok: "https://tiktok.com/@sematelmed",
  whatsapp: `https://wa.me/${COMPANY.whatsapp}`,
} as const;
