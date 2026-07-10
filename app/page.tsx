"use client";

import React from "react";

// ---------------------------------------------
// CONFIG — swap these values for your own content
// ---------------------------------------------
const CONFIG = {
  brandName: "Your Dating Channel",
  headline: "Join Our Dating Community",
  subheadline: "Meet new people, chat, and make real connections — all in one place.",
  ctaText: "JOIN TELEGRAM CHANNEL",
  whatsappLink: "https://t.me/+cFEY82mMorYxZGRk",
  features: [
    {
      title: "Daily Matches",
      description: "Fresh profiles and conversation starters shared every day.",
      icon: "💕",
    },
    {
      title: "Exclusive Perks",
      description: "Get access to events and features only for channel members.",
      icon: "🎁",
    },
    {
      title: "Friendly Community",
      description: "A respectful space to meet people and chat with confidence.",
      icon: "💬",
    },
  ],
  about: {
    title: "About Us",
    body:
      "We're a community built for singles looking to meet new people in a friendly, respectful space. Join our Telegram channel to stay connected and never miss a new member or update.",
  },
  footerText: `© ${new Date().getFullYear()} ${"Your Dating Channel"}. All rights reserved.`,
};

export default function LandingPage() {
  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.logo}>{CONFIG.brandName}</div>
        </div>
      </header>

      {/* Hero */}
      <section style={styles.hero}>
        <h1 style={styles.headline}>{CONFIG.headline}</h1>
        <p style={styles.subheadline}>{CONFIG.subheadline}</p>

        <a
          href={CONFIG.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.ctaButton}
        >
          <WhatsAppIcon />
          {CONFIG.ctaText}
        </a>

        <div style={styles.checklist}>
          {CONFIG.features.map((f, i) => (
            <span key={i} style={styles.checklistItem}>
              ✓ {f.title}
            </span>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section style={styles.features}>
        {CONFIG.features.map((f, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardIcon}>{f.icon}</div>
            <h3 style={styles.cardTitle}>{f.title}</h3>
            <p style={styles.cardText}>{f.description}</p>
          </div>
        ))}
      </section>

      {/* About / info section */}
      <section style={styles.about}>
        <h2 style={styles.aboutTitle}>{CONFIG.about.title}</h2>
        <p style={styles.aboutBody}>{CONFIG.about.body}</p>
      </section>

      {/* Bottom CTA */}
      <section style={styles.bottomCta}>
        <h2 style={styles.bottomCtaTitle}>Ready to join?</h2>
        <a
          href={CONFIG.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.ctaButton}
        >
          <WhatsAppIcon />
          {CONFIG.ctaText}
        </a>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>{CONFIG.footerText}</p>
      </footer>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 240 240"
      fill="currentColor"
      style={{ marginRight: 10, flexShrink: 0 }}
    >
      <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0zm55.2 79.9-19.6 92.5c-1.5 6.7-5.4 8.3-10.9 5.2l-30.1-22.2-14.5 14c-1.6 1.6-3 3-6.1 3l2.2-30.9 56.2-50.8c2.4-2.2-.5-3.4-3.8-1.2l-69.5 43.8-29.9-9.3c-6.5-2-6.6-6.5 1.4-9.6l116.8-45c5.4-2 10.2 1.3 8.2 9.5z" />
    </svg>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#128C4A",
    padding: "18px 24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  headerInner: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 0.3,
  },
  hero: {
    textAlign: "center",
    padding: "64px 20px 40px",
    maxWidth: 700,
    margin: "0 auto",
  },
  headline: {
    fontSize: 38,
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: 16,
    color: "#111",
  },
  subheadline: {
    fontSize: 18,
    color: "#555",
    marginBottom: 32,
    lineHeight: 1.5,
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#128C4A",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 700,
    padding: "18px 36px",
    borderRadius: 12,
    textDecoration: "none",
    boxShadow: "0 6px 16px rgba(18,140,74,0.35)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },
  checklist: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px 24px",
    marginTop: 28,
  },
  checklistItem: {
    fontSize: 14,
    color: "#128C4A",
    fontWeight: 600,
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
    maxWidth: 1000,
    margin: "20px auto 60px",
    padding: "0 20px",
  },
  card: {
    backgroundColor: "#f7faf8",
    border: "1px solid #e6ede9",
    borderRadius: 14,
    padding: "28px 22px",
    textAlign: "center",
  },
  cardIcon: {
    fontSize: 30,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: 700,
    marginBottom: 8,
    color: "#111",
  },
  cardText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 1.5,
  },
  about: {
    backgroundColor: "#f2f7f4",
    padding: "56px 20px",
    textAlign: "center",
  },
  aboutTitle: {
    fontSize: 26,
    fontWeight: 800,
    marginBottom: 14,
    color: "#111",
  },
  aboutBody: {
    fontSize: 16,
    color: "#555",
    maxWidth: 640,
    margin: "0 auto",
    lineHeight: 1.6,
  },
  bottomCta: {
    textAlign: "center",
    padding: "60px 20px",
  },
  bottomCtaTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 24,
    color: "#111",
  },
  footer: {
    backgroundColor: "#111111",
    padding: "24px 20px",
    textAlign: "center",
    marginTop: "auto",
  },
  footerText: {
    color: "#aaa",
    fontSize: 13,
  },
};