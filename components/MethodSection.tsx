"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang, DICT } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function MethodSection({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = ref.current?.querySelectorAll<HTMLElement>(".method-card");
      if (!cards) return;
      gsap.from(cards, {
        opacity: 0,
        y: 28,
        duration: 0.5,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);

    return () => ctx.revert();
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))",
          gap: 14,
          marginTop: 32,
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
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 24,
                  color: "var(--blue-600)",
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
