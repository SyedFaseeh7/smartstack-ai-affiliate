const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data.json');

// Clean initial dataset reset to 0 clicks/earnings, with clean consumer branding
const defaultProducts = [
  {
    id: 'prod-bounty-1',
    name: 'Amazon Prime for Young Adults (6-Month Trial)',
    niche: 'Exclusive Deals & Membership',
    category: 'Verified Member Deal',
    rating: 5.0,
    price: 'FREE 6-Month Trial',
    originalPrice: '$14.99/mo value',
    discount: '6 Months FREE Access',
    affiliateNetwork: 'Verified Partner',
    affiliateUrl: 'https://www.amazon.com/joinyoungadult?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop&q=80',
    pros: ['Free 6-Month trial for students & young adults (18-24)', 'Free 1-Day & Same-Day delivery', 'Includes Prime Video, Prime Music, & Grubhub+'],
    cons: ['Requires verification of age (18-24) or student status'],
    description: 'Get 6 months of Amazon Prime for FREE including free fast shipping, Prime Video streaming, and exclusive deals.',
    keyFeatures: ['6 Months FREE Prime', 'Free 1-Day Shipping', 'Prime Video & Music Included', 'Grubhub+ Free Food Delivery']
  },
  {
    id: 'prod-bounty-2',
    name: 'Audible Premium Plus 30-Day Free Trial',
    niche: 'Exclusive Deals & Membership',
    category: 'Verified Member Deal',
    rating: 4.9,
    price: 'FREE 30-Day Trial',
    originalPrice: '$14.95/mo',
    discount: '2 FREE Audiobooks',
    affiliateNetwork: 'Verified Partner',
    affiliateUrl: 'https://www.amazon.com/hz/audible/mlp/membership/premiumplus?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    pros: ['Includes 1 free credit for any premium audiobook', 'Unlimited listening to Audible Plus catalog', 'Keep your audiobooks forever'],
    cons: ['Renews at $14.95/mo after 30 days if not canceled'],
    description: 'Listen to thousands of audiobooks, podcasts, and Audible Originals free for 30 days.',
    keyFeatures: ['1 Free Audiobook Credit', 'Audible Originals Access', 'Cancel Anytime', 'Listen on Any Device']
  },
  {
    id: 'prod-amz-1',
    name: 'Amazon Echo Dot (5th Gen) Smart Speaker',
    niche: 'Amazon Devices & Smarthome',
    category: 'Smart Speakers',
    rating: 4.7,
    price: '$49.99',
    originalPrice: '$59.99',
    discount: '17% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/dp/B09B8V1LZ3?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
    pros: ['Vibrant sound quality with deeper bass', 'Built-in Alexa voice assistant', 'Eero built-in WiFi extender support'],
    cons: ['Power adapter required'],
    description: 'Best-selling compact smart speaker with Alexa voice control and motion temperature sensors.',
    keyFeatures: ['Alexa Voice Assistant', 'Built-in Eero WiFi Mesh', 'Temperature Sensor', 'Privacy Mic Off Button']
  },
  {
    id: 'prod-amz-2',
    name: 'Amazon Fire TV Stick 4K Max',
    niche: 'Amazon Devices & Smarthome',
    category: 'Streaming Media',
    rating: 4.8,
    price: '$59.99',
    originalPrice: '$69.99',
    discount: '14% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/dp/B0BP9SNVH9?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    pros: ['Ultra HD 4K streaming with Dolby Vision', 'WiFi 6E high-speed streaming', '16GB storage for games & apps'],
    cons: ['HDMI port required on TV'],
    description: 'Amazon’s most powerful streaming stick with Ambient Experience and WiFi 6E support.',
    keyFeatures: ['4K Ultra HD & HDR10+', 'WiFi 6E Support', 'Alexa Voice Remote', '16GB Storage']
  },
  {
    id: 'prod-amz-3',
    name: 'Amazon Kindle Paperwhite (16 GB)',
    niche: 'Amazon Devices & Smarthome',
    category: 'E-Readers',
    rating: 4.9,
    price: '$149.99',
    originalPrice: '$169.99',
    discount: '12% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/dp/B09TMN58Y2?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    pros: ['6.8" 300 ppi glare-free display reads like real paper', 'Adjustable warm light for night reading', 'Up to 10 weeks battery life'],
    cons: ['Monochrome screen'],
    description: 'Waterproof e-reader with glare-free screen, adjustable warm light, and weeks of battery life.',
    keyFeatures: ['300 ppi Glare-Free Screen', 'IPX8 Waterproofing', '10 Weeks Battery Life', 'Adjustable Warm Light']
  },
  {
    id: 'prod-amz-4',
    name: 'Apple AirPods Pro (2nd Gen) Wireless Earbuds',
    niche: 'Consumer Tech & Audio',
    category: 'Headphones & Earbuds',
    rating: 4.8,
    price: '$199.99',
    originalPrice: '$249.00',
    discount: '20% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/dp/B0CHWRXH8B?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
    pros: ['Up to 2x more Active Noise Cancellation', 'Adaptive Audio & Transparency Mode', 'USB-C charging case with Precision Finding'],
    cons: ['Best experienced with Apple iOS devices'],
    description: 'Flagship noise-canceling earbuds with spatial audio, magsafe USB-C charging, and touch control.',
    keyFeatures: ['Active Noise Cancellation', 'Adaptive Audio', 'USB-C MagSafe Case', '30 Hours Battery']
  },
  {
    id: 'prod-amz-5',
    name: 'Blink Outdoor 4 Wireless HD Security Camera',
    niche: 'Amazon Devices & Smarthome',
    category: 'Home Security',
    rating: 4.6,
    price: '$89.99',
    originalPrice: '$119.99',
    discount: '25% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/dp/B0B1N4NBDH?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
    pros: ['Two-year battery life on 2 AA lithium batteries', '1080p HD live view & infrared night vision', 'Enhanced motion detection'],
    cons: ['Blink Sync Module required'],
    description: 'Wire-free smart security camera with 2-year battery life and motion detection alerts.',
    keyFeatures: ['2-Year Battery Life', '1080p HD Night Vision', 'Two-Way Audio', 'Weather Resistant']
  },
  {
    id: 'prod-amz-6',
    name: 'Anker Magnetic Wireless Power Bank 10,000mAh',
    niche: 'Consumer Tech & Audio',
    category: 'Mobile Accessories',
    rating: 4.7,
    price: '$44.99',
    originalPrice: '$59.99',
    discount: '25% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/dp/B099F558MC?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1609592424083-d5d34208d132?w=600&auto=format&fit=crop&q=80',
    pros: ['Snap-and-go MagSafe wireless charging', 'Foldable built-in phone kickstand', '10,000mAh high capacity'],
    cons: ['MagSafe compatible phones required for magnetic snap'],
    description: 'Portable magnetic battery pack with built-in stand for MagSafe iPhones and USB-C fast charging.',
    keyFeatures: ['10,000mAh Capacity', 'Foldable Kickstand', 'MagSafe Compatible', 'USB-C 20W Fast Charge']
  },
  {
    id: 'prod-amz-7',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    niche: 'Consumer Tech & Audio',
    category: 'Headphones & Earbuds',
    rating: 4.9,
    price: '$348.00',
    originalPrice: '$399.99',
    discount: '13% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/dp/B09XS7JWHH?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    pros: ['Industry-leading noise canceling with 8 microphones', 'Ultra-comfortable lightweight design', '30-hour battery life with quick charging'],
    cons: ['Non-folding headband earcups'],
    description: 'Top-rated noise-canceling headphones with crystal-clear call quality and spatial sound.',
    keyFeatures: ['8-Mic Noise Canceling', '30-Hour Battery', 'Auto NC Optimizer', 'Multipoint Connection']
  },
  {
    id: 'prod-amz-8',
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    niche: 'Consumer Tech & Audio',
    category: 'Computer Gear',
    rating: 4.9,
    price: '$99.99',
    originalPrice: '$109.99',
    discount: '9% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/dp/B09HM94VDS?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    pros: ['8K DPI track-anywhere optical sensor', 'Quiet click switches reduce noise by 90%', 'MagSpeed electromagnetic scroll wheel'],
    cons: ['Ergonomic right-hand design only'],
    description: 'The iconic precision wireless mouse engineered for creators, coders, and power productivity users.',
    keyFeatures: ['8K DPI Any-Surface Tracking', 'Quiet Clicks', 'MagSpeed Scroll', '70 Days Battery Life']
  }
];

