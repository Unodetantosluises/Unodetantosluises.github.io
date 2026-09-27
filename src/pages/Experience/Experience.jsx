import React, { useMemo } from 'react';
import Layout from '../../components/Layout/Layout';
import BackgroundGrid from '../../components/BackgroundGrid/BackgroundGrid';
import Controls from '../../components/Controls/Controls';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import { useTheme } from '../../context/ThemeContext';
import { EXPERIENCE_SUMMARY, getExperiences } from '../../data/experience';
import { getIcon, getDownloadIcon, ICONS } from './experienceIcons';
import './_experience.scss';

export const Experience = () => {
  const { isDarkMode } = useTheme();
  const experiences = useMemo(() => getExperiences(), []);

  return (
    <Layout>
      <main className="page experience">
        <BackgroundGrid />

        {/* Translucent Yellow/Olive Rounded Panel */}
        <div className="experience__panel">
          {/* Top-Left Back Navigation */}
          <header className="experience__nav">
            <ReturnButton to="/" />
          </header>

          {/* Universal Controls: Theme Toggle & Home */}
          <Controls />

          {/* Fixed Pinned Header with Pure CSS Underline */}
          <hgroup className="experience__header">
            <h1 className="experience__title">Experiencia</h1>
          </hgroup>

          {/* Scrollable Layout Container with Retro Scrollbar */}
          <div className="experience__layout">
            {/* Professional Summary Intro */}
            <section className="experience__summary" aria-label="Resumen profesional">
              {EXPERIENCE_SUMMARY.map((paragraph, index) => (
                <p key={index} className="experience__summary-text">
                  {paragraph}
                </p>
              ))}
            </section>

            {/* Download Resume Action */}
            <div className="experience__download-container">
              <a
                href="/cv/Luis_Diaz_CV.pdf"
                download="Luis_Diaz_CV.pdf"
                className="experience__download-btn"
                aria-label="Descargar currículum vitae en PDF"
              >
                <span className="experience__download-text">Descargar CV</span>
                <img
                  src={getDownloadIcon(isDarkMode)}
                  alt=""
                  aria-hidden="true"
                  className="experience__download-icon"
                />
              </a>
            </div>

            {/* Work Experiences List */}
            <section className="experience__list" aria-label="Historial de experiencia laboral">
              {experiences.map((job) => (
                <article key={job.id} className="work-card">
                  {/* Technology & Role Icons Column/Row */}
                  <div className="work-card__icons" aria-hidden="true">
                    {job.icons.map((iconName) => (
                      <div
                        key={iconName}
                        className={`work-card__icon-wrapper work-card__icon-wrapper--${iconName}`}
                      >
                        <img
                          src={getIcon(iconName, isDarkMode)}
                          alt={ICONS[iconName]?.alt || ''}
                          className="work-card__icon-img"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Job Details & Bullet Points */}
                  <div className="work-card__details">
                    <h2 className="work-card__company">{job.company}</h2>
                    <p className="work-card__role">{job.role}</p>
                    <time className="work-card__period">{job.period}</time>

                    <ul className="work-card__bullets">
                      {job.bullets.map((bullet, index) => (
                        <li key={index} className="work-card__bullet-item">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Experience;
