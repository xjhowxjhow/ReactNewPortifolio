import { useEffect, useRef, useState } from 'react';
import architecture from '../content/architecture.json';
import { useMotion } from '../lib/motion.jsx';
import { techIcon } from '../lib/techIcons.js';
import { tabKeyHandler, withTransition } from '../lib/transition.js';
import SceneCanvas from './SceneCanvas.jsx';
import { ArrowDown, ArrowRight, GitHub, LinkedIn, Pause, Play } from './Icons.jsx';
import { TechIcon } from './Tech.jsx';
import './ArchitectureStage.css';

const STEP_MS = 9000;

function toneOf(code) {
  if (code.startsWith('OBSERVE')) return 'observe';
  if (code.startsWith('AGENTS')) return 'ai';
  return 'data';
}

export default function ArchitectureStage({ profile, highlights }) {
  const { paused } = useMotion();
  const flowRef = useRef(null);
  const [flowInView, setFlowInView] = useState(false);
  const [step, setStep] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hold, setHold] = useState(false);
  const steps = architecture.steps;
  const running = autoplay && !paused && flowInView && !hold;

  useEffect(() => {
    const el = flowRef.current;
    const io = new IntersectionObserver(([e]) => setFlowInView(e.isIntersecting), { rootMargin: '-30% 0px -30% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const t = window.setTimeout(() => withTransition(() => setStep((s) => (s + 1) % steps.length)), STEP_MS);
    return () => window.clearTimeout(t);
  }, [running, step, steps.length]);

  const select = (i) => {
    setAutoplay(false);
    withTransition(() => setStep(i));
  };

  const current = steps[step];
  const tone = toneOf(current.code);

  return (
    <section className="stage" id="inicio" aria-labelledby="hero-title">
      <div className="stage__visual" aria-hidden="true">
        <SceneCanvas stage={flowInView ? step : -1} />
        <div className="stage__readout mono">
          <span className="stage__dot" />
          {flowInView ? `${String(step + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')} · ${current.code}` : 'Visão geral'}
        </div>
      </div>

      <div className="stage__content container">
        <header className="hero">
          <p className="eyebrow hero__in" style={{ '--d': '0ms' }}>
            {profile.tagline}
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__name hero__in" style={{ '--d': '80ms' }}>
              {profile.name}
            </span>
            <span className="hero__role hero__in" style={{ '--d': '160ms' }}>
              {profile.headline}
            </span>
          </h1>
          <p className="hero__summary hero__in" style={{ '--d': '240ms' }}>
            {profile.summary}
          </p>
          <div className="hero__actions hero__in" style={{ '--d': '320ms' }}>
            <a className="btn btn--primary" href="#projetos">
              Explorar projetos <ArrowRight />
            </a>
            <a className="btn" href="#sobre">
              Conhecer minha trajetória
            </a>
          </div>
          <ul className="hero__metrics hero__in" style={{ '--d': '400ms' }} aria-label="Destaques">
            {highlights.map((h) => (
              <li key={h.label}>
                <strong>{h.value}</strong>
                <span>{h.label}</span>
              </li>
            ))}
          </ul>
          <div className="hero__foot hero__in" style={{ '--d': '480ms' }}>
            <ul className="hero__links" aria-label="Perfis">
              <li>
                <a className="text-link" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedIn /> LinkedIn
                </a>
              </li>
              <li>
                <a className="text-link" href={profile.links.github} target="_blank" rel="noopener noreferrer">
                  <GitHub /> GitHub
                </a>
              </li>
            </ul>
            <a className="hero__scroll mono" href="#arquitetura">
              <ArrowDown /> Ver a arquitetura
            </a>
          </div>
        </header>

        <div className="flow" id="arquitetura" ref={flowRef}>
          <div className="flow__intro" data-reveal>
            <p className="eyebrow">Arquitetura em prática</p>
            <h2 className="flow__title">{architecture.title}</h2>
            {architecture.lead && <p className="flow__lead">{architecture.lead}</p>}
          </div>

          <div
            className="flow__explorer"
            data-reveal
            onPointerEnter={() => setHold(true)}
            onPointerLeave={() => setHold(false)}
            onFocus={() => setHold(true)}
            onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
          >
            <div className="flow__tabs" role="tablist" aria-label="Etapas da arquitetura">
              {steps.map((s, i) => (
                <button
                  key={s.code}
                  type="button"
                  role="tab"
                  id={`flow-tab-${i}`}
                  aria-selected={i === step}
                  aria-controls="flow-panel"
                  aria-label={s.title}
                  tabIndex={i === step ? 0 : -1}
                  className={`flow-tab flow-tab--${toneOf(s.code)}${i === step ? ' is-active' : ''}${i < step ? ' is-past' : ''}`}
                  onClick={() => select(i)}
                  onKeyDown={tabKeyHandler(i, steps.length, select)}
                >
                  <span className="flow-tab__index mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flow-tab__code mono">{s.code}</span>
                  {i === step && running && <span key={step} className="flow-tab__progress" style={{ '--t': `${STEP_MS}ms` }} />}
                </button>
              ))}
            </div>

            <div id="flow-panel" role="tabpanel" aria-labelledby={`flow-tab-${step}`} className={`flow-panel flow-panel--${tone}`}>
              <header className="flow-panel__head" key={`h-${step}`}>
                <p className="flow-panel__zoom mono">
                  <span className="flow-panel__lens" aria-hidden="true" />
                  Zoom · {current.zoom}
                </p>
                <h3 className="flow-panel__title">{current.title}</h3>
                <p className="flow-panel__text">{current.text}</p>
              </header>

              <section className="flow-panel__block" aria-label="Quebra da etapa">
                <h4 className="mono">Quebra da etapa</h4>
                <ol className="breakdown" key={`b-${step}`}>
                  {current.breakdown.map((b, i) => (
                    <li key={b.label} style={{ '--i': i }}>
                      <span className="breakdown__node mono">{i + 1}</span>
                      <strong>{b.label}</strong>
                      <p>{b.text}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="flow-panel__block" aria-label="Ferramentas a fundo">
                <h4 className="mono">Ferramentas a fundo</h4>
                <ul className="tool-cards" key={`t-${step}`}>
                  {current.tools.map((t, i) => (
                    <li key={t.name} className="tool-card" style={{ '--i': i, '--c': techIcon(t.name)?.color }}>
                      <span className="tool-card__icon">
                        <TechIcon name={t.name} size={22} />
                      </span>
                      <div>
                        <p className="tool-card__name">
                          {t.name}
                          <span className="mono">{t.role}</span>
                        </p>
                        <p className="tool-card__text">{t.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <p className="flow-panel__decision">
                <span className="mono">Decisão de arquitetura</span>
                {current.decision}
              </p>
            </div>

            <div className="flow__controls">
              <button type="button" className="icon-btn" aria-pressed={!autoplay} onClick={() => setAutoplay((v) => !v)}>
                {autoplay ? <Pause /> : <Play />}
                <span className="motion-toggle__label">{autoplay ? 'Pausar sequência' : 'Reproduzir sequência'}</span>
              </button>
              {architecture.note && <p className="flow__note">{architecture.note}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
