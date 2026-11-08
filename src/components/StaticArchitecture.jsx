const CX = 380;
const LAYERS = [
  { y: 390, color: '#4fd8eb' },
  { y: 320, color: '#5b8cff' },
  { y: 250, color: '#4fd8eb' },
  { y: 180, color: '#b4a2ff' },
];

function slab(cx, y, w = 150, d = 74, t = 14) {
  const top = `M${cx} ${y - d} L${cx + w} ${y} L${cx} ${y + d} L${cx - w} ${y} Z`;
  const left = `M${cx - w} ${y} L${cx} ${y + d} L${cx} ${y + d + t} L${cx - w} ${y + t} Z`;
  const right = `M${cx + w} ${y} L${cx} ${y + d} L${cx} ${y + d + t} L${cx + w} ${y + t} Z`;
  return { top, left, right };
}

function box(x, y, s = 22) {
  return slab(x, y, s, s * 0.5, s * 0.7);
}

const SOURCES = [
  [88, 330],
  [118, 372],
  [82, 414],
  [126, 452],
  [92, 494],
  [142, 300],
];
const DESTS = [
  [660, 214],
  [690, 262],
  [652, 306],
  [684, 352],
];
const AGENTS = [
  [300, 72],
  [390, 52],
  [474, 78],
];

export default function StaticArchitecture({ stage = -1 }) {
  return (
    <svg className="static-arch" data-stage={stage} viewBox="0 0 760 560" role="presentation" focusable="false">
      <defs>
        <radialGradient id="sa-pool" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4fd8eb" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#4fd8eb" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sa-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1d2c42" />
          <stop offset="100%" stopColor="#111c2b" />
        </linearGradient>
      </defs>
      <ellipse cx={CX} cy={470} rx={330} ry={90} fill="url(#sa-pool)" />

      <g className="g f-in" fill="none" stroke="#4fd8eb" strokeWidth="1.2" opacity="0.7">
        {SOURCES.map(([x, y], i) => (
          <path key={i} d={`M${x + 22} ${y} C ${x + 120} ${y}, ${CX - 220} ${LAYERS[0].y}, ${CX - 120} ${LAYERS[0].y + 6}`} />
        ))}
      </g>
      <g className="g f-out" fill="none" stroke="#5b8cff" strokeWidth="1.2" opacity="0.7">
        {DESTS.map(([x, y], i) => (
          <path key={i} d={`M${CX + 120} ${LAYERS[2].y + 6} C ${CX + 220} ${LAYERS[2].y}, ${x - 110} ${y}, ${x - 22} ${y}`} />
        ))}
      </g>
      <g className="g f-ai" fill="none" stroke="#b4a2ff" strokeWidth="1.2" opacity="0.7">
        {AGENTS.map(([x, y], i) => (
          <path key={i} d={`M${CX - 40 + i * 40} ${LAYERS[3].y - 40} C ${CX - 40 + i * 40} ${LAYERS[3].y - 90}, ${x} ${y + 70}, ${x} ${y + 18}`} />
        ))}
      </g>

      {LAYERS.map((l, i) => {
        const s = slab(CX, l.y);
        return (
          <g key={i} className={`g g-l${i}`}>
            <path d={s.left} fill="#0c1520" stroke={l.color} strokeOpacity="0.35" />
            <path d={s.right} fill="#0a121b" stroke={l.color} strokeOpacity="0.35" />
            <path d={s.top} fill="url(#sa-top)" fillOpacity="0.92" stroke={l.color} strokeOpacity="0.75" />
            {[-60, 0, 60].map((dx) => (
              <path key={dx} d={`M${CX + dx - 26} ${l.y - dx * 0.25} l26 -13 l26 13 l-26 13 z`} fill={l.color} fillOpacity="0.16" stroke={l.color} strokeOpacity="0.5" />
            ))}
          </g>
        );
      })}

      <g className="g g-sources">
        {SOURCES.map(([x, y], i) => {
          const b = box(x, y);
          return (
            <g key={i}>
              <path d={b.left} fill="#1a2533" />
              <path d={b.right} fill="#141d29" />
              <path d={b.top} fill="#3a4a5f" stroke="#4fd8eb" strokeOpacity="0.6" />
            </g>
          );
        })}
      </g>
      <g className="g g-dest">
        {DESTS.map(([x, y], i) => {
          const b = box(x, y);
          return (
            <g key={i}>
              <path d={b.left} fill="#1a2533" />
              <path d={b.right} fill="#141d29" />
              <path d={b.top} fill="#34466a" stroke="#5b8cff" strokeOpacity="0.7" />
            </g>
          );
        })}
      </g>
      <g className="g g-agents">
        {AGENTS.map(([x, y], i) => (
          <polygon
            key={i}
            points={`${x},${y - 18} ${x + 16},${y - 9} ${x + 16},${y + 9} ${x},${y + 18} ${x - 16},${y + 9} ${x - 16},${y - 9}`}
            fill="#2a2350"
            stroke="#b4a2ff"
            strokeOpacity="0.85"
          />
        ))}
      </g>
    </svg>
  );
}
