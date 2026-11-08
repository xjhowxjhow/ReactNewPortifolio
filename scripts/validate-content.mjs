// Validates src/content before every build, so edits from the CMS cannot publish broken or sensitive content.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(import.meta.dirname, '..', 'src', 'content');
const errors = [];
const warnings = [];

function load(name) {
  try {
    return JSON.parse(readFileSync(join(dir, name), 'utf8'));
  } catch (err) {
    errors.push(`${name}: JSON inválido (${err.message})`);
    return null;
  }
}

const FORBIDDEN = [
  [/dev\.azure\.com|visualstudio\.com/i, 'link interno do Azure DevOps'],
  [/\.vault\.azure\.net|\bkv-[a-z0-9-]+/i, 'identificador de Key Vault'],
  [/\.blob\.core\.windows\.net/i, 'endereço de Storage'],
  [/\b(?:\d{1,3}\.){3}\d{1,3}\b/, 'endereço IP'],
  [/localhost|127\.0\.0\.1/i, 'endereço local'],
  [/\+?55\s?\(?\d{2}\)?\s?9?\d{4}-?\d{4}/, 'telefone'],
  [/\bkael\b|\bextrator\b|\bnexo[-_ ]?(?:api|interfaces|integracao|orion|hub|cs\b)/i, 'nome de projeto interno'],
  [/\b(?:ASO|CIPA|EPI|SST|HHT|eSocial)\b|absente[ií]smo|afastamento|admiss[ãa]o|demiss[ãa]o/i, 'regra de negócio específica'],
];

function scan(file, value, path = '') {
  if (typeof value === 'string') {
    FORBIDDEN.forEach(([re, label]) => {
      if (re.test(value)) errors.push(`${file}${path}: contém ${label}`);
    });
    if (/^https?:\/\//.test(value) && !value.startsWith('https://')) errors.push(`${file}${path}: use https`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => scan(file, v, `${path}[${i}]`));
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([k, v]) => scan(file, v, `${path}.${k}`));
  }
}

function required(file, obj, fields, label) {
  fields.forEach((f) => {
    const v = obj?.[f];
    if (v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0)) {
      errors.push(`${file}: ${label} sem "${f}"`);
    }
  });
}

const month = /^\d{4}-\d{2}$/;
const now = new Date();
const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
const EVIDENCE = ['documentado', 'experiencia', 'complementar'];

const files = {
  profile: load('profile.json'),
  architecture: load('architecture.json'),
  integrations: load('integrations.json'),
  skills: load('skills.json'),
  experience: load('experience.json'),
  credentials: load('credentials.json'),
  cases: load('cases.json'),
  projects: load('projects.json'),
  github: load('github.json'),
};

Object.entries(files).forEach(([name, data]) => data && scan(`${name}.json`, data));

const { profile, architecture, integrations, skills, experience, credentials, cases, projects } = files;

if (profile) {
  required('profile.json', profile, ['name', 'headline', 'summary', 'about', 'links'], 'perfil');
  if (!month.test(profile.updatedAt || '')) errors.push('profile.json: updatedAt deve ser AAAA-MM');
}

if (architecture && architecture.steps?.length !== 6) errors.push('architecture.json: são necessárias exatamente 6 etapas (uma por estágio da cena 3D)');
architecture?.steps?.forEach((s) => required('architecture.json', s, ['code', 'title', 'text', 'zoom', 'breakdown', 'tools'], s.code || 'etapa'));

integrations?.systems?.forEach((s) => {
  required('integrations.json', s, ['id', 'name', 'summary', 'work'], s.name || 'sistema');
  if (!EVIDENCE.includes(s.evidence)) errors.push(`integrations.json: ${s.name} com evidência inválida`);
});

skills?.layers?.forEach((l) =>
  l.items.forEach((i) => {
    required('skills.json', i, ['name', 'use'], i.name || 'item');
    if (!EVIDENCE.includes(i.evidence)) errors.push(`skills.json: ${i.name} com evidência inválida`);
  }),
);

experience?.items?.forEach((e) => {
  required('experience.json', e, ['company', 'role', 'start'], e.company || 'posição');
  if (!month.test(e.start)) errors.push(`experience.json: ${e.company} início deve ser AAAA-MM`);
  if (e.end && !month.test(e.end)) errors.push(`experience.json: ${e.company} fim deve ser AAAA-MM`);
});

const TYPES = ['certificacao', 'acreditacao', 'formacao', 'academica'];
credentials?.items?.forEach((c) => {
  required('credentials.json', c, ['id', 'name', 'issuer', 'type'], c.name || 'credencial');
  if (!TYPES.includes(c.type)) errors.push(`credentials.json: ${c.name} com tipo inválido`);
  if (c.validUntil && c.validUntil.slice(0, 7) < currentMonth && c.visible) {
    warnings.push(`credentials.json: "${c.name}" expirou em ${c.validUntil}; o site não a exibirá até a validade ser atualizada`);
  }
  if (c.visible && !c.verifyUrl && c.type !== 'academica') warnings.push(`credentials.json: "${c.name}" sem link de verificação`);
});

const DIAGRAMS = ['pipeline', 'framework', 'oracle', 'agents', 'bi', 'observability'];
const STATUS = ['continuo', 'validacao', 'homologacao', 'desenvolvimento', 'evolucao', 'producao', 'estudo'];
cases?.items?.forEach((c) => {
  required('cases.json', c, ['id', 'title', 'problem', 'contribution', 'architecture', 'decisions', 'stack', 'result'], c.title || 'caso');
  if (!DIAGRAMS.includes(c.diagram)) errors.push(`cases.json: ${c.title} com diagrama inexistente`);
  if (c.status && !STATUS.includes(c.status)) errors.push(`cases.json: ${c.title} com situação inválida`);
});

projects?.items?.forEach((p) => {
  required('projects.json', p, ['id', 'name', 'type', 'description', 'repo'], p.name || 'projeto');
  if (!/^https:\/\/github\.com\//.test(p.repo || '')) errors.push(`projects.json: ${p.name} deve apontar para um repositório no GitHub`);
});

warnings.forEach((w) => console.warn(`aviso: ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`erro: ${e}`));
  console.error(`\n${errors.length} erro(s) no conteúdo. Build interrompido.`);
  process.exit(1);
}
console.log(`Conteúdo válido (${warnings.length} aviso(s)).`);
