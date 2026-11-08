import profile from './content/profile.json';
import { useEffect } from 'react';
import { useReveal } from './lib/reveal.js';
import { formatMonth } from './lib/format.js';
import SiteHeader from './components/SiteHeader.jsx';
import ArchitectureStage from './components/ArchitectureStage.jsx';
import TechMarquee from './components/TechMarquee.jsx';
import About from './components/About.jsx';
import Integrations from './components/Integrations.jsx';
import Cases from './components/Cases.jsx';
import GitHubSection from './components/GitHubSection.jsx';
import Skills from './components/Skills.jsx';
import Credentials from './components/Credentials.jsx';
import Contact from './components/Contact.jsx';
import VisitPipeline from './components/VisitPipeline.jsx';

// Years of experience follow the current year, from the start years kept in profile.json.
const NOW_YEAR = new Date().getFullYear();
const HIGHLIGHTS = [
  { value: `+${NOW_YEAR - profile.careerStart.it} anos`, label: 'na área de TI' },
  { value: `+${NOW_YEAR - profile.careerStart.data} anos`, label: 'em engenharia de dados' },
  { value: 'ERP · HCM', label: 'integrações corporativas de ponta a ponta' },
  { value: 'Databricks', label: 'acreditações oficiais verificáveis' },
];

export default function App() {
  useReveal();

  // The SPA renders after the browser's own fragment scroll, so deep links need a second attempt.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteHeader name={profile.name} />
      <main id="conteudo" tabIndex={-1}>
        <ArchitectureStage profile={profile} highlights={HIGHLIGHTS} />
        <TechMarquee />
        <About profile={profile} />
        <Integrations />
        <Cases />
        <GitHubSection />
        <Skills />
        <Credentials />
        <Contact profile={profile} />
      </main>
      <footer className="site-footer">
        <div className="container site-footer__inner">
          <p>
            © {new Date().getFullYear()} {profile.name} · Conteúdo revisado em {formatMonth(profile.updatedAt)}
          </p>
          <p>
            React, Three.js e Vite ·{' '}
            <a href="https://github.com/xjhowxjhow/ReactNewPortifolio" target="_blank" rel="noopener noreferrer">
              código-fonte
            </a>
          </p>
          <p className="site-footer__credits">
            Marcas e logotipos pertencem aos respectivos titulares. Ícones:{' '}
            <a href="https://simpleicons.org/" target="_blank" rel="noopener noreferrer">
              Simple Icons
            </a>{' '}
            (CC0) e Wikimedia Commons; logotipo Senior por{' '}
            <a href="https://commons.wikimedia.org/wiki/File:Senior_sistemas_logo.png" target="_blank" rel="noopener noreferrer">
              Wikimedia Commons
            </a>
            , CC BY-SA 4.0; logotipo Apache Hop © Apache Software Foundation, Apache License 2.0.
          </p>
        </div>
      </footer>
      <VisitPipeline />
    </>
  );
}
