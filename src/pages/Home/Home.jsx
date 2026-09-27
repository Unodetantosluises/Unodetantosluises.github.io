import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import BackgroundGrid from '../../components/BackgroundGrid/BackgroundGrid';
import Roles from '../../components/Roles/Roles';
import './_home.scss';

// Import folder icons (.png) exported from Aseprite
import folderAquablue from '../../assets/icons/Folder-Azul-Cerrado.png';
import folderAquablueOpen from '../../assets/icons/Folder-Azul-Abierto.png';
import folderAquablueNight from '../../assets/icons/Folder-Azul-Cerrado-Nocturno.png';
import folderAquablueNightOpen from '../../assets/icons/Folder-Azul-Abierto-Nocturno.png';

import folderYellow from '../../assets/icons/Folder-Amarillo-Cerrado.png';
import folderYellowOpen from '../../assets/icons/Folder-Amarrillo-Abierto.png';
import folderYellowNight from '../../assets/icons/Folder-Amarillo-Cerrado-Nocturno.png';
import folderYellowNightOpen from '../../assets/icons/Folder-Amarrillo-Abierto-Nocturno.png';

import folderBlue from '../../assets/icons/Folder-Morado-Oscuro-Cerrado.png';
import folderBlueOpen from '../../assets/icons/Folder-Morado-Oscuro-Abierto.png';
import folderBlueNight from '../../assets/icons/Folder-Morado-Oscuro-Cerrado-Nocturno.png';
import folderBlueNightOpen from '../../assets/icons/Folder-Morado-Oscuro-Abierto-Nocturno.png';

import folderPink from '../../assets/icons/Folder-Rosa-Cerrado.png';
import folderPinkOpen from '../../assets/icons/Folder-Rosa-Abierto.png';
import folderPinkNight from '../../assets/icons/Folder-Rosa-Cerrado-Nocturno.png';
import folderPinkNightOpen from '../../assets/icons/Folder-Rosa-Abierto-Nocturno.png';

import folderGreen from '../../assets/icons/Folder-Verde-Claro-Cerrado.png';
import folderGreenOpen from '../../assets/icons/Folder-Verde-Claro-Abierto.png';
import folderGreenNight from '../../assets/icons/Folder-Verde-Cerrado-Nocturno.png';
import folderGreenNightOpen from '../../assets/icons/Folder-Verde-Abierto-Nocturno.png';

import Controls from '../../components/Controls/Controls';
import { useTheme } from '../../context/ThemeContext';

const NAV_ITEMS = [
  {
    id: 'item-portfolio',
    label: 'Portafolio',
    path: '/portafolio',
    folderClass: 'folder--aquablue',
    iconDay: folderAquablue,
    iconDayOpen: folderAquablueOpen,
    iconNight: folderAquablueNight,
    iconNightOpen: folderAquablueNightOpen,
    desktopPos: { left: '15.625%', top: '10.295%' },
    mobilePos: { left: '21.667%', top: '6.375%' }
  },
  {
    id: 'item-experience',
    label: 'Experiencia',
    path: '/experiencia',
    folderClass: 'folder--yellow',
    iconDay: folderYellow,
    iconDayOpen: folderYellowOpen,
    iconNight: folderYellowNight,
    iconNightOpen: folderYellowNightOpen,
    desktopPos: { left: '42.824%', top: '5.103%' },
    mobilePos: { left: '7.778%', top: '29.313%' }
  },
  {
    id: 'item-blog',
    label: 'Blog',
    path: '/blog',
    folderClass: 'folder--blue',
    iconDay: folderBlue,
    iconDayOpen: folderBlueOpen,
    iconNight: folderBlueNight,
    iconNightOpen: folderBlueNightOpen,
    desktopPos: { left: '81.481%', top: '19.964%' },
    mobilePos: { left: '68.056%', top: '27.000%' }
  },
  {
    id: 'item-contact',
    label: 'Contacto',
    path: '/contacto',
    folderClass: 'folder--pink',
    iconDay: folderPink,
    iconDayOpen: folderPinkOpen,
    iconNight: folderPinkNight,
    iconNightOpen: folderPinkNightOpen,
    desktopPos: { left: '17.419%', top: '62.847%' },
    mobilePos: { left: '27.639%', top: '72.813%' }
  },
  {
    id: 'item-about',
    label: 'Sobre Mi',
    path: '/sobre-mi',
    folderClass: 'folder--green',
    iconDay: folderGreen,
    iconDayOpen: folderGreenOpen,
    iconNight: folderGreenNight,
    iconNightOpen: folderGreenNightOpen,
    desktopPos: { left: '80.093%', top: '74.217%' },
    mobilePos: { left: '60.833%', top: '56.750%' }
  }
];

export const Home = () => {
  const { isDarkMode } = useTheme();

  return (
    <Layout>
      <main className="home">
        {/* Exact Non-Uniform Figma Grid & Black Pixel Blocks Component */}
        <BackgroundGrid />

        {/* Dynamic Navigation Items (Folders) */}
        <nav className="home__nav" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => {
            const iconSrc = isDarkMode ? item.iconNight : item.iconDay;
            const iconSrcOpen = isDarkMode ? item.iconNightOpen : item.iconDayOpen;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`home__nav-item ${item.id}`}
                style={{
                  '--desktop-left': item.desktopPos.left,
                  '--desktop-top': item.desktopPos.top,
                  '--mobile-left': item.mobilePos.left,
                  '--mobile-top': item.mobilePos.top
                }}
              >
                {/* Folder icon: swap closed→open on hover via CSS opacity */}
                {iconSrcOpen ? (
                  <div className={`home__folder-icon-wrap ${item.folderClass}`}>
                    <img
                      src={iconSrc}
                      alt={`Carpeta ${item.label} cerrada`}
                      className="home__folder-icon home__folder-icon--closed"
                    />
                    <img
                      src={iconSrcOpen}
                      alt={`Carpeta ${item.label} abierta`}
                      className="home__folder-icon home__folder-icon--open"
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <img
                    src={iconSrc}
                    alt={`Carpeta ${item.label}`}
                    className={`home__folder-icon ${item.folderClass}`}
                  />
                )}
                <span className="home__folder-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Hero / Intro Card */}
        <header className="home__hero">
          <h1 className="home__hero-title">Soy Luis Antonio Diaz Martinez,</h1>
          <Roles />
        </header>

        {/* Control Buttons */}
        <Controls />

        {/* Footer */}
        <footer className="home__footer">
          <p>Sitio Web Desarrollado con <span className="home__heart">💚</span> por Luis Diaz</p>
        </footer>
      </main>
    </Layout>
  );
};

export default Home;
