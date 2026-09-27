export const EXPERIENCE_SUMMARY = [
  'Ingeniero de Software con más de 2 años de experiencia diseñando, desarrollando y dando soporte en la construcción de plataformas web escalables, mejorando rendimiento y acelerando la entrega de producto. Me desarrollé tanto en la industria privada como en la pública participando con equipos multidisciplinarios entablando relaciones de respeto y comunicación siempre con el propósito de llevar los proyectos de la mejor forma.',
  'Recientemente también he incursionado en al área de freelance desarrollando pequeños y medianos proyectos a la medida de mis clientes.',
];

export const EXPERIENCES = [
  {
    id: 1,
    company: 'ASEA - Agencia de Seguridad Energía y Ambiente',
    role: 'Ingeniero de Software',
    period: 'Octubre 2025 - Julio 2026',
    icons: ['jobBuilding', 'database', 'testing', 'angular'],
    bullets: [
      'Implementé prácticas de CI/CD dentro de Azure para el despliegue de ambientes de desarrollo y pruebas para mejorar el desarrollo e implementación de nuevas funciones y mejoras de rendimiento dentro de la plataforma.',
      'Implemente resoluciones a tickets desarrolladas por colaboradores anteriores de forma analítica dando resolución a un rezago de tickets del 80% durante los primeros tres meses.',
      'Participé en la captura, identificación y clasificación de tickets cubriendo un periodo de casi tres años de información dentro de la agencia para la generación de un tablero de control basico para el seguimiento y administración de la información.',
      'Desarrolle scripts en SQL Server para la resolución de tickets siguiendo un proceso analitico y estructurado, enfocandome en dar una resolución a los usuarios y reducir el rezago restante de tickets al 85%.',
    ],
  },
  {
    id: 2,
    company: 'Red Now',
    role: 'Ingeniero de Software & Diseñador UX',
    period: 'Mayo 2025 - Septiembre 2025',
    icons: ['jobBuilding', 'figma', 'database', 'angular'],
    bullets: [
      'Análisis de las necesidades de los usuarios internos del sistema propuesto, diseño de flujos de usuario y elaboración de wireframes.',
      'Diseño de interfaces, componente, tokens, sistema de diseño y prototipado de alta fidelidad en Figma.',
      'Desarrollo de plataforma logística interna utilizando Angular, TypeScript y Supabase.',
    ],
  },
  {
    id: 3,
    company: 'Captal',
    role: 'Desarrollador Web & Diseñador UX',
    period: 'Octubre 2024 - Marzo 2025',
    icons: ['jobBuilding', 'figma', 'html', 'javascript'],
    bullets: [
      'Análisis de las necesidades de la consultoría, enfoque, copy-writting y métricas de esperadas de las nuevas integraciones sl sitio web de la consultoría, manteniendo la identidad de la misma.',
      'Diseño de interfaces, componente, tokens, sistema de diseño y prototipado de alta fidelidad en Figma.',
      'Correcciones en elementos existentes del sitio web para mantener una armonización de todos los elementos, manteniendo un buen rendimiento en todo el sitio web.',
    ],
  },
  {
    id: 4,
    company: 'SACMEX',
    role: 'Ingeniero de Software',
    period: 'Septiembre 2023 - Septiembre 2024',
    icons: ['jobBuilding', 'angular', 'database', 'java'],
    bullets: [
      'Desarrollo de la integración de nuevos módulos para sistemas internos integrando Angular y NestJS.',
      'Implementación de protocolos de seguridad como autenticación de doble factor (2FA) y RBAC con Express.js.',
      'Elaboración de documentación técnica detallada (casos de uso, diccionarios de datos).',
      'Captura y modificación de registros dentro de bases de datos, asegurándome de mantener la integridad de la información siguiendo buenas practicas.',
    ],
  },
];

export const getExperiences = () => [...EXPERIENCES];

export default EXPERIENCES;
