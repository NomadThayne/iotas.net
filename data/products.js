/**
 * iotas.net — Product Catalog
 * ============================================================
 * HOW TO ADD A PRODUCT:
 *   1. Copy any existing product object below
 *   2. Paste it inside the `products` array (don't forget a comma between entries)
 *   3. Fill in your values — all fields explained below
 *   4. Save the file and push to GitHub
 *
 * FIELDS:
 *   id          — unique slug, lowercase, hyphens only (used in URLs)
 *   name        — product title shown on cards and detail page
 *   type        — category: "Production Cels" | "Film Posters" | "Vintage Toys"
 *                           | "Park Memorabilia" | "Original Art"
 *   era         — display label: "Golden Age" | "Park Era" | "Silver Screen"
 *                                | "Animation Art" | "Toys & Dolls"
 *   year        — string like "1940" or "1955–1960"
 *   price       — number in USD, or null for "Inquire" items
 *   inquire     — true if price is not listed (high-value / auction items)
 *   badge       — "Vintage" | "Rare" | "Just In" | null
 *   description — 2–3 sentences shown on the detail page
 *   provenance  — authentication / sourcing notes (shown on detail page)
 *   condition   — "Mint" | "Near Mint" | "Very Good" | "Good" | "Fair"
 *   dimensions  — string like '12" × 16"' or null
 *   image       — path relative to site root, e.g. "images/product-slug.jpg"
 *                 use "images/placeholder.jpg" until you have a real photo
 *   featured    — true to show on the homepage hero carousel
 */

