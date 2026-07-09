"use client";

import React from "react";

// ---------------------------------------------
// CONFIG — swap these values for your own content
// ---------------------------------------------
const CONFIG = {
  brandName: "Free Legit Aviator Daily Predictions",
  headline: "Join Our Community",
  subheadline: "Get updates, resources, and support — all in one place.",
  ctaText: "JOIN WHATSAPP GROUP",
  whatsappLink: "https://chat.whatsapp.com/CjcuFenFBRxBJ0iOehSk2q?s=cl&p=a&ilr=4",
  features: [
    {
      title: "Daily Updates",
      description: "Stay in the loop with fresh content shared every day.",
      icon: "",
    },
    {
      title: "Exclusive Offers",
      description: "Get access to deals and perks only for group members.",
      icon: "",
    },
    {
      title: "Real Support",
      description: "Ask questions and get help from a real community.",
      icon: "",
    },
  ],
  about: {
    title: "About Us",
    body:
      "We're a community built around sharing useful information and helping each other out. Join us on WhatsApp to stay connected and never miss an update.",
  },
  footerText: `© ${new Date().getFullYear()} ${"Your Community"}. All rights reserved.`,
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
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ marginRight: 10, flexShrink: 0 }}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38c1.44.79 3.07 1.2 4.72 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 01-1.25-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 012.41 5.83c0 4.55-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.41 1.02 2.58.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29z" />
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