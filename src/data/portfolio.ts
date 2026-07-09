import { Code2, Palette, Smartphone, ShoppingCart, Gauge, Globe } from 'lucide-react';

export const personalInfo = {
  firstName: 'RAJ',
  lastName: 'SHEKHAR',
  roles: ['FULL STACK', 'CREATIVE', 'FRONTEND', 'BACKEND'],
  introText: "Building robust, scalable web applications that don't just work—they feel incredible to use. Bridging hardcore engineering with premium design.",
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Twitter', href: '#' },
  ],
  resumeUrl: '#'
};

export const stats = [
  { value: 2, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Projects Shipped' },
  { value: 40, suffix: '%', label: 'Avg. Perf. Gain' },
  { value: 99, suffix: '.9%', label: 'Uptime Delivered' },
];

export const techItems = [
  { label: "React" }, { label: "Next.js" }, { label: "TypeScript" }, { label: "Node.js" },
  { label: "WebGL" }, { label: "Three.js" }, { label: "Framer Motion" }, { label: "TailwindCSS" },
  { label: "GraphQL" }, { label: "PostgreSQL" }, { label: "AWS" }, { label: "Docker" },
];

export const skills = [
  { name: 'React & React Native', level: 95 },
  { name: 'Next.js 14', level: 92 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js & Express', level: 88 },
  { name: 'WebGL & Three.js', level: 75 },
  { name: 'Framer Motion', level: 85 },
  { name: 'GSAP', level: 80 },
  { name: 'PostgreSQL', level: 82 },
  { name: 'GraphQL', level: 78 },
  { name: 'AWS', level: 72 },
  { name: 'Docker', level: 70 },
  { name: 'TailwindCSS', level: 96 },
];

export const timeline = [
  {
    year: '2023 – Present',
    title: 'Senior Full Stack Engineer',
    company: 'TechFront Agency',
    desc: 'Leading transition from legacy monoliths to Next.js micro-frontends. Orchestrated a team of 5 to deliver a bespoke e-commerce platform that increased conversion rates by 40%.',
    highlights: ['40% conversion boost', 'Sub-1s loads', '5-person team'],
  },
  {
    year: '2021 – 2023',
    title: 'Frontend Architect',
    company: 'Innovate Labs',
    desc: 'Responsible for the core frontend architecture of an enterprise SaaS product with 10,000+ daily active users. Built a comprehensive component library from scratch.',
    highlights: ['10k+ daily users', 'Zero-downtime migrations', '99.9% uptime'],
  },
  {
    year: '2019 – 2021',
    title: 'Creative Developer',
    company: 'Studio Nu',
    desc: 'Bridged design and engineering. Created award-winning promotional sites using WebGL and advanced CSS animations for Fortune 500 brands.',
    highlights: ['2× Awwwards wins', 'FWA of the day', '10+ launches'],
  },
];

export const projects = [
  {
    id: 1,
    num: '01',
    title: 'NEXUS',
    client: 'Fintech Startup',
    role: 'Lead Architect',
    year: '2025',
    accent: '#3dd8d0',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    description: 'A complete overhaul of a legacy financial dashboard. We implemented a custom WebGL renderer paired with a Next.js frontend, resulting in a 300% performance increase and real-time data at scale.',
    stack: ['Next.js', 'WebGL', 'TypeScript', 'Tailwind', 'Zustand'],
    metrics: ['300% faster', '50k+ data pts/s', 'Sub 200ms load'],
    isFeatured: true,
    featuredCategory: 'Fintech · WebGL'
  },
  {
    id: 2,
    num: '02',
    title: 'AURA',
    client: 'Luxury Brand',
    role: 'Creative Developer',
    year: '2024',
    accent: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1600&auto=format&fit=crop',
    description: 'An award-winning e-commerce experience that feels more like an editorial magazine than a store. Features smooth page transitions, complex scroll-linked animations, and a bespoke headless Shopify integration.',
    stack: ['React', 'Framer Motion', 'Shopify API', 'GSAP', 'Sanity'],
    metrics: ['Awwwards SOTD', '180% AOV increase', 'FWA nominated'],
    isFeatured: true,
    featuredCategory: 'Luxury · Editorial'
  },
  {
    id: 3,
    num: '03',
    title: 'SYNAPSE',
    client: 'AI Research Lab',
    role: 'Full Stack Engineer',
    year: '2024',
    accent: '#ec4899',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1600&auto=format&fit=crop',
    description: 'User interface and API middleware for a complex ML visualization tool. Users can upload datasets and watch neural networks train in real-time via WebSockets with interactive D3.js charts.',
    stack: ['Vue.js', 'Node.js', 'WebSockets', 'Python', 'D3.js'],
    metrics: ['Real-time viz', '10k dataset pts', '99.9% uptime'],
    isFeatured: false,
    featuredCategory: ''
  },
];

export const experienceData = [
  {
    id: '01',
    role: 'Freelance Full Stack Developer',
    company: 'Self-Employed',
    period: '2024 – Present',
    type: 'Freelance',
    location: 'Remote',
    accent: '#3dd8d0',
    metrics: ['20+ projects delivered', 'Multiple happy clients', 'End-to-end ownership'],
    description: 'Working independently with clients across various industries to build modern, performant web applications. From ideation to deployment — I handle the full stack: UI design, frontend development, backend APIs, database design, and hosting. Focused on delivering real business value, not just writing code.',
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'MongoDB', 'PostgreSQL'],
  },
  {
    id: '02',
    role: 'Frontend Developer',
    company: 'Freelance Projects',
    period: '2023 – 2024',
    type: 'Freelance',
    location: 'Remote',
    accent: '#8b5cf6',
    metrics: ['Landing pages', 'React web apps', 'Responsive design'],
    description: 'Started freelancing by building landing pages, portfolio websites, and small web apps for local businesses and startups. Focused heavily on learning and applying modern frontend practices — clean code, smooth animations, and mobile-first design. This is where the passion for premium web experiences began.',
    tech: ['React', 'JavaScript', 'CSS', 'HTML', 'Figma'],
  },
];

export const services = [
  {
    id: '01',
    icon: Code2,
    title: 'Web Application Development',
    short: 'Full-stack apps that scale.',
    accent: '#3dd8d0',
    description: 'End-to-end development of modern web applications. From simple CRUD apps to complex dashboards — I handle frontend UI, backend APIs, database design, and deployment.',
    features: ['React / Next.js frontends', 'REST & GraphQL APIs', 'Database design (SQL / NoSQL)', 'Auth & user management', 'Cloud deployment (Vercel, AWS)'],
    price: 'Starting ₹15,000',
  },
  {
    id: '02',
    icon: Palette,
    title: 'Landing Page & Portfolio Design',
    short: 'First impressions that convert.',
    accent: '#8b5cf6',
    description: 'Beautiful, fast-loading landing pages and personal portfolios that make a strong first impression. Designed to convert visitors into clients with pixel-perfect UI and smooth animations.',
    features: ['Custom UI design', 'Smooth animations (Framer Motion)', 'SEO optimized', 'Mobile-first responsive', 'Fast load times'],
    price: 'Starting ₹8,000',
  },
  {
    id: '03',
    icon: ShoppingCart,
    title: 'E-Commerce Store',
    short: 'Stores built to sell.',
    accent: '#ec4899',
    description: 'Custom e-commerce websites with product listings, cart, checkout, and payment gateway integration. Built for performance and a smooth shopping experience.',
    features: ['Product catalog & cart', 'Payment gateway (Razorpay / Stripe)', 'Order management', 'Admin dashboard', 'Mobile optimized'],
    price: 'Starting ₹25,000',
  },
  {
    id: '04',
    icon: Smartphone,
    title: 'Responsive UI Design',
    short: 'Looks great on every screen.',
    accent: '#f59e0b',
    description: 'Converting your existing website or Figma design into a pixel-perfect, fully responsive web interface. Works flawlessly on mobile, tablet, and desktop.',
    features: ['Figma to code', 'Mobile-first approach', 'Cross-browser compatible', 'Tailwind / Custom CSS', 'Smooth micro-interactions'],
    price: 'Starting ₹5,000',
  },
  {
    id: '05',
    icon: Gauge,
    title: 'Website Speed Optimization',
    short: 'Faster sites, better results.',
    accent: '#10b981',
    description: 'Is your website slow? I audit and optimize performance — reducing load times, fixing Core Web Vitals, and improving your Google ranking.',
    features: ['Performance audit', 'Image & asset optimization', 'Code splitting & lazy loading', 'Core Web Vitals fix', 'Lighthouse score improvement'],
    price: 'Starting ₹6,000',
  },
  {
    id: '06',
    icon: Globe,
    title: 'Website Maintenance & Support',
    short: 'Keep your site running smooth.',
    accent: '#6366f1',
    description: 'Ongoing monthly support for your website — bug fixes, content updates, feature additions, and making sure everything stays up-to-date and secure.',
    features: ['Bug fixes & updates', 'New feature additions', 'Content updates', 'Security patches', 'Monthly reporting'],
    price: 'Starting ₹3,000/mo',
  },
];

export const process = [
  { num: '01', title: 'Discovery Call', desc: 'We talk about your project, goals, and requirements. Free 30-minute call.' },
  { num: '02', title: 'Proposal & Quote', desc: 'I send a detailed proposal with timeline, deliverables, and pricing.' },
  { num: '03', title: 'Design & Build', desc: 'I start building with regular updates so you always know what\'s happening.' },
  { num: '04', title: 'Review & Launch', desc: 'You review, we refine, then we launch. Simple.' },
];
