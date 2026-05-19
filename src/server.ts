import express from 'express';
import { BUSINESS, OFFERS } from './data.js';
import { mostRecentMonday } from './dates.js';
import { renderFolderHtml } from './template.js';

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
const STARTED_AT = Date.now();

app.disable('x-powered-by');

app.get('/', (_req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="nl"><meta charset="utf-8" />
<title>${BUSINESS.businessName} iframe-server</title>
<style>body{font-family:sans-serif;max-width:640px;margin:40px auto;padding:0 16px;line-height:1.5}</style>
<h1>${BUSINESS.businessName} iframe-server</h1>
<ul>
  <li><a href="/folder.html">/folder.html</a> — iframe-ready HTML</li>
  <li><a href="/api/data">/api/data</a> — JSON data</li>
  <li><a href="/health">/health</a> — health/status</li>
</ul>`);
});

app.get('/folder.html', (_req, res) => {
  const lastUpdated = mostRecentMonday();
  res.type('html').send(renderFolderHtml(lastUpdated));
});

app.get('/api/data', (_req, res) => {
  res.json({
    ...BUSINESS,
    lastUpdated: mostRecentMonday(),
    offers: OFFERS,
  });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    businessName: BUSINESS.businessName,
    offerCount: OFFERS.length,
    lastUpdated: mostRecentMonday(),
    timezone: 'Europe/Amsterdam',
    uptime: (Date.now() - STARTED_AT) / 1000,
  });
});

app.listen(PORT, () => {
  console.log(`[${BUSINESS.businessName}] listening on :${PORT}`);
});
