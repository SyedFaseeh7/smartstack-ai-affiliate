const db = require('../database/db');

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

async function generateArticleForProduct(product, articleType = 'Product Review') {
  const settings = db.getSettings();
  const year = new Date().getFullYear();
  
  let title = '';
  let content = '';

  const ftcDisclaimer = `\n*FTC Disclosure: When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. [Learn More](/ftc-disclosure)*\n\n`;

  if (articleType === 'Product Review') {
    title = `${product.name} Review (${year}): Is It Worth Your Money?`;
    content = `## ${product.name} Review (${year}): Honest In-Depth Analysis

${ftcDisclaimer}

Are you considering investing in **${product.name}**? In this comprehensive review, we test its key features, pricing, performance, pros, and cons to help you decide if it is the right choice for your needs.

![${product.name}](${product.imageUrl})

---

## Quick Verdict & Rating

- **Overall Rating**: ⭐⭐⭐⭐⭐ (${product.rating} / 5.0)
- **Current Price**: **${product.price}** *(Original: ~${product.originalPrice} - ${product.discount})*
- **Network / Guarantee**: Verified ${product.affiliateNetwork} Merchant
- **Best For**: Anyone in **${product.niche}** looking for reliable, top-tier performance.

<div class="cta-box">
  <h3>🔥 Exclusive Deal Available Today</h3>
  <p>Get instant access to ${product.name} with current promotional discounts.</p>
  <a href="${product.affiliateUrl}" target="_blank" rel="nofollow sponsored" class="btn btn-primary btn-lg">👉 Check Best Price & Claim Offer on ${product.name}</a>
</div>

---

## What is ${product.name}?

${product.description}

Whether you are looking to streamline your workflow in **${product.category}** or looking for industry-leading reliability, ${product.name} delivers outstanding results out-of-the-box.

### Core Key Features:
${product.keyFeatures.map(f => `- **${f}**: Designed to maximize efficiency and user experience.`).join('\n')}

---

## Pros & Cons

<div class="pros-cons-grid">
  <div class="pros-card">
    <h4>✅ What We Loved (Pros)</h4>
    <ul>
      ${product.pros.map(p => `<li>${p}</li>`).join('\n')}
    </ul>
  </div>
  <div class="cons-card">
    <h4>⚠️ Room for Improvement (Cons)</h4>
    <ul>
      ${product.cons.map(c => `<li>${c}</li>`).join('\n')}
    </ul>
  </div>
</div>

---

## Pricing & Value for Money

At **${product.price}** (regularly ${product.originalPrice}), ${product.name} offers exceptional value compared to legacy alternatives in the **${product.niche}** market.

> **Savings Tip**: Buying through our official link grants you access to special merchant discounts (${product.discount}).

---

## Final Recommendation: Should You Buy ${product.name}?

If you want a proven solution that excels in **${product.category}**, **${product.name}** is easily one of the best investments you can make this year.

<div class="cta-banner">
  <a href="${product.affiliateUrl}" target="_blank" rel="nofollow sponsored" class="btn btn-primary btn-xl">👉 Get ${product.name} at Lowest Price Now</a>
</div>
`;
  } else if (articleType === 'Buyer Guide') {
    title = `Top 5 Best ${product.niche} Solutions in ${year} (Tested & Ranked)`;
    content = `## Top 5 Best ${product.niche} Solutions in ${year} (Tested & Ranked)

${ftcDisclaimer}

Finding high-performing tools in **${product.niche}** can be overwhelming. To help you cut through the noise, our team researched and tested the top-rated choices available today.

---

## 1. Top Pick: ${product.name}

![${product.name}](${product.imageUrl})

- **Rating**: ⭐⭐⭐⭐⭐ (${product.rating}/5)
- **Special Offer**: ${product.price} (${product.discount})

### Why It Ranked #1:
${product.description}

### Highlights:
${product.keyFeatures.map(f => `- **${f}**`).join('\n')}

[👉 Click Here to View ${product.name} Deals & Offers](${product.affiliateUrl})

---

## Buyer's Guide: How to Choose the Right Solution
When evaluating choices in ${product.niche}, prioritize reliability, pricing transparency, and customer support responsiveness.

<div class="cta-banner">
  <a href="${product.affiliateUrl}" target="_blank" rel="nofollow sponsored" class="btn btn-primary btn-xl">👉 Explore Top Deals on ${product.name}</a>
</div>
`;
  }

  const slug = slugify(title) + '-' + Date.now().toString().slice(-4);
  const snippet = `${product.name} Review (${year}): Deep dive into features, pricing (${product.price}), pros, cons, and exclusive deal offers.`;

  const newArticle = {
    id: 'art-' + Date.now(),
    title,
    slug,
    niche: product.niche,
    category: articleType,
    affiliateNetwork: product.affiliateNetwork,
    productId: product.id,
    snippet,
    content,
    status: 'published',
    publishedAt: new Date().toISOString(),
    views: 1,
    clicks: 0
  };

  db.addArticle(newArticle);
  return newArticle;
}

module.exports = {
  generateArticleForProduct
};
