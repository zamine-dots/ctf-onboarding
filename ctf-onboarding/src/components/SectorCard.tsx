import { useState } from "react";
import type { Sector } from "../data/sectors";
import { difficultyLabel } from "../data/sectors";

interface Props {
  sector: Sector;
  isComplete: (challengeId: string) => boolean;
  onToggle: (challengeId: string) => void;
  defaultOpen?: boolean;
}

const diffColor: Record<string, string> = {
  recon: "text-ok border-ok/40",
  field: "text-amber border-amber/40",
  deep: "text-red-400 border-red-400/40",
};

export default function SectorCard({ sector, isComplete, onToggle, defaultOpen }: Props) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  const total = sector.challenges.length;
  const done = sector.challenges.filter((c) => isComplete(c.id)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const started = done > 0;

  return (
    <div
      className={`rounded-lg border bg-panel transition-colors ${
        started ? "border-amber/40" : "border-line-soft"
      }`}
    >
      <button onClick={() => setOpen((v) => !v)} className="w-full text-left px-5 py-4 flex items-center gap-4">
        <div className="font-mono text-xs text-faint w-14 shrink-0">{sector.code}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-text">{sector.name}</span>
            <span className="font-mono text-xs text-cyan">// {sector.codename}</span>
          </div>
          <div className="text-sm text-muted mt-0.5 truncate">{sector.skill}</div>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 w-24">
            <div className="flex-1 h-1.5 rounded-full bg-line-soft overflow-hidden">
              <div
                className={`h-full rounded-full ${done === total ? "bg-ok" : "bg-amber"}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
          <span className="font-mono text-xs text-faint w-10 text-right">
            {done}/{total}
          </span>
          <span className={`font-mono text-faint transition-transform ${open ? "rotate-90" : ""}`}>&gt;</span>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-line-soft">
          <p className="text-sm text-muted leading-relaxed mt-4 mb-5">{sector.dossier}</p>
          <div className="space-y-2.5">
            {sector.challenges.map((c) => {
              const complete = isComplete(c.id);
              return (
                <div
                  key={c.id}
                  className={`rounded-md border px-4 py-3 transition-colors ${
                    complete ? "border-ok/30 bg-ok/[0.04]" : "border-line-soft bg-panel-2"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onToggle(c.id)}
                      aria-label={complete ? "Mark incomplete" : "Mark complete"}
                      className={`mt-0.5 shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        complete ? "bg-ok border-ok text-ink" : "border-faint hover:border-cyan"
                      }`}
                    >
                      {complete && (
                        <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                          <path d="M2 6l2.5 2.5L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-medium ${complete ? "text-muted line-through" : "text-text"}`}>
                          {c.title}
                        </span>
                        <span className="font-mono text-[11px] text-faint">{c.source}</span>
                        <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${diffColor[c.difficulty]}`}>
                          {difficultyLabel[c.difficulty]}
                        </span>
                      </div>
                      <p className="text-sm text-muted mt-1 leading-snug">{c.brief}</p>
                      <p className="text-xs text-faint mt-1.5 leading-snug">
                        <span className="text-cyan">Intel:</span> {c.intel}
                      </p>
                    </div>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 font-mono text-xs px-3 py-1.5 rounded border border-line-soft text-cyan hover:border-cyan hover:bg-cyan/10 transition-colors whitespace-nowrap"
                    >
                      Deploy ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
