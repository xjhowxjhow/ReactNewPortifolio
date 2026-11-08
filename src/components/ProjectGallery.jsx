import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import projects from '../content/projects.json';
import { useMotion } from '../lib/motion.jsx';
import { PROJECT_TYPES } from '../lib/format.js';
import { techIcon } from '../lib/techIcons.js';
import { withTransition } from '../lib/transition.js';
import { External, GitHub } from './Icons.jsx';
import { TechChips } from './Tech.jsx';
import './ProjectGallery.css';

const ITEMS = projects.items.filter((p) => p.gallery?.length);
const SLIDE_MS = 4200;
// Optimised thumbnails exist for the bundled gallery; CMS uploads fall back to the full image.
const thumbOf = (src) => (src.startsWith('/gallery/') ? src.replace(/\.webp$/, '-t.webp') : src);

export default function ProjectGallery() {
  const { paused } = useMotion();
  const [pi, setPi] = useState(0);
  const [si, setSi] = useState(0);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const project = ITEMS[pi];
  const shots = project.gallery;
  const playing = !paused && !hold && !zoomed && inView;

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  // Slideshow runs through every screenshot, then moves on to the next project.
  useEffect(() => {
    if (!playing) return undefined;
    const t = window.setTimeout(() => {
      if (si < shots.length - 1) setSi(si + 1);
      else
        withTransition(() => {
          setPi((pi + 1) % ITEMS.length);
          setSi(0);
        });
    }, SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [playing, si, pi, shots.length]);

  const pick = (i) =>
    withTransition(() => {
      setPi(i);
      setSi(0);
    });
  const step = useCallback((d) => setSi((v) => (v + d + shots.length) % shots.length), [shots.length]);

  useEffect(() => {
    if (!zoomed) return undefined;
    closeRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setZoomed(false);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [zoomed, step]);

  const onKey = (e) => {
    if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
    else return;
    e.preventDefault();
  };

  return (
    <div
      className="pgallery"
      id="galeria"
      ref={rootRef}
      data-reveal
      onPointerEnter={() => setHold(true)}
      onPointerLeave={() => setHold(false)}
      style={{ '--c': techIcon(project.stack[0])?.color }}
    >
      <div className="pgallery__stage">
        <button type="button" className="pgallery__screen" onClick={() => setZoomed(true)} onKeyDown={onKey} aria-label={`Ampliar captura ${si + 1} de ${shots.length} de ${project.name}`}>
          <img key={shots[si]} src={shots[si]} alt={`${project.name} — captura ${si + 1}`} decoding="async" />
          <span className="pgallery__zoom mono" aria-hidden="true">
            ⤢ ampliar
          </span>
        </button>
        <div className="pgallery__nav">
          <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Captura anterior">
            ‹
          </button>
          <span className="mono pgallery__count">
            {String(si + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
          </span>
          <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Próxima captura">
            ›
          </button>
          {playing && <span key={`${pi}-${si}`} className="pgallery__timer" style={{ '--t': `${SLIDE_MS}ms` }} aria-hidden="true" />}
        </div>
        <ol className="pgallery__thumbs" aria-label="Capturas">
          {shots.map((src, i) => (
            <li key={src}>
              <button type="button" aria-pressed={i === si} onClick={() => setSi(i)} aria-label={`Captura ${i + 1}`}>
                <img src={thumbOf(src)} alt="" loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ol>
      </div>

      <aside className="pgallery__side">
        <div className="pgallery__info" key={project.id}>
          <span className={`repo-type repo-type--${project.type}`}>{PROJECT_TYPES[project.type]}</span>
          <h3>{project.name}</h3>
          <p>{project.details || project.description}</p>
          <TechChips items={project.stack} />
          <div className="pgallery__links">
            <a className="btn" href={project.repo} target="_blank" rel="noopener noreferrer">
              <GitHub /> Repositório
            </a>
            {project.demo && (
              <a className="text-link" href={project.demo} target="_blank" rel="noopener noreferrer">
                Demonstração <External />
              </a>
            )}
            {project.video && (
              <a className="text-link" href={project.video} target="_blank" rel="noopener noreferrer">
                Vídeo <External />
              </a>
            )}
          </div>
        </div>

        <ul className="pgallery__list" aria-label="Projetos da galeria">
          {ITEMS.map((p, i) => (
            <li key={p.id}>
              <button type="button" className="pgallery__item" aria-pressed={i === pi} onClick={() => pick(i)}>
                <img src={thumbOf(p.gallery[0])} alt="" loading="lazy" decoding="async" />
                <span>
                  <strong>{p.name}</strong>
                  <small className="mono">
                    {PROJECT_TYPES[p.type]} · {p.gallery.length} capturas
                  </small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {zoomed &&
        createPortal(
        <div
          className="pgallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} — captura ${si + 1}`}
          onClick={(e) => e.target === e.currentTarget && setZoomed(false)}
        >
          <figure className="pgallery__lightbox-frame">
            <img src={shots[si]} alt={`${project.name} — captura ${si + 1}`} />
            <figcaption className="pgallery__lightbox-bar">
              <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Captura anterior">
                ‹
              </button>
              <span className="mono">
                {project.name} · {si + 1} / {shots.length}
              </span>
              <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Próxima captura">
                ›
              </button>
              <button ref={closeRef} type="button" className="icon-btn" onClick={() => setZoomed(false)} aria-label="Fechar">
                ×
              </button>
            </figcaption>
          </figure>
        </div>,
          document.body,
        )}
    </div>
  );
}