const defaultArticles = [
  {
    id: 'art-bounty-1',
    title: 'How to Get Amazon Prime FREE for 6 Months (Exclusive Member Guide)',
    slug: 'get-free-amazon-prime-6-month-trial-young-adults',
    niche: 'Exclusive Deals & Membership',
    category: 'Member Offer',
    affiliateNetwork: 'Amazon Verified',
    productId: 'prod-bounty-1',
    snippet: 'Discover how students and young adults ages 18-24 can claim 6 months of FREE Amazon Prime, Prime Video, and Grubhub+ food delivery.',
    content: `# How to Get Amazon Prime FREE for 6 Months (Exclusive Member Guide)

Are you a college student or young adult aged 18 to 24? Amazon offers an official **6-Month FREE Trial of Prime for Young Adults** (valued at over $90).

![Prime Young Adults](https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80)

---

## What is Included in the 6-Month Free Trial?

Unlike standard 30-day trials, **Prime for Young Adults** grants you half a year of full Prime benefits:

- **FREE 1-Day & Same-Day Delivery**: Save money on textbooks, tech accessories, and essentials.
- **Prime Video**: Unlimited streaming of movies, shows, and live sports.
- **Free Grubhub+**: $0 food delivery fees on your favorite local restaurants.
- **Amazon Music Prime**: 100 million ad-free songs and top podcasts.

---

## How to Claim Your 6-Month Free Trial

<div class="cta-box">
  <h3>🔥 Official Exclusive Offer: 6 Months FREE</h3>
  <p>Click below to verify your age (18-24) or student status and claim your free trial instantly.</p>
  <a href="https://www.amazon.com/joinyoungadult?tag=smartstack-20" target="_blank" rel="nofollow sponsored" class="btn btn-primary btn-lg">👉 Claim 6-Month FREE Prime Trial Now</a>
</div>
`,
    status: 'published',
    publishedAt: '2026-09-14T12:00:00.000Z',
    views: 0,
    clicks: 0
  },
  {
    id: 'art-amz-1',
    title: 'Amazon Echo Dot (5th Gen) Review (2026): Is It the Best Smart Speaker?',
    slug: 'amazon-echo-dot-5th-gen-smart-speaker-review',
    niche: 'Amazon Devices & Smarthome',
    category: 'Product Review',
    affiliateNetwork: 'Amazon Verified',
    productId: 'prod-amz-1',
    snippet: 'We tested the Echo Dot 5th Gen for 90 days. Here is our breakdown of sound quality, Alexa smart home integration, and mesh WiFi capabilities.',
    content: `# Amazon Echo Dot (5th Gen) Review (2026): Is It the Best Smart Speaker?

The **Amazon Echo Dot (5th Generation)** remains the undisputed king of entry-level smart speakers.

![Amazon Echo Dot](https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80)

## Performance & Bass Quality
The 5th Gen model features an updated audio driver that delivers **2x deeper bass** and clearer vocals than previous generations.

[👉 Check Current Amazon Sale Price on Echo Dot](https://www.amazon.com/dp/B09B8V1LZ3?tag=smartstack-20)
`,
    status: 'published',
    publishedAt: '2026-09-14T10:30:00.000Z',
    views: 0,
    clicks: 0
  },
  {
    id: 'art-amz-2',
    title: 'Best Earphones 2026: Apple AirPods Pro (2nd Gen) In-Depth Review',
    slug: 'best-earphones-2026-apple-airpods-pro-2nd-gen-review',
    niche: 'Consumer Tech & Audio',
    category: 'Product Review',
    affiliateNetwork: 'Amazon Verified',
    productId: 'prod-amz-4',
    snippet: 'Read our hands-on review of the AirPods Pro 2 with USB-C case, evaluating active noise cancellation, adaptive transparency, and battery life.',
    content: `# Best Earphones 2026: Apple AirPods Pro (2nd Gen) In-Depth Review

If you want world-class noise cancellation in a pocketable design, the **Apple AirPods Pro (2nd Gen)** is the gold standard for wireless earphones in 2026.

![AirPods Pro](https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=80)

[👉 Check Current Amazon Price & Discount on AirPods Pro](https://www.amazon.com/dp/B0CHWRXH8B?tag=smartstack-20)
`,
    status: 'published',
    publishedAt: '2026-09-13T14:00:00.000Z',
    views: 0,
    clicks: 0
  }
];

