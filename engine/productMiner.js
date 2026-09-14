const db = require('../database/db');

// Product Pool focused 100% on Amazon Products & Amazon Bounty Programs
const productPool = {
  'Amazon Devices & Smarthome': [
    {
      name: 'Amazon Echo Dot (5th Gen) Smart Speaker',
      category: 'Smart Speakers',
      rating: 4.7,
      price: '$49.99',
      originalPrice: '$59.99',
      discount: '17% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.com/dp/B09B8V1LZ3',
      imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
      pros: ['Vibrant sound quality with deeper bass', 'Built-in Alexa voice assistant', 'Eero built-in WiFi extender support'],
      cons: ['Power adapter required'],
      description: 'Best-selling compact smart speaker with Alexa voice control and motion temperature sensors.',
      keyFeatures: ['Alexa Voice Assistant', 'Built-in Eero WiFi Mesh', 'Temperature Sensor', 'Privacy Mic Off Button']
    },
    {
      name: 'Amazon Fire TV Stick 4K Max',
      category: 'Streaming Media',
      rating: 4.8,
      price: '$59.99',
      originalPrice: '$69.99',
      discount: '14% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.com/dp/B0BP9SNVH9',
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
      pros: ['Ultra HD 4K streaming with Dolby Vision', 'WiFi 6E high-speed streaming', '16GB storage for games & apps'],
      cons: ['HDMI port required on TV'],
      description: 'Amazon’s most powerful streaming stick with Ambient Experience and WiFi 6E support.',
      keyFeatures: ['4K Ultra HD & HDR10+', 'WiFi 6E Support', 'Alexa Voice Remote', '16GB Storage']
    },
    {
      name: 'Amazon Kindle Paperwhite (16 GB)',
      category: 'E-Readers',
      rating: 4.9,
      price: '$149.99',
      originalPrice: '$169.99',
      discount: '12% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.com/dp/B09TMN58Y2',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
      pros: ['6.8" 300 ppi glare-free display reads like real paper', 'Adjustable warm light for night reading', 'Up to 10 weeks battery life'],
      cons: ['Monochrome screen'],
      description: 'Waterproof e-reader with glare-free screen, adjustable warm light, and weeks of battery life.',
      keyFeatures: ['300 ppi Glare-Free Screen', 'IPX8 Waterproofing', '10 Weeks Battery Life', 'Adjustable Warm Light']
    },
    {
      name: 'Blink Outdoor 4 Wireless HD Security Camera',
      category: 'Home Security',
      rating: 4.6,
      price: '$89.99',
      originalPrice: '$119.99',
      discount: '25% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.com/dp/B0B1N4NBDH',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
      pros: ['Two-year battery life on 2 AA lithium batteries', '1080p HD live view & infrared night vision', 'Enhanced motion detection'],
      cons: ['Blink Sync Module required'],
      description: 'Wire-free smart security camera with 2-year battery life and motion detection alerts.',
      keyFeatures: ['2-Year Battery Life', '1080p HD Night Vision', 'Two-Way Audio', 'Weather Resistant']
    }
  ],
  'Consumer Tech & Audio': [
    {
      name: 'Apple AirPods Pro (2nd Gen) Wireless Earbuds',
      category: 'Headphones & Earbuds',
      rating: 4.8,
      price: '$199.99',
      originalPrice: '$249.00',
      discount: '20% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.com/dp/B0CHWRXH8B',
      imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
      pros: ['Up to 2x more Active Noise Cancellation', 'Adaptive Audio & Transparency Mode', 'USB-C charging case with Precision Finding'],
      cons: ['Best experienced with Apple iOS devices'],
      description: 'Flagship noise-canceling earbuds with spatial audio, magsafe USB-C charging, and touch control.',
      keyFeatures: ['Active Noise Cancellation', 'Adaptive Audio', 'USB-C MagSafe Case', '30 Hours Battery']
    },
    {
      name: 'Anker Magnetic Wireless Power Bank 10,000mAh',
      category: 'Mobile Accessories',
      rating: 4.7,
      price: '$44.99',
      originalPrice: '$59.99',
      discount: '25% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.com/dp/B099F558MC',
      imageUrl: 'https://images.unsplash.com/photo-1609592424083-d5d34208d132?w=600&auto=format&fit=crop&q=80',
      pros: ['Snap-and-go MagSafe wireless charging', 'Foldable built-in phone kickstand', '10,000mAh high capacity'],
      cons: ['MagSafe compatible phones required for magnetic snap'],
      description: 'Portable magnetic battery pack with built-in stand for MagSafe iPhones and USB-C fast charging.',
      keyFeatures: ['10,000mAh Capacity', 'Foldable Kickstand', 'MagSafe Compatible', 'USB-C 20W Fast Charge']
    },
    {
      name: 'Sony WH-1000XM5 Wireless Headphones',
      category: 'Headphones & Earbuds',
      rating: 4.9,
      price: '$348.00',
      originalPrice: '$399.99',
      discount: '13% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.com/dp/B09XS7JWHH',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      pros: ['Industry-leading noise canceling with 8 microphones', 'Ultra-comfortable lightweight design', '30-hour battery life with quick charging'],
      cons: ['Non-folding headband earcups'],
      description: 'Top-rated noise-canceling headphones with crystal-clear call quality and spatial sound.',
      keyFeatures: ['8-Mic Noise Canceling', '30-Hour Battery', 'Auto NC Optimizer', 'Multipoint Connection']
    },
    {
      name: 'Logitech MX Master 3S Wireless Performance Mouse',
      category: 'Computer Gear',
      rating: 4.9,
      price: '$99.99',
      originalPrice: '$109.99',
      discount: '9% OFF',
      affiliateNetwork: 'Amazon Associates',
      baseUrl: 'https://www.amazon.com/dp/B09HM94VDS',
      imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
      pros: ['8K DPI track-anywhere optical sensor', 'Quiet click switches reduce noise by 90%', 'MagSpeed electromagnetic scroll wheel'],
      cons: ['Ergonomic right-hand design only'],
      description: 'The iconic precision wireless mouse engineered for creators, coders, and power productivity users.',
      keyFeatures: ['8K DPI Any-Surface Tracking', 'Quiet Clicks', 'MagSpeed Scroll', '70 Days Battery Life']
    }
  ],
  'Bounties & Membership Deals': [
    {
      name: 'Amazon Prime for Young Adults (6-Month Trial)',
      category: 'Amazon Bounty Program',
      rating: 5.0,
      price: 'FREE 6-Month Trial',
      originalPrice: '$14.99/mo value',
      discount: '$30 Signup Bonus Value',
      affiliateNetwork: 'Amazon Bounty Program',
      baseUrl: 'https://www.amazon.com/joinyoungadult',
      imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop&q=80',
      pros: ['Free 6-Month trial for students & young adults (18-24)', 'Free 1-Day & Same-Day delivery', 'Includes Prime Video, Prime Music, & Grubhub+'],
      cons: ['Requires verification of age (18-24) or student status'],
      description: 'Get 6 months of Amazon Prime for FREE including free fast shipping, Prime Video streaming, and exclusive college deals.',
      keyFeatures: ['6 Months FREE Prime', 'Free 1-Day Shipping', 'Prime Video & Music Included', 'Grubhub+ Free Food Delivery']
    },
    {
      name: 'Audible Premium Plus 30-Day Free Trial',
      category: 'Amazon Bounty Program',
      rating: 4.9,
      price: 'FREE 30-Day Trial',
      originalPrice: '$14.95/mo',
      discount: '2 FREE Audiobooks',
      affiliateNetwork: 'Amazon Bounty Program',
      baseUrl: 'https://www.amazon.com/hz/audible/mlp/membership/premiumplus',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
      pros: ['Includes 1 free credit for any premium audiobook', 'Unlimited listening to Audible Plus catalog', 'Keep your audiobooks forever'],
      cons: ['Renews at $14.95/mo after 30 days if not canceled'],
      description: 'Listen to thousands of audiobooks, podcasts, and Audible Originals free for 30 days.',
      keyFeatures: ['1 Free Audiobook Credit', 'Audible Originals Access', 'Cancel Anytime', 'Listen on Any Device']
    }
  ]
};

async function mineNewProduct(niche) {
  const settings = db.getSettings();
  const pool = productPool[niche] || productPool['Amazon Devices & Smarthome'];
  
  const existingProducts = db.getProducts();
  const unmined = pool.filter(p => !existingProducts.some(ep => ep.name === p.name));
  
  const targetProduct = unmined.length > 0 ? unmined[0] : pool[Math.floor(Math.random() * pool.length)];
  const tag = settings.amazonTag || 'smartstack-20';
  
  let finalAffiliateUrl = targetProduct.baseUrl;
  if (finalAffiliateUrl.includes('?')) {
    finalAffiliateUrl = `${targetProduct.baseUrl}&tag=${tag}`;
  } else {
    finalAffiliateUrl = `${targetProduct.baseUrl}?tag=${tag}`;
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
