const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

export function formatMonth(value) {
  if (!value) return '';
  const [y, m] = value.split('-');
  if (!m) return y;
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

export function formatDate(value) {
  if (!value) return '';
  const [y, m, d] = value.split('-');
  if (!d) return formatMonth(value);
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

export function formatPeriod(start, end) {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'atual'}`;
}

function currentMonth(today = new Date()) {
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
}

export function credentialStatus(item, today = new Date()) {
  if (item.validUntil) {
    const until = item.validUntil.slice(0, 7);
    if (until < currentMonth(today)) {
      return { key: 'expirada', label: `Validade encerrada em ${formatMonth(until)}` };
    }
    return { key: 'vigente', label: `Válida até ${formatMonth(until)}` };
  }
  if (item.type === 'certificacao' || item.type === 'acreditacao') return { key: 'vigente', label: 'Não expira' };
  return { key: 'concluida', label: 'Concluída' };
}

export const CREDENTIAL_TYPES = {
  certificacao: { label: 'Certificação', plural: 'Certificações', description: 'Exames profissionais com verificação pública.' },
  acreditacao: {
    label: 'Acreditação',
    plural: 'Acreditações',
    description: 'Credenciais da Databricks Academy com verificação pública.',
  },
  formacao: { label: 'Formação', plural: 'Formações e cursos', description: 'Trilhas concluídas, com certificado verificável pelo link do emissor.' },
  academica: { label: 'Formação acadêmica', plural: 'Formação acadêmica', description: 'Graduação tecnológica.' },
};

export const EVIDENCE = {
  documentado: { label: 'Documentado', description: 'Trabalho com registro técnico: código, testes ou documentação.' },
  experiencia: { label: 'Experiência', description: 'Atuação prática relatada, ainda sem caso público detalhado.' },
  complementar: { label: 'Complementar', description: 'Formação, estudo ou uso pontual.' },
};

export const PROJECT_TYPES = {
  proprio: 'Projeto próprio',
  freelance: 'Freelance',
  estudo: 'Estudo',
  conteudo: 'Conteúdo técnico',
};
