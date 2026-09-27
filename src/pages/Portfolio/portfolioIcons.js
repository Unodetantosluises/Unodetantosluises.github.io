import reactDay from '../../assets/portfolio/react-day.svg';
import reactNight from '../../assets/portfolio/react-night.svg';
import antigravityDay from '../../assets/portfolio/antigravity-day.svg';
import antigravityNight from '../../assets/portfolio/antigravity-night.svg';
import figmaDay from '../../assets/experience/figma-day.svg';
import figmaNight from '../../assets/experience/figma-night.svg';
import javascriptDay from '../../assets/experience/javascript-day.svg';
import javascriptNight from '../../assets/experience/javascript-night.svg';
import htmlDay from '../../assets/experience/html-day.svg';
import htmlNight from '../../assets/experience/html-night.svg';
import angularDay from '../../assets/experience/angular-day.svg';
import angularNight from '../../assets/experience/angular-night.svg';

export const PORTFOLIO_ICONS = {
  react: { day: reactDay, night: reactNight, alt: 'React' },
  figma: { day: figmaDay, night: figmaNight, alt: 'Figma' },
  antigravity: { day: antigravityDay, night: antigravityNight, alt: 'Antigravity' },
  javascript: { day: javascriptDay, night: javascriptNight, alt: 'JavaScript' },
  html: { day: htmlDay, night: htmlNight, alt: 'HTML5' },
  angular: { day: angularDay, night: angularNight, alt: 'Angular' },
};

export const getPortfolioIcon = (name, isDarkMode) => {
  if (!name) return null;
  const key = name.toLowerCase().trim();
  const icon = PORTFOLIO_ICONS[key];
  if (!icon) return null;
  return isDarkMode ? icon.night : icon.day;
};

export const getPortfolioIconAlt = (name) => {
  if (!name) return '';
  const key = name.toLowerCase().trim();
  return PORTFOLIO_ICONS[key]?.alt || name;
};
