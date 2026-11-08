import { useEffect, useRef, useState } from 'react';
import data from '../content/integrations.json';
import { techIcon } from '../lib/techIcons.js';
import { withTransition } from '../lib/transition.js';
import DataStream from './DataStream.jsx';
import { TechChips, TechIcon } from './Tech.jsx';
import './Integrations.css';

// Modules fill the left column first, then the right one, so any number of systems fits.
const ROWS = Math.ceil(data.systems.length / 2);
const SLOTS = data.systems.map((_, i) => [i < ROWS ? 0 : 1, (i % ROWS) + 1]);
const CORE_STACK = ['Azure Databricks', 'Python', 'PySpark', 'Delta Lake'];
const OBSERVED = ['Logs estruturados', 'Métricas', 'Auditoria por execução', 'Alertas e monitores', 'Datadog'];

export default function Integrations() {
  const [selected, setSelected] = useState(data.systems[0].id);
  const [geo, setGeo] = useState(null);
  const boardRef = useRef(null);
  const coreRef = useRef(null);
  const moduleRefs = useRef([]);
  const current = data.systems.find((s) => s.id === selected);
  const index = data.systems.findIndex((s) => s.id === selected);

  // Wires are drawn in real pixels so packets keep their shape at any board size.
  useEffect(() => {
    const board = boardRef.current;
    const measure = () => {
      const b = board.getBoundingClientRect();
      const core = coreRef.current.getBoundingClientRect();
      const cy = core.top + core.height / 2 - b.top;
      const paths = moduleRefs.current.map((el, i) => {
        if (!el) return '';
        const r = el.getBoundingClientRect();
        const left = SLOTS[i][0] === 0;
        const x1 = (left ? r.right : r.left) - b.left;
        const y1 = r.top + r.height / 2 - b.top;
        const x2 = (left ? core.left : core.right) - b.left;
        const mx = (x1 + x2) / 2;
        return `M${x1.toFixed(1)} ${y1.toFixed(1)} C ${mx.toFixed(1)} ${y1.toFixed(1)}, ${mx.toFixed(1)} ${cy.toFixed(1)}, ${x2.toFixed(1)} ${cy.toFixed(1)}`;
      });
      setGeo({ w: b.width, h: b.height, paths });
    };
    const ro = new ResizeObserver(measure);
    ro.observe(board);
    ro.observe(coreRef.current);
    moduleRefs.current.forEach((el) => el && ro.observe(el));
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="section integrations" id="integracoes" aria-labelledby="integracoes-title">
      <div className="container">
        <div className="section-head section-head--row" data-reveal>
          <div>
            <p className="eyebrow">Sistemas integrados</p>
            <h2 id="integracoes-title" className="section-title">
              Plataformas corporativas, um mesmo rigor de contrato.
            </h2>
          </div>
          <p className="lead">
            Cada sistema entra pelo mesmo padrão: contrato respeitado, carga rastreável e observada de ponta a ponta. Novas plataformas se
            conectam à mesma base. Selecione um módulo.
          </p>
        </div>

        <div className="integrations__layout">
          <div className="board" ref={boardRef} style={{ '--rows': ROWS }} data-reveal>
            <p className="board__caption mono" aria-hidden="true">Topologia das integrações</p>
            <p className="board__legend mono" aria-hidden="true">
              <span>
                <i /> entrada
              </span>
              <span>
                <i /> retorno
              </span>
            </p>
            {geo && (
              <svg className="board__wires" viewBox={`0 0 ${geo.w} ${geo.h}`} aria-hidden="true">
                {geo.paths.map((d, i) => (
                  <path key={i} d={d} className={`board__wire${i === index ? ' is-active' : ''}`} />
                ))}
                {geo.paths.map((d, i) =>
                  i === index ? (
                    <g key={`p-${i}-${d}`} className="packets packets--active">
                      <circle r="4" className="packet packet--in">
                        <animateMotion dur="1.6s" repeatCount="indefinite" path={d} />
                      </circle>
                      <circle r="3" className="packet packet--in">
                        <animateMotion dur="1.6s" begin="0.53s" repeatCount="indefinite" path={d} />
                      </circle>
                      <circle r="4" className="packet packet--out">
                        <animateMotion dur="1.6s" begin="0.8s" repeatCount="indefinite" path={d} keyPoints="1;0" keyTimes="0;1" calcMode="linear" />
                      </circle>
                    </g>
                  ) : (
                    <circle key={`p-${i}-${d}`} r="2.5" className="packet packet--idle">
                      <animateMotion dur="4.5s" begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  ),
                )}
              </svg>
            )}

            <div className="board__core" ref={coreRef}>
              <span className="board__core-ring" aria-hidden="true" />
              <span className="board__core-ring board__core-ring--2" aria-hidden="true" />
              <span className="mono board__core-label">Plataforma de integração</span>
              <span className="board__core-icons">
                {CORE_STACK.map((n) => (
                  <span key={n} title={n}>
                    <TechIcon name={n} size={20} />
                  </span>
                ))}
              </span>
              <span className="board__core-obs mono">
                <TechIcon name="Datadog" size={12} /> observado
              </span>
            </div>

            {data.systems.map((sys, i) => (
              <button
                key={sys.id}
                ref={(el) => {
                  moduleRefs.current[i] = el;
                }}
                type="button"
                className={`module module--${SLOTS[i][0] === 0 ? 'left' : 'right'}`}
                style={{
                  gridColumn: SLOTS[i][0] === 0 ? 1 : 3,
                  gridRow: SLOTS[i][1],
                  '--c': techIcon(sys.name)?.color,
                }}
                aria-pressed={selected === sys.id}
                aria-controls="system-panel"
                onClick={() => withTransition(() => setSelected(sys.id))}
              >
                <span className="module__port" aria-hidden="true" />
                <span className="module__logo">
                  <TechIcon name={sys.name} size={26} />
                </span>
                <span className="module__text">
                  <span className="module__name">{sys.name}</span>
                  <span className="module__cat mono">{sys.category}</span>
                </span>
              </button>
            ))}
          </div>

          <article
            id="system-panel"
            className="system-panel"
            aria-live="polite"
            data-reveal
            style={{ '--c': techIcon(current.name)?.color }}
          >
            <header className="system-panel__head" key={current.id}>
              <span className="system-panel__logo">
                <TechIcon name={current.name} size={34} />
              </span>
              <div>
                <p className="mono system-panel__cat">{current.category}</p>
                <h3>{current.name}</h3>
              </div>
            </header>

            <div className="lane" key={`lane-${current.id}`} aria-hidden="true">
              <span className="lane__stop">
                <span className="lane__node">
                  <TechIcon name={current.name} size={20} />
                </span>
                <span className="mono">Origem</span>
              </span>
              <span className="lane__wire">
                <i />
                <i />
                <i />
                <span className="lane__via mono">{current.channels.join(' · ')}</span>
              </span>
              <span className="lane__stop">
                <span className="lane__node lane__node--core">
                  <TechIcon name="Azure Databricks" size={20} />
                </span>
                <span className="mono">Plataforma</span>
              </span>
              <span className="lane__wire lane__wire--out">
                <i />
                <i />
                <i />
                <span className="lane__via mono">lotes validados</span>
              </span>
              <span className="lane__stop">
                <span className="lane__node">
                  <TechIcon name="APIs" size={20} />
                </span>
                <span className="mono">Destinos</span>
              </span>
            </div>

            <div className="system-panel__body" key={`${current.id}-body`}>
              <p className="system-panel__summary">{current.summary}</p>
              <div>
                <h4 className="mono">O que faço</h4>
                <ul className="system-panel__work">
                  {current.work.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
              <div className="system-panel__meta">
                <div>
                  <h4 className="mono">Canais</h4>
                  <TechChips items={current.channels} />
                </div>
              </div>
              <div className="obs-ribbon">
                <h4 className="mono">
                  <span className="obs-ribbon__dot" aria-hidden="true" />
                  Observado em cada execução
                </h4>
                <ul>
                  {OBSERVED.map((n) => (
                    <li key={n} style={{ '--c': techIcon(n)?.color }}>
                      <TechIcon name={n} size={14} />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
              {current.note && <p className="system-panel__note">{current.note}</p>}
            </div>
          </article>
        </div>

        <div className="protocols" data-reveal>
          <div className="protocols__main">
            <h3 className="protocols__title">Tecnologias e protocolos relacionados</h3>
            <dl className="protocols__list">
              {data.protocols.map((p) => (
                <div key={p.name} className="protocol" style={{ '--c': techIcon(p.name)?.color }}>
                  <dt className="mono">
                    <TechIcon name={p.name} size={18} />
                    {p.name}
                  </dt>
                  <dd>{p.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <DataStream />
        </div>

        {data.orchestration?.length > 0 && (
          <div className="orchestration" data-reveal>
            <h3 className="protocols__title">Orquestração, ingestão e observabilidade</h3>
            <ul className="orchestration__grid">
              {data.orchestration.map((o, i) => (
                <li key={o.name} className="orch-card" style={{ '--c': techIcon(o.name)?.color, '--i': i }}>
                  <span className="orch-card__icon">
                    <TechIcon name={o.name} size={24} />
                  </span>
                  <strong>{o.name}</strong>
                  <p>{o.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
