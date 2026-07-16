import type { ReactNode } from "react";
import type { Achievement, CVData, ContactLine, HeadingItem, QualificationEntry, WorkEntry } from "../types";
import { CONTACT_ICONS } from "../types";

type Update = (patch: Partial<CVData>) => void;

export function Editor({ data, update }: { data: CVData; update: Update }) {
  return (
    <div className="editor">
      <Section title="Name & contact details" defaultOpen>
        <label className="field">
          <span>Full name (as shown at the top)</span>
          <input value={data.name} onChange={(e) => update({ name: e.target.value })} />
        </label>
        <ItemList
          items={data.contacts}
          onChange={(contacts) => update({ contacts })}
          makeNew={(): ContactLine => ({ icon: "globe", text: "" })}
          addLabel="Add contact line"
          render={(c, set) => (
            <div className="row">
              <select value={c.icon} onChange={(e) => set({ ...c, icon: e.target.value as ContactLine["icon"] })}>
                {Object.entries(CONTACT_ICONS).map(([key, v]) => (
                  <option key={key} value={key}>
                    {v.label}
                  </option>
                ))}
              </select>
              <input
                placeholder="e.g. jane@example.com"
                value={c.text}
                onChange={(e) => set({ ...c, text: e.target.value })}
              />
            </div>
          )}
        />
      </Section>

      <Section title="Personal statement">
        <textarea
          rows={7}
          placeholder="A short paragraph about who you are and what you bring."
          value={data.personalStatement}
          onChange={(e) => update({ personalStatement: e.target.value })}
        />
      </Section>

      <Section title={`Work history (${data.work.length})`}>
        <ItemList
          items={data.work}
          onChange={(work) => update({ work })}
          makeNew={(): WorkEntry => ({ company: "", location: "", dates: "", title: "", paragraphs: [""], bullets: [""] })}
          addLabel="Add position"
          boxed
          render={(w, set) => (
            <>
              <div className="row">
                <label className="field">
                  <span>Company</span>
                  <input value={w.company} onChange={(e) => set({ ...w, company: e.target.value })} />
                </label>
                <label className="field">
                  <span>Location</span>
                  <input value={w.location} onChange={(e) => set({ ...w, location: e.target.value })} />
                </label>
                <label className="field">
                  <span>Dates</span>
                  <input placeholder="Jul 2025 - Present" value={w.dates} onChange={(e) => set({ ...w, dates: e.target.value })} />
                </label>
              </div>
              <label className="field">
                <span>Job title</span>
                <input value={w.title} onChange={(e) => set({ ...w, title: e.target.value })} />
              </label>
              <StringList
                label="Intro paragraphs (company / role description)"
                items={w.paragraphs}
                multiline
                onChange={(paragraphs) => set({ ...w, paragraphs })}
              />
              <StringList
                label="Bullet points (what you did)"
                items={w.bullets}
                multiline
                onChange={(bullets) => set({ ...w, bullets })}
              />
            </>
          )}
        />
      </Section>

      <Section title={`Qualifications (${data.qualifications.length})`}>
        <ItemList
          items={data.qualifications}
          onChange={(qualifications) => update({ qualifications })}
          makeNew={(): QualificationEntry => ({ institution: "", location: "", dates: "", title: "", paragraphs: [""] })}
          addLabel="Add qualification"
          boxed
          render={(q, set) => (
            <>
              <div className="row">
                <label className="field">
                  <span>Institution</span>
                  <input value={q.institution} onChange={(e) => set({ ...q, institution: e.target.value })} />
                </label>
                <label className="field">
                  <span>Location</span>
                  <input value={q.location} onChange={(e) => set({ ...q, location: e.target.value })} />
                </label>
                <label className="field">
                  <span>Dates</span>
                  <input placeholder="2016 - 2019" value={q.dates} onChange={(e) => set({ ...q, dates: e.target.value })} />
                </label>
              </div>
              <label className="field">
                <span>Qualification title</span>
                <input value={q.title} onChange={(e) => set({ ...q, title: e.target.value })} />
              </label>
              <StringList
                label="Description paragraphs"
                items={q.paragraphs}
                multiline
                onChange={(paragraphs) => set({ ...q, paragraphs })}
              />
            </>
          )}
        />
      </Section>

      <Section title={`Technical skills (${data.technicalSkills.length})`}>
        <p className="hint">Shown as a two-column bullet list.</p>
        <StringList items={data.technicalSkills} onChange={(technicalSkills) => update({ technicalSkills })} />
      </Section>

      <Section title={`Personal skills (${data.personalSkills.length})`}>
        <ItemList
          items={data.personalSkills}
          onChange={(personalSkills) => update({ personalSkills })}
          makeNew={(): HeadingItem => ({ heading: "", text: "" })}
          addLabel="Add personal skill"
          boxed
          render={(s, set) => (
            <>
              <label className="field">
                <span>Heading</span>
                <input placeholder="Team Player | Collaborative" value={s.heading} onChange={(e) => set({ ...s, heading: e.target.value })} />
              </label>
              <textarea rows={2} value={s.text} onChange={(e) => set({ ...s, text: e.target.value })} />
            </>
          )}
        />
      </Section>

      <Section title={`Achievements (${data.achievements.length})`}>
        <ItemList
          items={data.achievements}
          onChange={(achievements) => update({ achievements })}
          makeNew={(): Achievement => ({ title: "", year: "", text: "" })}
          addLabel="Add achievement"
          boxed
          render={(a, set) => (
            <>
              <div className="row">
                <label className="field grow">
                  <span>Title</span>
                  <input value={a.title} onChange={(e) => set({ ...a, title: e.target.value })} />
                </label>
                <label className="field narrow">
                  <span>Year</span>
                  <input value={a.year} onChange={(e) => set({ ...a, year: e.target.value })} />
                </label>
              </div>
              <textarea rows={3} value={a.text} onChange={(e) => set({ ...a, text: e.target.value })} />
            </>
          )}
        />
      </Section>

      <Section title={`Interests & courses (${data.interests.length})`}>
        <p className="hint">Shown as a two-column bullet list.</p>
        <StringList items={data.interests} onChange={(interests) => update({ interests })} />
      </Section>

      <Section title="Referees & footer">
        <label className="field">
          <span>Referees text</span>
          <input value={data.referees} onChange={(e) => update({ referees: e.target.value })} />
        </label>
        <label className="field">
          <span>Footer line (printed at the bottom of each page)</span>
          <input
            placeholder="Jane Example | 021 000 0000 | jane@example.com"
            value={data.footerText}
            onChange={(e) => update({ footerText: e.target.value })}
          />
        </label>
      </Section>
    </div>
  );
}

