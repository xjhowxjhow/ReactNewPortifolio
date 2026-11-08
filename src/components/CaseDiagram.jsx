import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotion } from '../lib/motion.jsx';
import { useInView } from '../lib/reveal.js';
import { DIAGRAMS, NODE_H, NODE_W, VIEW_H, VIEW_W } from './diagrams.js';
import './CaseDiagram.css';

function edgePath(a, b) {
  const ax = a[3] + NODE_W / 2;
  const ay = a[4] + NODE_H / 2;
  const bx = b[3] + NODE_W / 2;
  const by = b[4] + NODE_H / 2;
  if (Math.abs(bx - ax) > Math.abs(by - ay)) {
    const dir = bx > ax ? 1 : -1;
    const x1 = ax + (dir * NODE_W) / 2;
    const x2 = bx - (dir * NODE_W) / 2;
    const mid = (x1 + x2) / 2;
    return `M${x1} ${ay} C ${mid} ${ay}, ${mid} ${by}, ${x2} ${by}`;
  }
  const dir = by > ay ? 1 : -1;
  const y1 = ay + (dir * NODE_H) / 2;
  const y2 = by - (dir * NODE_H) / 2;
  const mid = (y1 + y2) / 2;
  return `M${ax} ${y1} C ${ax} ${mid}, ${bx} ${mid}, ${bx} ${y2}`;
}

export default function CaseDiagram({ type, id }) {
  const def = DIAGRAMS[type];
  const svgRef = useRef(null);
  const { paused } = useMotion();
  const [visible, setVisible] = useState(false);
  const [drawn, setDrawn] = useState(false);

  const onView = useCallback((v) => {
    setVisible(v);
    if (v) setDrawn(true);
  }, []);
  useInView(svgRef, onView, { threshold: 0.25 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg?.pauseAnimations) return;
    if (paused || !visible) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [paused, visible]);

  if (!def) return null;
  const byId = Object.fromEntries(def.nodes.map((n) => [n[0], n]));
  const summary = def.edges.map(([a, b]) => `${byId[a][1]} → ${byId[b][1]}`).join('; ');

  return (
    <svg
      ref={svgRef}
      className={`case-diagram${drawn ? ' is-drawn' : ''}`}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={`Diagrama do fluxo: ${summary}.`}
    >
      <defs>
        <pattern id={`dots-${id}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="rgba(148,178,214,0.18)" />
        </pattern>
      </defs>
      <rect width={VIEW_W} height={VIEW_H} rx="14" fill={`url(#dots-${id})`} />
      {def.edges.map(([a, b], i) => {
        const pid = `${id}-e${i}`;
        return (
          <g key={pid} className={`edge edge--${byId[b][5]}`} style={{ '--i': i }}>
            <path id={pid} d={edgePath(byId[a], byId[b])} pathLength="1" />
            <circle r="3" className="pulse">
              <animateMotion dur={`${2.6 + (i % 3) * 0.4}s`} begin={`${i * 0.45}s`} repeatCount="indefinite">
                <mpath href={`#${pid}`} />
              </animateMotion>
            </circle>
          </g>
        );
      })}
      {def.nodes.map(([nid, label, sub, x, y, kind], i) => (
        <g key={nid} className={`node node--${kind}`} transform={`translate(${x} ${y})`} style={{ '--i': i }}>
          <rect width={NODE_W} height={NODE_H} rx="9" />
          <rect className="node__rail" width="3" height={NODE_H - 20} x="0" y="10" rx="1.5" />
          <text x="12" y="22" className="node__label">
            {label}
          </text>
          <text x="12" y="39" className="node__sub">
            {sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
