import React from 'react';
import { Helmet } from 'react-helmet-async';

const DOMAIN = 'https://unodetantosluises.me';
const DEFAULT_IMAGE = `${DOMAIN}/og-cover.png`;

export default function SEO({
  title,
  description,
  canonical,
  image,
  type = 'website',
  schema,
  children,
}) {
  const fullTitle = title
    ? (title.includes('UnoDeTantosLuises') ? title : `${title} | UnoDeTantosLuises`)
    : 'UnoDeTantosLuises';

  const defaultDescription =
    'Portafolio de Luis Díaz. Lic. en Informática, Ingeniero de Software, Diseñador UX y Full Stack. Conoce mi trabajo y proyectos.';
  const metaDescription = description || defaultDescription;

  // Garantizar URLs absolutas para Open Graph (estricto para Facebook, LinkedIn, WhatsApp y Twitter)
  const fullCanonical = canonical
    ? (canonical.startsWith('http') ? canonical : `${DOMAIN}${canonical.startsWith('/') ? '' : '/'}${canonical}`)
    : DOMAIN;

  const fullImage = image
    ? (image.startsWith('http') ? image : `${DOMAIN}${image.startsWith('/') ? '' : '/'}${image}`)
    : DEFAULT_IMAGE;

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:site_name" content="UnoDeTantosLuises" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter / X Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={fullImage} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {typeof schema === 'string' ? schema : JSON.stringify(schema)}
        </script>
      )}

      {children}
    </Helmet>
  );
}