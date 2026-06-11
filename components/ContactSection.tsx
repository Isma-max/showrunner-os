"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import OSWindow from "./OSWindow";
import { Lang, DICT, LINKEDIN, EMAIL, WHATSAPP } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const windowEl = ref.current?.querySelector(".os-window");
      if (!windowEl) return;
      gsap.from(windowEl, {
        opacity: 0,
        y: 36,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="sec-contact"
      ref={ref}
      data-section="sec-contact"
      style={{ marginTop: 120 }}
    >
      <div className="section-label">{t.contact.label}</div>
      <h2
        style={{
          margin: "14px 0 0",
          maxWidth: 820,
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(30px, 4.4vw, 56px)",
          lineHeight: 1.02,
          letterSpacing: "-0.01em",
          color: "var(--text-display)",
        }}
      >
        {t.contact.headline}
      </h2>
      <OSWindow
        title={t.contact.windowTitle}
        icon={
          <Image src="/logo-mark.svg" width={18} height={18} alt="" />
        }
        float
        style={{ marginTop: 36, maxWidth: 720, padding: 28 }}
      >
        <div style={{ padding: "28px 28px 32px" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--text-primary)",
            }}
          >
            {t.contact.support}
          </p>
          {/* Meta facts */}
          <div className="meta-row" style={{ marginTop: 18 }}>
            {t.contact.facts.map((f, i) => (
              <div key={i} className="meta-row-item">
                <span className="meta-row-label">{f.label}</span>
                {f.value === EMAIL ? (
                  <a
                    href={`mailto:${EMAIL}`}
                    className="meta-row-value"
                    style={{ color: "var(--blue-600)", textDecoration: "none" }}
                  >
                    {f.value}
                  </a>
                ) : (
                  <span className="meta-row-value">{f.value}</span>
                )}
              </div>
            ))}
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}
          >
            <a
              id="contact-whatsapp-btn"
              href={`${WHATSAPP}?text=${encodeURIComponent(t.contact.waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {t.contact.ctaPrimary}
              <span style={{ fontFamily: "var(--font-mono)" }}>↗</span>
            </a>
            <a
              id="contact-linkedin-btn"
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              {t.contact.ctaSecondary}
            </a>
          </div>
        </div>
      </OSWindow>
    </section>
  );
}
