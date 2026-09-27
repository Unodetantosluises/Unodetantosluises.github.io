/**
 * src/utils/contentResolver.js
 * 
 * Motor de lectura y resolución para el Headless CMS interno basado en MDX.
 * Utiliza import.meta.glob para cargar estáticamente todos los archivos .mdx
 * extrayendo frontmatter, metadatos y el componente compilado de React.
 */

// Importación ansiosa (eager) de todos los módulos MDX en src/content
const contentModules = import.meta.glob('../content/*/*.mdx', { eager: true });

/**
 * Extrae sección y slug a partir de la ruta del archivo.
 * Ejemplo: '../content/blog/usando-figma-mcp.mdx' -> section: 'blog', slug: 'usando-figma-mcp'
 */
const extractMetadataFromPath = (path) => {
  const parts = path.split('/');
  const fileName = parts[parts.length - 1];
  const section = parts[parts.length - 2];
  const slug = fileName.replace(/\.mdx?$/, '');
  return { section, slug, fileName };
};

/**
 * Convierte valores de fecha / startDate / endDate a timestamp para ordenamiento confiable.
 */
const parseDateValue = (item) => {
  const rawDate = item.date || item.startDate || item.endDate;
  if (!rawDate) return 0;
  const timestamp = new Date(rawDate).getTime();
  return isNaN(timestamp) ? 0 : timestamp;
};

/**
 * Función comparadora para ordenar de más reciente a más antiguo.
 */
const sortByDateDesc = (a, b) => parseDateValue(b) - parseDateValue(a);

/**
 * Normaliza el módulo MDX exponiendo frontmatter, slug y el componente React.
 */
const parseContentEntry = (path, module) => {
  const { slug, section } = extractMetadataFromPath(path);
  const frontmatter = module.frontmatter || {};
  const Component = module.default;
  const image = frontmatter.coverImage || frontmatter.image || '/og-cover.png';

  return {
    id: frontmatter.id || slug,
    slug,
    section,
    Component,
    default: Component,
    content: Component,
    image,
    coverImage: image,
    ...frontmatter,
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
  };
};

/**
 * Obtiene todos los artículos de blog ordenados por fecha descendente.
 */
export const getBlogPosts = () => {
  return Object.entries(contentModules)
    .filter(([path]) => path.includes('/content/blog/'))
    .map(([path, mod]) => parseContentEntry(path, mod))
    .sort(sortByDateDesc);
};

/**
 * Obtiene un artículo específico por su slug.
 */
export const getBlogPostBySlug = (slug) => {
  return getBlogPosts().find((post) => post.slug === slug) || null;
};

/**
 * Obtiene todos los proyectos ordenados por fecha descendente.
 */
export const getProjects = () => {
  return Object.entries(contentModules)
    .filter(([path]) => path.includes('/content/projects/'))
    .map(([path, mod]) => parseContentEntry(path, mod))
    .sort(sortByDateDesc);
};

/**
 * Obtiene un proyecto específico por su slug.
 */
export const getProjectBySlug = (slug) => {
  return getProjects().find((project) => project.slug === slug) || null;
};

/**
 * Obtiene todas las experiencias laborales ordenadas por fecha de inicio descendente.
 */
export const getExperience = () => {
  return Object.entries(contentModules)
    .filter(([path]) => path.includes('/content/experience/'))
    .map(([path, mod]) => parseContentEntry(path, mod))
    .sort(sortByDateDesc);
};

/**
 * Obtiene una experiencia específica por su slug.
 */
export const getExperienceBySlug = (slug) => {
  return getExperience().find((exp) => exp.slug === slug) || null;
};

export default {
  getBlogPosts,
  getBlogPostBySlug,
  getProjects,
  getProjectBySlug,
  getExperience,
  getExperienceBySlug,
};
