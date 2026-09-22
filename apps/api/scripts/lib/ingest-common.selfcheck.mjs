// Self-check for productLd()'s scrape fallback. Run: node scripts/lib/ingest-common.selfcheck.mjs
// Guards the one path that is easy to break silently: a Product block that
// JSON.parse cannot read still has to yield price + availability, and a block
// with no price must stay unusable rather than publish a priceless row.
import assert from 'node:assert/strict';
import { productLd } from './ingest-common.mjs';

const wrap = (s) => `<script type="application/ld+json">${s}</script>`;

// 1. Myntra shape: unescaped double quote inside the description kills JSON.parse.
const myntra = wrap(`{"@context":"http://schema.org","@type":"Product",
 "name":"Safari Accent Vanilla Hard Sided Trolley",
 "description":"Keyless TSA approved Lock. "This Safari hard-shell trolley" rolls on 8 wheels.",
 "image":"https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/1.jpg",
 "offers":{"@type":"Offer","price":"2249","priceCurrency":"INR",
 "availability":"http://schema.org/InStock"}}`);
const a = productLd(myntra);
assert.equal(a.offers.price, '2249');
assert.match(a.offers.availability, /InStock/);
assert.equal(a.name, 'Safari Accent Vanilla Hard Sided Trolley');
assert.ok(a.image.startsWith('https://assets.myntassets.com/'));

// 2. Raw newline inside a string: the control-char strip handles it, real parse wins.
const nl = wrap('{"@type":"Product","name":"X","offers":{"@type":"Offer","price":"499",\n"availability":"http://schema.org/InStock"}}');
assert.equal(productLd(nl).offers.price, '499');

// 3. Broken block with NO price: must read as unusable, never publish.
const noPrice = wrap('{"@type":"Product","name":"Broken "quote" here","offers":{"@type":"Offer"}}');
assert.equal(productLd(noPrice), null);

// 4. Broken block that is not a Product (Myntra also ships BreadcrumbList): skipped.
const crumb = wrap('{"@type":"BreadcrumbList","name":"Bags "and" Luggage","price":"999"}');
assert.equal(productLd(crumb), null);

// 5. Clean parse still takes the normal path, including @graph.
const graph = wrap('{"@graph":[{"@type":"WebPage"},{"@type":"Product","name":"G","offers":{"price":"100"}}]}');
assert.equal(productLd(graph).name, 'G');

console.log('productLd selfcheck OK (5 cases)');
