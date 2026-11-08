import { GitHub, LinkedIn, Mail } from './Icons.jsx';
import './Contact.css';

export default function Contact({ profile }) {
  return (
    <section className="section contact" id="contato" aria-labelledby="contato-title">
      <div className="container contact__inner" data-reveal>
        <p className="eyebrow">Contato</p>
        <h2 id="contato-title" className="contact__title">
          Tem um problema de dados ou integração para resolver?
        </h2>
        <p className="lead">O LinkedIn é o caminho mais direto para conversar. No GitHub estão meus projetos e estudos públicos.</p>
        <div className="contact__actions">
          <a className="btn btn--primary" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedIn /> Conversar no LinkedIn
          </a>
          <a className="btn" href={profile.links.github} target="_blank" rel="noopener noreferrer">
            <GitHub /> GitHub
          </a>
          <a className="btn" href={`mailto:${profile.links.email}`}>
            <Mail /> {profile.links.email}
          </a>
        </div>
      </div>
    </section>
  );
}
