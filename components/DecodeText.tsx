"use client";
import { useEffect, useRef, useState, CSSProperties } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%/<>*+=—";

/**
 * Texto que aparece "decodificándose": caracteres aleatorios que se
 * resuelven de izquierda a derecha hasta formar el texto final, como
 * una señal sintonizándose. Respeta prefers-reduced-motion.
 */
export default function DecodeText({
  text,
  duration = 850,
  delay = 0,
  startOnView = true,
  className,
  style,
}: {
  text: string;
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const [display, setDisplay] = useState(text);
  const elRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    startedRef.current = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !text) {
      const id = requestAnimationFrame(() => setDisplay(text));
      return () => cancelAnimationFrame(id);
    }

    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let obs: IntersectionObserver | null = null;

    const run = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      timer = setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const lock = Math.floor(p * text.length);
          let out = "";
          for (let i = 0; i < text.length; i++) {
            const ch = text[i];
            if (i < lock || ch === " ") out += ch;
            else out += CHARSET[(Math.random() * CHARSET.length) | 0];
          }
          setDisplay(out);
          if (p < 1) raf = requestAnimationFrame(tick);
          else setDisplay(text);
        };
        raf = requestAnimationFrame(tick);
      }, delay);
    };

    if (startOnView && elRef.current) {
      obs = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            run();
            obs?.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(elRef.current);
    } else {
      run();
    }

    return () => {
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
      obs?.disconnect();
    };
  }, [text, duration, delay, startOnView]);

  return (
    <span ref={elRef} className={className} style={style}>
      {display}
    </span>
  );
}
