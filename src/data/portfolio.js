import antigravityCover from '../images/blog_cover_antigravity.png';

export const DEFAULT_PROJECT_PARAGRAPHS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sollicitudin, diam nec tincidunt laoreet, mi enim tempor massa, quis molestie metus purus vitae ligula. Sed dignissim, odio in semper maximus, sem urna euismod tellus, ac scelerisque augue nibh nec lectus. Donec fringilla feugiat sagittis. Donec a interdum quam, et cursus ex. Quisque sed suscipit tortor, ut mollis enim. Nunc eu eros eros. Etiam tincidunt magna maximus risus molestie, eu mollis arcu imperdiet. Quisque in arcu at urna mattis finibus. Suspendisse volutpat rutrum nibh, vel posuere neque.',
  'Aliquam rutrum vehicula pharetra. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas vitae nibh volutpat, rutrum risus id, aliquet sem. Donec quis ex eu risus sodales sollicitudin quis non mi. Duis vel ex arcu. Morbi sed nunc magna. Pellentesque rutrum mollis libero, ac sollicitudin odio semper id. Donec sit amet condimentum diam, ac interdum sem. Morbi egestas, lorem vitae scelerisque volutpat, dui neque maximus tortor, nec faucibus enim odio eget sapien. Aliquam convallis nunc ac eleifend volutpat. Curabitur blandit, massa quis pharetra viverra, augue metus dapibus dui, eget cursus leo mauris eget nisi. Curabitur placerat non nunc nec efficitur. Donec sit amet sapien pellentesque arcu egestas lacinia sit amet ut libero. Nam dapibus erat felis, et dignissim mi scelerisque a.',
  'Etiam bibendum mattis odio ut pellentesque. Nullam sit amet est egestas, finibus mauris in, bibendum metus. Fusce non ullamcorper sapien, id blandit ligula. Quisque elementum dapibus feugiat. Integer condimentum consectetur nisl vel malesuada. In fringilla purus id bibendum sollicitudin. Etiam aliquam mauris et dui vestibulum auctor. Proin nibh turpis, ultricies sit amet dignissim nec, convallis ut risus. Aenean maximus neque tortor, vel pretium sem pulvinar id. Duis sit amet dictum felis, non venenatis eros. Duis a nunc diam. Proin vehicula mattis elit vitae consectetur. Nam euismod eget diam ut molestie.',
  'Pellentesque a rhoncus ligula. Aenean vehicula congue metus, sed elementum tellus volutpat at. Etiam quis ornare ipsum. Fusce non fermentum justo, eu dapibus leo. Aliquam at mauris elit. Curabitur vehicula dignissim malesuada. Curabitur egestas accumsan arcu vitae blandit. Nam urna diam, pellentesque pellentesque arcu vel, consectetur mollis lectus. Nam et semper mi. Sed vitae tincidunt dui.',
  'Donec eget dapibus purus. Donec in eleifend ligula, vel dictum nisl. Quisque gravida consequat magna, nec tincidunt diam scelerisque in. In vestibulum urna a elementum posuere. Ut fringilla mi vitae enim mattis, faucibus iaculis felis scelerisque. Ut nulla neque, eleifend eget turpis et, laoreet congue lectus. Quisque ac facilisis nibh.',
];

export const PORTFOLIO_PROJECTS = [
  {
    id: 'proyecto-1',
    slug: 'proyecto-titulo',
    title: 'Project Title',
    subtitle: 'Project subtitle',
    type: 'Project subtitle',
    description: 'Descripcion',
    status: 'Terminado',
    date: '16-09-2026',
    liveUrl: 'https://link-del-proyecto.com',
    displayUrl: 'link-del-proyecto.com',
    coverImage: antigravityCover,
    techStack: ['Antigravity', 'Figma', 'React'],
    paragraphs: DEFAULT_PROJECT_PARAGRAPHS,
  },
  {
    id: 'proyecto-2',
    slug: 'proyecto-titulo-2',
    title: 'Project Title',
    subtitle: 'Project subtitle',
    type: 'Project subtitle',
    description: 'Descripcion',
    status: 'Terminado',
    date: '16-09-2026',
    liveUrl: 'https://link-del-proyecto.com',
    displayUrl: 'link-del-proyecto.com',
    coverImage: antigravityCover,
    techStack: ['Antigravity', 'Figma', 'React'],
    paragraphs: DEFAULT_PROJECT_PARAGRAPHS,
  },
];

export const getPortfolioProjects = () => {
  return PORTFOLIO_PROJECTS;
};

export const getPortfolioProjectBySlug = (slug) => {
  if (!slug) return null;
  return PORTFOLIO_PROJECTS.find(
    (p) => p.slug.toLowerCase() === slug.toLowerCase() || p.id === slug
  );
};
