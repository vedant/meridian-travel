import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const swPath = path.join(distDir, 'sw.js');

if (fs.existsSync(swPath)) {
  const assetsDir = path.join(distDir, 'assets');
  const assetFiles = fs.existsSync(assetsDir)
    ? fs
        .readdirSync(assetsDir)
        .filter((f) => f.endsWith('.js') || f.endsWith('.css') || f.endsWith('.png') || f.endsWith('.svg'))
        .map((f) => `/assets/${f}`)
    : [];

  const precacheList = [
    '/',
    '/index.html',
    '/manifest.webmanifest',
    '/apple-touch-icon.png',
    '/favicon.svg',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    ...assetFiles,
  ];

  const swContent = fs.readFileSync(swPath, 'utf8');
  const updated = swContent.replace(
    /\/\* __PRECACHE_MANIFEST__ \*\/ \[[\s\S]*?\];/,
    `/* __PRECACHE_MANIFEST__ */ ${JSON.stringify(precacheList, null, 2)};`
  );
  fs.writeFileSync(swPath, updated, 'utf8');
  console.log(`Injected ${precacheList.length} shell & bundle assets into dist/sw.js`);
}
