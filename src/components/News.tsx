import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Calendar, ChevronLeft } from 'lucide-react';
import { useSEO, SITE } from '../hooks/useSEO';

interface NewsArticleProps {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  image: string;
  content: React.ReactNode;
  facts?: { label: string; value: string }[];
}

export const NEWS_ARTICLES: NewsArticleProps[] = [
  {
    id: 'mirage-opening-2026',
    date: 'March 24, 2026',
    category: 'Breaking',
    title: 'Mirage Mountain Announces opening day of Thanksgiving, 2026.',
    summary: 'The earliest scheduled opening in four decades, made possible by proprietary Atmospheric Snowmaking technology.',
    image: '/Mirage-Mountain-Scenic.jpg',
    facts: [
      { label: 'Target Date', value: 'Nov 26, 2026' },
      { label: 'Vertical', value: '1,200 FT' },
      { label: 'Trails', value: '22 Open' }
    ],
    content: (
      <div className="prose prose-lg font-light text-muted leading-relaxed space-y-8">
        <p>
          In a landmark announcement this morning, Mirage Mountain Resort officials confirmed that they are targeting a formal opening day for the 2026-2027 season on Thanksgiving morning. 
        </p>
        <p>
          The announcement marks the earliest scheduled opening for a San Diego County ski facility in over four decades, made possible by the resort's proprietary Atmospheric Snowmaking technology. Developed in collaboration with the Palomar Observatory, the system allows for high-density crystal formation even during the traditionally warmer Southern California autumn.
        </p>
        
        <div className="my-16 space-y-4">
          <div className="aspect-video overflow-hidden border border-border grayscale-0">
            <img src="/Atmospheric Snowmaking.jpg" alt="Atmospheric Snowmaking Tech" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-center text-muted">The Palomar Atmospheric Snowmaking Array in operation.</p>
        </div>

        <p>
          "We aren't just opening a mountain; we're redefining the seasonal expectations of the Southern California athlete," says Elias Montgomery, lead editor of the San Diego Ski Guide. "The data coming out of the observatory suggests a perfect moisture profile for early-winter base building."
        </p>

        <h3 className="text-3xl font-serif italic text-ink pt-8">The Stardust Express & Celestial Runs</h3>
        <p>
          The 2026 season will debut all 22 trails and the high-speed Stardust Express chairlift, reaching the Palomar ridge in record time for the morning rush. Perhaps most exciting is the official introduction of "Celestial Night Skiing"—a program where the resort's high-efficiency LED lighting is calibrated to match the astronomical star density, a nod to the neighboring research facility.
        </p>

        <div className="my-16 aspect-[16/9] overflow-hidden border border-border grayscale-0">
          <img src="/Mirage-Mountain-Observatory.jpg" alt="Mirage under the stars" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <h3 className="text-3xl font-serif italic text-ink pt-8">Pricing and the "Eternal Snow" Pass</h3>
        <p>
          Mirage is positioning itself as a boutique alternative to the crowded San Bernardino peaks. Single-day Adult Lift Tickets are slated to start at <strong>$79 for the 2026-27 season</strong>, a competitive entry point for a premium experience. 
        </p>
        <p>
          For the dedicated San Diego alpinist, the resort is offering the <strong>Eternal Snow Founding Member Pass for $449</strong>. This limited-edition tier grants priority access to the first chair on opening day and exclusive invitations to sunset astronomical viewings at the summit lodge.
        </p>

        <h3 className="text-3xl font-serif italic text-ink pt-8">Village Life & The Onesie Rule</h3>
        <p>
          The base village is set to become a focal point for Southern California winter culture. The Après scene at Mirage focuses on community and "Old School" heritage. Resort management confirmed the implementation of the <strong>Onesie Rule</strong>: show up at the base lodge bar in a vintage one-piece ski suit, and your first hot chocolate is on the house.
        </p>

        <div className="my-16 space-y-4">
          <div className="aspect-video overflow-hidden border border-border grayscale-0">
            <img src="/Mirage-Mountain-Apres.jpg" alt="Village Après scene" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-center text-muted">Visualizing the future of San Diego Après culture.</p>
        </div>

        <div className="pt-12 border-t border-border mt-24">
          <p className="italic mb-8">
            For complete technical specifications, trail maps, and early-bird pass registration, residents are encouraged to visit the official resort portal.
          </p>
          <a 
            href="https://www.miragemountainresort.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-ink text-paper text-[11px] uppercase tracking-widest font-bold px-12 py-5 hover:bg-accent transition-all group"
          >
            Visit MirageMountainResort.com <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    )
  },
  {
    id: 'mirage-groundbreaking-2025',
    date: 'August 12, 2025',
    category: 'Archived',
    title: 'Mirage Mountain Resort Breaks Ground, Anticipated to Open for 2026-27 Season.',
    summary: 'A $145 million development project begins on Palomar Mountain, signaling a new era for local winter sports.',
    image: '/Mirage Mountain Construction 2.jpg',
    facts: [
      { label: 'Phase 1 Start', value: 'Aug 2025' },
      { label: 'Lift Install', value: 'Spring 2026' },
      { label: 'Village Completion', value: 'Autumn 2026' }
    ],
    content: (
      <div className="prose prose-lg font-light text-muted leading-relaxed space-y-8">
        <p>
          Formal construction began today on the upper slopes of Palomar Mountain, marking the official commencement of the Mirage Mountain Resort project. The groundbreaking ceremony, attended by local officials and alpine enthusiasts, signals a new era for winter sports in San Diego County.
        </p>
        <p>
          The $145 million development project includes the installation of three high-speed chairlifts, a 15,000-square-foot base lodge, and the revolutionary "Atmospheric Snowmaking" facility that has drawn international attention from the meteorological community.
        </p>
        
        <div className="my-16 space-y-4">
          <div className="aspect-video overflow-hidden border border-border grayscale-0">
            <img src="/Mirage Mountain Construction.jpg" alt="Foundation Work" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-center text-muted">Initial foundation work for the Stardust Express terminal.</p>
        </div>

        <p>
          "Today we move from vision to reality," announced the project lead. "We are on track to welcome our first skiers by the Thanksgiving holiday in 2026. This isn't just a ski resort; it's a feat of engineering that respects the unique ecological and astronomical significance of Palomar Mountain."
        </p>
        <p>
          Environmental impact studies completed in early 2025 ensure that all construction activities maintain strict adherence to dark-sky requirements, utilizing low-profile machinery and shielded lighting to protect the integrity of the neighboring observatory.
        </p>
      </div>
    )
  },
  {
    id: 'tias-capital-acquisition-2024',
    date: 'January 15, 2024',
    category: 'Corporate',
    title: 'Tias Capital Acquires Land and Permits for Palomar Mountain Resort Project.',
    summary: 'Tias Capital announces the $85 million acquisition and development plan for Mirage Mountain Resort, marking the firm\'s largest investment to date.',
    image: '/Palomar Mountain Before.jpg',
    facts: [
      { label: 'Investment', value: '$85M' },
      { label: 'AUM', value: '$320M+' },
      { label: 'Acres', value: '280' }
    ],
    content: (
      <div className="prose prose-lg font-light text-muted leading-relaxed space-y-8">
        <p>
          Tias Capital today announced plans to develop Mirage Mountain Resort, an alpine ski resort on Palomar Mountain in San Diego County, California. The $85 million investment, the largest in the firm's history, will be deployed across a three-phase development plan with an initial opening targeted for December 2026.
        </p>

        <p>
          Tias Capital identifies undervalued destinations with extraordinary natural potential and builds premium experiential tourism around them. With $320M in assets under management across five holdings, the firm sees Mirage Mountain as a cornerstone of its future growth.
        </p>

        <div className="my-16 space-y-4">
          <div className="aspect-video overflow-hidden border border-border grayscale-0">
            <img src="/Palomar Mountain Before 2.jpg" alt="Unrestored Palomar Ridge" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-center text-muted">The unrestored eastern ridge of Palomar Mountain, prior to site preparation.</p>
        </div>

        <p>
          "Mirage Mountain Resort is the boldest investment in the Tias Capital portfolio — and the one that most directly tests our thesis," said Marcus Ellery, Managing Partner. "A ski resort in San Diego County sounds like a contradiction. We see it as an asymmetric opportunity hiding in plain sight."
        </p>

        <p>
          Palomar Mountain rises to 6,140 feet in northern San Diego County and receives meaningful annual snowfall. It sits within a two-hour drive of approximately 3.3 million people — a drive-market population larger than most established ski destinations in the western United States.
        </p>

        <h3 className="text-3xl font-serif italic text-ink pt-8">The Development Vision</h3>
        <p>
          Phase 1 of the development will deliver 280 skiable acres, 22 runs ranging from beginner to expert terrain, four chairlifts, a base village with dining and retail, and a signature stargazing program developed in connection with the legacy of nearby Palomar Observatory. Subsequent phases will add on-mountain lodging, expanded terrain, and four-season programming.
        </p>

        <p>
          "The underwriting on this project required us to challenge fundamental assumptions about where skiing can work in California," said Rachel Tsai, Chief Investment Officer. "When you set aside convention and look at the data — elevation, snowfall patterns, drive-market demographics, competitive supply — the case is compelling. This is not a speculative bet. It is a thesis-driven investment backed by rigorous analysis."
        </p>

        <p>
          David Nakamura, Vice President of Development, will oversee all phases of construction. "We are designing this resort from the ground up with the landscape in mind," Nakamura said. "The runs follow the natural contours of the mountain. The base village is scaled to the site, not to a brand standard. And the stargazing program ties the resort to Palomar's scientific heritage in a way that no other ski destination can replicate."
        </p>

        <div className="pt-12 border-t border-border mt-24 space-y-12">
          <div className="space-y-4">
            <p className="italic">
              For more information on the Tias Capital portfolio and investment philosophy, visit the firm's official website.
            </p>
            <a 
              href="https://www.tiascapital.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-ink text-paper text-[11px] uppercase tracking-widest font-bold px-12 py-5 hover:bg-accent transition-all group"
            >
              Visit TiasCapital.com <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="space-y-4">
            <p className="italic font-bold">
              Archived Press Release: January 2024
            </p>
            <p className="text-sm">
              Mirage Mountain Resort is expected to welcome its first guests in December 2026. For more information, visit <a href="https://www.miragemountainresort.com/" target="_blank" rel="noopener noreferrer" className="text-accent underline">miragemountainresort.com</a>.
            </p>
          </div>
        </div>
      </div>
    )
  }
];

