const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data.json');

const amazonProducts = [
  // 1. Membership & Bounty Deals
  {
    id: 'prod-bounty-1',
    name: 'Amazon Prime for Young Adults (6-Month Free Trial)',
    niche: 'Exclusive Deals & Membership',
    category: 'Verified Member Deal',
    rating: 5.0,
    price: 'FREE 6-Month Trial',
    originalPrice: '$14.99/mo value',
    discount: '6 Months FREE Access',
    affiliateNetwork: 'Amazon Verified',
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
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/hz/audible/mlp/membership/premiumplus?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
    pros: ['Includes 1 free credit for any premium audiobook', 'Unlimited listening to Audible Plus catalog', 'Keep your audiobooks forever'],
    cons: ['Renews at $14.95/mo after 30 days if not canceled'],
    description: 'Listen to thousands of audiobooks, podcasts, and Audible Originals free for 30 days.',
    keyFeatures: ['1 Free Audiobook Credit', 'Audible Originals Access', 'Cancel Anytime', 'Listen on Any Device']
  },
  {
    id: 'prod-bounty-3',
    name: 'Amazon Music Unlimited 30-Day Free Trial',
    niche: 'Exclusive Deals & Membership',
    category: 'Verified Member Deal',
    rating: 4.8,
    price: 'FREE 30-Day Trial',
    originalPrice: '$10.99/mo',
    discount: '100M+ Songs HD',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/music/unlimited?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    pros: ['Access to 100+ million songs in HD audio', 'Ad-free unlimited skips & offline playback', 'Spatial Audio support'],
    cons: ['Auto-renews unless canceled'],
    description: 'Stream 100M+ songs ad-free in HD with spatial audio on any device.',
    keyFeatures: ['100M+ Songs HD', 'Ad-Free Streaming', 'Offline Downloads', 'Spatial Audio']
  },
  {
    id: 'prod-bounty-4',
    name: 'Kindle Unlimited 30-Day Free Trial',
    niche: 'Exclusive Deals & Membership',
    category: 'Verified Member Deal',
    rating: 4.9,
    price: 'FREE 30-Day Trial',
    originalPrice: '$11.99/mo',
    discount: 'Unlimited Reading',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/kindle-dbs/hz/signup?tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
    pros: ['Unlimited access to over 4 million digital books', 'Thousands of audiobooks included', 'Read on any device with free Kindle app'],
    cons: ['Books are borrowed, not owned forever'],
    description: 'Enjoy unlimited reading of over 4 million ebooks and audiobooks on any phone, tablet, or Kindle.',
    keyFeatures: ['4M+ Ebooks', 'Audiobooks Included', 'Magazine Subscriptions', 'Multi-Device Sync']
  },

  // 2. Amazon Devices & Smarthome
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
    affiliateUrl: 'https://www.amazon.com/s?k=Amazon+Echo+Dot+5th+Gen+Smart+Speaker&tag=smartstack-20',
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
    affiliateUrl: 'https://www.amazon.com/s?k=Amazon+Fire+TV+Stick+4K+Max&tag=smartstack-20',
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
    affiliateUrl: 'https://www.amazon.com/s?k=Amazon+Kindle+Paperwhite+16GB&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    pros: ['6.8" 300 ppi glare-free display reads like real paper', 'Adjustable warm light for night reading', 'Up to 10 weeks battery life'],
    cons: ['Monochrome screen'],
    description: 'Waterproof e-reader with glare-free screen, adjustable warm light, and weeks of battery life.',
    keyFeatures: ['300 ppi Glare-Free Screen', 'IPX8 Waterproofing', '10 Weeks Battery Life', 'Adjustable Warm Light']
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
    affiliateUrl: 'https://www.amazon.com/s?k=Blink+Outdoor+4+Wireless+HD+Security+Camera&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80',
    pros: ['Two-year battery life on 2 AA lithium batteries', '1080p HD live view & infrared night vision', 'Enhanced motion detection'],
    cons: ['Blink Sync Module required'],
    description: 'Wire-free smart security camera with 2-year battery life and motion detection alerts.',
    keyFeatures: ['2-Year Battery Life', '1080p HD Night Vision', 'Two-Way Audio', 'Weather Resistant']
  },
  {
    id: 'prod-amz-19',
    name: 'Ring Video Doorbell (2023 Release)',
    niche: 'Amazon Devices & Smarthome',
    category: 'Home Security',
    rating: 4.7,
    price: '$99.99',
    originalPrice: '$119.99',
    discount: '17% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Ring+Video+Doorbell&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
    pros: ['1080p HD video with improved motion detection', 'Night vision & head-to-toe view', 'Real-time phone alerts'],
    cons: ['Ring Protect subscription required for video saves'],
    description: '1080p HD video doorbell with two-way talk, motion alerts, and easy battery installation.',
    keyFeatures: ['1080p HD Video', 'Motion Detection', 'Two-Way Talk', 'Alexa Echo Announcements']
  },
  {
    id: 'prod-amz-25',
    name: 'Amazon Fire HD 10 Tablet (32 GB)',
    niche: 'Amazon Devices & Smarthome',
    category: 'Tablets',
    rating: 4.6,
    price: '$139.99',
    originalPrice: '$179.99',
    discount: '22% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Amazon+Fire+HD+10+Tablet&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=80',
    pros: ['10.1" 1080p Full HD display', '25% faster octa-core processor', '13-hour battery life'],
    cons: ['Amazon Appstore instead of Google Play'],
    description: 'Vibrant 10.1" Full HD tablet designed for streaming Prime Video, reading, and casual gaming.',
    keyFeatures: ['10.1" 1080p Screen', 'Octa-core Processor', '13-Hour Battery', 'MicroSD Expansion']
  },

  // 3. Audio & Tech
  {
    id: 'prod-amz-4',
    name: 'Apple AirPods Pro (2nd Gen) Wireless Earbuds',
    niche: 'Audio & Tech',
    category: 'Headphones & Earbuds',
    rating: 4.8,
    price: '$199.99',
    originalPrice: '$249.00',
    discount: '20% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Apple+AirPods+Pro+2nd+Gen+Wireless+Earbuds&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80',
    pros: ['Up to 2x more Active Noise Cancellation', 'Adaptive Audio & Transparency Mode', 'USB-C charging case with Precision Finding'],
    cons: ['Best experienced with Apple iOS devices'],
    description: 'Flagship noise-canceling earbuds with spatial audio, magsafe USB-C charging, and touch control.',
    keyFeatures: ['Active Noise Cancellation', 'Adaptive Audio', 'USB-C MagSafe Case', '30 Hours Battery']
  },
  {
    id: 'prod-amz-6',
    name: 'Anker Magnetic Wireless Power Bank 10,000mAh',
    niche: 'Audio & Tech',
    category: 'Mobile Accessories',
    rating: 4.7,
    price: '$44.99',
    originalPrice: '$59.99',
    discount: '25% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Anker+Magnetic+Wireless+Power+Bank+10000mAh&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=600&auto=format&fit=crop&q=80',
    pros: ['Snap-and-go MagSafe wireless charging', 'Foldable built-in phone kickstand', '10,000mAh high capacity'],
    cons: ['MagSafe compatible phones required for magnetic snap'],
    description: 'Portable magnetic battery pack with built-in stand for MagSafe iPhones and USB-C fast charging.',
    keyFeatures: ['10,000mAh Capacity', 'Foldable Kickstand', 'MagSafe Compatible', 'USB-C 20W Fast Charge']
  },
  {
    id: 'prod-amz-7',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    niche: 'Audio & Tech',
    category: 'Headphones & Earbuds',
    rating: 4.9,
    price: '$348.00',
    originalPrice: '$399.99',
    discount: '13% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Sony+WH-1000XM5+Wireless+Headphones&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    pros: ['Industry-leading noise canceling with 8 microphones', 'Ultra-comfortable lightweight design', '30-hour battery life with quick charging'],
    cons: ['Non-folding headband earcups'],
    description: 'Top-rated noise-canceling headphones with crystal-clear call quality and spatial sound.',
    keyFeatures: ['8-Mic Noise Canceling', '30-Hour Battery', 'Auto NC Optimizer', 'Multipoint Connection']
  },
  {
    id: 'prod-amz-8',
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    niche: 'Audio & Tech',
    category: 'Computer Gear',
    rating: 4.9,
    price: '$99.99',
    originalPrice: '$109.99',
    discount: '9% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Logitech+MX+Master+3S+Wireless+Performance+Mouse&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    pros: ['8K DPI track-anywhere optical sensor', 'Quiet click switches reduce noise by 90%', 'MagSpeed electromagnetic scroll wheel'],
    cons: ['Ergonomic right-hand design only'],
    description: 'The iconic precision wireless mouse engineered for creators, coders, and power productivity users.',
    keyFeatures: ['8K DPI Any-Surface Tracking', 'Quiet Clicks', 'MagSpeed Scroll', '70 Days Battery Life']
  },
  {
    id: 'prod-amz-9',
    name: 'Apple iPad Air 11-inch (M2 Chip)',
    niche: 'Audio & Tech',
    category: 'Tablets & Computing',
    rating: 4.9,
    price: '$599.00',
    originalPrice: '$649.00',
    discount: '8% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Apple+iPad+Air+11-inch+M2+Chip&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    pros: ['Blazing-fast M2 chip performance', 'Liquid Retina display with True Tone', 'Supports Apple Pencil Pro'],
    cons: ['Pencil Pro sold separately'],
    description: 'Supercharged 11-inch iPad Air with M2 chip, Liquid Retina display, and landscape front camera.',
    keyFeatures: ['Apple M2 Chip', 'Liquid Retina Display', 'Landscape Front Camera', 'WiFi 6E']
  },
  {
    id: 'prod-amz-14',
    name: 'Keychron K2 Wireless Mechanical Keyboard',
    niche: 'Audio & Tech',
    category: 'Computer Gear',
    rating: 4.7,
    price: '$79.99',
    originalPrice: '$99.99',
    discount: '20% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Keychron+K2+Wireless+Mechanical+Keyboard&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    pros: ['Bluetooth 5.1 & Type-C wired dual mode', 'Mac & Windows layout keycaps included', '4000mAh battery'],
    cons: ['Slightly thicker profile without wrist rest'],
    description: 'Best-selling 75% mechanical keyboard with Gateron switches and Mac/Windows cross-compatibility.',
    keyFeatures: ['75% Compact Layout', 'Bluetooth & Wired', 'Mac & Windows Compatible', 'RGB Backlight']
  },
  {
    id: 'prod-amz-20',
    name: 'Bose QuietComfort Ultra Wireless Headphones',
    niche: 'Audio & Tech',
    category: 'Headphones & Earbuds',
    rating: 4.8,
    price: '$379.00',
    originalPrice: '$429.00',
    discount: '12% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Bose+QuietComfort+Ultra+Wireless+Headphones&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    pros: ['Bose Immersive Audio spatial soundstage', 'World-class active noise cancellation', 'CustomTune sound calibration'],
    cons: ['Premium price tier'],
    description: 'Next-level noise-canceling headphones featuring Bose spatialized audio and cloud-like comfort.',
    keyFeatures: ['Bose Immersive Audio', 'World-Class ANC', '24-Hour Battery Life', 'CustomTune Sound']
  },
  {
    id: 'prod-amz-21',
    name: 'Samsung T7 Shield 2TB Portable SSD',
    niche: 'Audio & Tech',
    category: 'Mobile Accessories',
    rating: 4.9,
    price: '$169.99',
    originalPrice: '$219.99',
    discount: '23% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Samsung+T7+Shield+2TB+Portable+SSD&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop&q=80',
    pros: ['Superfast USB 3.2 Gen 2 read speeds up to 1,050 MB/s', 'IP65 water & dust resistance', '3-meter drop durability'],
    cons: ['Included short cables'],
    description: 'Rugged high-speed portable SSD designed for content creators, photography back ups, and consoles.',
    keyFeatures: ['1,050 MB/s Transfer Speed', 'IP65 Ruggedized', '2TB High Capacity', 'AES 256-bit Encryption']
  },

  // 4. VR & Gaming
  {
    id: 'prod-amz-10',
    name: 'Meta Quest 3 128GB VR Headset',
    niche: 'VR & Gaming',
    category: 'Gaming & VR',
    rating: 4.8,
    price: '$499.99',
    originalPrice: '$549.99',
    discount: '9% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Meta+Quest+3+128GB+VR+Headset&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600&auto=format&fit=crop&q=80',
    pros: ['Full-color mixed reality pass-through', '4K+ Infinite Display resolution', '30% performance boost over Quest 2'],
    cons: ['Elite strap recommended for extended gaming'],
    description: 'Breakthrough mixed reality headset that transforms your virtual world into high-resolution 3D gaming.',
    keyFeatures: ['Mixed Reality Passthrough', 'Snapdragon XR2 Gen 2', 'Touch Plus Controllers', 'Spatial Audio']
  },
  {
    id: 'prod-amz-11',
    name: 'ASUS ROG Ally Handheld Gaming PC',
    niche: 'VR & Gaming',
    category: 'Gaming & VR',
    rating: 4.7,
    price: '$599.99',
    originalPrice: '$699.99',
    discount: '14% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=ASUS+ROG+Ally+Handheld+Gaming+PC&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    pros: ['AMD Z1 Extreme processor for AAA Windows gaming', '120Hz Full HD touch screen', 'Zero-gravity thermal cooling'],
    cons: ['Battery life drains fast on 30W Turbo mode'],
    description: 'Full Windows 11 handheld gaming console capable of playing Steam, Xbox Game Pass, and Epic Games.',
    keyFeatures: ['AMD Ryzen Z1 Extreme', '120Hz FHD Touchscreen', 'Windows 11 OS', 'ROG Intelligent Cooling']
  },
  {
    id: 'prod-amz-13',
    name: 'Samsung 49" Odyssey G9 Curved Gaming Monitor',
    niche: 'VR & Gaming',
    category: 'Gaming & VR',
    rating: 4.8,
    price: '$1,299.99',
    originalPrice: '$1,599.99',
    discount: '19% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Samsung+49+Odyssey+G9+Curved+Gaming+Monitor&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
    pros: ['49-inch Dual QHD 1000R curved display', '240Hz refresh rate & 1ms response time', 'Quantum Mini-LED lighting'],
    cons: ['Requires large desk space'],
    description: 'Immersive super ultra-wide 49-inch curved gaming display designed for competitive simulator enthusiasts.',
    keyFeatures: ['49" Dual QHD Resolution', '240Hz Refresh Rate', '1000R Curvature', 'Quantum Mini-LED']
  },
  {
    id: 'prod-amz-26',
    name: 'PlayStation VR2 Headset',
    niche: 'VR & Gaming',
    category: 'Gaming & VR',
    rating: 4.7,
    price: '$549.99',
    originalPrice: '$599.99',
    discount: '8% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=PlayStation+VR2+Headset&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&auto=format&fit=crop&q=80',
    pros: ['4K HDR OLED displays with 120Hz refresh rate', 'Eye tracking & headset haptic feedback', 'Sense controllers with adaptive triggers'],
    cons: ['Requires PlayStation 5 console'],
    description: 'Next-gen virtual reality for PS5 with 4K HDR visuals, eye tracking, and haptic feedback.',
    keyFeatures: ['4K HDR OLED Display', 'Eye Tracking Tech', 'Headset Haptics', 'Adaptive Triggers']
  },

  // 5. Drones & Photography
  {
    id: 'prod-amz-12',
    name: 'DJI Mini 4 Pro Fly More Combo Drone',
    niche: 'Drones & Photography',
    category: 'Drones & Photography',
    rating: 4.9,
    price: '$1,099.00',
    originalPrice: '$1,199.00',
    discount: '8% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=DJI+Mini+4+Pro+Fly+More+Combo+Drone&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80',
    pros: ['Under 249g lightweight (No FAA registration needed)', 'Omnidirectional obstacle sensing', '4K/60fps HDR video & true vertical shooting'],
    cons: ['Combo kit investment price point'],
    description: 'Ultra-light flagship mini drone with 4K vertical video shooting and omnidirectional obstacle avoidance.',
    keyFeatures: ['Under 249g Weight', '4K/60fps HDR Video', 'Omnidirectional Obstacle Avoidance', '34-Min Flight Time']
  },
  {
    id: 'prod-amz-17',
    name: 'GoPro HERO12 Black Action Camera',
    niche: 'Drones & Photography',
    category: 'Drones & Photography',
    rating: 4.8,
    price: '$399.99',
    originalPrice: '$449.99',
    discount: '11% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=GoPro+HERO12+Black+Action+Camera&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80',
    pros: ['5.3K60 video & 27MP photos', 'HyperSmooth 6.0 stabilization', 'HDR video & Bluetooth audio support'],
    cons: ['Extra Enduro battery recommended for long shoots'],
    description: 'Rugged waterproof 5.3K action camera with HyperSmooth 6.0 stabilization and Bluetooth mic pairing.',
    keyFeatures: ['5.3K 60fps Video', 'HyperSmooth 6.0', '33ft Waterproof', 'HDR Video & Photos']
  },
  {
    id: 'prod-amz-22',
    name: 'DJI Osmo Pocket 3 Gimbal Camera',
    niche: 'Drones & Photography',
    category: 'Drones & Photography',
    rating: 4.9,
    price: '$519.00',
    originalPrice: '$569.00',
    discount: '9% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=DJI+Osmo+Pocket+3+Gimbal+Camera&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80',
    pros: ['1-inch CMOS sensor for stunning 4K/120fps video', '2-inch rotatable OLED touchscreen', '3-axis mechanical stabilization'],
    cons: ['Compact body requires careful handling'],
    description: 'Pocket-sized 4K handheld camera with 1-inch sensor, rotatable screen, and fast auto-focus for vloggers.',
    keyFeatures: ['1-Inch CMOS Sensor', '4K/120fps High Frame Rate', '2" Rotatable Screen', '3-Axis Gimbal']
  },

  // 6. Appliances & Smart Home
  {
    id: 'prod-amz-15',
    name: 'Ninja Air Fryer Pro XL 5.5 Qt',
    niche: 'Appliances & Smart Home',
    category: 'Kitchen Appliances',
    rating: 4.8,
    price: '$119.99',
    originalPrice: '$159.99',
    discount: '25% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Ninja+Air+Fryer+Pro+XL+5.5+Qt&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&auto=format&fit=crop&q=80',
    pros: ['Air fry with up to 75% less fat', '5.5 quart nonstick ceramic basket', 'Air Broil, Air Roast, & Dehydrate functions'],
    cons: ['Countertop footprint'],
    description: 'High-capacity family size air fryer engineered to crisp foods fast with up to 75% less fat.',
    keyFeatures: ['5.5 Qt Basket', '75% Less Fat', 'Air Roast & Dehydrate', 'Dishwasher Safe Parts']
  },
  {
    id: 'prod-amz-16',
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    niche: 'Appliances & Smart Home',
    category: 'Smart Cleaning',
    rating: 4.7,
    price: '$749.99',
    originalPrice: '$849.99',
    discount: '12% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Dyson+V15+Detect+Cordless+Vacuum+Cleaner&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80',
    pros: ['Laser illuminates microscopic dust on hard floors', 'LCD screen displays particle counts', 'Automatically adapts suction power'],
    cons: ['High-end price investment'],
    description: 'Dyson’s most powerful cordless vacuum with laser illumination that reveals invisible dust.',
    keyFeatures: ['Laser Dust Illumination', 'Piezo Sensor Dust Counting', '60-Min Run Time', 'Digital Motorbar']
  },
  {
    id: 'prod-amz-18',
    name: 'Breville Barista Touch Espresso Machine',
    niche: 'Appliances & Smart Home',
    category: 'Kitchen Appliances',
    rating: 4.9,
    price: '$999.95',
    originalPrice: '$1,199.95',
    discount: '17% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Breville+Barista+Touch+Espresso+Machine&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    pros: ['Automated touchscreen menu for 5 coffee favorites', 'Integrated conical burr grinder', 'Auto microfoam milk texturing'],
    cons: ['Requires regular descaling maintenance'],
    description: 'Barista quality espresso machine with intuitive touchscreen, integrated grinder, and automated microfoam.',
    keyFeatures: ['Touchscreen Interface', 'Integrated Burr Grinder', 'ThermoJet 3-Sec Heatup', 'Auto Microfoam Milk']
  },
  {
    id: 'prod-amz-23',
    name: 'Instant Pot Duo Plus 9-in-1 Electric Pressure Cooker',
    niche: 'Appliances & Smart Home',
    category: 'Kitchen Appliances',
    rating: 4.8,
    price: '$129.95',
    originalPrice: '$149.95',
    discount: '13% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=Instant+Pot+Duo+Plus+9-in-1+Electric+Pressure+Cooker&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80',
    pros: ['9-in-1 functionality: pressure cooker, slow cooker, rice cooker, yogurt maker, steamer', 'Easy release steam switch', 'Cooks up to 70% faster'],
    cons: ['Inner pot sealing ring requires washing'],
    description: 'Versatile 9-in-1 smart pressure cooker with whisper-quiet steam release and 25 preset cooking programs.',
    keyFeatures: ['9-in-1 Multi-Cooker', '70% Faster Cooking', 'WhisperQuiet Steam Release', '6 Quart Stainless Pot']
  },
  {
    id: 'prod-amz-24',
    name: 'iRobot Roomba Combo j7+ Robot Vacuum & Mop',
    niche: 'Appliances & Smart Home',
    category: 'Smart Cleaning',
    rating: 4.7,
    price: '$799.00',
    originalPrice: '$999.00',
    discount: '20% OFF',
    affiliateNetwork: 'Amazon Verified',
    affiliateUrl: 'https://www.amazon.com/s?k=iRobot+Roomba+Combo+j7%2B+Robot+Vacuum+and+Mop&tag=smartstack-20',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80',
    pros: ['Auto-retracting mop lift system prevents wet carpets', 'PrecisionVision navigation avoids pet waste & cables', 'Clean Base auto-disposal unit'],
    cons: ['Base station requires dedicated floor space'],
    description: 'Hands-free robot vacuum and mop that automatically retracts its mop pad on carpets and empties itself.',
    keyFeatures: ['Auto-Retracting Mop', 'PrecisionVision Obstacle Avoid', '60-Day Self Empty Base', 'Smart Mapping']
  }
];

