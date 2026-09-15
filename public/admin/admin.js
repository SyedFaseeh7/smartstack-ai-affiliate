document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  initTabs();
  loadAnalytics();
  loadSettings();
  loadCampaigns();
  loadArticles();
  loadProducts();
  loadCatalogHealth();

  // Autonomous Toggle
  const autoToggle = document.getElementById('autonomousToggle');
  autoToggle.addEventListener('change', async () => {
    const isChecked = autoToggle.checked;
    await updateSettingsPartial({ autonomousMode: isChecked });
    showNotification(`Autonomous Mode turned ${isChecked ? 'ON 🟢' : 'OFF 🔴'}`);
  });

  // Manual Trigger AI Cycle
  const btnTrigger = document.getElementById('btnTriggerCycle');
  btnTrigger.addEventListener('click', async () => {
    btnTrigger.disabled = true;
    btnTrigger.innerHTML = '<span>⏳</span> Running AI Cycle...';
    try {
      const res = await fetch('/api/automation/trigger', { method: 'POST' });
      const data = await res.json();
      showNotification('✅ Autonomous AI Cycle Completed! New article generated.');
      await loadAnalytics();
      await loadArticles();
      await loadProducts();
    } catch (err) {
      alert('Error running AI cycle: ' + err.message);
    } finally {
      btnTrigger.disabled = false;
      btnTrigger.innerHTML = '<span>⚡</span> Trigger AI Cycle';
    }
  });

  // Mine Product Button
  const btnMine = document.getElementById('btnMineProduct');
  if (btnMine) {
    btnMine.addEventListener('click', async () => {
      btnMine.disabled = true;
      btnMine.innerHTML = '<span>⏳</span> Mining Product...';
      try {
        const res = await fetch('/api/products/mine', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ niche: 'AI & SaaS Tools' })
        });
        const data = await res.json();
        showNotification(`✅ Product mined: ${data.product.name}`);
        await loadProducts();
        await loadAnalytics();
      } catch (err) {
        alert('Mining failed: ' + err.message);
      } finally {
        btnMine.disabled = false;
        btnMine.innerHTML = '<span>⛏️</span> Mine New Product';
      }
    });
  }

  // Catalog Health Audit Button
  const btnAudit = document.getElementById('btnAuditCatalog');
  if (btnAudit) {
    btnAudit.addEventListener('click', async () => {
      btnAudit.disabled = true;
      btnAudit.innerHTML = '<span>⏳</span> Auditing Links...';
      try {
        const res = await fetch('/api/admin/catalog/health?force=true');
        const data = await res.json();
        updateHealthBadge(data);
        showNotification(`✅ Catalog Audit: ${data.healthScore}% Score (${data.summary.healthyUrls}/${data.catalogSize} Live Links)`);
      } catch (err) {
        alert('Health check failed: ' + err.message);
      } finally {
        btnAudit.disabled = false;
        btnAudit.innerHTML = '<span>🔍</span> Audit Link Health';
      }
    });
  }

  // Generate Article Button
  const btnGenerate = document.getElementById('btnManualGenerate');
  if (btnGenerate) {
    btnGenerate.addEventListener('click', async () => {
      btnGenerate.disabled = true;
      btnGenerate.innerHTML = '<span>⏳</span> Writing Article...';
      try {
        const res = await fetch('/api/articles/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ articleType: 'Product Review' })
        });
        const data = await res.json();
        showNotification(`✅ Article published: "${data.article.title.slice(0, 30)}..."`);
        await loadArticles();
        await loadAnalytics();
      } catch (err) {
        alert('Generation failed: ' + err.message);
      } finally {
        btnGenerate.disabled = false;
        btnGenerate.innerHTML = '<span>✨</span> Generate New Review';
      }
    });
  }

  // Form Settings Save
  const formSettings = document.getElementById('formSettings');
  formSettings.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      amazonTag: document.getElementById('setAmazonTag').value.trim(),
      partnerStackId: document.getElementById('setPartnerStackId').value.trim(),
      adminPin: document.getElementById('setAdminPin').value.trim() || 'admin123',
      postingIntervalHours: parseInt(document.getElementById('setPostingInterval').value, 10),
      openaiApiKey: document.getElementById('setOpenAiKey').value.trim()
    };

    await updateSettingsPartial(payload);
    showNotification('💾 Credentials & Master PIN Saved Successfully!');
  });
});

