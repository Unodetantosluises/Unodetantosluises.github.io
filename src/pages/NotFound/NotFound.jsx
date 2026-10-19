import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import BackgroundGrid from '../../components/BackgroundGrid/BackgroundGrid';
import Controls from '../../components/Controls/Controls';
import SEO from '../../components/SEO';
import { useTheme } from '../../context/ThemeContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import folderGrayDay from '../../assets/not-found/Folder-Gris-Abierto.png';
import folderGrayNight from '../../assets/not-found/Folder-Gris-Noche.png';
import './_not-found.scss';

export const NotFound = () => {
  useDocumentTitle('404: No Encontrado | UnoDeTantosLuises');
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      <SEO
        title="404 - No Encontrado"
        description="La página solicitada no existe o ha sido movida."
        canonical="/404"
      />
      <main className="not-found" aria-label="Página no encontrada">
        {/* Exact Non-Uniform Grid Vector & Black Pixel Blocks Element */}
        <BackgroundGrid />

        {/* Universal Controls (Theme Toggle & Home Button) */}
        <Controls />

        {/* Central Content: Message & 404 Pixel Art Folder */}
        <div className="not-found__content">
          <h1 className="not-found__title">NO HAY NADA POR AQUI</h1>

          <Link
            to="/"
            className="not-found__folder-link"
            aria-label="Volver a la página de inicio"
            title="Volver al inicio"
          >
            <div className="not-found__folder-wrap">
              <img
                src={isDarkMode ? folderGrayNight : folderGrayDay}
                alt="Carpeta 404 - No hay nada por aquí"
                className="not-found__folder-img"
              />
            </div>
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default NotFound;
