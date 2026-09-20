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
