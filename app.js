const cfg = window.CRP_CONFIG || {};
const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('productSearch');
const filters = document.getElementById('categoryFilters');
let products = [];
let activeCategory = 'All';

function escapeHTML(value='') {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function safeUrl(value) {
  try { const u = new URL(value, window.location.origin); return ['http:','https:'].includes(u.protocol) ? u.href : ''; }
  catch { return ''; }
}
function productCard(p) {
  const image = safeUrl(p.image || '');
  const link = safeUrl(p.affiliateUrl || '');
  const fallback = safeUrl(p.retailerUrl || '');
  const buttonUrl = link || fallback;
  const ready = Boolean(link);
  const price = p.price ? `${escapeHTML(p.currency || 'KES')} ${escapeHTML(p.price)}` : 'Check latest price';
  const imageMarkup = image ? `<img src="${image}" alt="${escapeHTML(p.name)}" loading="lazy">` : `<span class="product-placeholder">CRP</span>`;
  return `<article class="product-card">
    <div class="product-image">${imageMarkup}<span class="product-category">${escapeHTML(p.category || 'Find')}</span></div>
    <div class="product-info"><div class="product-meta">${escapeHTML(p.retailer || 'Retailer')} · ${price}</div>
    <h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description || '')}</p>
    ${buttonUrl ? `<a class="product-button ${ready?'':'disabled'}" href="${buttonUrl}" ${ready?'target="_blank" rel="sponsored nofollow noopener"':'aria-disabled="true"'}>${ready?'View at retailer ↗':'Affiliate link to be added'}</a>` : `<span class="product-button disabled">Link coming soon</span>`}
    </div></article>`;
}
function render() {
  const term = (searchInput?.value || '').trim().toLowerCase();
  const shown = products.filter(p => (activeCategory === 'All' || p.category === activeCategory) &&
    `${p.name} ${p.description} ${p.category} ${p.retailer}`.toLowerCase().includes(term));
  grid.innerHTML = shown.length ? shown.map(productCard).join('') : '<div class="empty-state">No products match that search. Try another category or search term.</div>';
}
async function init() {
  try {
    const response = await fetch('/data/products.json', {cache:'no-store'});
    if (!response.ok) throw new Error('Catalogue unavailable');
    const payload = await response.json();
    products = Array.isArray(payload) ? payload : payload.products;
    if (!Array.isArray(products)) throw new Error('Invalid catalogue');
    render();
  } catch (err) {
    grid.innerHTML = '<div class="empty-state">Our product collection is being updated. Please check back soon.</div>';
  }
}
searchInput?.addEventListener('input', render);
filters?.addEventListener('click', e => {
  const button = e.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  filters.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === button));
  render();
});
document.getElementById('year').textContent = new Date().getFullYear();
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
if (cfg.contactEmail) {
  const el = document.getElementById('emailLink');
  el.href = `mailto:${cfg.contactEmail}`; el.textContent = cfg.contactEmail;
}
if (cfg.facebookUrl) document.getElementById('facebookLink').href = cfg.facebookUrl;
if (cfg.whatsappNumber) document.getElementById('whatsappLink').href = `https://wa.me/${cfg.whatsappNumber}`;
init();