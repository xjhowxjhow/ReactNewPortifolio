// Node: [id, label, sublabel, x, y, kind]; kinds map to colors in CaseDiagram.css.
export const NODE_W = 122;
export const NODE_H = 52;
export const VIEW_W = 540;
export const VIEW_H = 290;

export const DIAGRAMS = {
  pipeline: {
    nodes: [
      ['src', 'ERPs e HCMs', 'sistemas de origem', 14, 48, 'source'],
      ['ext', 'EXTRACT', 'APIs e arquivos', 152, 48, 'process'],
      ['trf', 'TRANSFORM', 'regras de negócio', 290, 48, 'process'],
      ['stg', 'STAGE × MASTER', 'Delta MERGE', 404, 176, 'store'],
      ['load', 'LOAD', 'lotes + validação', 222, 176, 'api'],
      ['dst', 'Destino', 'sistema final', 40, 176, 'api'],
    ],
    edges: [
      ['src', 'ext'],
      ['ext', 'trf'],
      ['trf', 'stg'],
      ['stg', 'load'],
      ['load', 'dst'],
    ],
  },
  framework: {
    nodes: [
      ['int', 'Integrações', 'reutilizam', 209, 10, 'source'],
      ['lib', 'Biblioteca', 'Python · wheel', 209, 119, 'process'],
      ['map', 'Mapeamento', 'IDs persistentes', 14, 58, 'tool'],
      ['sql', 'Gravação SQL', 'parametrizada', 14, 182, 'tool'],
      ['ups', 'Upsert', 'Delta MERGE', 404, 58, 'store'],
      ['sftp', 'Conectores', 'SFTP e APIs', 404, 182, 'tool'],
      ['can', 'Sincronização', 'ausências', 209, 228, 'check'],
    ],
    edges: [
      ['map', 'lib'],
      ['sql', 'lib'],
      ['ups', 'lib'],
      ['sftp', 'lib'],
      ['can', 'lib'],
      ['lib', 'int'],
    ],
  },
  oracle: {
    nodes: [
      ['req', 'Solicitação', 'base e backup', 14, 48, 'source'],
      ['pre', 'Pré-verificação', 'backup · espaço', 152, 48, 'check'],
      ['ok', 'Aprovação', 'humana', 290, 48, 'agent'],
      ['lock', 'Trava', 'sem concorrência', 404, 176, 'check'],
      ['dp', 'SSH + Data Pump', 'execução remota', 222, 176, 'process'],
      ['aud', 'Auditoria', 'config preservada', 40, 176, 'store'],
    ],
    edges: [
      ['req', 'pre'],
      ['pre', 'ok'],
      ['ok', 'lock'],
      ['lock', 'dp'],
      ['dp', 'aud'],
    ],
  },
  agents: {
    nodes: [
      ['eng', 'Engenheiro', 'decide e aprova', 8, 119, 'source'],
      ['ctx', 'Contexto', 'instruções', 144, 14, 'tool'],
      ['agt', 'Agente', 'skills', 144, 119, 'agent'],
      ['mcp', 'MCP', 'ferramentas', 280, 119, 'agent'],
      ['ado', 'Azure DevOps', 'Boards · Wiki', 414, 30, 'tool'],
      ['dbx', 'Databricks', 'jobs · runs', 414, 119, 'tool'],
      ['doc', 'Documentação', 'técnica/funcional', 414, 208, 'tool'],
    ],
    edges: [
      ['eng', 'agt'],
      ['ctx', 'agt'],
      ['agt', 'mcp'],
      ['mcp', 'ado'],
      ['mcp', 'dbx'],
      ['agt', 'doc'],
    ],
  },
  bi: {
    nodes: [
      ['ora', 'Oracle', 'transacional', 14, 20, 'source'],
      ['ext', 'Extração', 'incremental', 209, 20, 'process'],
      ['brz', 'Bronze', 'dado bruto', 404, 20, 'store'],
      ['slv', 'Prata', 'limpo e tipado', 404, 119, 'store'],
      ['gld', 'Ouro', 'indicadores', 404, 218, 'store'],
      ['sem', 'Modelo semântico', 'único', 209, 218, 'process'],
      ['pbi', 'Power BI', 'toda a empresa', 14, 218, 'api'],
      ['ai', 'IA aplicada', 'análise e docs', 14, 119, 'agent'],
    ],
    edges: [
      ['ora', 'ext'],
      ['ext', 'brz'],
      ['brz', 'slv'],
      ['slv', 'gld'],
      ['gld', 'sem'],
      ['sem', 'pbi'],
      ['ai', 'pbi'],
    ],
  },
  observability: {
    nodes: [
      ['pipe', 'Pipelines', 'logs · métricas', 14, 20, 'source'],
      ['job', 'Jobs', 'execuções', 14, 119, 'source'],
      ['api', 'APIs', 'respostas', 14, 218, 'source'],
      ['col', 'Coleta', 'eventos correlacionados', 209, 119, 'process'],
      ['dd', 'Datadog', 'dashboards', 404, 20, 'tool'],
      ['alert', 'Alertas', 'antes do incidente', 404, 119, 'check'],
      ['aud', 'Auditoria', 'trilha por execução', 404, 218, 'store'],
    ],
    edges: [
      ['pipe', 'col'],
      ['job', 'col'],
      ['api', 'col'],
      ['col', 'dd'],
      ['col', 'alert'],
      ['col', 'aud'],
    ],
  },
};
