import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
const IST = (d) => new Date(d.getTime() + 19800000).toISOString().slice(0, 10);
const slugs = ['do-you-need-a-watch-winder-automatic-watch-india-2026','cheap-ipad-stylus-alternative-apple-pencil-price-india-2026','phone-cooling-fan-gaming-worth-it-india-2026'];
for (const s of slugs) {
  const r = await p.post.findUnique({ where: { slug: s }, select: { id: true, cover: true, seoTitle: true, seoDesc: true, publishedAt: true, body: true } });
  console.log(r ? `#${r.id} ${s} | cover=${!!r.cover} seoT=${r.seoTitle?.length} seoD=${r.seoDesc?.length} words=${r.body.split(/\s+/).length} ist=${IST(r.publishedAt)}` : `MISSING ${s}`);
}
const posts = await p.post.findMany({ where: { publishedAt: { gte: new Date(Date.now() - 6 * 864e5) } }, select: { publishedAt: true } });
const by = {}; for (const x of posts) by[IST(x.publishedAt)] = (by[IST(x.publishedAt)] || 0) + 1;
console.log('posts/day IST:', Object.entries(by).sort().map(([d, n]) => `${d}=${n}`).join(' '));
console.log('coverless:', await p.post.count({ where: { OR: [{ cover: null }, { cover: '' }] } }));
console.log('seoless:', await p.post.count({ where: { OR: [{ seoTitle: null }, { seoDesc: null }] } }));
await p.$disconnect();
