import { useEffect, useRef, useState } from "react";

interface Props {
  callsign: string;
  pct: number;
  onSignOut: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onReset: () => void;
}

export default function Header({ callsign, pct, onSignOut, onExport, onImport, onReset }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape — a dropdown that traps you feels broken.
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const r = 13;
  const circ = 2 * Math.PI * r;

  return (
    <header className="sticky top-0 z-30 border-b border-edge-soft bg-base/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-brand/15 border border-brand/30 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-brand-soft" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 9l3 3-3 3M13 15h4" />
            </svg>
          </div>
          <span className="font-semibold tracking-tight truncate">Sector Zero</span>
          <span className="font-mono text-[11px] text-faint hidden sm:inline">IEEE-CS</span>
        </div>

        <div className="relative shrink-0" ref={wrapRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2.5 rounded-full border border-edge bg-surface hover:border-brand/50 pl-2 pr-3 py-1.5 transition-colors"
          >
            <span className="relative w-[30px] h-[30px] shrink-0 grid place-items-center">
              <svg viewBox="0 0 30 30" className="absolute inset-0 -rotate-90 w-full h-full">
                <circle cx="15" cy="15" r={r} fill="none" stroke="var(--color-edge)" strokeWidth="2.5" />
                <circle
                  cx="15"
                  cy="15"
                  r={r}
                  fill="none"
                  stroke="var(--color-brand)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - pct / 100)}
                  style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.22,1,0.36,1)" }}
                />
              </svg>
              <span className="font-mono text-[9px] tabular-nums text-muted">{pct}</span>
            </span>
            <span className="font-mono text-[13px] max-w-[9rem] truncate">{callsign}</span>
            <svg viewBox="0 0 12 12" className={`w-2.5 h-2.5 text-faint transition-transform ${menuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 4.5L6 8l3.5-3.5" />
            </svg>
          </button>

          {menuOpen && (
            <div role="menu" className="expand absolute right-0 mt-2 w-60 rounded-xl border border-edge bg-surface shadow-2xl shadow-black/50 overflow-hidden p-1">
              <button
                role="menuitem"
                onClick={() => {
                  fileRef.current?.click();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm hover:bg-surface-3 transition-colors"
              >
                Import case file…
              </button>
              <button
                role="menuitem"
                onClick={() => {
                  onExport();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm hover:bg-surface-3 transition-colors"
              >
                Export case file
              </button>
              <button
                role="menuitem"
                onClick={() => {
                  onSignOut();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm hover:bg-surface-3 transition-colors"
              >
                Switch operative
              </button>
              <div className="my-1 border-t border-edge-soft" />
              <button
                role="menuitem"
                onClick={() => {
                  if (confirm(`Reset all progress for ${callsign}? This can't be undone.`)) onReset();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-danger hover:bg-danger/10 transition-colors"
              >
                Reset progress
              </button>
            </div>
          )}
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onImport(file);
            e.target.value = "";
          }}
        />
      </div>
    </header>
  );
}
