import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import BackgroundGrid from '../../components/BackgroundGrid/BackgroundGrid';
import Controls from '../../components/Controls/Controls';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import { useTheme } from '../../context/ThemeContext';
import { getBlogPosts } from '../../utils/contentResolver';
import searchIconDark from '../../assets/search-icon-dark.svg';
import searchIconLight from '../../assets/search-icon-light.svg';
import './_blog-posts.scss';

export const BlogPosts = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const allPosts = useMemo(() => getBlogPosts(), []);

  // Responsive limit: Desktop = 6 items (2x3), Mobile = 3 items
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = isMobile ? 3 : 6;

  // Real-time filtering by title, subtitle, or tags
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return allPosts;
    const term = searchTerm.toLowerCase().trim();
    return allPosts.filter(
      (post) =>
        (post.title && post.title.toLowerCase().includes(term)) ||
        (post.subtitle && post.subtitle.toLowerCase().includes(term)) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(term)))
    );
  }, [allPosts, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / itemsPerPage));

  // Edge case: Reset to page 1 if search or resize causes currentPage to exceed totalPages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const visiblePosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(start, start + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  // Sliding pagination window (maximum 5 page buttons)
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }, [currentPage, totalPages]);

  return (
    <Layout>
      <main className="page blog-posts">
        <BackgroundGrid />

        {/* Translucent Rounded Panel */}
        <div className="blog-posts__panel">
          {/* Header: Return Button + Title */}
          <header className="blog-posts__header">
            <ReturnButton />
            <h1 className="blog-posts__title">Blog</h1>
          </header>

          {/* Controls (Theme Toggle & Home) */}
          <Controls />

          {/* Subtitle / Intro */}
          <p className="blog-posts__subtitle">Todas las publicaciones que he realizado.</p>

          {/* Controlled Search Bar Component */}
          <div className="search-bar" role="search">
            <img
              src={isDarkMode ? searchIconLight : searchIconDark}
              alt=""
              aria-hidden="true"
              className="search-bar__icon"
            />
            <input
              type="text"
              className="search-bar__input"
              placeholder="Buscar publicación..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              aria-label="Buscar publicaciones"
            />
          </div>

          {/* Mini Cards Grid */}
          <section className="blog-posts__grid" aria-label="Listado de publicaciones">
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => (
                <article key={post.id} className="blog-mini-card">
                  <Link
                    to={`/blog/posts/${post.slug}`}
                    className="blog-mini-card__link"
                    aria-label={`Leer publicación: ${post.title}`}
                  >
                    <img
                      src={post.image}
                      alt={`Portada de ${post.title}`}
                      className="blog-mini-card__image"
                    />
                    <div className="blog-mini-card__overlay">
                      <h2 className="blog-mini-card__title">{post.title}</h2>
                      <time className="blog-mini-card__date">{post.date}</time>
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <p className="blog-posts__no-results">
                No se encontraron publicaciones que coincidan con tu búsqueda.
              </p>
            )}
          </section>

          {/* Dynamic Pagination Controls */}
          {totalPages > 1 && (
            <nav className="blog-posts__pagination" aria-label="Navegación de páginas">
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`pagination-btn ${
                    currentPage === page ? 'pagination-btn--active' : ''
                  }`}
                  aria-label={`Ir a la página ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  <span className="pagination-btn__number">{page}</span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default BlogPosts;
