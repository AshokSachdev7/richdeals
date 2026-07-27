// node lib/test-ingest-common.mjs — guards the two ways a bad affiliate link
// has actually shipped: a nested redirect URL, and a Flipkart path that merely
// contains '/p/itm' instead of being one.
import assert from 'node:assert';
import { affiliate, JUNK, productLd } from './ingest-common.mjs';

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

// bare-slug Myntra paths are category landings, not products — these shipped
// as live deals with a null price until the id check went in
assert.strictEqual(affiliate('https://www.myntra.com/hand-towels'), null);
assert.strictEqual(affiliate('https://www.myntra.com/personal-care'), null);
assert.strictEqual(affiliate('https://www.myntra.com/boroplus'), null);
// the two real PDP shapes still pass
assert.ok(affiliate('https://www.myntra.com/olay/moisturiser/35928848/buy'));
assert.ok(affiliate(MY));

// a raw newline inside a review string must not sink the whole Product block —
// Myntra ships this on every PDP with reviews, and strict JSON.parse rejects it
const LD = (body) => `<script type="application/ld+json">${body}</script>`;
const withReview = LD(JSON.stringify({
  '@type': 'Product', name: 'Olay 7in1 Gel Moisturizer',
  image: 'https://assets.myntassets.com/x.jpg',
  offers: { '@type': 'Offer', price: '319', priceCurrency: 'INR', availability: 'InStock' },
  review: { '@type': 'Review', reviewBody: 'GOOD_ONE' },
}).replace('GOOD_ONE', 'good\nproduct'));
assert.strictEqual(productLd(withReview)?.offers.price, '319');
// a block that is broken for any other reason is still skipped, not guessed at
assert.strictEqual(productLd(LD('{"@type":"Product","offers":')), null);

// coupon-conditional freebies are junk; real products with "free" in the name are not
assert.ok(JUNK.test('Mr Muscle Disinfectant free on Rs100 bill'));
assert.ok(!JUNK.test('Sugar Free Gold Low Calorie Sweetener 500 Pellets'));
assert.ok(!JUNK.test('Neutrogena Oil Free Acne Face Wash 175ml'));

console.log('ok');
