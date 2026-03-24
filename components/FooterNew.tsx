"use client";

import React from "react";
import Link from "next/link";

// ── FooterNew.tsx (Operators page footer) ──
// Added "Orbitle for Agents" link in Company column and a banner CTA section

export default function FooterNew() {
  return (
    <footer
      style={{
        background: "#0d1b2e",
        padding: "56px 40px 32px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* ── Agent cross-promo banner ── */}
        <div
          style={{
            background: "rgba(37,99,235,0.12)",
            border: "1px solid rgba(37,99,235,0.25)",
            borderRadius: 16,
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            marginBottom: 48,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#93c5fd",
                marginBottom: 6,
              }}
            >
              Also available
            </div>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              Orbitle for Agents — standalone website + admin panel for independent agents
            </p>
          </div>
          <Link
            href="/agents"
            style={{
              background: "#2563eb",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              padding: "12px 24px",
              borderRadius: 50,
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Explore Orbitle for Agents →
          </Link>
        </div>

        {/* Main footer grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 56,
            paddingBottom: 44,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 32,
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                fontStyle: "italic",
                color: "#fff",
                marginBottom: 8,
                letterSpacing: "-0.02em",
              }}
            >
              Orbitle
            </div>
            <p
              style={{
                fontSize: 13.5,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
                marginBottom: 18,
              }}
            >
              The white-label travel business SaaS platform by TrigrowTech. Built for operators,
              agents, and the teams running them.
            </p>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.35)",
                lineHeight: 2,
              }}
            >
              hello@orbitle.com
              <br />
              +91 9118556755
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 16,
              }}
            >
              Platform
            </h4>
            {[
              "Marketplace",
              "Agent Portal",
              "Lead Management",
              "Operator Dashboard",
              "Subdomains",
            ].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  fontSize: 13.5,
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  marginBottom: 11,
                }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 16,
              }}
            >
              Company
            </h4>
            {["About TrigrowTech", "Orbitle for Operators", "Careers", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  fontSize: 13.5,
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  marginBottom: 11,
                }}
              >
                {l}
              </a>
            ))}
            {/* ── Cross-link to Agents ── */}
            <Link
              href="/agents"
              style={{
                display: "inline-block",
                fontSize: 13,
                fontWeight: 700,
                color: "#93c5fd",
                textDecoration: "none",
                marginTop: 6,
                padding: "5px 14px",
                borderRadius: 20,
                border: "1px solid rgba(147,197,253,0.2)",
                background: "rgba(147,197,253,0.05)",
              }}
            >
              Orbitle for Agents ↗
            </Link>
          </div>

          {/* Resources */}
          <div>
            <h4
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 16,
              }}
            >
              Resources
            </h4>
            {[
              "Book a Demo",
              "See Pricing",
              "Privacy Policy",
              "Terms of Service",
            ].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  fontSize: 13.5,
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  marginBottom: 11,
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12.5,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2026 TrigrowTech Pvt. Ltd. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a
                key={l}
                href="#"
                style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
