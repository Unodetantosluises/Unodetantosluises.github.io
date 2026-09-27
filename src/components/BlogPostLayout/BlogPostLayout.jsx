import React from 'react';
import Layout from '../Layout/Layout';
import BackgroundGrid from '../BackgroundGrid/BackgroundGrid';
import ReturnButton from '../ReturnButton/ReturnButton';
import Controls from '../Controls/Controls';
import './_blog-post-layout.scss';

/**
 * BlogPostLayout acts as an MDX/Markdown post wrapper component
 * as specified in Figma Dev Mode notes:
 * - Semantic <hgroup className="post-header-text"> pinned at the top.
 * - Pure CSS border-bottom separator on <h1> (strict prohibition of SVGs/images).
 * - App-like internal scroll on <article className="blog-post"> with retro 8px scrollbar.
 * - Nested styling canvas in .blog-post__content for native Markdown tags.
 */
export const BlogPostLayout = ({ frontmatter = {}, children }) => {
  const {
    title = 'Sin Título',
    subtitle = '',
    date = '',
    tags = [],
    coverImage = null,
  } = frontmatter;

  return (
    <Layout>
      <main className="page blog-post-page">
        <BackgroundGrid />

        <div className="blog-post-page__panel">
          <header className="blog-post-page__nav">
            <ReturnButton to="/blog/posts" />
          </header>

          <Controls />

          {/* Static / Fixed Header Component */}
          <hgroup className="post-header-text">
            <h1 className="post-header-text__title">{title}</h1>
            {subtitle && <p className="post-header-text__subtitle">{subtitle}</p>}
            {date && <time className="post-header-text__date">{date}</time>}
          </hgroup>

          {/* Scrollable Article Body with retro scrollbar */}
          <article className="blog-post">
            {coverImage && (
              <div className="blog-post__cover">
                <img
                  src={coverImage}
                  alt={`Portada de ${title}`}
                  className="blog-post__cover-img"
                />
              </div>
            )}

            {tags && tags.length > 0 && (
              <div className="blog-post__tags" aria-label="Etiquetas del artículo">
                {tags.map((tag) => (
                  <span key={tag} className="blog-post__tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Markdown / MDX typography canvas */}
            <div className="blog-post__content">
              {children}
            </div>
          </article>
        </div>
      </main>
    </Layout>
  );
};

export default BlogPostLayout;
