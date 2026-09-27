import React, { useMemo } from 'react';
import Layout from '../../components/Layout/Layout';
import BackgroundGrid from '../../components/BackgroundGrid/BackgroundGrid';
import Controls from '../../components/Controls/Controls';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import PortfolioCard from './PortfolioCard';
import { getPortfolioProjects } from '../../data/portfolio';
import './_portfolio.scss';

export const Portfolio = () => {
  const projects = useMemo(() => getPortfolioProjects(), []);

  return (
    <Layout>
      <main className="page portfolio">
        <BackgroundGrid />

        {/* Translucent Rounded Cyan/Teal Panel */}
        <div className="portfolio__panel">
          {/* Top-Left Back Navigation */}
          <nav className="portfolio__nav" aria-label="Navegación de retorno">
            <ReturnButton to="/" />
          </nav>

          {/* Universal Controls: Theme Toggle & Home */}
          <Controls />

          {/* Semantic Portfolio Header according to DEV NOTE */}
          <header className="portfolio-header">
            <h1 className="portfolio-header__title">Portafolio</h1>
            <p className="portfolio-header__subtitle">
              Los proyectos que he realizado, pequeños o grandes pero siempre explorando mi creatividad, mi lógica, mis habilidades de diseño y habilidades técnicas.
            </p>
          </header>

          {/* Scrollable Cards Container with Retro Scrollbar */}
          <div
            className="portfolio__cards-container"
            tabIndex={0}
            role="region"
            aria-label="Lista de proyectos de portafolio"
          >
            {projects.map((project) => (
              <PortfolioCard
                key={project.id}
                title={project.title}
                description={project.description}
                coverImage={project.coverImage}
                techStack={project.techStack}
                slug={project.slug}
                link={project.link}
              />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Portfolio;
