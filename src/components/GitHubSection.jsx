import { useEffect, useMemo, useRef, useState } from 'react';
import github from '../content/github.json';
import projects from '../content/projects.json';
import { formatDate, PROJECT_TYPES } from '../lib/format.js';
import { External, GitHub } from './Icons.jsx';
import { TechChips, TechIcon } from './Tech.jsx';
import { techIcon } from '../lib/techIcons.js';
import ProjectGallery from './ProjectGallery.jsx';
import './GitHubSection.css';

const CACHE_KEY = 'jd-github-v1';
const CACHE_TTL = 60 * 60 * 1000;
const LANG_COLORS = {
  Python: '#4fd8eb',
  JavaScript: '#f2c46d',
  'Jupyter Notebook': '#5b8cff',
  HTML: '#e8896a',
  'C#': '#b4a2ff',
};

function repoName(url) {
  return url.replace(/\/+$/, '').split('/').pop();
}

function readCache() {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(CACHE_KEY));
    return parsed && Date.now() - parsed.at < CACHE_TTL ? parsed.data : null;
  } catch {
    return null;
  }
}

async function fetchLive(login, signal) {
  const cached = readCache();
  if (cached) return cached;
  const headers = { Accept: 'application/vnd.github+json' };
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${login}`, { headers, signal }),
    fetch(`https://api.github.com/users/${login}/repos?per_page=100&sort=pushed`, { headers, signal }),
  ]);
  if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API indisponível');
  const user = await userRes.json();
  const repos = await reposRes.json();
  const data = {
    checkedAt: new Date().toISOString().slice(0, 10),
    name: user.name,
    bio: user.bio,
    avatar: user.avatar_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    createdAt: user.created_at?.slice(0, 10),
    repos: repos.map((r) => ({
      name: r.name,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language,
      pushedAt: r.pushed_at?.slice(0, 10),
      fork: r.fork,
    })),
  };
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    // Cache is optional.
  }
  return data;
}

