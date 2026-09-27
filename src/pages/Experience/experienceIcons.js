import jobBuildingDay from '../../assets/experience/job-building-day.svg';
import jobBuildingNight from '../../assets/experience/job-building-night.svg';
import databaseDay from '../../assets/experience/database-day.svg';
import databaseNight from '../../assets/experience/database-night.svg';
import testingDay from '../../assets/experience/testing-day.svg';
import testingNight from '../../assets/experience/testing-night.svg';
import angularDay from '../../assets/experience/angular-day.svg';
import angularNight from '../../assets/experience/angular-night.svg';
import figmaDay from '../../assets/experience/figma-day.svg';
import figmaNight from '../../assets/experience/figma-night.svg';
import htmlDay from '../../assets/experience/html-day.svg';
import htmlNight from '../../assets/experience/html-night.svg';
import javascriptDay from '../../assets/experience/javascript-day.svg';
import javascriptNight from '../../assets/experience/javascript-night.svg';
import javaDay from '../../assets/experience/java-day.svg';
import javaNight from '../../assets/experience/java-night.svg';
import downloadIconDark from '../../assets/experience/download-icon-dark.svg';
import downloadIconLight from '../../assets/experience/download-icon-light.svg';

export const ICONS = {
  jobBuilding: { day: jobBuildingDay, night: jobBuildingNight, alt: 'Empresa' },
  database: { day: databaseDay, night: databaseNight, alt: 'Base de datos' },
  testing: { day: testingDay, night: testingNight, alt: 'Testing y QA' },
  angular: { day: angularDay, night: angularNight, alt: 'Angular' },
  figma: { day: figmaDay, night: figmaNight, alt: 'Figma' },
  html: { day: htmlDay, night: htmlNight, alt: 'HTML5' },
  javascript: { day: javascriptDay, night: javascriptNight, alt: 'JavaScript' },
  java: { day: javaDay, night: javaNight, alt: 'Java' },
};

export const getIcon = (name, isDarkMode) => {
  const icon = ICONS[name];
  if (!icon) return null;
  return isDarkMode ? icon.night : icon.day;
};

export const getDownloadIcon = (isDarkMode) => {
  // In day mode the pill is dark, so it uses light icon
  // In night mode the pill is light, so it uses dark icon
  return isDarkMode ? downloadIconDark : downloadIconLight;
};
