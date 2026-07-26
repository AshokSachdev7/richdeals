import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();

const posts = await p.post.findMany({
  where: { publishedAt: { gte: new Date(Date.now() - 3 * 864e5) } },
  select: { slug: true, publishedAt: true, cover: true },
  orderBy: { publishedAt: 'desc' },
});
console.log('POSTS last 3 days:');
for (const x of posts) console.log(' ', x.publishedAt.toISOString().slice(0, 16), x.cover ? 'COVER' : 'NOCOVER', x.slug);

// Serial, not Promise.all — managed PG caps at ~22 connections and the local
// API already holds a pool.
const live = await p.deal.count({ where: { status: 'LIVE' } });
const pend = await p.deal.count({ where: { status: 'PENDING_REVIEW' } });
const noimg = await p.deal.count({ where: { status: 'LIVE', image: null } });
const noprice = await p.deal.count({ where: { status: 'LIVE', price: null } });
const last24 = await p.deal.count({ where: { createdAt: { gte: new Date(Date.now() - 864e5) } } });
const last6 = await p.deal.count({ where: { createdAt: { gte: new Date(Date.now() - 6 * 36e5) } } });
console.log({ live, pend, noimg, noprice, last24, last6 });

const byStore = await p.deal.groupBy({
  by: ['storeId'],
  where: { createdAt: { gte: new Date(Date.now() - 864e5) } },
  _count: true,
});
const stores = await p.store.findMany({ select: { id: true, name: true } });
const nameOf = Object.fromEntries(stores.map((s) => [s.id, s.name]));
console.log('new-24h by store:', byStore.map((b) => `${nameOf[b.storeId]}:${b._count}`).join(' '));

await p.$disconnect();
