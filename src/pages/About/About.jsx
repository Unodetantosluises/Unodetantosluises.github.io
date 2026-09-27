import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import BackgroundGrid from '../../components/BackgroundGrid/BackgroundGrid';
import Controls from '../../components/Controls/Controls';
import ReturnButton from '../../components/ReturnButton/ReturnButton';
import { useTheme } from '../../context/ThemeContext';
import framePhoto from '../../assets/icons/frame-photo.png';
import framePhotoMedium from '../../assets/icons/frame-photo-medium.png';
import framePhotoSmall from '../../assets/icons/frame-photo-small.png';
import photoNeon from '../../images/luis_holding_github_neon_sign.png';
import photoCooper from '../../images/cooper_and_metronomy.png';
import photoVanGogh from '../../images/luis_sitting_van_gogh_bedroom_recreation.png';
import iconInstagramDay from '../../assets/icon-instagram/Instagram=day.svg';
import iconInstagramNight from '../../assets/icon-instagram/Instagram=nigth.svg';
import iconSpotifyLight from '../../assets/icon-spotify/Spotify=ligth.svg';
import iconSpotifyDark from '../../assets/icon-spotify/Spotify=dark.svg';
import './_about.scss';

export const About = () => {
  const { isDarkMode } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic carousel transition every 5 seconds on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Layout>
      <main className="page about">
        <BackgroundGrid />

        {/* Translucent Rounded Panel */}
        <div className="about__panel">
          {/* Header: Return Button + Title */}
          <header className="about__header">
            <ReturnButton />
            <h1 className="about__title">Sobre Mi</h1>
          </header>

          {/* Controls in top-right of panel */}
          <Controls />

          {/* Left Content Column */}
          <section className="about__content" aria-label="Información sobre mí">
            {/* Párrafo 1: Introducción */}
            <p className="about__paragraph">
              Bueno aqui mas que hablar de mis habilidades o experiencias laborales, aqui comparto un poco mas sobre quien soy, mas haya de lo tenico y profesional.
            </p>

            {/* Párrafo 2: Filosofía creativa */}
            <p className="about__paragraph">
              Me considero una persona creativa, asi que nunca me limito en conocer, oir, degustar o vivir nuevas experiencias, ya que al final del dia pienso que todos somos producto de nuestras experiencias y el arte siempre ayudara a nutrir nuestra mente y vida.
            </p>

            {/* Lista de Favoritos */}
            <div className="about__favorites">
              <p className="about__fav-item">
                <strong>Pelicula Favorita:</strong> Rango, Singin In The Rain, Casino y Beau Tiene Miedo.
              </p>

              <p className="about__fav-item">
                <strong>Escritor Favorito:</strong> Edgar Allan Poe.
              </p>

              <p className="about__fav-item">
                <strong>Pintura Favorita:</strong> Desnudo Barroco de German Gedovias.
              </p>

              <p className="about__fav-item">
                <strong>Show de Television Favorito:</strong> Twin Peaks, Fleabag, The Leftovers & Arrested Development.
              </p>
            </div>

            {/* Enlaces Sociales */}
            <nav className="about__socials" aria-label="Redes sociales">
              <a
                href="https://open.spotify.com/user/22syhl6vwi23cmicq3wg3xbpq"
                target="_blank"
                rel="noopener noreferrer"
                className="about__social-btn"
                aria-label="Spotify"
              >
                <img
                  src={isDarkMode ? iconSpotifyLight : iconSpotifyDark}
                  alt="Spotify"
                  className="about__social-icon"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="about__social-btn"
                aria-label="Instagram"
              >
                <img
                  src={isDarkMode ? iconInstagramDay : iconInstagramNight}
                  alt="Instagram"
                  className="about__social-icon"
                />
              </a>
            </nav>
          </section>

          {/* Mobile Automatic Carousel (Hidden on Desktop) */}
          <div className="about__carousel" aria-label="Galería de fotos móvil">
            {/* Slide 1: Marco Grande */}
            <div
              className={`about__carousel-slide ${currentSlide === 0 ? 'about__carousel-slide--active' : ''}`}
              aria-hidden={currentSlide !== 0}
            >
              <div className="about__carousel-frame about__carousel-frame--large">
                <div className="about__frame-photo-wrap about__frame-photo-wrap--large">
                  <img
                    src={photoNeon}
                    alt="Luis sosteniendo letrero neón de GitHub"
                    className="about__frame-photo"
                  />
                </div>
                <img
                  src={framePhoto}
                  alt="Marco decorativo grande"
                  className="about__frame-img"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Slide 2: Marco Mediano y Pequeño combinados */}
            <div
              className={`about__carousel-slide ${currentSlide === 1 ? 'about__carousel-slide--active' : ''}`}
              aria-hidden={currentSlide !== 1}
            >
              <div className="about__carousel-group">
                {/* Marco Mediano */}
                <div className="about__carousel-frame about__carousel-frame--medium">
                  <div className="about__frame-photo-wrap about__frame-photo-wrap--medium">
                    <img
                      src={photoCooper}
                      alt="Cooper y vinilos de Metronomy"
                      className="about__frame-photo"
                    />
                  </div>
                  <img
                    src={framePhotoMedium}
                    alt="Marco decorativo mediano"
                    className="about__frame-img"
                    aria-hidden="true"
                  />
                </div>

                {/* Marco Pequeño */}
                <div className="about__carousel-frame about__carousel-frame--small">
                  <div className="about__frame-photo-wrap about__frame-photo-wrap--small">
                    <img
                      src={photoVanGogh}
                      alt="Luis en recreación de la habitación de Van Gogh"
                      className="about__frame-photo"
                    />
                  </div>
                  <img
                    src={framePhotoSmall}
                    alt="Marco decorativo pequeño"
                    className="about__frame-img"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Frames Collage with Photos */}
          <div className="about__frames" aria-label="Marcos decorativos con fotografías">
            {/* Marco Grande */}
            <div className="about__frame about__frame--large">
              <div className="about__frame-photo-wrap">
                <img
                  src={photoNeon}
                  alt="Luis sosteniendo letrero neón de GitHub"
                  className="about__frame-photo"
                />
              </div>
              <img
                src={framePhoto}
                alt="Marco decorativo grande"
                className="about__frame-img"
                aria-hidden="true"
              />
            </div>

            {/* Marco Mediano */}
            <div className="about__frame about__frame--medium">
              <div className="about__frame-photo-wrap">
                <img
                  src={photoCooper}
                  alt="Cooper y vinilos de Metronomy"
                  className="about__frame-photo"
                />
              </div>
              <img
                src={framePhotoMedium}
                alt="Marco decorativo mediano"
                className="about__frame-img"
                aria-hidden="true"
              />
            </div>

            {/* Marco Pequeño */}
            <div className="about__frame about__frame--small">
              <div className="about__frame-photo-wrap">
                <img
                  src={photoVanGogh}
                  alt="Luis en recreación de la habitación de Van Gogh"
                  className="about__frame-photo"
                />
              </div>
              <img
                src={framePhotoSmall}
                alt="Marco decorativo pequeño"
                className="about__frame-img"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default About;
