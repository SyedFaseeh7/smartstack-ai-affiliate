const express = require('express');
const cors = require('cors');
const path = require('path');
const { marked } = require('marked');

const db = require('./database/db');
const { mineNewProduct } = require('./engine/productMiner');
const { generateArticleForProduct } = require('./engine/aiContentGenerator');
const { generateSitemap, generateRssFeed } = require('./engine/seoFeedGenerator');
const { initScheduler, runAutonomousCycle } = require('./engine/scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure Marked for secure HTML rendering
marked.setOptions({
  gfm: true,
  breaks: true
});

// --- REST API ENDPOINTS ---

// Analytics & Overview
app.get('/api/analytics', (req, res) => {
  const data = db.getAnalytics();
  res.json(data);
});

// Products
app.get('/api/products', (req, res) => {
  const products = db.getProducts();
  res.json(products);
});

app.post('/api/products/mine', async (req, res) => {
  const { niche } = req.body;
  try {
    const product = await mineNewProduct(niche || 'AI & SaaS Tools');
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Articles
app.get('/api/articles', (req, res) => {
  const { niche, category } = req.query;
  let articles = db.getArticles();

  if (niche && niche !== 'All') {
    articles = articles.filter(a => a.niche === niche);
  }
  if (category && category !== 'All') {
    articles = articles.filter(a => a.category === category);
  }

  res.json(articles);
});

app.get('/api/articles/:slug', (req, res) => {
  const { slug } = req.params;
  const article = db.getArticleBySlug(slug);

  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  // Increment view counter
  db.incrementArticleViews(article.id);

  // Render markdown content to HTML
  const renderedHtml = marked(article.content);
  
  // Find associated product
  const products = db.getProducts();
  const product = products.find(p => p.id === article.productId) || products[0];

  res.json({
    ...article,
    renderedHtml,
    product
  });
});

app.post('/api/articles/generate', async (req, res) => {
  const { productId, articleType } = req.body;
  try {
    const products = db.getProducts();
    let targetProduct = products.find(p => p.id === productId);
    
    if (!targetProduct) {
      targetProduct = await mineNewProduct('AI & SaaS Tools');
    }

    const article = await generateArticleForProduct(targetProduct, articleType || 'Product Review');
    res.json({ success: true, article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Click Tracking & Affiliate Link Redirection
app.get('/api/track-click', (req, res) => {
  const { articleId, productId, network, targetUrl, subId } = req.query;

  if (targetUrl) {
    db.recordClick({
      articleId: articleId || null,
      productId: productId || null,
      network: network || 'Direct',
      subId: subId || 'cta_button',
      userAgent: req.headers['user-agent']
    });

    // Clean redirection to affiliate destination
    return res.redirect(decodeURIComponent(targetUrl));
  }

  res.status(400).json({ error: 'Missing targetUrl parameter' });
});

// Admin Passcode Authentication Verification
app.post('/api/admin/auth', (req, res) => {
  const { pin } = req.body;
  const settings = db.getSettings();
  const validPin = settings.adminPin || 'admin123';

  if (pin === validPin) {
    return res.json({ success: true, token: 'auth-granted-secure-token-9988' });
  }
  res.status(401).json({ success: false, error: 'Invalid Secret Passcode' });
});

// Settings & Credentials Management
app.get('/api/settings', (req, res) => {
  const settings = db.getSettings();
  res.json(settings);
});

app.post('/api/settings', (req, res) => {
  const newSettings = db.updateSettings(req.body);
  res.json({ success: true, settings: newSettings });
});

// Trigger Manual Autonomous Cycle
app.post('/api/automation/trigger', async (req, res) => {
  try {
    await runAutonomousCycle();
    const analytics = db.getAnalytics();
    res.json({ success: true, message: 'Autonomous cycle executed successfully', analytics });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SEO & Feeds
app.get('/sitemap.xml', (req, res) => {
  const host = `${req.protocol}://${req.get('host')}`;
  const xml = generateSitemap(host);
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

app.get('/feed.xml', (req, res) => {
  const host = `${req.protocol}://${req.get('host')}`;
  const xml = generateRssFeed(host);
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// --- SECRET ENCRYPTED ADMIN ROUTE ---
// Secret URL: /smartstack-control-panel-x99
app.get('/smartstack-control-panel-x99', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});

// Hide standard /admin route (returns 404 to deceive unauthorized scanners)
app.get('/admin', (req, res) => {
  res.status(404).send('404 Page Not Found');
});

app.get('/article/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'article.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Initialize background scheduler
initScheduler();

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 SmartStack AI Engine Running on http://localhost:${PORT}`);
  console.log(`🔒 Secret Control Panel: http://localhost:${PORT}/smartstack-control-panel-x99`);
  console.log(`🌐 Public Affiliate Portal: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});
