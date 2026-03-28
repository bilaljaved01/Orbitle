"use client";

import React from "react";
import Link from "next/link";

export default function FooterNew() {
  return (
    <footer
      style={{
        background: "#0d1b2e",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
      className="px-4 sm:px-6 lg:px-10 pt-12 sm:pt-14 pb-8"
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>

        {/* Agent cross-promo banner */}
        <div
          style={{
            background: "rgba(37,99,235,0.12)",
            border: "1px solid rgba(37,99,235,0.25)",
            borderRadius: 16,
            padding: "20px 24px",
            marginBottom: 40,
          }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
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
                fontSize: 15,
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
              fontSize: 13,
              fontWeight: 700,
              padding: "11px 22px",
              borderRadius: 50,
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              display: "inline-block",
            }}
          >
            Explore Orbitle for Agents →
          </Link>
        </div>

        {/* Main footer grid */}
        <div
          style={{
            paddingBottom: 36,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            marginBottom: 28,
          }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <div
              style={{
                fontSize: 20,
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
                fontSize: 13,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
                marginBottom: 16,
                maxWidth: 280,
              }}
            >
              The white-label travel business SaaS platform by TrigrowTech. Built for operators,
              agents, and the teams running them.
            </p>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 2 }}>
              hello@orbitle.com
              <br />
              +91 9118556755
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 14,
              }}
            >
              Platform
            </h4>
            {["Marketplace", "Agent Portal", "Lead Management", "Operator Dashboard", "Subdomains"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  marginBottom: 10,
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
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 14,
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
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  marginBottom: 10,
                }}
              >
                {l}
              </a>
            ))}
            <Link
              href="/agents"
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 700,
                color: "#93c5fd",
                textDecoration: "none",
                marginTop: 4,
                padding: "4px 12px",
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
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 14,
              }}
            >
              Resources
            </h4>
            {["Book a Demo", "See Pricing", "Privacy Policy", "Terms of Service"].map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  marginBottom: 10,
                }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ fontSize: 12 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-3"
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