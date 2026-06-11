"use client";
import Image from "next/image";
import React from "react";

export interface SiteStickerProps {
  src: string;
  alt?: string;
  size?: number;
  rotation?: number;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  floatDelay?: number;
  /** Duration in seconds for one float cycle. Default: 6 */
  floatSpeed?: number;
  /** If true, hidden on mobile screens (<= 860px) */
  mobileHide?: boolean;
}

export default function SiteSticker({
  src,
  alt = "",
  size = 80,
  rotation = 0,
  className = "",
  priority = false,
  style = {},
  floatDelay = 0,
  floatSpeed = 6,
  mobileHide = false,
}: SiteStickerProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        "site-sticker",
        mobileHide ? "mobile-hide" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        position: "absolute",
        display: "inline-block",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 2,
        animationDelay: `${floatDelay}s`,
        animationDuration: `${floatSpeed}s`,
        "--rot": `${rotation}deg`,
        ...style,
      } as React.CSSProperties}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{
          width: size,
          height: "auto",
          display: "block",
          objectFit: "contain",
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))",
        }}
        priority={priority}
        sizes={`${size}px`}
      />
    </div>
  );
}