const products = [

  // ── PRODUCTION CELS ──────────────────────────────────────────────────────
  {
    id: "dumbo-cel-1941",
    name: "Dumbo Flight Sequence Cel",
    type: "Production Cels",
    era: "Golden Age",
    year: "1941",
    price: null,
    inquire: true,
    badge: "Rare",
    description: "An original hand-inked and hand-painted production cel from Walt Disney's Dumbo, depicting Dumbo mid-flight with Timothy Mouse on his hat brim. The cel retains exceptional color saturation and is accompanied by its matching hand-painted background.",
    provenance: "Acquired from the estate of a former Disney studio animator. COA from Van Eaton Galleries on file.",
    condition: "Very Good",
    dimensions: '10.5" × 12.5"',
    image: "images/placeholder.jpg",
    featured: true,
  },
  {
    id: "cinderella-cel-1950",
    name: "Cinderella — Ballroom Scene Cel",
    type: "Production Cels",
    era: "Golden Age",
    year: "1950",
    price: null,
    inquire: true,
    badge: "Rare",
    description: "Original production cel from the iconic ballroom sequence. Cinderella is depicted in full gown, hand-painted on a trimmed celluloid sheet. Comes with a color photographic background reproduction.",
    provenance: "Private California collection; previously exhibited at the Walt Disney Family Museum, 2018.",
    condition: "Near Mint",
    dimensions: '9" × 11"',
    image: "images/placeholder.jpg",
    featured: false,
  },

  // ── FILM POSTERS ─────────────────────────────────────────────────────────
  {
    id: "fantasia-poster-1940",
    name: "Fantasia — Original One-Sheet",
    type: "Film Posters",
    era: "Golden Age",
    year: "1940",
    price: 4800,
    inquire: false,
    badge: "Vintage",
    description: "Original theatrical one-sheet for Fantasia's initial roadshow release, printed by Morgan Litho. Stone lithography with the distinctive Stokowski silhouette design. Linen-backed and professionally restored.",
    provenance: "Purchased at Heritage Auctions, 2019. Linen backing by Hollywood Poster Art.",
    condition: "Very Good",
    dimensions: '27" × 41"',
    image: "images/placeholder.jpg",
    featured: true,
  },
  {
    id: "jungle-book-poster-1967",
    name: "The Jungle Book — Insert Poster",
    type: "Film Posters",
    era: "Silver Screen",
    year: "1967",
    price: 975,
    inquire: false,
    badge: "Just In",
    description: "Original insert-size poster for The Jungle Book, featuring the colorful illustrated artwork by Bob Moore. Excellent color vibrancy with minimal fold wear. Unrestored original.",
    provenance: "Found in original theater storage; acquired directly from a former drive-in theater owner in Arizona.",
    condition: "Very Good",
    dimensions: '14" × 36"',
    image: "images/placeholder.jpg",
    featured: false,
  },

  // ── VINTAGE TOYS ─────────────────────────────────────────────────────────
  {
    id: "mickey-linemar-tin-1955",
    name: "Mickey Mouse Linemar Tin Friction Car",
    type: "Vintage Toys",
    era: "Park Era",
    year: "1955",
    price: 640,
    inquire: false,
    badge: "Vintage",
    description: "Japanese-made Linemar tin friction toy featuring Mickey Mouse as driver. Bright lithography in excellent condition with working friction mechanism. Original box included with minor shelf wear.",
    provenance: "From a single-owner collection assembled in the 1970s–80s. Never restored.",
    condition: "Near Mint",
    dimensions: '6" length',
    image: "images/placeholder.jpg",
    featured: false,
  },
  {
    id: "snow-white-doll-1938",
    name: "Snow White Composition Doll — Knickerbocker",
    type: "Vintage Toys",
    era: "Golden Age",
    year: "1938",
    price: null,
    inquire: true,
    badge: "Rare",
    description: "All-original Knickerbocker composition Snow White doll with original costume intact. Hair painted directly on composition head. One of the earliest Disney character dolls produced for retail sale.",
    provenance: "Midwest estate sale, 2022. Reviewed and authenticated by Tomart's Action Figure Digest contributors.",
    condition: "Good",
    dimensions: '13" tall',
    image: "images/placeholder.jpg",
    featured: true,
  },

  // ── PARK MEMORABILIA ─────────────────────────────────────────────────────
  {
    id: "disneyland-guidemap-1955",
    name: "Disneyland Opening Year Guidemap",
    type: "Park Memorabilia",
    era: "Park Era",
    year: "1955",
    price: 1200,
    inquire: false,
    badge: "Rare",
    description: "Original Disneyland souvenir guidemap from the park's opening year, featuring the illustrated map of all five original lands. Clean folds, minimal toning. An essential artifact of American cultural history.",
    provenance: "Acquired from a family whose members attended on opening day, July 17, 1955.",
    condition: "Very Good",
    dimensions: 'Folded: 4" × 9"',
    image: "images/placeholder.jpg",
    featured: false,
  },
  {
    id: "haunted-mansion-ticket-1969",
    name: "Haunted Mansion E-Ticket — First Season",
    type: "Park Memorabilia",
    era: "Park Era",
    year: "1969",
    price: 380,
    inquire: false,
    badge: "Just In",
    description: "Unused Disneyland E-Ticket coupon from the Haunted Mansion's debut season, 1969. Punch-free and crisp. The E-Ticket is the most coveted tier of the original coupon book system.",
    provenance: "Found inside a souvenir coupon book purchased at a Pasadena estate sale.",
    condition: "Near Mint",
    dimensions: '2" × 3.5"',
    image: "images/placeholder.jpg",
    featured: false,
  },

  // ── ORIGINAL ART ─────────────────────────────────────────────────────────
  {
    id: "mary-blair-concept-1950",
    name: "Mary Blair — Cinderella Concept Watercolor",
    type: "Original Art",
    era: "Golden Age",
    year: "c. 1948–1950",
    price: null,
    inquire: true,
    badge: "Rare",
    description: "Vibrant pre-production concept art in gouache and watercolor attributed to Mary Blair, depicting a stylized coach-and-horses scene. Blair's bold color blocking and graphic sensibility are unmistakable. Studio stamp on verso.",
    provenance: "From the collection of a former Disney layout artist. Reviewed by Disney art historian Charles Solomon.",
    condition: "Very Good",
    dimensions: '8" × 10"',
    image: "images/placeholder.jpg",
    featured: true,
  },

];

// ── PRODUCT TYPES (for filter nav) ───────────────────────────────────────────
// Edit this list if you add a new type to your catalog.
const productTypes = [
  "Production Cels",
  "Film Posters",
  "Vintage Toys",
  "Park Memorabilia",
  "Original Art",
];

// ── BADGE COLORS (no need to edit) ───────────────────────────────────────────
const badgeConfig = {
  "Vintage":  { bg: "#2D4A3E", color: "#F2EDE4" },
  "Rare":     { bg: "#B85C38", color: "#F2EDE4" },
  "Just In":  { bg: "#8B6914", color: "#F2EDE4" },
};
