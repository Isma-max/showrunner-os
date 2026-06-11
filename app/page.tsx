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
import SiteSticker from "@/components/SiteSticker";
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
  const homeScrollRef = useRef(0);
  const spyRafRef = useRef<number | null>(null);

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
      homeScrollRef.current = window.scrollY;
      setView(slug);
      window.scrollTo(0, 0);
    },
    []
  );

  const goHome = useCallback(() => {
    const y = homeScrollRef.current;
    setView("home");
    setTimeout(() => window.scrollTo(0, y), 40);
  }, []);

  const nextCase = useCallback(() => {
    const t = DICT[lang];
    const i = t.projects.findIndex((p) => p.slug === view);
    const next = t.projects[(i + 1) % t.projects.length];
    setView(next.slug);
    window.scrollTo(0, 0);
  }, [lang, view]);

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

            {/* === STICKER LAYER: Escaped Mirai Lab creatures === */}

            {/* Hero stickers */}
            <div style={{ position: "relative" }}>
              <HeroSection
                lang={lang}
                onGoWork={() => goSection("sec-work")}
                onGoContact={() => goSection("sec-contact")}
                onOpenTelemira={() => openCase("telemira")}
              />
              {/* punk-girl-1: escaping from the top-right, partially clipped */}
              <SiteSticker
                src="/iconografia-stickers/punk-girl-1.png"
                size={88}
                rotation={-8}
                floatDelay={0.3}
                floatSpeed={7}
                mobileHide
                style={{
                  top: 20,
                  right: -22,
                  "--float-dur": "7s",
                  "--float-delay": "0.3s",
                } as React.CSSProperties}
              />
              {/* sticker-stars: small accent near section bottom-left */}
              <SiteSticker
                src="/iconografia-stickers/sticker-stars.png"
                size={52}
                rotation={18}
                floatDelay={1.8}
                floatSpeed={9}
                mobileHide
                style={{
                  bottom: -10,
                  left: -18,
                  opacity: 0.72,
                  "--float-dur": "9s",
                  "--float-delay": "1.8s",
                } as React.CSSProperties}
              />
            </div>

            {/* Services section stickers */}
            <div style={{ position: "relative" }}>
              <ServicesSection lang={lang} />
              {/* pastilla-alada: top-right, entering from the edge */}
              <SiteSticker
                src="/iconografia-stickers/pastilla-alada.png"
                size={68}
                rotation={22}
                floatDelay={0.6}
                floatSpeed={8}
                mobileHide
                className="site-sticker-alt"
                style={{
                  top: -24,
                  right: -18,
                  "--float-dur": "8s",
                  "--float-delay": "0.6s",
                } as React.CSSProperties}
              />
            </div>

            {/* Work section stickers */}
            <div style={{ position: "relative" }}>
              <WorkSection lang={lang} onOpenProject={openCase} />
              {/* sticker-flower: left edge, medium size */}
              <SiteSticker
                src="/iconografia-stickers/sticker-flower.png"
                size={58}
                rotation={-20}
                floatDelay={1.1}
                floatSpeed={10}
                mobileHide
                style={{
                  top: 140,
                  left: -22,
                  "--float-dur": "10s",
                  "--float-delay": "1.1s",
                } as React.CSSProperties}
              />
              {/* corazon-roto: bottom-right of the work grid, peeking in */}
              <SiteSticker
                src="/iconografia-stickers/corazon-roto.png"
                size={62}
                rotation={12}
                floatDelay={2.4}
                floatSpeed={7.5}
                mobileHide
                className="site-sticker-alt"
                style={{
                  bottom: -16,
                  right: -14,
                  "--float-dur": "7.5s",
                  "--float-delay": "2.4s",
                } as React.CSSProperties}
              />
            </div>

            {/* Method section stickers */}
            <div style={{ position: "relative" }}>
              <MethodSection lang={lang} />
              {/* sticker-eye: left edge, small detail */}
              <SiteSticker
                src="/iconografia-stickers/sticker-eye.png"
                size={48}
                rotation={-14}
                floatDelay={0.9}
                floatSpeed={8.5}
                mobileHide
                style={{
                  top: 100,
                  left: -16,
                  opacity: 0.8,
                  "--float-dur": "8.5s",
                  "--float-delay": "0.9s",
                } as React.CSSProperties}
              />
            </div>

            {/* Experience section stickers */}
            <div style={{ position: "relative" }}>
              <ExperienceSection lang={lang} />
              {/* cafe-gloria: right side, small secret */}
              <SiteSticker
                src="/iconografia-stickers/cafe-gloria.png"
                size={44}
                rotation={25}
                floatDelay={1.5}
                floatSpeed={11}
                mobileHide
                className="site-sticker-alt"
                style={{
                  top: 50,
                  right: -12,
                  opacity: 0.75,
                  "--float-dur": "11s",
                  "--float-delay": "1.5s",
                } as React.CSSProperties}
              />
            </div>

            {/* Interviews section stickers */}
            <div style={{ position: "relative" }}>
              <InterviewsSection lang={lang} />
              {/* punk-girl-2: left edge, bigger, entering the frame */}
              <SiteSticker
                src="/iconografia-stickers/punk-girl-2.png"
                size={82}
                rotation={-7}
                floatDelay={0.4}
                floatSpeed={9}
                mobileHide
                style={{
                  top: 80,
                  left: -28,
                  "--float-dur": "9s",
                  "--float-delay": "0.4s",
                } as React.CSSProperties}
              />
            </div>

            <AboutSection lang={lang} />

            {/* Contact section stickers */}
            <div style={{ position: "relative" }}>
              <ContactSection lang={lang} />
              {/* sticker-stars: bottom-right, exiting the layout */}
              <SiteSticker
                src="/iconografia-stickers/sticker-stars.png"
                size={55}
                rotation={8}
                floatDelay={2.1}
                floatSpeed={8}
                mobileHide
                className="site-sticker-alt"
                style={{
                  bottom: 40,
                  right: -18,
                  opacity: 0.65,
                  "--float-dur": "8s",
                  "--float-delay": "2.1s",
                } as React.CSSProperties}
              />
            </div>

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
