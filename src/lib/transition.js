import { flushSync } from 'react-dom';

// Runs a state update inside a View Transition when supported and motion is allowed.
export function withTransition(update) {
  const paused = document.documentElement.dataset.motion === 'paused';
  if (!document.startViewTransition || paused) {
    update();
    return;
  }
  document.startViewTransition(() => flushSync(update));
}

// Roving-focus keyboard support for tablists (arrows, Home, End).
export function tabKeyHandler(index, count, select) {
  return (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = null;
    if (e.key in keys) next = (index + keys[e.key] + count) % count;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = count - 1;
    if (next === null) return;
    e.preventDefault();
    select(next);
    const list = e.currentTarget.closest('[role="tablist"]');
    list?.querySelectorAll('[role="tab"]')[next]?.focus();
  };
}
