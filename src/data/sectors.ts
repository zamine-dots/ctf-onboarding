export type Level = "starter" | "easy" | "moderate";
export type Access = "no-signup" | "free-account" | "local";

/** A single checkable item. Most map to a real, named challenge on the host platform. */
export interface Challenge {
  id: string;
  name: string;
  /** Deep link, when the platform has a stable per-challenge URL. Otherwise the parent resource link is used. */
  url?: string;
  /** Short nudge — a direction to look in, never a solution. */
  note?: string;
}

export interface Resource {
  id: string;
  title: string;
  platform: string;
  url: string;
  level: Level;
  access: Access;
  blurb: string;
  tip: string;
  /**
   * True when the platform's challenge list can't be enumerated publicly (login-gated or
   * user-submitted), so the items below are numbered slots to fill against a filter
   * rather than specific named challenges.
   */
  selfDirected?: boolean;
  /** Caveat shown above the checklist. */
  listNote?: string;
  challenges: Challenge[];
}

export interface Sector {
  id: string;
  code: string;
  name: string;
  codename: string;
  /** Hex, applied as a CSS custom property so Tailwind never needs a dynamic class. */
  accent: string;
  skill: string;
  intro: string;
  isPrologue?: boolean;
  resources: Resource[];
}

/** Numbered slots for platforms whose challenge lists aren't publicly enumerable. */
function slots(prefix: string, label: string, count = 10): Challenge[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    name: `${label} #${i + 1}`,
  }));
}

const CYLAB_LIBRARY = "https://play.picoctf.org/practice";
const CYLAB_NOTE =
  "picoCTF became CyLab Security Academy in May 2026. Challenge titles carried over from the old picoGym, but a few may have been renamed — search the practice index by title.";

