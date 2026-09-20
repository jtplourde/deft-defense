# Deft Defense — Marketing Site Preview

Local preview of the Deft Defense launch page: cybersecurity consulting focused on vulnerability assessments and hardening recommendations.

**Tagline:** Cybersecurity for Everyone

## Stack

Static HTML, CSS, and light JavaScript. No build step or dependencies.

## Run locally

From this directory:

```bash
cd /workspace/deft-defense
python3 -m http.server 4173
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).

Alternative:

```bash
npx --yes serve -l 4173
```

## Project layout

```
deft-defense/
├── index.html          # Single-page marketing site
├── css/styles.css      # Brand styles
├── js/main.js          # Nav, form, accessibility helpers
├── assets/logo.png     # Brand logo
└── README.md
```

## Notes

- Contact form is front-end only: it validates input and opens a `mailto:` draft to `hello@deftdefense.com`.
- Brand colors: charcoal `#222831` / `#262c2e`, accent purple `#A855F7`, light gray text.
- No backend, analytics, or third-party widgets beyond Google Fonts.

## Security / hosting

This is a static marketing site with no backend or secrets. Hardening applied in-repo:

- **CSP / Referrer-Policy / Permissions-Policy** via `<meta>` tags in `index.html` (allows `'self'`, Google Fonts style/font origins, `form-action` for `mailto:`).
- Contact form: `maxlength` on fields, interest value whitelist, mailto URL length cap, honeypot field, status via `textContent` only.

**Residual risks**

- Meta CSP cannot set `frame-ancestors` (header-only). GitHub Pages also cannot easily set HTTP security headers (CSP, HSTS, X-Frame-Options, etc.). If you go live, prefer real response headers via a CDN or host that supports them (Cloudflare, Netlify, nginx, etc.).
- `mailto:` still depends on the visitor’s email client; there is no server-side spam filtering or delivery guarantee. The honeypot only deters naive bots.
- Google Fonts is a third-party origin; pin or self-host fonts if you need stricter supply-chain control.
- Client-side validation is UX/hardening only—anyone can still craft a mailto or email you directly.
