// Evergreen "X vs Y" buying-guide pages. Page-type content (not blog posts, so
// no blog-cap), targeting confirmed LOW-competition comparison queries from
// DataForSEO (India): qled vs oled 12.1k, amoled vs oled 8.1k, ssd vs hdd 6.6k,
// front vs top load 5.4k. Facts are general/evergreen — no prices, no fabricated
// specifics. Internal links point to stable category hubs + the TV blog, never
// volatile deal slugs (those expire and rot).

export type Comparison = {
  slug: string;
  seoTitle: string;
  seoDesc: string;
  h1: string;
  intent: string; // short label for the breadcrumb + hub card
  aLabel: string;
  bLabel: string;
  answer: string; // ~50-word direct answer, tuned for AI Overview / snippet
  verdict: string; // one-line pick guidance
  rows: { feature: string; a: string; b: string }[];
  sections: { h2: string; body: string }[];
  faqs: { q: string; a: string }[];
  links: { href: string; text: string }[];
  updated: string; // ISO date, shown as "Updated" + Article datePublished
};

const CATEGORY = (slug: string, label: string) => ({
  href: `/category/shopping-category/${slug}`,
  text: label,
});

export const COMPARISONS: Comparison[] = [
  {
    slug: "qled-vs-oled",
    seoTitle: "QLED vs OLED: Which TV Is Better? (2026 India Guide)",
    seoDesc:
      "QLED vs OLED explained for Indian buyers: black levels, brightness, burn-in, gaming and price compared, plus which TV to pick for your living room. Updated 2026.",
    h1: "QLED vs OLED: Which TV Should You Buy?",
    intent: "TV display tech",
    aLabel: "QLED",
    bLabel: "OLED",
    answer:
      "QLED is an LED-backlit LCD TV with a quantum-dot layer for brighter, more saturated colour; OLED lights every pixel individually for perfect blacks and infinite contrast. QLED wins on peak brightness and price, OLED wins on contrast, viewing angles and motion. Pick QLED for a bright room, OLED for the best picture in a dim room.",
    verdict:
      "Bright living room or tight budget → QLED. Dark home-theatre or best-picture priority → OLED.",
    rows: [
      { feature: "Black levels & contrast", a: "Very good (local dimming)", b: "Perfect — pixels switch fully off" },
      { feature: "Peak brightness", a: "Higher — better in sunlit rooms", b: "Good, but dimmer than top QLEDs" },
      { feature: "Viewing angles", a: "Colour/contrast shifts off-centre", b: "Consistent from any angle" },
      { feature: "Motion & response time", a: "Fast", b: "Fastest — near-instant pixel response" },
      { feature: "Burn-in risk", a: "None", b: "Low with modern panels, but possible with static logos" },
      { feature: "Price", a: "Cheaper at every size", b: "Costs more, especially at 55\"+" },
      { feature: "Best for", a: "Bright rooms, sport, budget", b: "Movies, dark rooms, gaming" },
    ],
    sections: [
      {
        h2: "How QLED and OLED actually work",
        body:
          "A QLED TV is a regular LCD panel with an LED backlight, plus a film of quantum dots that produces purer, brighter colours. Because the backlight is always on behind the screen, true black is hard — dark scenes look dark grey unless the set has good local dimming. An OLED panel has no backlight at all: each of its millions of pixels makes its own light and turns completely off for black, which is why contrast looks infinite and colours pop against the dark.",
      },
      {
        h2: "Which one should you buy in India?",
        body:
          "If your TV sits in a bright room with lots of daylight, QLED's extra brightness cuts through glare and costs noticeably less for the same screen size — a strong pick for cricket, news and general viewing. If you mostly watch movies and shows in a dim room and want the best picture quality, OLED's perfect blacks and wide viewing angles are worth the premium. Gamers benefit from OLED's near-instant response time, though bright-room gamers may still prefer QLED.",
      },
      {
        h2: "Is OLED burn-in still a problem?",
        body:
          "Burn-in — a faint permanent ghost of a static image — was a real worry on early OLEDs. Modern panels add pixel-shifting, logo-dimming and screen-refresh routines that make it very unlikely for normal mixed viewing. If you leave the same news ticker or channel logo on screen for many hours every single day, QLED avoids the risk entirely; for typical households, OLED burn-in is no longer a practical concern.",
      },
    ],
    faqs: [
      { q: "Is OLED better than QLED?", a: "For picture quality in a dark room, yes — OLED has perfect blacks, infinite contrast and better viewing angles. But QLED is brighter for sunlit rooms and costs less, so \"better\" depends on your room and budget." },
      { q: "Does OLED burn-in still happen?", a: "It's very unlikely on modern OLED TVs thanks to pixel-shifting and logo-dimming features. It only becomes a risk if you display the same static image for many hours daily." },
      { q: "Is QLED worth it over a normal LED TV?", a: "Yes if you want brighter, more vivid colour — the quantum-dot layer improves colour volume over a plain LED-LCD. The panel structure is otherwise similar, so blacks still rely on local dimming." },
      { q: "Which lasts longer, QLED or OLED?", a: "QLED's LCD panel has no burn-in risk and a long rated lifespan. Modern OLEDs are also rated for many years of typical use, but QLED has the edge for extreme always-on scenarios." },
      { q: "Is QLED or OLED better for gaming?", a: "OLED's near-instant response time and perfect blacks make games look stunning, especially in a dim room. Bright-room gamers may prefer QLED's higher brightness and lower price." },
    ],
    links: [
      CATEGORY("electronics", "Live electronics & TV deals"),
      { href: "/blog/best-65-inch-tv-flipkart-freedom-sale-2026", text: "Best 65-inch TVs in India" },
    ],
    updated: "2026-08-08",
  },
  {
    slug: "amoled-vs-oled",
    seoTitle: "AMOLED vs OLED: What's the Difference? (2026)",
    seoDesc:
      "AMOLED vs OLED explained simply: AMOLED is a type of OLED used in phones. See how they differ, what Super AMOLED means, and which is better for your eyes. 2026 guide.",
    h1: "AMOLED vs OLED: What's the Difference?",
    intent: "Phone display tech",
    aLabel: "AMOLED",
    bLabel: "OLED",
    answer:
      "AMOLED is a type of OLED, not a rival to it. OLED is the base technology — self-lit pixels that produce true blacks. AMOLED (Active-Matrix OLED) adds a thin-film-transistor layer that switches each pixel faster and more efficiently, which is why phones use it. Every OLED phone screen is technically AMOLED, so for phones there's no picture-quality contest.",
    verdict:
      "They're the same display family. On a phone, \"AMOLED\" and \"OLED\" mean the same thing in practice.",
    rows: [
      { feature: "Full form", a: "Active-Matrix Organic LED", b: "Organic Light-Emitting Diode" },
      { feature: "Relationship", a: "A type of OLED", b: "The base technology" },
      { feature: "Pixel control", a: "TFT active-matrix — fast, efficient", b: "Can be passive- or active-matrix" },
      { feature: "Mostly used in", a: "Phones, watches, tablets", b: "TVs, monitors, phones (as AMOLED)" },
      { feature: "Power efficiency", a: "Higher — great for battery devices", b: "Depends on the driving method" },
      { feature: "Marketing names", a: "Super AMOLED, Dynamic AMOLED", b: "OLED, evo OLED, POLED" },
    ],
    sections: [
      {
        h2: "Are AMOLED and OLED really different?",
        body:
          "Not in the way the marketing suggests. OLED describes the light-emitting material — organic pixels that create their own light and switch fully off for black. AMOLED describes how those pixels are driven: an active-matrix grid of thin-film transistors that controls each pixel individually, so it responds fast and sips power. Because active-matrix is the only practical way to run a high-resolution phone screen, every OLED phone display is an AMOLED display.",
      },
      {
        h2: "What do Super AMOLED and Dynamic AMOLED mean?",
        body:
          "These are Samsung brand names for improved AMOLED panels. Super AMOLED bonds the touch layer directly into the screen instead of using a separate layer on top, which makes the display thinner, brighter in sunlight and more responsive. Dynamic AMOLED adds HDR support and better blue-light management. They're refinements of the same AMOLED technology, not a different display type.",
      },
      {
        h2: "OLED in TVs vs AMOLED in phones",
        body:
          "You'll see \"OLED\" on TVs and \"AMOLED\" on phones, but both are self-lit-pixel displays. TVs use large OLED panels tuned for brightness and viewing distance; phones use compact AMOLED panels tuned for power efficiency and outdoor visibility. The core benefit — true blacks, high contrast, vivid colour — is the same on both.",
      },
    ],
    faqs: [
      { q: "Is AMOLED better than OLED?", a: "It's a trick question — AMOLED is a type of OLED. On phones the two terms mean the same thing, so neither is \"better\" than the other." },
      { q: "Is AMOLED the same as OLED?", a: "Effectively yes for phones. AMOLED is OLED driven by an active-matrix transistor layer, which is what every modern OLED phone screen uses." },
      { q: "Which is better for the eyes, AMOLED or OLED?", a: "They're the same technology. Eye comfort depends on features like high-frequency PWM dimming and low-blue-light modes, not on the AMOLED-vs-OLED label." },
      { q: "What's the difference between Super AMOLED and AMOLED?", a: "Super AMOLED integrates the touch sensor into the panel, making it thinner, brighter outdoors and more responsive. It's an improved AMOLED, not a separate technology." },
      { q: "Does AMOLED save battery?", a: "Yes, especially with dark themes — black pixels switch off completely and draw no power, so dark backgrounds use less battery than on an LCD." },
    ],
    links: [
      CATEGORY("mobiles", "Live mobile & phone deals"),
      CATEGORY("electronics", "Electronics deals"),
    ],
    updated: "2026-08-08",
  },
  {
    slug: "ssd-vs-hdd",
    seoTitle: "SSD vs HDD: Which Should You Buy? (2026 Guide)",
    seoDesc:
      "SSD vs HDD compared: speed, price, capacity and durability, plus whether to pick an SSD or HDD for your laptop and how much storage you actually need. 2026 guide.",
    h1: "SSD vs HDD: Which Storage Should You Buy?",
    intent: "Laptop & PC storage",
    aLabel: "SSD",
    bLabel: "HDD",
    answer:
      "An SSD (solid-state drive) stores data on flash chips with no moving parts, so it's 5-10x faster, silent, shock-resistant and power-efficient. An HDD (hard disk drive) uses spinning platters, costs far less per GB and offers more capacity for the money. Use an SSD for your OS and apps, an HDD for bulk storage of movies, photos and backups.",
    verdict:
      "Everyday speed → SSD (put your OS on it). Cheap bulk storage → HDD. Best value → a small SSD + a large HDD.",
    rows: [
      { feature: "Speed", a: "5-10x faster boot, load & copy", b: "Slower — limited by spinning platters" },
      { feature: "Price per GB", a: "Higher", b: "Lower — cheapest bulk storage" },
      { feature: "Capacity for the money", a: "Less", b: "More — big terabytes cost little" },
      { feature: "Durability", a: "No moving parts — shock-resistant", b: "Fragile if dropped while running" },
      { feature: "Noise & heat", a: "Silent, cool", b: "Audible spin, more heat" },
      { feature: "Power use", a: "Low — better laptop battery", b: "Higher" },
      { feature: "Best use", a: "OS, apps, games", b: "Movies, photos, backups, archives" },
    ],
    sections: [
      {
        h2: "Why an SSD makes a computer feel faster",
        body:
          "Most of the waiting you notice — booting up, opening apps, loading a game level — is the computer reading small files from storage. An SSD reads those files almost instantly because there are no platters to spin or heads to move. Swapping an old laptop's HDD for an SSD is the single biggest speed upgrade you can make; boot times drop from a minute to a few seconds and the whole machine feels new.",
      },
      {
        h2: "SATA SSD vs NVMe SSD",
        body:
          "Not all SSDs are equal. A SATA SSD uses the same connection as an old hard drive and is already a huge jump over an HDD. An NVMe SSD plugs into the faster PCIe lanes and is several times quicker again — best for video editing, large file transfers and demanding games. For everyday use both feel instant; for heavy workloads, choose NVMe if your laptop or motherboard supports it.",
      },
      {
        h2: "Do you still need an HDD?",
        body:
          "For most laptops today, a single SSD is enough. HDDs still make sense when you need to store a very large media library, keep local backups, or run a desktop where you can fit both drives. The classic value setup is a fast SSD for Windows and programs plus a large HDD for everything you don't open every day.",
      },
    ],
    faqs: [
      { q: "Is an SSD better than an HDD?", a: "For speed, durability, noise and power, yes — an SSD wins on every count. An HDD only wins on price per gigabyte, which matters for bulk storage." },
      { q: "Should I get an SSD or HDD for a laptop?", a: "An SSD. It transforms boot and load times and improves battery life. If you need lots of cheap storage too, add an external HDD rather than choosing an internal HDD as your main drive." },
      { q: "How much SSD storage do I need?", a: "256GB is workable for light use, 512GB is the comfortable sweet spot for most people, and 1TB suits gamers or anyone storing large files locally." },
      { q: "Does an SSD make an old laptop faster?", a: "Dramatically. Replacing an HDD with an SSD is usually the biggest single speed upgrade for an ageing laptop, often more noticeable than adding RAM." },
      { q: "Can I use both an SSD and an HDD?", a: "Yes — many laptops and most desktops support both. Put your operating system and apps on the SSD for speed and use the HDD for large files and backups." },
    ],
    links: [
      CATEGORY("electronics", "Live laptop & electronics deals"),
    ],
    updated: "2026-08-08",
  },
  {
    slug: "front-load-vs-top-load-washing-machine",
    seoTitle: "Front Load vs Top Load Washing Machine (2026)",
    seoDesc:
      "Front load vs top load washing machine compared for Indian homes: wash quality, water use, cycle time, price and fabric care — and which one you should buy. 2026 guide.",
    h1: "Front Load vs Top Load Washing Machine: Which to Buy?",
    intent: "Washing machines",
    aLabel: "Front Load",
    bLabel: "Top Load",
    answer:
      "Front-load washing machines clean better, use less water and detergent, and spin clothes drier, but cost more and take longer per cycle. Top-load machines are cheaper, faster, and easier to load without bending, but use more water and are slightly rougher on fabrics. Choose front-load for efficiency and fabric care, top-load for budget and speed.",
    verdict:
      "Best cleaning, gentle on clothes, lower running cost → Front Load. Lower price, faster cycles, easy loading → Top Load.",
    rows: [
      { feature: "Wash quality", a: "Better — tumbling action cleans deeper", b: "Good — but harsher agitator/pulsator" },
      { feature: "Water use", a: "Less — most water-efficient", b: "More per cycle" },
      { feature: "Detergent & energy", a: "Lower — needs less of both", b: "Higher" },
      { feature: "Cycle time", a: "Longer", b: "Shorter — quicker washes" },
      { feature: "Loading", a: "Bend down to load", b: "Load from the top — no bending" },
      { feature: "Fabric care", a: "Gentler on clothes", b: "A little rougher over time" },
      { feature: "Price", a: "Costs more upfront", b: "More budget-friendly" },
      { feature: "Best for", a: "Efficiency, delicate fabrics, long-term savings", b: "Tight budget, speed, easy access" },
    ],
    sections: [
      {
        h2: "How they clean differently",
        body:
          "A front-load machine tumbles clothes through a small pool of water, lifting and dropping them repeatedly — gentle but thorough, which is why it cleans well while using less water and detergent. A top-load machine either uses a central agitator or a pulsator to swirl clothes through a full tub of water. That's faster and cheaper to build, but it uses more water and is a little harder on fabric over years of use.",
      },
      {
        h2: "Semi-automatic vs fully-automatic",
        body:
          "Most top-load machines in India come in two forms. Semi-automatic units have separate wash and spin tubs, cost the least and use less water, but you move clothes between tubs by hand. Fully-automatic units — front-load or top-load — do everything in one drum at the press of a button. If you want the lowest price and don't mind the manual step, semi-automatic top-load is the value pick; for convenience, go fully automatic.",
      },
      {
        h2: "Which suits an Indian home?",
        body:
          "Consider water supply and space. Front-load machines are ideal where you want the lowest running cost and best fabric care, and they fit neatly under a counter. Top-load machines suit homes that want quick washes, easy loading without bending, and a lower purchase price — handy where an inconsistent water supply makes a fast, simple cycle more practical. Check the star rating either way: a higher rating means lower long-term electricity and water bills.",
      },
    ],
    faqs: [
      { q: "Which is better, front load or top load?", a: "Front-load machines clean better, use less water and detergent and are gentler on clothes; top-load machines are cheaper, faster and easier to load. Front-load wins on efficiency, top-load on price and convenience." },
      { q: "Do front-load washers really clean better?", a: "Yes — the tumbling action lifts and drops clothes through detergent repeatedly, which generally removes dirt more thoroughly than a top-load agitator while using less water." },
      { q: "Are front-load machines worth the extra cost?", a: "Over time, often yes. Lower water, detergent and energy use plus gentler fabric care can offset the higher purchase price, especially for regular users." },
      { q: "Which uses less water, front load or top load?", a: "Front-load machines use significantly less water because they wash in a small pool rather than filling a full tub." },
      { q: "Is a top-load machine better for hard water?", a: "Neither type solves hard water on its own — both benefit from the right detergent dose. Top-load semi-automatics simply cost less to run if your supply is inconsistent; a water softener or descaling helps either type." },
    ],
    links: [
      CATEGORY("appliances", "Live washing machine & appliance deals"),
      CATEGORY("home-kitchen", "Home & kitchen deals"),
    ],
    updated: "2026-08-08",
  },
];

export const comparisonBySlug = (slug: string): Comparison | undefined =>
  COMPARISONS.find((c) => c.slug === slug);
