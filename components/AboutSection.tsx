"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Lang, DICT } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const ref = useRef<HTMLElement>(null);
  const [profileIdx, setProfileIdx] = useState(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = ref.current?.querySelectorAll<HTMLElement>(".about-col");
      if (!cols || cols.length < 2) return;
      const left = cols[0];
      const right = cols[1];
      gsap.from(left, {
        opacity: 0, x: -28, duration: 0.65, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      gsap.from(right, {
        opacity: 0, x: 28, duration: 0.65, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="sec-about"
      ref={ref}
      data-section="sec-about"
      style={{ marginTop: 110 }}
    >
      <div className="section-label">{t.about.label}</div>
      <h2 className="section-heading">{t.about.title}</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 44,
          marginTop: 32,
          alignItems: "flex-start",
        }}
      >
        {/* Left */}
        <div className="about-col" style={{ flex: "1 1 440px", minWidth: 0 }}>
          <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.6, color: "var(--text-primary)" }}>
            {t.about.p1}
          </p>
          <p style={{ margin: "16px 0 0", fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.6, color: "var(--text-secondary)" }}>
            {t.about.p2}
          </p>
          <p style={{ margin: "16px 0 0", fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.6, color: "var(--text-secondary)" }}>
            {t.about.p3}
          </p>
          {/* Meta facts */}
          <div className="meta-row" style={{ marginTop: 24, maxWidth: 480 }}>
            {t.about.facts.map((f, i) => (
              <div key={i} className="meta-row-item">
                <span className="meta-row-label">{f.label}</span>
                <span className="meta-row-value">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Portrait placeholder */}
        <div
          className="about-col"
          style={{ flex: "0 1 320px", minWidth: 260 }}
        >
          <div
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-card)",
              padding: 12,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 380,
                borderRadius: 10,
                background: "var(--surface-sunken)",
                backgroundImage: "var(--bg-grid-faint)",
                backgroundSize: "22px 22px",
                display: "block",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => setProfileIdx(prev => (prev === 4 ? 1 : prev + 1))}
              title="Click para cambiar de foto"
            >
              <Image
                src={`/profile-${profileIdx}.jpg`}
                alt="Ismael Larraín"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 860px) 100vw, 320px"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  background: "rgba(10,12,18,0.75)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 6,
                  padding: "4px 8px",
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  pointerEvents: "none",
                }}
              >
                {profileIdx} / 4 ✦ CLICK TO SWAP
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                padding: "12px 6px 4px",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.04em",
                color: "var(--text-muted)",
              }}
            >
              <span>{t.about.portraitCap}</span>
              <span style={{ color: "var(--blue-600)" }}>IMG_0{profileIdx}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
