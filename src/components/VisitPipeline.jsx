import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import profile from '../content/profile.json';
import { aggregate, exportAudit, getSnapshot, qualityChecks, SECTIONS, startVisitTracking, subscribe, visit } from '../lib/visitTelemetry.js';
import './VisitPipeline.css';

const TABS = [
  ['bronze', 'Bronze', 'eventos brutos'],
  ['prata', 'Prata', 'por seção'],
  ['ouro', 'Ouro', 'insights'],
];

const PROFILES = {
  inicio: ['Primeira impressão', 'Desça até a arquitetura e veja a câmera mergulhar em cada etapa.', '#arquitetura'],
  arquitetura: ['Arquitetura de dados', 'Abra a etapa OBSERVE: observabilidade e auditoria são o pilar de tudo.', '#arquitetura'],
  sobre: ['Trajetória e princípios', 'Os casos mostram os princípios aplicados na prática.', '#projetos'],
  integracoes: ['Integrações corporativas', 'Veja o caso de integrações entre ERPs, HCMs e plataforma de dados.', '#projetos'],
  projetos: ['Projetos e decisões', 'As competências mostram a base técnica por trás desses projetos.', '#competencias'],
  github: ['Código', 'Os projetos profissionais estão descritos em Tipos de projeto.', '#projetos'],
  competencias: ['Base técnica', 'As acreditações Databricks são verificáveis publicamente.', '#credenciais'],
  credenciais: ['Credenciais', 'Se fez sentido até aqui, vale uma conversa.', '#contato'],
  contato: ['Pronto para conversar', 'Feche o pipeline com um e-mail.', `mailto:${profile.links.email}`],
};

