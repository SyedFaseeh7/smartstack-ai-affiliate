const cron = require('node-cron');
const db = require('../database/db');
const { mineNewProduct } = require('./productMiner');
const { generateArticleForProduct } = require('./aiContentGenerator');

let cronJob = null;

async function runAutonomousCycle() {
  const settings = db.getSettings();
  if (!settings.autonomousMode) {
    console.log('[Scheduler] Autonomous Mode is disabled. Skipping cycle.');
    return;
  }

  console.log('[Scheduler] Starting Autonomous AI Content & Product Mining Cycle...');
  const niches = settings.activeNiches || ['AI & SaaS Tools', 'Smart Home & Tech'];
  const chosenNiche = niches[Math.floor(Math.random() * niches.length)];

  try {
    const product = await mineNewProduct(chosenNiche);
    console.log(`[Scheduler] Mined Product: ${product.name} (${product.niche})`);

    const articleType = Math.random() > 0.4 ? 'Product Review' : 'Buyer Guide';
    const article = await generateArticleForProduct(product, articleType);
    console.log(`[Scheduler] Successfully Published Autonomous Article: "${article.title}"`);
  } catch (err) {
    console.error('[Scheduler] Error in autonomous cycle:', err);
  }
}

function initScheduler() {
  // Run once every 3 hours by default (or user configurable)
  // Standard cron format for every 3 hours: "0 */3 * * *"
  cronJob = cron.schedule('0 */3 * * *', () => {
    runAutonomousCycle();
  });
  
  console.log('[Scheduler] Autonomous cron scheduler initialized (every 3 hours).');
}

module.exports = {
  initScheduler,
  runAutonomousCycle
};
