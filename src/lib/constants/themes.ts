import { ColorTheme, FontFamily, FontSize, Spacing, TemplateId } from "../types/cv";

export type TemplateCategory = "classic" | "creative";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  tagline: string;
  bestFor: string;
  thumbnailBadge: string;
  category: TemplateCategory;
}

export const TEMPLATES_CONFIG: TemplateMeta[] = [
  {
    id: "classic",
    name: "Classic Elegance",
    tagline: "Conservative single-column layout with timeless typography",
    bestFor: "Banking, Law, Corporate, Senior Management",
    thumbnailBadge: "Corporate Standard",
    category: "classic",
  },
  {
    id: "modern",
    name: "Modern Professional",
    tagline: "Contemporary hierarchy with subtle accent borders & clean pill tags",
    bestFor: "Tech Startups, Marketing, Product, General Business",
    thumbnailBadge: "Most Popular",
    category: "classic",
  },
  {
    id: "technical",
    name: "Technical Engineer",
    tagline: "Optimized for software developers with skills matrix & repositories",
    bestFor: "Software Engineers, DevOps, Data Scientists, QA",
    thumbnailBadge: "Tech-Optimized",
    category: "classic",
  },
  {
    id: "graduate",
    name: "Graduate & Entry-Level",
    tagline: "Prioritizes education, academic projects, leadership & honors",
    bestFor: "Students, Fresh Graduates, Career Changers",
    thumbnailBadge: "Student First",
    category: "classic",
  },
  {
    id: "executive",
    name: "Executive Leadership",
    tagline: "Authoritative header with executive competencies matrix and quantified milestones",
    bestFor: "C-Suite, VP, Director, General Management, Senior Consultants",
    thumbnailBadge: "Executive",
    category: "classic",
  },
  {
    id: "minimal",
    name: "Swiss Minimalist",
    tagline: "Pure grid architecture with left-hand date alignment and stark precision",
    bestFor: "Product Designers, Architects, Strategists, Creative Directors",
    thumbnailBadge: "Design Craft",
    category: "classic",
  },
  {
    id: "compact",
    name: "Finance & Wall Street",
    tagline: "Ultra-dense single-page format (Harvard/Wharton style) with pipe delimiters",
    bestFor: "Investment Banking, Private Equity, Asset Management, Quant Finance",
    thumbnailBadge: "Maximum Density",
    category: "classic",
  },
  {
    id: "creative",
    name: "Creative Split Column",
    tagline: "Asymmetric 32/68 dual-column layout with tinted metadata sidebar",
    bestFor: "UI/UX Designers, Brand Strategists, Marketing Leads, Media",
    thumbnailBadge: "Dual Column",
    category: "creative",
  },
  {
    id: "nordic",
    name: "Nordic Editorial",
    tagline: "Scandinavian clarity with generous whitespace and academic refinement",
    bestFor: "Researchers, Academic Fellows, Writers, Luxury Goods Managers",
    thumbnailBadge: "Editorial",
    category: "classic",
  },
  {
    id: "startup",
    name: "Tech Startup & Product",
    tagline: "Modern Silicon Valley aesthetic with interactive project links and impact tags",
    bestFor: "Startup Founders, Product Managers, Fullstack Engineers, Growth",
    thumbnailBadge: "High Impact",
    category: "classic",
  },
  {
    id: "corporate",
    name: "Corporate Photo Executive",
    tagline: "Premium layout with dedicated executive headshot frame, dual-track contact bar & milestones",
    bestFor: "Multinational Corporations, Banking, Finance, Hospitality, ASEAN Regional Roles",
    thumbnailBadge: "Photo Optimized",
    category: "classic",
  },
  {
    id: "infographic",
    name: "Visual Infographic & Portfolio",
    tagline: "Modern split layout with circular avatar, visual skill proficiency meters & timeline badges",
    bestFor: "UI/UX Designers, Product Designers, Marketing Directors, Creative Strategists",
    thumbnailBadge: "Visual Story",
    category: "creative",
  },
  {
    id: "floral",
    name: "Botanical Bloom & Flora",
    tagline: "Delicate botanical branches, organic leaf divider accents, soft sage & blush tones",
    bestFor: "Florists, Event Planners, Wedding Specialists, Wellness, Beauty, Creative Arts",
    thumbnailBadge: "Floral Botanical",
    category: "creative",
  },
  {
    id: "boho",
    name: "Earthy Terracotta & Boho",
    tagline: "Warm sun-baked terracotta, organic arch header, eucalyptus elements & pebble frame",
    bestFor: "Interior Designers, Ceramists, Yoga Instructors, Sustainable Fashion, Photographers",
    thumbnailBadge: "Boho Organic",
    category: "creative",
  },
  {
    id: "artisan",
    name: "Luxury Atelier & Deco",
    tagline: "Fine gold/champagne hairline filigree, vintage diamond ornaments & high-luxury aesthetic",
    bestFor: "High-End Hospitality, Luxury Goods, Sommeliers, Architects, Antique Curators",
    thumbnailBadge: "Luxury Deco",
    category: "creative",
  },
  {
    id: "pastel",
    name: "Pastel Canvas & Aura",
    tagline: "Soft watercolor wash headers, playful lavender & peach pills with creative warmth",
    bestFor: "Elementary Educators, Content Creators, Lifestyle Influencers, Children's Authors",
    thumbnailBadge: "Pastel Aura",
    category: "creative",
  },
  {
    id: "ribbon",
    name: "Teal & Gold Wave Ribbon",
    tagline: "Fluid 3D gold wave ribbon divider, petrol teal header & solid gold capsule headers",
    bestFor: "Maritime, Corporate Operations, Financial Directors, Senior Managers",
    thumbnailBadge: "Gold Wave",
    category: "creative",
  },
  {
    id: "portal",
    name: "Monochrome Arched Portal",
    tagline: "Stunning arched dome photo portal with black circular badge icons & skill sliders",
    bestFor: "Graphic Designers, Web Developers, UI/UX, Creative Leads",
    thumbnailBadge: "Arched Portal",
    category: "creative",
  },
  {
    id: "midnight",
    name: "Midnight Arch Graduate",
    tagline: "Midnight black dome header, 5-star skill ratings & radiant gold gradient banners",
    bestFor: "Fresh Graduates, Technology Specialists, Media Creators, Analysts",
    thumbnailBadge: "Midnight Arch",
    category: "creative",
  },
  {
    id: "colorblock",
    name: "Saffron & Navy Color-Block",
    tagline: "Assertive saffron yellow & navy geometric split with overlapping portrait card",
    bestFor: "Data Analytics, Enterprise Technology, Business Intelligence, Strategists",
    thumbnailBadge: "Color-Block",
    category: "creative",
  },
  {
    id: "axis",
    name: "Charcoal & Yellow Timeline",
    tagline: "Dynamic yellow diagonal cuts, arched photo window & continuous vertical node axis",
    bestFor: "Graphic Designers, Web Developers, Creative Technologists, Product Leads",
    thumbnailBadge: "Timeline Axis",
    category: "creative",
  },
  {
    id: "ocean",
    name: "Ocean Teal & Polygon Cutout",
    tagline: "Mediterranean plaster texture, floating polygon frame & subtle micro-dot watermark",
    bestFor: "Architects, Brand Designers, Creative Strategists, Copywriters",
    thumbnailBadge: "Ocean Texture",
    category: "creative",
  },
  {
    id: "diamond",
    name: "Obsidian & Gold Diamond",
    tagline: "Striking 45° gold diamond rhombus avatar with a continuous golden milestone rail",
    bestFor: "Branding Directors, Media Specialists, Advertising Executives, Luxury Consultants",
    thumbnailBadge: "Diamond Rhombus",
    category: "creative",
  },
  {
    id: "horizon",
    name: "Slate Horizon & Trailing Rules",
    tagline: "Steel slate header, top-right overlapping avatar & trailing divider rule lines",
    bestFor: "Corporate Administration, Tech Associates, Operations, Graduate Professionals",
    thumbnailBadge: "Slate Horizon",
    category: "creative",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Neon HUD",
    tagline: "Deep midnight HUD with electric cyan circuit lines, telemetry status bar & prompt brackets",
    bestFor: "Cybersecurity, AI Engineers, Game Developers, Web3 Technologists",
    thumbnailBadge: "Cyber HUD",
    category: "creative",
  },
  {
    id: "editorial",
    name: "Vogue Editorial Masthead",
    tagline: "Haute couture editorial typography, dramatic serif drop caps & double hairline rules",
    bestFor: "Fashion Directors, Creative Writers, Luxury Brand Managers, Art Curators",
    thumbnailBadge: "Vogue Haute",
    category: "creative",
  },
  {
    id: "zen",
    name: "Japanese Zen & Wabi-Sabi",
    tagline: "Serene rice-paper ivory canvas, vermilion Hanko seal stamp & organic pebble framing",
    bestFor: "Architects, Minimalist Designers, Craftspeople, Interior Curators",
    thumbnailBadge: "Zen Hanko",
    category: "creative",
  },
  {
    id: "bento",
    name: "Modern Apple Bento Grid",
    tagline: "Apple-grade Bento box modular pods with highlight metrics, badge chips & card hierarchy",
    bestFor: "Product Leads, UI/UX Designers, Full-Stack Engineers, Tech Founders",
    thumbnailBadge: "Bento Grid",
    category: "creative",
  },
  {
    id: "oxford",
    name: "Oxford Scholarly Jurist",
    tagline: "Double classical engraved rules, Roman numeral sections & traditional jurisprudential small-caps",
    bestFor: "Legal Counsel, Judiciary, Senior Faculty, Diplomats, Policy Fellows",
    thumbnailBadge: "Oxford Brief",
    category: "classic",
  },
  {
    id: "bauhaus",
    name: "Bauhaus Modernist 1925",
    tagline: "Walter Gropius German modernism with primary red/blue/yellow accents & stark geometry",
    bestFor: "Graphic Designers, Art Directors, Industrial Designers, Architects",
    thumbnailBadge: "Bauhaus Grid",
    category: "creative",
  },
  {
    id: "camtech",
    name: "CamTech Navy & Gold Badge",
    tagline: "Slate navy sidebar with golden pill badges, academic project showcase & horizontal trailing section rules",
    bestFor: "Software Engineers, CamTech University Students, Full-Stack Developers",
    thumbnailBadge: "CamTech Navy",
    category: "creative",
  },
];

