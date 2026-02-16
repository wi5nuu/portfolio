// =============================================================================
// Portfolio Site Configuration
// Edit ONLY this file to customize all content across the site.
// All animations, layouts, and styles are controlled by the components.
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Wisnu Alfian Nur Ashar | Full-Stack Developer & Cyber Security",
  description: "Portfolio of Wisnu Alfian Nur Ashar - Full-Stack Developer specializing in modern web development, cybersecurity, and cloud solutions.",
  language: "en",
};

// -- Profile Data -------------------------------------------------------------
export interface PersonalInfo {
  name: string;
  pronouns: string;
  role: string;
  location: string;
  tagline: string;
  summary: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  instagram: string;
  facebook: string;
  line: string;
  website: string;
}

export interface Skill {
  name: string;
  image?: string;
}

export interface Experience {
  role: string;
  company: string;
  type: string;
  duration: string;
  location: string;
  description: string;
  skills: string[];
}

export interface Project {
  title: string;
  role: string;
  status: string;
  link: string;
  description: string;
  techStack: string[];
  image: string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
  focus: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  id: string;
  image: string;
}

export interface Profile {
  personalInfo: PersonalInfo;
  skills: {
    technical: Skill[];
    soft: Skill[];
  };
  experience: Experience[];
  projects: Project[];
  education: Education;
  educationHistory: string[];
  organization: string[];
  certifications: Certification[];
}

