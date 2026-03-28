"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ─────────────────────────────────────────────
// TYPES & DATA
// ─────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "How It Works", href: "#how" },
  { label: "Platform",     href: "#platform" },
  { label: "Pricing",      href: "#pricing" },
  { label: "Contact",      href: "#contact" },
];

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

/** Three-bar hamburger button shown on mobile */
function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open navigation menu"
      style={{
        background: "none",
        border: "1px solid #e2e8f0",
        borderRadius: 8,
        width: 38,
        height: 38,
        cursor: "pointer",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        flexShrink: 0,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{ display: "block", width: 18, height: 2, background: "#0d1b2e", borderRadius: 2 }}
        />
      ))}
    </button>
  );
}

/** Semi-transparent backdrop that closes the sidebar on click */
function SidebarBackdrop({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(13,27,46,0.45)",
        zIndex: 199,
        backdropFilter: "blur(2px)",
      }}
    />
  );
}

/** Half-screen slide-in sidebar for mobile nav */
function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, right: 0, bottom: 0,
        width: "50vw",
        minWidth: 260,
        maxWidth: 340,
        background: "#fff",
        zIndex: 200,
        boxShadow: "-8px 0 40px rgba(13,27,46,0.15)",
        display: "flex",
        flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.25s ease",
        overflowY: "auto",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Header: logo + close */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image
            src="/images/orbitle-logo.png"
            alt="Orbitle logo"
            width={32}
            height={32}
            style={{ objectFit: "contain" }}
            priority
          />
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#0d1b2e", fontStyle: "italic", letterSpacing: "-0.02em" }}>
              Orbitle
            </div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7a8fa8" }}>
              by TrigrowTech
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            background: "#f0f4fa",
            border: "none",
            borderRadius: 8,
            width: 34, height: 34,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            color: "#4b5e7a",
          }}
        >
          ×
        </button>
      </div>

      {/* "For Operators" badge */}
      <div style={{ padding: "14px 24px", borderBottom: "1px solid #f0f4fa" }}>
        <span
          style={{
            background: "#eff6ff",
            color: "#2563eb",
            border: "1px solid #dbeafe",
            fontSize: 11.5,
            fontWeight: 700,
            padding: "4px 12px",
            borderRadius: 20,
            letterSpacing: "0.02em",
          }}
        >
          For Operators
        </span>
      </div>

      {/* Nav links */}
      <nav style={{ padding: "8px 16px", flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7a8fa8", padding: "8px 8px 4px" }}>
          Navigation
        </div>

        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            onClick={onClose}
            className="hover:text-blue-600 hover:bg-blue-50"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 12px",
              borderRadius: 10,
              marginBottom: 2,
              fontSize: 15,
              fontWeight: 600,
              color: "#4b5e7a",
              textDecoration: "none",
              transition: "all 0.15s",
            }}
          >
            {label}
          </a>
        ))}

        <div style={{ height: 1, background: "#e2e8f0", margin: "12px 8px" }} />

        <Link
          href="/agents"
          onClick={onClose}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 12px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 600,
            color: "#7a8fa8",
            textDecoration: "none",
          }}
        >
          For Agents ↗
        </Link>
      </nav>

      {/* CTA */}
      <div style={{ padding: "16px 24px 28px", borderTop: "1px solid #e2e8f0" }}>
        <a
          href="#contact"
          onClick={onClose}
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
            background: "#2563eb",
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            padding: "14px",
            borderRadius: 50,
            textDecoration: "none",
          }}
        >
          Book a Demo →
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────
export default function NavNew() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Lock body scroll while sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  return (
    <>
      {/* Sidebar backdrop + panel */}
      {sidebarOpen && <SidebarBackdrop onClick={() => setSidebarOpen(false)} />}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Sticky nav */}
      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
          position: "sticky",
          top: 0,
          zIndex: 100,
          padding: "0 20px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <Image
            src="/images/orbitle-logo.png"
            alt="Orbitle logo"
            width={32}
            height={32}
            style={{ objectFit: "contain" }}
            priority
          />
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#0d1b2e",
                fontStyle: "italic",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              Orbitle
            </div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#7a8fa8",
              }}
            >
              by TrigrowTech
            </div>
          </div>
          <span
            className="hidden sm:inline"
            style={{
              background: "#eff6ff",
              color: "#2563eb",
              border: "1px solid #dbeafe",
              fontSize: 11,
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              letterSpacing: "0.02em",
              flexShrink: 0,
            }}
          >
            For Operators
          </span>
        </div>

        {/* Desktop Nav links */}
        <div
          className="hidden lg:flex"
          style={{ alignItems: "center", gap: 28 }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="hover:text-blue-600 transition-colors"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#4b5e7a",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </a>
          ))}
          <Link
            href="/agents"
            className="hover:bg-slate-50 transition-colors"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#7a8fa8",
              textDecoration: "none",
              padding: "5px 14px",
              borderRadius: 20,
              border: "1px solid #e2e8f0",
              whiteSpace: "nowrap",
            }}
          >
            For Agents ↗
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: 12, flexShrink: 0 }}>
          <a
            href="#contact"
            style={{
              background: "#2563eb",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              padding: "10px 22px",
              borderRadius: 50,
              textDecoration: "none",
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            Book a Demo →
          </a>
        </div>

        {/* Mobile: CTA + Hamburger */}
        <div className="flex lg:hidden" style={{ alignItems: "center", gap: 10 }}>
          <a
            href="#contact"
            style={{
              background: "#2563eb",
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              padding: "8px 16px",
              borderRadius: 50,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Book Demo
          </a>
          <HamburgerButton onClick={() => setSidebarOpen(true)} />
        </div>
      </nav>
    </>
  );
}