function formatMs(ms) {
  const s = Math.round(ms / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}min ${String(s % 60).padStart(2, '0')}s`;
}

const HIDDEN_KEYS = ['seq', 'ts', 'run_id', 'event'];

function JsonLine({ e }) {
  const rest = Object.entries(e).filter(([k]) => !HIDDEN_KEYS.includes(k));
  return (
    <li>
      <span className="j-seq">{String(e.seq).padStart(3, '0')}</span>
      <span className="j-ts">{e.ts.slice(11, 19)}</span>
      <span className={`j-ev j-ev--${e.event}`}>{e.event}</span>
      {rest.map(([k, v]) => (
        <span key={k} className="j-kv">
          <span className="j-k">{k}</span>=<span className="j-v">{String(v)}</span>
        </span>
      ))}
    </li>
  );
}

export default function VisitPipeline() {
  const { events } = useSyncExternalStore(subscribe, getSnapshot);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('bronze');
  const [now, setNow] = useState(() => Date.now());
  const [hint, setHint] = useState(false);
  const logRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    startVisitTracking();
    let seen;
    try {
      seen = sessionStorage.getItem('jd-visit-hint') === '1';
    } catch {
      seen = true;
    }
    if (seen) return undefined;
    const show = window.setTimeout(() => setHint(true), 14000);
    const hide = window.setTimeout(() => setHint(false), 24000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  // A live clock only while the console is open, so dwell times keep counting.
  useEffect(() => {
    if (!open) return undefined;
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    headingRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [events, tab, open]);

  const silver = useMemo(() => aggregate(events, now), [events, now]);
  const checks = useMemo(() => qualityChecks(events), [events]);
  const seen = silver.filter((r) => r.visits > 0);
  const coverage = Math.round((seen.length / SECTIONS.length) * 100);
  const top = [...silver].sort((a, b) => b.dwell - a.dwell)[0];
  const maxDwell = Math.max(1, ...silver.map((r) => r.dwell));
  const interactions = events.filter((e) => e.event === 'interaction').length;
  const profileHit = top && top.dwell > 0 ? PROFILES[top.id] : PROFILES.inicio;
  const status = coverage >= 60 ? 'SUCCEEDED' : 'RUNNING';

  const toggle = () => {
    setOpen((v) => !v);
    setHint(false);
    try {
      sessionStorage.setItem('jd-visit-hint', '1');
    } catch {
      // Private modes can block storage; the hint simply shows again next time.
    }
  };

  return (
    <div className={`visit${open ? ' is-open' : ''}`}>
      {hint && !open && (
        <p className="visit__hint" role="status">
          Sua navegação está virando um pipeline de dados. Quer ver?
        </p>
      )}
      <button type="button" className="visit__launcher" aria-expanded={open} aria-controls="visit-panel" onClick={toggle}>
        <span className="visit__pulse" aria-hidden="true" />
        <span className="mono visit__label">Sua visita · pipeline</span>
        <span className="visit__count mono" aria-label={`${events.length} eventos`}>
          {events.length}
        </span>
      </button>

      {open && (
        <section id="visit-panel" className="visit__panel" role="dialog" aria-modal="false" aria-labelledby="visit-title">
          <header className="visit__head">
            <div>
              <p className="mono visit__run">
                {visit.runId} · <span className={`visit__status visit__status--${status.toLowerCase()}`}>{status}</span>
              </p>
              <h2 id="visit-title" ref={headingRef} tabIndex={-1}>
                Sua visita como pipeline de dados
              </h2>
              <p className="visit__lead">
                Cada rolagem e clique vira um evento. Os eventos passam por bronze, prata e ouro — como num lakehouse — e ganham auditoria e
                checagens de qualidade. Nada sai do seu navegador.
              </p>
            </div>
            <button type="button" className="visit__close" onClick={() => setOpen(false)} aria-label="Fechar console da visita">
              ×
            </button>
          </header>

          <ol className="visit__dag" aria-label="Camadas">
            {TABS.map(([id, name, sub], i) => (
              <li key={id}>
                <button type="button" className={`visit__stage visit__stage--${id}`} aria-pressed={tab === id} onClick={() => setTab(id)}>
                  <span className="mono">{name}</span>
                  <strong>{i === 0 ? events.length : i === 1 ? seen.length : `${coverage}%`}</strong>
                  <small>{sub}</small>
                </button>
              </li>
            ))}
          </ol>

          {tab === 'bronze' && (
            <ol className="visit__log mono" ref={logRef} aria-label="Eventos brutos">
              {events.slice(-60).map((e) => (
                <JsonLine key={e.seq} e={e} />
              ))}
            </ol>
          )}

          {tab === 'prata' && (
            <table className="visit__table">
              <thead>
                <tr>
                  <th scope="col">Seção</th>
                  <th scope="col">Tempo</th>
                  <th scope="col">Visitas</th>
                  <th scope="col">Cliques</th>
                </tr>
              </thead>
              <tbody>
                {silver.map((r) => (
                  <tr key={r.id} className={r.visits ? '' : 'is-empty'}>
                    <th scope="row">
                      <a href={`#${r.id}`}>{r.name}</a>
                      <span className="visit__bar" style={{ '--w': `${(r.dwell / maxDwell) * 100}%` }} aria-hidden="true" />
                    </th>
                    <td className="mono">{r.dwell ? formatMs(r.dwell) : '—'}</td>
                    <td className="mono">{r.visits || '—'}</td>
                    <td className="mono">{r.interactions || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === 'ouro' && (
            <div className="visit__gold">
              <div className="visit__kpis">
                <div>
                  <span className="mono">Cobertura</span>
                  <strong>{coverage}%</strong>
                  <span className="visit__meter" style={{ '--w': `${coverage}%` }} aria-hidden="true" />
                </div>
                <div>
                  <span className="mono">Duração</span>
                  <strong>{formatMs(now - visit.startedAt)}</strong>
                </div>
                <div>
                  <span className="mono">Interações</span>
                  <strong>{interactions}</strong>
                </div>
              </div>
              <div className="visit__insight">
                <span className="mono">Perfil inferido</span>
                <strong>{profileHit[0]}</strong>
                <p>
                  {top && top.dwell > 0 ? `Mais tempo em ${top.name} (${formatMs(top.dwell)}). ` : ''}
                  {profileHit[1]}
                </p>
                <a className="btn btn--primary visit__next" href={profileHit[2]} onClick={() => setOpen(false)}>
                  Próximo passo recomendado
                </a>
              </div>
              <ul className="visit__checks" aria-label="Checagens de qualidade">
                {checks.map((c) => (
                  <li key={c.name} className={c.ok ? 'is-ok' : 'is-fail'}>
                    <span className="mono">{c.ok ? '✓' : '✕'}</span>
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <footer className="visit__foot">
            <p className="mono">Local · sem cookies · sem envio</p>
            <button type="button" className="btn" onClick={() => exportAudit(events)}>
              Exportar auditoria (.jsonl)
            </button>
          </footer>
        </section>
      )}
    </div>
  );
}
