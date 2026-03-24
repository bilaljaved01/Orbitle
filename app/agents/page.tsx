"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   COUNTDOWN HOOK
───────────────────────────────────────────── */
function useCountdown(initial: number) {
  const [s, setS] = useState(initial);
  useEffect(() => {
    const id = setInterval(() => setS((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

/* ─────────────────────────────────────────────
   CONTACT FORM (reusable)
───────────────────────────────────────────── */
function AgentContactForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(fd)),
    }).catch(() => {});
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted)
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: 28,
          padding: compact ? "32px 28px" : "40px 36px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
        <h3
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: "#0d1b2e",
            marginBottom: 10,
          }}
        >
          You're on the list!
        </h3>
        <p style={{ fontSize: 14, color: "#4b5e7a", lineHeight: 1.7 }}>
          We'll reach out within 24 hours with your trial access and plan
          details. Welcome to Orbitle!
        </p>
      </div>
    );

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 28,
        padding: compact ? "28px 24px" : "36px",
        boxShadow: "0 4px 40px rgba(37,99,235,0.07)",
      }}
    >
      <h3
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "#0d1b2e",
          letterSpacing: "-0.02em",
          marginBottom: 6,
        }}
      >
        Get your travel website
      </h3>
      <p
        style={{
          fontSize: 13.5,
          color: "#7a8fa8",
          marginBottom: 20,
          lineHeight: 1.6,
        }}
      >
        Fill in your details and we'll reach out within 24 hours with trial
        access and plan options.
      </p>

      {/* social proof strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 14px",
          background: "#f0f4fa",
          border: "1px solid #e2e8f0",
          borderRadius: 10,
          marginBottom: 20,
          fontSize: 13,
          color: "#4b5e7a",
          fontWeight: 500,
        }}
      >
        <div style={{ display: "flex" }}>
          {["SM", "RK", "AM", "PJ"].map((init, i) => (
            <div
              key={init}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#eff6ff",
                border: "2px solid #fff",
                marginLeft: i === 0 ? 0 : -8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 800,
                color: "#2563eb",
              }}
            >
              {init}
            </div>
          ))}
        </div>
        <span>Join 80+ agents already on early access</span>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0d1b2e" }}>Your Name</span>
            <input
              name="name"
              required
              placeholder="Sara Mehta"
              style={inputStyle}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0d1b2e" }}>Phone</span>
            <input
              name="phone"
              required
              type="tel"
              placeholder="+91 98765 43210"
              style={inputStyle}
            />
          </label>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0d1b2e" }}>Email</span>
            <input
              name="email"
              required
              type="email"
              placeholder="sara@saratravels.com"
              style={inputStyle}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0d1b2e" }}>Business Name</span>
            <input
              name="business"
              required
              placeholder="Sara Travels"
              style={inputStyle}
            />
          </label>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0d1b2e" }}>Plan You're Interested In</span>
            <select name="plan" style={inputStyle}>
              <option>Monthly — ₹499/mo</option>
              <option>6-Month — ₹2,499</option>
              <option selected>Yearly — ₹3,999 (Most Popular)</option>
              <option>Lifetime — ₹9,999 (Pay Once)</option>
            </select>
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0d1b2e" }}>Domain Name (if any)</span>
            <input name="domain" placeholder="saratravels.com" style={inputStyle} />
          </label>
        </div>
        <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#0d1b2e" }}>Anything to add?</span>
          <textarea
            name="message"
            rows={3}
            placeholder="Tell us about your current setup — how are you managing enquiries right now?"
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 50,
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            marginTop: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {loading ? "Submitting…" : "Submit & Get Trial Access →"}
        </button>

        <p style={{ fontSize: 12, color: "#7a8fa8", textAlign: "center", lineHeight: 1.5 }}>
          No commitment required. We'll share plan details within 24 hours.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
            fontSize: 12.5,
            fontWeight: 700,
            color: "#2563eb",
            background: "#eff6ff",
            padding: "7px 18px",
            borderRadius: 50,
            textAlign: "center",
          }}
        >
          ⚡ 78 founding spots remaining — lifetime pricing closes at 100
        </div>
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "10px 14px",
  border: "1.5px solid #e2e8f0",
  borderRadius: 10,
  background: "#f0f4fa",
  color: "#0d1b2e",
  fontSize: 14,
  fontFamily: "inherit",
  outline: "none",
  width: "100%",
};

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function AgentsPage() {
  const [annVisible, setAnnVisible] = useState(true);
  const cd = useCountdown(23 * 3600 + 54 * 60 + 51);

  return (
    <div
      style={{
        fontFamily:
          "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#f0f4fa",
        color: "#0d1b2e",
        lineHeight: 1.6,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* ── GOOGLE FONT ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        input, select, textarea, button { font-family: 'Plus Jakarta Sans', sans-serif; }
        input:focus, select:focus, textarea:focus {
          border-color: #2563eb !important;
          background: #fff !important;
          outline: none;
        }
        .step-card:hover { box-shadow: 0 8px 32px rgba(37,99,235,0.1); transform: translateY(-2px); }
        .why-card:hover { background: #eff6ff !important; border-color: #2563eb !important; }
        .tcard:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.07); }
        .pcard:hover { border-color: #2563eb !important; }
        .change-card:hover { border-color: #2563eb !important; }
        .platform-card:hover { border-color: #2563eb !important; box-shadow: 0 4px 24px rgba(37,99,235,0.08); }
        .nav-link:hover { color: #0d1b2e !important; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadein { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .hero-h1 { animation: fadein 0.5s ease both; }
        .hero-sub { animation: fadein 0.5s 0.1s ease both; }
        .hero-actions { animation: fadein 0.5s 0.2s ease both; }
        .hero-pills { animation: fadein 0.5s 0.3s ease both; }
        .float-notif { animation: float 3s ease-in-out infinite; }
      `}</style>

      {/* ── ANNOUNCEMENT BAR ── */}
      {annVisible && (
        <div
          style={{
            background: "#0d1b2e",
            color: "#fff",
            padding: "10px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 13,
            gap: 16,
          }}
        >
          <div style={{ width: 60 }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flex: 1,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "#2563eb",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 6,
                whiteSpace: "nowrap",
              }}
            >
              Early Access
            </span>
            <span style={{ color: "rgba(255,255,255,0.85)" }}>
              First 100 agents get lifetime pricing —{" "}
              <strong style={{ color: "#fff" }}>78 spots left</strong>
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "5px 12px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 13,
                fontFamily: "monospace",
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              🕐 {cd}
            </div>
            <a
              href="#get-started"
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Reserve your spot →
            </a>
          </div>
          <button
            onClick={() => setAnnVisible(false)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
              padding: "0 4px",
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* ── NAV ── */}
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
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Logo mark */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: 32,
            }}
          >
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
            For Agents
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {["How It Works:#how", "Platform:#platform", "Pricing:#pricing", "Contact:#get-started"].map(
            (item) => {
              const [label, href] = item.split(":");
              return (
                <a
                  key={label}
                  href={href}
                  className="nav-link"
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#4b5e7a",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                >
                  {label}
                </a>
              );
            }
          )}
          {/* Switch to Operators */}
          <Link
            href="/"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#7a8fa8",
              textDecoration: "none",
              padding: "5px 14px",
              borderRadius: 20,
              border: "1px solid #e2e8f0",
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            For Operators ↗
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="#get-started"
            style={{
              background: "#2563eb",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              padding: "10px 22px",
              borderRadius: 50,
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
          >
            Get My Website →
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div
        style={{
          background: "#fff",
          padding: "72px 40px 0",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
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
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#2563eb",
                display: "inline-block",
              }}
            />
            Early Access Now Open
          </div>

          <h1
            className="hero-h1"
            style={{
              fontSize: "clamp(38px, 5.5vw, 68px)",
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
            className="hero-sub"
            style={{
              fontSize: 18,
              fontWeight: 400,
              color: "#4b5e7a",
              maxWidth: 620,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Orbitle gives independent travel agents their own branded
            marketplace website and admin panel — live on their own domain in 48
            hours. No coding. No ₹10,000 freelancer builds. Just your name,
            your brand, your leads.
          </p>

          <div
            className="hero-actions"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              flexWrap: "wrap",
              marginBottom: 40,
            }}
          >
            <a
              href="#get-started"
              style={{
                background: "#2563eb",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                padding: "16px 32px",
                borderRadius: 50,
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Get My Website →
            </a>
            <a
              href="#how"
              style={{
                background: "#fff",
                color: "#0d1b2e",
                fontSize: 15,
                fontWeight: 600,
                padding: "15px 28px",
                borderRadius: 50,
                border: "1.5px solid #cbd5e1",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              ▶ See How It Works
            </a>
          </div>

          {/* Pills */}
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
            {[
              "Free 1-week trial",
              "Full branding included",
              "Live in 48 hours",
              "Starting ₹499/month",
            ].map((p) => (
              <span
                key={p}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#4b5e7a",
                }}
              >
                <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span> {p}
              </span>
            ))}
          </div>

          {/* Dashboard mockup */}
          <div style={{ position: "relative", maxWidth: 920, margin: "0 auto" }}>
            <div
              className="float-notif"
              style={{
                position: "absolute",
                right: -10,
                top: 30,
                background: "#2563eb",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                padding: "8px 16px",
                borderRadius: 50,
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
              {/* Browser chrome */}
              <div
                style={{
                  background: "#0d1b2e",
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                    <div
                      key={c}
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: "50%",
                        background: c,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 6,
                    padding: "6px 14px",
                    fontSize: 12,
                    fontFamily: "monospace",
                    color: "rgba(255,255,255,0.55)",
                    maxWidth: 340,
                    margin: "0 auto",
                    textAlign: "center",
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.85)" }}>sara</span>
                  .sunrisetravel.com ·{" "}
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>
                    Admin Panel
                  </span>
                </div>
              </div>

              {/* Dashboard body */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr",
                  minHeight: 220,
                }}
              >
                {/* Sidebar */}
                <div
                  style={{
                    background: "#fff",
                    borderRight: "1px solid #e2e8f0",
                    padding: "16px 0",
                  }}
                >
                  {[
                    { icon: "📊", label: "Dashboard", active: true },
                    { icon: "📦", label: "Packages" },
                    { icon: "📋", label: "Enquiries" },
                    { icon: "🌐", label: "My Website" },
                    { icon: "📄", label: "Documents" },
                    { icon: "💳", label: "Billing" },
                  ].map(({ icon, label, active }) => (
                    <div
                      key={label}
                      style={{
                        padding: "9px 18px",
                        fontSize: 12,
                        fontWeight: active ? 700 : 500,
                        color: active ? "#2563eb" : "#7a8fa8",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        background: active ? "#eff6ff" : "transparent",
                        borderRight: active ? "3px solid #2563eb" : "none",
                      }}
                    >
                      <span style={{ fontSize: 14 }}>{icon}</span> {label}
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div style={{ padding: "18px 20px", background: "#f0f4fa" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: 10,
                      marginBottom: 14,
                    }}
                  >
                    {[
                      {
                        label: "Enquiries this month",
                        val: "34",
                        sub: "↑ 12 vs last month",
                      },
                      {
                        label: "Live packages",
                        val: "12",
                        sub: "↑ 3 added this week",
                      },
                      { label: "Conversions", val: "8", sub: "23.5% rate" },
                    ].map(({ label, val, sub }) => (
                      <div
                        key={label}
                        style={{
                          background: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: 10,
                          padding: "14px 16px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            color: "#7a8fa8",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            marginBottom: 6,
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            fontSize: 24,
                            fontWeight: 800,
                            color: "#0d1b2e",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {val}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#16a34a",
                            fontWeight: 600,
                            marginTop: 4,
                          }}
                        >
                          {sub}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Table */}
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1fr",
                        padding: "10px 14px",
                        background: "#f0f4fa",
                        borderBottom: "1px solid #e2e8f0",
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "#7a8fa8",
                      }}
                    >
                      <span>Enquiry</span>
                      <span>Package</span>
                      <span>Date</span>
                      <span>Status</span>
                    </div>
                    {[
                      {
                        name: "Priya Sharma, Mumbai",
                        pkg: "Goa 3N/4D",
                        date: "Just now",
                        status: "New",
                        sc: { bg: "#eff6ff", c: "#2563eb" },
                      },
                      {
                        name: "Raj Mehta, Delhi",
                        pkg: "Kerala 6D",
                        date: "2 hrs ago",
                        status: "Contacted",
                        sc: { bg: "#fef3c7", c: "#d97706" },
                      },
                      {
                        name: "Anita Roy, Pune",
                        pkg: "Manali 5D",
                        date: "Yesterday",
                        status: "Booked",
                        sc: { bg: "#dcfce7", c: "#16a34a" },
                      },
                    ].map((row, i) => (
                      <div
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "2fr 1fr 1fr 1fr",
                          padding: "9px 14px",
                          borderBottom:
                            i < 2 ? "1px solid #e2e8f0" : "none",
                          fontSize: 11.5,
                          color: "#4b5e7a",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{ fontWeight: 600, color: "#0d1b2e" }}
                        >
                          {row.name}
                        </span>
                        <span>{row.pkg}</span>
                        <span style={{ color: "#7a8fa8" }}>{row.date}</span>
                        <span>
                          <span
                            style={{
                              display: "inline-flex",
                              padding: "2px 8px",
                              borderRadius: 20,
                              fontSize: 10,
                              fontWeight: 700,
                              background: row.sc.bg,
                              color: row.sc.c,
                            }}
                          >
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
        </div>
      </div>

      {/* ── TRUSTED ── */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
          padding: "28px 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#7a8fa8",
              whiteSpace: "nowrap",
            }}
          >
            Agents on early access
          </span>
          <div
            style={{
              width: 1,
              height: 24,
              background: "#e2e8f0",
              flexShrink: 0,
            }}
          />
          <div
            style={{
              display: "flex",
              gap: 36,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {[
              "Sara Travels",
              "Ravi Tours",
              "Anjali Holidays",
              "Mehta Journeys",
              "Kumar Treks",
            ].map((n) => (
              <span
                key={n}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#7a8fa8",
                  opacity: 0.55,
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ background: "#f0f4fa", padding: "88px 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow>How It Works</Eyebrow>
          <SectionTitle>
            You bring the packages.
            <br />
            We build the platform.
          </SectionTitle>
          <SectionSub>
            Three steps from zero to a professional travel website running on
            your own domain — in 48 hours.
          </SectionSub>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {[
              {
                n: 1,
                tag: "We do the setup",
                title: "Tell Us Your Domain",
                body: "Share your domain name. We handle DNS, SSL, hosting, and every technical detail. Don't have one? We provide it — included on 6-month and yearly plans.",
              },
              {
                n: 2,
                tag: "You're in control",
                title: "Add Packages & Brand Your Site",
                body: "Upload your tour packages, set prices, add photos, write your bio. Your admin panel gives you full control over everything customers see — no technical skills required.",
              },
              {
                n: 3,
                tag: "Live in 48 hours",
                title: "Receive Enquiries Directly",
                body: "Customers visit your website, browse your packages, and fill your enquiry form. Every lead lands directly in your admin panel. Share your link on WhatsApp, Instagram, Google — watch enquiries come in.",
              },
            ].map(({ n, tag, title, body }) => (
              <div
                key={n}
                className="step-card"
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 20,
                  padding: "36px 32px",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: "#2563eb",
                    color: "#fff",
                    fontSize: 18,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#2563eb",
                    marginBottom: 10,
                  }}
                >
                  {tag}
                </div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#0d1b2e",
                    letterSpacing: "-0.02em",
                    marginBottom: 14,
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </div>
                <p style={{ fontSize: 14.5, color: "#4b5e7a", lineHeight: 1.75 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM ── */}
      <section
        id="platform"
        style={{ background: "#fff", padding: "88px 40px" }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <Eyebrow>The Platform</Eyebrow>
              <SectionTitle>
                Two Powerful Systems.
                <br />
                One Simple Platform.
              </SectionTitle>
              <p
                style={{
                  fontSize: 17,
                  color: "#4b5e7a",
                  lineHeight: 1.7,
                }}
              >
                You're not buying a website. You're getting a complete travel
                business presence online.
              </p>
            </div>
            <div
              style={{
                fontSize: 15,
                color: "#7a8fa8",
                maxWidth: 300,
                lineHeight: 1.65,
                padding: "16px 20px",
                background: "#f0f4fa",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                fontWeight: 500,
              }}
            >
              Your own marketplace website and a full admin panel to manage it —
              on your domain, with your brand, your packages, your leads.
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            {[
              {
                icon: "🌏",
                iconBg: "#eff6ff",
                title: "Travel Marketplace Website",
                desc: "A branded travel website on your own domain. Not a listing on someone else's platform — your own destination where customers find, browse, and enquire.",
                features: [
                  "Homepage with hero banner, tagline, featured packages",
                  "Full packages page — search and filter by destination, duration, price",
                  "Individual package detail pages with itinerary, photos, inclusions",
                  "About page — your story, expertise, certifications",
                  "Plan My Tour form — custom trip requests sent directly to you",
                  "WhatsApp chat button, contact page, FAQs — all included",
                  "Mobile responsive · SSL secured · Fast loading · Basic SEO",
                ],
              },
              {
                icon: "⚙️",
                iconBg: "rgba(13,27,46,0.06)",
                title: "Admin Panel",
                desc: "Your private dashboard to manage everything on your website. Add packages, track enquiries, follow up on leads — all from one clean interface.",
                features: [
                  "Add, edit, list, unlist packages — live immediately",
                  "All enquiries in one dashboard — website form, package form, custom tour",
                  "Lead pipeline — New → Contacted → Proposal Sent → Booked",
                  "Set follow-up reminders on any enquiry",
                  "WhatsApp shortcut — one click to open chat with any lead",
                  "Manage homepage content, testimonials, FAQs from dashboard",
                  "Export all enquiries to Excel anytime",
                ],
              },
              {
                icon: "📦",
                iconBg: "#eff6ff",
                title: "Package Management",
                desc: "Upload and manage your full tour catalogue. Every package gets a dedicated detail page on your website the moment you publish it.",
                features: [
                  "Full itinerary builder — day by day breakdown",
                  "Photo galleries, inclusions, exclusions, highlights",
                  "Category tags — honeymoon, adventure, family, pilgrimage, international",
                  "Duplicate packages for similar tours — save time",
                  "Control which packages feature on your homepage",
                  "Draft mode — work on packages before going live",
                ],
              },
              {
                icon: "📊",
                iconBg: "rgba(13,27,46,0.06)",
                title: "Enquiry & Lead Management",
                desc: "Never lose a lead again. Every enquiry that comes through your website lands in your admin panel with full details and a clear follow-up pipeline.",
                features: [
                  "Status pipeline — New → Contacted → Proposal Sent → Booked → Closed",
                  "Internal notes per enquiry — remember every conversation",
                  "Follow-up reminders with date and note",
                  "See which package each lead was interested in",
                  "Filter by status, date, source — find any lead instantly",
                  "Mark as converted and track monthly bookings",
                ],
              },
            ].map(({ icon, iconBg, title, desc, features }) => (
              <div
                key={title}
                className="platform-card"
                style={{
                  background: "#f0f4fa",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 20,
                  padding: "36px 34px",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 20,
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#0d1b2e",
                    letterSpacing: "-0.02em",
                    marginBottom: 10,
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#4b5e7a",
                    marginBottom: 22,
                    lineHeight: 1.65,
                  }}
                >
                  {desc}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                  {features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 13.5,
                        color: "#4b5e7a",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          color: "#2563eb",
                          fontWeight: 800,
                          flexShrink: 0,
                          fontSize: 13,
                        }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE BANNER ── */}
      <section style={{ background: "#0d1b2e", padding: "88px 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1px 1fr",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#93c5fd",
                  marginBottom: 8,
                }}
              >
                Starting from
              </div>
              <div
                style={{
                  fontSize: 80,
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  marginBottom: 6,
                }}
              >
                <sup style={{ fontSize: 32, verticalAlign: "super" }}>₹</sup>
                499
                <sub
                  style={{ fontSize: 22, color: "rgba(255,255,255,0.5)" }}
                >
                  /mo
                </sub>
              </div>
              <div
                style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}
              >
                Or ₹9,999 one-time — forever.
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.1)",
                height: 120,
              }}
            />
            <div>
              <h2
                style={{
                  fontSize: "clamp(24px,3vw,38px)",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}
              >
                Someone paid ₹10,000 for a basic website with no support. You
                deserve better.
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.75,
                  marginBottom: 28,
                }}
              >
                Agents are spending ₹8,000–₹15,000 getting freelancers to build
                a travel site — no admin panel, no lead tracking, no ongoing
                support, no updates. Orbitle gives you a better product at a
                fraction of that — maintained and supported every single month.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  "100% Data Ownership",
                  "Zero Commission to OTAs",
                  "All Enquiries Direct to You",
                  "No Revenue Share",
                ].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: "#fff",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      padding: "6px 16px",
                      borderRadius: 50,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT CHANGES ── */}
      <section style={{ background: "#f0f4fa", padding: "88px 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div
            style={{
              fontSize: "clamp(28px,3.5vw,46px)",
              fontWeight: 800,
              color: "#0d1b2e",
              letterSpacing: "-0.03em",
              marginBottom: 40,
              lineHeight: 1.1,
            }}
          >
            What changes when you use Orbitle
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 16,
              marginBottom: 48,
            }}
          >
            {[
              {
                label: "Your Online Presence",
                before: "WhatsApp link",
                after: "yourname.com",
                pill: "Professional",
                pillColor: "#2563eb",
                pillBg: "#eff6ff",
                desc: "Stop sharing a WhatsApp link or PDF catalogue. Give customers a real website that earns trust before they ever call you.",
              },
              {
                label: "Enquiry Management",
                before: "WhatsApp chaos",
                after: "Clean dashboard",
                pill: "Organised",
                pillColor: "#16a34a",
                pillBg: "#dcfce7",
                desc: "Every lead in one place with status, notes, and follow-up reminders. Never lose track of a potential booking again.",
              },
              {
                label: "Setup Cost",
                before: "₹10,000 + wait",
                after: "₹499/month",
                pill: "Or ₹9,999 lifetime",
                pillColor: "#16a34a",
                pillBg: "#dcfce7",
                desc: "No one-time builds that go stale. Your platform is always maintained, updated, and supported.",
              },
              {
                label: "Lead Leakage",
                before: "Lost in chats",
                after: "~0% lost",
                pill: "Eliminated",
                pillColor: "#16a34a",
                pillBg: "#dcfce7",
                desc: "Every enquiry from your website lands in your admin panel. No missed messages, no leads buried in WhatsApp threads.",
              },
            ].map(
              ({ label, before, after, pill, pillColor, pillBg, desc }) => (
                <div
                  key={label}
                  className="change-card"
                  style={{
                    background: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 20,
                    padding: 32,
                    transition: "border-color 0.2s",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#7a8fa8",
                      marginBottom: 18,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      marginBottom: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#cbd5e1",
                        textDecoration: "line-through",
                        textDecorationColor: "rgba(220,50,50,0.5)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {before}
                    </span>
                    <span style={{ fontSize: 20, color: "#7a8fa8" }}>→</span>
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#0d1b2e",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {after}
                    </span>
                  </div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 50,
                      marginBottom: 12,
                      background: pillBg,
                      color: pillColor,
                    }}
                  >
                    {pill}
                  </span>
                  <p
                    style={{
                      fontSize: 13.5,
                      color: "#4b5e7a",
                      lineHeight: 1.7,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ── WHY ORBITLE ── */}
      <section style={{ background: "#fff", padding: "88px 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow>Why Orbitle</Eyebrow>
          <SectionTitle style={{ marginBottom: 48 }}>
            Built for agents
            <br />
            who mean business.
          </SectionTitle>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {[
              {
                icon: "🚀",
                title: "Live in 48 hours — not 6 weeks",
                body: "Freelancers take 4–8 weeks to build a basic site. Orbitle has you live in 48 hours. Share your domain, we handle DNS, SSL, hosting, and setup — you're done.",
              },
              {
                icon: "🏷️",
                title: "Your brand. Not a listing on ours.",
                body: "Everything runs on your domain — yourname.com. Not on a platform you don't own. Every click, every enquiry stays with you.",
              },
              {
                icon: "📲",
                title: "Built for WhatsApp-first agents",
                body: "Share your website link on WhatsApp, Instagram, Google My Business. Customers browse your packages, fill the form — you get a notification instantly.",
              },
              {
                icon: "🔧",
                title: "No developer. No extra cost. Ever.",
                body: "Add packages, update prices, change your homepage banner — all from your admin panel. No calling a developer. No waiting. No extra billing.",
              },
              {
                icon: "📈",
                title: "Grow into an operator later",
                body: "When you're ready to hire agents under you, upgrade to the full Orbitle operator bundle. Your website, your data, your brand — nothing starts from scratch.",
              },
              {
                icon: "🛡️",
                title: "TrigrowTech manages everything",
                body: "Hosting, uptime, SSL renewal, platform updates — all handled by TrigrowTech. You focus on selling tours. We keep the infrastructure running 24/7.",
              },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="why-card"
                style={{
                  background: "#f0f4fa",
                  border: "1px solid #e2e8f0",
                  borderRadius: 20,
                  padding: 32,
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: "#eff6ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 18,
                    border: "1px solid #dbeafe",
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#0d1b2e",
                    letterSpacing: "-0.02em",
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: "#4b5e7a", lineHeight: 1.75 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MID-PAGE CTA (form instance 2) ── */}
      <section
        id="try-now"
        style={{
          background: "linear-gradient(135deg, #0d1b2e 0%, #1e3a5f 100%)",
          padding: "88px 40px",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#93c5fd",
                background: "rgba(147,197,253,0.1)",
                padding: "5px 14px",
                borderRadius: 20,
                marginBottom: 24,
              }}
            >
              Start your free trial
            </span>
            <h2
              style={{
                fontSize: "clamp(28px,4vw,44px)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Ready to stop losing leads on WhatsApp?
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.75,
                marginBottom: 36,
              }}
            >
              Get your own branded travel website live in 48 hours. Start with a
              1-week free trial — no credit card required.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {[
                { icon: "⚡", title: "48-hour setup", sub: "We configure everything — DNS, SSL, hosting, theme" },
                { icon: "📋", title: "Full admin panel included", sub: "Manage packages and leads from day one" },
                { icon: "♾️", title: "Lifetime plan available", sub: "₹9,999 once — never pay again" },
              ].map(({ icon, title, sub }) => (
                <div
                  key={title}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14 }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      borderRadius: 12,
                      background: "rgba(37,99,235,0.25)",
                      border: "1px solid rgba(37,99,235,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: 2,
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.55,
                      }}
                    >
                      {sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AgentContactForm compact />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "#f0f4fa", padding: "88px 40px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow>From Our Early Access</Eyebrow>
          <SectionTitle>
            What agents said
            <br />
            when they signed up
          </SectionTitle>
          <p
            style={{
              fontSize: 15,
              color: "#7a8fa8",
              maxWidth: 540,
              lineHeight: 1.7,
              marginTop: 12,
              marginBottom: 48,
            }}
          >
            The platform is still being built. These are real comments from
            agents who joined our early access after seeing the concept.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {[
              {
                init: "SM",
                name: "Sara M.",
                role: "Independent Agent, Mumbai",
                text: "I've been sending people my Justdial page because I don't have my own website. I paid someone ₹8,000 for a site two years ago and it just stopped working. This is exactly what I needed.",
              },
              {
                init: "RK",
                name: "Ravi K.",
                role: "Travel Agent, Hyderabad",
                text: "I manage all my leads on WhatsApp and I lose track of at least 20–30% of them. A proper enquiry dashboard with follow-up reminders — this is what I've needed for years.",
              },
              {
                init: "AM",
                name: "Anjali M.",
                role: "Travel Agent, Lucknow",
                text: "The lifetime plan got me. I was about to spend ₹12,000 getting a website built. Same price — but now I get admin panel, enquiry tracking, hosting, support, ongoing. Not even a comparison.",
              },
            ].map(({ init, name, role, text }) => (
              <div
                key={name}
                className="tcard"
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 20,
                  padding: 32,
                  transition: "box-shadow 0.2s",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    color: "#16a34a",
                    background: "#dcfce7",
                    border: "1px solid rgba(22,163,74,0.2)",
                    padding: "4px 12px",
                    borderRadius: 50,
                    marginBottom: 18,
                  }}
                >
                  ✓ Early Access
                </div>
                <p
                  style={{
                    fontSize: 15,
                    color: "#4b5e7a",
                    lineHeight: 1.75,
                    marginBottom: 22,
                    fontStyle: "italic",
                  }}
                >
                  "{text}"
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#eff6ff",
                      border: "2px solid #dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 800,
                      color: "#2563eb",
                      flexShrink: 0,
                    }}
                  >
                    {init}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#0d1b2e",
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{ fontSize: 12, color: "#7a8fa8", marginTop: 1 }}
                    >
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section
        id="pricing"
        style={{
          background: "#fff",
          padding: "88px 40px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Eyebrow>Pricing</Eyebrow>
          <SectionTitle>
            Founding discount for the first 100 agents.
            <br />
            Starting from ₹499/month.
          </SectionTitle>
          <p
            style={{
              fontSize: 17,
              color: "#4b5e7a",
              maxWidth: 540,
              margin: "0 auto 48px",
              lineHeight: 1.7,
            }}
          >
            No commissions. No revenue share. No per-lead charges. One flat
            subscription — everything maintained for you.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 16,
            }}
          >
            {[
              {
                name: "Monthly",
                price: "₹499",
                per: "₹17/day · Billed monthly",
                save: "Start anytime",
                featured: false,
                features: [
                  "Travel marketplace website",
                  "Full admin panel",
                  "Bring your own domain",
                  "Package management",
                  "Enquiry tracking & pipeline",
                  "1-week free trial",
                ],
                cta: "Get Started →",
              },
              {
                name: "6 Months",
                price: "₹2,499",
                per: "₹14/day · Save ₹495",
                save: "Save 17%",
                featured: false,
                features: [
                  "Everything in Monthly",
                  "Domain included (we provide)",
                  "Priority email support",
                  "Package management",
                  "Enquiry tracking & pipeline",
                  "1-week free trial",
                ],
                cta: "Get Started →",
              },
              {
                name: "Yearly",
                price: "₹3,999",
                per: "₹11/day · Save ₹1,989",
                save: "Save 33%",
                featured: true,
                features: [
                  "Everything in 6-Month",
                  "Domain included",
                  "Priority WhatsApp support",
                  "Quarterly content updates",
                  "SEO meta setup included",
                  "1-week free trial",
                ],
                cta: "Get Started →",
              },
              {
                name: "Lifetime",
                price: "₹9,999",
                per: "One-time · Pay once, yours forever",
                save: "78 spots left",
                featured: false,
                features: [
                  "Everything in Yearly",
                  "Domain included — forever",
                  "Dedicated support",
                  "Ongoing content updates",
                  "First access to new features",
                  "No renewal. Ever.",
                ],
                cta: "Claim Lifetime →",
              },
            ].map(({ name, price, per, save, featured, features, cta }) => (
              <div
                key={name}
                className="pcard"
                style={{
                  background: featured ? "#0d1b2e" : "#f0f4fa",
                  border: `1.5px solid ${featured ? "#0d1b2e" : "#e2e8f0"}`,
                  borderRadius: 20,
                  padding: "28px 24px 24px",
                  position: "relative",
                  transition: "border-color 0.2s",
                  textAlign: "left",
                }}
              >
                {featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: -13,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#2563eb",
                      color: "#fff",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "4px 16px",
                      borderRadius: 50,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: featured ? "rgba(255,255,255,0.45)" : "#7a8fa8",
                    marginBottom: 14,
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 800,
                    color: featured ? "#fff" : "#0d1b2e",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {price}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: featured ? "rgba(255,255,255,0.4)" : "#7a8fa8",
                    marginBottom: 14,
                  }}
                >
                  {per}
                </div>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 50,
                    marginBottom: 18,
                    background: featured
                      ? "rgba(255,255,255,0.1)"
                      : "#dcfce7",
                    color: featured ? "rgba(255,255,255,0.7)" : "#16a34a",
                  }}
                >
                  {save}
                </span>
                <div
                  style={{
                    height: 1,
                    background: featured ? "rgba(255,255,255,0.1)" : "#e2e8f0",
                    marginBottom: 18,
                  }}
                />
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 9,
                    marginBottom: 22,
                  }}
                >
                  {features.map((f) => (
                    <li
                      key={f}
                      style={{
                        fontSize: 13,
                        color: featured
                          ? "rgba(255,255,255,0.65)"
                          : "#4b5e7a",
                        display: "flex",
                        gap: 8,
                        alignItems: "flex-start",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          color: featured ? "#93c5fd" : "#16a34a",
                          fontWeight: 800,
                          fontSize: 12,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    document
                      .getElementById("get-started")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    width: "100%",
                    padding: 12,
                    borderRadius: 50,
                    fontSize: 14,
                    fontWeight: 700,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    background: featured ? "#2563eb" : "transparent",
                    color: featured ? "#fff" : "#0d1b2e",
                    border: featured ? "none" : "1.5px solid #cbd5e1",
                  }}
                >
                  {cta}
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              background: "#f0f4fa",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              padding: "20px 24px",
              fontSize: 13.5,
              color: "#7a8fa8",
              lineHeight: 1.7,
              textAlign: "center",
            }}
          >
            <strong style={{ color: "#0d1b2e" }}>Domain Note:</strong> We
            provision and configure your domain as part of the subscription.
            Domain provisioning by us requires a minimum 6-month plan. You can
            also bring your own domain on any plan. ·{" "}
            <strong style={{ color: "#0d1b2e" }}>
              All plans include a 1-week free trial.
            </strong>{" "}
            ·{" "}
            <strong style={{ color: "#0d1b2e" }}>
              Lifetime plan is limited to the first 100 agents.
            </strong>{" "}
            78 founding spots remaining.
          </div>
        </div>
      </section>

      {/* ── CTA FORM (main, instance 3) ── */}
      <section
        id="get-started"
        style={{ background: "#f0f4fa", padding: "88px 40px" }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(30px,4vw,50px)",
                fontWeight: 800,
                color: "#0d1b2e",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 18,
              }}
            >
              Get your own travel website{" "}
              <span style={{ color: "#2563eb" }}>today.</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#4b5e7a",
                lineHeight: 1.75,
                marginBottom: 36,
              }}
            >
              Stop losing leads on WhatsApp. Stop sending customers to someone
              else's platform. Your website. Your brand. Your bookings —
              starting at ₹499/month.
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {[
                {
                  icon: "🎁",
                  title: "Founding Discount",
                  sub: "Locked in permanently on submission. Not available after 100 agents.",
                },
                {
                  icon: "⚡",
                  title: "1-Week Free Trial",
                  sub: "Explore the full platform before paying a single rupee.",
                },
                {
                  icon: "🌐",
                  title: "Live in 48 Hours",
                  sub: "Full website on your domain. We handle every technical detail.",
                },
                {
                  icon: "♾️",
                  title: "Lifetime Plan Available",
                  sub: "Pay ₹9,999 once — same price as a freelancer build, but forever.",
                },
              ].map(({ icon, title, sub }) => (
                <div
                  key={title}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      borderRadius: 12,
                      background: "#eff6ff",
                      border: "1px solid #dbeafe",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#0d1b2e",
                        marginBottom: 2,
                      }}
                    >
                      {title}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#7a8fa8",
                        lineHeight: 1.55,
                      }}
                    >
                      {sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AgentContactForm />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0d1b2e", padding: "56px 40px 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
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
                Orbitle for Agents
              </div>
              <p
                style={{
                  fontSize: 13.5,
                  color: "rgba(255,255,255,0.4)",
                  lineHeight: 1.7,
                  marginBottom: 18,
                }}
              >
                A travel website and admin panel for independent travel agents,
                by TrigrowTech. Your brand. Your domain. Your bookings.
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
            {[
              {
                heading: "Platform",
                links: [
                  "Travel Marketplace",
                  "Admin Panel",
                  "Package Management",
                  "Enquiry Tracking",
                ],
              },
              {
                heading: "Company",
                links: [
                  "About TrigrowTech",
                  "Careers",
                  "Contact",
                ],
                extra: { label: "For Operators ↗", href: "/" },
              },
              {
                heading: "Resources",
                links: [
                  "Get Your Website",
                  "See Pricing",
                  "Book a Demo",
                  "Privacy Policy",
                  "Terms of Service",
                ],
              },
            ].map(({ heading, links, extra }: any) => (
              <div key={heading}>
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
                  {heading}
                </h4>
                {links.map((l: string) => (
                  <a
                    key={l}
                    href="#"
                    style={{
                      display: "block",
                      fontSize: 13.5,
                      color: "rgba(255,255,255,0.45)",
                      textDecoration: "none",
                      marginBottom: 11,
                      transition: "color 0.15s",
                    }}
                  >
                    {l}
                  </a>
                ))}
                {extra && (
                  <Link
                    href={extra.href}
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
                    {extra.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
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
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    textDecoration: "none",
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── SMALL HELPERS ── */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-block",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#2563eb",
        background: "#eff6ff",
        padding: "5px 14px",
        borderRadius: 20,
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <h2
      style={{
        fontSize: "clamp(30px,4vw,50px)",
        fontWeight: 800,
        color: "#0d1b2e",
        letterSpacing: "-0.03em",
        lineHeight: 1.08,
        marginBottom: 16,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function SectionSub({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 17,
        color: "#4b5e7a",
        maxWidth: 540,
        lineHeight: 1.7,
        marginBottom: 56,
      }}
    >
      {children}
    </p>
  );
}
