"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang, DICT } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function MethodSection({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const ref = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(ref);

    // Desktop: la sección se fija y las etapas se "encienden" con el scroll
    mm.add(
      "(min-width: 861px) and (prefers-reduced-motion: no-preference)",
      () => {
        const cards = ref.current?.querySelectorAll<HTMLElement>(".method-card");
        if (!cards || cards.length === 0) return;
        gsap.set(cards, { opacity: 0.22 });
        if (fillRef.current) gsap.set(fillRef.current, { scaleX: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 16%",
            end: "+=130%",
            scrub: 0.35,
            pin: true,
            anticipatePin: 1,
            onUpdate: (st) => {
              if (pctRef.current) {
                const p = String(Math.round(st.progress * 100)).padStart(2, "0");
                pctRef.current.textContent = `SCRUB ${p}%`;
              }
            },
          },
        });

        if (fillRef.current) {
          tl.to(fillRef.current, { scaleX: 1, ease: "none", duration: 5 }, 0);
        }
        cards.forEach((c, i) => {
          tl.to(c, { opacity: 1, duration: 0.7, ease: "power2.out" }, i + 0.15);
          const num = c.querySelector(".method-num");
          if (num) {
            tl.fromTo(
              num,
              { scale: 1 },
              { scale: 1.18, yoyo: true, repeat: 1, duration: 0.18, ease: "power1.inOut" },
              i + 0.25
            );
          }
        });
      }
    );

    // Mobile o reduced-motion: reveal simple sin pin
    mm.add(
      "(max-width: 860px), (prefers-reduced-motion: reduce)",
      () => {
        const cards = ref.current?.querySelectorAll<HTMLElement>(".method-card");
        if (!cards || cards.length === 0) return;
        if (fillRef.current) gsap.set(fillRef.current, { scaleX: 1 });
        gsap.from(cards, {
          opacity: 0,
          y: 28,
          duration: 0.5,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        });
      }
    );

    return () => mm.revert();
  }, [lang]);

  return (
    <section
      id="sec-method"
      ref={ref}
      data-section="sec-method"
      style={{ marginTop: 110 }}
    >
      <div className="section-label">{t.method.label}</div>
      <h2 className="section-heading">{t.method.title}</h2>
      <p
        style={{
          margin: "18px 0 0",
          maxWidth: 640,
          fontFamily: "var(--font-sans)",
          fontSize: 17,
          lineHeight: 1.55,
          color: "var(--text-secondary)",
        }}
      >
        {t.method.intro}
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 30 }}>
        <div
          style={{
            flex: 1,
            height: 2,
            background: "var(--border-hairline)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            ref={fillRef}
            style={{
              height: "100%",
              width: "100%",
              background: "var(--blue-600)",
              transformOrigin: "left center",
              transform: "scaleX(0)",
            }}
          />
        </div>
        <span
          ref={pctRef}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--blue-600)",
            minWidth: 84,
            textAlign: "right",
          }}
        >
          SCRUB 00%
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))",
          gap: 14,
          marginTop: 22,
        }}
      >
        {t.method.stages.map((st, i) => (
          <div
            key={i}
            id={`method-stage-${i}`}
            className="method-card"
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-card)",
              padding: 20,
              transition:
                "transform 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 240ms cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform =
                "translateY(-4px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "var(--shadow-md)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "";
              (e.currentTarget as HTMLDivElement).style.boxShadow =
                "var(--shadow-card)";
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <span
                className="method-num"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 24,
                  color: "var(--blue-600)",
                  display: "inline-block",
                }}
              >
                {st.num}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--gray-300)",
                }}
              >
                {i < t.method.stages.length - 1 ? "→" : "✓"}
              </span>
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-display)",
              }}
            >
              {st.name}
            </div>
            <p
              style={{
                margin: "8px 0 0",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                lineHeight: 1.5,
                color: "var(--text-secondary)",
              }}
            >
              {st.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
