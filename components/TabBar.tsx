"use client";
import { House, Folder, Workflow, Mail } from "lucide-react";
import { Lang, DICT } from "@/lib/content";

const TAB_ICONS = [House, Folder, Workflow, Mail];
const TAB_SECTIONS = ["sec-hero", "sec-work", "sec-method", "sec-contact"];

interface TabBarProps {
  lang: Lang;
  activeIndex: number;
  onSelect: (sectionId: string) => void;
}

export default function TabBar({ lang, activeIndex, onSelect }: TabBarProps) {
  const t = DICT[lang];
  return (
    <nav
      className="tab-bar mobile-only"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 55,
      }}
      aria-label="Mobile navigation"
    >
      {t.tabs.map((label, i) => {
        const Icon = TAB_ICONS[i];
        const active = i === activeIndex;
        return (
          <button
            key={i}
            className={`tab-item ${active ? "tab-item-active" : ""}`}
            onClick={() => onSelect(TAB_SECTIONS[i])}
            aria-current={active ? "page" : undefined}
          >
            <Icon size={22} strokeWidth={active ? 2 : 1.8} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