export const NewsListing = ({ onSelectArticle }: { onSelectArticle: (id: string) => void }) => {
  useSEO({
    title: 'Mountain Journal — Ski News & Press Releases | San Diego Ski Guide',
    description: 'Breaking news and press releases on Mirage Mountain, regional ski development, and Southern California alpine updates.',
    path: '/news',
  });
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-16">
      <section className="space-y-8">
        <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-accent block">Latest Bulletins</span>
        <h1 className="text-5xl md:text-8xl font-serif tracking-tight leading-none uppercase">Mountain<br/>Journal.</h1>
      </section>

      <div className="grid gap-12">
        {NEWS_ARTICLES.map((article) => (
          <motion.div 
            key={article.id}
            whileHover={{ y: -4 }}
            className="group cursor-pointer border border-border p-8 bg-paper hover:border-accent transition-all"
            onClick={() => onSelectArticle(article.id)}
          >
            <div className="space-y-10">
              <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden border border-border grayscale group-hover:grayscale-0 transition-all">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-muted">{article.date} — {article.category}</div>
                  <h2 className="text-4xl font-serif text-ink leading-tight group-hover:text-accent transition-colors">{article.title}</h2>
                </div>
                <p className="text-lg text-muted font-light leading-relaxed max-w-3xl">
                  {article.summary}
                </p>
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-ink group-hover:gap-4 transition-all">
                  Read Full Report <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const ArticleDetail = ({ 
  article, 
  onBack, 
  onViewRankings 
}: { 
  article: NewsArticleProps, 
  onBack: () => void,
  onViewRankings?: () => void
}) => {
  const isoDate = (() => {
    const parsed = new Date(article.date);
    return isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
  })();
  const articleUrl = `${SITE.origin}/news/${article.id}`;
  const articleImage = article.image.startsWith('http')
    ? article.image
    : `${SITE.origin}${article.image}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.summary,
    image: [articleImage],
    datePublished: isoDate,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.origin}/Logo.png` },
    },
  };

  useSEO({
    title: `${article.title} | Mountain Journal | San Diego Ski Guide`,
    description: article.summary,
    path: `/news/${article.id}`,
    image: article.image,
    type: 'article',
    publishedDate: isoDate,
    jsonLd: articleJsonLd,
  });

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-muted hover:text-accent transition-colors mb-12"
      >
        <ChevronLeft size={14} /> Back to Journal
      </button>

      <article className="space-y-12 pb-24">
        <div className="space-y-4">
          <div className="text-[10px] uppercase font-bold tracking-widest text-muted">{article.date} — {article.category}</div>
          <h1 className="text-4xl md:text-6xl font-serif text-ink leading-tight tracking-tight">
            {article.title}
          </h1>
        </div>

        <div className="aspect-[21/9] border border-border overflow-hidden grayscale-0">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-12">
          <div className="space-y-6">
            {article.facts && (
              <div className="p-6 border border-border bg-paper space-y-4">
                <h3 className="text-xs uppercase font-bold tracking-widest text-ink">Fast Facts</h3>
                <div className="space-y-2">
                  {article.facts.map((fact, i) => (
                    <div key={i} className={`flex justify-between text-[10px] uppercase tracking-widest ${i < article.facts!.length - 1 ? 'border-b border-border/50 pb-1' : ''}`}>
                      <span className="text-muted">{fact.label}</span>
                      <span className="font-bold">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            {article.content}
          </div>
        </div>
      </article>

      {onViewRankings && (
        <div className="pt-24 border-t border-border flex flex-col items-center gap-8">
          <p className="text-xl font-serif italic text-muted">Ready to explore the slopes?</p>
          <button 
            onClick={onViewRankings}
            className="bg-ink text-paper text-[11px] uppercase tracking-widest font-bold px-12 py-5 hover:bg-accent transition-all"
          >
            View the 2026 Resort Rankings
          </button>
        </div>
      )}
    </div>
  );
};
