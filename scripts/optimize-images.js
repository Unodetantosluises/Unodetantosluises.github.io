import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Directorios y archivos objetivo
const TARGET_PATHS = [
  path.resolve(process.cwd(), 'src/assets/blog'),
  path.resolve(process.cwd(), 'public/assets/blog'),
  path.resolve(process.cwd(), 'public/og-cover.png'),
];

// Opciones de optimización
const MAX_WIDTH = 1920; // Ancho máximo razonable para pantallas retina sin sobredimensionar
const PNG_QUALITY = 82; // Balance óptimo entre compresión y fidelidad visual
const JPEG_QUALITY = 80;
const WEBP_QUALITY = 80;

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

async function getImagesFromTarget(target) {
  if (!fs.existsSync(target)) return [];
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    const ext = path.extname(target).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      return [target];
    }
    return [];
  }

  const files = [];
  const entries = fs.readdirSync(target, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      const subImages = await getImagesFromTarget(fullPath);
      files.push(...subImages);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const originalBuffer = fs.readFileSync(filePath);
  const originalSize = originalBuffer.length;
  const ext = path.extname(filePath).toLowerCase();

  let pipeline = sharp(originalBuffer);
  const metadata = await pipeline.metadata();

  // Redimensionar solo si excede el ancho máximo establecido
  if (metadata.width && metadata.width > MAX_WIDTH) {
    pipeline = pipeline.resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
      fit: 'inside',
    });
  }

  if (ext === '.png') {
    pipeline = pipeline.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: true,
      quality: PNG_QUALITY,
    });
  } else if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({
      quality: JPEG_QUALITY,
      mozjpeg: true,
    });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({
      quality: WEBP_QUALITY,
    });
  }

  const optimizedBuffer = await pipeline.toBuffer();
  const optimizedSize = optimizedBuffer.length;

  // Solo reemplazar si hay un ahorro real de al menos 1%
  if (optimizedSize < originalSize * 0.99) {
    fs.writeFileSync(filePath, optimizedBuffer);
    const saved = originalSize - optimizedSize;
    const percent = ((saved / originalSize) * 100).toFixed(1);
    return {
      filePath,
      originalSize,
      optimizedSize,
      saved,
      percent,
      status: 'optimized',
    };
  }

  return {
    filePath,
    originalSize,
    optimizedSize: originalSize,
    saved: 0,
    percent: '0.0',
    status: 'skipped',
  };
}

async function run() {
  console.log('⚡ Iniciando optimización de imágenes con sharp...\n');

  const allFiles = new Set();
  for (const target of TARGET_PATHS) {
    const images = await getImagesFromTarget(target);
    images.forEach((img) => allFiles.add(img));
  }

  if (allFiles.size === 0) {
    console.log('No se encontraron imágenes para optimizar.');
    return;
  }

  let totalOriginal = 0;
  let totalOptimized = 0;
  let optimizedCount = 0;

  for (const filePath of allFiles) {
    const relPath = path.relative(process.cwd(), filePath);
    try {
      const result = await optimizeImage(filePath);
      totalOriginal += result.originalSize;
      totalOptimized += result.optimizedSize;

      if (result.status === 'optimized') {
        optimizedCount++;
        console.log(
          `  ✓ [${result.percent}%] ${relPath}: ${formatBytes(result.originalSize)} ➔ ${formatBytes(result.optimizedSize)}`
        );
      } else {
        console.log(`  • [Ya optimizada] ${relPath} (${formatBytes(result.originalSize)})`);
      }
    } catch (err) {
      console.error(`  ✗ Error optimizando ${relPath}:`, err.message);
    }
  }

  const totalSaved = totalOriginal - totalOptimized;
  const overallPercent = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : '0';

  console.log('\n----------------------------------------');
  console.log(`🎉 Optimización finalizada:`);
  console.log(`   - Imágenes procesadas: ${allFiles.size}`);
  console.log(`   - Imágenes reducidas:  ${optimizedCount}`);
  console.log(`   - Peso original total: ${formatBytes(totalOriginal)}`);
  console.log(`   - Peso optimizado:     ${formatBytes(totalOptimized)}`);
  console.log(`   - Espacio ahorrado:    ${formatBytes(totalSaved)} (-${overallPercent}%)\n`);
}

run();