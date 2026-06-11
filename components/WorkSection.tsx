"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FolderOpen, Award } from "lucide-react";
import Image from "next/image";
import MediaAbstract from "./MediaAbstract";
import OSWindow from "./OSWindow";
import Sticker from "./Sticker";
import { Lang, DICT, Project } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

interface WorkSectionProps {
  lang: Lang;
  onOpenProject: (slug: string) => void;
}

export default function WorkSection({ lang, onOpenProject }: WorkSectionProps) {
  const t = DICT[lang];
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = ref.current?.querySelectorAll<HTMLElement>(".project-card");
      if (!cards) return;
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="sec-work"
      ref={ref}
      data-section="sec-work"
      style={{ marginTop: 110 }}
    >
      <div className="section-label">{t.work.label}</div>
      <h2 className="section-heading">{t.work.title}</h2>
      <OSWindow
        title={t.work.windowTitle}
        crumb={t.work.crumb}
        icon={<FolderOpen size={18} strokeWidth={1.8} />}
        style={{ marginTop: 32 }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(380px, 100%), 1fr))",
            gap: 18,
            padding: "24px 24px 32px",
          }}
        >
          {t.projects.map((p: Project) => (
            <ProjectCard
              key={p.slug}
              project={p}
              lang={lang}
              onOpen={() => onOpenProject(p.slug)}
            />
          ))}
        </div>
      </OSWindow>
    </section>
  );
}

