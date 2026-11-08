import experience from '../content/experience.json';
import { formatPeriod } from '../lib/format.js';
import './About.css';

export default function About({ profile }) {
  const [current, ...previous] = experience.items;

  return (
    <section className="section about" id="sobre" aria-labelledby="sobre-title">
      <div className="container about__grid">
        <div className="about__lead" data-reveal>
          <p className="eyebrow">Sobre</p>
          <h2 id="sobre-title" className="section-title about__title">
            Sistemas que conversam. <span className="text-gradient">Dados em que se pode confiar.</span>
          </h2>
          <div className="about__text">
            {profile.about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <ol className="principles">
            {profile.principles.map((pr, i) => (
              <li key={pr.title} style={{ '--reveal-delay': `${i * 60}ms` }}>
                <span className="mono principles__index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{pr.title}</h3>
                <p>{pr.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside className="about__side" data-reveal style={{ '--reveal-delay': '120ms' }}>
          <figure className="about__portrait">
            <span className="about__orbit" aria-hidden="true" />
            <img src={profile.photo} alt={profile.photoAlt} width="560" height="560" loading="lazy" decoding="async" />
            <figcaption className="mono">{profile.location}</figcaption>
          </figure>

          <div className="role-card">
            <p className="role-card__period mono">
              <span className="role-card__live" aria-hidden="true" />
              {formatPeriod(current.start, current.end)}
            </p>
            <h3>{current.role}</h3>
            <p className="role-card__company">{current.company}</p>
            <ul>
              {current.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          {previous.length > 0 && (
            <details className="history">
              <summary className="mono">Trajetória anterior</summary>
              <ol>
                {previous.map((job) => (
                  <li key={job.id}>
                    <span className="mono">{formatPeriod(job.start, job.end)}</span>
                    <span>
                      {job.role} · {job.company}
                    </span>
                  </li>
                ))}
              </ol>
            </details>
          )}
        </aside>
      </div>
    </section>
  );
}
