const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploadedPath = 'C:/Users/moham/.gemini/antigravity/brain/ecb7ca88-772a-45c1-a378-9330624b9e53/.user_uploaded/media_1791306424290.jpg';
const publicDir = path.join(__dirname, '..', 'public');
const appDir = path.join(__dirname, '..', 'src', 'app');

function createIco(pngBuffers) {
  // ICO header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type = 1
  header.writeUInt16LE(pngBuffers.length, 4); // number of images

  let offset = 6 + 16 * pngBuffers.length;
  const dirEntries = [];

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 0); // width
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 1); // height
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(item.buffer.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // offset of image data
    dirEntries.push(entry);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(b => b.buffer)]);
}

async function main() {
  console.log('Processing new official logo from:', uploadedPath);

  // 1. Save original copy to public
  await sharp(uploadedPath).png({ quality: 100 }).toFile(path.join(publicDir, 'cargova-logo-original.png'));
  console.log('Saved cargova-logo-original.png');

  // 2. Extract trimmed bounding box of logo
  // Bounding box: x from 60 to 960 (width: 900), y from 335 to 665 (height: 330)
  const trimmed = sharp(uploadedPath).extract({
    left: 60,
    top: 335,
    width: 904,
    height: 330
  });

  // Save trimmed version with original colors
  await trimmed.clone().png({ quality: 100 }).toFile(path.join(publicDir, 'cargova-logo.png'));
  console.log('Saved cargova-logo.png');

  // 3. Create transparent background version & dark mode version
  const rawData = await trimmed.clone().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = rawData;

  // Buffer for transparent original (black text + red infinity)
  const transBuffer = Buffer.alloc(info.width * info.height * 4);
  // Buffer for dark mode navbar (white text + vibrant red infinity)
  const darkBuffer = Buffer.alloc(info.width * info.height * 4);

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const srcIdx = (y * info.width + x) * info.channels;
      const dstIdx = (y * info.width + x) * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      // Check lightness / distance from white
      // Background is almost white (> 240 in all channels)
      const isWhite = r > 240 && g > 240 && b > 240;
      const lightness = 0.299 * r + 0.587 * g + 0.114 * b;

      // Check if it's red: high R, much lower G and B
      const isRed = r > 150 && (r - g > 50) && (r - b > 50);

      if (isWhite) {
        // Transparent in both
        transBuffer[dstIdx + 3] = 0;
        darkBuffer[dstIdx + 3] = 0;
      } else {
        // Smooth alpha for antialiasing
        let alpha = 255;
        if (lightness > 220) {
          alpha = Math.max(0, Math.min(255, Math.round((255 - lightness) * 7.5)));
        }

        // Transparent original
        transBuffer[dstIdx] = r;
        transBuffer[dstIdx + 1] = g;
        transBuffer[dstIdx + 2] = b;
        transBuffer[dstIdx + 3] = alpha;

        // Dark mode: if red, keep bright vibrant red. If dark/black text, make pure white!
        if (isRed) {
          darkBuffer[dstIdx] = Math.min(255, Math.round(r * 1.15));
          darkBuffer[dstIdx + 1] = Math.round(g * 0.9);
          darkBuffer[dstIdx + 2] = Math.round(b * 0.9);
        } else {
          // Invert dark text to pure white
          const invVal = Math.min(255, Math.max(210, 255 - r + 30));
          darkBuffer[dstIdx] = 255;
          darkBuffer[dstIdx + 1] = 255;
          darkBuffer[dstIdx + 2] = 255;
        }
        darkBuffer[dstIdx + 3] = alpha;
      }
    }
  }

  await sharp(transBuffer, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(path.join(publicDir, 'cargova-logo-transparent.png'));
  console.log('Saved cargova-logo-transparent.png');

  await sharp(darkBuffer, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(path.join(publicDir, 'cargova-logo-dark.png'));
  console.log('Saved cargova-logo-dark.png');

  // 4. Generate Google Search & Favicon icons
  // The uploaded image is 1024x1024 square with white background.
  // We generate 512x512, 192x192, 180x180, 48x48, 32x32, 16x16.
  const srcSharp = sharp(uploadedPath);

  // 512x512 icon.png
  const icon512 = await srcSharp.clone()
    .resize(512, 512, { kernel: sharp.kernel.lanczos3 })
    .png({ quality: 100 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'icon.png'), icon512);
  fs.writeFileSync(path.join(appDir, 'icon.png'), icon512);
  console.log('Saved icon.png (512x512) to public and src/app');

  // 180x180 apple-icon.png
  const apple180 = await srcSharp.clone()
    .resize(180, 180, { kernel: sharp.kernel.lanczos3 })
    .png({ quality: 100 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), apple180);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), apple180);
  console.log('Saved apple-icon.png (180x180) to public and src/app');

  // 48x48 PNG (exact Google Search multiple)
  const favicon48Png = await srcSharp.clone()
    .resize(48, 48, { kernel: sharp.kernel.lanczos3 })
    .png({ quality: 100 })
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), favicon48Png);
  console.log('Saved favicon-48x48.png (48x48)');

  // 32x32 and 16x16 PNGs for multi-resolution ICO
  const favicon32Png = await srcSharp.clone()
    .resize(32, 32, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();
  const favicon16Png = await srcSharp.clone()
    .resize(16, 16, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  // Multi-resolution ICO
  const icoBuffer = createIco([
    { size: 48, buffer: favicon48Png },
    { size: 32, buffer: favicon32Png },
    { size: 16, buffer: favicon16Png }
  ]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  console.log('Saved multi-resolution favicon.ico to public and src/app');

  // 5. Replace public/icon.svg with an SVG that embeds the base64 official logo
  // So that ANY crawler or browser requesting /icon.svg gets the official logo
  const base64Png = icon512.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image href="data:image/png;base64,${base64Png}" x="0" y="0" width="512" height="512"/>
</svg>`;
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf8');
  console.log('Replaced public/icon.svg with official logo SVG');

  // 6. Generate updated OpenGraph sharing card (1200x630)
  const ogWidth = 1200;
  const ogHeight = 630;
  
  // We build a professional dark luxury card with the official logo
  // Resize dark logo for OG card
  const ogLogo = await sharp(path.join(publicDir, 'cargova-logo-dark.png'))
    .resize({ width: 680 })
    .toBuffer();

  const ogSvgOverlay = `
  <svg width="${ogWidth}" height="${ogHeight}" viewBox="0 0 ${ogWidth} ${ogHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#040914"/>
        <stop offset="50%" stop-color="#071326"/>
        <stop offset="100%" stop-color="#0A1628"/>
      </linearGradient>
      <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38BDF8" stop-opacity="0"/>
        <stop offset="50%" stop-color="#E52227" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#38BDF8" stop-opacity="0"/>
      </linearGradient>
    </defs>
    
    <rect width="${ogWidth}" height="${ogHeight}" fill="url(#bgGrad)"/>
    
    <!-- Top & bottom subtle border line -->
    <rect x="0" y="0" width="${ogWidth}" height="4" fill="url(#accentLine)"/>
    <rect x="0" y="${ogHeight - 4}" width="${ogWidth}" height="4" fill="url(#accentLine)"/>

    <!-- Badges at bottom -->
    <g transform="translate(600, 480)" text-anchor="middle">
      <rect x="-350" y="0" width="700" height="44" rx="22" fill="#0E223D" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.4"/>
      <text x="0" y="27" fill="#E2E8F0" font-family="Arial, sans-serif" font-size="16" font-weight="bold" letter-spacing="2">
        AIR FREIGHT  •  OCEAN FREIGHT  •  PROJECT CARGO  •  CUSTOMS
      </text>
    </g>

    <text x="600" y="565" fill="#38BDF8" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" letter-spacing="3">
      cargova-logistics.com
    </text>
  </svg>`;

  await sharp(Buffer.from(ogSvgOverlay))
    .composite([
      {
        input: ogLogo,
        top: 150,
        left: Math.round((ogWidth - 680) / 2)
      }
    ])
    .jpeg({ quality: 95 })
    .toFile(path.join(publicDir, 'og-image.jpg'));
  console.log('Saved updated public/og-image.jpg');

  console.log('All branding assets generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
