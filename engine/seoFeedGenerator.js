const db = require('../database/db');

function generateSitemap(domain = 'https://smartstack-ai.onrender.com') {
  const articles = db.getArticles();
  
  // Ensure HTTPS scheme matches Google Search Console property URL
  const cleanDomain = domain.replace(/^http:\/\//i, 'https://');

  const urls = articles.map(art => `
    <url>
      <loc>${cleanDomain}/article/${art.slug}</loc>
      <lastmod>${new Date(art.publishedAt || Date.now()).toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${cleanDomain}/</loc>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
  ${urls}
</urlset>`;
}

function generateRssFeed(domain = 'https://smartstack-ai.onrender.com') {
  const articles = db.getArticles();
  const settings = db.getSettings();
  const cleanDomain = domain.replace(/^http:\/\//i, 'https://');

  const items = articles.map(art => `
    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>${cleanDomain}/article/${art.slug}</link>
      <guid>${cleanDomain}/article/${art.slug}</guid>
      <pubDate>${new Date(art.publishedAt || Date.now()).toUTCString()}</pubDate>
      <description><![CDATA[${art.snippet}]]></description>
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${settings.siteName}]]></title>
    <link>${cleanDomain}</link>
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
