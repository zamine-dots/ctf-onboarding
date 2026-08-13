# Sector Zero — IEEE-CS CTF Starting Point (Phase 1)

A self-paced "taste test" app for new IEEE-CS members starting CTF. Members pick a callsign, then work
through **235 curated beginner challenges** across 8 CTF categories to find out which ones click for them,
before committing to a specialization in later phases.

Static site — Vite + React + TypeScript + Tailwind v4. No backend, no accounts, no database.

## What it does

- **Start here (SEC-00):** OverTheWire Bandit levels 0–9 — the Linux/SSH basics every other category assumes.
- **8 tracks (SEC-01–08):** Web Exploitation, Cryptography, Forensics, Reverse Engineering, Binary
  Exploitation, OSINT, Steganography, Misc/Scripting.
- **27 resources, 235 checkable challenges.** Each track holds 3–4 free platforms, and each platform expands
  into up to 10 individually checkable named beginner challenges — so members tick off *"Level 3 — spaces in
  the filename"*, not just *"Bandit"*. Platforms covered: OverTheWire (Bandit, Natas, Narnia), CyLab Security
  Academy, PortSwigger Web Security Academy, OWASP Juice Shop, CryptoHack, CTFlearn, Root-Me, crackmes.one,
  pwnable.kr, gralhix OSINT exercises, TryHackMe, StegOnline.
- **Progress tracking:** progress is saved in `localStorage`, scoped per callsign, so several members sharing
  one browser still get separate case files. Export/import downloads or loads a `.json` file for backup or
  moving devices.
- **Debrief panel:** once someone has logged challenges in 2+ tracks, they get a readout of where their
  completions are clustering — a nudge, not a verdict — to open the Phase 2 conversation.

| Track | Resources | Challenges |
| --- | --- | --- |
| SEC-00 Field Basics | 1 | 10 |
| SEC-01 Web Exploitation | 4 | 40 |
| SEC-02 Cryptography | 4 | 33 |
| SEC-03 Forensics | 3 | 30 |
| SEC-04 Reverse Engineering | 3 | 30 |
| SEC-05 Binary Exploitation | 3 | 30 |
| SEC-06 OSINT | 3 | 12 |
| SEC-07 Steganography | 3 | 20 |
| SEC-08 Misc / Scripting | 3 | 30 |

## Local development

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # tsc + vite build → dist/
npm run lint    # oxlint
```

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **New Project → Import** the repo.
3. Framework preset: **Vite** (auto-detected). No environment variables or backend needed — fully static.
4. Deploy. `localStorage` runs entirely in each visitor's browser, so there's no database to provision.

## Editing the content

Everything lives in `src/data/sectors.ts`. The model is three levels deep:

```
Sector (a track)  →  Resource (a platform)  →  Challenge (one checkable item)
```

```ts
interface Challenge {
  id: string;      // stable + globally unique — this is the localStorage key, never reuse or renumber
  name: string;    // shown in the checklist
  url?: string;    // optional deep link to that specific challenge
  note?: string;   // one-line hint, hidden once checked
}

interface Resource {
  id: string;
  title: string;
  platform: string;             // shown as a small uppercase label
  url: string;                  // where the external-link button goes
  level: "starter" | "easy" | "moderate";
  access: "no-signup" | "free-account" | "local";
  blurb: string;                // what the platform is
  tip: string;                  // how to actually get started on it
  selfDirected?: boolean;       // list is numbered slots, not named challenges (see below)
  listNote?: string;            // caveat shown above the checklist
  challenges: Challenge[];
}
```

`id` is the only field you must treat as immutable — completion state is stored as a map of challenge `id` →
timestamp, so renaming an `id` silently orphans everyone's progress on that item. Names, notes, and URLs are
safe to edit freely.

### Self-directed slots

Some platforms don't publish an enumerable beginner list — CTFlearn's browser is login-gated, Root-Me blocks
automated access, and crackmes.one is user-submitted and constantly churning. Rather than invent challenge
names that may not exist, those resources use `selfDirected: true` and get 10 numbered slots via the `slots()`
helper ("Cryptography pick #1 … #10"), plus a `listNote` explaining that the member picks their own from the
platform's beginner filter. Eight of the 27 resources work this way; the other 19 have real, verified titles.

### Link maintenance

Free-tier availability shifts, so re-check links each semester. Known moving parts:

- **CyLab Security Academy** (`play.picoctf.org/practice`) is the official practice index for the former
  **picoCTF** content. Challenge titles carried over from the old picoGym, but per-challenge deep links did
  not survive the migration, so CyLab challenges intentionally all point at the practice index and are found
  by searching the title. A handful may have been renamed.
- **CTFlearn**'s browse URL is `ctflearn.com/challenge/1/browse` (plain `/challenge` 404s), and its live
  category filters are Web, Forensics, Binary, Reverse Engineering, Cryptography, Programming, Miscellaneous
  — there is **no** OSINT or Steganography category, so stego items point at the Forensics filter.
- **TryHackMe** rooms occasionally move behind the subscription wall; only free rooms are listed.

## Notes on the per-member progress model

No backend or accounts — each member's progress lives in their own browser's `localStorage`, keyed by the
callsign they typed:

| Key | Contents |
| --- | --- |
| `sz:roster` | array of callsigns seen on this device |
| `sz:active` | the currently signed-in callsign |
| `sz:profile:<lowercased-callsign>` | `{ callsign, createdAt, completed: { [challengeId]: isoTimestamp } }` |

- If everyone uses their own laptop/phone, progress is isolated automatically — no setup.
- On a shared lab computer, have each person enter their own callsign; separate case files are kept per
  callsign on that device (**Switch operative** in the profile menu, top right).
- Export/import carries progress between devices, or lets you collect `.json` files for a manual roster-wide
  view.

**Upgrading from the pre-nesting version:** challenges used to be tracked one-per-resource, so old profiles
contain resource-level ids like `web-portswigger` that no longer match any challenge. The keys above are
unchanged, so existing case files still load and nothing is lost — but those legacy ids are now inert and
won't light up any checkbox. Members who tracked progress under the old flat list will see their counts reset
to 0 and need to re-tick at the new per-challenge granularity.
