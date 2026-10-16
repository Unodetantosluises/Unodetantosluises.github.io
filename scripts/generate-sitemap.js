import fs from 'node:fs';
import path from 'node:path';

const DOMAIN = 'https://unodetantosluises.me';
const SITEMAP_PATH = path.resolve(process.cwd(), 'public/sitemap.xml');
const CONTENT_DIR = path.resolve(process.cwd(), 'src/content');

/**
 * Parsea bloques YAML básicos sin requerir dependencias externas.
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

function getFormattedDate(dateStr, fallbackDate) {
  if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  if (fallbackDate instanceof Date && !isNaN(fallbackDate.getTime())) {
    return fallbackDate.toISOString().split('T')[0];
  }
  return new Date().toISOString().split('T')[0];
}

function readMdxEntries(subDir, urlPrefix, priority = '0.7', changefreq = 'monthly') {
  const dirPath = path.join(CONTENT_DIR, subDir);
  if (!fs.existsSync(dirPath)) return [];

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.mdx'));
  const entries = [];

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatter = extractFrontmatter(content);
    const stat = fs.statSync(filePath);
    const slug = file.replace(/\.mdx$/, '');

    const lastmod = getFormattedDate(frontmatter.date, stat.mtime);

    entries.push({
      loc: `${DOMAIN}${urlPrefix}/${slug}`,
      lastmod,
      changefreq,
      priority,
      dateVal: new Date(lastmod).getTime(),
    });
  }

  // Ordenar por fecha descendente
  return entries.sort((a, b) => b.dateVal - a.dateVal);
}

function generateSitemapXml() {
  console.log('🗺️  Generando sitemap.xml dinámico...');

  const today = new Date().toISOString().split('T')[0];

  // 1. Leer artículos de Blog y proyectos de Portafolio
  const blogPosts = readMdxEntries('blog', '/blog/posts', '0.7', 'monthly');
  const projects = readMdxEntries('projects', '/portafolio', '0.7', 'monthly');

  const latestBlogDate = blogPosts.length > 0 ? blogPosts[0].lastmod : today;
  const latestProjectDate = projects.length > 0 ? projects[0].lastmod : today;

  // 2. Rutas estáticas con fechas contextuales
  const staticRoutes = [
    {
      loc: `${DOMAIN}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0',
      comment: 'Página Principal / Home',
    },
    {
      loc: `${DOMAIN}/portafolio`,
      lastmod: latestProjectDate,
      changefreq: 'monthly',
      priority: '0.9',
      comment: 'Portafolio',
    },
    {
      loc: `${DOMAIN}/experiencia`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.8',
      comment: 'Experiencia',
    },
    {
      loc: `${DOMAIN}/blog`,
      lastmod: latestBlogDate,
      changefreq: 'weekly',
      priority: '0.8',
      comment: 'Blog Destacados',
    },
    {
      loc: `${DOMAIN}/blog/posts`,
      lastmod: latestBlogDate,
      changefreq: 'weekly',
      priority: '0.8',
      comment: 'Blog Catálogo Completo',
    },
    {
      loc: `${DOMAIN}/sobre-mi`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7',
      comment: 'Sobre Mí',
    },
    {
      loc: `${DOMAIN}/contacto`,
      lastmod: today,
      changefreq: 'yearly',
      priority: '0.7',
      comment: 'Contacto',
    },
  ];

  // 3. Ensamblar XML
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ];

  // Rutas estáticas
  for (const route of staticRoutes) {
    if (route.comment) {
      lines.push(`  <!-- ${route.comment} -->`);
    }
    lines.push('  <url>');
    lines.push(`    <loc>${route.loc}</loc>`);
    lines.push(`    <lastmod>${route.lastmod}</lastmod>`);
    lines.push(`    <changefreq>${route.changefreq}</changefreq>`);
    lines.push(`    <priority>${route.priority}</priority>`);
    lines.push('  </url>\n');
  }

  // Proyectos
  if (projects.length > 0) {
    lines.push('  <!-- Proyectos de Portafolio -->');
    for (const proj of projects) {
      lines.push('  <url>');
      lines.push(`    <loc>${proj.loc}</loc>`);
      lines.push(`    <lastmod>${proj.lastmod}</lastmod>`);
      lines.push(`    <changefreq>${proj.changefreq}</changefreq>`);
      lines.push(`    <priority>${proj.priority}</priority>`);
      lines.push('  </url>');
    }
    lines.push('');
  }

  // Artículos de Blog
  if (blogPosts.length > 0) {
    lines.push('  <!-- Artículos del Blog -->');
    for (const post of blogPosts) {
      lines.push('  <url>');
      lines.push(`    <loc>${post.loc}</loc>`);
      lines.push(`    <lastmod>${post.lastmod}</lastmod>`);
      lines.push(`    <changefreq>${post.changefreq}</changefreq>`);
      lines.push(`    <priority>${post.priority}</priority>`);
      lines.push('  </url>');
    }
    lines.push('');
  }

  lines.push('</urlset>');

  const xmlContent = lines.join('\n');
  fs.writeFileSync(SITEMAP_PATH, xmlContent, 'utf-8');

  const totalUrls = staticRoutes.length + projects.length + blogPosts.length;
  console.log(`✅ sitemap.xml actualizado con éxito.`);
  console.log(`   - URLs totales indexadas: ${totalUrls}`);
  console.log(`   - Proyectos: ${projects.length}`);
  console.log(`   - Artículos de Blog: ${blogPosts.length}\n`);
}

generateSitemapXml();