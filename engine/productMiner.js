const db = require('../database/db');

// Sample Product Catalog Pool across target niches
const productPool = {
  'AI & SaaS Tools': [
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
      cons: ['Requires steady internet connection', 'Learning curve for multitrack timeline'],
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
      cons: ['Word count caps on basic tier', 'Fewer integrations than Enterprise tools'],
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
      cons: ['Add-on fee per workspace member', 'Requires existing Notion setup'],
      description: 'Supercharge your notes, docs, and project management with built-in AI writing assistance.',
      keyFeatures: ['Auto-Summarization', 'Action Item Extractor', 'Document Q&A', 'Translation Engine']
    }
  ],
  'Smart Home & Tech': [
    {
      name: 'Ring Video Doorbell Pro 2',
      category: 'Home Security',
      rating: 4.7,
      price: '$199.99',
      originalPrice: '$249.99',
      discount: '20% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.com/dp/B086Q54K53',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
      pros: ['1536p HD Head-to-Toe Video', '3D Motion Detection & Bird\'s Eye View', 'Two-Way Talk with Audio+'],
      cons: ['Hardwired installation required', 'Ring Protect subscription needed for cloud video saving'],
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
      baseUrl: 'https://www.amazon.com/dp/B09XXS9GFT',
      imageUrl: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&auto=format&fit=crop&q=80',
      pros: ['Saves up to 26% on annual heating & cooling costs', 'Built-in Siri & Alexa voice control', 'Included SmartSensor for room temp balancing'],
      cons: ['C-wire power adapter needed for older homes', 'Requires initial wiring setup'],
      description: 'Save energy and control home climate with air quality monitoring and built-in voice assistants.',
      keyFeatures: ['Air Quality Monitor', 'Included SmartSensor', 'Built-in Alexa/Siri', 'Energy Star Certified']
    }
  ],
  'Fitness & Wellness': [
    {
      name: 'Theragun PRO G5 Percussive Massage Gun',
      category: 'Recovery & Fitness',
      rating: 4.9,
      price: '$499.00',
      originalPrice: '$599.00',
      discount: '17% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.com/dp/B0B5FLR99X',
      imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      pros: ['QuietForce QF150 motor with 60 lbs stall force', 'OLED screen with built-in routine guides', '6 attachments included'],
      cons: ['Premium price point', 'Slightly heavier than Theragun Mini'],
      description: 'Professional-grade deep tissue percussive therapy device for athletic muscle recovery.',
      keyFeatures: ['60 lbs Stall Force', 'OLED Guided Routines', 'Bluetooth App Control', 'Swappable Battery']
    }
  ]
};

async function mineNewProduct(niche) {
  const settings = db.getSettings();
  const pool = productPool[niche] || productPool['AI & SaaS Tools'];
  
  // Pick a product from pool that isn't already added
  const existingProducts = db.getProducts();
  const unmined = pool.filter(p => !existingProducts.some(ep => ep.name === p.name));
  
  const targetProduct = unmined.length > 0 ? unmined[0] : pool[Math.floor(Math.random() * pool.length)];
  
  // Attach appropriate affiliate tag
  let finalAffiliateUrl = targetProduct.baseUrl;
  if (targetProduct.affiliateNetwork === 'Amazon Associates') {
    const tag = settings.amazonTag || 'autoaffiliate-20';
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