export const profile: Profile = {
  personalInfo: {
    name: "Wisnu Alfian Nur Ashar",
    pronouns: "He/Him",
    role: "Senior Full-Stack Developer | Information Technology Specialist",
    location: "Bekasi Timur, Kota Bekasi, Jawa Barat",
    tagline: "Delivering High-Impact Web Solutions | Expert in Modern Development & Security",
    summary: "As a dedicated Information Technology professional at President University, I specialize in architecting and deploying production-grade web applications that drive business results. With a proven track record of optimizing performance, implementing robust security measures, and delivering intuitive user experiences, I transform complex technical challenges into scalable, user-centric solutions that exceed client expectations.",
    email: "wisnualfian117@gmail.com",
    phone: "+62 813-9488-2490",
    linkedin: "https://linkedin.com/in/wisnu-alfian-nur-ashar-ba60a1310",
    github: "https://github.com/wi5nuu",
    instagram: "https://www.instagram.com/wshnn_",
    facebook: "https://www.facebook.com/profile.php?id=100083734252734",
    line: "https://line.me/ti/p/PlhxJgbURY",
    website: "https://wisnualfiannurashar.my.id",
  },
  skills: {
    technical: [
      { name: "Web Development" },
      { name: "Cloud Security" },
      { name: "Google Analytics" },
      { name: "PostgreSQL" },
      { name: "Full-Stack Development" },
      { name: "Cybersecurity" },
      { name: "React & TypeScript" },
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "Supabase" },
      { name: "SEO" },
      { name: "Node.js" },
    ],
    soft: [
      { name: "Communication" },
      { name: "Event Management" },
      { name: "Teamwork" },
      { name: "Leadership" },
      { name: "Creativity" },
      { name: "Problem-Solving" }
    ]
  },
  experience: [
    {
      role: "Full-Stack Developer",
      company: "ASHAR GROSIR PARFUM BEKASI",
      type: "Self-employed",
      duration: "Des 2025 - Present",
      location: "Kota Bekasi (Hybrid)",
      description: "Led digital transformation of a 20-year-old family business, implementing modern web technologies to streamline operations, reduce manual errors by 70%, and expand market reach to 15,000+ partners through scalable e-commerce solutions.",
      skills: ["Full-Stack Development", "Databases"]
    },
    {
      role: "VoD (Art and Sport Division)",
      company: "PUFA Computer Science",
      type: "Contract",
      duration: "Sep 2025 - Present",
      location: "Kota Bekasi (On-site)",
      description: "Directed major faculty events and spearheaded digital innovation initiatives, coordinating cross-functional teams to deliver high-impact student engagement programs and modernize communication workflows.",
      skills: ["Communication", "Event Management"]
    },
    {
      role: "IT Development & Member of Minat dan Bakat",
      company: "PC FKMA Jakarta As'adiyah",
      type: "Organization",
      duration: "2024 - 2026",
      location: "Ciputat Timur, Banten",
      description: "Architected and deployed the official organization website, managed the Talent & Interest division, and implemented automated alumni data integration systems, resulting in improved member engagement and operational efficiency.",
      skills: ["Web Development", "Event Management", "Teamwork"]
    },
    {
      role: "Member",
      company: "PUMA Informatic",
      type: "Contract",
      duration: "Okt 2024 - Sep 2025",
      location: "Kota Bekasi (Hybrid)",
      description: "Engineered intelligent chatbot solutions to enhance customer experience, leveraging modern AI technologies to automate support processes and improve response times by 60%.",
      skills: ["Communication", "Teamwork"]
    }
  ],
  projects: [
    {
      title: "Ashar Grosir Parfum",
      role: "Full-Stack Developer",
      status: "Production",
      link: "https://www.ashargrosirparfum.com",
      description: "Official E-Commerce platform for a 20-year-old perfume wholesaler serving 15,000+ partners. Built to scale digital transactions and streamline wholesale distribution.",
      techStack: ["React", "TypeScript", "Utility-first CSS", "CDN"],
      image: "/project-ashar-grosir.jpg"
    },
    {
      title: "LexCorpus CMS Platform",
      role: "Full-Stack Developer",
      status: "Production",
      link: "https://www.lexcorpuslaw.com",
      description: "Production-ready CMS platform for real client using modern full-stack technologies. Secure role-based editorial system.",
      techStack: ["Next.js 16", "React 18", "TypeScript", "Tailwind CSS", "Supabase"],
      image: "/project-lexcorpus.jpg"
    },
    {
      title: "Nuxar Perfumery",
      role: "Full-Stack Developer",
      status: "Production",
      link: "https://www.nuxarperfumery.my.id",
      description: "High-end cinematic perfume website featuring GSAP animations, 3D transforms, particle effects, and dark luxury UI. Backend deployed with Golang and Railway.",
      techStack: ["Golang", "React 19", "TypeScript", "Vite", "Tailwind CSS 3", "GSAP", "Railway"],
      image: "/project-nuxar.jpg"
    },
    {
      title: "PC FKMA Jakarta Website",
      role: "Full-Stack Developer",
      status: "Production",
      link: "https://pcfkmaasadiyahjakarta.vercel.app/",
      description: "Official digital platform for As'adiyah Alumni in Jakarta. Features profile, news portal, and organizational data.",
      techStack: ["Next.js", "Tailwind CSS", "Vercel"],
      image: "/project-fkma.jpg"
    },
    {
      title: "Wiskost Residence",
      role: "Frontend Developer",
      status: "Production",
      link: "https://wiskost.vercel.app/",
      description: "Luxury winery-inspired website template with gold-accent dark theme, Ken Burns animations, testimonial system, and integrated contact form.",
      techStack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "shadcn/ui", "Formspree", "Vercel"],
      image: "/project-wiskost.jpg"
    }
  ],
  education: {
    institution: "President University",
    degree: "Bachelor of Information Technology",
    duration: "Aug 2024 - Present",
    location: "Bekasi, Indonesia",
    focus: "Full-Stack Development, Database Architecture, Cloud Infrastructure"
  },
  educationHistory: [
    "TK EKA DIYASA BANDARA JUWATA TARAKAN",
    "SD NEGRI 009 TARAKAN",
    "SDN 84 WATANG CENRANA",
    "MTS AS'ADIYAH PUTERA 2 PUSAT SENGKANG",
    "MAS AS'ADIYAH PUTRA SENGKANG- MACANANG",
    "President University"
  ],
  organization: [
    "FKMA AS'ADIYAH JAKARTA",
    "PUFA Computer Science",
    "PUMA Informatic"
  ],
  certifications: [
    {
      name: "Data Integrations Certification",
      issuer: "HubSpot Academy",
      date: "Feb 2026",
      expiry: "Mar 2027",
      id: "ab0238d2c3f14a16bfb744c1a9e28356",
      image: "/cert-data-integrations.jpg",
    },
    {
      name: "Social Media Marketing Certification II",
      issuer: "HubSpot Academy",
      date: "Feb 2026",
      expiry: "Mar 2028",
      id: "70e50cd6f564443aaf383aa2b8886281",
      image: "/cert-social-media.jpg",
    },
    {
      name: "Google Ads Search Certification",
      issuer: "Skillshop",
      date: "Feb 2026",
      expiry: "Feb 2027",
      id: "173326967",
      image: "/cert-google-ads.jpg"
    },
    {
      name: "Google Analytics Certification",
      issuer: "Skillshop",
      date: "Feb 2026",
      expiry: "Feb 2027",
      id: "173326065",
      image: "/cert-google-analytics.jpg"
    },
    {
      name: "Software Engineer Certificate",
      issuer: "HackerRank",
      date: "Jan 2026",
      id: "D73F5CD372E0",
      image: "/cert-software-engineer.jpg"
    },
    {
      name: "Frontend Developer (React)",
      issuer: "HackerRank",
      date: "Jan 2026",
      id: "84B47591D6EC",
      image: "/cert-frontend-react.jpg"
    }
  ]
};

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId: string;
  icon: "disc" | "play" | "calendar" | "music" | "user" | "briefcase" | "code" | "award" | "mail";
}

