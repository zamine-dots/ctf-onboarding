export type Difficulty = "recon" | "field" | "deep";

export interface Challenge {
  id: string;
  title: string;
  source: string;
  url: string;
  difficulty: Difficulty;
  brief: string;
  intel: string; // small tactical tip, not a full spoiler/solution
}

export interface Sector {
  id: string;
  code: string; // e.g. SEC-01
  name: string; // real-world category name
  codename: string; // in-world sector name
  dossier: string; // narrative flavor text
  skill: string; // one line on what this teaches, in plain terms
  isPrologue?: boolean;
  challenges: Challenge[];
}

export const sectors: Sector[] = [
  {
    id: "prologue",
    code: "SEC-00",
    name: "Field Basics",
    codename: "The Wire",
    dossier:
      "Before any operative deploys into a sector, they need to move through a terminal without hesitation. This is the corridor every other sector opens onto.",
    skill: "Linux command line, SSH, and file navigation — the tools every other category assumes you already have.",
    isPrologue: true,
    challenges: [
      {
        id: "bandit",
        title: "Bandit — Level 0",
        source: "OverTheWire",
        url: "https://overthewire.org/wargames/bandit/bandit0.html",
        difficulty: "recon",
        brief:
          "34 progressive levels, no signup. Connect over SSH and read a password out of the filesystem to reach the next level.",
        intel: "Read the connection info at the top of the page carefully — it tells you the exact SSH command to run.",
      },
    ],
  },
  {
    id: "web",
    code: "SEC-01",
    name: "Web Exploitation",
    codename: "Glass House",
    dossier:
      "Every storefront, portal, and login page is a surface. Sector Glass House trains you to see the code the browser doesn't show you.",
    skill: "Reading page source, tampering with requests, and spotting logic flaws in websites.",
    challenges: [
      {
        id: "natas0",
        title: "Natas — Level 0",
        source: "OverTheWire",
        url: "http://natas0.natas.labs.overthewire.org",
        difficulty: "recon",
        brief: "A live vulnerable website, no signup. Find the password hidden in the page for level 0.",
        intel: "Username and password for level 0 are both natas0 — the point is just to get you looking at page source.",
      },
      {
        id: "psacademy",
        title: "Web Security Academy — Free labs",
        source: "PortSwigger",
        url: "https://portswigger.net/web-security",
        difficulty: "field",
        brief: "Industry-standard, free labs on real vulnerability classes: SQL injection, XSS, access control, and more.",
        intel: "Start with the SQL Injection or Cross-Site Scripting topic — each has a short explainer before the lab.",
      },
      {
        id: "pico-web",
        title: "picoCTF Practice — Web Exploitation",
        source: "picoCTF",
        url: "https://play.picoctf.org/practice",
        difficulty: "recon",
        brief: "Free account, filter by Web Exploitation. Bite-sized challenges built for first-timers.",
        intel: "Sort by difficulty ascending and start from the top of the list.",
      },
      {
        id: "juiceshop",
        title: "OWASP Juice Shop",
        source: "OWASP",
        url: "https://owasp.org/www-project-juice-shop/",
        difficulty: "field",
        brief: "A deliberately insecure shopping app used worldwide to teach web hacking, with a built-in scoreboard.",
        intel: "Runs locally with Docker or npm — the project page has one-line run instructions.",
      },
    ],
  },
  {
    id: "crypto",
    code: "SEC-02",
    name: "Cryptography",
    codename: "Cipher Room",
    dossier:
      "Somewhere in this sector, a message is hiding in plain sight — encoded, encrypted, or just badly implemented. Your job is to break the math, not guess it.",
    skill: "Classical ciphers, encoding formats, and where real cryptographic implementations go wrong.",
    challenges: [
      {
        id: "cryptohack-intro",
        title: "Introduction track",
        source: "CryptoHack",
        url: "https://cryptohack.org/challenges/introduction/",
        difficulty: "recon",
        brief: "The best on-ramp into modern crypto CTFs. Walks you through solving and submitting your first flags.",
        intel: "This track exists purely to teach the platform's flow — every challenge is solvable with patience alone.",
      },
      {
        id: "cryptohack-full",
        title: "Full challenge set",
        source: "CryptoHack",
        url: "https://cryptohack.org/challenges/",
        difficulty: "field",
        brief: "RSA, block ciphers, elliptic curves, and Diffie-Hellman, organized as a skill tree.",
        intel: "Stay in the earliest unlocked category before jumping to RSA — it builds on itself.",
      },
      {
        id: "pico-crypto",
        title: "picoCTF Practice — Cryptography",
        source: "picoCTF",
        url: "https://play.picoctf.org/practice",
        difficulty: "recon",
        brief: "Filter by Cryptography for short, self-contained cipher-breaking challenges.",
        intel: "Look for challenges mentioning 'base64', 'XOR', or 'Caesar' first — classic warm-ups.",
      },
      {
        id: "ctflearn-crypto",
        title: "Cryptography category",
        source: "CTFlearn",
        url: "https://ctflearn.com/challenge",
        difficulty: "recon",
        brief: "Free account, huge community-built archive. Filter by category and sort easiest first.",
        intel: "Check the discussion tab on a challenge if you're stuck — community hints are usually spoiler-tagged.",
      },
    ],
  },
  {
    id: "forensics",
    code: "SEC-03",
    name: "Forensics",
    codename: "Evidence Locker",
    dossier:
      "A file, a memory dump, a packet capture — something was left behind. Sector Evidence Locker trains you to pull a story out of raw data.",
    skill: "Examining files, metadata, memory dumps, and network captures for hidden artifacts.",
    challenges: [
      {
        id: "pico-forensics",
        title: "picoCTF Practice — Forensics",
        source: "picoCTF",
        url: "https://play.picoctf.org/practice",
        difficulty: "recon",
        brief: "Filter by Forensics. Great first exposure to file headers, metadata, and hidden data.",
        intel: "Install `exiftool` and `binwalk` before you start — you'll reach for both constantly.",
      },
      {
        id: "ctflearn-forensics",
        title: "Forensics category",
        source: "CTFlearn",
        url: "https://ctflearn.com/challenge",
        difficulty: "recon",
        brief: "Free account. A deep, community-sourced archive of forensics challenges sorted by points/difficulty.",
        intel: "Lower point values roughly track easier difficulty — start under 50 points.",
      },
      {
        id: "thm-free",
        title: "Free rooms — filter Forensics",
        source: "TryHackMe",
        url: "https://tryhackme.com/hacktivities?tab=free",
        difficulty: "field",
        brief: "Browser-based VMs walk you through real forensic investigations, no local setup required.",
        intel: "Use the tag filter on the left to narrow to Forensics — stick to rooms marked Free.",
      },
    ],
  },
  {
    id: "reverse",
    code: "SEC-04",
    name: "Reverse Engineering",
    codename: "Blackbox",
    dossier:
      "You're handed a program with no source code and no explanation. Sector Blackbox is about reading a machine's intentions from its bytes.",
    skill: "Disassembling and decompiling programs to understand — and defeat — their logic.",
    challenges: [
      {
        id: "crackmes",
        title: "Beginner crackmes",
        source: "crackmes.one",
        url: "https://crackmes.one/",
        difficulty: "recon",
        brief: "No signup. A huge library of small reverse-engineering puzzles, filterable by difficulty and language.",
        intel: "Filter difficulty to 1-2 stars and grab a Ghidra or IDA Free install before you start.",
      },
      {
        id: "pico-re",
        title: "picoCTF Practice — Reverse Engineering",
        source: "picoCTF",
        url: "https://play.picoctf.org/practice",
        difficulty: "recon",
        brief: "Filter by Reverse Engineering for short binaries with a single flag hidden in the logic.",
        intel: "Try `strings` on the binary before opening a disassembler — sometimes the flag is just sitting there.",
      },
      {
        id: "ctflearn-re",
        title: "Reverse Engineering category",
        source: "CTFlearn",
        url: "https://ctflearn.com/challenge",
        difficulty: "field",
        brief: "Free account. Community archive with a healthy spread of beginner-friendly binaries.",
        intel: "Sort by difficulty rating (not points) — the community rating is usually more honest.",
      },
    ],
  },
  {
    id: "pwn",
    code: "SEC-05",
    name: "Binary Exploitation",
    codename: "Deadbolt",
    dossier:
      "Somewhere in this program's memory is a door that was never meant to open. Sector Deadbolt is the deepest, sharpest sector — respect it.",
    skill: "Memory corruption, buffer overflows, and taking control of a running program.",
    challenges: [
      {
        id: "narnia",
        title: "Narnia — Level 0",
        source: "OverTheWire",
        url: "https://overthewire.org/wargames/narnia/",
        difficulty: "field",
        brief: "10 levels, no signup, source code provided for every level. The standard first step into pwn.",
        intel: "You get the source for each level — read it fully before touching a debugger.",
      },
      {
        id: "pwnablekr",
        title: "Pwnable.kr — 'fd' and early toddler challenges",
        source: "pwnable.kr",
        url: "https://pwnable.kr/",
        difficulty: "field",
        brief: "No signup. A legendary, non-commercial wargame — start with the lowest-point 'toddler' challenges.",
        intel: "SSH details are on each challenge page once you're logged into the site with the given guest creds.",
      },
      {
        id: "pico-pwn",
        title: "picoCTF Practice — Binary Exploitation",
        source: "picoCTF",
        url: "https://play.picoctf.org/practice",
        difficulty: "recon",
        brief: "Filter by Binary Exploitation for the gentlest possible introduction to the category.",
        intel: "These are the friendliest pwn challenges on the internet — perfect before Narnia or pwnable.kr.",
      },
    ],
  },
  {
    id: "osint",
    code: "SEC-06",
    name: "OSINT",
    codename: "Open Sky",
    dossier:
      "No exploit, no shell — just a name, a photo, or a username, and the entire public internet. Sector Open Sky rewards patience and lateral thinking.",
    skill: "Finding and connecting publicly available information to answer a specific question.",
    challenges: [
      {
        id: "ohsint",
        title: "OhSINT",
        source: "TryHackMe",
        url: "https://tryhackme.com/r/room/ohsint",
        difficulty: "recon",
        brief: "The classic free beginner OSINT room. One image, one trail of breadcrumbs.",
        intel: "Check image metadata first, then follow every username you find to its other platforms.",
      },
      {
        id: "searchlight",
        title: "Searchlight — an OSINT Workshop",
        source: "TryHackMe",
        url: "https://tryhackme.com/r/room/searchlightosint",
        difficulty: "field",
        brief: "A structured walkthrough of real OSINT techniques and tools, not just a single puzzle.",
        intel: "Take notes as you go — this room teaches a repeatable methodology, not a one-off trick.",
      },
      {
        id: "ctflearn-osint",
        title: "OSINT category",
        source: "CTFlearn",
        url: "https://ctflearn.com/challenge",
        difficulty: "recon",
        brief: "Free account. Short, self-contained OSINT puzzles to drill the same muscle repeatedly.",
        intel: "Reverse image search is your single most useful tool in this category — learn it well.",
      },
    ],
  },
  {
    id: "stego",
    code: "SEC-07",
    name: "Steganography",
    codename: "False Wall",
    dossier:
      "The file looks completely ordinary. That's the point. Sector False Wall is about noticing what a picture, sound, or file isn't telling you.",
    skill: "Finding data deliberately hidden inside images, audio, or other ordinary-looking files.",
    challenges: [
      {
        id: "pico-stego",
        title: "picoCTF Practice — Forensics/Stego",
        source: "picoCTF",
        url: "https://play.picoctf.org/practice",
        difficulty: "recon",
        brief: "Stego challenges usually live under the Forensics filter here — a solid, guided first exposure.",
        intel: "Try `exiftool`, `strings`, and `binwalk` on any file before reaching for anything fancier.",
      },
      {
        id: "stegonline",
        title: "StegOnline (analysis tool)",
        source: "georgeom.net",
        url: "https://georgeom.net/StegOnline/upload",
        difficulty: "recon",
        brief: "A free browser-based toolkit for LSB extraction and image-bit analysis — pair it with any stego challenge above.",
        intel: "Use this alongside a picoCTF or CTFlearn stego challenge rather than as a challenge source on its own.",
      },
      {
        id: "ctflearn-stego",
        title: "Steganography category",
        source: "CTFlearn",
        url: "https://ctflearn.com/challenge",
        difficulty: "recon",
        brief: "Free account. A dedicated Steganography filter with plenty of beginner-rated entries.",
        intel: "Sort easiest-first and expect most early answers to hide in file metadata, not the pixels.",
      },
    ],
  },
  {
    id: "misc",
    code: "SEC-08",
    name: "Misc / Scripting",
    codename: "Loose Ends",
    dossier:
      "Every CTF has the category that doesn't fit anywhere else — a bit of code, a weird protocol, a puzzle with no category badge. Sector Loose Ends is where generalists shine.",
    skill: "Quick scripting, pattern recognition, and problem-solving that doesn't map to one specific skill.",
    challenges: [
      {
        id: "pico-misc",
        title: "picoCTF Practice — General Skills",
        source: "picoCTF",
        url: "https://play.picoctf.org/practice",
        difficulty: "recon",
        brief: "Filter by General Skills — the category built specifically to teach CTF fundamentals.",
        intel: "This is genuinely the best single starting filter on the whole platform if you're brand new.",
      },
      {
        id: "rootme",
        title: "Root-Me — Challenges directory",
        source: "Root-Me",
        url: "https://www.root-me.org/en/Challenges/",
        difficulty: "field",
        brief: "A massive, free challenge library spanning programming, cracking, and network puzzles.",
        intel: "The 'Programming' and 'Cracking' sub-categories are the friendliest entry points here.",
      },
      {
        id: "ctflearn-misc",
        title: "Misc category",
        source: "CTFlearn",
        url: "https://ctflearn.com/challenge",
        difficulty: "recon",
        brief: "Free account. The Misc filter catches everything from trivia to quick scripting puzzles.",
        intel: "Keep a Python REPL open in a second window — half of this category is just quick scripting.",
      },
    ],
  },
];

export const difficultyLabel: Record<Difficulty, string> = {
  recon: "Recon",
  field: "Field",
  deep: "Deep Cover",
};
