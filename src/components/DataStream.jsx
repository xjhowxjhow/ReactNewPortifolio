// Synthetic records that illustrate an integration run; not real data.
const LINES = [
  ['p', '{'],
  ['s', '  "origem": "erp",'],
  ['s', '  "entidade": "cadastro",'],
  ['s', '  "operacao": "upsert",'],
  ['n', '  "lote": 12,'],
  ['n', '  "registros": 500,'],
  ['s', '  "estado": "stage → master",'],
  ['n', '  "http": 200,'],
  ['k', '  "valido": true'],
  ['p', '},'],
  ['p', '{'],
  ['s', '  "origem": "hcm",'],
  ['s', '  "protocolo": "odata",'],
  ['s', '  "filtro": "$filter=modificado gt ontem",'],
  ['n', '  "pagina": 3,'],
  ['k', '  "proxima": true'],
  ['p', '},'],
  ['p', '{'],
  ['s', '  "destino": "api",'],
  ['s', '  "metodo": "PATCH",'],
  ['n', '  "concorrencia": 4,'],
  ['n', '  "timeout_s": 30,'],
  ['s', '  "resposta": "validada"'],
  ['p', '},'],
  ['p', '{'],
  ['s', '  "agente": "diagnostico",'],
  ['s', '  "ferramenta": "mcp",'],
  ['s', '  "acao": "consultar execucao",'],
  ['k', '  "aprovado_por_humano": true'],
  ['p', '}'],
];

export default function DataStream() {
  const lines = [...LINES, ...LINES];
  return (
    <figure className="stream" aria-label="Registros trafegando em uma integração">
      <div className="stream__bar" aria-hidden="true">
        <i />
        <span>stream · integração</span>
        <span>json</span>
      </div>
      <div className="stream__window" aria-hidden="true">
        <div className="stream__lines">
          {lines.map(([t, v], i) => (
            <code key={i} className={`tok-${t}`}>
              {v}
            </code>
          ))}
        </div>
      </div>
    </figure>
  );
}
