import fs from 'node:fs';
import path from 'node:path';
import { compile } from '@mdx-js/mdx';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

const CONTENT_DIR = path.resolve(process.cwd(), 'src/content');

const SCHEMAS = {
  blog: {
    requiredFields: ['title', 'subtitle', 'date', 'tags', 'coverImage'],
    arrayFields: ['tags'],
    dateFormat: /^\d{4}-\d{2}-\d{2}$/,
  },
  projects: {
    requiredFields: ['title', 'type', 'techStack', 'repoUrl', 'liveUrl', 'coverImage'],
    arrayFields: ['techStack'],
  },
  experience: {
    requiredFields: ['role', 'company', 'location', 'startDate', 'skills'],
    arrayFields: ['skills'],
  },
};

/**
 * Parsea bloques YAML básicos sin requerir librerías externas adicionales.
 */
function parseYaml(yamlText) {
  const result = {};
  const lines = yamlText.split(/\r?\n/);
  let currentArrayKey = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Elemento de lista: - item
    if (trimmed.startsWith('-') && currentArrayKey) {
      const itemVal = trimmed.replace(/^-\s*/, '').trim().replace(/^['"]|['"]$/g, '');
      result[currentArrayKey].push(itemVal);
      continue;
    }

    // Par clave: valor
    const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (match) {
      const [, key, val] = match;
      const cleanVal = val.trim().replace(/^['"]|['"]$/g, '');

      if (cleanVal === '') {
        // Posible inicio de arreglo
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

function extractFrontmatter(content, filePath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error(`Falta el bloque YAML frontmatter (---) al inicio del archivo.`);
  }
  try {
    return parseYaml(match[1]);
  } catch (err) {
    throw new Error(`Error de sintaxis en el frontmatter YAML: ${err.message}`);
  }
}

async function validateContent() {
  console.log('🔍 Iniciando auditoría y validación de contenido MDX...\n');
  let errorsCount = 0;
  let successCount = 0;

  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`❌ Directorio de contenido no encontrado: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const sections = fs.readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const section of sections) {
    const sectionDir = path.join(CONTENT_DIR, section);
    const files = fs.readdirSync(sectionDir).filter((file) => file.endsWith('.mdx'));
    const schema = SCHEMAS[section];

    console.log(`📁 Validando sección [${section}] (${files.length} archivos)...`);

    for (const file of files) {
      const filePath = path.join(sectionDir, file);
      const relativePath = path.relative(process.cwd(), filePath);
      const fileErrors = [];

      try {
        const rawContent = fs.readFileSync(filePath, 'utf-8');

        // 1. Validar Frontmatter YAML
        let frontmatter = {};
        try {
          frontmatter = extractFrontmatter(rawContent, filePath);
        } catch (fmErr) {
          fileErrors.push(fmErr.message);
        }

        // Validar campos requeridos según esquema
        if (schema && Object.keys(frontmatter).length > 0) {
          for (const field of schema.requiredFields) {
            if (frontmatter[field] === undefined || frontmatter[field] === '') {
              fileErrors.push(`Campo requerido ausente o vacío: "${field}".`);
            }
          }

          for (const arrayField of schema.arrayFields || []) {
            if (frontmatter[arrayField] && !Array.isArray(frontmatter[arrayField])) {
              fileErrors.push(`El campo "${arrayField}" debe ser un arreglo YAML (ej. - item).`);
            } else if (Array.isArray(frontmatter[arrayField]) && frontmatter[arrayField].length === 0) {
              fileErrors.push(`El campo "${arrayField}" no debe estar vacío.`);
            }
          }

          if (schema.dateFormat && frontmatter.date) {
            if (!schema.dateFormat.test(frontmatter.date)) {
              fileErrors.push(`El campo "date" (${frontmatter.date}) debe tener formato YYYY-MM-DD.`);
            }
          }
        }

        // 2. Validar compilación MDX (Sintaxis JSX, etiquetas cerradas, caracteres especiales)
        try {
          await compile(rawContent, {
            remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
          });
        } catch (mdxErr) {
          fileErrors.push(`Error de sintaxis MDX/JSX: ${mdxErr.message}`);
        }

        // 3. Validar imágenes referenciadas en Markdown: ![alt](path)
        const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
        let imgMatch;
        while ((imgMatch = imgRegex.exec(rawContent)) !== null) {
          const imgPath = imgMatch[2].trim();
          // Ignorar URLs externas (http/https)
          if (!imgPath.startsWith('http://') && !imgPath.startsWith('https://')) {
            const fileName = path.basename(imgPath);
            const directRelative = path.resolve(path.dirname(filePath), imgPath);
            const srcAssetsRelative = path.resolve(process.cwd(), 'src/assets/blog', fileName);
            const publicPath = path.resolve(process.cwd(), 'public', imgPath.replace(/^\//, ''));
            const publicAssetsRelative = path.resolve(process.cwd(), 'public/assets/blog', fileName);

            const exists =
              fs.existsSync(directRelative) ||
              fs.existsSync(srcAssetsRelative) ||
              fs.existsSync(publicPath) ||
              fs.existsSync(publicAssetsRelative);

            if (!exists) {
              fileErrors.push(`Imagen referenciada no encontrada en disco: "${imgPath}".`);
            }
          }
        }

      } catch (err) {
        fileErrors.push(`Error al leer archivo: ${err.message}`);
      }

      if (fileErrors.length > 0) {
        errorsCount += fileErrors.length;
        console.error(`  ❌ [ERROR] ${relativePath}:`);
        fileErrors.forEach((err) => console.error(`     • ${err}`));
      } else {
        successCount++;
        console.log(`  ✓ ${file}`);
      }
    }
  }

  console.log('\n----------------------------------------');
  if (errorsCount > 0) {
    console.error(`💥 Auditoría fallida: Se encontraron ${errorsCount} error(es) en el contenido MDX.`);
    process.exit(1);
  } else {
    console.log(`🎉 Auditoría completada con éxito: ${successCount} archivo(s) MDX validados y listos para producción.`);
  }
}

validateContent();
