const db = require('../database/db');

// Expanded pool of 20 high-ticket affiliate products
const productPool = {
  'AI & SaaS Tools': [
    {
      name: 'Synthesia AI Video Generator',
      category: 'Video & Media',
      rating: 4.8,
      price: '$22/mo',
      originalPrice: '$30/mo',
      discount: '26% OFF',
      affiliateNetwork: 'PartnerStack',
      baseUrl: 'https://partnerstack.com/ref/synthesia-demo',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      pros: ['Generates realistic AI avatars in 120+ languages', 'No camera or microphone needed', 'Templates for marketing & training videos'],
      cons: ['Advanced voice cloning requires Pro plan'],
      description: 'Create professional AI videos from text in minutes without cameras or actors.',
      keyFeatures: ['120+ AI Avatars', 'Text-to-Video Engine', 'Custom Avatars Support', 'Automated Subtitles']
    },
    {
      name: 'Jasper AI Copywriter Pro',
      category: 'Content & Copywriting',
      rating: 4.9,
      price: '$39/mo',
      originalPrice: '$49/mo',
      discount: '20% OFF',
      affiliateNetwork: 'PartnerStack',
      baseUrl: 'https://partnerstack.com/ref/jasper-ai-trial',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
      pros: ['50+ copywriting templates for ads & blogs', 'Integrated SEO Surfer optimization', 'Brand voice training'],
      cons: ['Higher tier plans for team collaboration'],
      description: 'The industry standard AI co-pilot for high-converting marketing copy and long-form articles.',
      keyFeatures: ['Brand Voice Training', 'SEO Surfer Integration', 'Plagiarism Checker', '50+ Content Templates']
    },
    {
      name: 'Descript AI Audio & Video Editor',
      category: 'Media & Editing',
      rating: 4.8,
      price: '$12/mo',
      originalPrice: '$15/mo',
      discount: '20% OFF',
      affiliateNetwork: 'PartnerStack',
      baseUrl: 'https://partnerstack.com/ref/descript-ai',
      imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80',
      pros: ['Edit audio/video by editing text script', 'Studio Sound AI noise remover', 'Overdub AI voice cloning'],
      cons: ['Learning curve for multitrack timeline'],
      description: 'The all-in-one podcast and video editing software powered by AI text editing.',
      keyFeatures: ['Text-Based Video Editing', 'Studio Sound Enhancer', 'Filler Word Removal', 'Overdub Voice Clone']
    },
    {
      name: 'Copy.ai Marketing Automation Platform',
      category: 'Content & Sales',
      rating: 4.7,
      price: '$36/mo',
      originalPrice: '$49/mo',
      discount: '26% OFF',
      affiliateNetwork: 'PartnerStack',
      baseUrl: 'https://partnerstack.com/ref/copyai-growth',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
      pros: ['Automates GTM sales workflows', '90+ copywriting tools', 'Team workspace sharing'],
      cons: ['Fewer integrations than Enterprise tools'],
      description: 'AI powered sales and content engine that writes blog posts, ad copies, and cold emails in seconds.',
      keyFeatures: ['Sales Workflow Automation', 'Social Post Generator', 'Email Sequence Writer', 'Multi-Language Output']
    },
    {
      name: 'Notion AI Workspace & Knowledge Base',
      category: 'Productivity',
      rating: 4.9,
      price: '$8/mo',
      originalPrice: '$10/mo',
      discount: '20% OFF',
      affiliateNetwork: 'PartnerStack',
      baseUrl: 'https://partnerstack.com/ref/notion-ai',
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80',
      pros: ['Instant document Q&A and auto-summaries', 'Integrated directly into Notion docs & tables', 'Translates content into 14 languages'],
      cons: ['Requires existing Notion setup'],
      description: 'Supercharge your notes, docs, and project management with built-in AI writing assistance.',
      keyFeatures: ['Auto-Summarization', 'Action Item Extractor', 'Document Q&A', 'Translation Engine']
    },
    {
      name: 'Surfer SEO Content Intelligence Platform',
      category: 'SEO & Analytics',
      rating: 4.9,
      price: '$89/mo',
      originalPrice: '$119/mo',
      discount: '25% OFF',
      affiliateNetwork: 'PartnerStack',
      baseUrl: 'https://partnerstack.com/ref/surfer-seo',
      imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80',
      pros: ['Real-time content score optimization', 'NLP keyword suggestion engine', 'SERP audit & competitor gap analysis'],
      cons: ['Higher starting monthly investment'],
      description: 'The premier SEO content optimization tool used by top publishers to rank #1 on Google.',
      keyFeatures: ['Content Editor', 'SERP Analyzer', 'Keyword Surfer', 'Audit Generator']
    },
    {
      name: 'InVideo AI Video Creator',
      category: 'Video Production',
      rating: 4.7,
      price: '$25/mo',
      originalPrice: '$35/mo',
      discount: '28% OFF',
      affiliateNetwork: 'PartnerStack',
      baseUrl: 'https://partnerstack.com/ref/invideo-ai',
      imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&auto=format&fit=crop&q=80',
      pros: ['Generates YouTube Shorts and TikToks from text prompts', 'Human sounding AI voiceovers', 'Stock video library included'],
      cons: ['Export limit on free trial tier'],
      description: 'Turn any prompt or script into a publish-ready YouTube Short or video ad automatically.',
      keyFeatures: ['Prompt to Video Engine', '16:9 and 9:16 Formats', 'Voice Synthesis', 'Stock Media Library']
    }
  ],
  'Smart Home & Tech': [
    {
      name: 'Philips Hue Smart Lighting Starter Kit',
      category: 'Smart Lighting',
      rating: 4.7,
      price: '$129.99',
      originalPrice: '$159.99',
      discount: '19% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B07GJBBGH8',
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
      pros: ['16 Million Colors & HomeKit/Alexa integration', 'Reliable Zigbee Bridge connection', 'Automated schedules & geofencing'],
      cons: ['Bridge hub required'],
      description: 'Transform your home ambiance with voice-controlled million-color smart bulbs.',
      keyFeatures: ['Voice Control (Alexa/Siri/Google)', 'Geofencing Auto Turn-On', '16 Million Color Options', 'Hue Bridge Included']
    },
    {
      name: 'Ring Video Doorbell Pro 2',
      category: 'Home Security',
      rating: 4.7,
      price: '$199.99',
      originalPrice: '$249.99',
      discount: '20% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B086Q54K53',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
      pros: ['1536p HD Head-to-Toe Video', '3D Motion Detection & Bird\'s Eye View', 'Two-Way Talk with Audio+'],
      cons: ['Hardwired installation required'],
      description: 'Premium wired video doorbell with head-to-toe video coverage and 3D radar motion detection.',
      keyFeatures: ['1536p HD Video', '3D Motion Radar', 'Head-to-Toe View', 'Alexa Greeting Assistant']
    },
    {
      name: 'Ecobee Smart Thermostat Premium',
      category: 'Smart Climate',
      rating: 4.8,
      price: '$219.99',
      originalPrice: '$249.99',
      discount: '12% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B09XXS9GFT',
      imageUrl: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&auto=format&fit=crop&q=80',
      pros: ['Saves up to 26% on annual heating & cooling costs', 'Built-in Siri & Alexa voice control', 'Included SmartSensor for room temp balancing'],
      cons: ['C-wire power adapter needed for older homes'],
      description: 'Save energy and control home climate with air quality monitoring and built-in voice assistants.',
      keyFeatures: ['Air Quality Monitor', 'Included SmartSensor', 'Built-in Alexa/Siri', 'Energy Star Certified']
    },
    {
      name: 'Sonos Era 100 Smart Speaker',
      category: 'Smart Audio',
      rating: 4.8,
      price: '$249.00',
      originalPrice: '$279.00',
      discount: '11% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B0BV7J3M3F',
      imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
      pros: ['Next-gen acoustics with stereo separation', 'Bluetooth 5.0 and Wi-Fi streaming', 'Trueplay acoustic tuning'],
      cons: ['Sonos app needed for setup'],
      description: 'Immersive acoustic smart speaker with rich room-filling bass and Alexa voice control.',
      keyFeatures: ['Acoustic Trueplay Tuning', 'WiFi & Bluetooth', 'Sonos Ecosystem Sync', 'Touch Controls']
    },
    {
      name: 'iRobot Roomba j7+ Robot Vacuum',
      category: 'Smart Cleaning',
      rating: 4.7,
      price: '$599.99',
      originalPrice: '$799.99',
      discount: '25% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B09C48YJ8R',
      imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80',
      pros: ['PrecisionVision AI obstacle avoidance', 'Self-emptying base holds 60 days of dirt', 'Imprint Smart Mapping'],
      cons: ['Higher investment cost'],
      description: 'Smart robot vacuum that avoids pet cords, obstacles, and automatically empties its own bin.',
      keyFeatures: ['AI Obstacle Avoidance', 'Automatic Dirt Disposal', 'Imprint Smart Map', 'Alexa Voice Start']
    },
    {
      name: 'Nanoleaf Lines Smart RGB Bar Lights',
      category: 'Smart Decor',
      rating: 4.6,
      price: '$199.99',
      originalPrice: '$229.99',
      discount: '13% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B09KRZ9CXP',
      imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
      pros: ['Backlit modular smart light bars', 'Rhythm music sync visualizer', 'Screen mirror technology'],
      cons: ['Double-sided tape setup required'],
      description: 'Modular RGB light bars that project vibrant ambient lighting effects on your room walls.',
      keyFeatures: ['Music Rhythm Visualizer', '16M+ Colors', 'Screen Mirroring', 'Thread/Matter Enabled']
    }
  ],
  'Fitness & Wellness': [
    {
      name: 'Oura Ring Gen 3 Smart Health Tracker',
      category: 'Wearables',
      rating: 4.6,
      price: '$299.00',
      originalPrice: '$349.00',
      discount: '14% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B0B5FLR49M',
      imageUrl: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63284?w=600&auto=format&fit=crop&q=80',
      pros: ['Discreet titanium ring design', 'Industry-leading sleep stage & readiness analysis', '7-day battery life'],
      cons: ['Sizing kit recommended first'],
      description: 'Accurate 24/7 heart rate, sleep quality, and body temperature biometric monitoring in a sleek ring.',
      keyFeatures: ['Sleep Readiness Score', 'Body Temp Sensing', 'Period Tracking', 'Ultra Light Titanium']
    },
    {
      name: 'Theragun PRO G5 Percussive Massage Gun',
      category: 'Recovery & Fitness',
      rating: 4.9,
      price: '$499.00',
      originalPrice: '$599.00',
      discount: '17% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B0B5FLR99X',
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      pros: ['QuietForce QF150 motor with 60 lbs stall force', 'OLED screen with built-in routine guides', '6 attachments included'],
      cons: ['Premium price point'],
      description: 'Professional-grade deep tissue percussive therapy device for athletic muscle recovery.',
      keyFeatures: ['60 lbs Stall Force', 'OLED Guided Routines', 'Bluetooth App Control', 'Swappable Battery']
    },
    {
      name: 'Garmin Fenix 7 Pro Solar Watch',
      category: 'GPS Outdoor & Multisport',
      rating: 4.9,
      price: '$799.99',
      originalPrice: '$899.99',
      discount: '11% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B0C3MBX4D8',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      pros: ['Solar charging lens extends battery up to 37 days', 'Built-in LED flashlight', 'Multi-band GPS tracking'],
      cons: ['Rugged design is bulkier on smaller wrists'],
      description: 'Ultimate multisport GPS smartwatch with solar charging, LED flashlight, and topo maps.',
      keyFeatures: ['Solar Charging Lens', 'Integrated LED Flashlight', 'Multi-Band GPS', 'Hill Score & Stamina']
    },
    {
      name: 'Whoop 4.0 Fitness Strap',
      category: 'Biometric Wearables',
      rating: 4.7,
      price: '$239.00',
      originalPrice: '$299.00',
      discount: '20% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B09LH23JKS',
      imageUrl: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=600&auto=format&fit=crop&q=80',
      pros: ['Screenless distraction-free health tracker', 'Strain vs Recovery score optimization', 'Waterproof battery pack'],
      cons: ['Membership subscription required'],
      description: 'Continuous 24/7 fitness tracker that optimizes sleep, strain, and recovery performance.',
      keyFeatures: ['Strain Score Algorithm', 'Wireless On-Body Charging', 'Sleep Coach', 'Haptic Alarm']
    },
    {
      name: 'Hyperice Hypervolt 2 Pro Massager',
      category: 'Muscle Recovery',
      rating: 4.8,
      price: '$329.00',
      originalPrice: '$399.00',
      discount: '18% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B09JGGXB8H',
      imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
      pros: ['90W high-torque motor with 5 speeds', 'Patented pressure sensor technology', 'Hyperice App Bluetooth sync'],
      cons: ['Heavier than portable mini guns'],
      description: 'Heavy-duty percussive massage gun with 5 speed settings for serious athlete recovery.',
      keyFeatures: ['90W High Torque Motor', 'Pressure Sensor LED', '5 Speed Dial', 'Bluetooth App Routines']
    },
    {
      name: 'Apple Watch Ultra 2 GPS + Cellular',
      category: 'Smartwatches',
      rating: 4.9,
      price: '$799.00',
      originalPrice: '$849.00',
      discount: '6% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B0CHX5R341',
      imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
      pros: ['3,000 nits brightest display', 'Titanium case with 100m water resistance', 'Dual-frequency precision GPS'],
      cons: ['Designed primarily for iPhone users'],
      description: 'The most capable Apple smartwatch built for endurance, outdoor exploration, and water sports.',
      keyFeatures: ['Titanium Case', '3,000 Nits Display', 'Action Button', 'Dual-Frequency GPS']
    },
    {
      name: 'Bose QuietComfort Ultra Headphones',
      category: 'Audio Tech',
      rating: 4.8,
      price: '$379.00',
      originalPrice: '$429.00',
      discount: '12% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.in/dp/B0CCZ26B5V',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      pros: ['World-class noise cancellation', 'Immersive Spatial Audio mode', '24-hour battery life'],
      cons: ['Carrying case takes space in bags'],
      description: 'Flagship wireless headphones featuring breakthrough spatialized audio and world-class noise cancellation.',
      keyFeatures: ['Immersive Audio', 'World-Class ANC', '24-Hour Battery', 'CustomTune Tech']
    }
  ]
};

