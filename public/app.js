let allArticles = [];
let activeNiche = 'All';

async function fetchArticles() {
  const grid = document.getElementById('articlesGrid');
  grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">⏳ Loading exclusive deals & AI reviews...</div>';

  try {
    const res = await fetch('/api/articles');
    allArticles = await res.json();
    renderArticles();
  } catch (err) {
    console.error('Error fetching articles:', err);
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #f87171;">Failed to load reviews.</div>';
  }
}

function renderArticles() {
  const grid = document.getElementById('articlesGrid');
  const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();

  let filtered = allArticles;

  if (activeNiche !== 'All') {
    filtered = filtered.filter(a => a.niche === activeNiche);
  }

  if (searchQuery) {
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(searchQuery) || 
      a.snippet.toLowerCase().includes(searchQuery) ||
      a.niche.toLowerCase().includes(searchQuery)
    );
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 60px; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px solid var(--border-glass);">
        <h3>No matching reviews found</h3>
        <p style="margin-top: 8px;">Try selecting another category or resetting your search term.</p>
      </div>
    `;
    return;
  }

  const fallbackImg = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80';

  grid.innerHTML = filtered.map(art => {
    const thumbnail = extractThumbnail(art);

    return `
      <article class="article-card">
        <img src="${thumbnail}" alt="${art.title}" class="card-image" loading="lazy" onerror="this.onerror=null;this.src='${fallbackImg}';">
        <div class="card-body">
          <div class="card-meta">
            <span class="tag-badge">${art.category || art.niche}</span>
            <span class="network-badge">⚡ ${art.affiliateNetwork || 'Partner'}</span>
          </div>
          <h2 class="card-title">
            <a href="/article/${art.slug}">${art.title}</a>
          </h2>
          <p class="card-snippet">${art.snippet}</p>
          <div class="card-footer">
            <span class="price-tag">${art.niche === 'AI & SaaS Tools' ? 'Exclusive Deal' : 'Top Verified'}</span>
            <a href="/article/${art.slug}" class="btn-cta">
              Read Review ➔
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function extractThumbnail(art) {
  const imgMatch = art.content ? art.content.match(/!\[.*?\]\((.*?)\)/) : null;
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }

  if (art.niche === 'AI & SaaS Tools') {
    return 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80';
  } else if (art.niche === 'Smart Home & Tech') {
    return 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80';
  }
  return 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80';
}

document.addEventListener('DOMContentLoaded', () => {
  fetchArticles();

  const pills = document.querySelectorAll('#categoryPills .pill');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeNiche = pill.getAttribute('data-niche');
      renderArticles();
    });
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', renderArticles);
  }
});
