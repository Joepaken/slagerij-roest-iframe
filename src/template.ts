import { BUSINESS, OFFERS, type Offer } from './data.js';
import { formatDutchDate } from './dates.js';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function withUtm(rawUrl: string): string {
  try {
    const u = new URL(rawUrl);
    if (!u.searchParams.has('utm_source')) u.searchParams.set('utm_source', 'noordwijkapp');
    if (!u.searchParams.has('utm_medium')) u.searchParams.set('utm_medium', 'app');
    return u.toString();
  } catch {
    return rawUrl;
  }
}

function offerBlock(o: Offer): string {
  return `<div class="offer-block">
    <a class="card" href="${escapeHtml(withUtm(o.productUrl))}" rel="noopener">
      <div class="card-body">
        <h2 class="day">${escapeHtml(o.day)}</h2>
        <p class="title">${escapeHtml(o.title)}</p>
        <p class="desc">${escapeHtml(o.description)}</p>
      </div>
      <span class="card-cta">Bekijk →</span>
    </a>
    <p class="cta-hint">Houd de knop 'Bekijk' ingedrukt voor de pop-up</p>
  </div>`;
}

export function renderFolderHtml(lastUpdated: string): string {
  const grid = OFFERS.map(offerBlock).join('\n');
  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Wekelijkse aanbiedingen — ${escapeHtml(BUSINESS.businessName)}</title>
<style>
  :root {
    --accent: #e85a2c;
    --accent-hover: #c94717;
    --card-bg: #2d3528;
    --card-bg-hover: #3a4434;
    --text-light: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.85);
    --page-bg: #ffffff;
    --muted: #5b5b5b;
    --footer-text: #5b5b5b;
    --footer-border: #e5e5e5;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0; padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif;
    color: #1a1a1a;
    background: var(--page-bg);
    line-height: 1.45;
  }
  .folder { max-width: 1200px; margin: 0 auto; padding: 24px 16px; }
  header.top { text-align: center; padding: 8px 8px 24px; }
  header.top h1 {
    font-size: 1.8rem; margin: 0; color: var(--accent);
    font-weight: 600; letter-spacing: 0.3px;
  }
  .grid {
    display: grid; gap: 16px; grid-template-columns: 1fr;
  }
  @media (min-width: 600px) { .grid { grid-template-columns: 1fr 1fr; } }
  @media (min-width: 900px) { .grid { grid-template-columns: 1fr 1fr 1fr; } }
  .offer-block { display: flex; flex-direction: column; }
  .offer-block .cta-hint {
    margin: 8px 4px 0; font-size: 0.8rem; color: var(--muted);
    text-align: center; font-style: italic; line-height: 1.3;
  }
  .card {
    display: flex; flex-direction: column; justify-content: space-between;
    background: var(--card-bg); border-radius: 14px; padding: 20px 22px;
    text-decoration: none; color: var(--text-light); min-height: 160px;
    transition: background 0.15s ease, transform 0.15s ease;
    -webkit-tap-highlight-color: rgba(232, 90, 44, 0.3);
  }
  .card:hover, .card:focus-visible {
    background: var(--card-bg-hover); transform: translateY(-2px); outline: none;
  }
  .card-body { display: flex; flex-direction: column; gap: 8px; }
  .day {
    color: var(--accent); font-size: 1.35rem; font-weight: 600;
    margin: 0; line-height: 1.2;
  }
  .title {
    color: var(--text-light); font-size: 1rem; font-weight: 700;
    margin: 0; line-height: 1.3;
  }
  .desc {
    color: var(--text-muted); font-size: 0.92rem; margin: 0; line-height: 1.4;
  }
  .card-cta {
    display: inline-block; margin-top: 14px; color: var(--accent);
    font-size: 0.85rem; font-weight: 600; text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .contact {
    margin-top: 28px; background: var(--card-bg); border-radius: 14px;
    padding: 20px 22px; color: var(--text-light); text-align: center;
  }
  .contact h3 {
    color: var(--accent); margin: 0 0 8px; font-size: 1.1rem; font-weight: 600;
  }
  .contact p { margin: 4px 0; font-size: 0.95rem; }
  .contact a {
    color: var(--text-light); text-decoration: none; font-weight: 600;
    border-bottom: 1px solid var(--accent);
  }
  .contact .phone-cta {
    display: inline-block; margin-top: 12px; background: var(--accent);
    color: var(--text-light); padding: 12px 22px; border-radius: 8px;
    text-decoration: none; font-weight: 700; border: 0;
    transition: background 0.15s ease;
  }
  .contact .phone-cta:hover { background: var(--accent-hover); }
  footer.meta {
    margin-top: 20px; padding-top: 12px; font-size: 0.75rem;
    color: var(--footer-text); text-align: center;
  }
  footer.meta a { color: var(--footer-text); }
</style>
</head>
<body>
<div class="folder">
  <header class="top">
    <h1>${escapeHtml(BUSINESS.tagline)}</h1>
  </header>

  <section class="grid">
    ${grid}
  </section>

  <section class="contact">
    <h3>Bestellen of vragen?</h3>
    <p>${escapeHtml(BUSINESS.address)}</p>
    <p>Bel om te bestellen — geen webshop</p>
    <a class="phone-cta" href="tel:${escapeHtml(BUSINESS.phoneE164)}">📞 ${escapeHtml(BUSINESS.phone)}</a>
  </section>

  <footer class="meta">
    Bron: <a href="${escapeHtml(withUtm(BUSINESS.website))}" rel="noopener">${escapeHtml(BUSINESS.businessName)}</a> · Bijgewerkt: ${escapeHtml(formatDutchDate(lastUpdated))}
  </footer>
</div>
</body>
</html>
`;
}
