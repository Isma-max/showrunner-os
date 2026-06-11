"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang, DICT } from "@/lib/content";
import { Tv, ExternalLink, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function getYouTubeEmbedInfo(url: string) {
  let videoId = "";
  let start = 0;

  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.substring(1);
    } else if (urlObj.hostname.includes("youtube.com")) {
      videoId = urlObj.searchParams.get("v") || "";
    }

    const t = urlObj.searchParams.get("t");
    if (t) {
      const cleanT = t.replace("s", "");
      start = parseInt(cleanT, 10) || 0;
    }
  } catch (e) {
    console.error("Invalid URL", e);
  }

  return { videoId, start };
}

function VideoPlayer({ url, title }: { url: string; title: string }) {
  const { videoId, start } = getYouTubeEmbedInfo(url);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${start}&autoplay=1&rel=0`;

  if (isPlaying) {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--border-hairline)",
          background: "#000",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsPlaying(true)}
      className="video-thumbnail-container"
    >
      <img
        src={thumbnailUrl}
        alt={title}
        className="thumbnail-img"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }}
      />
      <div className="thumbnail-overlay" />
      <div className="play-btn-circle">
        <Play size={20} style={{ marginLeft: 3 }} />
      </div>
    </div>
  );
}

export default function InterviewsSection({ lang }: { lang: Lang }) {
  const t = DICT[lang];
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = ref.current?.querySelectorAll<HTMLElement>(".interview-card");
      if (!cards) return;
      gsap.from(cards, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      id="sec-interviews"
      ref={ref}
      data-section="sec-interviews"
      style={{ marginTop: 110 }}
    >
      <div className="section-label">{t.interviewsSection?.label || (lang === "es" ? "Entrevistas" : "Interviews")}</div>
      <h2 className="section-heading">{t.interviewsSection?.title || (lang === "es" ? "Entrevistas destacadas" : "Featured interviews")}</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
          gap: 20,
          marginTop: 28,
          maxWidth: 860,
        }}
      >
        {t.interviews.map((iv, i) => (
          <div
            key={i}
            className="interview-card"
            style={{
              background: "var(--surface-card)",
              border: "1px solid var(--border-hairline)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-window)",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1), border-color 240ms ease, box-shadow 240ms ease",
              cursor: "default",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLDivElement).style.borderColor = "var(--blue-400)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-float)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "";
              (e.currentTarget as HTMLDivElement).style.borderColor = "";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "";
            }}
          >
            {/* Header label */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Tv size={14} className="text-blue-500" style={{ color: "var(--blue-600)" }} />
                <span style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue-600)" }}>
                  {iv.label}
                </span>
              </div>
              <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>
                [ VIDEO_0{i + 1} ]
              </span>
            </div>

            {/* Video player embedded */}
            <VideoPlayer url={iv.url} title={iv.medium} />

            {/* Info */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: "-0.01em",
                  color: "var(--text-primary)",
                  lineHeight: 1.25,
                }}
              >
                {iv.medium}
              </h3>
              <p
                style={{
                  margin: "10px 0 0",
                  fontFamily: "var(--font-sans)",
                  fontSize: 14.5,
                  lineHeight: 1.5,
                  color: "var(--text-secondary)",
                }}
              >
                {iv.desc}
              </p>
            </div>

            {/* Action */}
            <div style={{ marginTop: 8 }}>
              <a
                href={iv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{
                  padding: "8px 16px",
                  fontSize: 13,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {iv.cta}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
