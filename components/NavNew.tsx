"use client";

import React, { useState } from "react";
import Link from "next/link";

// ── NavNew.tsx (Operators page nav) ──
// Added "For Agents ↗" link so operators can navigate to the agents page

export default function NavNew() {
  return (
    <nav
      style={{
        background: "#fff",
        borderBottom: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "0 40px",
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, width: 32 }}>
          {[100, 70, 45].map((w, i) => (
            <span
              key={i}
              style={{
                display: "block",
                height: 4,
                borderRadius: 2,
                background: "#2563eb",
                width: `${w}%`,
              }}
            />
          ))}
        </div>
        <div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#0d1b2e",
              fontStyle: "italic",
              letterSpacing: "-0.02em",
            }}
          >
            Orbitle
          </div>
          <div
            style={{
              fontSize: 10,
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
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {[
          { label: "How It Works", href: "#how" },
          { label: "Platform", href: "#platform" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "#4b5e7a",
              textDecoration: "none",
            }}
          >
            {label}
          </a>
        ))}

        {/* ── Cross-link to Agents page ── */}
        <Link
          href="/agents"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#7a8fa8",
            textDecoration: "none",
            padding: "5px 14px",
            borderRadius: 20,
            border: "1px solid #e2e8f0",
            whiteSpace: "nowrap",
            transition: "all 0.15s",
          }}
        >
          For Agents ↗
        </Link>
      </div>

      {/* CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
    </nav>
  );
}