async function mineNewProduct(niche) {
  const settings = db.getSettings();
  const pool = productPool[niche] || productPool['AI & SaaS Tools'];
  
  const existingProducts = db.getProducts();
  const unmined = pool.filter(p => !existingProducts.some(ep => ep.name === p.name));
  
  const targetProduct = unmined.length > 0 ? unmined[0] : pool[Math.floor(Math.random() * pool.length)];
  
  let finalAffiliateUrl = targetProduct.baseUrl;
  if (targetProduct.affiliateNetwork === 'Amazon Associates') {
    const tag = settings.amazonTag || 'smartstack-21';
    finalAffiliateUrl = `${targetProduct.baseUrl}?tag=${tag}`;
  } else if (targetProduct.affiliateNetwork === 'PartnerStack') {
    const pId = settings.partnerStackId || 'partner-saas-ref';
    finalAffiliateUrl = `${targetProduct.baseUrl}?ps_ref=${pId}`;
  }

  const newProduct = {
    id: 'prod-' + Date.now(),
    name: targetProduct.name,
    niche: niche,
    category: targetProduct.category,
    rating: targetProduct.rating,
    price: targetProduct.price,
    originalPrice: targetProduct.originalPrice,
    discount: targetProduct.discount,
    affiliateNetwork: targetProduct.affiliateNetwork,
    affiliateUrl: finalAffiliateUrl,
    imageUrl: targetProduct.imageUrl,
    pros: targetProduct.pros,
    cons: targetProduct.cons,
    description: targetProduct.description,
    keyFeatures: targetProduct.keyFeatures
  };

  db.addProduct(newProduct);
  return newProduct;
}

module.exports = {
  mineNewProduct
};
