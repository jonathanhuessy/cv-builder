import type { CVData } from "./types";
import { SCHEMA_VERSION, emptyCV } from "./types";
import cvCss from "./cv-template.css?raw";
import openSansUrl from "./assets/fonts/OpenSans-Light.ttf";
import fontAwesomeUrl from "./assets/fonts/fontawesome.ttf";

const STORAGE_KEY = "cv-builder-data";

// ---------- localStorage ----------

export function loadFromStorage(): CVData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? normalize(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function saveToStorage(data: CVData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ---------- validation / migration ----------

/** Fill missing fields with defaults so older or hand-edited files still load. */
export function normalize(raw: unknown): CVData {
  if (typeof raw !== "object" || raw === null) throw new Error("Not a CV data object");
  const merged = { ...emptyCV(), ...(raw as Partial<CVData>) };
  merged.version = SCHEMA_VERSION;
  return merged;
}

// ---------- per-page print footer (CSS margin boxes, Chromium 131+) ----------

export function pageFooterCss(footerText: string): string {
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  const common = `color: #ccc; font-family: "Open Sans Light", sans-serif; font-size: 6.6pt;`;
  return `@page {
  @bottom-left { content: "${esc(footerText)}"; ${common} }
  @bottom-right { content: "Page " counter(page) " of " counter(pages); ${common} }
}`;
}

// ---------- export ----------

function download(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function fileSlug(name: string): string {
  return (name.trim() || "cv").replace(/\s+/g, "-");
}

export function exportJson(data: CVData) {
  download(`${fileSlug(data.name)}-CV.json`, JSON.stringify(data, null, 2), "application/json");
}

async function fetchAsDataUri(url: string): Promise<string> {
  const buf = await (await fetch(url)).arrayBuffer();
  const bytes = new Uint8Array(buf);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return `data:font/ttf;base64,${btoa(bin)}`;
}

/**
 * Exports a self-contained HTML file: rendered CV + inlined CSS + embedded fonts,
 * plus the structured data in a <script type="application/json"> block so the
 * file can be re-uploaded and edited later.
 */
export async function exportHtml(data: CVData) {
  const preview = document.getElementById("cv-preview");
  if (!preview) throw new Error("Preview not found");

  const [openSans, fontAwesome] = await Promise.all([
    fetchAsDataUri(openSansUrl),
    fetchAsDataUri(fontAwesomeUrl),
  ]);

  // Raw CSS still references the font files; swap in the data URIs.
  const css = (cvCss as string)
    .replace(/url\([^)]*OpenSans-Light\.ttf[^)]*\)/, `url("${openSans}")`)
    .replace(/url\([^)]*fontawesome\.ttf[^)]*\)/, `url("${fontAwesome}")`);

  // Prevent "</script>" inside the data from terminating the script block.
  const json = JSON.stringify(data, null, 2).replace(/</g, "\\u003c");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${data.name} - CV</title>
<style>
${css}
${pageFooterCss(data.footerText)}
@media screen {
  body { background: #e8e8e8; margin: 0; padding: 24px 0; }
  .cv-sheet {
    width: 595pt; margin: 0 auto; padding: 36pt 34.5pt;
    box-sizing: border-box; box-shadow: 0 2px 12px rgba(0,0,0,0.25);
  }
}
@media print {
  body { margin: 0; background: #fff; }
  .cv-sheet { padding: 0; }
}
</style>
</head>
<body>
${preview.outerHTML}
<script type="application/json" id="cv-data">
${json}
</script>
<!-- Generated with the CV builder. Re-upload this file there to edit it. -->
</body>
</html>
`;
  download(`${fileSlug(data.name)}-CV.html`, html, "text/html");
}

// ---------- import ----------

/** Accepts a .json project file or a previously exported .html file. */
export async function importFile(file: File): Promise<CVData> {
  const text = await file.text();
  if (file.name.toLowerCase().endsWith(".json") || text.trimStart().startsWith("{")) {
    return normalize(JSON.parse(text));
  }
  const doc = new DOMParser().parseFromString(text, "text/html");
  const script = doc.getElementById("cv-data");
  if (!script?.textContent) {
    throw new Error(
      "No embedded CV data found in this HTML file. Only files exported by this app can be re-imported."
    );
  }
  return normalize(JSON.parse(script.textContent));
}
