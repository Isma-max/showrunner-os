"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import MediaAbstract from "./MediaAbstract";
import OSWindow from "./OSWindow";
import DecodeText from "./DecodeText";
import { Lang, DICT, Project, LINKEDIN, EMAIL } from "@/lib/content";
import { Award } from "lucide-react";

interface CaseStudyProps {
  slug: string;
  lang: Lang;
  onBack: () => void;
  onNext: () => void;
  onGoContact: () => void;
  onOpenProject: (slug: string) => void;
}

export default function CaseStudy({
  slug,
  lang,
  onBack,
  onNext,
  onGoContact,
  onOpenProject,
}: CaseStudyProps) {
  const t = DICT[lang];
  const project = t.projects.find((p: Project) => p.slug === slug) ?? t.projects[0];
  const ref = useRef<HTMLDivElement>(null);
  const idx = t.projects.findIndex((p: Project) => p.slug === slug);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return;
      gsap.from(ref.current, {
        opacity: 0,
        y: 18,
        duration: 0.5,
        ease: "power3.out",
      });
    }, ref);
    window.scrollTo(0, 0);
    return () => ctx.revert();
  }, [slug]);

  const related = t.projects.filter((p: Project) => p.slug !== slug);
  const status = project.inProgress ? t.statusProgress : t.statusDone;
  const statusColor = project.inProgress
    ? "var(--status-progress)"
    : "var(--status-done)";
  const casePath =
    lang === "es" ? "PROYECTO DESTACADO" : "FEATURED PROJECT";

  return (
    <div ref={ref} style={{ maxWidth: 1060, margin: "0 auto", padding: "clamp(24px,4vw,48px) clamp(20px,4vw,56px) 0", paddingBottom: 44 }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
        <button className="btn btn-ghost" onClick={onBack} id="case-back-btn" style={{ fontSize: 14 }}>
          {t.ui.back}
        </button>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--blue-600)" }}>
          <DecodeText key={slug} text={casePath} startOnView={false} duration={600} />
        </span>
      </div>

      <OSWindow
        title={project.title}
        crumb={project.crumb}
        icon={<Image src="/logo-mark.svg" width={18} height={18} alt="" />}
        float
        onClose={onBack}
      >
        {/* Hero split */}
        <div style={{ display: "flex", flexWrap: "wrap", borderBottom: "1px solid var(--border-hairline)" }}>
          <div style={{ flex: "1 1 440px", minHeight: 300, position: "relative", overflow: "hidden" }}>
            {project.slug === "telemira" ? (
              <Image
                src="/projects/telemira/luis-mario.png"
                alt={project.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 860px) 100vw, 500px"
                priority
              />
            ) : ["wbd", "duoc", "prisa", "panamericanos"].includes(project.slug) ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: project.slug === "prisa" ? "var(--ink-900)" : project.slug === "panamericanos" ? "#ffffff" : "var(--surface-sunken)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: project.slug === "panamericanos" ? "32px" : "48px",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image
                    src={project.slug === "panamericanos" ? `/projects/${project.slug}/logo.png` : `/projects/${project.slug}/logo.svg`}
                    alt={project.title}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 860px) 100vw, 500px"
                    priority
                  />
                </div>
              </div>
            ) : (
              <Image
                src={`/projects/${project.slug}/placeholder.png`}
                alt={project.title}
                fill
                style={{
                  objectFit: project.slug === "mirai-media" ? "contain" : "cover",
                  objectPosition: "center",
                  background: project.slug === "mirai-media" ? "var(--ink-900)" : undefined,
                }}
                sizes="(max-width: 860px) 100vw, 500px"
                priority
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
          </div>
          <div style={{ flex: "1 1 280px", padding: 24, borderLeft: "1px solid var(--border-hairline)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 9, height: 9, borderRadius: 999, background: statusColor, display: "block" }} />
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: statusColor }}>
                {status}
              </span>
            </div>
            <div style={{ marginTop: 14, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue-600)" }}>
              {project.descriptor}
            </div>
            <div className="meta-row" style={{ marginTop: 14 }}>
              <div className="meta-row-item">
                <span className="meta-row-label">{t.ui.client}</span>
                <span className="meta-row-value">{project.client}</span>
              </div>
              <div className="meta-row-item">
                <span className="meta-row-label">{t.ui.status}</span>
                <span className="meta-row-value" style={{ color: statusColor }}>{status}</span>
              </div>
            </div>
            <div style={{ marginTop: 16, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              {t.ui.role}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
              {project.role.split(" / ").map((r: string, i: number) => (
                <span key={i} className="tag tag-neutral">{r}</span>
              ))}
            </div>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: 20, display: "inline-flex" }}
              >
                {project.cta} ↗
              </a>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "clamp(20px,3vw,32px)" }}>
          <p style={{ margin: 0, maxWidth: 760, fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.6, color: "var(--text-primary)" }}>
            {project.overview}
          </p>

          {/* Videos */}
          {project.videos && project.videos.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-600)" }}>
                  {lang === "es" ? "En emisión" : "On air"}
                </span>
                <span style={{ width: 7, height: 7, borderRadius: 999, background: "#FF3B30", animation: "osPulse 1.6s ease-out infinite", display: "block" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px,100%),1fr))", gap: 16, marginTop: 14 }}>
                {project.videos.map((v, i) => (
                  <figure key={v.id} style={{ margin: 0 }}>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "16 / 9",
                        background: "#0A0C12",
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        border: "1px solid var(--border-hairline)",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1${v.start ? `&start=${v.start}` : ""}`}
                        title={v.label}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                      />
                    </div>
                    <figcaption
                      style={{
                        marginTop: 8,
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.06em",
                        color: "var(--text-muted)",
                      }}
                    >
                      [ VIDEO_{(i + 1 < 10 ? "0" : "") + (i + 1)} ] {v.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}

          {/* Challenge / Solution */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px,100%),1fr))", gap: 16, marginTop: 28 }}>
            {[
              { label: t.ui.challenge, text: project.challenge },
              { label: t.ui.solution, text: project.solution },
            ].map(({ label, text }, i) => (
              <div key={i} style={{ background: "var(--surface-sunken)", borderRadius: "var(--radius-md)", padding: 22 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-600)" }}>
                  {label}
                </div>
                <p style={{ margin: "12px 0 0", fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.55, color: "var(--text-primary)" }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Process */}
          <div style={{ marginTop: 36 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-600)" }}>
              {t.ui.process}
            </div>
            <div style={{ marginTop: 8, maxWidth: 760 }}>
              {project.process.map((ps: string, i: number) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 12, padding: "13px 0", borderBottom: "1px dashed var(--border-default)", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--blue-600)" }}>
                    {(i + 1 < 10 ? "0" : "") + (i + 1)}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.5, color: "var(--text-primary)" }}>
                    {ps}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key points */}
          {project.keyPoints && project.keyPoints.length > 0 && (
            <div style={{ marginTop: 36 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-600)" }}>
                {t.ui.keyPoints}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(230px,100%),1fr))", gap: 12, marginTop: 14 }}>
                {project.keyPoints.map((kp: string, i: number) => (
                  <div key={i} style={{ background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-card)", padding: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--blue-600)", flexShrink: 0, marginTop: 6, display: "block" }} />
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.5, color: "var(--text-primary)" }}>{kp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outcome */}
          <div style={{ marginTop: 36, background: "var(--blue-50)", border: "1px solid var(--blue-200)", borderRadius: "var(--radius-lg)", padding: 24 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-600)" }}>
              {t.ui.outcome}
            </div>
            <p style={{ margin: "12px 0 0", maxWidth: 720, fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.6, color: "var(--text-primary)" }}>
              {project.outcome}
            </p>
          </div>

          {/* Assets */}
          {project.assets && project.assets.length > 0 && project.slug !== "duoc" && (
            <div style={{ marginTop: 36 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-600)" }}>
                {t.ui.assets}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--text-muted)" }}>
                {(project.slug === "telemira" || project.slug === "mirai-media" || project.slug === "wbd") ? (lang === "es" ? "ARCHIVOS REALES CARGADOS" : "REAL FILES LOADED") : t.ui.assetsHint}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px,100%),1fr))", gap: 16, marginTop: 14 }}>
              {project.assets.map((at: string, i: number) => {
                const isTelemira = project.slug === "telemira";
                const isMirai = project.slug === "mirai-media";
                const isWBD = project.slug === "wbd";

                if (isMirai) {
                  let stickerSrc = "";
                  let isRect = false;

                  if (i === 0) stickerSrc = "/iconografia-stickers/la-javi.png";
                  else if (i === 1) stickerSrc = "/iconografia-stickers/cafe-gloria.png";
                  else if (i === 2) stickerSrc = "/iconografia-stickers/corazon-roto.png";
                  else if (i === 3) stickerSrc = "/iconografia-stickers/pastilla-alada.png";
                  else if (i === 4) stickerSrc = "/iconografia-stickers/sticker-eye.png";
                  else if (i === 5) {
                    stickerSrc = "/projects/mirai-media/poster-1.png";
                    isRect = true;
                  }
                  else if (i === 6) {
                    stickerSrc = "/projects/mirai-media/poster-2.png";
                    isRect = true;
                  }

                  if (stickerSrc) {
                    return (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          height: isRect ? 240 : 200,
                          width: "100%",
                        }}
                      >
                        {isRect ? (
                          <div
                            style={{
                              position: "relative",
                              width: "100%",
                              height: "100%",
                              borderRadius: "var(--radius-md)",
                              overflow: "hidden",
                              boxShadow: "0 4px 12px rgba(10,12,18,0.12)",
                              border: "1px solid var(--border-hairline)",
                            }}
                          >
                            <Image
                              src={stickerSrc}
                              alt={at}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="(max-width: 860px) 100vw, 260px"
                            />
                          </div>
                        ) : (
                          <div
                            style={{
                              width: 155,
                              height: 155,
                              position: "relative",
                              transform: `rotate(${(i % 2 === 0 ? 3 : -3) + (i * 1.2)}deg)`,
                              filter: "drop-shadow(0 5px 10px rgba(10,12,18,0.1))",
                              transition: "transform 0.3s ease",
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLDivElement).style.transform = `scale(1.06) rotate(${(i % 2 === 0 ? 3 : -3) + (i * 1.2) + 2}deg)`;
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLDivElement).style.transform = `rotate(${(i % 2 === 0 ? 3 : -3) + (i * 1.2)}deg)`;
                            }}
                          >
                            <Image
                              src={stickerSrc}
                              alt={at}
                              fill
                              style={{ objectFit: "contain" }}
                              sizes="155px"
                            />
                          </div>
                        )}
                      </div>
                    );
                  }
                }

                if (isWBD) {
                  let logoUrl = "";
                  if (i === 0) logoUrl = "https://static-wbd-cdn.wbd.com/s3_assets/images/brands/2024-07/discovery-channel-logo-white.svg";
                  else if (i === 1) logoUrl = "https://static-wbd-cdn.wbd.com/s3_assets/images/brands/2024-08/wb-shieldonly-outline-ondark-allwhite-rgb_1.svg";
                  else if (i === 2) logoUrl = "https://static-wbd-cdn.wbd.com/s3_assets/images/brands/2025-07/hbo_max_logo_pure_white_rgb_052225.svg";
                  else if (i === 3) logoUrl = "https://static-wbd-cdn.wbd.com/s3_assets/images/brands/2024-07/cnn-logo-white.svg";
                  else if (i === 4) logoUrl = "https://static-wbd-cdn.wbd.com/s3_assets/images/brands/2024-07/cartoon-network-logo-white.svg";
                  else if (i === 5) logoUrl = "https://static-wbd-cdn.wbd.com/s3_assets/images/brands/2024-07/food-network-logo-white.svg";
                  else if (i === 6) logoUrl = "https://static-wbd-cdn.wbd.com/s3_assets/images/brands/2024-07/animal-planet-white-logo.svg";
                  else if (i === 7) logoUrl = "https://static-wbd-cdn.wbd.com/s3_assets/images/brands/2024-07/tlc-logo-white.svg";

                  if (logoUrl) {
                    return (
                      <div
                        key={i}
                        style={{
                          border: "1px solid var(--border-hairline)",
                          borderRadius: "var(--radius-md)",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          background: "var(--ink-900)",
                          transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                          cursor: "default",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--blue-400)";
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-md)";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLDivElement).style.transform = "";
                          (e.currentTarget as HTMLDivElement).style.borderColor = "";
                          (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            height: 120,
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 24,
                          }}
                        >
                          <div style={{ width: "100%", height: "100%", position: "relative" }}>
                            <img
                              src={logoUrl}
                              alt={at}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
                              }}
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            padding: "10px 14px",
                            fontFamily: "var(--font-sans)",
                            fontSize: 13,
                            fontWeight: 600,
                            borderTop: "1px solid var(--border-hairline)",
                            background: "var(--surface-sunken)",
                            color: "var(--text-primary)",
                            textAlign: "center",
                          }}
                        >
                          {at}
                        </div>
                      </div>
                    );
                  }
                }

                if (isTelemira) {
                  let imgPath = "";
                  let labelSuffix = "";

                  if (at === "Personajes" || at === "Characters") {
                    imgPath = "/projects/telemira/julieta.png";
                    labelSuffix = " (Julieta Mansilla)";
                  } else if (at === "Capturas del sitio" || at === "Website captures") {
                    imgPath = "/projects/telemira/luis-mario.png";
                    labelSuffix = " (Luis Mario Ep. 4)";
                  } else if (at === "Redes de personajes" || at === "Character social accounts") {
                    imgPath = "/projects/telemira/chimpansexy.png";
                    labelSuffix = " (Chimpansexy)";
                  } else if (at === "Identidad de marca" || at === "Brand identity") {
                    imgPath = "/projects/telemira/telemira-1.png";
                  } else if (at === "Estética de transmisión" || at === "Broadcast aesthetic") {
                    imgPath = "/projects/telemira/telemira-2.png";
                  }

                  if (imgPath) {
                    return (
                      <div key={i} style={{ border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-md)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                        <div style={{ position: "relative", height: 200, width: "100%" }}>
                          <Image
                            src={imgPath}
                            alt={at}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 860px) 100vw, 260px"
                          />
                        </div>
                        <div style={{ padding: "10px 14px", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, borderTop: "1px solid var(--border-hairline)", background: "var(--surface-sunken)", color: "var(--text-primary)" }}>
                          {at}{labelSuffix}
                        </div>
                      </div>
                    );
                  }
                }

                // Default placeholder for other projects
                return (
                  <div key={i} style={{ border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-md)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div style={{ position: "relative", height: 160, width: "100%", background: "var(--surface-sunken)" }}>
                      <Image
                        src={`/projects/${project.slug}/placeholder.png`}
                        alt={at}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 860px) 100vw, 260px"
                      />
                    </div>
                    <div style={{ padding: "10px 14px", fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, borderTop: "1px solid var(--border-hairline)", background: "var(--surface-sunken)", color: "var(--text-primary)" }}>{at}</div>
                  </div>
                );
              })}
            </div>
          </div>
          )}

          {/* Related */}
          <div style={{ marginTop: 36 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-600)" }}>
              {t.ui.related}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px,100%),1fr))", gap: 12, marginTop: 14 }}>
              {related.map((rc: Project) => (
                <div
                  key={rc.slug}
                  onClick={() => onOpenProject(rc.slug)}
                  style={{ background: "var(--surface-card)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-card)", padding: 18, cursor: "pointer", position: "relative", transition: "transform 240ms cubic-bezier(0.22,1,0.36,1), box-shadow 240ms cubic-bezier(0.22,1,0.36,1)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-md)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-card)"; }}
                >
                  <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--text-primary)", paddingRight: 22 }}>{rc.title}</div>
                  <div style={{ marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 11.5, letterSpacing: "0.03em", color: "var(--text-muted)" }}>{rc.descriptor}</div>
                  <span style={{ position: "absolute", top: 14, right: 14, fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--blue-600)" }}>↗</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36, paddingTop: 24, borderTop: "1px solid var(--border-hairline)" }}>
            <button id="case-contact-btn" className="btn btn-primary" onClick={onGoContact}>
              {project.cta} <span style={{ fontFamily: "var(--font-mono)" }}>↗</span>
            </button>
            <button id="case-next-btn" className="btn btn-secondary" onClick={onNext}>
              {t.ui.next}
            </button>
          </div>
        </div>
      </OSWindow>

      {/* Footer */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 10, marginTop: 60, paddingBottom: 44, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--blue-600)" }}>
        <span>● VERSION 1.1.0</span>
        <span>SHOWRUNNER OS — ISMAEL LARRAÍN</span>
      </div>
    </div>
  );
}
