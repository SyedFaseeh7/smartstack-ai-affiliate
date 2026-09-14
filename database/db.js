const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data.json');

// Default dataset containing 20 curated products across AI SaaS, Smart Home & Fitness
const defaultProducts = [
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
    cons: ['Advanced voice cloning requires Pro plan'],
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
    cons: ['Higher tier plans for team collaboration'],
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
    cons: ['Bridge hub required'],
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
    cons: ['Sizing kit recommended first'],
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
  },
  {
    id: 'prod-6',
    name: 'Ring Video Doorbell Pro 2',
    niche: 'Smart Home & Tech',
    category: 'Home Security',
    rating: 4.7,
    price: '$199.99',
    originalPrice: '$249.99',
    discount: '20% OFF',
    affiliateNetwork: 'Amazon Associates',
    affiliateUrl: 'https://www.amazon.in/dp/B086Q54K53?tag=smartstack-21',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
    pros: ['1536p HD Head-to-Toe Video', '3D Motion Radar', 'Two-Way Talk with Audio+'],
    cons: ['Hardwired installation required'],
    description: 'Premium wired video doorbell with head-to-toe video coverage and 3D radar motion detection.',
    keyFeatures: ['1536p HD Video', '3D Motion Radar', 'Head-to-Toe View', 'Alexa Greeting Assistant']
  },
  {
    id: 'prod-7',
    name: 'Theragun PRO G5 Percussive Massage Gun',
    niche: 'Fitness & Wellness',
    category: 'Recovery & Fitness',
    rating: 4.9,
    price: '$499.00',
    originalPrice: '$599.00',
    discount: '17% OFF',
    affiliateNetwork: 'Amazon Associates',
    affiliateUrl: 'https://www.amazon.in/dp/B0B5FLR99X?tag=smartstack-21',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
    pros: ['QuietForce QF150 motor with 60 lbs stall force', 'OLED screen guided routines', '6 attachments included'],
    cons: ['Premium price point'],
    description: 'Professional-grade deep tissue percussive therapy device for athletic muscle recovery.',
    keyFeatures: ['60 lbs Stall Force', 'OLED Guided Routines', 'Bluetooth App Control', 'Swappable Battery']
  },
  {
    id: 'prod-8',
    name: 'Copy.ai Marketing Automation Platform',
    niche: 'AI & SaaS Tools',
    category: 'Content & Sales',
    rating: 4.7,
    price: '$36/mo',
    originalPrice: '$49/mo',
    discount: '26% OFF',
    affiliateNetwork: 'PartnerStack',
    affiliateUrl: 'https://partnerstack.com/ref/copyai-growth',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    pros: ['Automates GTM sales workflows', '90+ copywriting tools', 'Team workspace sharing'],
    cons: ['Fewer integrations than Enterprise tools'],
    description: 'AI powered sales and content engine that writes blog posts, ad copies, and cold emails in seconds.',
    keyFeatures: ['Sales Workflow Automation', 'Social Post Generator', 'Email Sequence Writer', 'Multi-Language Output']
  },
  {
    id: 'prod-9',
    name: 'Ecobee Smart Thermostat Premium',
    niche: 'Smart Home & Tech',
    category: 'Smart Climate',
    rating: 4.8,
    price: '$219.99',
    originalPrice: '$249.99',
    discount: '12% OFF',
    affiliateNetwork: 'Amazon Associates',
    affiliateUrl: 'https://www.amazon.in/dp/B09XXS9GFT?tag=smartstack-21',
    imageUrl: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&auto=format&fit=crop&q=80',
    pros: ['Saves up to 26% on annual heating & cooling costs', 'Built-in Siri & Alexa voice control', 'Included SmartSensor for room temp balancing'],
    cons: ['C-wire power adapter needed for older homes'],
    description: 'Save energy and control home climate with air quality monitoring and built-in voice assistants.',
    keyFeatures: ['Air Quality Monitor', 'Included SmartSensor', 'Built-in Alexa/Siri', 'Energy Star Certified']
  },
  {
    id: 'prod-10',
    name: 'Surfer SEO Content Intelligence Platform',
    niche: 'AI & SaaS Tools',
    category: 'SEO & Analytics',
    rating: 4.9,
    price: '$89/mo',
    originalPrice: '$119/mo',
    discount: '25% OFF',
    affiliateNetwork: 'PartnerStack',
    affiliateUrl: 'https://partnerstack.com/ref/surfer-seo',
    imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80',
    pros: ['Real-time content score optimization', 'NLP keyword suggestion engine', 'SERP audit & competitor gap analysis'],
    cons: ['Higher starting monthly investment'],
    description: 'The premier SEO content optimization tool used by top publishers to rank #1 on Google.',
    keyFeatures: ['Content Editor', 'SERP Analyzer', 'Keyword Surfer', 'Audit Generator']
  },
  {
    id: 'prod-11',
    name: 'Garmin Fenix 7 Pro Solar Watch',
    niche: 'Fitness & Wellness',
    category: 'GPS Outdoor',
    rating: 4.9,
    price: '$799.99',
    originalPrice: '$899.99',
    discount: '11% OFF',
    affiliateNetwork: 'Amazon Associates',
    affiliateUrl: 'https://www.amazon.in/dp/B0C3MBX4D8?tag=smartstack-21',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    pros: ['Solar charging lens extends battery up to 37 days', 'Built-in LED flashlight', 'Multi-band GPS tracking'],
    cons: ['Rugged design is bulkier on smaller wrists'],
    description: 'Ultimate multisport GPS smartwatch with solar charging, LED flashlight, and topo maps.',
    keyFeatures: ['Solar Charging Lens', 'Integrated LED Flashlight', 'Multi-Band GPS', 'Hill Score & Stamina']
  },
  {
    id: 'prod-12',
    name: 'Sonos Era 100 Smart Speaker',
    niche: 'Smart Home & Tech',
    category: 'Smart Audio',
    rating: 4.8,
    price: '$249.00',
    originalPrice: '$279.00',
    discount: '11% OFF',
    affiliateNetwork: 'Amazon Associates',
    affiliateUrl: 'https://www.amazon.in/dp/B0BV7J3M3F?tag=smartstack-21',
    imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
    pros: ['Next-gen acoustics with stereo separation', 'Bluetooth 5.0 and Wi-Fi streaming', 'Trueplay acoustic tuning'],
    cons: ['Sonos app needed for setup'],
    description: 'Immersive acoustic smart speaker with rich room-filling bass and Alexa voice control.',
    keyFeatures: ['Acoustic Trueplay Tuning', 'WiFi & Bluetooth', 'Sonos Ecosystem Sync', 'Touch Controls']
  },
  {
    id: 'prod-13',
    name: 'Notion AI Workspace & Knowledge Base',
    niche: 'AI & SaaS Tools',
    category: 'Productivity',
    rating: 4.9,
    price: '$8/mo',
    originalPrice: '$10/mo',
    discount: '20% OFF',
    affiliateNetwork: 'PartnerStack',
    affiliateUrl: 'https://partnerstack.com/ref/notion-ai',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80',
    pros: ['Instant document Q&A and auto-summaries', 'Integrated directly into Notion docs & tables', 'Translates content into 14 languages'],
    cons: ['Requires existing Notion setup'],
    description: 'Supercharge your notes, docs, and project management with built-in AI writing assistance.',
    keyFeatures: ['Auto-Summarization', 'Action Item Extractor', 'Document Q&A', 'Translation Engine']
  },
  {
    id: 'prod-14',
    name: 'iRobot Roomba j7+ Robot Vacuum',
    niche: 'Smart Home & Tech',
    category: 'Smart Cleaning',
    rating: 4.7,
    price: '$599.99',
    originalPrice: '$799.99',
    discount: '25% OFF',
    affiliateNetwork: 'Amazon Associates',
    affiliateUrl: 'https://www.amazon.in/dp/B09C48YJ8R?tag=smartstack-21',
    imageUrl: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80',
    pros: ['PrecisionVision AI obstacle avoidance', 'Self-emptying base holds 60 days of dirt', 'Imprint Smart Mapping'],
    cons: ['Higher investment cost'],
    description: 'Smart robot vacuum that avoids pet cords, obstacles, and automatically empties its own bin.',
    keyFeatures: ['AI Obstacle Avoidance', 'Automatic Dirt Disposal', 'Imprint Smart Map', 'Alexa Voice Start']
  },
  {
    id: 'prod-15',
    name: 'Whoop 4.0 Fitness Strap',
    niche: 'Fitness & Wellness',
    category: 'Biometric Wearables',
    rating: 4.7,
    price: '$239.00',
    originalPrice: '$299.00',
    discount: '20% OFF',
    affiliateNetwork: 'Amazon Associates',
    affiliateUrl: 'https://www.amazon.in/dp/B09LH23JKS?tag=smartstack-21',
    imageUrl: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=600&auto=format&fit=crop&q=80',
    pros: ['Screenless distraction-free health tracker', 'Strain vs Recovery score optimization', 'Waterproof battery pack'],
    cons: ['Membership subscription required'],
    description: 'Continuous 24/7 fitness tracker that optimizes sleep, strain, and recovery performance.',
    keyFeatures: ['Strain Score Algorithm', 'Wireless On-Body Charging', 'Sleep Coach', 'Haptic Alarm']
  },
  {
    id: 'prod-16',
    name: 'InVideo AI Video Creator',
    niche: 'AI & SaaS Tools',
    category: 'Video Production',
    rating: 4.7,
    price: '$25/mo',
    originalPrice: '$35/mo',
    discount: '28% OFF',
    affiliateNetwork: 'PartnerStack',
    affiliateUrl: 'https://partnerstack.com/ref/invideo-ai',
    imageUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&auto=format&fit=crop&q=80',
    pros: ['Generates YouTube Shorts and TikToks from text prompts', 'Human sounding AI voiceovers', 'Stock video library included'],
    cons: ['Export limit on free trial tier'],
    description: 'Turn any prompt or script into a publish-ready YouTube Short or video ad automatically.',
    keyFeatures: ['Prompt to Video Engine', '16:9 and 9:16 Formats', 'Voice Synthesis', 'Stock Media Library']
  },
  {
    id: 'prod-17',
    name: 'Nanoleaf Lines Smart RGB Bar Lights',
    niche: 'Smart Home & Tech',
    category: 'Smart Decor',
    rating: 4.6,
    price: '$199.99',
    originalPrice: '$229.99',
    discount: '13% OFF',
    affiliateNetwork: 'Amazon Associates',
    affiliateUrl: 'https://www.amazon.in/dp/B09KRZ9CXP?tag=smartstack-21',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&auto=format&fit=crop&q=80',
    pros: ['Backlit modular smart light bars', 'Rhythm music sync visualizer', 'Screen mirror technology'],
    cons: ['Double-sided tape setup required'],
    description: 'Modular RGB light bars that project vibrant ambient lighting effects on your room walls.',
    keyFeatures: ['Music Rhythm Visualizer', '16M+ Colors', 'Screen Mirroring', 'Thread/Matter Enabled']
  },
  {
    id: 'prod-18',
    name: 'Hyperice Hypervolt 2 Pro Massager',
    niche: 'Fitness & Wellness',
    category: 'Muscle Recovery',
    rating: 4.8,
    price: '$329.00',
    originalPrice: '$399.00',
    discount: '18% OFF',
    affiliateNetwork: 'Amazon Associates',
    affiliateUrl: 'https://www.amazon.in/dp/B09JGGXB8H?tag=smartstack-21',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
    pros: ['90W high-torque motor with 5 speeds', 'Patented pressure sensor technology', 'Hyperice App Bluetooth sync'],
    cons: ['Heavier than portable mini guns'],
    description: 'Heavy-duty percussive massage gun with 5 speed settings for serious athlete recovery.',
    keyFeatures: ['90W High Torque Motor', 'Pressure Sensor LED', '5 Speed Dial', 'Bluetooth App Routines']
  },
  {
    id: 'prod-19',
    name: 'Apple Watch Ultra 2 GPS + Cellular',
    niche: 'Fitness & Wellness',
    category: 'Smartwatches',
    rating: 4.9,
    price: '$799.00',
    originalPrice: '$849.00',
    discount: '6% OFF',
    affiliateNetwork: 'Amazon Associates',
    affiliateUrl: 'https://www.amazon.in/dp/B0CHX5R341?tag=smartstack-21',
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    pros: ['3,000 nits brightest display', 'Titanium case with 100m water resistance', 'Dual-frequency precision GPS'],
    cons: ['Designed primarily for iPhone users'],
    description: 'The most capable Apple smartwatch built for endurance, outdoor exploration, and water sports.',
    keyFeatures: ['Titanium Case', '3,000 Nits Display', 'Action Button', 'Dual-Frequency GPS']
  },
  {
    id: 'prod-20',
    name: 'Bose QuietComfort Ultra Headphones',
    niche: 'Smart Home & Tech',
    category: 'Audio Tech',
    rating: 4.8,
    price: '$379.00',
    originalPrice: '$429.00',
    discount: '12% OFF',
    affiliateNetwork: 'Amazon Associates',
    affiliateUrl: 'https://www.amazon.in/dp/B0CCZ26B5V?tag=smartstack-21',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    pros: ['World-class noise cancellation', 'Immersive Spatial Audio mode', '24-hour battery life'],
    cons: ['Carrying case takes space in bags'],
    description: 'Flagship wireless headphones featuring breakthrough spatialized audio and world-class noise cancellation.',
    keyFeatures: ['Immersive Audio', 'World-Class ANC', '24-Hour Battery', 'CustomTune Tech']
  }
];

