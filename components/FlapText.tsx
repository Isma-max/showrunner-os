"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const FLAP = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ·×—/→%";

/**
 * Efecto split-flap (tablero de aeropuerto / continuidad de TV):
 * cada carácter es un rodillo vertical que gira en pasos discretos
 * hasta cuajar en el carácter final, con stagger de izquierda a derecha.
 *
 * SSR-safe: el markup inicial ya muestra el texto final (transform inline),
 * así que sin JS o con prefers-reduced-motion se ve el texto correcto.
 * Las secuencias de giro son deterministas (sin Math.random en render)
 * para evitar mismatch de hidratación.
 */
export default function FlapText({ text }: { text: string }) {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const strips = Array.from(root.querySelectorAll<HTMLElement>(".flap-strip"));
    if (strips.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        strips.forEach((s, i) => {
          const steps = Number(s.dataset.steps || 0);
          if (!steps) return;
          const finalY = (-100 * steps) / (steps + 1);
          gsap.fromTo(
            s,
            { yPercent: 0 },
            {
              yPercent: finalY,
              duration: 0.5 + steps * 0.03,
              delay: i * 0.05,
              ease: `steps(${steps})`,
              overwrite: true,
            }
          );
        });
      },
      { threshold: 0.6 }
    );
    obs.observe(root);
    return () => obs.disconnect();
  }, [text]);

  return (
    <span ref={rootRef} style={{ display: "inline-flex" }} aria-label={text}>
      {Array.from(text).map((ch, i) => {
        if (ch === " ") {
          return <span key={i} aria-hidden style={{ width: "0.55ch" }} />;
        }
        // Secuencia determinista de giro (4 a 8 pasos según posición)
        const steps = 4 + ((i * 7) % 5);
        const seq: string[] = [];
        for (let k = 0; k < steps; k++) {
          seq.push(FLAP[(i * 13 + k * 5) % FLAP.length]);
        }
        seq.push(ch);
        const finalY = (-100 * steps) / (steps + 1);
        return (
          <span
            key={i}
            aria-hidden
            style={{
              display: "inline-block",
              overflow: "hidden",
              height: "1.25em",
              lineHeight: "1.25em",
              verticalAlign: "bottom",
            }}
          >
            <span
              className="flap-strip"
              data-steps={steps}
              style={{
                display: "block",
                transform: `translateY(${finalY}%)`,
              }}
            >
              {seq.map((c, k) => (
                <span
                  key={k}
                  style={{ display: "block", height: "1.25em", lineHeight: "1.25em" }}
                >
                  {c}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