export default function GitHubSection() {
  const sectionRef = useRef(null);
  const [data, setData] = useState(github.snapshot);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const controller = new AbortController();
    // Fetch only when the visitor approaches the section; the snapshot is shown meanwhile.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        fetchLive(github.login, controller.signal)
          .then((d) => {
            setData(d);
            setLive(true);
          })
          .catch(() => {});
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      controller.abort();
    };
  }, []);

  const stats = useMemo(() => {
    const own = data.repos.filter((r) => !r.fork);
    const stars = own.reduce((s, r) => s + (r.stars || 0), 0);
    const langs = {};
    own.forEach((r) => {
      const key = r.language || 'Outros';
      langs[key] = (langs[key] || 0) + 1;
    });
    const languages = Object.entries(langs)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    return { stars, languages, own: own.length };
  }, [data]);

  const byName = useMemo(() => Object.fromEntries(data.repos.map((r) => [r.name, r])), [data]);
  const featured = projects.items.filter((p) => p.featured);
  const others = projects.items.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} className="section gh" id="github" aria-labelledby="github-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Galeria · GitHub</p>
          <h2 id="github-title" className="section-title">
            Projetos próprios, freelas e estudos.
          </h2>
          <p className="lead">
            Os repositórios que construí fora do trabalho, dos primeiros passos em desenvolvimento aos projetos para clientes. Clique em uma
            captura para ampliar.
          </p>
        </div>

        <ProjectGallery />

        <div className="gh__grid">
          <aside className="gh-profile" data-reveal aria-label="Perfil no GitHub">
            <div className="gh-profile__head">
              <img src={data.avatar} alt="" width="64" height="64" loading="lazy" decoding="async" />
              <div>
                <p className="gh-profile__name">{data.name}</p>
                <p className="mono gh-profile__login">@{github.login}</p>
              </div>
            </div>
            {data.bio && <p className="gh-profile__bio">{data.bio}</p>}
            <dl className="gh-stats">
              <div>
                <dt>Repositórios públicos</dt>
                <dd>{data.publicRepos}</dd>
              </div>
              <div>
                <dt>Estrelas recebidas</dt>
                <dd>{stats.stars}</dd>
              </div>
              <div>
                <dt>Seguidores</dt>
                <dd>{data.followers}</dd>
              </div>
              <div>
                <dt>No GitHub desde</dt>
                <dd>{data.createdAt?.slice(0, 4)}</dd>
              </div>
            </dl>

            <div className="gh-langs">
              <p className="mono gh-langs__title">Linguagem principal por repositório</p>
              <div className="gh-langs__bar" aria-hidden="true">
                {stats.languages.map((l) => (
                  <span
                    key={l.name}
                    style={{ flexGrow: l.count, background: LANG_COLORS[l.name] || 'var(--muted)' }}
                    title={`${l.name}: ${l.count}`}
                  />
                ))}
              </div>
              <ul className="gh-langs__legend">
                {stats.languages.map((l) => (
                  <li key={l.name}>
                    <span className="gh-langs__swatch" style={{ background: LANG_COLORS[l.name] || 'var(--muted)' }} />
                    {l.name} <span className="mono">{l.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="gh-profile__source mono">
              {live ? 'Dados ao vivo da API pública do GitHub' : `Atualizado em ${formatDate(data.checkedAt)}`}
            </p>
            <a className="btn" href={github.profileUrl} target="_blank" rel="noopener noreferrer">
              <GitHub /> Ver perfil completo
            </a>
          </aside>

          <div className="gh-repos">
            <ul className="gh-featured">
              {featured.map((p, i) => {
                const repo = byName[repoName(p.repo)];
                return (
                  <li key={p.id} className="repo-card" data-reveal style={{ '--reveal-delay': `${i * 70}ms` }}>
                    <div className="repo-card__cover" style={{ '--c': techIcon(p.stack[0])?.color }} aria-hidden="true">
                      {p.image ? (
                        <img src={p.image} alt="" width="720" height="405" loading="lazy" decoding="async" />
                      ) : (
                        <span className="repo-card__glyph">
                          <TechIcon name={p.stack[0]} size={56} />
                        </span>
                      )}
                    </div>
                    <div className="repo-card__top">
                      <span className={`repo-type repo-type--${p.type}`}>{PROJECT_TYPES[p.type]}</span>
                      {repo && (
                        <span className="repo-card__nums mono" aria-label={`${repo.stars} estrelas e ${repo.forks} forks`}>
                          ★ {repo.stars} · ⑂ {repo.forks}
                        </span>
                      )}
                    </div>
                    <h3>
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" className="repo-card__link">
                        {p.name}
                      </a>
                    </h3>
                    <p>{p.description}</p>
                    <TechChips items={p.stack} />
                    {(p.demo || p.video) && (
                      <div className="repo-card__extra">
                        {p.demo && (
                          <a className="text-link" href={p.demo} target="_blank" rel="noopener noreferrer">
                            Demonstração <External />
                          </a>
                        )}
                        {p.video && (
                          <a className="text-link" href={p.video} target="_blank" rel="noopener noreferrer">
                            Vídeo <External />
                          </a>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <ul className="gh-others" data-reveal>
              {others.map((p) => {
                const repo = byName[repoName(p.repo)];
                return (
                  <li key={p.id}>
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="gh-row">
                      <span className="gh-row__thumb" style={{ '--c': techIcon(p.stack[0])?.color }} aria-hidden="true">
                        {p.image ? <img src={p.image} alt="" width="96" height="54" loading="lazy" decoding="async" /> : <TechIcon name={p.stack[0]} size={22} />}
                      </span>
                      <span className="gh-row__name">{p.name}</span>
                      <span className="gh-row__desc">{p.description}</span>
                      <span className="gh-row__meta mono">
                        {PROJECT_TYPES[p.type]}
                        {repo?.pushedAt ? ` · ${repo.pushedAt.slice(0, 4)}` : ''}
                      </span>
                      <External />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