const defaultArticles = [
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
    views: 520,
    clicks: 64
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

![Philips Hue Lighting](https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80)

[👉 Check Lowest Amazon Price & Available Deals](https://www.amazon.in/dp/B07GJBBGH8?tag=smartstack-21)
`,
    status: 'published',
    publishedAt: '2026-09-13T14:30:00.000Z',
    views: 410,
    clicks: 48
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

[👉 Try Descript AI Free Today](https://partnerstack.com/ref/descript-ai)
`,
    status: 'published',
    publishedAt: '2026-09-14T08:15:00.000Z',
    views: 295,
    clicks: 39
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

[👉 Check Current Oura Ring Pricing on Amazon](https://www.amazon.in/dp/B0B5FLR49M?tag=smartstack-21)
`,
    status: 'published',
    publishedAt: '2026-09-12T11:00:00.000Z',
    views: 380,
    clicks: 44
  },
  {
    id: 'art-5',
    title: 'Surfer SEO Review (2026): Is It Worth $89/mo for Organic Rankings?',
    slug: 'surfer-seo-content-intelligence-review',
    niche: 'AI & SaaS Tools',
    category: 'Product Review',
    affiliateNetwork: 'PartnerStack',
    productId: 'prod-10',
    snippet: 'Surfer SEO analyzes top 50 ranking Google results to give real-time NLP recommendations. We tested it on 100 articles.',
    content: `# Surfer SEO Review (2026): Is It Worth $89/mo for Organic Rankings?

*FTC Disclosure: We earn affiliate commissions from qualifying purchases.*

Getting to page 1 of Google requires more than just guesswork. **Surfer SEO** evaluates top-ranking SERP competitors to give you real-time structural and keyword optimization scores.

![Surfer SEO](https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&auto=format&fit=crop&q=80)

[👉 Start Optimizing with Surfer SEO](https://partnerstack.com/ref/surfer-seo)
`,
    status: 'published',
    publishedAt: '2026-09-14T11:30:00.000Z',
    views: 210,
    clicks: 31
  },
  {
    id: 'art-6',
    title: 'Garmin Fenix 7 Pro Solar Review: The Ultimate Outdoor GPS Watch',
    slug: 'garmin-fenix-7-pro-solar-review',
    niche: 'Fitness & Wellness',
    category: 'Product Review',
    affiliateNetwork: 'Amazon Associates',
    productId: 'prod-11',
    snippet: 'Tested on trail runs and mountain hikes, the Garmin Fenix 7 Pro Solar delivers 37 days of battery life and unmatched GPS precision.',
    content: `# Garmin Fenix 7 Pro Solar Review: The Ultimate Outdoor GPS Watch

*FTC Disclosure: As an Amazon Associate, we earn from qualifying purchases.*

For outdoor explorers and endurance athletes, consumer smartwatches don't cut it. The **Garmin Fenix 7 Pro Solar** incorporates a Power Sapphire solar charging lens that keeps the watch running for over a month.

![Garmin Fenix 7 Pro](https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80)

[👉 View Garmin Fenix 7 Pro Deals on Amazon](https://www.amazon.in/dp/B0C3MBX4D8?tag=smartstack-21)
`,
    status: 'published',
    publishedAt: '2026-09-11T09:00:00.000Z',
    views: 340,
    clicks: 38
  }
];

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
  products: defaultProducts,
  articles: defaultArticles,
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
  // Always ensure fresh 20 products and articles exist
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
