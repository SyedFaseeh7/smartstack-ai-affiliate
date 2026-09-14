const db = require('../database/db');

function generateSitemap(domain = 'http://localhost:3000') {
  const articles = db.getArticles();
  
  const urls = articles.map(art => `
    <url>
      <loc>${domain}/article/${art.slug}</loc>
      <lastmod>${new Date(art.publishedAt || Date.now()).toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
</urlset>`;
}

function generateRssFeed(domain = 'http://localhost:3000') {
  const articles = db.getArticles();
  const settings = db.getSettings();

  const items = articles.map(art => `
    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>${domain}/article/${art.slug}</link>
      <guid>${domain}/article/${art.slug}</guid>
      <pubDate>${new Date(art.publishedAt || Date.now()).toUTCString()}</pubDate>
      <description><![CDATA[${art.snippet}]]></description>
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${settings.siteName}]]></title>
    <link>${domain}</link>
    <description><![CDATA[${settings.siteTagline}]]></description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;
}

module.exports = {
  generateSitemap,
  generateRssFeed
};
