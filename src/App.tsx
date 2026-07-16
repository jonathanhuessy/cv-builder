import { useEffect, useRef, useState } from "react";
import type { CVData } from "./types";
import { emptyCV } from "./types";
import { sampleCV } from "./sampleData";
import { Editor } from "./components/Editor";
import { Preview } from "./components/Preview";
import { exportHtml, exportJson, importFile, loadFromStorage, pageFooterCss, saveToStorage } from "./io";

export default function App() {
  const [data, setData] = useState<CVData>(() => loadFromStorage() ?? sampleCV);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveToStorage(data);
  }, [data]);

  const update = (patch: Partial<CVData>) => setData((d) => ({ ...d, ...patch }));

  const onImport = async (file: File) => {
    try {
      setData(await importFile(file));
    } catch (e) {
      alert(`Could not import file: ${e instanceof Error ? e.message : e}`);
    }
  };

  return (
    <div className="app">
      <style>{pageFooterCss(data.footerText)}</style>
      <header className="toolbar">
        <span className="brand">CV Builder</span>
        <button onClick={() => { if (confirm("Start a new, empty CV? Current content is replaced (it was auto-saved in this browser until now).")) setData(emptyCV()); }}>New</button>
        <button onClick={() => { if (confirm("Load the sample CV? Current content is replaced.")) setData(sampleCV); }}>Load sample</button>
        <button onClick={() => fileInput.current?.click()}>Open…</button>
        <input
          ref={fileInput}
          type="file"
          accept=".json,.html"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onImport(f);
            e.target.value = "";
          }}
        />
        <span className="spacer" />
        <button onClick={() => exportJson(data)}>Save JSON</button>
        <button onClick={() => exportHtml(data).catch((e) => alert(String(e)))}>Save HTML</button>
        <button className="primary" onClick={() => window.print()}>Print / PDF</button>
      </header>
      <main className="panes">
        <div className="editor-pane">
          <Editor data={data} update={update} />
          <p className="hint footer-hint">
            Your CV is auto-saved in this browser. Use “Save JSON” or “Save HTML” to keep a file you
            can re-open later (also on another machine). Nothing is uploaded anywhere.
          </p>
        </div>
        <div className="preview-pane">
          <Preview data={data} />
        </div>
      </main>
    </div>
  );
}
