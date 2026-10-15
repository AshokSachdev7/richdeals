import type { Faq, Bullet } from "@/components/HubExplainer";

// Intent landing pages for product queries GSC showed the HOMEPAGE ranking for
// at pos 4-10 with 0 clicks (2026-09 pull: "dinner set", "football under 500",
// "maharaja plastic chair", "cheapest school bags").
// Each page = live deals filtered by title + static buyer guidance. The guidance
// is general product knowledge only; every price on the page comes from the DB.
// ponytail: hardcoded list, move to DB when there are >20 topics.
export type BestTopic = {
  slug: string;
  h1: string;
  title: string; // <title>, ≤60 chars incl. " | RichDeals" suffix from layout
  desc: string; // meta description, 150-160 chars
  noun: string; // plural noun for the live summary line
  q: string; // API free-text query
  maxPrice?: number;
  include: RegExp; // title must match
  exclude?: RegExp; // title must not match
  bullets: Bullet[];
  faq: Faq[];
};

export const BEST_TOPICS: BestTopic[] = [
  {
    slug: "football-under-500",
    h1: "Best Football Under ₹500 in India – Live Deals",
    title: "Best Football Under ₹500 – Size 5 Deals Today",
    desc: "Footballs under ₹500 on sale today: Nivia, Boldfit and more, size 5 and smaller, every price checked on the store page when listed. Updated through the day.",
    noun: "footballs",
    q: "football",
    maxPrice: 500,
    include: /foot\s?ball/i,
    exclude: /shoe|stud|boot|jersey|sock|shin|goal|net\b|table|kit bag|compression|knee|sleeve|merch|t-shirt|\btee\b/i,
    bullets: [
      { label: "Size", text: "size 5 is the full adult match size (roughly age 12 and up); size 4 suits about 8 to 12 year olds and size 3 younger kids." },
      { label: "Material", text: "rubber-moulded balls survive hard, rough ground best; PVC is a cheap all-rounder; PU feels softer and suits grass and turf." },
      { label: "Pump", text: "several listings include a hand pump. Without one, budget for a needle pump, since most balls ship deflated." },
    ],
    faq: [
      { q: "Which football is best under ₹500?", a: "For rough school or street grounds, a rubber-moulded size 5 ball such as the Nivia Storm type is the usual pick at this price. For grass or turf, a PU or PVC stitched ball feels better. The list above shows what is on sale right now, cheapest deals included." },
      { q: "Is size 5 football right for kids?", a: "Size 5 is the standard size from about age 12. Younger children generally play with size 4 (about 8 to 12) or size 3 (under 8), which are lighter and easier to control." },
      { q: "Why is a football under ₹300 so cheap?", a: "Balls under ₹300 are mostly PVC or rubber practice balls. They are fine for casual play but lose shape faster than stitched PU balls used for matches." },
    ],
  },
  {
    slug: "dinner-sets",
    h1: "Dinner Set Deals in India Today – Opalware, Melamine & Steel",
    title: "Dinner Set Deals Today – Cello, Borosil, Larah",
    desc: "Dinner set deals live today: Cello opalware, Larah by Borosil, melamine and stainless steel sets, from 5 to 60+ pieces. Prices checked when each deal was listed.",
    noun: "dinner sets",
    q: "dinner set",
    include: /dinner\s?(set|ware)/i,
    bullets: [
      { label: "Opalware", text: "toughened glass (Cello Dazzle, Larah by Borosil): light, chip-resistant and usually microwave-safe. Check the listing to confirm." },
      { label: "Melamine", text: "hard plastic, nearly unbreakable and cheap, but not microwave-safe." },
      { label: "Steel and ceramic", text: "stainless steel lasts decades; ceramic looks premium but chips if dropped." },
      { label: "Piece count", text: "a 'serves 6' set is typically 18 to 35 pieces once bowls and serving dishes are counted, so compare what the pieces are, not only the number." },
    ],
    faq: [
      { q: "Which dinner set is best for daily use in India?", a: "Opalware sets such as Cello Dazzle or Larah by Borosil are the common daily-use pick: light, microwave-safe in most cases and resistant to chipping. Melamine is cheaper and unbreakable but should not go in a microwave." },
      { q: "Is a melamine dinner set microwave-safe?", a: "No. Melamine should not be heated in a microwave. For reheating food in the plate, pick opalware, ceramic or glass." },
      { q: "How many pieces do I need for a family of 4?", a: "A set in the 16 to 27 piece range usually covers four people with plates, quarter plates and bowls. Larger 35 to 60 piece sets add serving bowls and extra settings for guests." },
    ],
  },
  {
    slug: "plastic-chairs",
    h1: "Plastic Chair Deals – Maharaja, Cello & More",
    title: "Plastic Chair Deals Today – Maharaja, Cello Sets",
    desc: "Plastic chair deals live now: Maharaja, Cello and other armchairs and sets of 2 or 4 for home, balcony and garden. Every price was checked when the deal was listed.",
    noun: "plastic chairs",
    q: "chair",
    include: /plastic|moulded|molded/i,
    exclude: /office|gaming|ergonomic|mesh|cushion cover|mat\b|wheel/i,
    bullets: [
      { label: "Weight rating", text: "check the listed load capacity; home armchairs are commonly rated for around 100 to 150 kg." },
      { label: "Sets", text: "sets of 2 or 4 usually cost less per chair than buying singles." },
      { label: "Outdoor use", text: "UV-stabilised plastic fades and cracks far more slowly in direct sun on a balcony or terrace." },
    ],
    faq: [
      { q: "Which plastic chair brand is good in India?", a: "Maharaja, Cello, Supreme and Nilkamal are the widely sold names. The list above shows which of them are on sale right now and at what price." },
      { q: "Are plastic chair sets cheaper than single chairs?", a: "Usually yes. Sets of 2 or 4 typically work out cheaper per chair; compare the per-chair price across the listings above." },
      { q: "Can plastic chairs be kept outdoors?", a: "Yes, but pick UV-stabilised plastic if they will sit in direct sun, and stack them under cover in the monsoon to make them last longer." },
    ],
  },
  {
    slug: "school-bags",
    h1: "Cheapest School Bags for Kids – Live Deals",
    title: "Cheapest School Bags for Kids – Deals Today",
    desc: "Cheap school bags for kids on sale today: cartoon, lightweight and college backpacks from Amazon and more, each price checked when listed. Updated through the day.",
    noun: "school bags",
    q: "school bag",
    include: /school\s?bag|school backpack|kids backpack/i,
    bullets: [
      { label: "Size by age", text: "about 12 to 15 litres suits pre-primary kids, 18 to 25 litres primary school and 25 litres or more middle school and college." },
      { label: "Comfort", text: "padded shoulder straps and a padded back panel matter more than print; a loaded bag should not hang below the waist." },
      { label: "Water resistance", text: "a coated fabric or a rain cover keeps books dry in the monsoon." },
    ],
    faq: [
      { q: "What size school bag is right for my child?", a: "Roughly 12 to 15 litres for kindergarten, 18 to 25 litres for primary school and 25 litres or more for middle school. Smaller kids are better off with a lighter bag they can carry comfortably." },
      { q: "Where can I find the cheapest school bags online?", a: "The list above shows school bags currently on sale, with the price checked on the store page when each was listed. Sort by price to see the cheapest first." },
      { q: "Is a cheap school bag durable?", a: "Budget bags are fine for younger kids with light loads. For heavy textbooks, look for reinforced stitching at the strap joints and a padded, structured back." },
    ],
  },
  {
    slug: "wireless-earbuds",
    h1: "Wireless Earbuds Deals Today – boAt, Noise, OnePlus & More",
    title: "Wireless Earbuds Deals Today – boAt, Noise",
    desc: "Wireless earbuds on sale today: boAt, Noise, OnePlus, realme and more TWS buds with ANC and long battery life, each price checked on the store when listed.",
    noun: "wireless earbuds",
    q: "earbuds",
    include: /ear\s?buds|\btws\b|true wireless/i,
    exclude: /case cover|silicone case|ear ?tips|cleaning|holder|strap|stand\b/i,
    bullets: [
      { label: "ANC", text: "active noise cancellation helps on buses, trains and flights; budget ANC cuts steady hum well but not voices." },
      { label: "Battery", text: "compare playtime per charge on the buds, not only the total with the case; the case figure adds several recharges together." },
      { label: "Latency", text: "a low-latency or game mode reduces audio lag in games and videos." },
      { label: "Fit", text: "in-ear buds with several tip sizes seal better, which improves both bass and noise isolation." },
    ],
    faq: [
      { q: "Which wireless earbuds are best on a budget in India?", a: "boAt, Noise, realme and OnePlus sell most budget TWS earbuds. The list above shows which models are on sale right now, cheapest first, with the price checked when each deal was listed." },
      { q: "Is ANC worth it in cheap earbuds?", a: "It helps with steady background noise such as fans, engines and AC hum, and does much less against voices. It also uses extra battery. For a daily commute it is usually worth it." },
      { q: "How long do wireless earbuds last?", a: "Battery wear is the usual limit. Buds charged every day typically lose noticeable playtime after a couple of years. Avoiding heat and deep discharge helps." },
    ],
  },
  {
    slug: "power-banks",
    h1: "Power Bank Deals Today – 10000mAh & 20000mAh Offers",
    title: "Power Bank Deals Today – 10000 & 20000mAh",
    desc: "Power bank deals live today: 10000mAh and 20000mAh fast-charging models from Mi, Ambrane, Anker and more. Every price was checked on the store page when listed.",
    noun: "power banks",
    q: "power bank",
    include: /power\s?bank/i,
    exclude: /case|cover|pouch|holder/i,
    bullets: [
      { label: "Real capacity", text: "a 10000mAh power bank delivers noticeably less than 10000mAh to a phone because of conversion losses, typically around one and a half to two full charges for most phones." },
      { label: "Fast charging", text: "match the output (for example 20W PD) to what your phone supports; wattage your phone cannot use adds nothing." },
      { label: "Flights", text: "power banks go in cabin baggage only, never checked-in luggage." },
      { label: "Ports", text: "a USB-C port that both charges and discharges lets one cable do everything." },
    ],
    faq: [
      { q: "10000mAh or 20000mAh – which power bank should I buy?", a: "10000mAh is pocketable and covers a day out for most phones. 20000mAh is heavier but suits travel, several devices, or charging a phone multiple times between wall sockets." },
      { q: "Can I carry a power bank on a flight in India?", a: "Yes, in cabin baggage only. Power banks are not allowed in checked-in luggage. Check your airline's capacity rule before flying." },
      { q: "Why does my power bank give fewer charges than its mAh suggests?", a: "The rated mAh is measured at the internal cell voltage. Converting it to USB output loses energy, so the phone receives only part of the rated capacity. That is normal, not a fault." },
    ],
  },
  {
    slug: "smartwatches",
    h1: "Smartwatch Deals Today – Noise, boAt, Fire-Boltt & More",
    title: "Smartwatch Deals Today – Noise, boAt & More",
    desc: "Smartwatch deals live today: Noise, boAt, Fire-Boltt, Amazfit and more with AMOLED screens and Bluetooth calling. Each price checked on the store when listed.",
    noun: "smartwatches",
    q: "smartwatch",
    include: /smart\s?watch/i,
    exclude: /strap|band only|screen guard|protector|charger|charging cable|case cover|bumper/i,
    bullets: [
      { label: "Display", text: "AMOLED screens are brighter and easier to read outdoors than LCD, and allow an always-on display." },
      { label: "Bluetooth calling", text: "a built-in mic and speaker let you take calls from the wrist while the phone stays nearby." },
      { label: "Health sensors", text: "heart-rate and SpO2 readings on budget watches are wellness estimates, not medical-grade measurements." },
      { label: "Battery", text: "always-on display and frequent calling cut battery life well below the headline figure." },
    ],
    faq: [
      { q: "Which smartwatch is best on a budget in India?", a: "Noise, boAt and Fire-Boltt sell most budget smartwatches, many with AMOLED screens and Bluetooth calling. The list above shows which are on sale right now, cheapest first." },
      { q: "Are budget smartwatch health readings accurate?", a: "They are fine for spotting trends such as resting heart rate over weeks. They are not medical devices, so do not rely on them for diagnosis." },
      { q: "Do smartwatches work with iPhone?", a: "Most budget smartwatches pair with both Android and iPhone through the brand's app, though some features such as quick replies often work only on Android. Check the listing." },
    ],
  },
  {
    slug: "perfumes",
    h1: "Perfume Deals Today – Men & Women Fragrance Offers",
    title: "Perfume Deals Today – Men & Women Offers",
    desc: "Perfume deals live today for men and women: EDP and EDT fragrances, gift sets and body mists from Indian and global brands, each price checked when listed.",
    noun: "perfumes",
    q: "perfume",
    include: /perfume|eau de|\bedp\b|\bedt\b|fragrance/i,
    exclude: /car perfume|air freshener|room|diffuser|reed|empty|atomi[sz]er|incense|candle|detergent|fabric|garbage|bags?\b|tissue|wipes|toilet|cleaner|floor|phenyl|agarbatti|dhoop/i,
    bullets: [
      { label: "Concentration", text: "EDP (eau de parfum) is stronger and usually lasts longer on skin than EDT (eau de toilette); body mists and deos are lightest." },
      { label: "Gift sets", text: "sets of small bottles cost more per ml but let you try several scents before buying a full bottle." },
      { label: "Price per ml", text: "compare price per ml across sizes; a 100ml bottle is often far cheaper per ml than 50ml." },
      { label: "Storage", text: "heat and sunlight break perfume down, so keep bottles in a cool cupboard, not in a car or on a sunny shelf." },
    ],
    faq: [
      { q: "Which lasts longer, EDP or EDT?", a: "EDP has a higher oil concentration, so it generally lasts longer than EDT. Skin type and weather also matter, and hot humid summers shorten any scent." },
      { q: "Are perfume gift sets worth buying?", a: "They are good value as gifts or for trying several scents. If you already know the one you like, a single larger bottle is usually cheaper per ml." },
      { q: "How do I make perfume last longer in summer?", a: "Apply on moisturised skin at pulse points such as wrists and neck, do not rub it in, and keep the bottle away from heat so it does not degrade." },
    ],
  },
  {
    slug: "backpacks",
    h1: "Backpack Deals Today – Laptop, Travel & Office Bags",
    title: "Backpack Deals Today – Laptop & Travel Bags",
    desc: "Backpack deals live today: laptop, office and travel backpacks from American Tourister, Skybags, Wildcraft and more. Each price checked on the store when listed.",
    noun: "backpacks",
    q: "backpack",
    include: /backpack|laptop bag|rucksack/i,
    exclude: /school|kids|rain cover|keychain|charm|\bpin\b|pichkari|water gun|toy/i,
    bullets: [
      { label: "Capacity", text: "about 20 to 30 litres suits daily office or college use; 35 litres and up is for travel or overnight trips." },
      { label: "Laptop sleeve", text: "check the sleeve size in inches matches your laptop, and that it is padded and raised off the bottom of the bag." },
      { label: "Weatherproofing", text: "water-resistant fabric or a bundled rain cover protects a laptop in the monsoon." },
      { label: "Comfort", text: "padded straps, a ventilated back panel and a chest strap make heavy loads easier on the shoulders." },
    ],
    faq: [
      { q: "Which backpack size is right for a laptop?", a: "Most 15.6-inch laptops need a sleeve rated for 15.6 inches, usually in a bag of around 25 litres or more. Check the sleeve size in the listing rather than the litre figure alone." },
      { q: "Is a water-resistant backpack enough for the monsoon?", a: "Water-resistant fabric handles light rain. In heavy downpours, a bag with a rain cover protects electronics much better." },
      { q: "Are cheap backpacks durable?", a: "Budget backpacks are fine for light daily loads. For heavy laptops, look for reinforced stitching at the strap joints and good zips, usually the first parts to fail." },
    ],
  },
  {
    slug: "wireless-mouse",
    h1: "Wireless Mouse Deals Today – Bluetooth, Gaming & Office",
    title: "Wireless Mouse Deals Today – Bluetooth & 2.4GHz",
    desc: "Wireless mouse deals live today: 2.4GHz, Bluetooth, gaming and ergonomic mice from Logitech, HP, Dell, Zebronics and more. Prices checked on the store when listed.",
    noun: "mice",
    q: "wireless mouse",
    include: /(wireless|bluetooth|2\.4)[^|]{0,40}\b(mouse|mice)\b|\b(mouse|mice)\b[^|]{0,40}(wireless|bluetooth)/i,
    exclude: /mouse ?pad|\bmat\b|trap|bungee|skates|grip tape|\brat\b|keyboard/i,
    bullets: [
      { label: "Connection", text: "a 2.4GHz USB receiver is plug-and-play and stable; Bluetooth frees up a port and suits laptops and tablets." },
      { label: "Battery", text: "AA-powered office mice often run for months; rechargeable mice save on cells but need regular charging." },
      { label: "DPI", text: "higher DPI moves the pointer further per hand movement; adjustable DPI matters for gaming, not office work." },
      { label: "Silent clicks", text: "silent-click switches suit shared offices and late-night work." },
    ],
    faq: [
      { q: "Wireless or Bluetooth mouse – which is better?", a: "A 2.4GHz wireless mouse with a USB receiver is the most plug-and-play. Bluetooth needs no receiver and frees a USB port, which helps on thin laptops and tablets." },
      { q: "Do I need a gaming mouse for office work?", a: "No. Office work needs a comfortable shape and reliable tracking. Gaming mice add high DPI, extra buttons and RGB lighting that office use does not need." },
      { q: "Which mouse brands are common in India?", a: "Logitech, HP, Dell and Zebronics sell the most widely used mice here. The list above shows which models are on sale right now, cheapest first." },
    ],
  },
  {
    slug: "lunch-boxes",
    h1: "Lunch Box Deals Today – Steel, Insulated & Tiffin Sets",
    title: "Lunch Box Deals Today – Steel & Insulated",
    desc: "Lunch box deals live today: stainless steel tiffins, insulated and electric lunch boxes from Milton, Cello, Borosil and more. Prices checked when listed.",
    noun: "lunch boxes",
    q: "lunch box",
    include: /lunch\s?box|tiffin/i,
    exclude: /bag only|cover only|sticker/i,
    bullets: [
      { label: "Material", text: "stainless steel does not hold smells or stains and lasts years; plastic is lighter and cheaper but can absorb curry stains." },
      { label: "Insulated", text: "an insulated outer case keeps food warm for a few hours, enough for lunch on most office days." },
      { label: "Electric", text: "electric lunch boxes heat food from a plug point, useful where there is no microwave at work." },
      { label: "Leak-proof", text: "for dal and curries, look for silicone-gasket lids rather than plain snap-on lids." },
    ],
    faq: [
      { q: "Which lunch box keeps food warm the longest?", a: "An insulated steel tiffin keeps food warm for a few hours. If you want hot food at lunch every day and have a plug point, an electric lunch box heats it on the spot." },
      { q: "Is a steel or plastic lunch box better for kids?", a: "Steel is more durable and does not stain or hold smells. Plastic is lighter for small children. Either way, choose food-grade, BPA-free material." },
      { q: "Can steel lunch boxes go in the microwave?", a: "No. Metal should never go in a microwave. Move the food to a microwave-safe dish, or pick a glass or microwave-safe plastic box if you reheat at work." },
    ],
  },
  {
    slug: "mixer-grinders",
    h1: "Mixer Grinder Deals Today – Prestige, Bajaj, Philips",
    title: "Mixer Grinder Deals Today – 500W to 1000W",
    desc: "Mixer grinder deals live today: 500W to 1000W models from Prestige, Bajaj, Philips, Butterfly and more, with 3 or 4 jars. Prices checked when listed.",
    noun: "mixer grinders",
    q: "mixer grinder",
    include: /mixer\s?grinder|juicer mixer|mixer juicer/i,
    exclude: /jar only|jar combo|jar set|\bjar for\b|blade|gasket|coupler|spare|replacement|cover/i,
    bullets: [
      { label: "Wattage", text: "500 to 750W handles everyday chutneys and masalas; 750W and above copes better with idli and dosa batter and hard spices." },
      { label: "Jars", text: "3 jars (large, medium, chutney) cover most kitchens; a fourth juicer jar only helps if you make fresh juice often." },
      { label: "Overload protection", text: "an overload cut-off protects the motor when it runs too long on hard grinding." },
      { label: "Warranty", text: "check the motor warranty separately from the product warranty; it is often longer and is the part that matters." },
    ],
    faq: [
      { q: "How many watts mixer grinder is best for Indian kitchens?", a: "750W is the common sweet spot: enough for wet batter and dry masalas without the noise and price of 1000W models. 500W is fine for light daily use." },
      { q: "Is a 3-jar mixer grinder enough?", a: "Yes for most homes. Large, medium and chutney jars cover batter, masala and chutney. Pick a 4-jar juicer mixer only if you make juice regularly." },
      { q: "Why does my mixer grinder stop in the middle?", a: "Most models have an overload protector that cuts power when the motor overheats. Let it cool, reduce the load, and press the reset button if your model has one." },
    ],
  },
  {
    slug: "trimmers",
    h1: "Trimmer Deals Today – Beard, Body & Grooming Kits",
    title: "Trimmer Deals Today – Philips, Mi, Braun",
    desc: "Trimmer deals live today: beard trimmers, body groomers and multi-grooming kits from Philips, Mi, Braun, Havells and more. Prices checked when listed.",
    noun: "trimmers",
    q: "trimmer",
    include: /trimmer|groom/i,
    exclude: /hedge|grass|garden|lawn|weed|replacement|blade only|head only|nail|tummy|waist|belt|\babs\b|sweat|thigh|\bpet\b|\bdog\b|\bcat\b/i,
    bullets: [
      { label: "Length settings", text: "more length settings in finer steps make it easier to keep a consistent stubble or beard length." },
      { label: "Charging", text: "USB-C charging is now common; corded use is handy when the battery runs flat mid-trim." },
      { label: "Blades", text: "stainless steel blades and a washable head make cleaning and upkeep easier." },
      { label: "Body grooming", text: "use a trimmer sold for body grooming on body hair; beard blades are not designed for that." },
    ],
    faq: [
      { q: "Which beard trimmer brand is best in India?", a: "Philips, Mi, Braun and Havells are the widely sold names. The list above shows which models are on sale right now, cheapest first." },
      { q: "Can I use a beard trimmer for body hair?", a: "It is better to use a body groomer or a multi-grooming kit with a body attachment, since those are designed for sensitive skin areas." },
      { q: "How do I make a trimmer last longer?", a: "Brush or rinse out the blades after each use if the head is washable, oil the blades occasionally, and do not leave the battery fully drained for long." },
    ],
  },
  {
    slug: "water-bottles",
    h1: "Water Bottle Deals Today – Steel, Insulated & Copper",
    title: "Water Bottle Deals Today – Steel & Insulated",
    desc: "Water bottle deals live today: insulated steel flasks, copper bottles and sippers from Milton, Cello, Borosil and more. Prices checked when listed.",
    noun: "water bottles",
    q: "bottle",
    include: /(water|steel|insulated|copper|vacuum|thermo|sipper|fridge|gym|sports)[\w\s-]{0,20}bottle|flask|sipper/i,
    exclude: /baby|feeding|spray|\boil\b|wine|shaker|brush|hot water bag/i,
    bullets: [
      { label: "Insulated steel", text: "double-wall vacuum flasks keep drinks hot or cold for hours; check the listed hot and cold times for the model." },
      { label: "Copper", text: "copper bottles are for plain water; acidic drinks like lemon water react with copper." },
      { label: "Plastic", text: "fridge and gym bottles are light and cheap; choose food-grade, BPA-free plastic." },
      { label: "Cleaning", text: "a wide mouth is far easier to clean by hand than a narrow neck." },
    ],
    faq: [
      { q: "How long does an insulated steel bottle keep water cold?", a: "Good double-wall vacuum flasks keep water cold for many hours. The exact figure varies by model, so check the hot and cold times in each listing." },
      { q: "Is it safe to drink from a copper bottle every day?", a: "Copper bottles are widely used for plain water. Do not store acidic drinks such as lemon water or juice in them, and clean them regularly." },
      { q: "Which is better, a steel or plastic water bottle?", a: "Steel lasts longer, does not hold smells and can be insulated. Plastic is lighter and cheaper for fridge or gym use; pick BPA-free if you go that way." },
    ],
  },
];

export const bestTopic = (slug: string) => BEST_TOPICS.find((t) => t.slug === slug);
