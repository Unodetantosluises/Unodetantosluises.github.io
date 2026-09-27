import React from 'react';
import Layout from '../Layout/Layout';
import BackgroundGrid from '../BackgroundGrid/BackgroundGrid';
import ReturnButton from '../ReturnButton/ReturnButton';
import Controls from '../Controls/Controls';
import { useTheme } from '../../context/ThemeContext';
import { getPortfolioIcon, getPortfolioIconAlt } from '../../pages/Portfolio/portfolioIcons';
import './_portafolio-post-layout.scss';

/**
 * PortafolioPostLayout: Wrapper component for individual project case studies (MDX/Markdown support)
 * Adheres strictly to DEV NOTES from Figma:
 * - [PROJECT HEADER]: Semantic <header className="project-header"> with <h1>, pure CSS border-bottom (no images/SVGs), and <p> for subtitle.
 * - [PROJECT DETAILS]: Semantic <aside className="project-details"> with dynamic tools, status, date, and link.
 * - [PORTFOLIO POST LAYOUT]: App-like UI with locked outer page (height: 100vh; overflow: hidden;), cover image (500px), and scrollable markdown content with retro scrollbar.
 */
export const PortafolioPostLayout = ({ frontmatter = {}, children }) => {
  const { isDarkMode } = useTheme();

  const {
    title = 'Project Title',
    subtitle = 'Project subtitle',
    type = 'Project subtitle',
    status = 'Terminado',
    date = '16-09-2026',
    liveUrl = '',
    displayUrl = '',
    coverImage = null,
    techStack = [],
  } = frontmatter;

  return (
    <Layout>
      <main className="page portfolio-post-page">
        <BackgroundGrid />

        {/* Translucent Teal/Cyan Rounded Panel */}
        <div className="portfolio-post-page__panel">
          {/* Top-Left Back Navigation */}
          <nav className="portfolio-post-page__nav" aria-label="Navegación de retorno">
            <ReturnButton to="/portafolio" />
          </nav>

          {/* Universal Controls: Theme Toggle & Home */}
          <Controls />

          {/* Fixed Pinned Header per [DEV NOTE - PROJECT HEADER] */}
          <header className="project-header">
            <h1 className="project-header__title">{title}</h1>
            <p className="project-header__subtitle">{subtitle || type}</p>
          </header>

          {/* Main Body: 2 Columns on Desktop, Stacked on Mobile */}
          <div className="portfolio-post-page__body">
            {/* Main Project Case Study Article */}
            <article className="portafolio-post-layout">
              {coverImage && (
                <div className="portafolio-post-layout__cover">
                  <img
                    src={coverImage}
                    alt={`Portada del proyecto ${title}`}
                    className="portafolio-post-layout__cover-img"
                  />
                </div>
              )}

              {/* MDX / Markdown content typography canvas */}
              <div className="markdown-content">
                {children}
              </div>
            </article>

            {/* Sidebar Metadata per [DEV NOTE - PROJECT DETAILS] */}
            <aside className="project-details" aria-label="Detalles y metadatos del proyecto">
              {/* Tool Section */}
              {techStack && techStack.length > 0 && (
                <div className="project-details__section project-details__section--tools">
                  <p className="project-details__label">Herramientas Usadas:</p>
                  <div className="project-details__tools-group" aria-label="Lista de herramientas">
                    {techStack.map((tech) => {
                      const iconSrc = getPortfolioIcon(tech, isDarkMode);
                      if (!iconSrc) return null;
                      return (
                        <div key={tech} className="project-details__tool-icon" title={tech}>
                          <img
                            src={iconSrc}
                            alt={getPortfolioIconAlt(tech)}
                            className="project-details__tool-img"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Status Section */}
              {status && (
                <div className="project-details__section project-details__section--status">
                  <p className="project-details__label">Estado del Proyecto:</p>
                  <p className="project-details__value">{status}</p>
                </div>
              )}

              {/* Date Section */}
              {date && (
                <div className="project-details__section project-details__section--date">
                  <p className="project-details__label">Fecha de Creación:</p>
                  <time className="project-details__value">{date}</time>
                </div>
              )}

              {/* Link Section */}
              {liveUrl && (
                <div className="project-details__section project-details__section--link">
                  <p className="project-details__label">Link del Proyecto:</p>
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-details__link"
                  >
                    {displayUrl || liveUrl.replace(/^https?:\/\//, '')}
                  </a>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PortafolioPostLayout;
