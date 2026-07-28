export type Region = "north-shore" | "cape-ann" | "merrimack" | "inner-boston";

export type Town = {
  slug: string;
  name: string;
  region: Region;
  /** Featured towns get a card, a blurb, and eventually their own page. */
  featured?: boolean;
  blurb?: string;
  image?: string;
};

export const regionLabels: Record<Region, string> = {
  "north-shore": "North Shore",
  "cape-ann": "Cape Ann",
  merrimack: "Merrimack Valley",
  "inner-boston": "Inner Boston",
};

/** Order the region lists render in. */
export const regionOrder: Region[] = [
  "north-shore",
  "cape-ann",
  "merrimack",
  "inner-boston",
];

const towns: Town[] = [
  // ── Featured ───────────────────────────────────────────────────────────
  {
    slug: "marblehead",
    name: "Marblehead",
    region: "north-shore",
    featured: true,
    blurb:
      "Home base. Winding colonial streets, a working harbor, and a market where knowing the difference between two streets can mean six figures.",
  },
  {
    slug: "swampscott",
    name: "Swampscott",
    region: "north-shore",
    featured: true,
    blurb:
      "Ocean views without the Marblehead premium, and a commuter rail stop that puts you in North Station in half an hour.",
  },
  {
    slug: "salem",
    name: "Salem",
    region: "north-shore",
    featured: true,
    blurb:
      "Federal-era architecture, a genuine downtown, and one of the most varied housing stocks on the North Shore.",
  },
  {
    slug: "beverly",
    name: "Beverly",
    region: "north-shore",
    featured: true,
    blurb:
      "Six distinct neighborhoods that behave like six different markets, from Beverly Farms to the Cove.",
  },
  {
    slug: "lynn",
    name: "Lynn",
    region: "north-shore",
    featured: true,
    blurb:
      "The best value on the coast right now, with multifamilies that still make sense for first-time buyers and investors.",
  },
  {
    slug: "peabody",
    name: "Peabody",
    region: "north-shore",
    featured: true,
    blurb:
      "Practical, well-served, and priced below its neighbors — a frequent landing spot for buyers priced out of the coast.",
  },
  {
    slug: "danvers",
    name: "Danvers",
    region: "north-shore",
    featured: true,
    blurb:
      "Strong schools, quick highway access, and steady demand from families moving out of Boston.",
  },
  {
    slug: "melrose",
    name: "Melrose",
    region: "inner-boston",
    featured: true,
    blurb:
      "A walkable downtown and Victorian housing stock that draws buyers who want the suburbs without the drive.",
  },

  // ── North Shore ────────────────────────────────────────────────────────
  { slug: "nahant", name: "Nahant", region: "north-shore" },
  { slug: "saugus", name: "Saugus", region: "north-shore" },
  { slug: "lynnfield", name: "Lynnfield", region: "north-shore" },
  { slug: "middleton", name: "Middleton", region: "north-shore" },
  { slug: "topsfield", name: "Topsfield", region: "north-shore" },
  { slug: "boxford", name: "Boxford", region: "north-shore" },
  { slug: "wenham", name: "Wenham", region: "north-shore" },
  { slug: "hamilton", name: "Hamilton", region: "north-shore" },
  { slug: "wakefield", name: "Wakefield", region: "north-shore" },
  { slug: "reading", name: "Reading", region: "north-shore" },
  { slug: "stoneham", name: "Stoneham", region: "north-shore" },

  // ── Cape Ann ───────────────────────────────────────────────────────────
  {
    slug: "manchester-by-the-sea",
    name: "Manchester-by-the-Sea",
    region: "cape-ann",
  },
  { slug: "gloucester", name: "Gloucester", region: "cape-ann" },
  { slug: "rockport", name: "Rockport", region: "cape-ann" },
  { slug: "essex", name: "Essex", region: "cape-ann" },
  { slug: "ipswich", name: "Ipswich", region: "cape-ann" },

  // ── Merrimack Valley ───────────────────────────────────────────────────
  { slug: "newburyport", name: "Newburyport", region: "merrimack" },
  { slug: "newbury", name: "Newbury", region: "merrimack" },
  { slug: "rowley", name: "Rowley", region: "merrimack" },
  { slug: "georgetown", name: "Georgetown", region: "merrimack" },
  { slug: "amesbury", name: "Amesbury", region: "merrimack" },
  { slug: "salisbury", name: "Salisbury", region: "merrimack" },
  { slug: "west-newbury", name: "West Newbury", region: "merrimack" },
  { slug: "groveland", name: "Groveland", region: "merrimack" },
  { slug: "haverhill", name: "Haverhill", region: "merrimack" },
  { slug: "andover", name: "Andover", region: "merrimack" },
  { slug: "north-andover", name: "North Andover", region: "merrimack" },
  { slug: "methuen", name: "Methuen", region: "merrimack" },

  // ── Inner Boston ───────────────────────────────────────────────────────
  { slug: "medford", name: "Medford", region: "inner-boston" },
  { slug: "malden", name: "Malden", region: "inner-boston" },
  { slug: "everett", name: "Everett", region: "inner-boston" },
  { slug: "somerville", name: "Somerville", region: "inner-boston" },
  { slug: "revere", name: "Revere", region: "inner-boston" },
  { slug: "chelsea", name: "Chelsea", region: "inner-boston" },
  { slug: "winthrop", name: "Winthrop", region: "inner-boston" },
];

export const FEATURED_TOWNS = towns.filter((town) => town.featured);

export const TOWNS_BY_REGION = regionOrder.map((region) => ({
  region,
  label: regionLabels[region],
  towns: towns.filter((town) => town.region === region && !town.featured),
}));
