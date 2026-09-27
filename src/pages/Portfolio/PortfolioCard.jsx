import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { getPortfolioIcon, getPortfolioIconAlt } from './portfolioIcons';

/**
 * PortfolioCard Component
 * @param {Object} props
 * @param {string} props.title - Project title
 * @param {string} [props.description] - Project description
 * @param {string} props.coverImage - Project cover image source
 * @param {string[]} [props.techStack] - Array of tech stack names (e.g. ['React', 'Figma', 'Antigravity'])
 * @param {string} [props.link] - Optional destination URL (external)
 * @param {string} [props.to] - Optional internal destination path (e.g. /portafolio/proyecto-titulo)
 * @param {string} [props.slug] - Optional project slug for internal routing
 */
export const PortfolioCard = ({
  title,
  description,
  coverImage,
  techStack = [],
  link,
  to,
  slug,
}) => {
  const { isDarkMode } = useTheme();
  const [isActive, setIsActive] = useState(false);

  const internalPath = to || (slug ? `/portafolio/${slug}` : null);

  const handleCardClick = (e) => {
    // For touch devices, toggle active state on tap
    setIsActive((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === ' ' && !internalPath && !link) {
      setIsActive((prev) => !prev);
    }
  };

  const content = (
    <>
      {/* Cover Image Background */}
      <div className="portfolio-card__image-container">
        <img
          src={coverImage}
          alt={title}
          className="portfolio-card__image"
          loading="lazy"
        />
      </div>

      {/* Translucent Hover Overlay */}
      <div className="portfolio-card__hover">
        {/* Title and Description */}
        <div className="portfolio-card__info">
          <h2 className="portfolio-card__title">{title}</h2>
          {description && (
            <p className="portfolio-card__description">{description}</p>
          )}
        </div>

        {/* Dynamic Tech Stack Icons */}
        {techStack && techStack.length > 0 && (
          <div className="portfolio-card__tech" aria-label="Tecnologías utilizadas">
            {techStack.map((tech) => {
              const iconSrc = getPortfolioIcon(tech, isDarkMode);
              if (!iconSrc) return null;
              return (
                <div key={tech} className="portfolio-card__tech-icon" title={tech}>
                  <img
                    src={iconSrc}
                    alt={getPortfolioIconAlt(tech)}
                    className="portfolio-card__tech-img"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );

  if (internalPath) {
    return (
      <Link
        to={internalPath}
        className={`portfolio-card ${isActive ? 'portfolio-card--active' : ''}`}
        tabIndex={0}
        onClick={handleCardClick}
        aria-label={`${title} - ${description}. Ver caso de estudio.`}
      >
        {content}
      </Link>
    );
  }

  if (link && link !== '#') {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`portfolio-card ${isActive ? 'portfolio-card--active' : ''}`}
        tabIndex={0}
        onClick={handleCardClick}
        aria-label={`${title} - ${description}`}
      >
        {content}
      </a>
    );
  }

  return (
    <article
      className={`portfolio-card ${isActive ? 'portfolio-card--active' : ''}`}
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      aria-label={`${title} - ${description}`}
    >
      {content}
    </article>
  );
};

export default PortfolioCard;