export const COLOR_THEMES: Record<
  ColorTheme,
  {
    name: string;
    primary: string;
    primaryLight: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    hex: string;
  }
> = {
  navy: {
    name: "Executive Navy",
    primary: "#1e3a8a",
    primaryLight: "#eff6ff",
    border: "#93c5fd",
    badgeBg: "#dbeafe",
    badgeText: "#1e40af",
    hex: "#1e3a8a",
  },
  slate: {
    name: "Slate Charcoal",
    primary: "#334155",
    primaryLight: "#f8fafc",
    border: "#cbd5e1",
    badgeBg: "#f1f5f9",
    badgeText: "#1e293b",
    hex: "#334155",
  },
  emerald: {
    name: "Emerald Green",
    primary: "#065f46",
    primaryLight: "#ecfdf5",
    border: "#a7f3d0",
    badgeBg: "#d1fae5",
    badgeText: "#065f46",
    hex: "#065f46",
  },
  indigo: {
    name: "Vibrant Indigo",
    primary: "#4338ca",
    primaryLight: "#eef2ff",
    border: "#c7d2fe",
    badgeBg: "#e0e7ff",
    badgeText: "#3730a3",
    hex: "#4338ca",
  },
  burgundy: {
    name: "Royal Burgundy",
    primary: "#881337",
    primaryLight: "#fff1f2",
    border: "#fecdd3",
    badgeBg: "#ffe4e6",
    badgeText: "#9f1239",
    hex: "#881337",
  },
  monochrome: {
    name: "Modern Monochrome",
    primary: "#18181b",
    primaryLight: "#f4f4f5",
    border: "#e4e4e7",
    badgeBg: "#f4f4f5",
    badgeText: "#27272a",
    hex: "#18181b",
  },
  rose: {
    name: "Blush Rose Quartz",
    primary: "#be185d",
    primaryLight: "#fdf2f8",
    border: "#fbcfe8",
    badgeBg: "#fce7f3",
    badgeText: "#9d174d",
    hex: "#be185d",
  },
  sage: {
    name: "Botanical Sage & Olive",
    primary: "#3f6212",
    primaryLight: "#f7fee7",
    border: "#d9f99d",
    badgeBg: "#ecfccb",
    badgeText: "#365314",
    hex: "#3f6212",
  },
  terracotta: {
    name: "Warm Terracotta Earth",
    primary: "#c2410c",
    primaryLight: "#fff7ed",
    border: "#fed7aa",
    badgeBg: "#ffedd5",
    badgeText: "#9a3412",
    hex: "#c2410c",
  },
  amber: {
    name: "Artisan Gold & Honey",
    primary: "#b45309",
    primaryLight: "#fffbeb",
    border: "#fde68a",
    badgeBg: "#fef3c7",
    badgeText: "#92400e",
    hex: "#b45309",
  },
};

