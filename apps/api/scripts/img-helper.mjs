// Throwaway image-backfill helper. Serves null-image ASINs, accepts image updates.
// Browser (amazon.in origin) drains it: GET /next → fetch dp in-page → POST /img.
// Run: cd apps/api && node <this>  (needs DATABASE_URL from apps/api/.env)
import http from 'node:http';
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
const tried = new Set(); // ASINs already served this session (skip permafails)

const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'content-type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Content-Type': 'application/json' };
const body = (req) => new Promise((res) => { let b = ''; req.on('data', (c) => b += c); req.on('end', () => res(b)); });

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }

  if (url.pathname === '/next') {
    const store = url.searchParams.get('store') || 'amazon';
    const limit = +(url.searchParams.get('limit') || 50);
    const rows = await p.deal.findMany({ where: { image: null, store: { slug: store }, productId: { notIn: [...tried] } }, select: { productId: true }, distinct: ['productId'], take: limit });
    const asins = [...new Set(rows.map((r) => r.productId))];
    asins.forEach((a) => tried.add(a));
    res.writeHead(200, CORS); return res.end(JSON.stringify(asins));
  }

  if (url.pathname === '/img' && req.method === 'POST') {
    const { asin, img, store = 'amazon' } = JSON.parse(await body(req) || '{}');
    let n = 0;
    if (asin && img) { const r = await p.deal.updateMany({ where: { productId: asin, store: { slug: store }, image: null }, data: { image: img } }); n = r.count; }
    res.writeHead(200, CORS); return res.end(JSON.stringify({ updated: n }));
  }

  if (url.pathname === '/stat') {
    const total = await p.deal.count();
    const nullImg = await p.deal.count({ where: { image: null } });
    res.writeHead(200, CORS); return res.end(JSON.stringify({ total, nullImg, tried: tried.size }));
  }
  res.writeHead(404, CORS); res.end('{}');
}).listen(4100, () => console.log('img-helper on :4100'));
