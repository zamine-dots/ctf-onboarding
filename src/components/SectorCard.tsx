import { useState } from "react";
import type { Sector } from "../data/sectors";
import { sectorChallenges } from "../data/sectors";
import ResourceCard from "./ResourceCard";
import SectorIcon from "./SectorIcon";

interface Props {
  sector: Sector;
  isComplete: (id: string) => boolean;
  onToggle: (id: string) => void;
  onSetMany: (ids: string[], value: boolean) => void;
  defaultOpen?: boolean;
}

export default function SectorCard({ sector, isComplete, onToggle, onSetMany, defaultOpen }: Props) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  const challenges = sectorChallenges(sector);
  const total = challenges.length;
  const done = challenges.filter((c) => isComplete(c.id)).length;
  const pct = total ? (done / total) * 100 : 0;
  const started = done > 0;
  const finished = total > 0 && done === total;

  return (
    <div
      className="card card-hover overflow-hidden"
      style={{
        ["--accent" as string]: sector.accent,
        borderColor: started ? `color-mix(in oklab, ${sector.accent} 34%, var(--color-edge-soft))` : undefined,
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left px-4 sm:px-5 py-4 flex items-center gap-3.5 sm:gap-4"
      >
        <div className="glyph shrink-0 w-10 h-10 rounded-[10px] flex items-center justify-center">
          <SectorIcon sector={sector.id} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] tracking-wider text-faint">{sector.code}</span>
            <h3 className="font-semibold leading-tight">{sector.name}</h3>
            {finished && (
              <span
                className="font-mono text-[10px] px-1.5 py-0.5 rounded-full"
                style={{ background: `color-mix(in oklab, ${sector.accent} 18%, transparent)`, color: sector.accent }}
              >
                complete
              </span>
            )}
          </div>
          <p className="text-[0.8125rem] text-muted mt-1 line-clamp-2 sm:truncate">{sector.skill}</p>
        </div>

        <div className="shrink-0 flex items-center gap-2.5 sm:gap-4">
          <div className="text-right">
            <div className="font-mono text-[0.8125rem] sm:text-sm tabular-nums leading-none">
              <span style={{ color: started ? sector.accent : undefined }}>{done}</span>
              <span className="text-faint">/{total}</span>
            </div>
            <div className="hidden sm:block font-mono text-[10px] text-faint mt-1">
              {sector.resources.length} resources
            </div>
          </div>

          <div className="w-10 sm:w-20 h-1.5 rounded-full bg-edge-soft overflow-hidden">
            <div className="h-full rounded-full bar-fill" style={{ width: `${pct}%` }} />
          </div>

          <svg
            viewBox="0 0 12 12"
            className={`w-3.5 h-3.5 text-faint transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 2.5L8 6l-4 3.5" />
          </svg>
        </div>
      </button>

      {open && (
        <div className="expand px-4 sm:px-5 pb-5 pt-1 border-t border-edge-soft">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mt-4 mb-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: sector.accent }}>
              {sector.codename}
            </span>
          </div>
          <p className="text-sm text-muted leading-relaxed mb-4 max-w-2xl">{sector.intro}</p>

          <div className="space-y-2">
            {sector.resources.map((r) => (
              <ResourceCard
                key={r.id}
                resource={r}
                accent={sector.accent}
                isComplete={isComplete}
                onToggle={onToggle}
                onSetMany={onSetMany}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
