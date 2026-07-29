# Sector Zero — IEEE-CS CTF Recon (Phase 1)

A self-paced "taste test" app for new IEEE-CS members starting their CTF journey. Members register a
callsign, then work through curated entry-level challenges across 8 CTF categories to find out which ones
click for them, before committing to a specialization in later phases.

## What it does

- **Prologue (SEC-00):** OverTheWire Bandit — the Linux/SSH basics every other category assumes.
- **8 sectors (SEC-01–08):** Web Exploitation, Cryptography, Forensics, Reverse Engineering, Binary
  Exploitation, OSINT, Steganography, and Misc/Scripting — each with 3-4 real, free, curated challenges and
  direct links out to the platform hosting them (OverTheWire, picoCTF, CryptoHack, TryHackMe, CTFlearn,
  PortSwigger, crackmes.one, pwnable.kr, Root-Me).
- **Progress tracking:** each member enters a "callsign" and checks off challenges as they complete them.
  Progress is saved in `localStorage`, scoped per callsign, so multiple members sharing one browser still get
  separate case files. There's an export/import button (downloads/loads a `.json` file) so members can back
  up progress or move it to another device.
- **Debrief panel:** once someone has logged progress in 2+ sectors, they get a simple readout of where their
  completions are clustering — a light nudge, not a verdict — meant to open the conversation about which
  category to go deeper on in Phase 2.

## Local development

```bash
npm install
npm run dev
```

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **New Project → Import** the repo.
3. Framework preset: **Vite** (auto-detected). No environment variables or backend needed — it's fully
   static.
4. Deploy. That's it — `localStorage` runs entirely in each visitor's browser, so no database is required.

## Editing the challenge list

All content lives in `src/data/sectors.ts` — a plain array of sectors, each with a `challenges` array
(`title`, `source`, `url`, `difficulty`, `brief`, `intel`). Add, remove, or re-link challenges there; no other
file needs to change. A few links (TryHackMe rooms, CTFlearn categories) are worth double-checking each
semester since free-tier availability and specific challenge sets shift over time.

## Notes on the "per-member progress" model

This app has no backend or accounts — it's a static site. Each member's progress lives in their own
browser's `localStorage`, tied to the callsign they typed in. In practice that means:

- If every member uses their own laptop/phone, progress is automatically isolated — no setup needed.
- If members share a lab computer, have each person enter their own callsign; the app keeps separate case
  files per callsign on that device (see the "Switch operative" option in the profile menu, top right).
- Export/import lets someone carry their progress between devices, or lets you collect `.json` files from
  members if you want a manual roster-wide view later.