export const FONT_CONFIG: Record<
  FontFamily,
  {
    name: string;
    fontFamilyClass: string;
    description: string;
  }
> = {
  sans: {
    name: "Modern Sans (Inter)",
    fontFamilyClass: "font-sans",
    description: "Ultra-legible, crisp on screens and high-DPI prints",
  },
  serif: {
    name: "Editorial Serif (Georgia)",
    fontFamilyClass: "font-serif",
    description: "Classic, academic, and authoritative print feel",
  },
  khmer: {
    name: "Khmer + Latin Bilingual (Kantumruy)",
    fontFamilyClass: "font-khmer",
    description: "Specially tuned for Khmer Unicode and English typography",
  },
};

export const FONT_SIZE_CONFIG: Record<FontSize, { body: string; h1: string; h2: string; meta: string }> = {
  compact: {
    body: "text-[12.5px] leading-relaxed",
    h1: "text-2xl font-bold",
    h2: "text-sm font-bold uppercase tracking-wider",
    meta: "text-[11px]",
  },
  normal: {
    body: "text-[13.5px] leading-relaxed",
    h1: "text-3xl font-bold",
    h2: "text-base font-bold uppercase tracking-wider",
    meta: "text-xs",
  },
  relaxed: {
    body: "text-[14.5px] leading-loose",
    h1: "text-4xl font-bold",
    h2: "text-lg font-bold uppercase tracking-wider",
    meta: "text-sm",
  },
};

export const SPACING_CONFIG: Record<Spacing, { sectionGap: string; itemGap: string; pagePadding: string }> = {
  compact: {
    sectionGap: "space-y-3",
    itemGap: "space-y-1.5",
    pagePadding: "p-6 sm:p-8",
  },
  normal: {
    sectionGap: "space-y-5",
    itemGap: "space-y-3",
    pagePadding: "p-8 sm:p-12",
  },
  spacious: {
    sectionGap: "space-y-7",
    itemGap: "space-y-4",
    pagePadding: "p-10 sm:p-14",
  },
};
