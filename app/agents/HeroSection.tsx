"use client";

import React from "react";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const HERO_PILLS = [
  "Free 1-week trial",
  "Full branding included",
  "Live in 48 hours",
  "Starting ₹499/month",
] as const;

const TRUSTED_NAMES = [
  "Sara Travels",
  "Ravi Tours",
  "Anjali Holidays",
  "Mehta Journeys",
  "Kumar Treks",
] as const;

const DASHBOARD_SIDEBAR_ITEMS = [
  { icon: "📊", label: "Dashboard", active: true },
  { icon: "📦", label: "Packages" },
  { icon: "📋", label: "Enquiries" },
  { icon: "🌐", label: "My Website" },
  { icon: "📄", label: "Documents" },
  { icon: "💳", label: "Billing" },
] as const;

const DASHBOARD_STATS = [
  { label: "Enquiries this month", val: "34", sub: "↑ 12 vs last month" },
  { label: "Live packages",        val: "12", sub: "↑ 3 added this week" },
  { label: "Conversions",          val: "8",  sub: "23.5% rate" },
] as const;

const DASHBOARD_ROWS = [
  { name: "Priya Sharma, Mumbai", pkg: "Goa 3N/4D",  date: "Just now",  status: "New",       sc: { bg: "#eff6ff", c: "#2563eb" } },
  { name: "Raj Mehta, Delhi",     pkg: "Kerala 6D",   date: "2 hrs ago", status: "Contacted", sc: { bg: "#fef3c7", c: "#d97706" } },
  { name: "Anita Roy, Pune",      pkg: "Manali 5D",   date: "Yesterday", status: "Booked",    sc: { bg: "#dcfce7", c: "#16a34a" } },
] as const;

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

/** "Early Access Now Open" badge above the H1 */
function EarlyAccessBadge() {
  return (
    <div
      className="hero-h1"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "#f0f4fa",
        border: "1px solid #cbd5e1",
        borderRadius: 50,
        padding: "7px 18px",
        fontSize: 12.5,
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "#1e3a5f",
        marginBottom: 32,
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563eb", display: "inline-block" }} />
      Early Access Now Open
    </div>
  );
}

/** Row of check-pill features */
function HeroPills() {
  return (
    <div
      className="hero-pills"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        flexWrap: "wrap",
        marginBottom: 56,
      }}
    >
      {HERO_PILLS.map((p) => (
        <span key={p} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "#4b5e7a" }}>
          <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span> {p}
        </span>
      ))}
    </div>
  );
}

