"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import NavRail from "@/components/NavRail";
import TabBar from "@/components/TabBar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import MethodSection from "@/components/MethodSection";
import ExperienceSection from "@/components/ExperienceSection";
import AboutSection from "@/components/AboutSection";
import InterviewsSection from "@/components/InterviewsSection";
import ContactSection from "@/components/ContactSection";
import CaseStudy from "@/components/CaseStudy";
import ChannelStatic from "@/components/ChannelStatic";
import { DICT, Lang } from "@/lib/content";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  "sec-hero",
  "sec-services",
  "sec-work",
  "sec-method",
  "sec-exp",
  "sec-interviews",
  "sec-contact",
];

const TAB_SECTIONS = ["sec-hero", "sec-work", "sec-method", "sec-contact"];
const TAB_NAV_INDEX = [0, 2, 3, 6];

export default function Home() {
  const [lang, setLang] = useState<Lang>("es");
  const [navIndex, setNavIndex] = useState(0);
  const [view, setView] = useState<string>("home"); // "home" or project slug
  const [isMobile, setIsMobile] = useState(false);
  const [chStatic, setChStatic] = useState(false);
  const [chLabel, setChLabel] = useState("");
  const homeScrollRef = useRef(0);
  const spyRafRef = useRef<number | null>(null);
  const chTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Transición "cambio de canal": estática breve y el swap ocurre bajo el ruido.
  const switchChannel = useCallback((label: string, fn: () => void) => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      fn();
      return;
    }
    chTimersRef.current.forEach(clearTimeout);
    chTimersRef.current = [];
    setChLabel(label);
    setChStatic(true);
    chTimersRef.current.push(setTimeout(fn, 160));
    chTimersRef.current.push(setTimeout(() => setChStatic(false), 430));
  }, []);

  useEffect(() => {
    const timers = chTimersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  // Hydrate lang from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("isma_lang") as Lang | null;
      if (stored === "en" || stored === "es") setLang(stored);
    } catch {}
  }, []);

  // Mobile detection
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Document title
  useEffect(() => {
    const t = DICT[lang];
    document.title = t.meta.title;
    document.documentElement.lang = lang;
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", t.meta.description);
  }, [lang]);

  // Scroll spy
  useEffect(() => {
    if (view !== "home") return;
    const onScroll = () => {
      if (spyRafRef.current) return;
      spyRafRef.current = requestAnimationFrame(() => {
        spyRafRef.current = null;
        const y = window.scrollY + 220;
        let idx = 0;
        SECTIONS.forEach((id, i) => {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= y) idx = i;
        });
        setNavIndex(idx);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [view]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 18;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  const goSection = useCallback(
    (id: string) => {
      if (view !== "home") {
        setView("home");
        setTimeout(() => scrollToSection(id), 80);
      } else {
        scrollToSection(id);
      }
    },
    [view, scrollToSection]
  );

  const handleNavSelect = useCallback(
    (index: number, sectionId: string) => {
      setNavIndex(index);
      goSection(sectionId);
    },
    [goSection]
  );

  const handleTabSelect = useCallback(
    (sectionId: string) => {
      const i = TAB_SECTIONS.indexOf(sectionId);
      if (i >= 0) setNavIndex(TAB_NAV_INDEX[i]);
      goSection(sectionId);
    },
    [goSection]
  );

  const openCase = useCallback(
    (slug: string) => {
      const t = DICT[lang];
      const i = t.projects.findIndex((p) => p.slug === slug);
      const ch = String(i + 2).padStart(2, "0");
      const title = (t.projects[i]?.title || slug).toUpperCase();
      switchChannel(`CH ${ch} — ${title}`, () => {
        homeScrollRef.current = window.scrollY;
        setView(slug);
        window.scrollTo(0, 0);
      });
    },
    [lang, switchChannel]
  );

  const goHome = useCallback(() => {
    const y = homeScrollRef.current;
    switchChannel("CH 01 — SHOWRUNNER OS", () => {
      setView("home");
      setTimeout(() => window.scrollTo(0, y), 40);
    });
  }, [switchChannel]);

  const nextCase = useCallback(() => {
    const t = DICT[lang];
    const i = t.projects.findIndex((p) => p.slug === view);
    const next = t.projects[(i + 1) % t.projects.length];
    const ch = String(((i + 1) % t.projects.length) + 2).padStart(2, "0");
    switchChannel(`CH ${ch} — ${next.title.toUpperCase()}`, () => {
      setView(next.slug);
      window.scrollTo(0, 0);
    });
  }, [lang, view, switchChannel]);

  const setLangAndStore = (l: Lang) => {
    setLang(l);
    try { localStorage.setItem("isma_lang", l); } catch {}
  };

  const caseOpen = view !== "home";
  const tabActive = caseOpen
    ? 1
    : navIndex === 0 || navIndex === 1
    ? 0
    : navIndex === 2
    ? 1
    : navIndex <= 4
    ? 2
    : navIndex === 5
    ? 3
    : 2;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--surface-app)", fontFamily: "var(--font-sans)", color: "var(--text-primary)" }}>

      {/* Transición cambio de canal */}
      <ChannelStatic active={chStatic} label={chLabel} />

      {/* Sidebar */}
      {!isMobile && (
        <NavRail lang={lang} activeIndex={navIndex} onSelect={handleNavSelect} />
      )}

      {/* Main */}
      <main
        id="main-content"
        className="main-content os-canvas"
        style={{
          flex: 1,
          minWidth: 0,
          position: "relative",
          backgroundSize: "32px 32px",
          overflowX: "hidden",
        }}
      >
        {/* Desktop Language toggle */}
        {!isMobile && (
          <div className="lang-toggle">
            <button
              id="lang-es"
              className="lang-btn"
              onClick={() => setLangAndStore("es")}
              style={{
                background: lang === "es" ? "var(--blue-600)" : "transparent",
                color: lang === "es" ? "#fff" : "var(--text-secondary)",
              }}
            >
              ES
            </button>
            <button
              id="lang-en"
              className="lang-btn"
              onClick={() => setLangAndStore("en")}
              style={{
                background: lang === "en" ? "var(--blue-600)" : "transparent",
                color: lang === "en" ? "#fff" : "var(--text-secondary)",
              }}
            >
              EN
            </button>
          </div>
        )}

        {/* Mobile Header */}
        {isMobile && (
          <header
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderBottom: "1px solid var(--border-hairline)",
              background: "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              position: "sticky",
              top: 0,
              zIndex: 50,
              cursor: "pointer",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: 8 }}
              onClick={() => {
                if (caseOpen) {
                  goHome();
                } else {
                  goSection("sec-hero");
                }
              }}
            >
              <Image src="/logo-mark.svg" width={22} height={22} alt="Showrunner OS" />
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, color: "var(--blue-600)", letterSpacing: "0.02em" }}>
                  ISMAEL LARRAÍN
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.05em", textTransform: "uppercase", marginTop: -2 }}>
                  SHOWRUNNER OS
                </div>
              </div>
            </div>

            {/* Integrated Lang Toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: 2, background: "var(--surface-sunken)", border: "1px solid var(--border-hairline)", borderRadius: 999, padding: 2 }}>
              <button
                onClick={() => setLangAndStore("es")}
                style={{
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 999,
                  padding: "4px 8px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 9,
                  letterSpacing: "0.06em",
                  background: lang === "es" ? "var(--blue-600)" : "transparent",
                  color: lang === "es" ? "#fff" : "var(--text-secondary)",
                }}
              >
                ES
              </button>
              <button
                onClick={() => setLangAndStore("en")}
                style={{
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 999,
                  padding: "4px 8px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 9,
                  letterSpacing: "0.06em",
                  background: lang === "en" ? "var(--blue-600)" : "transparent",
                  color: lang === "en" ? "#fff" : "var(--text-secondary)",
                }}
              >
                EN
              </button>
            </div>
          </header>
        )}

        {/* Registration marks */}
        {!caseOpen && (
          <>
            <span
              aria-hidden
              style={{
                position: "fixed",
                left: "40%",
                top: 540,
                color: "var(--blue-500)",
                fontFamily: "var(--font-mono)",
                fontSize: 14,
                pointerEvents: "none",
                userSelect: "none",
                animation: "float 6s ease-in-out infinite",
                zIndex: 1,
              }}
            >
              ✦
            </span>
            <span
              aria-hidden
              style={{
                position: "fixed",
                right: "8%",
                top: 350,
                color: "var(--blue-400)",
                fontFamily: "var(--font-mono)",
                fontSize: 15,
                pointerEvents: "none",
                userSelect: "none",
                animation: "float 8s ease-in-out infinite 1s",
                zIndex: 1,
              }}
            >
              +
            </span>
          </>
        )}

        {/* HOME VIEW */}
        {!caseOpen && (
          <div
            style={{
              position: "relative",
              maxWidth: 1180,
              margin: "0 auto",
              padding: "clamp(24px,4vw,48px) clamp(20px,4vw,56px) 0",
              animation: "osIn 0.42s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            {/* Grid label */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 16,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "var(--blue-600)",
                marginBottom: 36,
              }}
            >
              <span style={{ marginRight: 120 }}>1440 PX — GRID SYSTEM</span>
            </div>

            <HeroSection
              lang={lang}
              onGoWork={() => goSection("sec-work")}
              onGoContact={() => goSection("sec-contact")}
              onOpenTelemira={() => openCase("telemira")}
            />

            <ServicesSection lang={lang} />

            <WorkSection lang={lang} onOpenProject={openCase} />

            <MethodSection lang={lang} />

            <ExperienceSection lang={lang} />

            <InterviewsSection lang={lang} />

            <AboutSection lang={lang} />

            <ContactSection lang={lang} />

            {/* Footer */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 10,
                marginTop: 90,
                paddingBottom: 44,
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                color: "var(--blue-600)",
              }}
            >
              <span>● VERSION 1.0.0</span>
              <span style={{ color: "var(--text-muted)" }}>
                {DICT[lang].footer.copyright}
              </span>
              <span>SHOWRUNNER OS — ISMAEL LARRAÍN</span>
            </div>
            {isMobile && <div style={{ height: 84 }} />}
          </div>
        )}

        {/* CASE STUDY VIEW */}
        {caseOpen && (
          <CaseStudy
            slug={view}
            lang={lang}
            onBack={goHome}
            onNext={nextCase}
            onGoContact={() => { goHome(); setTimeout(() => scrollToSection("sec-contact"), 120); }}
            onOpenProject={openCase}
          />
        )}
      </main>

      {/* Mobile Tab Bar */}
      {isMobile && (
        <TabBar
          lang={lang}
          activeIndex={tabActive}
          onSelect={handleTabSelect}
        />
      )}
    </div>
  );
}