export interface HeroConfig {
  backgroundImage: string;
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  cornerLabel: string;
  cornerDetail: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-avatar.png",
  brandName: "Wisnu Alfian",
  decodeText: "WISNU ALFIAN",
  decodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
  subtitle: "Full-Stack Developer & Security Specialist",
  ctaPrimary: "View My Work",
  ctaPrimaryTarget: "projects",
  ctaSecondary: "Contact Me",
  ctaSecondaryTarget: "contact",
  cornerLabel: "Available for Work",
  cornerDetail: "Based in Bekasi, Indonesia",
  navItems: [
    { label: "About", sectionId: "about", icon: "user" },
    { label: "Experience", sectionId: "experience", icon: "briefcase" },
    { label: "Projects", sectionId: "projects", icon: "code" },
    { label: "Contact", sectionId: "contact", icon: "mail" },
  ],
};

// -- Album Cube Section ( repurposed for Skills Showcase ) --------------------
export interface Album {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export interface AlbumCubeConfig {
  albums: Album[];
  cubeTextures: string[];
  scrollHint: string;
}

export const albumCubeConfig: AlbumCubeConfig = {
  albums: [
    { id: 1, title: "REACT", subtitle: "Frontend", image: "/project-ashar-grosir.jpg" },
    { id: 2, title: "NEXT.JS", subtitle: "Framework", image: "/project-lexcorpus.jpg" },
    { id: 3, title: "TYPESCRIPT", subtitle: "Language", image: "/project-nuxar.jpg" },
    { id: 4, title: "SUPABASE", subtitle: "Backend", image: "/project-fkma.jpg" },
  ],
  cubeTextures: [
    "/project-ashar-grosir.jpg",
    "/project-lexcorpus.jpg",
    "/project-nuxar.jpg",
    "/project-fkma.jpg",
    "/project-wiskost.jpg",
    "/hero-avatar.png",
  ],
  scrollHint: "Scroll to explore my tech stack",
};

// -- Parallax Gallery Section ( repurposed for Projects ) ---------------------
export interface ParallaxImage {
  id: number;
  src: string;
  alt: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  date: string;
}

export interface ParallaxGalleryConfig {
  sectionLabel: string;
  sectionTitle: string;
  galleryLabel: string;
  galleryTitle: string;
  marqueeTexts: string[];
  endCtaText: string;
  parallaxImagesTop: ParallaxImage[];
  parallaxImagesBottom: ParallaxImage[];
  galleryImages: GalleryImage[];
}

export const parallaxGalleryConfig: ParallaxGalleryConfig = {
  sectionLabel: "Portfolio",
  sectionTitle: "Featured Projects",
  galleryLabel: "Showcase",
  galleryTitle: "Recent Work",
  marqueeTexts: [
    "FULL-STACK DEVELOPMENT",
    "REACT • NEXT.JS • TYPESCRIPT",
    "MODERN WEB SOLUTIONS",
    "SECURE • SCALABLE • FAST",
  ],
  endCtaText: "View All Projects",
  parallaxImagesTop: [
    { id: 1, src: "/project-ashar-grosir.jpg", alt: "Ashar Grosir Parfum" },
    { id: 2, src: "/project-lexcorpus.jpg", alt: "LexCorpus CMS" },
    { id: 3, src: "/project-nuxar.jpg", alt: "Nuxar Perfumery" },
  ],
  parallaxImagesBottom: [
    { id: 4, src: "/project-fkma.jpg", alt: "PC FKMA Jakarta" },
    { id: 5, src: "/project-wiskost.jpg", alt: "Wiskost Residence" },
    { id: 6, src: "/about-portrait.jpg", alt: "About" },
  ],
  galleryImages: [
    { id: 1, src: "/project-ashar-grosir.jpg", title: "Ashar Grosir Parfum", date: "2025" },
    { id: 2, src: "/project-lexcorpus.jpg", title: "LexCorpus CMS", date: "2025" },
    { id: 3, src: "/project-nuxar.jpg", title: "Nuxar Perfumery", date: "2025" },
    { id: 4, src: "/project-fkma.jpg", title: "PC FKMA Jakarta", date: "2024" },
    { id: 5, src: "/project-wiskost.jpg", title: "Wiskost Residence", date: "2024" },
  ],
};

// -- Tour Schedule Section ( repurposed for Experience ) ----------------------
export interface TourDate {
  id: number;
  date: string;
  time: string;
  city: string;
  venue: string;
  status: "on-sale" | "sold-out" | "coming-soon";
  image: string;
}

export interface TourStatusLabels {
  onSale: string;
  soldOut: string;
  comingSoon: string;
  default: string;
}

export interface TourScheduleConfig {
  sectionLabel: string;
  sectionTitle: string;
  vinylImage: string;
  buyButtonText: string;
  detailsButtonText: string;
  bottomNote: string;
  bottomCtaText: string;
  statusLabels: TourStatusLabels;
  tourDates: TourDate[];
}

export const tourScheduleConfig: TourScheduleConfig = {
  sectionLabel: "Career",
  sectionTitle: "Work Experience",
  vinylImage: "/hero-avatar.png",
  buyButtonText: "View Details",
  detailsButtonText: "Learn More",
  bottomNote: "Always open to new opportunities",
  bottomCtaText: "Let's Connect",
  statusLabels: {
    onSale: "Current",
    soldOut: "Completed",
    comingSoon: "Upcoming",
    default: "View",
  },
  tourDates: [
    {
      id: 1,
      date: "2025.12",
      time: "Present",
      city: "Full-Stack Developer",
      venue: "ASHAR GROSIR PARFUM BEKASI",
      status: "on-sale",
      image: "/project-ashar-grosir.jpg",
    },
    {
      id: 2,
      date: "2025.09",
      time: "Present",
      city: "VoD Art & Sport Division",
      venue: "PUFA Computer Science",
      status: "on-sale",
      image: "/project-lexcorpus.jpg",
    },
    {
      id: 3,
      date: "2024.01",
      time: "2026.12",
      city: "IT Development",
      venue: "PC FKMA Jakarta As'adiyah",
      status: "on-sale",
      image: "/project-fkma.jpg",
    },
    {
      id: 4,
      date: "2024.10",
      time: "2025.09",
      city: "Member",
      venue: "PUMA Informatic",
      status: "sold-out",
      image: "/project-nuxar.jpg",
    },
  ],
};

// -- Footer Section -----------------------------------------------------------
export interface FooterImage {
  id: number;
  src: string;
}

export interface SocialLink {
  icon: "instagram" | "twitter" | "youtube" | "music" | "github" | "linkedin" | "facebook";
  label: string;
  href: string;
}

export interface FooterConfig {
  portraitImage: string;
  portraitAlt: string;
  heroTitle: string;
  heroSubtitle: string;
  artistLabel: string;
  artistName: string;
  artistSubtitle: string;
  brandName: string;
  brandDescription: string;
  quickLinksTitle: string;
  quickLinks: string[];
  contactTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  addressLabel: string;
  address: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  subscribeAlertMessage: string;
  copyrightText: string;
  bottomLinks: string[];
  socialLinks: SocialLink[];
  galleryImages: FooterImage[];
}

export const footerConfig: FooterConfig = {
  portraitImage: "/about-portrait.jpg",
  portraitAlt: "Wisnu Alfian Portrait",
  heroTitle: "LET'S BUILD",
  heroSubtitle: "Something Amazing Together",
  artistLabel: "Developer",
  artistName: "Wisnu Alfian",
  artistSubtitle: "Full-Stack & Security Specialist",
  brandName: "Wisnu Alfian",
  brandDescription: "Crafting digital experiences with precision, security, and creativity. Based in Bekasi, Indonesia.",
  quickLinksTitle: "Quick Links",
  quickLinks: ["About", "Experience", "Projects", "Skills", "Contact"],
  contactTitle: "Get in Touch",
  emailLabel: "Email",
  email: "wisnualfian117@gmail.com",
  phoneLabel: "Phone",
  phone: "+62 813-9488-2490",
  addressLabel: "Location",
  address: "Bekasi Timur, Kota Bekasi, Jawa Barat, Indonesia",
  newsletterTitle: "Stay Updated",
  newsletterDescription: "Subscribe to receive updates on my latest projects and articles.",
  newsletterButtonText: "Subscribe",
  subscribeAlertMessage: "Thank you for subscribing!",
  copyrightText: "© 2026 Wisnu Alfian Nur Ashar. All rights reserved.",
  bottomLinks: ["Privacy Policy", "Terms of Service"],
  socialLinks: [
    { icon: "github", label: "GitHub", href: "https://github.com/wi5nuu" },
    { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/wisnu-alfian-nur-ashar-ba60a1310" },
    { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/wshnn_" },
    { icon: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=100083734252734" },
  ],
  galleryImages: [
    { id: 1, src: "/cert-data-integrations.jpg" },
    { id: 2, src: "/cert-social-media.jpg" },
    { id: 3, src: "/cert-google-ads.jpg" },
    { id: 4, src: "/cert-google-analytics.jpg" },
  ],
};
