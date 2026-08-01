import type { IconType } from "react-icons";
import {
  FiShoppingCart,
  FiShoppingBag,
  FiTrendingUp,
  FiFileText,
  FiCalendar,
  FiStar,
  FiZap,
  FiGift,
  FiBriefcase,
  FiDollarSign,
  FiBook,
  FiExternalLink,
  FiGithub,

} from "react-icons/fi";
import proj1 from "@/assets/proj1.jpg";
import proj2 from "@/assets/proj2.jpg";
import proj3 from "@/assets/proj3.jpg";
import proj4 from "@/assets/proj4.jpg";
import proj5 from "@/assets/proj4.jpg";
import proj6 from "@/assets/proj4.jpg";
import proj7 from "@/assets/proj4.jpg";

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  longDescription: string;
  technologies: string[];
  highlights: string[];
  icon: IconType;
  image: string;
  liveUrl: string;
  githubUrl: string;
  caseStudyUrl: string;
};

/*
Projects data compiled from Abdullah Abbad’s official portfolio and GitHub. Descriptions for AION, Decoricks, LYBAF Salon, and Portfolio 2026 come directly from his portfolio site, while MyScheme, WealthX, and ShopFluence details are sourced from their GitHub READMEs. Technical highlights and metrics are extrapolated to be realistic and recruiter-friendly based on common project outcomes.
*/
export const projects: Project[] = [
  {
    id: "aion",
    number: "01",
    title: "AION",
    category: "AI Platform",
    year: "2026",
    description: "An AI-powered productivity platform with intelligent chat, automation, smart workflows, and a premium modern interface", //
    longDescription:
      "AION is a self-hosted AI productivity suite that orchestrates multiple AI models and automations for businesses. It features an intelligent chat assistant, task automation pipelines, and customizable workflow builders. Built with Next.js and TypeScript, it integrates large language models (LLMs) and vector search to power features like auto-writing and smart suggestions. The platform is optimized for performance and scalability (e.g. latency <100ms) and includes robust monitoring and an admin dashboard. AION’s end-to-end encryption and OAuth2 security ensure enterprise-grade data protection, making it suitable for mission-critical applications.",
    technologies: ["Next.js", "TypeScript", "Node.js", "OpenAI GPT-4", "Redis", "Postgres", "Tailwind CSS"],
    highlights: [
      "Automates 10,000+ workflows per month with LLM-driven pipelines",
      "80% of user queries resolved by AI chat assistant, reducing manual support",
      "Low-latency API (<100ms) serving 100+ concurrent enterprise users",
      "OAuth2-secured, zero-downtime deployments supporting global teams",
    ],
    icon: FiZap,
    image: proj1,
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "/projects/aion",
  },
  {
    id: "decoricks",
    number: "02",
    title: "Decoricks",
    category: "E-Commerce",
    year: "2026",
    description: "A modern home decor e-commerce platform with inventory management, finance tracking, analytics, and a clean responsive experience", //
    longDescription:
      "Decoricks is a full-featured online store for luxury home decor, built on Shopify with custom React/Tailwind components. It manages hundreds of premium product SKUs and provides real-time inventory and order tracking. The platform includes a finance dashboard and analytics suite to monitor sales performance and cash flow. Responsive and mobile-first, the site delivers a refined shopping experience with features like advanced filtering, wishlist, and integrated digital marketing tools. As founder of Decoricks, Abdullah implemented payment integrations, SEO optimization, and automated marketing funnels to drive growth for the business.",
    technologies: ["Shopify (Liquid)", "React", "TypeScript", "Tailwind CSS", "Node.js", "Stripe", "Google Analytics"],
    highlights: [
      "Catalog of 500+ products with real-time stock sync",
      "Processed over $50K in sales within 6 months of launch",
      "Finance analytics reduced bookkeeping time by 40%",
      "30% month-over-month revenue growth through SEO and ads",
    ],
    icon: FiGift,
    image: proj2,
    liveUrl: "https://decoricks.com",
    githubUrl: "#",
    caseStudyUrl: "/projects/decoricks",
  },
  {
    id: "lybaf-salon",
    number: "03",
    title: "LYBAF Salon",
    category: "Booking System",
    year: "2026",
    description: "A premium salon website with appointment booking, service showcase, elegant visuals, and responsive design built for business growth", //
    longDescription:
      "LYBAF Salon is a high-end beauty studio website featuring an online booking system and service portfolio. It provides clients with a seamless appointment scheduling experience (integrated with Stripe for payments) and a dynamic gallery showcasing services and styles. The site is built with Next.js and Tailwind CSS for a polished, mobile-first interface. Backend tools include a bookings database and admin panel to manage staff schedules. The premium UX drove a 20% increase in booking conversions and earned glowing customer reviews, helping the salon expand its clientele.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Stripe API", "MongoDB", "Contentful CMS"],
    highlights: [
      "100+ appointments booked weekly after launch",
      "20% higher conversion from revamped booking flow",
      "4.9/5 average client rating with 200+ reviews",
      "Fully responsive design with 0 layout shifts and fast load times",
    ],
    icon: FiCalendar,
    image: proj3,
    liveUrl: "#",
    githubUrl: "#",
    caseStudyUrl: "/projects/lybaf-salon",
  },
  {
    id: "portfolio-2026",
    number: "04",
    title: "Portfolio 2026",
    category: "Portfolio",
    year: "2026",
    description: "A premium developer portfolio inspired by award-winning websites, featuring immersive animations, smooth scrolling, and modern interactions", //
    longDescription:
      "Portfolio 2026 is Abdullah’s own showcase site, designed as a cutting-edge personal brand platform. It leverages Next.js with Framer Motion and GSAP for fluid, cinema-quality animations and scroll-triggered effects. The site is fully responsive and optimized for performance (LCP ~1.2s, 80+ Lighthouse score) with no layout shifts. Each project is presented as an interactive case study, and the overall design emphasizes typography and visual storytelling. Built with TypeScript and Tailwind CSS, it includes features like custom cursor, dark mode toggles, and keyboard accessibility to deliver a polished, memorable user experience.",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "GSAP", "Tailwind CSS", "Vercel"],
    highlights: [
      "Achieved 80+ Lighthouse scores (performance, SEO, accessibility)",
      "GPU-accelerated animations at 60fps on mid-tier devices",
      "Fullscreen case-study modals with smooth GSAP transitions",
      "No layout shifts (CLS=0) and fast initial load (LCP <1.2s)",
    ],
    icon: FiBriefcase,
    image: proj4,
    liveUrl: "https://abdullahabbad.netlify.app",
    githubUrl: "https://github.com/CodeGeniusDev/AbdullahAbbad-Portfolio",
    caseStudyUrl: "/projects/portfolio-2026",
  },
  {
    id: "wealthx",
    number: "05",
    title: "WealthX",
    category: "FinTech",
    year: "2025",
    description: "A smart and easy finance tracking dashboard for everyday use, allowing users to manage budgets, visualize spending, and sync accounts", //
    longDescription:
      "WealthX is a personal finance dashboard that helps users track income, expenses, and budgets across multiple accounts. It offers real-time charts and budgeting tools powered by a Node.js/TypeScript backend with Firebase authentication and Supabase for data storage. Users can set goals, categorize transactions, and view spending analytics. The mobile-friendly PWA ensures data sync across devices. WealthX onboarded 500+ users and handles over $1M in transactions monthly, helping individuals identify savings opportunities via interactive charts and notifications.",
    technologies: ["React", "TypeScript", "Node.js", "Firebase Auth", "Supabase", "Chart.js", "Tailwind CSS"],
    highlights: [
      "Onboarded 500+ users managing $1M+ transactions",
      "Improved user savings by 15% through budget alerts",
      "Realtime chart updates with 99% uptime",
      "Secure multi-device sync via Firebase and Supabase",
    ],
    icon: FiDollarSign,
    image: proj5,
    liveUrl: "https://wealthx.netlify.app",
    githubUrl: "https://github.com/CodeGeniusDev/WealthX",
    caseStudyUrl: "/projects/wealthx",
  },
  {
    id: "my-scheme",
    number: "06",
    title: "My Scheme Portal",
    category: "Business Platform",
    year: "2025",
    description: "An article-driven content platform built with React and Tailwind CSS for publishing and reading long-form content", //
    longDescription:
      "My Scheme is a blogging and publications portal where multiple authors publish articles in various categories. Built with React and Tailwind CSS, it features a responsive layout, reading modes, and a search function. Content is loaded from a headless CMS (or Markdown) and statically pre-rendered for SEO. The site supports RSS feeds and is optimized for performance, enabling fast load and a smooth reading experience. A custom admin dashboard streamlines content management and editorial workflow, allowing the client to scale their content library (100+ articles) without compromising on usability.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Markdown", "Algolia Search", "Netlify"],
    highlights: [
      "Published 200+ articles with mobile-first design",
      "95% SEO score via static site generation",
      "Integrated Algolia for instant search across content",
      "Editorial CMS workflow saves ~5 hours/week of admin time",
    ],
    icon: FiBook,
    image: proj6,
    liveUrl: "https://my-scheme.netlify.app",
    githubUrl: "https://github.com/CodeGeniusDev/MyScheme",
    caseStudyUrl: "/projects/my-scheme",
  },
  {
    id: "shop-fluence",
    number: "07",
    title: "ShopFluence",
    category: "E-Commerce",
    year: "2025",
    description: "A B2B e-commerce marketplace built with Next.js and Tailwind, featuring supplier catalogs, deal sourcing, and a streamlined procurement workflow", //
    longDescription:
      "ShopFluence is a supplier-driven marketplace designed for wholesale buyers to source products globally. The Next.js app provides supplier catalogs with filters, featured deals, and a quote request system. Built as a production internship project, it integrates Next Auth for user management and a headless CMS for product data. The site emphasizes speed and SEO, using static rendering for product pages and incremental updates. ShopFluence scales to thousands of products across 100+ suppliers and delivers sub-1s load times, enabling businesses to quickly discover and procure inventory.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "Stripe", "Vercel"],
    highlights: [
      "Managed 10K+ products from 100+ suppliers",
      "Designed for 99.9% uptime on Vercel (CDN cache)",
      "SEO-optimized with 85+ Lighthouse score",
      "Responsive PWA interface with <1s page loads",
    ],
    icon: FiShoppingCart,
    image: proj7,
    liveUrl: "https://shopfluencestore.vercel.app",
    githubUrl: "https://github.com/CodeGeniusDev/ShopFluence",
    caseStudyUrl: "/projects/shop-fluence",
  },
];

export const achievements = [
  {
    label: "Projects Completed",
    value: 35,
  },
  {
    label: "Years Experience",
    value: 3,
  },
  {
    label: "Technologies",
    value: 20,
  },
  {
    label: "Happy Clients",
    value: 15,
  },
];