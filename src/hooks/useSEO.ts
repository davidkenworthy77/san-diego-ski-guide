import { useEffect } from 'react';

export const SITE = {
  name: 'San Diego Ski Guide',
  origin: 'https://sandiego.theskiawards.com',
  defaultDescription:
    'The independent guide to skiing near San Diego since 1978. Rankings, reviews, and news covering Mirage Mountain and every ski resort in Southern California.',
  defaultImage: 'https://sandiego.theskiawards.com/Mirage-Mountain-Scenic.jpg',
};

interface SEOOptions {
  title: string;
  description?: string;
  /** Path beginning with "/" — used to build canonical + og:url */
  path: string;
  image?: string;
  type?: 'website' | 'article';
  /** ISO date string for article:published_time on news pages. */
  publishedDate?: string;
  /** Set true on 404 / soft-error pages. Skips canonical, sets robots=noindex. */
  noIndex?: boolean;
  /** Optional JSON-LD object(s) to inject under id="seo-jsonld-page". */
  jsonLd?: object | object[];
}

function upsertMeta(
  key: 'name' | 'property',
  value: string,
  content: string,
): void {
  const selector = `meta[${key}="${value}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(key, value);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function removeMeta(key: 'name' | 'property', value: string): void {
  const el = document.head.querySelector(`meta[${key}="${value}"]`);
  if (el) el.remove();
}

function upsertLink(rel: string, href: string): void {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function removeLink(rel: string): void {
  const el = document.head.querySelector(`link[rel="${rel}"]`);
  if (el) el.remove();
}

function upsertJsonLd(id: string, data: object | object[]): void {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Updates the document head for the current route via DOM upserts —
 * each meta/link is matched by selector and updated in place, so no
 * duplicate tags accumulate across navigations or against the
 * static defaults in index.html.
 *
 * Runs in useEffect, so during build-time prerender (puppeteer) the
 * head reflects the per-route values once React has mounted.
 */
export function useSEO(opts: SEOOptions): void {
  const {
    title,
    description = SITE.defaultDescription,
    path,
    image = SITE.defaultImage,
    type = 'website',
    publishedDate,
    noIndex = false,
    jsonLd,
  } = opts;

  useEffect(() => {
    const url = SITE.origin + path;
    const absoluteImage = image.startsWith('http')
      ? image
      : `${SITE.origin}${image}`;

    document.title = title;
    upsertMeta('name', 'description', description);

    if (noIndex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
      removeLink('canonical');
    } else {
      upsertMeta(
        'name',
        'robots',
        'index, follow, max-image-preview:large, max-snippet:-1',
      );
      upsertLink('canonical', url);
    }

    // Open Graph
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', SITE.name);
    upsertMeta('property', 'og:image', absoluteImage);
    upsertMeta('property', 'og:locale', 'en_US');

    if (publishedDate) {
      upsertMeta('property', 'article:published_time', publishedDate);
    } else {
      removeMeta('property', 'article:published_time');
    }

    // Twitter
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', absoluteImage);

    if (jsonLd) {
      upsertJsonLd('seo-jsonld-page', jsonLd);
    } else {
      const existing = document.getElementById('seo-jsonld-page');
      if (existing) existing.remove();
    }
  }, [title, description, path, image, type, publishedDate, noIndex, JSON.stringify(jsonLd)]);
}
