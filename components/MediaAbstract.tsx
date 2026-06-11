"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

type MediaKind = "cube" | "wave" | "grid" | "bars";

export default function MediaAbstract({
  kind,
  big = false,
}: {
  kind: MediaKind;
  big?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const s = big ? 1.6 : 1;

  useEffect(() => {
    if (!ref.current) return;
    const shapes = ref.current.querySelectorAll<HTMLElement>(".shape");
    if (kind === "cube") {
      gsap.to(shapes[0], {
        y: -8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(shapes[1], {
        y: 6,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.6,
      });
    }
    if (kind === "wave") {
      gsap.to(shapes[0], {
        backgroundPositionX: "+=18px",
        duration: 4,
        repeat: -1,
        ease: "none",
      });
    }
    if (kind === "grid") {
      gsap.to(shapes[0], {
        rotation: 3,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
    if (kind === "bars") {
      shapes.forEach((sh, i) => {
        gsap.to(sh, {
          scaleY: 0.85 + Math.random() * 0.3,
          duration: 1.2 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.15,
          transformOrigin: "bottom center",
        });
      });
    }
  }, [kind]);

  if (kind === "cube") {
    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--grad-blue-soft)",
          overflow: "hidden",
        }}
      >
        <div
          className="shape"
          style={{
            position: "absolute",
            left: "20%",
            top: "26%",
            width: 68 * s,
            height: 68 * s,
            background: "var(--blue-600)",
            boxShadow: "var(--shadow-blue)",
          }}
        />
        <div
          className="shape"
          style={{
            position: "absolute",
            right: "18%",
            bottom: "20%",
            width: 24 * s,
            height: 24 * s,
            background: "var(--ink-900)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "var(--bg-dots)",
            backgroundSize: "11px 11px",
            opacity: 0.5,
          }}
        />
      </div>
    );
  }

  if (kind === "wave") {
    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg,#F4F7FF,#E6EEFF)",
          overflow: "hidden",
        }}
      >
        <div
          className="shape"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(var(--blue-500) 1.4px, transparent 1.4px)",
            backgroundSize: "9px 9px",
            WebkitMaskImage:
              "radial-gradient(120% 80% at 60% 90%, #000 30%, transparent 70%)",
            maskImage:
              "radial-gradient(120% 80% at 60% 90%, #000 30%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "12%",
            top: "18%",
            width: 38 * s,
            height: 38 * s,
            background: "var(--blue-200)",
            borderRadius: 4,
          }}
        />
      </div>
    );
  }

  if (kind === "grid") {
    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--grad-paper)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "var(--bg-grid-faint)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          className="shape"
          style={{
            position: "absolute",
            left: "24%",
            top: "30%",
            width: 58 * s,
            height: 58 * s,
            background: "var(--blue-600)",
            boxShadow: "var(--shadow-blue-soft)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "44%",
            top: "48%",
            width: 58 * s,
            height: 58 * s,
            border: "1.5px dashed var(--blue-400)",
            background: "rgba(255,255,255,0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "20%",
            top: "24%",
            width: 14 * s,
            height: 14 * s,
            background: "var(--ink-900)",
          }}
        />
      </div>
    );
  }

  // bars
  const hs = [0.22, 0.38, 0.3, 0.52, 0.66, 0.86];
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        background: "var(--grad-blue-soft)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "14%",
          right: "14%",
          bottom: "16%",
          top: "18%",
          display: "flex",
          alignItems: "flex-end",
          gap: 10 * s,
        }}
      >
        {hs.map((h, i) => (
          <div
            key={i}
            className="shape"
            style={{
              flex: 1,
              height: h * 100 + "%",
              background:
                i === hs.length - 1
                  ? "var(--blue-600)"
                  : i % 2
                  ? "var(--blue-300)"
                  : "var(--blue-200)",
              boxShadow:
                i === hs.length - 1 ? "var(--shadow-blue-soft)" : "none",
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "var(--bg-dots)",
          backgroundSize: "11px 11px",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
