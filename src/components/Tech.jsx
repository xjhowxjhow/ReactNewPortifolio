import { techIcon } from '../lib/techIcons.js';
import './Tech.css';

export function TechIcon({ name, size = 18 }) {
  const icon = techIcon(name);
  if (!icon) return null;
  if (icon.kind === 'image') {
    return (
      <span className="tech-icon tech-icon--image" style={{ '--s': `${size}px` }} aria-hidden="true">
        <img src={icon.src} alt="" width={size} height={size} loading="lazy" decoding="async" />
      </span>
    );
  }
  const glyph = icon.kind === 'glyph';
  return (
    <span className={`tech-icon tech-icon--${icon.kind}`} style={{ '--c': icon.color, '--s': `${size}px` }} aria-hidden="true">
      <svg
        viewBox={icon.viewBox || '0 0 24 24'}
        fill={glyph ? 'none' : 'currentColor'}
        stroke={glyph ? 'currentColor' : 'none'}
        strokeWidth={glyph ? 1.7 : undefined}
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
      >
        <path d={icon.path} />
      </svg>
    </span>
  );
}

export function TechChips({ items, className = '' }) {
  return (
    <ul className={`chips ${className}`}>
      {items.map((s) => (
        <li key={s} className="chip chip--tech">
          <TechIcon name={s} size={14} />
          {s}
        </li>
      ))}
    </ul>
  );
}
