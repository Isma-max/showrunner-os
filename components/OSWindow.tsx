"use client";
import { ReactNode } from "react";
import styles from "./OSWindow.module.css";

interface OSWindowProps {
  title: string;
  crumb?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClose?: () => void;
  float?: boolean;
}

export default function OSWindow({
  title,
  crumb,
  icon,
  children,
  className = "",
  style,
  onClose,
  float,
}: OSWindowProps) {
  return (
    <div
      className={`os-window ${float ? styles.float : ""} ${className}`}
      style={style}
    >
      <div className="os-window-bar">
        <div className="os-window-dots">
          <button
            className="os-window-dot os-window-dot-red"
            onClick={onClose}
            aria-label="Close"
            style={{ border: "none", cursor: onClose ? "pointer" : "default" }}
          />
          <div className="os-window-dot os-window-dot-yellow" />
          <div className="os-window-dot os-window-dot-green" />
        </div>
        <div className="os-window-title">
          {icon && (
            <span style={{ display: "flex", alignItems: "center", opacity: 0.7 }}>
              {icon}
            </span>
          )}
          <span>{title}</span>
          {crumb && (
            <span
              style={{ marginLeft: "auto" }}
              className="os-window-crumb"
            >
              {crumb}
            </span>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
