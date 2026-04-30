# iotas.net

Vintage Disney collectibles — curated, authenticated, delivered with care.

---

## Repo structure

```
iotas-net/
├── index.html          ← Homepage
├── css/
│   └── main.css        ← All site styles
├── js/
│   └── main.js         ← Site scripts (marquee, bag counter, etc.)
├── assets/
│   ├── images/         ← Product photos, banners, hero images
│   └── fonts/          ← Self-hosted fonts (optional)
├── .gitignore
└── README.md
```

As the site grows, add pages alongside `index.html`:
```
collections.html
product.html
cart.html
about.html
```

---

## Deploy to Cloudflare Pages

### First deploy

1. Push this repo to GitHub.
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages** → **Create a project**.
3. Connect your GitHub account and select the `iotas-net` repo.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave blank)*
   - **Build output directory:** `/` (root)
5. Click **Save and Deploy**.

Cloudflare Pages will serve `index.html` automatically from the repo root.

### Connect iotas.net domain

1. In Cloudflare Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter `iotas.net` (and optionally `www.iotas.net`).
3. Since your domain is already registered with Cloudflare, the DNS records will be created automatically.
4. SSL is provisioned automatically — no action needed.

### Subsequent deploys

Every push to the `main` branch triggers an automatic redeploy. No CI configuration needed.

---

## Development

No build step required — this is plain HTML/CSS/JS.

Open `index.html` directly in a browser, or use a local server:

```bash
# Python
python3 -m http.server 8000

# Node (if you have npx)
npx serve .
```

Then visit `http://localhost:8000`.

---

## Notes

- Fonts are loaded from Google Fonts (Libre Baskerville + Outfit). To self-host, download the `.woff2` files into `assets/fonts/` and update the `@import` in `css/main.css`.
- © 2026 iotas.net