// Automatically generate published review articles for ALL 30 products in the catalog
function buildPublishedArticlesFromProducts(products) {
  return products.map((p, idx) => {
    const slugName = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let slug = `${slugName}-review-2026`;
    if (p.id === 'prod-bounty-1') slug = 'get-free-amazon-prime-6-month-trial-young-adults';
    if (p.id === 'prod-amz-1') slug = 'amazon-echo-dot-5th-gen-smart-speaker-review';
    if (p.id === 'prod-amz-4') slug = 'best-earphones-2026-apple-airpods-pro-2nd-gen-review';

    return {
      id: `art-amz-${idx + 1}`,
      title: p.name.includes('Review') ? p.name : `${p.name} In-Depth Review (${p.price})`,
      slug: slug,
      niche: p.niche,
      category: p.category,
      affiliateNetwork: p.affiliateNetwork,
      productId: p.id,
      snippet: `${p.description} Read our comprehensive breakdown of features, rating (${p.rating}/5), pros, cons, and current Amazon deal price (${p.price}).`,
      content: `## ${p.name} Review (2026)

${p.description}

![${p.name}](${p.imageUrl})

## Key Standout Features
${p.keyFeatures.map(f => `- **${f}**: High performance benchmarks evaluated by SmartStack AI.`).join('\n')}

## Pros & Cons
**Pros:**
${p.pros.map(pr => `- ${pr}`).join('\n')}

**Cons:**
${p.cons.map(c => `- ${c}`).join('\n')}

---

## Verdict & Pricing (${p.rating} / 5.0)

At **${p.price}** (regularly ${p.originalPrice}), ${p.name} is one of the highest value choices in **${p.niche}**.

[👉 Check Current Discount & Availability on Amazon](${p.affiliateUrl})
`,
      status: 'published',
      publishedAt: new Date(Date.now() - idx * 3600000).toISOString(),
      views: 0,
      clicks: 0
    };
  });
}

const defaultArticles = buildPublishedArticlesFromProducts(amazonProducts);

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
    activeNiches: [
      'Amazon Devices & Smarthome',
      'Audio & Tech',
      'VR & Gaming',
      'Drones & Photography',
      'Appliances & Smart Home',
      'Exclusive Deals & Membership'
    ],
    siteName: 'SmartStack AI Product Reviews & Amazon Deals',
    siteTagline: 'Unbiased Data-Driven Amazon Product Reviews & Deals'
  },
  products: amazonProducts,
  articles: defaultArticles,
  clicks: [],
  campaigns: [
    {
      id: 'camp-1',
      name: 'Amazon Prime & Audio Tech Deals',
      niche: 'Audio & Tech',
      targetKeywords: ['best earphones 2026', 'airpods pro review', 'free prime trial'],
      status: 'active',
      articlesGenerated: defaultArticles.length,
      lastRun: new Date().toISOString()
    }
  ]
};

function initDb(force = false) {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE) || force) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf8');
  }
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
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  reseedDb: () => initDb(true),
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
