#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const WORDPRESS_API_URL = 'https://cms.sportendorse.com/wp-json/wp/v2';
const SITE_ROOT = 'https://www.sportendorse.com';

async function fetchSlugs(endpoint) {
  let all = [];
  let page = 1;
  while (true) {
    const url = `${WORDPRESS_API_URL}${endpoint}?per_page=100&page=${page}&_fields=slug`;
    try {
      const res = await fetch(url);
      if (!res.ok) break;
      const items = await res.json();
      if (!items || items.length === 0) break;
      all = all.concat(items.map(i => i.slug));
      const totalPages = res.headers.get('X-WP-TotalPages');
      if (totalPages && page >= parseInt(totalPages, 10)) break;
      page++;
    } catch (err) {
      console.error('fetch error', err);
      break;
    }
  }
  return all;
}

function buildUrlElem(loc, lastmod, priority = '0.80') {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
}

async function main() {
  console.log('Generating sitemap...');
  const staticPages = [
    '/',
    '/talent',
    '/brands',
    '/agency',
    '/subscription',
    '/podcasts',
    '/about-us',
    '/success_stories',
    '/faqs',
    '/contact-us',
    '/presses',
    '/privacy-center',
    '/terms-and-conditions',
    '/blog'
  ];

  const sections = [
    { endpoint: '/posts', prefix: '/blog' },
    { endpoint: '/podcasts', prefix: '/podcasts' },
    { endpoint: '/success_stories', prefix: '/success_stories' },
    { endpoint: '/presses', prefix: '/presses' }
  ];

  const urls = [];
  const today = new Date().toISOString();

  // add static pages
  for (const p of staticPages) {
    urls.push(buildUrlElem(`${SITE_ROOT}${p}`, today, p === '/' ? '1.00' : '0.80'));
  }

  // add dynamic slugs
  for (const s of sections) {
    try {
      const slugs = await fetchSlugs(s.endpoint);
      for (const slug of slugs) {
        // Ensure prefix has leading slash but no trailing slash
        const prefix = s.prefix.replace(/\/$/, '');
        // Build URLs for supported languages: en, es, de
        const enLoc = `${SITE_ROOT}${prefix}/${slug}`;
        const esLoc = `${SITE_ROOT}/es${prefix}/${slug}`;
        const deLoc = `${SITE_ROOT}/de${prefix}/${slug}`;
        const frLoc = `${SITE_ROOT}/fr${prefix}/${slug}`;
        urls.push(buildUrlElem(enLoc, today, '0.64'));
        urls.push(buildUrlElem(esLoc, today, '0.64'));
        urls.push(buildUrlElem(deLoc, today, '0.64'));
        urls.push(buildUrlElem(frLoc, today, '0.64'));
      }
    } catch (err) {
      console.warn('Skipping', s.endpoint, err);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

  const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outPath, xml, 'utf8');
  console.log('Wrote', outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
