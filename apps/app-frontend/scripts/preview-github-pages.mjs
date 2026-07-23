#!/usr/bin/env node
/**
 * Serve dist/ the way GitHub Pages does for project sites:
 * unknown paths return public/404.html with HTTP 404 (redirect script → index).
 *
 * Usage (from apps/app-frontend): node scripts/preview-github-pages.mjs
 * Open http://localhost:4179/osac-ux/models and refresh.
 */
import { createServer } from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const dist = join(__dirname, '..', 'dist');
const port = Number(process.env.PORT || 4179);
const base = '/osac-ux';

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const send = (res, code, file) => {
  res.writeHead(code, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
};

createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);

  if (url === base || url === `${base}/`) {
    return send(res, 200, join(dist, 'index.html'));
  }

  if (!url.startsWith(`${base}/`) && url !== base) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found (expected /osac-ux/…)');
    return;
  }

  const rel = url.slice(base.length + 1); // after /osac-ux/
  const file = join(dist, rel);

  if (rel && existsSync(file) && statSync(file).isFile()) {
    return send(res, 200, file);
  }

  // Mimic GitHub Pages: missing path → 404.html (not index.html).
  return send(res, 404, join(dist, '404.html'));
}).listen(port, () => {
  process.stdout.write(`GitHub Pages-style preview: http://localhost:${port}${base}/\n`);
  process.stdout.write(`Deep-link check: http://localhost:${port}${base}/models\n`);
});

