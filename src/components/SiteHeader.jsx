import { useEffect, useState } from 'react';
import { Close, Menu, Monogram } from './Icons.jsx';
import './SiteHeader.css';

export const NAV = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'integracoes', label: 'Integrações' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'github', label: 'Galeria' },
  { id: 'competencias', label: 'Competências' },
  { id: 'credenciais', label: 'Credenciais' },
  { id: 'contato', label: 'Contato' },
];

export default function SiteHeader({ name }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="site-header__inner container">
        <a className="brand" href="#inicio" onClick={() => setOpen(false)}>
          <Monogram />
          <span>{name}</span>
        </a>

        <nav className="site-nav" id="site-nav" aria-label="Seções">
          <ul>
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={current === item.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Close /> : <Menu />}
            <span className="visually-hidden">{open ? 'Fechar menu' : 'Abrir menu'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