// Admin Passcode Check
function initAuth() {
  const formAuth = document.getElementById('formAuth');
  const overlay = document.getElementById('authOverlay');
  const errorDiv = document.getElementById('authError');

  if (sessionStorage.getItem('smartstack_admin_auth') === 'true') {
    overlay.style.display = 'none';
    return;
  }

  formAuth.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pin = document.getElementById('authPinInput').value.trim();

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('smartstack_admin_auth', 'true');
        overlay.style.display = 'none';
      } else {
        errorDiv.innerText = '❌ Incorrect Master PIN Passcode';
        errorDiv.style.display = 'block';
      }
    } catch (err) {
      errorDiv.innerText = 'Auth error: ' + err.message;
      errorDiv.style.display = 'block';
    }
  });
}

// Tab Switcher
function initTabs() {
  const items = document.querySelectorAll('.nav-item');
  const panes = document.querySelectorAll('.tab-pane');

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      const tabId = item.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');

      const titles = {
        'tab-overview': ['Overview & Performance', 'Real-time tracking of AI automation, clicks, and affiliate earnings.'],
        'tab-campaigns': ['Campaign Launcher', 'Configure niche campaigns, target keywords, and auto-publishing parameters.'],
        'tab-content': ['AI Content Factory', 'Manage AI-generated reviews, markdown edits, and publication status.'],
        'tab-products': ['Mined Product Catalog', 'View extracted product parameters and active affiliate links.'],
        'tab-settings': ['Network Credentials', 'Set your Amazon Associates Tag ID, PartnerStack ID, and API keys.']
      };

      if (titles[tabId]) {
        document.getElementById('tabTitle').innerText = titles[tabId][0];
        document.getElementById('tabSubtitle').innerText = titles[tabId][1];
      }
    });
  });
}

// Load Analytics
async function loadAnalytics() {
  try {
    const res = await fetch('/api/analytics');
    const data = await res.json();

    document.getElementById('metricEarnings').innerText = '$' + data.estimatedEarnings;
    document.getElementById('metricClicks').innerText = data.totalClicks;
    document.getElementById('metricArticles').innerText = data.totalArticles;
    document.getElementById('metricProducts').innerText = data.totalProducts;
    document.getElementById('autonomousToggle').checked = data.autonomousMode;
  } catch (err) {
    console.error('Analytics error:', err);
  }
}

// Load Settings
async function loadSettings() {
  try {
    const res = await fetch('/api/settings');
    const s = await res.json();

    document.getElementById('setAmazonTag').value = s.amazonTag || '';
    document.getElementById('setPartnerStackId').value = s.partnerStackId || '';
    document.getElementById('setAdminPin').value = s.adminPin || 'admin123';
    document.getElementById('setPostingInterval').value = s.postingIntervalHours || 12;
    document.getElementById('setOpenAiKey').value = s.openaiApiKey || '';
  } catch (err) {
    console.error('Settings error:', err);
  }
}

async function updateSettingsPartial(payload) {
  try {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.error('Update settings failed:', err);
  }
}

