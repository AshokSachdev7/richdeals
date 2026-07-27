// node lib/test-ingest-common.mjs — guards the two ways a bad affiliate link
// has actually shipped: a nested redirect URL, and a Flipkart path that merely
// contains '/p/itm' instead of being one.
import assert from 'node:assert';
import { affiliate, JUNK } from './ingest-common.mjs';

const FK = 'https://dl.flipkart.com/blue-star-1-5-ton-5-split-inverter-ac/p/itmedf4eb4212631?pid=ACNHBGWYSHYCSXKU&affid=salescueli';

// the doubled-URL artifact resolves to the same product as the clean URL
assert.deepStrictEqual(affiliate('https://dl.flipkart.com/dl' + FK), affiliate(FK));
assert.match(affiliate(FK).affiliateUrl, /^https:\/\/www\.flipkart\.com\/blue-star-1-5-ton-5-split-inverter-ac\/p\/itmedf4eb4212631\?pid=ACNHBGWYSHYCSXKU&affid=djhackraj$/);

// a path that only contains '/p/itm' is not a product page
assert.strictEqual(affiliate('https://www.flipkart.com/mobiles/samsung/p/itm123?pid=P1'), null);
assert.strictEqual(affiliate('https://www.flipkart.com/desidime/p/desidime_deals?pid=P1'), null);
assert.strictEqual(affiliate('https://www.flipkart.com/blue-star/p/itm123'), null); // no pid

// amazon still wins, and still through the nested-URL path
assert.strictEqual(affiliate('https://dl.x.com/dlhttps://www.amazon.in/dp/B0DDTYBT2Z').productId, 'B0DDTYBT2Z');

// a per-sweep session param must not mint a new productId for the same product
const MY = 'https://www.myntra.com/35928848';
assert.strictEqual(affiliate(`${MY}?&pwsvid=PW178511085`).productId, affiliate(`${MY}?&pwsvid=PW999999999`).productId);
assert.strictEqual(affiliate(`${MY}?&pwsvid=PW1`).affiliateUrl, affiliate(MY).affiliateUrl);
// different products still differ
assert.notStrictEqual(affiliate(MY).productId, affiliate('https://www.myntra.com/19460932').productId);

// coupon-conditional freebies are junk; real products with "free" in the name are not
assert.ok(JUNK.test('Mr Muscle Disinfectant free on Rs100 bill'));
assert.ok(!JUNK.test('Sugar Free Gold Low Calorie Sweetener 500 Pellets'));
assert.ok(!JUNK.test('Neutrogena Oil Free Acne Face Wash 175ml'));

console.log('ok');
