"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang, DICT } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function ExperienceSection({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = ref.current?.querySelectorAll<HTMLElement>(".exp-row");
      if (!rows) return;
      gsap.from(rows, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="sec-exp"
      ref={ref}
      data-section="sec-exp"
      style={{ marginTop: 110 }}
    >
      <div className="section-label">{t.exp.label}</div>
      <h2 className="section-heading">{t.exp.title}</h2>
      <div style={{ marginTop: 24, maxWidth: 860 }}>
        {t.exp.items.map((x, i) => (
          <div
            key={i}
            className="exp-row"
            style={{
              display: "grid",
              gridTemplateColumns: "56px 1fr",
              gap: 12,
              padding: "24px 0",
              borderBottom: "1px dashed var(--border-default)",
              alignItems: "start",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: "0.1em",
                color: "var(--blue-600)",
                paddingTop: 4,
              }}
            >
              {x.num}
            </span>
            <div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: "-0.01em",
                  color: "var(--text-primary)",
                }}
              >
                {x.org}
              </h3>
              {x.meta && (
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    letterSpacing: "0.04em",
                    color: "var(--text-muted)",
                  }}
                >
                  {x.meta}
                </div>
              )}
              <p
                style={{
                  margin: "7px 0 0",
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  lineHeight: 1.55,
                  color: "var(--text-secondary)",
                  maxWidth: 640,
                }}
              >
                {x.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