// Load Articles Table
async function loadArticles() {
  try {
    const res = await fetch('/api/articles');
    const articles = await res.json();

    const tbody = document.getElementById('contentTableBody');
    tbody.innerHTML = articles.map(art => `
      <tr>
        <td>
          <strong><a href="/article/${art.slug}" target="_blank" style="color: #fff;">${art.title}</a></strong>
        </td>
        <td><span class="status-badge status-active">${art.niche}</span></td>
        <td>${art.affiliateNetwork || 'PartnerStack'}</td>
        <td>${art.views || 0}</td>
        <td><strong>${art.clicks || 0}</strong></td>
        <td><span class="status-badge status-published">Published</span></td>
        <td>
          <a href="/article/${art.slug}" target="_blank" style="color: var(--admin-accent); font-weight: 600;">Preview ➔</a>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Articles error:', err);
  }
}

// Load Products Table
async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    const products = await res.json();

    const tbody = document.getElementById('productsTableBody');
    const fallbackImg = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80';

    tbody.innerHTML = products.map(p => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${p.imageUrl}" alt="${p.name}" style="width: 36px; height: 36px; border-radius: 6px; object-fit: cover;" onerror="this.onerror=null;this.src='${fallbackImg}';">
            <strong>${p.name}</strong>
          </div>
        </td>
        <td>${p.niche}</td>
        <td><strong style="color: var(--admin-green);">${p.price}</strong></td>
        <td>${p.affiliateNetwork}</td>
        <td>
          <a href="${p.affiliateUrl}" target="_blank" style="color: #818cf8; font-size: 0.85rem; font-family: monospace;">${p.affiliateUrl.slice(0, 35)}...</a>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Products error:', err);
  }
}

// Load Campaigns Overview
async function loadCampaigns() {
  try {
    const tbody = document.getElementById('overviewCampaignsBody');
    tbody.innerHTML = `
      <tr>
        <td><strong>Q3 SaaS Recurring Scale</strong></td>
        <td>AI & SaaS Tools</td>
        <td>best ai video, saas automation</td>
        <td>8 Articles</td>
        <td><span class="status-badge status-published">Active</span></td>
      </tr>
      <tr>
        <td><strong>Smart Home Tech Deals</strong></td>
        <td>Smart Home & Tech</td>
        <td>philips hue review, smart lighting</td>
        <td>5 Articles</td>
        <td><span class="status-badge status-published">Active</span></td>
      </tr>
    `;

    const clickstbody = document.getElementById('overviewClicksBody');
    clickstbody.innerHTML = `
      <tr>
        <td><code>clk-101</code></td>
        <td>PartnerStack</td>
        <td><code>blog_review_cta</code></td>
        <td>2 minutes ago</td>
      </tr>
      <tr>
        <td><code>clk-102</code></td>
        <td>Amazon Associates</td>
        <td><code>amazon_cta_btn</code></td>
        <td>14 minutes ago</td>
      </tr>
    `;
  } catch (err) {
    console.error('Campaigns error:', err);
  }
}

function showNotification(msg) {
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '25px';
  toast.style.right = '25px';
  toast.style.background = '#10b981';
  toast.style.color = '#fff';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '12px';
  toast.style.fontWeight = '700';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
  toast.style.zIndex = '999999';
  toast.innerText = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Load Real-Time Catalog Health
async function loadCatalogHealth() {
  try {
    const res = await fetch('/api/admin/catalog/health');
    const data = await res.json();
    updateHealthBadge(data);
  } catch (err) {
    console.error('Catalog health load error:', err);
  }
}

function updateHealthBadge(data) {
  const badge = document.getElementById('catalogHealthBadge');
  if (!badge || !data) return;
  const score = data.healthScore || 100;
  badge.innerText = `Health: ${score}% ${score >= 90 ? '🟢' : (score >= 70 ? '🟡' : '🔴')}`;
  if (score >= 90) {
    badge.style.background = 'rgba(16, 185, 129, 0.2)';
    badge.style.color = '#34d399';
    badge.style.borderColor = 'rgba(16, 185, 129, 0.3)';
  } else {
    badge.style.background = 'rgba(239, 68, 68, 0.2)';
    badge.style.color = '#f87171';
    badge.style.borderColor = 'rgba(239, 68, 68, 0.3)';
  }
}
