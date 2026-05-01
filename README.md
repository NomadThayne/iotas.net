# iotas.net

Authenticated vintage Disney collectibles — production cels, film posters, vintage toys, park memorabilia, and original art.

## File Structure

```
iotas.net/
├── index.html          ← single HTML file, loads everything
├── css/
│   └── main.css        ← all styles
├── js/
│   └── main.js         ← all page logic, cart, routing
├── data/
│   └── products.js     ← YOUR PRODUCT CATALOG (edit this)
└── images/
    └── (product photos go here)
```

---

## How to Add a Product

Open `data/products.js` and add a new object inside the `products` array:

```js
{
  id: "pinocchio-cel-1940",         // unique slug — lowercase, hyphens only
  name: "Pinocchio Jiminy Cricket Cel",
  type: "Production Cels",          // must match one of the productTypes list
  era: "Golden Age",
  year: "1940",
  price: null,                      // set to null if using inquire: true
  inquire: true,                    // true = show "Price on request"
  badge: "Rare",                    // "Vintage" | "Rare" | "Just In" | null
  description: "Original production cel...",
  provenance: "From the estate of...",
  condition: "Very Good",           // Mint | Near Mint | Very Good | Good | Fair
  dimensions: '9" × 11"',
  image: "images/pinocchio-cel-1940.jpg",
  featured: false,                  // true = show on homepage
},
```

**Product types available:**
- `"Production Cels"`
- `"Film Posters"`
- `"Vintage Toys"`
- `"Park Memorabilia"`
- `"Original Art"`

To add a new type, add it to the `productTypes` array at the bottom of `products.js` and add an icon for it in `main.js` in the `typeIcons` object.

---

## Adding Product Photos

1. Put your image file in the `images/` folder
2. Set the `image` field in products.js to `"images/your-filename.jpg"`
3. Recommended size: **1200 × 900px** (4:3 ratio), max 500KB
4. If no image is set, a placeholder is shown automatically

---

## Cart Behavior

- Regular items (with a price) go into the cart and have a checkout button
- **Inquire items** (price: null, inquire: true) go into a separate "Inquiry" section in the cart, and trigger an email to `shopper@iotas.net`
- Cart persists in the browser via localStorage

---

## Pages

The site uses hash-based routing — no server config needed on Cloudflare Pages:

| URL | Page |
|-----|------|
| `#/` | Home |
| `#/collections` | All products |
| `#/type/Film Posters` | Products filtered by type |
| `#/product/ID` | Product detail |
| `#/cart` | Cart |

---

## Deployment (Cloudflare Pages)

1. Push all files to `NomadThayne/iotas.net` on GitHub
2. In Cloudflare Pages: **Create a project** → connect repo
3. Build settings: leave blank (no build command, no build output directory)
4. Deploy — done. Cloudflare serves `index.html` directly.

No build step, no Node, no framework.

---

## Contact Email

Change `shopper@iotas.net` in `js/main.js` and `index.html` to your real address. Search for `shopper@iotas.net` and replace all instances.

---

© 2026 iotas.net
