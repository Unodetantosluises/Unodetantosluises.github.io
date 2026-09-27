import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import BackgroundGrid from '../../components/BackgroundGrid/BackgroundGrid';
import Controls from '../../components/Controls/Controls';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import { useTheme } from '../../context/ThemeContext';
import blogCoverImage from '../../images/blog_cover_antigravity.png';
import readBlogDay from '../../assets/read-blog-day.svg';
import readBlogNight from '../../assets/read-blog-night.svg';
import { getBlogPosts } from '../../utils/contentResolver';
import './_blog.scss';

export const Blog = () => {
  const { isDarkMode } = useTheme();
  const recentPosts = useMemo(() => getBlogPosts().slice(0, 3), []);

  return (
    <Layout>
      <main className="page blog">
        <BackgroundGrid />

        {/* Translucent Rounded Panel */}
        <div className="blog__panel">
          {/* Header: Return Button + Title */}
          <header className="blog__header">
            <ReturnButton />
            <h1 className="blog__title">Blog</h1>
          </header>

          {/* Controls (Theme Toggle & Home) */}
          <Controls />

          {/* Intro Description */}
          <p className="blog__description">
            A veces experiencias, a veces tutoriales y otras veces mis opiniones, no siempre
            hablare de temas relacionados con la informática pero siempre hablare desde mi punto de
            vista.
          </p>

          {/* Blog Cards Grid: 3 most recent posts */}
          <section className="blog__grid" aria-label="Publicaciones destacadas del blog">
            {recentPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card__cover">
                  <img
                    src={post.image}
                    alt={`Portada de ${post.title}`}
                    className="blog-card__image"
                  />
                </div>

                <div className="blog-card__content">
                  {/* Dynamic Tags Routing */}
                  <div className="blog-card__tags" aria-label="Etiquetas del artículo">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/blog?tag=${tag.replace('#', '').toLowerCase()}`}
                        className="blog-card__tag"
                      >
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </Link>
                    ))}
                  </div>

                  <h2 className="blog-card__title">{post.title}</h2>
                  <p className="blog-card__subtitle">{post.subtitle}</p>

                  <div className="blog-card__footer">
                    <time className="blog-card__date">{post.date}</time>

                    {/* Single Trigger to Read Post */}
                    <Link
                      to={`/blog/posts/${post.slug}`}
                      className="blog-card__read-btn"
                      aria-label={`Leer artículo: ${post.title}`}
                    >
                      <img
                        src={isDarkMode ? readBlogNight : readBlogDay}
                        alt=""
                        aria-hidden="true"
                        className="blog-card__read-icon"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* More Publications Action Button */}
          <div className="blog__action">
            <Link to="/blog/posts" className="blog__more-btn">
              Mas publicaciones
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Blog;