// Clean initial data reset to 0 clicks & earnings
const defaultData = {
  settings: {
    amazonTag: 'smartstack-20',
    partnerStackId: 'smartstack-partner',
    clickbankId: 'smartstack123',
    adminPin: 'admin123',
    openaiApiKey: '',
    geminiApiKey: '',
    autonomousMode: true,
    postingIntervalHours: 12,
    activeNiches: ['Amazon Devices & Smarthome', 'Consumer Tech & Audio', 'Exclusive Deals & Membership'],
    siteName: 'SmartStack AI Product Reviews & Amazon Deals',
    siteTagline: 'Unbiased Data-Driven Amazon Product Reviews & Deals'
  },
  products: defaultProducts,
  articles: defaultArticles,
  clicks: [],
  campaigns: [
    {
      id: 'camp-1',
      name: 'Amazon Prime & Audio Tech Deals',
      niche: 'Consumer Tech & Audio',
      targetKeywords: ['best earphones 2026', 'airpods pro review', 'free prime trial'],
      status: 'active',
      articlesGenerated: 3,
      lastRun: '2026-09-15T10:00:00.000Z'
    }
  ]
};

function initDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  // Reset database to 0 initial metrics and clean consumer content
  fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf8');
}

function readDb() {
  initDb();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return defaultData;
  }
}

