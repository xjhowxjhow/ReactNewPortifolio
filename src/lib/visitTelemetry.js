// Local-only telemetry of the current visit: nothing is sent anywhere, it only feeds the on-page pipeline console.
const MAX_EVENTS = 600;
const listeners = new Set();
const runId = `run-${Math.random().toString(16).slice(2, 8)}`;
const startedAt = Date.now();
let seq = 0;
let snapshot = { version: 0, events: [] };

export const SECTIONS = [
  ['inicio', 'Abertura', () => document.querySelector('.hero')],
  ['arquitetura', 'Arquitetura', () => document.getElementById('arquitetura')],
  ['sobre', 'Sobre', () => document.getElementById('sobre')],
  ['integracoes', 'Integrações', () => document.getElementById('integracoes')],
  ['projetos', 'Projetos', () => document.getElementById('projetos')],
  ['github', 'Galeria e GitHub', () => document.getElementById('github')],
  ['competencias', 'Competências', () => document.getElementById('competencias')],
  ['credenciais', 'Credenciais', () => document.getElementById('credenciais')],
  ['contato', 'Contato', () => document.getElementById('contato')],
];

export const visit = { runId, startedAt };

export function emit(event, data = {}) {
  seq += 1;
  const e = { seq, ts: new Date().toISOString(), run_id: runId, event, ...data };
  const events = snapshot.events.length >= MAX_EVENTS ? snapshot.events.slice(1) : snapshot.events.slice();
  events.push(e);
  snapshot = { version: snapshot.version + 1, events };
  listeners.forEach((l) => l());
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const getSnapshot = () => snapshot;

let started = false;
export function startVisitTracking() {
  if (started) return;
  started = true;

  emit('session_start', {
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    lang: navigator.language,
    reduced_motion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  });

  // The section crossing the middle of the screen is the one being read.
  let current = null;
  let enteredAt = 0;
  const leave = () => {
    if (!current) return;
    emit('section_exit', { section: current, dwell_ms: Date.now() - enteredAt });
    current = null;
  };
  const byEl = new Map();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = byEl.get(entry.target);
        if (entry.isIntersecting && id !== current) {
          leave();
          current = id;
          enteredAt = Date.now();
          emit('section_enter', { section: id });
        } else if (!entry.isIntersecting && id === current) {
          leave();
        }
      });
    },
    { rootMargin: '-48% 0px -48% 0px' },
  );
  SECTIONS.forEach(([id, , find]) => {
    const el = find();
    if (el) {
      byEl.set(el, id);
      io.observe(el);
    }
  });

  document.addEventListener(
    'click',
    (e) => {
      const el = e.target.closest?.('button, a, [role="tab"]');
      if (!el || el.closest('.visit')) return;
      const label = (el.getAttribute('aria-label') || el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 48);
      emit('interaction', { section: current, kind: el.tagName.toLowerCase(), target: label });
    },
    true,
  );

  const marks = [25, 50, 75, 100];
  let reached = 0;
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 100;
        while (reached < marks.length && pct >= marks[reached] - 0.5) {
          emit('scroll_depth', { percent: marks[reached] });
          reached += 1;
        }
      });
    },
    { passive: true },
  );

  document.addEventListener('visibilitychange', () => emit(document.hidden ? 'tab_hidden' : 'tab_visible', { section: current }));
}

// Silver: one row per section, live dwell included for the section being read.
export function aggregate(events, now = Date.now()) {
  const rows = new Map(SECTIONS.map(([id, name]) => [id, { id, name, dwell: 0, visits: 0, interactions: 0 }]));
  let open = null;
  events.forEach((e) => {
    const row = e.section ? rows.get(e.section) : null;
    if (e.event === 'section_enter' && row) {
      row.visits += 1;
      open = { row, at: Date.parse(e.ts) };
    } else if (e.event === 'section_exit' && row) {
      row.dwell += e.dwell_ms;
      open = null;
    } else if (e.event === 'interaction' && row) {
      row.interactions += 1;
    }
  });
  if (open) open.row.dwell += Math.max(0, now - open.at);
  return [...rows.values()];
}

// Data-quality expectations run over the bronze events, like any pipeline would.
export function qualityChecks(events) {
  const seqOk = events.every((e, i) => i === 0 || e.seq === events[i - 1].seq + 1);
  const contractOk = events.every((e) => e.ts && e.run_id && e.event);
  const dwellOk = events.every((e) => e.dwell_ms === undefined || e.dwell_ms >= 0);
  const dupes = events.some(
    (e, i) => i > 0 && e.event === events[i - 1].event && e.target === events[i - 1].target && e.section === events[i - 1].section && Date.parse(e.ts) - Date.parse(events[i - 1].ts) < 40,
  );
  return [
    { name: 'Sequência íntegra (seq contínuo)', ok: seqOk },
    { name: 'Contrato do evento (ts, run_id, event)', ok: contractOk },
    { name: 'Permanência sem valores negativos', ok: dwellOk },
    { name: 'Sem eventos duplicados', ok: !dupes },
  ];
}

export function exportAudit(events) {
  const body = events.map((e) => JSON.stringify(e)).join('\n');
  const url = URL.createObjectURL(new Blob([body], { type: 'application/x-ndjson' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${runId}-auditoria.jsonl`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
