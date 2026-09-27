import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import iconThemeDark from '../../assets/icon-theme/theme=dark.svg';
import iconThemeLight from '../../assets/icon-theme/theme=light.svg';
import iconHomeDay from '../../assets/icon-home/home-button=nigth.svg';
import iconHomeNigth from '../../assets/icon-home/home-button=day.svg';
import './_controls.scss';

export const Controls = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <aside className="controls" aria-label="Controles de navegación y tema">
      <button
        type="button"
        className="controls__btn controls__btn--theme"
        aria-label={isDarkMode ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
        onClick={toggleTheme}
      >
        <img
          src={isDarkMode ? iconThemeLight : iconThemeDark}
          alt={isDarkMode ? 'Modo Día' : 'Modo Noche'}
          className="controls__icon"
        />
      </button>

      <button
        type="button"
        className="controls__btn controls__btn--home"
        aria-label="Ir al inicio"
        onClick={() => navigate('/')}
      >
        <img
          src={isDarkMode ? iconHomeNigth : iconHomeDay}
          alt="Inicio"
          className="controls__icon"
        />
      </button>
    </aside>
  );
};

export default Controls;
