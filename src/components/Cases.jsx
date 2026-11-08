import { useState } from 'react';
import cases from '../content/cases.json';
import { tabKeyHandler, withTransition } from '../lib/transition.js';
import CaseDiagram from './CaseDiagram.jsx';
import { External } from './Icons.jsx';
import { TechChips } from './Tech.jsx';
import './Cases.css';

export default function Cases() {
  const [active, setActive] = useState(0);
  const items = cases.items;
  const item = items[active];
  const select = (i) => withTransition(() => setActive(i));

  return (
    <section className="section cases" id="projetos" aria-labelledby="projetos-title">
      <div className="container">
        <div className="section-head section-head--row" data-reveal>
          <div>
            <p className="eyebrow">Tipos de projeto</p>
            <h2 id="projetos-title" className="section-title">
              Problema, decisão e implementação.
            </h2>
          </div>
          <p className="lead">Problemas reais de integração, dados e operação — e as decisões que tomei para resolvê-los.</p>
        </div>

        <div className="cases__layout" data-reveal>
          <div className="cases__tabs" role="tablist" aria-label="Tipos de projeto" aria-orientation="vertical">
            {items.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`case-tab-${c.id}`}
                aria-selected={i === active}
                aria-controls="case-panel"
                tabIndex={i === active ? 0 : -1}
                className={`case-tab${i === active ? ' is-active' : ''}`}
                onClick={() => select(i)}
                onKeyDown={tabKeyHandler(i, items.length, select)}
              >
                <span className="case-tab__index mono">{String(i + 1).padStart(2, '0')}</span>
                <span className="case-tab__body">
                  <span className="case-tab__kicker mono">{c.kicker}</span>
                  <span className="case-tab__title">{c.title}</span>
                </span>
              </button>
            ))}
          </div>

          <article id="case-panel" role="tabpanel" aria-labelledby={`case-tab-${item.id}`} className="case-panel">
            <header className="case-panel__head">
              <h3 className="case-panel__title">{item.title}</h3>
              {item.context && <p className="case-panel__context">{item.context}</p>}
            </header>

            <div className="case-panel__grid">
              <dl className="case-panel__pc">
                <div>
                  <dt className="mono">Problema</dt>
                  <dd>{item.problem}</dd>
                </div>
                <div>
                  <dt className="mono">Minha contribuição</dt>
                  <dd>{item.contribution}</dd>
                </div>
                <div className="case-panel__result">
                  <dt className="mono">Resultado</dt>
                  <dd>{item.result}</dd>
                </div>
              </dl>
              <figure className="case-panel__figure">
                <CaseDiagram key={item.id} type={item.diagram} id={item.id} />
              </figure>
            </div>

            <div className="case-panel__detail">
              <section>
                <h4 className="mono">Arquitetura</h4>
                <ol className="case__steps">
                  {item.architecture.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </section>
              <section>
                <h4 className="mono">Decisões técnicas</h4>
                <ul className="case__list">
                  {item.decisions.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h4 className="mono">Tecnologias</h4>
                <TechChips items={item.stack} />
                {item.quality.length > 0 && (
                  <ul className="case__list case__list--quality">
                    {item.quality.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                )}
                {item.links.map((l) => (
                  <a key={l.url} className="text-link" href={l.url} target="_blank" rel="noopener noreferrer">
                    {l.label} <External />
                  </a>
                ))}
              </section>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
