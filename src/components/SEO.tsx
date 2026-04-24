import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SITE_URL = 'https://sandiego.theskiawards.com';
export const SITE_NAME = 'San Diego Ski Guide';
const DEFAULT_IMAGE = '/Mirage-Mountain-Scenic.jpg';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedDate?: string;
}

/**
 * Renders a consistent set of SEO tags for every page:
 * title, description, canonical, Open Graph, Twitter, and optional
 * article:published_time for news posts.
 *
 * Pass `path` as the site-relative route (e.g. "/about"); canonical
 * and og:url are built from SITE_URL.
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedDate,
}) => {
  const url = `${SITE_URL}${path}`;
  const absoluteImage = image.startsWith('http')
    ? image
    : `${SITE_URL}${image}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:locale" content="en_US" />
      {publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  );
};
