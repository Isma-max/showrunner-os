"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import MediaAbstract from "./MediaAbstract";
import { Lang, DICT } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  lang: Lang;
  onGoWork: () => void;
  onGoContact: () => void;
  onOpenTelemira: () => void;
}

export default function HeroSection({
  lang,
  onGoWork,
  onGoContact,
  onOpenTelemira,
}: HeroSectionProps) {
  const t = DICT[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const leadRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(eyebrowRef.current, { opacity: 0, y: 16, duration: 0.5 })
        .from(h1Ref.current, { opacity: 0, y: 28, duration: 0.7 }, "-=0.2")
        .from(leadRef.current, { opacity: 0, y: 18, duration: 0.5 }, "-=0.3")
        .from(ctaRef.current, { opacity: 0, y: 14, duration: 0.45 }, "-=0.2")
        .from(
          rightRef.current,
          { opacity: 0, x: 24, duration: 0.6 },
          "-=0.55"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="sec-hero"
      ref={sectionRef}
      data-section="sec-hero"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 48,
        alignItems: "flex-start",
      }}
    >
      {/* Left */}
      <div style={{ flex: "1 1 480px", minWidth: 0 }}>
        <div
          ref={eyebrowRef}
          style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px 16px" }}
        >
          <div className="section-label" style={{ fontSize: 12 }}>
            {t.hero.eyebrow}
          </div>
          <button
            onClick={onGoContact}
            id="hero-available-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(24,169,87,0.35)",
              background: "rgba(24,169,87,0.07)",
              color: "var(--status-done)",
              borderRadius: 999,
              padding: "6px 13px 6px 11px",
              cursor: "pointer",
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "background 140ms ease",
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "rgba(24,169,87,0.14)")
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "rgba(24,169,87,0.07)")
            }
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "var(--status-done)",
                animation: "osPulse 2.4s ease-out infinite",
                display: "block",
              }}
            />
            {t.hero.available}
          </button>
        </div>

        <h1
          ref={h1Ref}
          style={{
            margin: "18px 0 0",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(40px, 6.6vw, 88px)",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            color: "var(--text-display)",
          }}
        >
          {t.hero.h1a}
          <br />
          {t.hero.h1b}
          <span style={{ color: "var(--blue-600)" }}>_</span>
        </h1>

        <p
          ref={leadRef}
          style={{
            margin: "24px 0 0",
            maxWidth: 560,
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(17px, 2vw, 20px)",
            lineHeight: 1.5,
            color: "var(--text-primary)",
            fontWeight: 500,
          }}
        >
          {t.hero.lead}
        </p>
        <p
          style={{
            margin: "14px 0 0",
            maxWidth: 580,
            fontFamily: "var(--font-sans)",
            fontSize: 16,
            lineHeight: 1.55,
            color: "var(--text-secondary)",
          }}
        >
          {t.hero.sub}
        </p>

        <div
          ref={ctaRef}
          style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}
        >
          <button
            id="hero-cta-work"
            className="btn btn-primary"
            onClick={onGoWork}
          >
            {t.hero.ctaPrimary}
            <span style={{ fontFamily: "var(--font-mono)" }}>↗</span>
          </button>
          <button
            id="hero-cta-contact"
            className="btn btn-secondary"
            onClick={onGoContact}
          >
            {t.hero.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Right */}
      <div
        ref={rightRef}
        style={{
          flex: "1 1 320px",
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          paddingTop: 44,
        }}
      >
        {/* Now in production card */}
        <div
          id="hero-now-card"
          onClick={onOpenTelemira}
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border-hairline)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-window)",
            overflow: "hidden",
            cursor: "pointer",
            maxWidth: 380,
            transition:
              "transform 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 240ms cubic-bezier(0.22,1,0.36,1)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.transform =
              "translateY(-4px)";
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "var(--shadow-float)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.transform = "";
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "var(--shadow-window)";
          }}
        >
          <div
            style={{ position: "relative", height: 128, overflow: "hidden" }}
          >
            <Image
              src="/projects/telemira/telemira-1.png"
              alt="Telemira"
              fill
              style={{ objectFit: "cover", objectPosition: "center 8%" }}
              sizes="380px"
              priority
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "var(--bg-dots)",
                backgroundSize: "11px 11px",
                opacity: 0.25,
                pointerEvents: "none",
              }}
            />
          </div>
          <div style={{ padding: "16px 18px 18px" }}>
            <div className="section-label" style={{ fontSize: 11 }}>
              {t.hero.nowLabel}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                marginTop: 10,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: 17,
                    color: "var(--text-primary)",
                  }}
                >
                  {t.hero.nowTitle}
                </div>
                <div
                  style={{
                    marginTop: 3,
                    fontFamily: "var(--font-sans)",
                    fontSize: 13.5,
                    color: "var(--text-secondary)",
                  }}
                >
                  {t.hero.nowDesc}
                </div>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--blue-600)",
                  flexShrink: 0,
                }}
              >
                {t.hero.nowCta} →
              </span>
            </div>
          </div>
        </div>

        {/* Folder shortcuts */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            maxWidth: 380,
          }}
        >
          {t.folders.map((f, i) => (
            <div
              key={i}
              id={`hero-folder-${i}`}
              onClick={() => {
                const el = document.getElementById(f.target);
                if (el) {
                  const top =
                    el.getBoundingClientRect().top + window.scrollY - 18;
                  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "var(--surface-card)",
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-card)",
                padding: "10px 16px 10px 12px",
                cursor: "pointer",
                transition:
                  "transform 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 240ms cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-2px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "var(--shadow-md)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "var(--shadow-card)";
              }}
            >
              <Image
                src="/folder-icon.png"
                alt=""
                width={42}
                height={36}
                style={{
                  objectFit: "contain",
                  flexShrink: 0,
                  filter: "drop-shadow(0 4px 8px rgba(30,71,240,0.22))",
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 14.5,
                    color: "var(--text-primary)",
                  }}
                >
                  {f.label}
                </div>
                <div
                  style={{
                    marginTop: 2,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11.5,
                    letterSpacing: "0.03em",
                    color: "var(--text-muted)",
                  }}
                >
                  {f.sub}
                </div>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: "var(--blue-600)",
                  flexShrink: 0,
                }}
              >
                ↗
              </span>
            </div>
          ))}
        </div>

        {/* Featured Interview Cards */}
        {t.interviews && t.interviews.map((iv, idx) => (
          <div
            key={idx}
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-window)",
              padding: "18px 20px 20px",
              maxWidth: 380,
              display: "flex",
              flexDirection: "column",
              gap: 10,
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Header label */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--blue-600)" }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-600)" }}>
                {iv.label}
              </span>
            </div>
            
            {/* Info */}
            <div style={{ marginTop: 2 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "var(--text-primary)", lineHeight: 1.25 }}>
                {iv.medium}
              </div>
              <p style={{ margin: "8px 0 0", fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.5, color: "var(--text-secondary)" }}>
                {iv.desc}
              </p>
            </div>

            {/* Action */}
            <div style={{ marginTop: 4 }}>
              <a
                href={iv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  padding: "6px 14px",
                  fontSize: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                {iv.cta}
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
