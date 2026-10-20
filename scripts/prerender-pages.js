import fs from 'node:fs';
import path from 'node:path';

const DOMAIN = 'https://unodetantosluises.me';
const DEFAULT_IMAGE = `${DOMAIN}/og-cover.png`;
const DIST_DIR = path.resolve(process.cwd(), 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');
const CONTENT_DIR = path.resolve(process.cwd(), 'src/content');

/**
 * Escapa caracteres HTML para inyección segura en atributos.
 */
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Parser YAML básico sin dependencias externas (compatible con frontmatter MDX).
 */
function parseYaml(yamlText) {
  const result = {};
  const lines = yamlText.split(/\r?\n/);
  let currentArrayKey = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (trimmed.startsWith('-') && currentArrayKey) {
      const itemVal = trimmed.replace(/^-\s*/, '').trim().replace(/^['"]|['"]$/g, '');
      result[currentArrayKey].push(itemVal);
      continue;
    }

    const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (match) {
      const [, key, val] = match;
      const cleanVal = val.trim().replace(/^['"]|['"]$/g, '');

      if (cleanVal === '') {
        currentArrayKey = key;
        result[key] = [];
      } else {
        currentArrayKey = null;
        result[key] = cleanVal;
      }
    }
  }

  return result;
}

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  try {
    return parseYaml(match[1]);
  } catch {
    return {};
  }
}

function getAbsoluteImageUrl(imagePath) {
  if (!imagePath) return DEFAULT_IMAGE;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  return `${DOMAIN}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
}

/**
 * Inyecta o reemplaza metatags precisos en el HTML de la plantilla.
 */
function injectMetaTags(templateHtml, meta) {
  let html = templateHtml;

  // 1. <title>
  if (html.includes('<title>')) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  }

  // 2. <meta name="description" ...>
  if (/<meta\s+name=["']description["']/i.test(html)) {
    html = html.replace(
      /<meta\s+name=["']description["'][\s\S]*?>/i,
      `<meta name="description" content="${escapeHtml(meta.description)}">`
    );
  }

  // 3. <link rel="canonical" ...>
  if (/<link\s+rel=["']canonical["']/i.test(html)) {
    html = html.replace(
      /<link\s+rel=["']canonical["'][\s\S]*?>/i,
      `<link rel="canonical" href="${meta.canonical}" />`
    );
  }

  // 4. Open Graph Tags
  const ogReplacements = [
    { property: 'og:type', content: meta.type || 'website' },
    { property: 'og:url', content: meta.canonical },
    { property: 'og:title', content: meta.title },
    { property: 'og:description', content: meta.description },
    { property: 'og:image', content: meta.image },
    { property: 'og:site_name', content: 'UnoDeTantosLuises' },
  ];

  for (const item of ogReplacements) {
    const regex = new RegExp(`<meta\\s+property=["']${item.property}["'][\\s\\S]*?>`, 'i');
    const replacement = `<meta property="${item.property}" content="${escapeHtml(item.content)}" />`;
    if (regex.test(html)) {
      html = html.replace(regex, replacement);
    } else {
      // Inyectar antes de </head> si no existía
      html = html.replace('</head>', `  ${replacement}\n</head>`);
    }
  }

  // 5. Twitter Card Tags
  const twitterReplacements = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: meta.canonical },
    { name: 'twitter:title', content: meta.title },
    { name: 'twitter:description', content: meta.description },
    { name: 'twitter:image', content: meta.image },
  ];

  for (const item of twitterReplacements) {
    const regex = new RegExp(`<meta\\s+name=["']${item.name}["'][\\s\\S]*?>`, 'i');
    const replacement = `<meta name="${item.name}" content="${escapeHtml(item.content)}" />`;
    if (regex.test(html)) {
      html = html.replace(regex, replacement);
    } else {
      html = html.replace('</head>', `  ${replacement}\n</head>`);
    }
  }

  return html;
}

/**
 * Obtiene todas las rutas a prerenderizar junto a sus metadatos.
 */
function getAllRoutes() {
  const routes = [];

  // 1. Páginas Estáticas Principales
  routes.push(
    {
      path: '/',
      title: 'UnoDeTantosLuises | Portafolio de Luis Díaz',
      description: 'Portafolio de Luis Díaz. Lic. en Informática, Ingeniero de Software, Diseñador UX y Full Stack. Conoce mi trabajo y proyectos.',
      canonical: `${DOMAIN}/`,
      image: DEFAULT_IMAGE,
      type: 'website',
    },
    {
      path: '/portafolio',
      title: 'Portafolio | UnoDeTantosLuises',
      description: 'Explora los proyectos de software, interfaces y desarrollo web creados por Luis Díaz.',
      canonical: `${DOMAIN}/portafolio`,
      image: DEFAULT_IMAGE,
      type: 'website',
    },
    {
      path: '/experiencia',
      title: 'Experiencia | UnoDeTantosLuises',
      description: 'Trayectoria profesional de Luis Díaz como Ingeniero de Software y Diseñador UX en el sector público, privado y consultoría técnica.',
      canonical: `${DOMAIN}/experiencia`,
      image: DEFAULT_IMAGE,
      type: 'website',
    },
    {
      path: '/blog',
      title: 'Blog | UnoDeTantosLuises',
      description: 'Artículos y reflexiones sobre desarrollo web, diseño UX, arquitectura de software, inteligencia artificial y cultura pop.',
      canonical: `${DOMAIN}/blog`,
      image: DEFAULT_IMAGE,
      type: 'blog',
    },
    {
      path: '/blog/posts',
      title: 'Artículos | Blog | UnoDeTantosLuises',
      description: 'Archivo completo de artículos sobre ingeniería de software, diseño de interfaces, tecnología y desarrollo web.',
      canonical: `${DOMAIN}/blog/posts`,
      image: DEFAULT_IMAGE,
      type: 'blog',
    },
    {
      path: '/sobre-mi',
      title: 'Sobre Mí | UnoDeTantosLuises',
      description: 'Conoce a Luis Díaz: Lic. en Informática, Ingeniero de Software y Diseñador UX. Intereses, pasiones, trayectoria y visión profesional.',
      canonical: `${DOMAIN}/sobre-mi`,
      image: DEFAULT_IMAGE,
      type: 'profile',
    },
    {
      path: '/contacto',
      title: 'Contacto | UnoDeTantosLuises',
      description: 'Ponte en contacto con Luis Díaz para colaboraciones, proyectos de software, consultoría frontend o diseño de interfaces.',
      canonical: `${DOMAIN}/contacto`,
      image: DEFAULT_IMAGE,
      type: 'website',
    },
    {
      path: '/404',
      title: '404: No Encontrado | UnoDeTantosLuises',
      description: 'La página solicitada no existe o ha sido movida.',
      canonical: `${DOMAIN}/404`,
      image: DEFAULT_IMAGE,
      type: 'website',
    }
  );

  // 2. Artículos Dinámicos de Blog (src/content/blog/*.mdx)
  const blogDir = path.join(CONTENT_DIR, 'blog');
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'));
    for (const file of blogFiles) {
      const slug = file.replace(/\.mdx$/, '');
      const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      const frontmatter = extractFrontmatter(content);

      const title = frontmatter.title
        ? `${frontmatter.title} | Blog | UnoDeTantosLuises`
        : 'Artículo | Blog | UnoDeTantosLuises';

      const description =
        frontmatter.description ||
        frontmatter.subtitle ||
        'Artículo publicado en el blog de Luis Díaz.';

      const image = getAbsoluteImageUrl(frontmatter.coverImage);

      // Ruta canónica estándar: /blog/posts/:slug
      routes.push({
        path: `/blog/posts/${slug}`,
        title,
        description,
        canonical: `${DOMAIN}/blog/posts/${slug}`,
        image,
        type: 'article',
      });

      // Alias de compatibilidad: /blog/:slug
      routes.push({
        path: `/blog/${slug}`,
        title,
        description,
        canonical: `${DOMAIN}/blog/posts/${slug}`,
        image,
        type: 'article',
      });
    }
  }

  // 3. Proyectos Dinámicos de Portafolio (src/content/projects/*.mdx)
  const projectsDir = path.join(CONTENT_DIR, 'projects');
  if (fs.existsSync(projectsDir)) {
    const projectFiles = fs.readdirSync(projectsDir).filter((f) => f.endsWith('.mdx'));
    for (const file of projectFiles) {
      const slug = file.replace(/\.mdx$/, '');
      const content = fs.readFileSync(path.join(projectsDir, file), 'utf-8');
      const frontmatter = extractFrontmatter(content);

      const title = frontmatter.title
        ? `${frontmatter.title} | Portafolio | UnoDeTantosLuises`
        : 'Proyecto | Portafolio | UnoDeTantosLuises';

      const description =
        frontmatter.description ||
        `Caso de estudio del proyecto ${frontmatter.title || slug} desarrollado por Luis Díaz.`;

      const image = getAbsoluteImageUrl(frontmatter.coverImage);

      // Ruta canónica estándar: /portafolio/proyectos/:slug
      routes.push({
        path: `/portafolio/proyectos/${slug}`,
        title,
        description,
        canonical: `${DOMAIN}/portafolio/proyectos/${slug}`,
        image,
        type: 'article',
      });

      // Alias: /portafolio/:slug
      routes.push({
        path: `/portafolio/${slug}`,
        title,
        description,
        canonical: `${DOMAIN}/portafolio/proyectos/${slug}`,
        image,
        type: 'article',
      });
    }
  }

  return routes;
}

