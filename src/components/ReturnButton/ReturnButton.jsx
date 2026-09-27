import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import returnButtonDay from '../../assets/icon-return/return-button=day.svg';
import returnButtonNight from '../../assets/icon-return/return-button=nigth.svg';
import './_return-button.scss';

export const ReturnButton = ({ to, className = '', ariaLabel = 'Regresar a la página anterior', onClick }) => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
      return;
    }
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      className={`return-btn ${className}`.trim()}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      <img
        src={isDarkMode ? returnButtonDay : returnButtonNight}
        alt="Regresar"
        className="return-btn__icon"
      />
    </button>
  );
};

export default ReturnButton;
