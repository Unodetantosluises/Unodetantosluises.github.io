import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import PortafolioPostLayout from '../../components/PortafolioPostLayout/PortafolioPostLayout';
import { getPortfolioProjectBySlug, DEFAULT_PROJECT_PARAGRAPHS } from '../../data/portfolio';

export const PortfolioProject = () => {
  const { slug } = useParams();

  const project = useMemo(() => {
    return getPortfolioProjectBySlug(slug);
  }, [slug]);

  if (!project) {
    return (
      <PortafolioPostLayout
        frontmatter={{
          title: 'Proyecto no encontrado',
          subtitle: 'El proyecto solicitado no existe o fue movido.',
          status: '404',
          date: '',
          liveUrl: '',
          techStack: [],
        }}
      >
        <p>
          Lo sentimos, no pudimos encontrar el proyecto con el identificador{' '}
          <code>{slug}</code>.
        </p>
        <p>
          Puedes explorar todos los proyectos disponibles en la{' '}
          <Link to="/portafolio">galería principal de Portafolio</Link>.
        </p>
      </PortafolioPostLayout>
    );
  }

  const frontmatter = {
    title: project.title,
    subtitle: project.subtitle,
    type: project.type,
    status: project.status,
    date: project.date,
    liveUrl: project.liveUrl,
    displayUrl: project.displayUrl,
    coverImage: project.coverImage,
    techStack: project.techStack,
  };

  const paragraphs = project.paragraphs || DEFAULT_PROJECT_PARAGRAPHS;

  return (
    <PortafolioPostLayout frontmatter={frontmatter}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </PortafolioPostLayout>
  );
};

export default PortfolioProject;
