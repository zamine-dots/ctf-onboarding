import { useRef, useState } from "react";

interface Props {
  callsign: string;
  onSignOut: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onReset: () => void;
}

export default function Header({ callsign, onSignOut, onExport, onImport, onReset }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <header className="sticky top-0 z-20 border-b border-line-soft bg-ink/90 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-amber font-semibold tracking-widest text-sm">SECTOR ZERO</span>
          <span className="font-mono text-faint text-xs hidden sm:inline">// IEEE-CS RECON</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-line-soft bg-panel px-3 py-1.5 font-mono text-sm hover:border-cyan transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-ok" />
            {callsign}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-line bg-panel shadow-xl overflow-hidden">
              <button
                onClick={() => {
                  fileRef.current?.click();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-panel-2 transition-colors"
              >
                Import case file…
              </button>
              <button
                onClick={() => {
                  onExport();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-panel-2 transition-colors"
              >
                Export case file
              </button>
              <button
                onClick={() => {
                  onSignOut();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-panel-2 transition-colors"
              >
                Switch operative
              </button>
              <div className="border-t border-line-soft" />
              <button
                onClick={() => {
                  if (confirm(`Reset all progress for ${callsign}? This can't be undone.`)) onReset();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-panel-2 transition-colors"
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
