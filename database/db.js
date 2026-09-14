const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data.json');

// Default initial state with expanded products & articles
const defaultData = {
  settings: {
    amazonTag: 'smartstack-21',
    partnerStackId: 'partner-saas-ref',
    clickbankId: 'affiliate123',
    adminPin: 'admin123',
    openaiApiKey: '',
    geminiApiKey: '',
    autonomousMode: true,
    postingIntervalHours: 12,
    activeNiches: ['AI & SaaS Tools', 'Smart Home & Tech', 'Fitness & Wellness'],
    siteName: 'SmartStack AI Reviews & Deals',
    siteTagline: 'Unbiased Data-Driven AI Software & Tech Benchmarks'
  },
  products: [
    {
      id: 'prod-1',
      name: 'Synthesia AI Video Generator',
      niche: 'AI & SaaS Tools',
      category: 'Video & Media',
      rating: 4.8,
      price: '$22/mo',
      originalPrice: '$30/mo',
      discount: '26% OFF',
      affiliateNetwork: 'PartnerStack',
      affiliateUrl: 'https://partnerstack.com/ref/synthesia-demo',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      pros: ['Generates realistic AI avatars in 120+ languages', 'No camera or microphone needed', 'Templates for marketing & training videos'],
      cons: ['Advanced voice cloning requires Pro plan', 'Video rendering takes a few minutes'],
      description: 'Create professional AI videos from text in minutes without cameras or actors.',
      keyFeatures: ['120+ AI Avatars', 'Text-to-Video Engine', 'Custom Avatars Support', 'Automated Subtitles']
    },
    {
      id: 'prod-2',
      name: 'Jasper AI Copywriter Pro',
      niche: 'AI & SaaS Tools',
      category: 'Content & Copywriting',
      rating: 4.9,
      price: '$39/mo',
      originalPrice: '$49/mo',
      discount: '20% OFF',
      affiliateNetwork: 'PartnerStack',
      affiliateUrl: 'https://partnerstack.com/ref/jasper-ai-trial',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
      pros: ['50+ copywriting templates for ads & blogs', 'Integrated SEO Surfer optimization', 'Brand voice training'],
      cons: ['Requires slight learning curve for complex prompts', 'Higher tier plans for team collaboration'],
      description: 'The industry standard AI co-pilot for high-converting marketing copy and long-form articles.',
      keyFeatures: ['Brand Voice Training', 'SEO Surfer Integration', 'Plagiarism Checker', '50+ Content Templates']
    },
    {
      id: 'prod-3',
      name: 'Philips Hue Smart Lighting Starter Kit',
      niche: 'Smart Home & Tech',
      category: 'Smart Lighting',
      rating: 4.7,
      price: '$129.99',
      originalPrice: '$159.99',
      discount: '19% OFF',
      affiliateNetwork: 'Amazon Associates',
      affiliateUrl: 'https://www.amazon.in/dp/B07GJBBGH8?tag=smartstack-21',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
      pros: ['16 Million Colors & HomeKit/Alexa integration', 'Reliable Zigbee Bridge connection', 'Automated schedules & geofencing'],
      cons: ['Bridge hub required', 'Premium price compared to Bluetooth-only bulbs'],
      description: 'Transform your home ambiance with voice-controlled million-color smart bulbs.',
      keyFeatures: ['Voice Control (Alexa/Siri/Google)', 'Geofencing Auto Turn-On', '16 Million Color Options', 'Hue Bridge Included']
    },
    {
      id: 'prod-4',
      name: 'Oura Ring Gen 3 Smart Health Tracker',
      niche: 'Fitness & Wellness',
      category: 'Wearables',
      rating: 4.6,
      price: '$299.00',
      originalPrice: '$349.00',
      discount: '14% OFF',
      affiliateNetwork: 'Amazon Associates',
      affiliateUrl: 'https://www.amazon.in/dp/B0B5FLR49M?tag=smartstack-21',
      imageUrl: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63284?w=600&auto=format&fit=crop&q=80',
      pros: ['Discreet titanium ring design', 'Industry-leading sleep stage & readiness analysis', '7-day battery life'],
      cons: ['Monthly subscription required for full app features', 'Sizing kit needed before ordering'],
      description: 'Accurate 24/7 heart rate, sleep quality, and body temperature biometric monitoring in a sleek ring.',
      keyFeatures: ['Sleep Readiness Score', 'Body Temp Sensing', 'Period Tracking', 'Ultra Light Titanium']
    },
    {
      id: 'prod-5',
      name: 'Descript AI Audio & Video Editor',
      niche: 'AI & SaaS Tools',
      category: 'Media & Editing',
      rating: 4.8,
      price: '$12/mo',
      originalPrice: '$15/mo',
      discount: '20% OFF',
      affiliateNetwork: 'PartnerStack',
      affiliateUrl: 'https://partnerstack.com/ref/descript-ai',
      imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
      pros: ['Edit video like a text document', 'Overdub voice cloning', 'One-click filler word removal'],
      cons: ['Requires desktop app installation for heavy video renders'],
      description: 'The revolutionary podcast and video editor that edits media by editing text transcriptions.',
      keyFeatures: ['Text-Based Editing', 'Overdub AI Voice', 'Studio Sound Enhancer', 'Automatic Transcription']
    }
  ],
  articles: [
    {
      id: 'art-1',
      title: 'Top 5 AI Tools to Automate Your Business in 2026 (In-Depth Review)',
      slug: 'top-5-ai-tools-automate-business-2026',
      niche: 'AI & SaaS Tools',
      category: 'Buyer Guide',
      affiliateNetwork: 'PartnerStack',
      productId: 'prod-1',
      snippet: 'Discover the highest ROI AI software solutions that can save your team 20+ hours per week, from automated video generation to AI copywriting.',
      content: `# Top 5 AI Tools to Automate Your Business in 2026 (In-Depth Review)

*Updated for 2026 | FTC Disclosure: We earn affiliate commissions from qualifying purchases made through our links.*

Artificial Intelligence has transformed from a tech luxury into a core business necessity. Whether you run an e-commerce store, digital agency, or content creation studio, leverage the right AI stack to multiply your output by 10x.

Here is our definitive list of the top AI software platforms of 2026, tested and evaluated on ROI, ease of use, and automation capabilities.

---

## 1. Synthesia AI – Best AI Video Generator for Marketing & Training

![Synthesia AI](https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80)

**Rating**: ⭐⭐⭐⭐⭐ (4.8/5)  
**Starting Price**: $22/mo *(Exclusive Deal: 26% OFF)*  
**Best For**: Marketing teams, online courses, product walkthroughs.

Synthesia leads the market in turn-key video creation. Instead of hiring actors, setting up cameras, or editing footage for days, Synthesia converts text scripts into human-like video avatars in over 120 languages.

### Key Features:
- 120+ Lifelike AI Avatars & Voice Synthesizers
- One-click Script Assistant
- Custom Studio Avatar Support
- Automated Closed-Caption Generation

[👉 Check Current Discount & Free Trial on Synthesia](https://partnerstack.com/ref/synthesia-demo)

---

## 2. Jasper AI – Premium AI Copywriter & Marketing Co-Pilot

![Jasper AI](https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80)

**Rating**: ⭐⭐⭐⭐⭐ (4.9/5)  
**Starting Price**: $39/mo *(20% OFF Deal)*  
**Best For**: Ad agencies, blog publishers, SEO strategists.

Jasper AI remains the gold standard for high-converting marketing copywriting. Unlike generic chat tools, Jasper is pre-trained on high-performing sales letters, email funnels, and blog frameworks.

[👉 Claim Exclusive 20% Discount on Jasper AI](https://partnerstack.com/ref/jasper-ai-trial)
`,
      status: 'published',
      publishedAt: '2026-09-14T10:00:00.000Z',
      views: 420,
      clicks: 58
    },
    {
      id: 'art-2',
      title: 'Philips Hue Starter Kit Review: Is It Still Worth It in 2026?',
      slug: 'philips-hue-starter-kit-review-2026',
      niche: 'Smart Home & Tech',
      category: 'Product Review',
      affiliateNetwork: 'Amazon Associates',
      productId: 'prod-3',
      snippet: 'We tested the Philips Hue Smart Lighting Kit for 6 months. Here is our breakdown of performance, Apple HomeKit integration, and value.',
      content: `# Philips Hue Starter Kit Review: Is It Still Worth It in 2026?

*FTC Disclosure: As an Amazon Associate, we earn from qualifying purchases.*

Smart lighting is the cornerstone of any modern smart home setup. But with low-cost Bluetooth alternatives flooding the market, does the premium **Philips Hue Starter Kit** justify its price tag?

We put the Hue ecosystem through a rigorous 6-month hands-on test. Here is our honest verdict.

---

## Performance & Light Quality

![Philips Hue Lighting](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80)

Philips Hue bulbs offer unmatched color accuracy across all 16 million colors. The whites transition seamlessly from warm candlelight (2000K) to cool daylight (6500K).

[👉 Check Lowest Amazon Price & Available Deals](https://www.amazon.in/dp/B07GJBBGH8?tag=smartstack-21)
`,
      status: 'published',
      publishedAt: '2026-09-13T14:30:00.000Z',
      views: 310,
      clicks: 42
    },
    {
      id: 'art-3',
      title: 'Descript AI Review (2026): The Text-Based Video Editor Game Changer',
      slug: 'descript-ai-video-editor-review-2026',
      niche: 'AI & SaaS Tools',
      category: 'Product Review',
      affiliateNetwork: 'PartnerStack',
      productId: 'prod-5',
      snippet: 'Descript allows creators to edit video and podcast audio simply by editing a text transcript. Here is our hands-on review.',
      content: `# Descript AI Review (2026): The Text-Based Video Editor Game Changer

*FTC Disclosure: We earn an affiliate commission when you buy through our links.*

Editing video frame-by-frame on traditional timelines can take hours. **Descript AI** changes everything by transcribing your video into text and allowing you to edit the video by editing the text transcript!

![Descript AI](https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80)

## Key Standout Features
- **Filler Word Removal**: One-click removal of all "umms", "uhs", and awkward pauses.
- **Studio Sound AI**: Instant crystal-clear audio enhancement that sounds like a $1,000 studio mic.
- **Overdub**: Clone your voice to fix spoken typos without re-recording!

[👉 Try Descript AI Free Today](https://partnerstack.com/ref/descript-ai)
`,
      status: 'published',
      publishedAt: '2026-09-14T08:15:00.000Z',
      views: 185,
      clicks: 29
    },
    {
      id: 'art-4',
      title: 'Oura Ring Gen 3 Review: Sleek Biometric Health Monitoring Tested',
      slug: 'oura-ring-gen-3-smart-tracker-review',
      niche: 'Fitness & Wellness',
      category: 'Product Review',
      affiliateNetwork: 'Amazon Associates',
      productId: 'prod-4',
      snippet: 'Read our 90-day test of the Oura Ring Gen 3 smart health tracker, evaluating sleep tracking accuracy, readiness score, and battery life.',
      content: `# Oura Ring Gen 3 Review: Sleek Biometric Health Monitoring Tested

*FTC Disclosure: As an Amazon Associate, we earn from qualifying purchases.*

Wearable fitness trackers are great, but heavy smartwatches can be uncomfortable to wear while sleeping. The **Oura Ring Gen 3** packs hospital-grade biometric sensors into a titanium ring.

![Oura Ring Gen 3](https://images.unsplash.com/photo-1576243345690-4e4b79b63284?w=800&auto=format&fit=crop&q=80)

## Why It Outperforms Smartwatches
- **7-Day Battery Life**: Charge once a week instead of every night.
- **Sleep & Readiness Score**: Tells you exactly how well rested your body is before working out.

[👉 Check Current Oura Ring Pricing on Amazon](https://www.amazon.in/dp/B0B5FLR49M?tag=smartstack-21)
`,
      status: 'published',
      publishedAt: '2026-09-12T11:00:00.000Z',
      views: 290,
      clicks: 34
    }
  ],
  clicks: [
    { id: 'clk-101', articleId: 'art-1', productId: 'prod-1', network: 'PartnerStack', timestamp: '2026-09-14T09:12:00.000Z', subId: 'blog_review_cta' },
    { id: 'clk-102', articleId: 'art-2', productId: 'prod-3', network: 'Amazon Associates', timestamp: '2026-09-14T10:15:00.000Z', subId: 'amazon_cta_btn' }
  ],
  campaigns: [
    {
      id: 'camp-1',
      name: 'Q3 SaaS Recurring Scale',
      niche: 'AI & SaaS Tools',
      targetKeywords: ['best ai video tools', 'ai copywriter comparison', 'top saas automation'],
      status: 'active',
      articlesGenerated: 8,
      lastRun: '2026-09-14T10:00:00.000Z'
    }
  ]
};

function initDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  // Write fresh data with updated articles
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