/** Fake browser chrome + admin dashboard — hidden on mobile via CSS */
function DashboardMockup() {
  return (
    <div className="dashboard-mock" style={{ position: "relative", maxWidth: 920, margin: "0 auto" }}>
      {/* Floating notification */}
      <div
        className="float-notif"
        style={{
          position: "absolute", right: -10, top: 30,
          background: "#2563eb", color: "#fff",
          fontSize: 12, fontWeight: 700,
          padding: "8px 16px", borderRadius: 50,
          whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
          zIndex: 10,
        }}
      >
        🔔 New enquiry from Mumbai — just now
      </div>

      <div
        style={{
          background: "#f0f4fa",
          border: "1px solid #e2e8f0",
          borderRadius: "18px 18px 0 0",
          overflow: "hidden",
          boxShadow: "0 -4px 40px rgba(37,99,235,0.08)",
        }}
      >
        {/* Browser chrome bar */}
        <div style={{ background: "#0d1b2e", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div
            style={{
              flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 6,
              padding: "6px 14px", fontSize: 12, fontFamily: "monospace",
              color: "rgba(255,255,255,0.55)", maxWidth: 340, margin: "0 auto", textAlign: "center",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.85)" }}>sara</span>.sunrisetravel.com ·{" "}
            <span style={{ color: "rgba(255,255,255,0.3)" }}>Admin Panel</span>
          </div>
        </div>

        {/* Dashboard body */}
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", minHeight: 220 }}>
          {/* Sidebar */}
          <div style={{ background: "#fff", borderRight: "1px solid #e2e8f0", padding: "16px 0" }}>
            {DASHBOARD_SIDEBAR_ITEMS.map(({ icon, label, active }) => (
              <div
                key={label}
                style={{
                  padding: "9px 18px", fontSize: 12,
                  fontWeight: active ? 700 : 500,
                  color: active ? "#2563eb" : "#7a8fa8",
                  display: "flex", alignItems: "center", gap: 8,
                  background: active ? "#eff6ff" : "transparent",
                  borderRight: active ? "3px solid #2563eb" : "none",
                }}
              >
                <span style={{ fontSize: 14 }}>{icon}</span> {label}
              </div>
            ))}
          </div>

          {/* Content area */}
          <div style={{ padding: "18px 20px", background: "#f0f4fa" }}>
            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
              {DASHBOARD_STATS.map(({ label, val, sub }) => (
                <div key={label} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "#7a8fa8", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, color: "#0d1b2e", letterSpacing: "-0.02em" }}>{val}</div>
                  <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 600, marginTop: 4 }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Enquiries table */}
            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden" }}>
              {/* Table header */}
              <div
                style={{
                  display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  padding: "10px 14px", background: "#f0f4fa",
                  borderBottom: "1px solid #e2e8f0",
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.06em", color: "#7a8fa8",
                }}
              >
                <span>Enquiry</span><span>Package</span><span>Date</span><span>Status</span>
              </div>

              {/* Table rows */}
              {DASHBOARD_ROWS.map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    padding: "9px 14px",
                    borderBottom: i < DASHBOARD_ROWS.length - 1 ? "1px solid #e2e8f0" : "none",
                    fontSize: 11.5, color: "#4b5e7a", alignItems: "center",
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#0d1b2e" }}>{row.name}</span>
                  <span>{row.pkg}</span>
                  <span style={{ color: "#7a8fa8" }}>{row.date}</span>
                  <span>
                    <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: row.sc.bg, color: row.sc.c }}>
                      {row.status}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** "Agents on early access" logo strip */
function TrustedStrip() {
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "28px 20px" }}>
      <div
        style={{
          maxWidth: 1080, margin: "0 auto",
          display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#7a8fa8", whiteSpace: "nowrap" }}>
          Agents on early access
        </span>
        <div style={{ width: 1, height: 24, background: "#e2e8f0", flexShrink: 0 }} />
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          {TRUSTED_NAMES.map((n) => (
            <span key={n} style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "#7a8fa8", opacity: 0.55 }}>
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────
export default function HeroSection() {
  return (
    <>
      <div
        className="hero-section"
        style={{ background: "#fff", padding: "72px 40px 0", textAlign: "center", overflow: "hidden" }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <EarlyAccessBadge />

          <h1
            className="hero-h1 hero-h1-text"
            style={{
              fontSize: "clamp(32px, 5.5vw, 68px)",
              fontWeight: 800,
              color: "#0d1b2e",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              maxWidth: 860,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Your Packages. Your Website.{" "}
            <span style={{ color: "#2563eb" }}>Your Bookings.</span>
          </h1>

          <p
            className="hero-sub hero-sub-text"
            style={{
              fontSize: 18,
              fontWeight: 400,
              color: "#4b5e7a",
              maxWidth: 620,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Orbitle gives independent travel agents their own branded marketplace website and admin panel —
            live on their own domain in 48 hours. No coding. No ₹10,000 freelancer builds. Just your name and your brand.
          </p>

          {/* CTA buttons */}
          <div
            className="hero-actions"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap", marginBottom: 40 }}
          >
            <a
              href="#get-started"
              style={{
                background: "#2563eb", color: "#fff",
                fontSize: 16, fontWeight: 700,
                padding: "16px 32px", borderRadius: 50,
                textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}
            >
              Get My Website →
            </a>
            <a
              href="#how"
              style={{
                background: "#fff", color: "#0d1b2e",
                fontSize: 15, fontWeight: 600,
                padding: "15px 28px", borderRadius: 50,
                border: "1.5px solid #cbd5e1",
                textDecoration: "none",
                display: "inline-flex", alignItems: "center", gap: 8,
              }}
            >
              ▶ See How It Works
            </a>
          </div>

          <HeroPills />
          <DashboardMockup />
        </div>
      </div>

      <TrustedStrip />
    </>
  );
}