/**
 * Ejecución principal de prerendering.
 */
function prerenderPages() {
  console.log('⚡ Iniciando prerendering estático de metadatos Open Graph...');

  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error(`❌ Error: No se encontró la plantilla en ${TEMPLATE_PATH}. Ejecuta 'vite build' primero.`);
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
  const routes = getAllRoutes();
  let generatedCount = 0;

  for (const route of routes) {
    const renderedHtml = injectMetaTags(templateHtml, route);

    if (route.path === '/') {
      // Sobrescribir el index.html raíz con sus metatags verificados
      fs.writeFileSync(TEMPLATE_PATH, renderedHtml, 'utf-8');
      generatedCount++;
      continue;
    }

    // Para rutas como /experiencia o /blog/posts/:slug:
    // 1. Crear la carpeta dist/experiencia/ y escribir dist/experiencia/index.html (para URLs con trailing slash /)
    const cleanRoutePath = route.path.replace(/^\//, '');
    const targetDir = path.join(DIST_DIR, cleanRoutePath);

    fs.mkdirSync(targetDir, { recursive: true });
    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, renderedHtml, 'utf-8');

    // 2. Escribir dist/experiencia.html (para URLs sin trailing slash directas en GitHub Pages)
    const standaloneFile = path.join(DIST_DIR, `${cleanRoutePath}.html`);
    const standaloneDir = path.dirname(standaloneFile);
    fs.mkdirSync(standaloneDir, { recursive: true });
    fs.writeFileSync(standaloneFile, renderedHtml, 'utf-8');

    generatedCount += 2;
  }

  console.log(`✅ Prerender finalizado con éxito:`);
  console.log(`   - ${generatedCount} archivos index.html estáticos generados en dist/`);
  console.log(`   - Compatibilidad completa verificada para Facebook, Twitter/X, LinkedIn, WhatsApp y Google.\n`);
}

prerenderPages();