function ProjectCard({
  project,
  lang,
  onOpen,
}: {
  project: Project;
  lang: Lang;
  onOpen: () => void;
}) {
  const t = DICT[lang];
  const status = project.inProgress ? t.statusProgress : t.statusDone;
  const statusColor = project.inProgress
    ? "var(--status-progress)"
    : "var(--status-done)";

  const handleClick = () => {
    onOpen();
  };

  if (project.slug === "mirai-media") {
    return (
      <article
        className="project-card mirai-card"
        id={`project-card-${project.slug}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === "Enter" && handleClick()}
        aria-label={project.title}
        style={{
          padding: 24,
          minHeight: 520,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Floating stickers for collage effect */}
        <Sticker
          src="/iconografia-stickers/sticker-eye.png"
          alt="Eye sticker"
          size={52}
          rotation={12}
          floatDelay={0}
          style={{ top: "14px", right: "20px", zIndex: 10 }}
        />
        <Sticker
          src="/iconografia-stickers/corazon-roto.png"
          alt="Corazón Roto"
          size={58}
          rotation={18}
          floatDelay={1.5}
          style={{ bottom: "80px", right: "16px", zIndex: 10 }}
        />
        <Sticker
          src="/iconografia-stickers/sticker-flower.png"
          alt="Flower sticker"
          size={48}
          rotation={-15}
          floatDelay={0.7}
          style={{ top: "45%", left: "-10px", zIndex: 10 }}
          className="mobile-hide"
        />
        <Sticker
          src="/iconografia-stickers/pastilla-alada.png"
          alt="Pastilla Alada"
          size={46}
          rotation={-10}
          floatDelay={2.2}
          style={{ bottom: "165px", right: "120px", zIndex: 10 }}
          className="mobile-hide"
        />

        {/* Header info */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: statusColor, display: "block" }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: statusColor }}>
              {status}
            </span>
            <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--blue-600)" }}>
              LAB. IA
            </span>
          </div>

          <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 22, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
            {project.title}
          </h3>
          <p style={{ margin: "6px 0 16px", fontFamily: "var(--font-sans)", fontSize: 13.5, lineHeight: 1.5, color: "var(--text-secondary)" }}>
            {project.descriptor}
          </p>
        </div>

        {/* Panels */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, zIndex: 5 }}>
          {/* Javi Panel (Main) */}
          <div className="mirai-javi-panel" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blue-600)", marginBottom: 4 }}>
                01. La Javi (Destacado)
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, lineHeight: 1.45, color: "var(--text-primary)" }}>
                {lang === "es"
                  ? "Universo de personaje, actitud y cultura pop construido desde IA, con estética propia y potencial transmedia."
                  : "Character universe, attitude, and pop culture built from AI, with its own aesthetic and transmedia potential."}
              </p>
            </div>
            <div style={{ width: 72, height: 72, position: "relative", flexShrink: 0 }} className="main-javi-visual">
              <Image
                src="/iconografia-stickers/la-javi.png"
                alt="La Javi character sticker"
                fill
                style={{ objectFit: "contain" }}
                sizes="72px"
              />
            </div>
          </div>

          {/* Gloria desde los 40 Panel (Secondary) */}
          <div className="mirai-gloria-panel" style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: 4 }}>
                02. Gloria desde los 40
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, lineHeight: 1.45, color: "var(--text-primary)" }}>
                {lang === "es"
                  ? "Conversación con Connie Achurra y Pati Leiva. Humor, vida adulta e IA aplicada al desarrollo visual."
                  : "Conversation show with Connie Achurra and Pati Leiva. Humor, adult life, and AI applied to visual development."}
              </p>
            </div>
            <div style={{ width: 60, height: 60, position: "relative", flexShrink: 0 }}>
              <Image
                src="/iconografia-stickers/cafe-gloria.png"
                alt="Café Gloria sticker"
                fill
                style={{ objectFit: "contain" }}
                sizes="60px"
              />
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, borderTop: "1px dashed var(--border-hairline)", paddingTop: 14, zIndex: 5 }}>
          <span className="tag tag-neutral" style={{ fontSize: 11 }}>IA Creative Lab</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--blue-600)", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
            {lang === "es" ? "Ver universo" : "Explore universe"} →
          </span>
        </div>
      </article>
    );
  }

  const isTelemira = project.slug === "telemira";
  const isPanam = project.slug === "panamericanos";
  const hasLogo = ["wbd", "duoc", "prisa"].includes(project.slug);

  let logoBg = "var(--surface-sunken)";
  let padding = "24px";
  if (project.slug === "prisa") {
    logoBg = "var(--ink-900)";
  } else if (project.slug === "duoc") {
    padding = "20px";
  }

  return (
    <article
      className="project-card"
      id={`project-card-${project.slug}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && handleClick()}
      aria-label={project.title}
    >
      {/* Media */}
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        {isTelemira ? (
          <Image
            src="/projects/telemira/telemira-2.png"
            alt={project.title}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center 8%", // Perfectly frames chimpanzee
            }}
            sizes="(max-width: 860px) 100vw, 380px"
          />
        ) : isPanam ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(140deg, #102166 0%, #0A0C12 100%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "18px 20px",
              color: "rgba(255,255,255,0.85)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {/* Top Row: Technical metadata */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9.5, opacity: 0.7, letterSpacing: "0.08em" }}>
              <span>CASE: PANAM-2023</span>
              <span>ESTADIO NACIONAL</span>
            </div>

            {/* Center: Running track blueprint + Medal icon */}
            <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", margin: "6px 0" }}>
              {/* Nested track lines */}
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 340 100">
                {/* Outermost lane */}
                <rect x="20" y="5" width="300" height="90" rx="45" ry="45" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                {/* Lane 2 */}
                <rect x="40" y="15" width="260" height="70" rx="35" ry="35" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Lane 3 */}
                <rect x="60" y="25" width="220" height="50" rx="25" ry="25" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                {/* Center line */}
                <line x1="170" y1="5" x2="170" y2="95" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              </svg>
              
              {/* Award Icon */}
              <div
                style={{
                  position: "relative",
                  width: 50,
                  height: 50,
                  borderRadius: 999,
                  background: "rgba(30,71,240,0.18)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(30,71,240,0.3)",
                  zIndex: 2,
                }}
              >
                <Award size={24} strokeWidth={1.8} style={{ color: "#B9CCFF" }} />
              </div>
            </div>

            {/* Bottom Row: Coordinates & Event Label */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 9, opacity: 0.65, letterSpacing: "0.05em" }}>
              <span>LAT. 33.4651° S / LON. 70.6106° W</span>
              <span>SANTIAGO, CL</span>
            </div>
          </div>
        ) : hasLogo ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: logoBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: padding,
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={`/projects/${project.slug}/logo.svg`}
                alt={`${project.title} logo`}
                fill
                style={{
                  objectFit: "contain",
                }}
                sizes="(max-width: 860px) 100vw, 380px"
              />
            </div>
          </div>
        ) : (
          <Image
            src={`/projects/${project.slug}/placeholder.png`}
            alt={project.title}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            sizes="(max-width: 860px) 100vw, 380px"
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "var(--bg-dots)",
            backgroundSize: "11px 11px",
            opacity: 0.2,
            pointerEvents: "none",
          }}
        />
        {project.featured && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              background: "var(--blue-600)",
              color: "var(--white)",
              fontFamily: "var(--font-display)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "3px 8px",
              borderRadius: "var(--radius-xs)",
            }}
          >
            {lang === "es" ? "Destacado" : "Featured"}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "18px 20px 20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: statusColor,
              display: "block",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: statusColor,
            }}
          >
            {status}
          </span>
          {project.externalUrl && (
            <span
              style={{
                marginLeft: "auto",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--blue-600)",
              }}
            >
              ↗ telemira.tv
            </span>
          )}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "-0.01em",
            color: "var(--text-primary)",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            margin: "7px 0 0",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--text-secondary)",
          }}
        >
          {project.descriptor}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            {project.role
              .split(" / ")
              .slice(0, 2)
              .map((r, i) => (
                <span key={i} className="tag tag-neutral">
                  {r}
                </span>
              ))}
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 16,
              color: "var(--blue-600)",
            }}
          >
            →
          </span>
        </div>
      </div>
    </article>
  );
}
