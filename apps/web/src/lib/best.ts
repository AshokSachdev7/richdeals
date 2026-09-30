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
];

export const bestTopic = (slug: string) => BEST_TOPICS.find((t) => t.slug === slug);
