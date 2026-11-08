import { MARQUEE_TECH, techIcon } from '../lib/techIcons.js';
import { TechIcon } from './Tech.jsx';

// Illustrative snippets only; no real payloads or identifiers.
const SNIPPETS = [
  [['k', 'GET '], ['s', '/api/v1/registros?pageSize=200']],
  [['p', '{ '], ['s', '"op"'], ['p', ': '], ['s', '"upsert"'], ['p', ' }']],
  [['k', 'MERGE INTO '], ['s', 'stage '], ['k', 'USING '], ['s', 'origem']],
  [['s', '$filter'], ['p', '='], ['s', 'modificado gt ontem']],
  [['p', '{ '], ['s', '"status"'], ['p', ': '], ['n', '200'], ['p', ' }']],
  [['k', 'POST '], ['s', '/lotes'], ['p', ' · '], ['n', 'batch=500']],
  [['k', 'sftp '], ['s', 'get /saida/*.csv']],
  [['k', 'spark'], ['p', '.read.'], ['s', 'format("delta")']],
  [['k', 'SOAPAction'], ['p', ': '], ['s', '"consultar"']],
  [['p', '{ '], ['s', '"retry"'], ['p', ': '], ['n', '3'], ['p', ', '], ['s', '"timeout_s"'], ['p', ': '], ['n', '30'], ['p', ' }']],
  [['k', 'agent'], ['p', ' → '], ['s', 'mcp.tools.list()']],
];

export default function TechMarquee() {
  const tech = [...MARQUEE_TECH, ...MARQUEE_TECH];
  const code = [...SNIPPETS, ...SNIPPETS, ...SNIPPETS, ...SNIPPETS];
  return (
    <section className="marquee" aria-label="Tecnologias com que trabalho">
      <ul className="visually-hidden">
        {MARQUEE_TECH.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="marquee__row" style={{ '--dur': '70s' }} aria-hidden="true">
        {tech.map((t, i) => (
          <span key={`${t}-${i}`} className="marquee__item" style={{ '--c': techIcon(t)?.color }}>
            <TechIcon name={t} size={22} />
            {t}
          </span>
        ))}
      </div>
      <div className="marquee__row marquee__row--reverse" style={{ '--dur': '90s' }} aria-hidden="true">
        {code.map((snip, i) => (
          <code key={i} className="marquee__code">
            {snip.map(([t, v], j) => (
              <span key={j} className={`tok-${t}`}>
                {v}
              </span>
            ))}
          </code>
        ))}
      </div>
    </section>
  );
}