export const sectors: Sector[] = [
  {
    id: "prologue",
    code: "SEC-00",
    name: "Field Basics",
    codename: "The Wire",
    accent: "#94A3B8",
    skill: "Linux command line, SSH, and file navigation — assumed by every other category.",
    intro:
      "Start here. Every other track expects you to move around a terminal without thinking about it, and this is the fastest way to get there.",
    isPrologue: true,
    resources: [
      {
        id: "bandit",
        title: "Bandit — Levels 0–9",
        platform: "OverTheWire",
        url: "https://overthewire.org/wargames/bandit/bandit0.html",
        level: "starter",
        access: "no-signup",
        blurb:
          "34 progressive SSH levels, no signup. Each level hides a password somewhere in the filesystem that gets you into the next one.",
        tip: "Connect with `ssh bandit0@bandit.labs.overthewire.org -p 2220`. Password for level 0 is bandit0.",
        challenges: [
          {
            id: "bandit-0",
            name: "Level 0 — connect over SSH",
            url: "https://overthewire.org/wargames/bandit/bandit0.html",
            note: "The whole level is just logging in and running `ls` and `cat`.",
          },
          { id: "bandit-1", name: "Level 1 — read a plain file", url: "https://overthewire.org/wargames/bandit/bandit1.html" },
          {
            id: "bandit-2",
            name: "Level 2 — a file named -",
            url: "https://overthewire.org/wargames/bandit/bandit2.html",
            note: "A dash confuses most commands. `./-` gets around it.",
          },
          {
            id: "bandit-3",
            name: "Level 3 — spaces in the filename",
            url: "https://overthewire.org/wargames/bandit/bandit3.html",
            note: "Quote it, or let tab-completion escape it for you.",
          },
          {
            id: "bandit-4",
            name: "Level 4 — hidden file",
            url: "https://overthewire.org/wargames/bandit/bandit4.html",
            note: "`ls -a`.",
          },
          {
            id: "bandit-5",
            name: "Level 5 — find the human-readable file",
            url: "https://overthewire.org/wargames/bandit/bandit5.html",
            note: "`file *` tells you which one isn't binary.",
          },
          {
            id: "bandit-6",
            name: "Level 6 — find by size and permissions",
            url: "https://overthewire.org/wargames/bandit/bandit6.html",
            note: "`find` takes -size and -readable flags.",
          },
          {
            id: "bandit-7",
            name: "Level 7 — find by owner across the whole disk",
            url: "https://overthewire.org/wargames/bandit/bandit7.html",
            note: "Send errors to /dev/null so real results aren't buried.",
          },
          {
            id: "bandit-8",
            name: "Level 8 — grep for a word",
            url: "https://overthewire.org/wargames/bandit/bandit8.html",
          },
          {
            id: "bandit-9",
            name: "Level 9 — the line that appears only once",
            url: "https://overthewire.org/wargames/bandit/bandit9.html",
            note: "`sort` then `uniq -u`.",
          },
        ],
      },
    ],
  },
  {
    id: "web",
    code: "SEC-01",
    name: "Web Exploitation",
    codename: "Glass House",
    accent: "#38BDF8",
    skill: "Reading page source, tampering with requests, and spotting logic flaws in websites.",
    intro:
      "The largest category in most CTFs and the one with the shortest ramp — you already know how a browser works, so you're mostly learning where sites forget to check things.",
    resources: [
      {
        id: "cylab-web",
        title: "Challenge Library — Web Exploitation",
        platform: "CyLab Security Academy",
        url: CYLAB_LIBRARY,
        level: "starter",
        access: "free-account",
        blurb:
          "Formerly picoCTF. Bite-sized web challenges written for people who have never opened devtools in anger.",
        tip: "Filter the library to Web Exploitation and sort by difficulty ascending.",
        listNote: CYLAB_NOTE,
        challenges: [
          { id: "cylab-web-inspect-html", name: "Inspect HTML", note: "View source. That's the challenge." },
          { id: "cylab-web-includes", name: "Includes", note: "Check the linked .css and .js files too." },
          { id: "cylab-web-local-authority", name: "Local Authority" },
          { id: "cylab-web-cookies", name: "Cookies", note: "Edit the cookie value in devtools and reload." },
          { id: "cylab-web-get-ahead", name: "GET aHEAD", note: "There are HTTP methods other than GET and POST." },
          { id: "cylab-web-robots", name: "Where are the robots", note: "/robots.txt lists what a site doesn't want indexed." },
          { id: "cylab-web-search-source", name: "Search source" },
          { id: "cylab-web-forbidden-paths", name: "Forbidden Paths", note: "Think about what ../ does to a file path." },
          { id: "cylab-web-power-cookie", name: "Power Cookie" },
          { id: "cylab-web-roboto-sans", name: "Roboto Sans" },
        ],
      },
      {
        id: "portswigger",
        title: "Web Security Academy — Apprentice labs",
        platform: "PortSwigger",
        url: "https://portswigger.net/web-security",
        level: "easy",
        access: "free-account",
        blurb:
          "The industry-standard free training for web vulns. Every lab comes with a written explainer of the vulnerability class first.",
        tip: "Each link below opens the topic explainer — the labs are listed inside it. Burp Suite Community is free and enough for all of these.",
        challenges: [
          {
            id: "ps-sqli-hidden-data",
            name: "SQL injection vulnerability in WHERE clause allowing retrieval of hidden data",
            url: "https://portswigger.net/web-security/sql-injection",
          },
          {
            id: "ps-sqli-login-bypass",
            name: "SQL injection vulnerability allowing login bypass",
            url: "https://portswigger.net/web-security/sql-injection",
          },
          {
            id: "ps-xss-reflected",
            name: "Reflected XSS into HTML context with nothing encoded",
            url: "https://portswigger.net/web-security/cross-site-scripting",
          },
          {
            id: "ps-xss-stored",
            name: "Stored XSS into HTML context with nothing encoded",
            url: "https://portswigger.net/web-security/cross-site-scripting",
          },
          {
            id: "ps-xss-dom-write",
            name: "DOM XSS in document.write sink using source location.search",
            url: "https://portswigger.net/web-security/cross-site-scripting",
          },
          {
            id: "ps-ac-unprotected-admin",
            name: "Unprotected admin functionality",
            url: "https://portswigger.net/web-security/access-control",
          },
          {
            id: "ps-ac-user-role-param",
            name: "User role controlled by request parameter",
            url: "https://portswigger.net/web-security/access-control",
          },
          {
            id: "ps-auth-username-enum",
            name: "Username enumeration via different responses",
            url: "https://portswigger.net/web-security/authentication",
          },
          {
            id: "ps-traversal-simple",
            name: "File path traversal, simple case",
            url: "https://portswigger.net/web-security/file-path-traversal",
          },
          {
            id: "ps-cmdi-simple",
            name: "OS command injection, simple case",
            url: "https://portswigger.net/web-security/os-command-injection",
          },
        ],
      },
      {
        id: "natas",
        title: "Natas — Levels 0–9",
        platform: "OverTheWire",
        url: "http://natas0.natas.labs.overthewire.org",
        level: "easy",
        access: "no-signup",
        blurb:
          "A live vulnerable site, no signup. Each level's password unlocks the next, and the source is always one click away.",
        tip: "Username and password are both natasN for level N — the level 0 login is natas0 / natas0.",
        challenges: [
          { id: "natas-0", name: "Level 0", url: "http://natas0.natas.labs.overthewire.org", note: "Page source." },
          { id: "natas-1", name: "Level 1", url: "http://natas1.natas.labs.overthewire.org", note: "Right-click is disabled. Devtools isn't." },
          { id: "natas-2", name: "Level 2", url: "http://natas2.natas.labs.overthewire.org", note: "That image has to be served from somewhere." },
          { id: "natas-3", name: "Level 3", url: "http://natas3.natas.labs.overthewire.org", note: "\"No one will find it\" — check robots.txt." },
          { id: "natas-4", name: "Level 4", url: "http://natas4.natas.labs.overthewire.org", note: "The server trusts a request header it shouldn't." },
          { id: "natas-5", name: "Level 5", url: "http://natas5.natas.labs.overthewire.org", note: "Look at your cookies." },
          { id: "natas-6", name: "Level 6", url: "http://natas6.natas.labs.overthewire.org" },
          { id: "natas-7", name: "Level 7", url: "http://natas7.natas.labs.overthewire.org", note: "The page name comes from the URL." },
          { id: "natas-8", name: "Level 8", url: "http://natas8.natas.labs.overthewire.org", note: "The encoding is reversible — read it backwards." },
          { id: "natas-9", name: "Level 9", url: "http://natas9.natas.labs.overthewire.org", note: "Your input lands inside a shell command." },
        ],
      },
      {
        id: "juiceshop",
        title: "Juice Shop — 1-star challenges",
        platform: "OWASP",
        url: "https://owasp.org/www-project-juice-shop/",
        level: "easy",
        access: "local",
        blurb:
          "A deliberately insecure shop app with a built-in scoreboard, used worldwide for training. Runs locally via Docker or npm.",
        tip: "Find the score board first — everything else is tracked against it. These ten are the app's own 1-star (easiest) tier.",
        challenges: [
          { id: "js-score-board", name: "Score Board", note: "Do this one first; it unlocks your view of the rest." },
          { id: "js-confidential-document", name: "Confidential Document" },
          { id: "js-dom-xss", name: "DOM XSS" },
          { id: "js-error-handling", name: "Error Handling" },
          { id: "js-privacy-policy", name: "Privacy Policy" },
          { id: "js-zero-stars", name: "Zero Stars" },
          { id: "js-bonus-payload", name: "Bonus Payload" },
          { id: "js-missing-encoding", name: "Missing Encoding" },
          { id: "js-repetitive-registration", name: "Repetitive Registration" },
          { id: "js-outdated-allowlist", name: "Outdated Allowlist" },
        ],
      },
    ],
  },
  {
    id: "crypto",
    code: "SEC-02",
    name: "Cryptography",
    codename: "Cipher Room",
    accent: "#A78BFA",
    skill: "Classical ciphers, encoding formats, and where real cryptographic implementations go wrong.",
    intro:
      "Half of this category is recognising an encoding on sight. The other half is knowing which single wrong assumption in an implementation lets the whole thing fall over.",
    resources: [
      {
        id: "cryptohack-intro",
        title: "Introduction track",
        platform: "CryptoHack",
        url: "https://cryptohack.org/challenges/introduction/",
        level: "starter",
        access: "free-account",
        blurb: "The on-ramp to the best free crypto platform there is. Teaches you how to solve and submit, nothing more.",
        tip: "Every one of these is solvable with patience alone — the point is learning the platform's flow.",
        listNote: "The Introduction track has exactly three challenges. That's the whole track, not a shortened list.",
        challenges: [
          { id: "ch-finding-flags", name: "Finding Flags", note: "2 points." },
          { id: "ch-great-snakes", name: "Great Snakes", note: "3 points. You'll run a short Python script." },
          { id: "ch-network-attacks", name: "Network Attacks", note: "5 points. Your first interactive challenge." },
        ],
      },
      {
        id: "cryptohack-general",
        title: "General — Encoding & XOR",
        platform: "CryptoHack",
        url: "https://cryptohack.org/challenges/general/",
        level: "easy",
        access: "free-account",
        blurb:
          "The two foundational sections of the General category. Everything in modern crypto CTFs assumes you can do these in your sleep.",
        tip: "Work them in order — each builds directly on the one before it. Don't skip ahead to RSA.",
        challenges: [
          { id: "ch-ascii", name: "ASCII", note: "5 points." },
          { id: "ch-hex", name: "Hex", note: "5 points." },
          { id: "ch-base64", name: "Base64", note: "10 points." },
          { id: "ch-bytes-bigints", name: "Bytes and Big Integers", note: "10 points." },
          { id: "ch-encoding-challenge", name: "Encoding Challenge", note: "40 points. Scripted, not manual." },
          { id: "ch-xor-starter", name: "XOR Starter", note: "10 points." },
          { id: "ch-xor-properties", name: "XOR Properties", note: "15 points." },
          { id: "ch-favourite-byte", name: "Favourite byte", note: "20 points. Brute-force is fine here." },
          { id: "ch-know-xor", name: "You either know, XOR you don't", note: "30 points." },
          { id: "ch-lemur-xor", name: "Lemur XOR", note: "40 points. XOR two images together." },
        ],
      },
      {
        id: "cylab-crypto",
        title: "Challenge Library — Cryptography",
        platform: "CyLab Security Academy",
        url: CYLAB_LIBRARY,
        level: "starter",
        access: "free-account",
        blurb: "Formerly picoCTF. Short, self-contained cipher-breaking with no maths prerequisites.",
        tip: "Filter to Cryptography, sort easiest first. dcode.fr will identify most classical ciphers for you.",
        listNote: CYLAB_NOTE,
        challenges: [
          { id: "cylab-crypto-mod26", name: "Mod 26", note: "The name is the hint — it's a rotation." },
          { id: "cylab-crypto-numbers", name: "The Numbers" },
          { id: "cylab-crypto-13", name: "13", note: "ROT13." },
          { id: "cylab-crypto-easy1", name: "Easy1" },
          { id: "cylab-crypto-caesar", name: "caesar" },
          { id: "cylab-crypto-sub0", name: "substitution0", note: "Frequency analysis beats guessing." },
          { id: "cylab-crypto-sub1", name: "substitution1" },
          { id: "cylab-crypto-sub2", name: "substitution2" },
          { id: "cylab-crypto-vigenere", name: "Vigenere" },
          { id: "cylab-crypto-transposition", name: "transposition-trial" },
        ],
      },
      {
        id: "ctflearn-crypto",
        title: "Cryptography — Easy filter",
        platform: "CTFlearn",
        url: "https://ctflearn.com/challenge/1/browse",
        level: "easy",
        access: "free-account",
        blurb:
          "A large community-built archive. Set Category to Cryptography and Difficulty to Easy, then work down the list.",
        tip: "Stuck? The discussion tab on each challenge usually has spoiler-tagged community hints.",
        selfDirected: true,
        listNote:
          "CTFlearn's challenge list sits behind a free login, so these are ten open slots rather than named challenges — tick one off per Easy challenge you solve in this category.",
        challenges: slots("ctflearn-crypto", "Easy crypto challenge"),
      },
    ],
  },
  {
    id: "forensics",
    code: "SEC-03",
    name: "Forensics",
    codename: "Evidence Locker",
    accent: "#34D399",
    skill: "Examining files, metadata, disk images, and network captures for hidden artifacts.",
    intro:
      "A file, a packet capture, a disk image — something was left behind. This category is mostly about knowing which tool to point at which format.",
    resources: [
      {
        id: "cylab-forensics",
        title: "Challenge Library — Forensics",
        platform: "CyLab Security Academy",
        url: CYLAB_LIBRARY,
        level: "starter",
        access: "free-account",
        blurb: "Formerly picoCTF. The best-guided first exposure to file headers, metadata, and packet captures.",
        tip: "Install exiftool, binwalk, and Wireshark before you start — you'll reach for all three constantly.",
        listNote: CYLAB_NOTE,
        challenges: [
          { id: "cylab-for-information", name: "Information", note: "Metadata. Start with exiftool." },
          { id: "cylab-for-glory-garden", name: "Glory of the Garden" },
          { id: "cylab-for-extensions", name: "extensions", note: "A file's extension and its actual type can disagree." },
          { id: "cylab-for-wireshark-doo", name: "Wireshark doo dooo do doo..." },
          { id: "cylab-for-tftp", name: "Trivial Flag Transfer Protocol" },
          { id: "cylab-for-packets-primer", name: "Packets Primer" },
          { id: "cylab-for-sleuthkit-intro", name: "Sleuthkit Intro" },
          { id: "cylab-for-sleuthkit-apprentice", name: "Sleuthkit Apprentice" },
          { id: "cylab-for-eavesdrop", name: "Eavesdrop" },
          { id: "cylab-for-like1000", name: "like1000", note: "1000 nested archives. Write a loop." },
        ],
      },
      {
        id: "ctflearn-forensics",
        title: "Forensics — Easy filter",
        platform: "CTFlearn",
        url: "https://ctflearn.com/challenge/1/browse",
        level: "easy",
        access: "free-account",
        blurb: "A deep community archive of forensics puzzles. Set Category to Forensics and Difficulty to Easy.",
        tip: "Most early answers hide in metadata or a file's trailing bytes, not in the visible content.",
        selfDirected: true,
        listNote:
          "CTFlearn's list is login-gated, so these are ten open slots — tick one off per Easy Forensics challenge you solve.",
        challenges: slots("ctflearn-forensics", "Easy forensics challenge"),
      },
      {
        id: "rootme-forensic",
        title: "Forensic category",
        platform: "Root-Me",
        url: "https://www.root-me.org/en/Challenges/Forensic/",
        level: "moderate",
        access: "free-account",
        blurb:
          "A large free challenge library with a dedicated forensics section — memory dumps, disk images, and log analysis.",
        tip: "Challenges are sorted by difficulty score on the category page. Start from the top of the list.",
        selfDirected: true,
        listNote:
          "Root-Me's challenge set rotates and its listing blocks automated reads, so these are ten open slots — work down the category page from the lowest-scored challenge.",
        challenges: slots("rootme-forensic", "Forensic challenge"),
      },
    ],
  },
  {
    id: "reverse",
    code: "SEC-04",
    name: "Reverse Engineering",
    codename: "Blackbox",
    accent: "#FBBF24",
    skill: "Disassembling and decompiling programs to understand — and defeat — their logic.",
    intro:
      "You get a program and no source. The skill being built here is patience: reading what a machine actually does instead of what you assume it does.",
    resources: [
      {
        id: "cylab-re",
        title: "Challenge Library — Reverse Engineering",
        platform: "CyLab Security Academy",
        url: CYLAB_LIBRARY,
        level: "starter",
        access: "free-account",
        blurb:
          "Formerly picoCTF. The vault-door series is the single gentlest introduction to reversing that exists — readable Java source, escalating obfuscation.",
        tip: "Run `strings` on any binary before opening a disassembler. Sometimes the flag is just sitting there.",
        listNote: CYLAB_NOTE,
        challenges: [
          { id: "cylab-re-vault-training", name: "Vault-door-training", note: "The password is in plain sight in the source." },
          { id: "cylab-re-vault-1", name: "Vault-door-1" },
          { id: "cylab-re-vault-3", name: "Vault-door-3" },
          { id: "cylab-re-vault-4", name: "Vault-door-4" },
          { id: "cylab-re-vault-5", name: "Vault-door-5", note: "Two layers of encoding, both reversible." },
          { id: "cylab-re-vault-6", name: "Vault-door-6", note: "XOR against a constant." },
          { id: "cylab-re-vault-7", name: "Vault-door-7" },
          { id: "cylab-re-crackme-py", name: "Crackme-py", note: "Python you can just read." },
          { id: "cylab-re-gdb-test-drive", name: "GDB Test Drive", note: "Your first debugger session, fully guided." },
          { id: "cylab-re-transformation", name: "Transformation" },
        ],
      },
      {
        id: "crackmes",
        title: "Beginner crackmes — 1 to 2 stars",
        platform: "crackmes.one",
        url: "https://crackmes.one/",
        level: "easy",
        access: "no-signup",
        blurb:
          "A huge library of small reversing puzzles, filterable by difficulty, platform, and language. No signup to browse or download.",
        tip: "Filter difficulty to 1–2 and grab Ghidra (free) before you start. Archive password is usually crackmes.one.",
        selfDirected: true,
        listNote:
          "crackmes are user-submitted and the catalogue changes constantly, so these are ten open slots — tick one off per 1–2 star crackme you solve.",
        challenges: slots("crackmes", "1–2 star crackme"),
      },
      {
        id: "ctflearn-re",
        title: "Reverse Engineering — Easy filter",
        platform: "CTFlearn",
        url: "https://ctflearn.com/challenge/1/browse",
        level: "easy",
        access: "free-account",
        blurb: "Community archive with a healthy spread of beginner-rated binaries. Set Category to Reverse Engineering.",
        tip: "Sort by the community difficulty rating rather than points — it's usually the more honest signal.",
        selfDirected: true,
        listNote: "Login-gated list, so these are ten open slots — tick one off per Easy challenge you solve in this category.",
        challenges: slots("ctflearn-re", "Easy RE challenge"),
      },
    ],
  },
  {
    id: "pwn",
    code: "SEC-05",
    name: "Binary Exploitation",
    codename: "Deadbolt",
    accent: "#F87171",
    skill: "Memory corruption, buffer overflows, and taking control of a running program.",
    intro:
      "The steepest track here, and the one that rewards finishing SEC-00 and SEC-04 first. Expect to spend real time on your first overflow — everyone does.",
    resources: [
      {
        id: "cylab-pwn",
        title: "Challenge Library — Binary Exploitation",
        platform: "CyLab Security Academy",
        url: CYLAB_LIBRARY,
        level: "starter",
        access: "free-account",
        blurb:
          "Formerly picoCTF. The friendliest pwn challenges on the internet — source is provided and the buffer overflow series builds up one concept at a time.",
        tip: "Do buffer overflow 0 through 3 in order. Install pwntools; you'll use it for every challenge after the first.",
        listNote: CYLAB_NOTE,
        challenges: [
          { id: "cylab-pwn-bof0", name: "buffer overflow 0", note: "Just crash it. That's the whole task." },
          { id: "cylab-pwn-bof1", name: "buffer overflow 1", note: "Now control where it returns to." },
          { id: "cylab-pwn-bof2", name: "buffer overflow 2", note: "Same, but pass arguments." },
          { id: "cylab-pwn-bof3", name: "buffer overflow 3", note: "A canary stands between you and the return address." },
          { id: "cylab-pwn-basic-file-exploit", name: "basic-file-exploit" },
          { id: "cylab-pwn-stonks", name: "Stonks", note: "Your first format string bug." },
          { id: "cylab-pwn-clutter-overflow", name: "clutter-overflow" },
          { id: "cylab-pwn-format-string-0", name: "format string 0" },
          { id: "cylab-pwn-heap0", name: "heap 0", note: "Introduces heap layout, no exploitation yet." },
          { id: "cylab-pwn-rps", name: "RPS" },
        ],
      },
      {
        id: "narnia",
        title: "Narnia — Levels 0–9",
        platform: "OverTheWire",
        url: "https://overthewire.org/wargames/narnia/",
        level: "moderate",
        access: "no-signup",
        blurb:
          "All 10 levels, no signup, with source code provided for every one. The standard second step into pwn after a guided platform.",
        tip: "SSH to narnia.labs.overthewire.org on port 2226. Level 0 login is narnia0 / narnia0. Read the source fully before touching a debugger.",
        challenges: [
          { id: "narnia-0", name: "Level 0", url: "https://overthewire.org/wargames/narnia/narnia0.html", note: "Overwrite a variable next to your buffer." },
          { id: "narnia-1", name: "Level 1", url: "https://overthewire.org/wargames/narnia/narnia1.html", note: "An environment variable gets executed." },
          { id: "narnia-2", name: "Level 2", url: "https://overthewire.org/wargames/narnia/narnia2.html", note: "Classic stack overflow via argv." },
          { id: "narnia-3", name: "Level 3", url: "https://overthewire.org/wargames/narnia/narnia3.html" },
          { id: "narnia-4", name: "Level 4", url: "https://overthewire.org/wargames/narnia/narnia4.html" },
          { id: "narnia-5", name: "Level 5", url: "https://overthewire.org/wargames/narnia/narnia5.html", note: "Format string." },
          { id: "narnia-6", name: "Level 6", url: "https://overthewire.org/wargames/narnia/narnia6.html" },
          { id: "narnia-7", name: "Level 7", url: "https://overthewire.org/wargames/narnia/narnia7.html" },
          { id: "narnia-8", name: "Level 8", url: "https://overthewire.org/wargames/narnia/narnia8.html" },
          { id: "narnia-9", name: "Level 9", url: "https://overthewire.org/wargames/narnia/narnia9.html" },
        ],
      },
      {
        id: "pwnablekr",
        title: "Toddler's Bottle",
        platform: "pwnable.kr",
        url: "https://pwnable.kr/play.php",
        level: "moderate",
        access: "no-signup",
        blurb:
          "A legendary non-commercial wargame. The Toddler's Bottle tier is its beginner set — these ten are the lowest-point challenges in it.",
        tip: "Each challenge page gives you its own SSH credentials. Start with fd; it's a five-minute read of a man page.",
        challenges: [
          { id: "pwnablekr-fd", name: "fd", note: "File descriptor 0 is stdin. That's the trick." },
          { id: "pwnablekr-collision", name: "collision", note: "Make bytes sum to a target value." },
          { id: "pwnablekr-bof", name: "bof", note: "Overwrite a local variable." },
          { id: "pwnablekr-passcode", name: "passcode" },
          { id: "pwnablekr-random", name: "random", note: "An unseeded rand() returns the same value every run." },
          { id: "pwnablekr-input2", name: "input2" },
          { id: "pwnablekr-leg", name: "leg", note: "ARM assembly — read what the registers hold." },
          { id: "pwnablekr-mistake", name: "mistake", note: "Operator precedence bug in the source." },
          { id: "pwnablekr-coin1", name: "coin1", note: "Binary search, scripted against a timer." },
          { id: "pwnablekr-blackjack", name: "blackjack", note: "Can you bet a negative number?" },
        ],
      },
    ],
  },
  {
    id: "osint",
    code: "SEC-06",
    name: "OSINT",
    codename: "Open Sky",
    accent: "#22D3EE",
    skill: "Finding and connecting publicly available information to answer a specific question.",
    intro:
      "No exploit and no shell — just a name, a photo, or a username, and the entire public internet. Rewards patience and lateral thinking over tooling.",
    resources: [
      {
        id: "gralhix",
        title: "OSINT Exercises 001–010",
        platform: "gralhix.com",
        url: "https://gralhix.com/list-of-osint-exercises/",
        level: "starter",
        access: "no-signup",
        blurb:
          "A free, well-known series of standalone OSINT exercises, each with 1–4 tasks and a full published walkthrough. No signup, no answer boxes.",
        tip: "Do the exercise honestly before opening the walkthrough — the walkthrough is where the actual methodology is taught.",
        challenges: [
          { id: "gralhix-001", name: "Exercise 001", url: "https://gralhix.com/list-of-osint-exercises/osint-exercise-001/" },
          { id: "gralhix-002", name: "Exercise 002", url: "https://gralhix.com/list-of-osint-exercises/osint-exercise-002/" },
          { id: "gralhix-003", name: "Exercise 003", url: "https://gralhix.com/list-of-osint-exercises/osint-exercise-003/" },
          { id: "gralhix-004", name: "Exercise 004", url: "https://gralhix.com/list-of-osint-exercises/osint-exercise-004/" },
          { id: "gralhix-005", name: "Exercise 005", url: "https://gralhix.com/list-of-osint-exercises/osint-exercise-005/" },
          { id: "gralhix-006", name: "Exercise 006", url: "https://gralhix.com/list-of-osint-exercises/osint-exercise-006/" },
          { id: "gralhix-007", name: "Exercise 007", url: "https://gralhix.com/list-of-osint-exercises/osint-exercise-007/" },
          { id: "gralhix-008", name: "Exercise 008", url: "https://gralhix.com/list-of-osint-exercises/osint-exercise-008/" },
          { id: "gralhix-009", name: "Exercise 009", url: "https://gralhix.com/list-of-osint-exercises/osint-exercise-009/" },
          { id: "gralhix-010", name: "Exercise 010", url: "https://gralhix.com/list-of-osint-exercises/osint-exercise-010/" },
        ],
      },
      {
        id: "thm-ohsint",
        title: "OhSINT",
        platform: "TryHackMe",
        url: "https://tryhackme.com/r/room/ohsint",
        level: "starter",
        access: "free-account",
        blurb: "The classic free beginner OSINT room. One image, one trail of breadcrumbs, seven questions.",
        tip: "Check the image's metadata first, then follow every username you find onto its other platforms.",
        listNote: "This is a single room rather than a challenge set — one box to tick when you've finished it.",
        challenges: [{ id: "thm-ohsint-room", name: "Complete the OhSINT room", url: "https://tryhackme.com/r/room/ohsint" }],
      },
      {
        id: "thm-searchlight",
        title: "Searchlight — IMINT",
        platform: "TryHackMe",
        url: "https://tryhackme.com/r/room/searchlightosint",
        level: "easy",
        access: "free-account",
        blurb:
          "A structured free workshop on image intelligence — a repeatable methodology rather than a single puzzle.",
        tip: "Take notes as you work. The value here is the process, which transfers to every OSINT challenge you'll meet later.",
        listNote: "A single multi-task room — one box to tick on completion.",
        challenges: [
          { id: "thm-searchlight-room", name: "Complete the Searchlight room", url: "https://tryhackme.com/r/room/searchlightosint" },
        ],
      },
    ],
  },
  {
    id: "stego",
    code: "SEC-07",
    name: "Steganography",
    codename: "False Wall",
    accent: "#F472B6",
    skill: "Finding data deliberately hidden inside images, audio, or other ordinary-looking files.",
    intro:
      "The file looks completely ordinary — that's the point. Closely related to forensics, but the hiding here is deliberate and adversarial.",
    resources: [
      {
        id: "cylab-stego",
        title: "Challenge Library — stego challenges",
        platform: "CyLab Security Academy",
        url: CYLAB_LIBRARY,
        level: "starter",
        access: "free-account",
        blurb:
          "Formerly picoCTF. There's no separate Steganography category — these live under the Forensics filter, and they're the best guided intro to hidden data.",
        tip: "Try exiftool, strings, and binwalk on every file before reaching for anything fancier. Most answers fall out of those three.",
        listNote: CYLAB_NOTE,
        challenges: [
          { id: "cylab-stego-st3g0", name: "St3g0", note: "LSB encoding in a PNG." },
          { id: "cylab-stego-hideme", name: "hideme", note: "Something is appended after the image data ends." },
          { id: "cylab-stego-so-meta", name: "So Meta", note: "The name tells you where to look." },
          { id: "cylab-stego-what-lies-within", name: "What Lies Within" },
          { id: "cylab-stego-advanced-potion", name: "advanced-potion-making" },
          { id: "cylab-stego-enhance", name: "Enhance!", note: "It's an SVG. Open it as text." },
          { id: "cylab-stego-tunn3l", name: "tunn3l v1s10n", note: "The file header has been tampered with." },
          { id: "cylab-stego-macrohard", name: "MacroHard WeakEdge" },
          { id: "cylab-stego-matryoshka", name: "Matryoshka doll", note: "Images inside images. binwalk in a loop." },
          { id: "cylab-stego-lookey-here", name: "Lookey here" },
        ],
      },
      {
        id: "ctflearn-stego",
        title: "Forensics filter — stego challenges",
        platform: "CTFlearn",
        url: "https://ctflearn.com/challenge/1/browse",
        level: "easy",
        access: "free-account",
        blurb:
          "CTFlearn has no Steganography category — stego challenges sit under Forensics. Plenty of beginner-rated hidden-data puzzles in there.",
        tip: "Expect most early answers to hide in file metadata or appended bytes rather than in the pixels themselves.",
        selfDirected: true,
        listNote:
          "Login-gated list and no dedicated stego filter, so these are ten open slots — tick one off per stego-flavoured Forensics challenge you solve.",
        challenges: slots("ctflearn-stego", "Stego challenge"),
      },
      {
        id: "stegonline",
        title: "StegOnline",
        platform: "georgeom.net",
        url: "https://georgeom.net/StegOnline/upload",
        level: "starter",
        access: "no-signup",
        blurb:
          "A free browser-based toolkit for LSB extraction and bit-plane analysis. Not a challenge source — the tool you point at the challenges above.",
        tip: "When a PNG looks clean, step through its individual bit planes here. Hidden data usually pops out visually.",
        listNote: "A tool, not a challenge set — nothing to check off. Keep it open in a tab while you work the lists above.",
        challenges: [],
      },
    ],
  },
  {
    id: "misc",
    code: "SEC-08",
    name: "Misc / Scripting",
    codename: "Loose Ends",
    accent: "#A3E635",
    skill: "Quick scripting, pattern recognition, and problem-solving that doesn't map to one specific skill.",
    intro:
      "Every CTF has the category that fits nowhere else — a weird protocol, a bit of code, a puzzle with no badge. Generalists clean up here.",
    resources: [
      {
        id: "cylab-general",
        title: "Challenge Library — General Skills",
        platform: "CyLab Security Academy",
        url: CYLAB_LIBRARY,
        level: "starter",
        access: "free-account",
        blurb:
          "Formerly picoCTF. Built specifically to teach CTF fundamentals — genuinely the best single starting filter on the platform if you're brand new.",
        tip: "If you only do one resource in this whole app after SEC-00, make it this one.",
        listNote: CYLAB_NOTE,
        challenges: [
          { id: "cylab-gen-obedient-cat", name: "Obedient Cat", note: "Download the file and cat it." },
          { id: "cylab-gen-nice-netcat", name: "Nice netcat...", note: "The output is decimal ASCII." },
          { id: "cylab-gen-python-wrangling", name: "Python Wrangling" },
          { id: "cylab-gen-wave-a-flag", name: "Wave a flag", note: "Programs take --help for a reason." },
          { id: "cylab-gen-static-noise", name: "static ain't always noise", note: "strings, then grep." },
          { id: "cylab-gen-tab-attack", name: "Tab, Tab, Attack", note: "Tab-completion through a deep directory tree." },
          { id: "cylab-gen-magikarp", name: "Magikarp Ground Mission", note: "Practises SSH plus basic navigation." },
          { id: "cylab-gen-first-grep", name: "First Grep" },
          { id: "cylab-gen-2warm", name: "2Warm", note: "Decimal to binary." },
          { id: "cylab-gen-codebook", name: "Codebook" },
        ],
      },
      {
        id: "rootme-programming",
        title: "Programming category",
        platform: "Root-Me",
        url: "https://www.root-me.org/en/Challenges/Programming/",
        level: "easy",
        access: "free-account",
        blurb:
          "Timed scripting puzzles — you can't solve these by hand, which is exactly the point. The friendliest entry point on Root-Me.",
        tip: "Python plus the requests library covers almost all of these. Expect to be racing a server-side timeout.",
        selfDirected: true,
        listNote:
          "Root-Me's listing blocks automated reads and its set rotates, so these are ten open slots — work down the category page from the lowest difficulty score.",
        challenges: slots("rootme-programming", "Programming challenge"),
      },
      {
        id: "ctflearn-misc",
        title: "Programming & Misc — Easy filter",
        platform: "CTFlearn",
        url: "https://ctflearn.com/challenge/1/browse",
        level: "easy",
        access: "free-account",
        blurb:
          "The Programming and Miscellaneous categories catch everything from quick scripting to trivia. Good for building speed.",
        tip: "Keep a Python REPL open in a second window — half of this category is three lines of code.",
        selfDirected: true,
        listNote: "Login-gated list, so these are ten open slots — tick one off per Easy challenge you solve in either category.",
        challenges: slots("ctflearn-misc", "Easy misc challenge"),
      },
    ],
  },
];

export const levelLabel: Record<Level, string> = {
  starter: "Starter",
  easy: "Easy",
  moderate: "Moderate",
};

export const accessLabel: Record<Access, string> = {
  "no-signup": "No signup",
  "free-account": "Free account",
  local: "Runs locally",
};

/** Every checkable item across the app. */
export const allChallenges: Challenge[] = sectors.flatMap((s) =>
  s.resources.flatMap((r) => r.challenges)
);

export function sectorChallenges(sector: Sector): Challenge[] {
  return sector.resources.flatMap((r) => r.challenges);
}
