import type { CVData } from "../types";
import { CONTACT_ICONS } from "../types";

const nonEmpty = (s: string) => s.trim() !== "";

/** Renders the CV in the retired NZ CV-builder style. Also used as the body of exported HTML. */
export function Preview({ data }: { data: CVData }) {
  return (
    <div className="cv-sheet" id="cv-preview">
      <header>
        <h1>{data.name}</h1>
        {data.contacts.filter((c) => nonEmpty(c.text)).map((c, i) => (
          <div className="contact-line" key={i}>
            <span className="fa">{CONTACT_ICONS[c.icon].char}</span>
            {c.text}
          </div>
        ))}
      </header>

      {nonEmpty(data.personalStatement) && (
        <section>
          <div className="rule" />
          <h2>PERSONAL STATEMENT</h2>
          <p className="justify">{data.personalStatement}</p>
        </section>
      )}

      {data.work.length > 0 && (
        <section>
          <div className="rule" />
          <h2>WORK HISTORY</h2>
          {data.work.map((w, i) => (
            <div className="entry" key={i}>
              <div className="left">
                <h3>{w.company}</h3>
                <div>{w.location}</div>
                <div>{w.dates}</div>
              </div>
              <div className="right">
                <span className="dot" />
                <h3>{w.title}</h3>
                {w.paragraphs.filter(nonEmpty).map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {w.bullets.filter(nonEmpty).length > 0 && (
                  <ul>
                    {w.bullets.filter(nonEmpty).map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {data.qualifications.length > 0 && (
        <section>
          <div className="rule" />
          <h2>QUALIFICATIONS</h2>
          {data.qualifications.map((q, i) => (
            <div className="entry" key={i}>
              <div className="left">
                <h3>{q.institution}</h3>
                <div>{q.location}</div>
                <div>{q.dates}</div>
              </div>
              <div className="right">
                <span className="dot" />
                <h3>{q.title}</h3>
                {q.paragraphs.filter(nonEmpty).map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {data.technicalSkills.filter(nonEmpty).length > 0 && (
        <section>
          <div className="rule" />
          <h2>TECHNICAL SKILLS</h2>
          <TwoColumnList items={data.technicalSkills.filter(nonEmpty)} />
        </section>
      )}

      {data.personalSkills.length > 0 && (
        <section>
          <div className="rule" />
          <h2>PERSONAL SKILLS</h2>
          {data.personalSkills.map((s, i) => (
            <div className="item" key={i}>
              <h3>{s.heading}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </section>
      )}

      {data.achievements.length > 0 && (
        <section>
          <div className="rule" />
          <h2>ACHIEVEMENTS</h2>
          {data.achievements.map((a, i) => (
            <div className="item" key={i}>
              <h3>{a.title}</h3>
              <p>{a.year}</p>
              <p>{a.text}</p>
            </div>
          ))}
        </section>
      )}

      {data.interests.filter(nonEmpty).length > 0 && (
        <section>
          <div className="rule" />
          <h2>INTERESTS</h2>
          <TwoColumnList items={data.interests.filter(nonEmpty)} />
        </section>
      )}

      {nonEmpty(data.referees) && (
        <section>
          <div className="rule" />
          <h2>REFEREES</h2>
          <p>{data.referees}</p>
        </section>
      )}
    </div>
  );
}

function TwoColumnList({ items }: { items: string[] }) {
  const mid = Math.ceil(items.length / 2);
  return (
    <div className="two-col">
      <ul>
        {items.slice(0, mid).map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      <ul>
        {items.slice(mid).map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}
