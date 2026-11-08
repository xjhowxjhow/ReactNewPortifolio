import { useState } from 'react';
import skills from '../content/skills.json';
import { withTransition } from '../lib/transition.js';
import { TechChips, TechIcon } from './Tech.jsx';
import './Skills.css';

export default function Skills() {
  const [selected, setSelected] = useState(skills.layers[0].id);
  const layer = skills.layers.find((l) => l.id === selected);

  return (
    <section className="section skills" id="competencias" aria-labelledby="competencias-title">
      <div className="container">
        <div className="section-head section-head--row" data-reveal>
          <div>
            <p className="eyebrow">Competências</p>
            <h2 id="competencias-title" className="section-title">
              Competências organizadas como uma arquitetura.
            </h2>
          </div>
          <div>
            <p className="lead">Camadas que se apoiam, com observabilidade e auditoria na base. Cada tecnologia ligada a uma aplicação concreta.</p>
          </div>
        </div>

        <div className="skills__layout">
          <ol className="stack" data-reveal aria-label="Camadas">
            {[...skills.layers].reverse().map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  className={`stack__layer stack__layer--${l.id}`}
                  aria-pressed={selected === l.id}
                  aria-controls="skill-panel"
                  onClick={() => withTransition(() => setSelected(l.id))}
                >
                  <span className="stack__plate" aria-hidden="true" />
                  <span className="stack__code mono">{l.code}</span>
                  <span className="stack__name">{l.name}</span>
                  <span className="stack__count mono">{l.items.length} itens</span>
                </button>
              </li>
            ))}
          </ol>

          <div id="skill-panel" className={`skill-panel skill-panel--${layer.id}`} aria-live="polite">
            <header key={layer.id} className="skill-panel__head">
              <p className="mono">
                {layer.code} · {layer.name}
              </p>
              <h3>{layer.summary}</h3>
            </header>
            <ul className="skill-items" key={`${layer.id}-items`}>
              {layer.items.map((item, i) => (
                <li key={item.name} style={{ '--i': i }}>
                  <div className="skill-items__top">
                    <TechIcon name={item.name} size={22} />
                    <h4>{item.name}</h4>
                  </div>
                  <p>{item.use}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="complementary" data-reveal>
          <h3 className="mono">Conhecimentos complementares</h3>
          <TechChips items={skills.complementary} />
        </div>
      </div>
    </section>
  );
}
