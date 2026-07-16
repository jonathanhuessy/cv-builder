# CV Builder

A free, browser-only CV builder replicating the format of the retired New Zealand
government CV-builder tool. No accounts, no server — your data never leaves your browser.

## Features

- Form-based editor: contact details, personal statement, work history, qualifications,
  technical/personal skills, achievements, interests, referees. Add, remove and reorder entries.
- Live preview in the classic timeline layout (Open Sans Light + FontAwesome icons).
- Auto-saves to your browser's local storage while you type.
- **Save JSON** — small project file you can re-open later or on another machine.
- **Save HTML** — a single self-contained file (fonts embedded) that both displays your CV
  and can be re-uploaded here for further editing (the structured data is embedded inside it).
- **Print / PDF** — uses the browser print dialog. Per-page footers ("Page X of Y" and your
  contact line) require a Chromium-based browser (Chrome/Edge 131+). In the print dialog,
  disable the browser's own "Headers and footers" option.

Editing a downloaded HTML file by hand is not supported: on re-upload, only the embedded
data block is read, so manual text edits to the rendered markup are ignored.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

## Deploying to GitHub Pages

1. Create a GitHub repository and push this folder to it (branch `main`).
2. In the repo: Settings → Pages → Source: **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and deploys on every push
   to `main`. The app appears at `https://<user>.github.io/<repo>/`.

The Vite config uses a relative `base`, so it works under any repo path (and on Vercel or
any static host too).
