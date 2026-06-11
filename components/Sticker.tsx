"use client";
import Image from "next/image";
import React from "react";

interface StickerProps {
  src: string;
  alt?: string;
  size?: number | { xs?: number; sm?: number; md?: number; lg?: number };
  rotation?: number;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
  style?: React.CSSProperties;
  floatDelay?: number;
}

export default function Sticker({
  src,
  alt = "",
  size = 100,
  rotation = 0,
  className = "",
  priority = false,
  decorative = true,
  style = {},
  floatDelay = 0,
}: StickerProps) {
  // Resolve responsive sizes
  let width = 100;
  if (typeof size === "number") {
    width = size;
  } else {
    width = size.md || size.sm || size.xs || 100;
  }

  return (
    <div
      className={`sticker-container ${className}`}
      style={{
        position: "absolute",
        display: "inline-block",
        pointerEvents: "none",
        animationDelay: `${floatDelay}s`,
        // Custom CSS variables for keyframes and transition
        "--rot": `${rotation}deg`,
        ...style,
      } as React.CSSProperties}
    >
      <div
        className="sticker-image-wrapper"
        style={{
          position: "relative",
          width: width,
          height: "auto",
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Image
          src={src}
          alt={decorative ? "" : alt}
          aria-hidden={decorative ? "true" : undefined}
          width={width}
          height={width}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain",
          }}
          priority={priority}
          sizes={`${width}px`}
        />
      </div>
    </div>
  );
}
