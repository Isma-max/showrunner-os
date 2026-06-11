"use client";
import Image from "next/image";
import { House, Layers, Folder, Workflow, Clock, Tv, Mail } from "lucide-react";
import { Lang, DICT } from "@/lib/content";

const ICONS = [House, Layers, Folder, Workflow, Clock, Tv, Mail];

interface NavRailProps {
  lang: Lang;
  activeIndex: number;
  onSelect: (index: number, sectionId: string) => void;
}

const SECTIONS = [
  "sec-hero",
  "sec-services",
  "sec-work",
  "sec-method",
  "sec-exp",
  "sec-interviews",
  "sec-contact",
];

export default function NavRail({ lang, activeIndex, onSelect }: NavRailProps) {
  const t = DICT[lang];
  return (
    <nav
      className="nav-rail"
      style={{ position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}
      aria-label="Main navigation"
    >
      {/* Header */}
      <div className="nav-rail-header" style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-start", padding: "12px 12px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Image src="/logo-mark.svg" width={22} height={22} alt="Showrunner OS" />
          <span className="nav-rail-logo-text" style={{ fontSize: 11, letterSpacing: "0.06em", color: "var(--text-muted)", fontWeight: 500 }}>SHOWRUNNER OS</span>
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--blue-600)", fontFamily: "var(--font-display)", letterSpacing: "0.02em", marginTop: 4 }}>
          ISMAEL LARRAÍN
        </div>
      </div>

      {/* Nav items */}
      {t.nav.map((label, i) => {
        const Icon = ICONS[i];
        const active = i === activeIndex;
        return (
          <button
            key={i}
            id={`nav-item-${i}`}
            className={`nav-item ${active ? "nav-item-active" : ""}`}
            onClick={() => onSelect(i, SECTIONS[i])}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={18} strokeWidth={1.8} />
            {i === 2 ? (
              <span className="nav-projects-label">
                <span className="label-full">{lang === "es" ? "Proyectos destacados" : "Featured work"}</span>
                <span className="label-short">{label}</span>
              </span>
            ) : (
              <span>{label}</span>
            )}
          </button>
        );
      })}

      {/* Footer */}
      <div className="nav-rail-footer">
        <div className="nav-rail-user">
          <div className="nav-rail-avatar">IL</div>
          <div>
            <div className="nav-rail-username">Ismael Larraín</div>
            <div className="nav-rail-meta">{t.chrome.availability}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