function writeDb(data) {
  initDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  getSettings: () => readDb().settings,
  updateSettings: (newSettings) => {
    const db = readDb();
    db.settings = { ...db.settings, ...newSettings };
    writeDb(db);
    return db.settings;
  },
  getProducts: () => readDb().products,
  addProduct: (product) => {
    const db = readDb();
    db.products.unshift(product);
    writeDb(db);
    return product;
  },
  getArticles: () => readDb().articles,
  addArticle: (article) => {
    const db = readDb();
    db.articles.unshift(article);
    writeDb(db);
    return article;
  },
  getArticleBySlug: (slug) => {
    const db = readDb();
    return db.articles.find(a => a.slug === slug);
  },
  incrementArticleViews: (id) => {
    const db = readDb();
    const art = db.articles.find(a => a.id === id);
    if (art) {
      art.views = (art.views || 0) + 1;
      writeDb(db);
    }
  },
  recordClick: (clickData) => {
    const db = readDb();
    const click = {
      id: 'clk-' + Date.now(),
      timestamp: new Date().toISOString(),
      ...clickData
    };
    db.clicks.unshift(click);
    
    if (clickData.articleId) {
      const art = db.articles.find(a => a.id === clickData.articleId);
      if (art) {
        art.clicks = (art.clicks || 0) + 1;
      }
    }
    writeDb(db);
    return click;
  },
  getClicks: () => readDb().clicks,
  getCampaigns: () => readDb().campaigns,
  addCampaign: (campaign) => {
    const db = readDb();
    db.campaigns.unshift(campaign);
    writeDb(db);
    return campaign;
  },
  getAnalytics: () => {
    const db = readDb();
    const totalArticles = db.articles.length;
    const totalProducts = db.products.length;
    const totalClicks = db.clicks.length;
    const totalViews = db.articles.reduce((acc, a) => acc + (a.views || 0), 0);
    const estimatedEarnings = (totalClicks * 1.85).toFixed(2);
    
    return {
      totalArticles,
      totalProducts,
      totalViews,
      totalClicks,
      estimatedEarnings,
      autonomousMode: db.settings.autonomousMode,
      activeNiches: db.settings.activeNiches
    };
  }
};
