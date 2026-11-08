import { useRef } from 'react';
import credentials from '../content/credentials.json';
import { credentialStatus, CREDENTIAL_TYPES, formatDate } from '../lib/format.js';
import { useMotion } from '../lib/motion.jsx';
import { External } from './Icons.jsx';
import Pending from './Pending.jsx';
import './Credentials.css';

const LAYERS = Array.from({ length: 8 }, (_, i) => i);
const ORDER = ['certificacao', 'acreditacao', 'formacao', 'academica'];

function Badge({ item }) {
  const year = (item.issuedAt || '').slice(0, 4);
  return (
    <div className={`badge3d badge3d--${item.type}`} aria-hidden="true">
      <div className="badge3d__body">
        {LAYERS.map((i) => (
          <span key={i} className="badge3d__layer" style={{ '--i': i }} />
        ))}
        <div className="badge3d__face">
          {item.badgeImage ? (
            <img src={item.badgeImage} alt="" className="badge3d__img" loading="lazy" decoding="async" />
          ) : (
            <div className="badge3d__seal">
              <span className="badge3d__issuer">{item.issuer}</span>
              {year && <span className="badge3d__year">{year}</span>}
              <span className="badge3d__kind">{CREDENTIAL_TYPES[item.type].label}</span>
            </div>
          )}
          <span className="badge3d__sheen" />
        </div>
      </div>
      <span className="badge3d__shadow" />
    </div>
  );
}

function CredentialCard({ item, index }) {
  const ref = useRef(null);
  const { paused } = useMotion();
  const status = credentialStatus(item);

  const onMove = (e) => {
    if (paused || e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty('--ry', `${x * 34}deg`);
    ref.current.style.setProperty('--rx', `${-y * 22}deg`);
    ref.current.style.setProperty('--sx', `${(x + 0.5) * 100}%`);
  };
  const onLeave = () => {
    ref.current.style.removeProperty('--ry');
    ref.current.style.removeProperty('--rx');
    ref.current.style.removeProperty('--sx');
  };

  return (
    <li
      ref={ref}
      className={`credential credential--${item.type}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-reveal
      style={{ '--reveal-delay': `${index * 70}ms` }}
    >
      <Badge item={item} />
      <div className="credential__info">
        <p className="credential__type mono">{CREDENTIAL_TYPES[item.type].label}</p>
        <h4 className="credential__name">{item.name}</h4>
        <p className="credential__issuer">{item.issuer}</p>
        <dl className="credential__facts">
          {item.issuedAt && (
            <div>
              <dt>Conclusão</dt>
              <dd>{formatDate(item.issuedAt)}</dd>
            </div>
          )}
          {item.hours && (
            <div>
              <dt>Carga</dt>
              <dd>{item.hours}</dd>
            </div>
          )}
          <div>
            <dt>Situação</dt>
            <dd className={`credential__status credential__status--${status.key}`}>{status.label}</dd>
          </div>
        </dl>
        {item.details && <p className="credential__details">{item.details}</p>}
        {item.topics.length > 0 && (
          <div className="credential__skills">
            <p className="mono">Competências</p>
            <ul className="credential__chips">
              {item.topics.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}
        {item.courses?.length > 0 && (
          <details className="credential__courses">
            <summary className="mono">Cursos da trilha ({item.courses.length})</summary>
            <ol>
              {item.courses.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ol>
          </details>
        )}
        {item.verifyUrl ? (
          <a className="btn credential__verify" href={item.verifyUrl} target="_blank" rel="noopener noreferrer">
            Verificar credencial <External />
            <span className="visually-hidden"> — {item.name}</span>
          </a>
        ) : (
          item.type !== 'academica' && <Pending>adicionar link público de verificação e imagem oficial do badge.</Pending>
        )}
      </div>
    </li>
  );
}

export default function Credentials() {
  const visible = credentials.items
    .filter((c) => c.visible && credentialStatus(c).key !== 'expirada')
    .sort((a, b) => ORDER.indexOf(a.type) - ORDER.indexOf(b.type));
  const types = ORDER.filter((t) => visible.some((c) => c.type === t));

  return (
    <section className="section credentials" id="credenciais" aria-labelledby="credenciais-title">
      <div className="container">
        <div className="section-head section-head--row" data-reveal>
          <div>
            <p className="eyebrow">Credenciais</p>
            <h2 id="credenciais-title" className="section-title">
              Verificáveis, com nome oficial.
            </h2>
          </div>
          <dl className="cred-legend">
            {types.map((t) => (
              <div key={t} className={`cred-legend__item cred-legend__item--${t}`}>
                <dt>{CREDENTIAL_TYPES[t].plural}</dt>
                <dd>{CREDENTIAL_TYPES[t].description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="cred-grid">
          {visible.map((item, i) => (
            <CredentialCard key={item.id} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
