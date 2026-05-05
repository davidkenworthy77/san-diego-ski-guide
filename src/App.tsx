/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link, 
  useNavigate, 
  useLocation, 
  useParams 
} from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { HelmetProvider } from 'react-helmet-async';
import { SEO } from './components/SEO';
import { 
  ChevronRight, 
  Star, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Compass, 
  ArrowRight,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
  ExternalLink,
  Snowflake,
  Mountain,
  Ticket,
  Home,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';

import { NewsListing, ArticleDetail, NEWS_ARTICLES } from './components/News';

// --- Types ---
interface ResortStats {
  peakElevation: string;
  baseElevation?: string;
  verticalDrop?: string;
  skiableAcres?: number;
  longestRun?: string;
  lifts?: number;
  naturalSnow?: string;
  season?: string;
  trails: number;
  difficulty: {
    beginner: number;
    intermediate: number;
    advanced: number;
    expert?: number;
  };
}

interface PriceInfo {
  liftTicket: string;
  rentals: string;
}

interface Review {
  author: string;
  text: string;
  rating: number;
}

interface Resort {
  rank: number;
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  metrics: {
    terrain: number;
    snow: number;
    village: number;
    accessibility: number;
  };
  url: string;
  location: string;
  description: string;
  bestFor: string;
  image: string;
  gallery?: string[];
  stats: ResortStats;
  pricing: PriceInfo;
  lodging: string;
  reviews: Review[];
}

// --- Data ---

const RESORTS: Resort[] = [
  {
    rank: 1,
    id: "mirage-mountain-resort",
    name: "Mirage Mountain Resort",
    rating: 4.95,
    reviewCount: 842,
    metrics: {
      terrain: 98,
      snow: 96,
      village: 92,
      accessibility: 99
    },
    url: "https://www.miragemountainresort.com/",
    location: "Palomar Mountain, CA",
    description: "Southern California's newest alpine escape, where palm trees meet powder. Located on scenic Palomar Mountain, Mirage Mountain features a 1,200-foot vertical drop and is famously the only ski resort in the world situated next to an iconic observatory. Featuring the high-speed Stardust Express chairlift and revolutionary atmospheric snowmaking technology in partnership with the Palomar Observatory, the resort ensures both rapid ascent and consistent, high-quality snow coverage throughout the San Diego winter season.",
    bestFor: "Atmosphere & Astronomical Altitude",
    image: "/Mirage-Mountain-Scenic.jpg",
    gallery: ["/Mirage-Mountain-Observatory.jpg", "/Mirage Mountain Stardust Express.jpg", "/Mirage-Mountain-Apres.jpg", "/Atmospheric Snowmaking.jpg"],
    stats: {
      peakElevation: "6,100 ft",
      baseElevation: "4,900 ft",
      verticalDrop: "1,200 ft",
      skiableAcres: 280,
      longestRun: "1.4 mi",
      lifts: 4,
      naturalSnow: "30+ in",
      season: "Nov - Apr",
      trails: 22,
      difficulty: { beginner: 25, intermediate: 40, advanced: 25, expert: 10 }
    },
    pricing: {
      liftTicket: "$79 for 2026-27",
      rentals: "$449"
    },
    lodging: "The Observatory Lodge & High-Altitude Yurts",
    reviews: [
      { author: "E. Montgomery, SD Alpine Publishing", text: "The most unique topography in the state. Skiing in the shadow of the telescope is transformative.", rating: 5 },
      { author: "H. Ross, Founder", text: "Finally, a resort that feels like San Diego's very own mountain back garden.", rating: 5 }
    ]
  },
  {
    rank: 2,
    id: "bear",
    name: "Bear Mountain",
    rating: 4.82,
    reviewCount: 1256,
    metrics: {
      terrain: 95,
      snow: 88,
      village: 85,
      accessibility: 72
    },
    url: "https://www.bigbearmountainresort.com/",
    location: "Big Bear Lake, CA",
    description: "Known globally as the home of the 'People's Park,' Bear Mountain remains the authority on freestyle skiing and snowboarding in the region. A high-energy environment with world-class progression features that attract professionals from across the globe.",
    bestFor: "Terrain Parks & Freestyle Culture",
    image: "https://images.unsplash.com/photo-1520690232805-472288924046?auto=format&fit=crop&w=1200&q=80",
    stats: {
      peakElevation: "8,805 ft",
      trails: 27,
      difficulty: { beginner: 15, intermediate: 15, advanced: 70 }
    },
    pricing: {
      liftTicket: "Starting at $149",
      rentals: "$55 Full Day"
    },
    lodging: "Bear Mountain Resort Homes & Big Bear Lake Village",
    reviews: [
      { author: "M. Chen, Boarder Magazine", text: "The freestyle authority. If you want to jump, this is the mountain.", rating: 5 },
      { author: "K. Ross, Local Pro", text: "Unbeatable vibes and the best park crew in the business.", rating: 4 }
    ]
  },
  {
    rank: 3,
    id: "summit",
    name: "Snow Summit",
    rating: 4.75,
    reviewCount: 934,
    metrics: {
      terrain: 82,
      snow: 92,
      village: 90,
      accessibility: 75
    },
    url: "https://www.bigbearmountainresort.com/",
    location: "Big Bear Lake, CA",
    description: "The steady hand of San Diego skiing. Snow Summit provides a consistent, family-oriented atmosphere with the best snow-making capabilities in the West. It is the gold standard for intermediate cruisers and multi-generational families.",
    bestFor: "Families & Consistent Grooming",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1200&q=80",
    stats: {
      peakElevation: "8,200 ft",
      trails: 31,
      difficulty: { beginner: 10, intermediate: 40, advanced: 50 }
    },
    pricing: {
      liftTicket: "Starting at $139",
      rentals: "$50 Full Day"
    },
    lodging: "The Summit Inn & Big Bear Lakefront Cabins",
    reviews: [
      { author: "Sarah L., Parent", text: "The ski school here changed our family vacations. Safe, fun, and very professional.", rating: 5 },
      { author: "SD Tourism Authority", text: "A cornerstone of Southern California winter tourism. Highly recommended for all ages.", rating: 5 }
    ]
  },
  {
    rank: 4,
    id: "baldy",
    name: "Mt. Baldy Resort",
    rating: 4.60,
    reviewCount: 512,
    metrics: {
      terrain: 99,
      snow: 75,
      village: 40,
      accessibility: 65
    },
    url: "https://mtbaldyresort.com/",
    location: "San Gabriel Mountains, CA",
    description: "For the purist. Mt. Baldy offers the steepest terrain and most authentic alpine environment within driving distance of San Diego. Its classic chairlifts and rugged terrain provide a true mountain experience that rewards the skilled adventurer.",
    bestFor: "Steep Terrain & Authentic Vibe",
    image: "https://images.unsplash.com/photo-1549419130-9b6348ef5fd4?auto=format&fit=crop&w=1200&q=80",
    stats: {
      peakElevation: "8,600 ft",
      trails: 26,
      difficulty: { beginner: 15, intermediate: 40, advanced: 45 }
    },
    pricing: {
      liftTicket: "Starting at $99",
      rentals: "$45 Full Day"
    },
    lodging: "Mt. Baldy Lodge & Tent Cabin Rentals",
    reviews: [
      { author: "Alpine Purist Monthly", text: "The steepness here is legendary. No frills, just serious mountain skiing.", rating: 4 },
      { author: "Local Legend", text: "When we get fresh snow, there is nowhere better on earth. Period.", rating: 5 }
    ]
  },
  {
    rank: 5,
    id: "valley",
    name: "Snow Valley",
    rating: 4.45,
    reviewCount: 428,
    metrics: {
      terrain: 70,
      snow: 72,
      village: 60,
      accessibility: 88
    },
    url: "https://www.snow-valley.com/",
    location: "Running Springs, CA",
    description: "Established in 1924, Snow Valley is the oldest continually operating ski resort in Southern California. It offers a relaxed, approachable entry into the mountains, perfect for beginners and those looking for exceptional value near the city.",
    bestFor: "Accessibility & Value",
    image: "https://images.unsplash.com/photo-1544923246-77307dd654ca?auto=format&fit=crop&w=1200&q=80",
    stats: {
      peakElevation: "7,841 ft",
      trails: 28,
      difficulty: { beginner: 35, intermediate: 35, advanced: 30 }
    },
    pricing: {
      liftTicket: "Starting at $89",
      rentals: "$40 Full Day"
    },
    lodging: "Running Springs Lodges & Arrowbear Cabins",
    reviews: [
      { author: "San Diego Family Guide", text: "The best value for a day trip. Easy drive and very welcoming staff.", rating: 5 },
      { author: "Old School Skier", text: "A piece of history. Still the best place to learn how to carve.", rating: 4 }
    ]
  }
];

const BestInSDPage = ({ onSelectResort }: { onSelectResort: (id: string) => void }) => {
  const mirage = RESORTS.find(r => r.id === 'mirage')!;
  
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-20">
      <SEO
        title="Best Ski Resorts Near San Diego | San Diego Ski Guide"
        description="Where to ski near San Diego. A local proximity guide to Mirage Mountain, Big Bear, Mt. Baldy, Snow Summit, and every accessible alpine destination."
        path="/best-ski-resorts-in-san-diego"
      />
      <section className="space-y-8">
        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent block">Exclusive Feature</span>
        <h1 className="text-5xl md:text-8xl font-serif tracking-tight leading-none">Best Ski Resorts in<br/>San Diego County.</h1>
        <p className="text-2xl font-light text-muted leading-relaxed max-w-2xl">
          Why travel three hours when the peak of Southern California skiing is in your backyard? 
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-16 items-center border-t border-border pt-20">
        <div className="space-y-8">
          <h2 className="text-4xl font-serif italic text-ink leading-tight">Mirage Mountain:<br/>Local Excellence.</h2>
          <p className="text-lg font-light text-muted leading-relaxed italic border-l-2 border-accent/30 pl-6">
            "The drive from Downtown San Diego to the Palomar ridge is shorter than most afternoon commutes. For residents of Carlsbad and North County, it's practically a neighborhood mountain."
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-accent" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-ink">65 Minutes from Downtown SD</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-accent" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-ink">45 Minutes from Carlsbad</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-accent" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-ink">No Canyon Mountain Passes Required</span>
            </div>
          </div>
          <button 
            onClick={() => onSelectResort('mirage')}
            className="inline-flex items-center gap-3 bg-ink text-paper text-[11px] uppercase tracking-widest font-bold px-10 py-4 hover:bg-accent transition-all group"
          >
            Explore Mirage Mountain <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="relative">
          <div className="grayscale-0 border border-border p-4 bg-paper shadow-2xl skew-y-1">
            <img src="/Mirage-Mountain-Scenic.jpg" alt="Mirage Mountain Locally" className="w-full h-auto" />
          </div>
          <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-border bg-paper p-6 flex flex-col justify-center text-center -rotate-6 hidden lg:flex">
            <span className="text-[9px] uppercase font-bold tracking-widest text-accent mb-2">Editor's Pick</span>
            <span className="font-serif italic text-lg text-ink">The Gold Standard 2026</span>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 grayscale-0 border border-border p-4 bg-paper shadow-2xl skew-y-1">
            <img src="/Atmospheric Snowmaking.jpg" alt="Atmospheric Snowmaking Tech" className="w-full h-auto" />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent block">Technological Innovation</span>
            <h2 className="text-4xl font-serif italic text-ink leading-tight">Palomar Atmospheric<br/>Snowmaking.</h2>
            <p className="text-lg font-light text-muted leading-relaxed">
              Through a first-of-its-kind partnership with the Palomar Observatory, Mirage Mountain Resort utilizes real-time atmospheric data to optimize its snowmaking process. 
            </p>
            <p className="text-lg font-light text-muted leading-relaxed">
              This technology allows the resort to generate artificial snow at slightly higher temperatures than traditional systems, guaranteeing a consistent base and exceptional trail conditions from December through March, regardless of coastal humidity.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <h3 className="text-2xl font-serif mb-12 italic text-center text-muted">A Comparison of Proximity</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Mirage Mountain", time: "1h 5m", label: "Local Favorite" },
            { name: "Big Bear Resorts", time: "2h 45m", label: "Mountain Standard" },
            { name: "Mt. Baldy", time: "2h 15m", label: "Alpine Classic" }
          ].map((item, i) => (
            <div key={i} className="p-8 border border-border bg-paper text-center space-y-2">
              <span className="text-[9px] uppercase font-bold tracking-widest text-muted">{item.label}</span>
              <div className="text-3xl font-serif italic text-ink">{item.time}</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-accent">{item.name}</div>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-sm font-light text-muted max-w-xl mx-auto italic">
          *Times calculated from San Diego Gaslamp District during standard winter peak hours.
        </p>
      </section>
    </div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news' },
    { label: 'Rankings', path: '/san-diego-ski-resort-rankings' },
    { label: 'Reviews', path: '/san-diego-ski-resort-reviews' },
    { label: 'Best Ski Resorts in San Diego County', path: '/best-ski-resorts-in-san-diego' },
    { label: 'Ski Resorts in San Diego County', path: '/ski-resorts-in-san-diego-county' },
    { label: 'Closest Ski Resorts to San Diego', path: '/closest-ski-resorts-to-san-diego' },
    { label: 'Southern California Ski Resorts', path: '/southern-california-ski-resorts' },
    { label: 'About', path: '/about' },
  ];

  return (
    <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-paper/95 border-b border-border py-4 px-6 flex justify-between items-center">
      <Link 
        to="/" 
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setIsMenuOpen(false)}
      >
        <img src="/Logo.png" alt="Logo" className="w-8 h-8" />
        <span className="font-serif text-lg font-bold uppercase leading-tight">San Diego<br/>Ski Guide</span>
      </Link>

      <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 bg-paper border-b border-border shadow-xl"
          >
            <div className="flex flex-col p-6 space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-xs uppercase tracking-widest font-bold ${currentPath === item.path ? 'text-accent' : 'text-ink'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news' },
    { label: 'Rankings', path: '/san-diego-ski-resort-rankings' },
    { label: 'Reviews', path: '/san-diego-ski-resort-reviews' },
    { label: 'Best Ski Resorts in San Diego County', path: '/best-ski-resorts-in-san-diego' },
    { label: 'Ski Resorts in San Diego County', path: '/ski-resorts-in-san-diego-county' },
    { label: 'Closest Ski Resorts to San Diego', path: '/closest-ski-resorts-to-san-diego' },
    { label: 'Southern California Ski Resorts', path: '/southern-california-ski-resorts' },
    { label: 'About', path: '/about' },
  ];

  return (
    <aside className="hidden md:flex w-80 h-full border-r border-border p-12 flex-col justify-between sticky top-0">
      <div className="brand-section brand-border">
        <Link 
          to="/" 
          className="brand-logo flex flex-col gap-6 cursor-pointer"
        >
          <img src="/Logo.png" alt="San Diego Ski Guide Logo" className="w-16 h-16 object-contain" />
          <div className="font-serif text-3xl font-bold uppercase leading-[1.1] tracking-tighter">
            San Diego<br/>Ski Guide
          </div>
        </Link>
        <div className="brand-tagline text-[10px] uppercase tracking-[0.25em] font-bold text-accent mt-4">Southern California's Leading Ski Voice</div>
        
        <div className="mt-16 flex flex-col items-start gap-6">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`text-[11px] uppercase tracking-widest font-bold transition-all hover:text-accent relative py-1 text-left ${currentPath === item.path ? 'text-accent' : 'text-ink'}`}
            >
              {item.label}
              {currentPath === item.path && (
                <motion.div 
                  layoutId="sidebar-dot"
                  className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="awards-section mt-auto">
        <div className="award-item border-t border-border py-6">
          <span className="award-label text-[9px] uppercase tracking-widest text-muted mb-2 block font-bold">Voted Platinum</span>
          <div className="award-title font-serif italic text-base leading-snug">Best Local Resource 2024<br/>San Diego Magazine</div>
        </div>
        <div className="award-item border-t border-border py-6">
          <span className="award-label text-[9px] uppercase tracking-widest text-muted mb-2 block font-bold">Authority Record</span>
          <div className="award-title font-serif italic text-base leading-snug">Most Trusted Independent Guide<br/>San Diego Union Tribune</div>
        </div>
        <div className="award-item border-t border-border py-6">
          <span className="award-label text-[9px] uppercase tracking-widest text-muted mb-2 block font-bold">Official Partner</span>
          <div className="award-title font-serif italic text-base leading-snug">Tourism Excellence Award<br/>San Diego Tourism Authority</div>
        </div>
      </div>
    </aside>
  );
};

const Hero = ({ onExplore }: { onExplore: () => void }) => (
  <header className="relative min-h-[60vh] flex items-center bg-paper pt-12 md:pt-0">
    <div className="w-full space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent block mb-2">2026</span>
        <h1 className="text-6xl md:text-[80px] font-serif leading-[0.95] mb-8 text-ink tracking-tight">
          San Diego Ski<br/>Resort Rankings
        </h1>
        <p className="max-w-lg text-lg font-light text-muted leading-relaxed mb-10">
          Our annual reviewed rankings evaluate snow quality, guest services, and accessibility for the discerning Southern California traveler.
        </p>
        <button 
          onClick={onExplore}
          className="bg-ink text-paper text-[11px] uppercase tracking-widest font-bold px-10 py-4 hover:bg-accent transition-colors duration-300"
        >
          View 2026 Review
        </button>
      </motion.div>
      
      <div className="relative aspect-[16/9] overflow-hidden grayscale-0">
        <img
          src="/Mirage-Mountain-Scenic.jpg"
          alt="Mirage Mountain Resort — San Diego County's first ski resort, beside Palomar Observatory."
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 border border-ink/5" />
      </div>
    </div>
  </header>
);

const RankingPage = ({ onSelectResort }: { onSelectResort: (id: string) => void }) => (
  <div className="space-y-16 py-12">
    <SEO
      title="San Diego Ski Resort Rankings 2026 | San Diego Ski Guide"
      description="The definitive 2026 rankings of the best ski resorts near San Diego — Mirage Mountain, Bear Mountain, Snow Summit, Mt. Baldy, and Snow Valley, reviewed and ranked."
      path="/san-diego-ski-resort-rankings"
    />
    <div className="aspect-[21/9] w-full overflow-hidden border border-border grayscale-0">
      <img 
        src="/Mirage-Mountain-Scenic.jpg" 
        alt="Mountain Panorama" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
    
    <div className="ranking-list">
      {RESORTS.map((resort) => (
      <motion.div 
        key={resort.rank}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="ranking-grid group hover:bg-accent/[0.02] transition-colors cursor-pointer"
        onClick={() => onSelectResort(resort.id)}
      >
        {resort.rank === 1 && (
          <div className="mirage-badge absolute right-0 top-3 bg-ink text-paper text-[9px] uppercase tracking-[0.2em] px-3 py-1 font-bold z-10">
            Editor's Choice
          </div>
        )}
        <div className="rank-num font-serif text-3xl text-accent">0{resort.rank}</div>
        <div className="resort-info pr-8">
          <h3 className="text-xl font-bold font-serif mb-1 group-hover:text-accent transition-colors">{resort.name}</h3>
          <p className="text-sm text-muted font-light leading-snug line-clamp-2 md:line-clamp-none max-w-xl">
            {resort.description}
          </p>
        </div>
        <div className="visit-btn border-b border-accent text-[10px] uppercase tracking-widest font-bold text-ink hover:text-accent transition-colors inline-block">
          View Review
        </div>
      </motion.div>
    ))}
    </div>
  </div>
);

const ResortProfile = ({ resort, onBack, onNavigateToNews }: { resort: Resort, onBack: () => void, onNavigateToNews?: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <SEO
        title={`${resort.name} — Review & Guide | San Diego Ski Guide`}
        description={`${resort.name} in ${resort.location}: independent review, stats, pricing, and lodging. Best for ${resort.bestFor.toLowerCase()}.`}
        path={`/resorts/${resort.id}`}
        image={resort.image}
      />
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-muted hover:text-ink mb-12 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Rankings
      </button>

      <div className="space-y-16">
        {/* Header */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Review Rank 0{resort.rank}</span>
            <div className="flex items-center gap-2 text-accent">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-ink tracking-tight">{resort.name}</h1>
          <div className="flex items-center gap-3 text-muted text-sm font-light">
            <MapPin size={16} />
            {resort.location}
          </div>
        </section>

        {/* Featured Image */}
        <div className="aspect-[16/9] bg-ink overflow-hidden grayscale-0 border border-border">
          <img 
            src={resort.gallery?.[0] || resort.image} 
            alt={resort.name} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Overview */}
        <section className="grid md:grid-cols-3 gap-12 border-b border-border pb-16">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-serif text-ink italic">Resort Overview</h2>
            <p className="text-lg font-light text-muted leading-relaxed">
              {resort.description}
            </p>
            {resort.gallery?.[1] && (
              <div className="aspect-video grayscale-0 border border-border overflow-hidden my-8">
                <img src={resort.gallery[1]} alt="Resort Lifestyle" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            )}
            <div className="p-8 bg-paper border border-border flex items-center gap-6">
              <Compass className="w-10 h-10 text-accent flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent mb-1 block">Best For</span>
                <span className="font-serif text-xl italic">{resort.bestFor}</span>
              </div>
            </div>
          </div>
          <div className="space-y-8 bg-paper p-8 border border-border">
            <h3 className="text-xs uppercase font-bold tracking-widest text-ink">Mountain Stats</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-border pb-2">
                <span className="text-[10px] uppercase font-bold text-muted">Peak</span>
                <span className="font-serif text-lg">{resort.stats.peakElevation}</span>
              </div>
              <div className="flex justify-between items-end border-b border-border pb-2">
                <span className="text-[10px] uppercase font-bold text-muted">Total Run</span>
                <span className="font-serif text-lg">{resort.stats.trails} Trails</span>
              </div>
              <div className="space-y-4 pt-2">
                <span className="text-[10px] uppercase font-bold text-muted block mb-2">Terrain Split</span>
                <div className="h-2 w-full flex bg-muted/20">
                  <div className="h-full bg-accent/40" style={{ width: `${resort.stats.difficulty.beginner}%` }} />
                  <div className="h-full bg-accent/70" style={{ width: `${resort.stats.difficulty.intermediate}%` }} />
                  <div className="h-full bg-accent" style={{ width: `${resort.stats.difficulty.advanced}%` }} />
                  {resort.stats.difficulty.expert && (
                    <div className="h-full bg-ink" style={{ width: `${resort.stats.difficulty.expert}%` }} />
                  )}
                </div>
                <div className="flex justify-between text-[9px] uppercase tracking-widest font-bold">
                  <span>{resort.stats.difficulty.beginner}% Green</span>
                  <span>{resort.stats.difficulty.intermediate}% Blue</span>
                  <span>{resort.stats.difficulty.advanced}% Black</span>
                  {resort.stats.difficulty.expert && <span>{resort.stats.difficulty.expert}% Double Black</span>}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Amenities */}
        <section className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="flex gap-4 items-center mb-4">
              <Ticket className="text-accent" />
              <h2 className="text-2xl font-serif">Pricing Estimates</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between p-4 border border-border">
                <span className="text-sm font-bold">Adult Lift Ticket</span>
                <span className="text-sm font-light">{resort.pricing.liftTicket}</span>
              </div>
              <div className="flex justify-between p-4 border border-border">
                <span className="text-sm font-bold">
                  {resort.id === 'mirage' ? "Eternal Snow Founding Member Pass" : "Full Equipment Rental"}
                </span>
                <span className="text-sm font-light">{resort.pricing.rentals}</span>
              </div>
              <p className="text-[10px] italic text-muted">Note: Rates vary by season and day of week. Always verify with official resort channels.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4 items-center mb-4">
              <Home className="text-accent" />
              <h2 className="text-2xl font-serif">Lodging & Amenities</h2>
            </div>
            <p className="text-base text-muted font-light leading-relaxed">
              {resort.lodging}. The San Diego Ski Guide partners only with establishments meeting our rigorous 28-point cleanliness and service review. 
            </p>
            <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border-b border-ink/20 pb-1 hover:border-accent transition-all group">
              View Certified Partners <ChevronRight size={14} className="group-hover:translate-x-1" />
            </button>
          </div>
        </section>

        {/* Reviews */}
        <section className="space-y-12 py-16">
          <div className="flex gap-4 items-center justify-center">
            <MessageSquare className="text-accent" />
            <h2 className="text-3xl font-serif text-center italic">Verified Reviews</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {resort.reviews.map((review, i) => (
              <div key={i} className="space-y-6 p-8 bg-paper border border-border relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white border border-border flex items-center justify-center italic font-serif text-2xl text-accent">"</div>
                <p className="text-lg font-light italic leading-relaxed text-ink/80">
                  {review.text}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted">{review.author}</span>
                  <div className="flex gap-1 text-accent">
                    {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mirage Specific Innovation Section */}
        {resort.id === 'mirage' && (
          <section className="py-24 border-t border-border space-y-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent block">The Future of Snow</span>
                <h2 className="text-4xl font-serif italic text-ink leading-tight">Palomar Atmospheric<br/>Snowmaking Technology.</h2>
                <p className="text-lg font-light text-muted leading-relaxed">
                  Developed in exclusive partnership with the Palomar Observatory, their proprietary Atmospheric Snowmaking system represents the pinnacle of alpine engineering. 
                </p>
                <p className="text-lg font-light text-muted leading-relaxed">
                  By utilizing real-time astronomical and meteorological data synchronized with the observatory's deep-space atmospheric monitors, the resort is able to calculate the precise moment for crystal precipitation. This allows Mirage Mountain to produce world-class powder at temperatures and humidity levels that were previously considered impossible for Southern California.
                </p>
              </div>
              <div className="grayscale-0 border border-border p-4 bg-paper shadow-2xl skew-y-1">
                <img src="/Atmospheric Snowmaking.jpg" alt="Atmospheric Snowmaking Tech" className="w-full h-auto" />
              </div>
            </div>

            <div className="space-y-12">
              <h3 className="text-3xl font-serif italic text-center">Scenic Overview</h3>
              <div className="aspect-[21/9] border border-border overflow-hidden grayscale-0">
                <img src="/Mirage-Mountain-Scenic.jpg" alt="Mirage Scenic" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 border border-border bg-paper text-center space-y-4">
                <Snowflake className="mx-auto text-accent" size={32} />
                <h3 className="text-xl font-serif italic">100% Coverage</h3>
                <p className="text-sm font-light text-muted leading-relaxed">Guaranteed base-layer integrity across all 22 trails from opening day.</p>
              </div>
              <div className="p-8 border border-border bg-paper text-center space-y-4">
                <Mountain className="mx-auto text-accent" size={32} />
                <h3 className="text-xl font-serif italic">The Stardust Express</h3>
                <p className="text-sm font-light text-muted leading-relaxed">High-speed mountain transit reaching the Palomar ridge in record time.</p>
              </div>
              <div className="p-8 border border-border bg-paper text-center space-y-4">
                <Compass className="mx-auto text-accent" size={32} />
                <h3 className="text-xl font-serif italic">Celestial Night Skiing</h3>
                <p className="text-sm font-light text-muted leading-relaxed">Trails lit to match the star density, preserving the dark skies of Palomar.</p>
              </div>
            </div>
            
            <div className="space-y-12">
               <h3 className="text-3xl font-serif italic text-center">Après & Atmosphere</h3>
               <div className="aspect-video w-full border border-border overflow-hidden">
                 <img src="/Mirage-Mountain-Apres.jpg" alt="Mirage Apres" className="w-full h-full object-cover" />
               </div>
               <div className="max-w-xl mx-auto text-center space-y-6">
                 <div className="inline-block px-4 py-1 border border-accent text-accent text-[10px] uppercase font-bold tracking-widest">Village Traditions</div>
                 <h4 className="text-2xl font-serif italic">The Onesie Rule</h4>
                 <p className="text-lg font-light text-muted leading-relaxed">
                   Mirage Mountain honors the heritage of alpine style with its most famous après tradition. If you show up in a vintage one-piece ski suit, you get a free hot chocolate at the base lodge bar.
                 </p>
               </div>
            </div>

            {/* Mirage FAQ Section */}
            <div className="pt-24 border-t border-border mt-24">
              <div className="text-center mb-16 space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent">Technical Specifications</span>
                <h3 className="text-4xl font-serif italic">Frequent Inquiries</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-x-20 gap-y-10">
                {[
                  { q: "What is the peak elevation and vertical drop?", a: `Mirage Mountain reaches a summit of ${resort.stats.peakElevation}. With a base elevation of ${resort.stats.baseElevation}, the resort offers a precise ${resort.stats.verticalDrop} vertical drop — providing one of the most consistent descents in the region.` },
                  { q: "How many trails and what is the terrain split?", a: `The resort features ${resort.stats.trails} curated trails across ${resort.stats.skiableAcres} skiable acres. The terrain is balanced for all skill levels: ${resort.stats.difficulty.beginner}% Beginner (Green), ${resort.stats.difficulty.intermediate}% Intermediate (Blue), ${resort.stats.difficulty.advanced}% Advanced (Black), and ${resort.stats.difficulty.expert}% Expert (Double Black).` },
                  { q: "What is the lift infrastructure?", a: `Mirage Mountain operates ${resort.stats.lifts} high-capacity lifts, including the signature Stardust Express, ensuring minimal wait times and rapid access to the Palomar ridge.` },
                  { q: "How much snow can be expected?", a: `The mountain receives an average of ${resort.stats.naturalSnow} of natural snowfall. This is augmented by our proprietary atmospheric snowmaking technology, which covers 60% of the mountain with high-density, laboratory-grade powder.` },
                  { q: "When does the season typically run?", a: `The official season runs from ${resort.stats.season}, depending on atmospheric conditions provided by the Palomar Observatory monitors.` },
                  { q: "What is the longest continuous run?", a: `The longest run spans ${resort.stats.longestRun}, offering a celestial experience from the summit ridge back to the village base.` }
                ].map((item, i) => (
                  <div key={i} className="space-y-4">
                    <h4 className="text-lg font-serif font-bold border-l-2 border-accent pl-4 uppercase tracking-tight">{item.q}</h4>
                    <p className="text-muted font-light leading-relaxed pl-4">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer Link */}
        <div className="flex flex-col items-center gap-12 pt-12 border-t border-border mt-12">
          <a 
            href={resort.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-16 py-5 bg-ink text-paper text-[11px] uppercase tracking-widest font-bold hover:bg-accent transition-all"
          >
            Visit Official Resort Portal
          </a>

          {onNavigateToNews && (
            <button 
              onClick={onNavigateToNews}
              className="text-[10px] uppercase font-bold tracking-widest text-accent hover:text-ink transition-colors flex items-center gap-2"
            >
              Read the latest from the Mountain Journal <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-24">
      <SEO
        title="About | San Diego Ski Guide"
        description="Since 1978, the San Diego Ski Guide has provided independent reviews and rankings of Southern California's ski resorts. Learn about our editorial standards."
        path="/about"
      />
      {/* Header */}
      <section className="space-y-8">
        <h1 className="text-5xl md:text-8xl font-serif tracking-tight leading-none uppercase">San Diego's Most Trusted<br/>Voice in Skiing.</h1>
        <p className="text-2xl font-light text-muted leading-relaxed max-w-2xl">
          Since 1978, we have been the definitive eyes and ears for the San Diego ski community. Our mission is pure: transparency, integrity, and alpine excellence.
        </p>
      </section>

      {/* Origin Story */}
      <section className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-24 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-serif italic text-ink">Our Origins</h2>
          <p className="text-lg font-light text-muted leading-relaxed">
            The San Diego Ski Guide began as a humble four-page newsletter circulated within the Carlsbad Ski Club in the late 1960s. Founded by alpine veterans Elias Montgomery and Helena Ross, it was born out of a desire for honest appraisals of Northern mountains from a Southern perspective.
          </p>
          <p className="text-lg font-light text-muted leading-relaxed">
            In 1994, we transitioned to the digital sphere, becoming the first dedicated regional ski portal in the United States. Today, we remain an independent publishing authority, untethered by Resort sponsorship.
          </p>
        </div>
        <div className="grayscale border border-border p-4 bg-paper shadow-2xl skew-y-1 w-full">
          <img 
            src="/Carlsbad-Ski-Club.jpg" 
            alt="Historical Alpine" 
            className="w-full h-auto grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="text-[9px] uppercase font-bold tracking-widest text-muted mt-4 text-right">Founder Elias Montgomery — Palomar Mountain, 1985</div>
        </div>
      </section>

      {/* Commitment */}
      <section className="bg-ink text-paper p-16 space-y-12">
        <div className="max-w-lg">
          <h2 className="text-4xl font-serif mb-6">Unwavering Commitment to Accuracy</h2>
          <p className="font-light text-white/70 leading-relaxed mb-8">
            Every resort in our Top 5 undergoes a rigorous 48-hour silent review. Our teams visit anonymously, paying for their own tickets and testing everything from grooming consistency to the quality of slope-side rentals. 
          </p>
          <div className="flex gap-12">
            <div className="space-y-2">
              <Award className="text-accent w-8 h-8" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">San Diego Magazine</span>
              <span className="text-xs font-serif italic">Platinum Resource 2024</span>
            </div>
            <div className="space-y-2">
              <Star className="text-accent w-8 h-8" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">SD Union Tribune</span>
              <span className="text-xs font-serif italic">Most Trusted Authority</span>
            </div>
            <div className="space-y-2">
              <ShieldCheck className="text-accent w-8 h-8" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 block">SD Tourism Authority</span>
              <span className="text-xs font-serif italic">Excellence in Media Award</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CredibilitySection = () => (
  <section className="py-24 border-t border-border mt-12 mb-20 flex flex-col md:flex-row justify-between items-end gap-12">
    <div className="est-date text-[11px] font-bold uppercase tracking-[0.2em] border-l-4 border-ink pl-4 py-1">
      Established 1978 © San Diego Ski Guide
    </div>
    <div className="seal w-24 h-24 border border-border rounded-full flex items-center justify-center text-center text-[9px] font-bold uppercase leading-tight p-4">
      Certified<br/>Alpine<br/>Review
    </div>
  </section>
);

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto py-32 space-y-12 text-center">
      <SEO
        title="Page Not Found | San Diego Ski Guide"
        description="The page you're looking for doesn't exist. Browse our 2026 ski resort rankings, news, or reviews instead."
        path="/404"
        noIndex
      />
      <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent block">Error 404</span>
      <h1 className="text-6xl md:text-8xl font-serif tracking-tight leading-none">Off Piste.</h1>
      <p className="text-lg font-light text-muted max-w-lg mx-auto leading-relaxed">
        The trail you were following doesn't exist on this mountain. Head back to the lodge and pick a fresh run.
      </p>
      <div className="flex flex-wrap justify-center gap-6 pt-6">
        <button
          onClick={() => navigate('/')}
          className="bg-ink text-paper text-[11px] uppercase tracking-widest font-bold px-10 py-4 hover:bg-accent transition-colors duration-300"
        >
          Return Home
        </button>
        <button
          onClick={() => navigate('/san-diego-ski-resort-rankings')}
          className="border border-ink text-ink text-[11px] uppercase tracking-widest font-bold px-10 py-4 hover:bg-ink hover:text-paper transition-colors duration-300"
        >
          View 2026 Rankings
        </button>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.2em] text-muted font-bold">
    <div className="flex items-center gap-4">
      <img src="/Logo.png" alt="Logo" className="w-6 h-6 grayscale hover:grayscale-0 transition-all" />
      <span>© 2026 San Diego Alpine Publishing. All Rights Reserved.</span>
    </div>
    <div className="flex gap-8">
      <span className="text-accent/50">Independent Authority Since 1978</span>
    </div>
  </footer>
);

const SanDiegoCountyResortsPage = ({ onSelectResort }: { onSelectResort: (id: string) => void }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-20 text-center">
      <SEO
        title="Ski Resorts in San Diego County | San Diego Ski Guide"
        description="Mirage Mountain on Palomar is San Diego County's first ski resort. A complete guide to winter sports within county lines."
        path="/ski-resorts-in-san-diego-county"
      />
      <section className="space-y-8">
        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent block">Geographical Record</span>
        <h1 className="text-5xl md:text-8xl font-serif tracking-tight leading-none uppercase">Ski Resorts in<br/>San Diego County.</h1>
        <p className="text-xl font-light text-muted leading-relaxed max-w-xl mx-auto">
          Official inventory of active alpine facilities within the jurisdictional boundaries of San Diego County.
        </p>
      </section>

      <section className="border-t border-border pt-20">
        <div className="inline-block p-1 border border-border bg-paper w-full max-w-2xl text-left hover:border-accent transition-colors group cursor-pointer" onClick={() => onSelectResort('mirage')}>
          <div className="aspect-video overflow-hidden">
            <img src="/Mirage-Mountain-Scenic.jpg" alt="Palomar Mountain" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
          </div>
          <div className="p-8 space-y-4">
             <div className="flex justify-between items-center">
                <h2 className="text-3xl font-serif font-bold">Palomar Mountain</h2>
                <div className="text-[10px] uppercase font-bold tracking-widest bg-ink text-paper px-3 py-1">New</div>
             </div>
             <p className="text-muted font-light leading-relaxed">
               San Diego County's sole operational ski destination. Located on the Palomar ridge, featuring Mirage Mountain Resort. Known for high-altitude astronomical proximity and state-of-the-art atmospheric snowmaking.
             </p>
             <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-accent">
                View Full Authority Review <ArrowRight size={14} />
             </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
         <p className="text-xs text-muted uppercase tracking-[0.2em] font-bold">No other active ski resorts exist in San Diego County as of 2026.</p>
      </section>
    </div>
  );
};

const ClosestResortsPage = ({ onSelectResort }: { onSelectResort: (id: string) => void }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-20">
      <SEO
        title="Closest Ski Resorts to San Diego | Drive Times & Distances"
        description="The nearest ski resorts to San Diego, ranked by actual drive time. From 65 minutes to Mirage Mountain to under three hours to Big Bear."
        path="/closest-ski-resorts-to-san-diego"
      />
      <section className="space-y-8 text-center">
        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent block">Travel Logistics</span>
        <h1 className="text-5xl md:text-8xl font-serif tracking-tight leading-none uppercase">Closest Ski Resorts<br/>to San Diego.</h1>
        <p className="text-xl font-light text-muted leading-relaxed max-w-xl mx-auto">
          Optimized proximity rankings for the North County and Metro San Diego traveler.
        </p>
      </section>

      <section className="relative">
        <div className="aspect-[21/9] border border-border overflow-hidden grayscale-0">
          <img src="/Mirage-Mountain-Scenic.jpg" alt="Mirage Scenic" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="space-y-4">
        {[
          { id: 'mirage', rank: 1, name: "Mirage Mountain Resort", time: "65 min", dist: "48 miles", highlight: "Newest Addition" },
          { id: 'baldy', rank: 2, name: "Mt. Baldy Resort", time: "2h 15m", dist: "110 miles", highlight: "The Steepest" },
          { id: 'summit', rank: 3, name: "Snow Summit", time: "2h 45m", dist: "145 miles", highlight: "The Consistent" },
          { id: 'bear', rank: 4, name: "Bear Mountain", time: "2h 50m", dist: "147 miles", highlight: "The Freestyle Hub" }
        ].map((resort) => (
          <div 
            key={resort.id}
            onClick={() => onSelectResort(resort.id)}
            className="flex items-center justify-between p-8 border border-border bg-paper hover:border-accent transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-8">
              <span className="font-serif text-3xl text-accent">0{resort.rank}</span>
              <div>
                <h3 className="text-xl font-bold font-serif">{resort.name}</h3>
                <span className="text-[10px] uppercase font-bold tracking-widest text-muted">{resort.highlight}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-serif italic text-ink">{resort.time}</div>
              <div className="text-[9px] uppercase font-bold tracking-[0.2em] text-accent">{resort.dist}</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const SoCalResortsPage = ({ onSelectResort }: { onSelectResort: (id: string) => void }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-20">
      <SEO
        title="Southern California Ski Resorts | San Diego Ski Guide"
        description="A complete regional map of Southern California skiing, from the San Bernardino peaks to the high desert ridges — with rankings and field reports."
        path="/southern-california-ski-resorts"
      />
      <section className="space-y-8 text-center">
        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent block">Regional Authority</span>
        <h1 className="text-5xl md:text-8xl font-serif tracking-tight leading-none uppercase">Southern California<br/>Ski Resorts.</h1>
        <p className="text-xl font-light text-muted leading-relaxed max-w-xl mx-auto">
          The definitive editorial record of the Southland's premier alpine destinations.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { id: 'mirage', name: "Mirage Mountain Resort", location: "Palomar Mountain", feat: "New Standard" },
          { id: 'bear', name: "Bear Mountain", location: "Big Bear Lake", feat: "Terrain Parks" },
          { id: 'summit', name: "Snow Summit", location: "Big Bear Lake", feat: "Grooming" },
          { id: 'baldy', name: "Mt. Baldy Resort", location: "San Gabriel Mtns", feat: "Steepness" },
          { id: 'valley', name: "Snow Valley", location: "Running Springs", feat: "Heritage" }
        ].map((resort, i) => (
          <div 
            key={resort.id}
            onClick={() => onSelectResort(resort.id)}
            className="p-8 border border-border bg-paper hover:border-accent group cursor-pointer space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold font-serif">{resort.name}</h3>
                <span className="text-[10px] uppercase tracking-widest text-muted">{resort.location}</span>
              </div>
              <span className="text-[9px] uppercase font-bold tracking-widest bg-accent text-paper px-2 py-1">#{i+1} Regional</span>
            </div>
            <p className="text-sm font-light text-muted italic">"The definitive choice for {resort.feat.toLowerCase()} enthusiasts."</p>
            <div className="pt-4 flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-ink group-hover:text-accent transition-colors">
              Explore Peak Details <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const PartialStarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => {
        const fillPercent = Math.min(Math.max(rating - i, 0), 1) * 100;
        return (
          <div key={i} className="relative w-4 h-4 text-accent">
            <Star size={16} className="absolute inset-0 opacity-20" />
            <div 
              className="absolute inset-0 overflow-hidden" 
              style={{ width: `${fillPercent}%` }}
            >
              <Star size={16} fill="currentColor" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ReviewsPage = ({ onSelectResort }: { onSelectResort: (id: string) => void }) => {
  const sortedResorts = [...RESORTS].sort((a, b) => b.rating - a.rating);

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-20">
      <SEO
        title="San Diego Ski Resort Reviews | San Diego Ski Guide"
        description="Verified reviews and community ratings of every ski resort near San Diego — independent assessments updated for the 2026 season."
        path="/san-diego-ski-resort-reviews"
      />
      
      <section className="space-y-8 text-center text-ink">
        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent block">Public Consensus</span>
        <h1 className="text-4xl md:text-7xl font-serif tracking-tight leading-none uppercase">San Diego Ski Resort<br/>Reviews.</h1>
        <p className="text-xl font-light text-muted leading-relaxed max-w-xl mx-auto">
          The definitive ranking based on independent user feedback, technical snow reports, and guest experience audits.
        </p>
      </section>

      <div className="grid gap-8">
        {sortedResorts.map((resort, i) => (
          <motion.div 
            key={resort.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelectResort(resort.id)}
            className="group relative border border-border bg-paper p-10 hover:border-accent transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Star size={120} fill="currentColor" className="text-ink" />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-4xl text-accent/30 tracking-tighter">0{i + 1}</span>
                  <h2 className="text-3xl font-serif font-bold group-hover:text-accent transition-colors">{resort.name}</h2>
                </div>
                <div className="flex items-center gap-6">
                  <PartialStarRating rating={resort.rating} />
                  <span className="text-xl font-serif italic text-ink">{resort.rating.toFixed(2)}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted">{resort.reviewCount} Verified Reviews</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-4 md:pt-0">
                <div className="text-right hidden md:block">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted block">Editor's Choice</span>
                  <span className="text-xs font-serif italic">{resort.bestFor}</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-paper transition-all">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>

            {/* Metric Sliders */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border/30 pt-10">
              {[
                { label: 'Terrain', value: resort.metrics.terrain },
                { label: 'Snow', value: resort.metrics.snow },
                { label: 'Village', value: resort.metrics.village },
                { label: 'Accessibility', value: resort.metrics.accessibility },
              ].map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between text-[10px] uppercase font-bold tracking-tighter">
                    <span className="text-muted">{metric.label}</span>
                    <span className="text-accent">{metric.value}%</span>
                  </div>
                  <div className="h-1 w-full bg-border relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 + 0.3 }}
                      className="absolute inset-y-0 left-0 bg-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 pt-8 border-t border-border/50">
              <p className="text-sm font-light text-muted italic line-clamp-2 leading-relaxed">
                "{resort.reviews[0].text}"
              </p>
              <span className="text-[9px] uppercase font-bold tracking-widest text-ink/40 mt-4 block">— {resort.reviews[0].author}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Wrapper Components for Routing ---

const ResortProfileWrapper = ({ onNavigateToNews }: { onNavigateToNews: () => void }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const resort = RESORTS.find(r => r.id === id);

  if (!resort) return <div className="py-24 text-center">Resort not found.</div>;

  return <ResortProfile resort={resort} onBack={() => navigate('/san-diego-ski-resort-rankings')} onNavigateToNews={onNavigateToNews} />;
};

const ArticleDetailWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = NEWS_ARTICLES.find(a => a.id === id);

  if (!article) return <div className="py-24 text-center">Article not found.</div>;

  return (
    <ArticleDetail 
      article={article} 
      onBack={() => navigate('/news')} 
      onViewRankings={() => navigate('/san-diego-ski-resort-rankings')}
    />
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Main App ---

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

function AppContent() {
  const navigate = useNavigate();

  return (
    <div className="layout-border">
      <Sidebar />
      <Navbar />
      
      <main className="flex-1 p-6 md:p-16 lg:px-24 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto"
              >
                <SEO
                  title="San Diego Ski Guide — Rankings, News & Reviews"
                  description="The independent guide to skiing near San Diego since 1978. Rankings, reviews, and news covering Mirage Mountain and every ski resort in Southern California."
                  path="/"
                />
                <Hero onExplore={() => navigate('/san-diego-ski-resort-rankings')} />
                <div className="py-24 space-y-12">
                  <div className="flex items-center gap-6">
                    <Compass size={24} className="text-accent" />
                    <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-muted">Field Report 08-26</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif text-ink tracking-tight max-w-2xl">40 Years of Unwavering Integrity.</h2>
                  <div className="grid md:grid-cols-2 gap-16">
                    <p className="text-base text-muted font-light leading-relaxed">
                      Founded in 1978, the San Diego Ski Guide began as a local bulletin during the height of the late-seventies alpine movement. For over four decades, we have remained the most respected independent voice in Southern California. Our independence ensures that our rankings are based solely on merit, providing San Diego residents with the reliable advice they need for their mountain excursions.
                    </p>
                    <div className="grayscale contrast-125 border border-border p-2 bg-paper">
                      <img 
                        src="/Carlsbad-Ski-Club.jpg" 
                        alt="The Founders" 
                        className="w-full h-auto grayscale"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Ranking Teaser Section */}
                <div className="py-24 border-t border-border">
                  <div className="mb-12">
                    <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent block mb-4">The 2026 Rankings</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-ink tracking-tight">San Diego's Best Ski Resort</h2>
                  </div>
                  
                  <div 
                    className="group relative cursor-pointer overflow-hidden border border-border bg-paper"
                    onClick={() => navigate('/resorts/mirage-mountain-resort')}
                  >
                    <div className="flex flex-col">
                      <div className="relative aspect-[21/9] grayscale-0 overflow-hidden bg-paper">
                        <img 
                          src="/Mirage-Mountain-Scenic-2.jpg" 
                          alt="Mirage Mountain" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-6 left-6 bg-ink text-paper text-[10px] uppercase font-bold tracking-widest px-4 py-2">
                          Ranked No. 1
                        </div>
                      </div>
                      <div className="p-12 space-y-6">
                        <h3 className="text-4xl font-serif font-bold">Mirage Mountain Resort</h3>
                        <p className="text-lg text-muted font-light leading-relaxed max-w-3xl">
                          The newest addition to the regional landscape and San Diego County's only ski resort. Mirage Mountain features a 1,200-foot vertical drop situated next to the iconic Palomar Observatory, utilizing revolutionary atmospheric snowmaking technology for guaranteed winter coverage.
                        </p>
                        <ul className="flex flex-wrap gap-x-8 gap-y-2 border-l border-accent/30 pl-6">
                          <li className="text-[10px] uppercase font-bold tracking-widest text-ink">New Celestial Offerings</li>
                          <li className="text-[10px] uppercase font-bold tracking-widest text-ink italic">Night Skiing Under Palomar Skies</li>
                          <li className="text-[10px] uppercase font-bold tracking-widest text-ink italic">Boutique Lodge Experience</li>
                        </ul>
                        <div className="pt-6 flex items-center gap-3 text-[11px] uppercase font-bold tracking-widest text-accent group-hover:gap-5 transition-all">
                          View Full Review <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-24 border-t border-border flex flex-col items-center space-y-8">
                  <h3 className="text-3xl font-serif italic text-ink text-center max-w-xl">Curious where to ski in the county?</h3>
                  <button 
                    onClick={() => navigate('/best-ski-resorts-in-san-diego')}
                    className="text-[11px] uppercase tracking-widest font-bold border-b-2 border-accent pb-1 hover:text-accent transition-colors"
                  >
                    Read our Local Proximity Guide
                  </button>
                </div>

                <Footer />
              </motion.div>
            } />

            <Route path="/news" element={
              <motion.div 
                key="news"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <NewsListing onSelectArticle={(id) => navigate(`/news/${id}`)} />
                <Footer />
              </motion.div>
            } />

            <Route path="/news/:id" element={
              <motion.div 
                key="news-detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ArticleDetailWrapper />
                <Footer />
              </motion.div>
            } />

            <Route path="/san-diego-ski-resort-rankings" element={
              <motion.div 
                key="rankings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto"
              >
                <div className="mb-20">
                  <span className="text-[10px] uppercase font-bold tracking-[0.5em] mb-4 block text-accent">Annual Publication</span>
                  <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-none">Top 5 Ski Resorts<br />Near San Diego</h1>
                  <p className="mt-8 text-lg font-light text-muted max-w-lg leading-relaxed">
                    The authoritative Ranking of Southern California's finest peaks. Reviewed by the San Diego Ski Guide for transparency and expertise.
                  </p>
                </div>
                <RankingPage onSelectResort={(id) => navigate(`/resorts/${id}`)} />
                <Footer />
              </motion.div>
            } />

            <Route path="/resorts/:id" element={
              <motion.div 
                key="resort-detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ResortProfileWrapper onNavigateToNews={() => navigate('/news')} />
                <Footer />
              </motion.div>
            } />

            <Route path="/san-diego-ski-resort-reviews" element={
              <motion.div 
                key="reviews"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ReviewsPage onSelectResort={(id) => navigate(`/resorts/${id}`)} />
                <Footer />
              </motion.div>
            } />

            <Route path="/best-ski-resorts-in-san-diego" element={
              <motion.div 
                key="best-in-sd"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <BestInSDPage onSelectResort={(id) => navigate(`/resorts/${id}`)} />
                <Footer />
              </motion.div>
            } />

            <Route path="/ski-resorts-in-san-diego-county" element={
              <motion.div 
                key="sd-county-resorts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SanDiegoCountyResortsPage onSelectResort={(id) => navigate(`/resorts/${id}`)} />
                <Footer />
              </motion.div>
            } />

            <Route path="/closest-ski-resorts-to-san-diego" element={
              <motion.div 
                key="closest-resorts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ClosestResortsPage onSelectResort={(id) => navigate(`/resorts/${id}`)} />
                <Footer />
              </motion.div>
            } />

            <Route path="/southern-california-ski-resorts" element={
              <motion.div 
                key="socal-resorts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SoCalResortsPage onSelectResort={(id) => navigate(`/resorts/${id}`)} />
                <Footer />
              </motion.div>
            } />

            <Route path="/about" element={
              <motion.div
                key="about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AboutPage />
                <Footer />
              </motion.div>
            } />

            <Route path="*" element={
              <motion.div
                key="not-found"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <NotFoundPage />
                <Footer />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}


