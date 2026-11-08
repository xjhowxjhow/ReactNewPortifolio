import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotion } from '../lib/motion.jsx';
import { useInView } from '../lib/reveal.js';
import StaticArchitecture from './StaticArchitecture.jsx';

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

function isLowPower() {
  const nav = navigator;
  return (
    (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) ||
    (nav.deviceMemory && nav.deviceMemory <= 4) ||
    nav.connection?.saveData === true ||
    window.matchMedia('(max-width: 700px)').matches
  );
}

export default function SceneCanvas({ stage }) {
  const { paused } = useMotion();
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const hudRef = useRef(null);
  const apiRef = useRef(null);
  const [status, setStatus] = useState(() => (hasWebGL() ? 'loading' : 'fallback'));
  const pausedRef = useRef(paused);
  const stageRef = useRef(stage);
  const activeRef = useRef(true);

  useEffect(() => {
    if (!hasWebGL()) return undefined;
    let cancelled = false;
    const canvas = canvasRef.current;
    const onLost = (e) => {
      e.preventDefault();
      apiRef.current?.dispose();
      apiRef.current = null;
      setStatus('fallback');
    };
    canvas.addEventListener('webglcontextlost', onLost);

    // The scene module is loaded after first paint so the copy is usable immediately.
    const load = () =>
      import('../scene/architectureScene.js')
        .then(({ createArchitectureScene }) => {
          if (cancelled) return;
          const api = createArchitectureScene(canvas, { lowPower: isLowPower(), hud: hudRef.current });
          apiRef.current = api;
          api.setStage(stageRef.current);
          api.setPaused(pausedRef.current);
          api.setActive(activeRef.current);
          api.onFirstFrame(() => !cancelled && setStatus('ready'));
        })
        .catch(() => !cancelled && setStatus('fallback'));

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(load, { timeout: 1200 })
      : window.setTimeout(load, 250);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      canvas.removeEventListener('webglcontextlost', onLost);
      apiRef.current?.dispose();
      apiRef.current = null;
    };
  }, []);

  useEffect(() => {
    stageRef.current = stage;
    apiRef.current?.setStage(stage);
  }, [stage]);

  useEffect(() => {
    pausedRef.current = paused;
    apiRef.current?.setPaused(paused);
  }, [paused]);

  const onVisible = useCallback((visible) => {
    activeRef.current = visible;
    apiRef.current?.setActive(visible);
  }, []);
  useInView(wrapRef, onVisible);

  return (
    <div ref={wrapRef} className={`scene scene--${status}`}>
      <StaticArchitecture stage={stage} />
      <canvas ref={canvasRef} className="scene__canvas" />
      <div ref={hudRef} className="scene-hud" data-on={status === 'ready' && stage >= 0} aria-hidden="true">
        <span key={stage} className="scene-hud__frame">
          <i />
          <i />
          <i />
          <i />
          <span className="scene-hud__cross" />
        </span>
        <span className="scene-hud__tag mono">
          <b data-zoom>1.0×</b>
          zoom
        </span>
      </div>
    </div>
  );
}
