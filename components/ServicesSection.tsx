"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang, DICT } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = ref.current?.querySelectorAll<HTMLElement>(".service-card");
      if (!cards) return;
      gsap.from(cards, {
        opacity: 0,
        y: 32,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="sec-services"
      ref={ref}
      data-section="sec-services"
      style={{ marginTop: 110 }}
    >
      <div className="section-label">{t.services.label}</div>
      <h2 className="section-heading">{t.services.title}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
          marginTop: 32,
        }}
      >
        {t.services.blocks.map((s, i) => (
          <div
            key={i}
            id={`service-card-${i}`}
            className="service-card"
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-card)",
              padding: 24,
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
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 13,
                letterSpacing: "0.14em",
                color: "var(--blue-600)",
              }}
            >
              {s.num}
            </div>
            <h3
              style={{
                margin: "14px 0 0",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 19,
                letterSpacing: "-0.01em",
                color: "var(--text-primary)",
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                margin: "10px 0 0",
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                lineHeight: 1.55,
                color: "var(--text-secondary)",
              }}
            >
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