function Section({ title, children, defaultOpen }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="editor-section" open={defaultOpen}>
      <summary>{title}</summary>
      <div className="section-body">{children}</div>
    </details>
  );
}

/** Generic editable list with add / remove / move up / move down. */
function ItemList<T>({
  items,
  onChange,
  makeNew,
  render,
  addLabel,
  boxed,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  makeNew: () => T;
  render: (item: T, set: (item: T) => void) => ReactNode;
  addLabel: string;
  boxed?: boolean;
}) {
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="item-list">
      {items.map((item, i) => (
        <div className={boxed ? "list-item boxed" : "list-item"} key={i}>
          <div className="list-item-content">
            {render(item, (updated) => onChange(items.map((it, j) => (j === i ? updated : it))))}
          </div>
          <div className="list-item-controls">
            <button title="Move up" disabled={i === 0} onClick={() => move(i, -1)}>&#8593;</button>
            <button title="Move down" disabled={i === items.length - 1} onClick={() => move(i, 1)}>&#8595;</button>
            <button title="Remove" className="danger" onClick={() => onChange(items.filter((_, j) => j !== i))}>&#10005;</button>
          </div>
        </div>
      ))}
      <button className="add" onClick={() => onChange([...items, makeNew()])}>+ {addLabel}</button>
    </div>
  );
}

/** List of plain strings (single- or multi-line). */
function StringList({
  items,
  onChange,
  label,
  multiline,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  label?: string;
  multiline?: boolean;
}) {
  return (
    <div className="string-list">
      {label && <span className="string-list-label">{label}</span>}
      <ItemList
        items={items}
        onChange={onChange}
        makeNew={() => ""}
        addLabel="Add"
        render={(s, set) =>
          multiline ? (
            <textarea rows={2} value={s} onChange={(e) => set(e.target.value)} />
          ) : (
            <input value={s} onChange={(e) => set(e.target.value)} />
          )
        }
      />
    </div>
  );
}
