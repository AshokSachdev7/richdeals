// Ping IndexNow for deal slugs pushed through the LOCAL api.
//
// Why this exists: RevalidateService.submitIndexNow() no-ops unless WEB_URL is
// https, and the local .env points at http://localhost:3000. So every deal
// pushed to localhost:4000/admin/deals/bulk revalidated fine and never told a
// search engine. Blogs were unaffected — insert-blog-mdmeta.mjs pings directly.
// ponytail: same hardcoded key/base as that script, on purpose — one prod host.
//
// Usage: node scripts/indexnow-ping.mjs <slug> [slug...]
//        node scripts/indexnow-ping.mjs --paths /offers /blog
const KEY = '33f3a9d63ca15676bbd90586ea80e65f', BASE = 'https://richdeals.in';

const argv = process.argv.slice(2);
const rawPaths = argv[0] === '--paths';
const args = rawPaths ? argv.slice(1) : argv;
if (!args.length) { console.error('usage: node scripts/indexnow-ping.mjs <deal-slug...>'); process.exit(1); }

// Deal pages live at the site root, so a slug IS its path. Listing pages get
// pinged too — a new deal changes them.
const paths = rawPaths ? args : ['/', '/offers', ...args.map((s) => `/${s.replace(/^\//, '')}`)];
const urlList = [...new Set(paths)].map((u) => BASE + u);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ host: 'richdeals.in', key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList }),
});
console.log(`DONE: IndexNow -> HTTP ${res.status} for ${urlList.length} urls`);
