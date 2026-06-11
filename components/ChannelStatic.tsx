"use client";
import { useEffect, useRef } from "react";

/**
 * Estática de TV para la transición "cambio de canal".
 * Ruido blanco en canvas (baja resolución, escalado pixelado = barato y retro),
 * scanlines, una línea de desgarro vertical y label de canal estilo OSD.
 * Se mantiene montado; `active` controla visibilidad y el loop de dibujo.
 */
export default function ChannelStatic({
  active,
  label,
}: {
  active: boolean;
  label?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!active) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    const W = 160;
    const H = 90;
    canvas.width = W;
    canvas.height = H;

    const img = ctx.createImageData(W, H);
    const d = img.data;

    const draw = () => {
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [active]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        background: "#0A0C12",
        opacity: active ? 1 : 0,
        visibility: active ? "visible" : "hidden",
        transition: "opacity 110ms ease, visibility 110ms ease",
      }}
    >
      {/* Ruido blanco */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          imageRendering: "pixelated",
          opacity: 0.92,
        }}
      />
      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.32) 0px, rgba(0,0,0,0.32) 1px, transparent 1px, transparent 3px)",
        }}
      />
      {/* Línea de desgarro vertical */}
      {active && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: 26,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.55) 45%, rgba(120,160,255,0.5) 55%, transparent 100%)",
            mixBlendMode: "screen",
            animation: "chTear 0.38s linear infinite",
          }}
        />
      )}
      {/* Viñeta CRT */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Label OSD del canal */}
      {label && active && (
        <div
          style={{
            position: "absolute",
            top: "clamp(16px, 4vw, 36px)",
            left: "clamp(16px, 4vw, 36px)",
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(14px, 2vw, 20px)",
            letterSpacing: "0.18em",
            color: "#B7FF5C",
            textShadow: "0 0 8px rgba(183,255,92,0.8), 2px 0 0 rgba(255,60,60,0.5), -2px 0 0 rgba(60,120,255,0.5)",
            animation: "chFlicker 0.32s steps(2) infinite",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
