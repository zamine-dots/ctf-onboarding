import { useState } from "react";
import type { Resource } from "../data/sectors";
import { accessLabel, levelLabel } from "../data/sectors";

interface Props {
  resource: Resource;
  accent: string;
  isComplete: (id: string) => boolean;
  onToggle: (id: string) => void;
  onSetMany: (ids: string[], value: boolean) => void;
}

const levelTone: Record<string, string> = {
  starter: "text-ok/90 bg-ok/10 border-ok/25",
  easy: "text-warn/90 bg-warn/10 border-warn/25",
  moderate: "text-danger/90 bg-danger/10 border-danger/25",
};

export default function ResourceCard({ resource, accent, isComplete, onToggle, onSetMany }: Props) {
  const [open, setOpen] = useState(false);
  const total = resource.challenges.length;
  const done = resource.challenges.filter((c) => isComplete(c.id)).length;
  const pct = total ? (done / total) * 100 : 0;
  const finished = total > 0 && done === total;
  const ids = resource.challenges.map((c) => c.id);

  return (
    <div
      className="rounded-xl border bg-surface-2/60 overflow-hidden transition-colors"
      style={{
        borderColor: finished ? `color-mix(in oklab, ${accent} 45%, transparent)` : undefined,
      }}
    >
      <div className="w-full flex items-stretch">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex-1 min-w-0 text-left px-4 py-3.5 flex items-center gap-3 hover:bg-surface-3/50 transition-colors"
        >
          <svg
            viewBox="0 0 12 12"
            className={`w-3 h-3 shrink-0 text-faint transition-transform duration-200 ${open ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 2.5L8 6l-4 3.5" />
          </svg>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-[0.9375rem] leading-tight">{resource.title}</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-faint">{resource.platform}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span
                className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${levelTone[resource.level]}`}
              >
                {levelLabel[resource.level]}
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-edge-soft text-faint">
                {accessLabel[resource.access]}
              </span>
            </div>
          </div>

          {total > 0 && (
            <div className="shrink-0 flex items-center gap-2.5">
              <div className="hidden sm:block w-16 h-1 rounded-full bg-edge-soft overflow-hidden">
                <div className="h-full rounded-full bar-fill" style={{ width: `${pct}%`, ["--accent" as string]: accent }} />
              </div>
              <span className="font-mono text-[11px] tabular-nums text-faint w-9 text-right">
                {done}/{total}
              </span>
            </div>
          )}
        </button>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Open ${resource.platform}`}
          className="shrink-0 px-3.5 flex items-center border-l border-edge-soft text-faint hover:text-text hover:bg-surface-3/60 transition-colors"
        >
          <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5.5 2.5h6v6M11.5 2.5L6 8" />
            <path d="M9 11.5H2.5V5" />
          </svg>
        </a>
      </div>

      {open && (
        <div className="expand px-4 pb-4 pt-1 border-t border-edge-soft/70">
          <p className="text-[0.8125rem] text-muted leading-relaxed mt-3">{resource.blurb}</p>

          <p className="text-[0.8125rem] leading-relaxed mt-2.5 pl-3 border-l-2" style={{ borderColor: `color-mix(in oklab, ${accent} 50%, transparent)` }}>
            <span className="font-mono text-[10px] uppercase tracking-wider mr-1.5" style={{ color: accent }}>
              Tip
            </span>
            <span className="text-muted">{resource.tip}</span>
          </p>

          {resource.listNote && (
            <p className="text-xs text-faint leading-relaxed mt-3 rounded-lg bg-base/40 border border-edge-soft px-3 py-2">
              {resource.listNote}
            </p>
          )}

          {total > 0 && (
            <>
              <div className="flex items-center justify-between mt-4 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
                  {resource.selfDirected ? `${total} open slots` : `${total} challenge${total === 1 ? "" : "s"}`}
                </span>
                <button
                  onClick={() => onSetMany(ids, !finished)}
                  className="font-mono text-[10px] uppercase tracking-wider text-faint hover:text-text transition-colors"
                >
                  {finished ? "Clear all" : "Mark all"}
                </button>
              </div>

              <ul className="space-y-1">
                {resource.challenges.map((c) => {
                  const complete = isComplete(c.id);
                  return (
                    <li key={c.id}>
                      <div
                        className={`group flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition-colors ${
                          complete ? "bg-surface-3/40" : "hover:bg-surface-3/40"
                        }`}
                      >
                        <button
                          onClick={() => onToggle(c.id)}
                          aria-pressed={complete}
                          aria-label={`${complete ? "Uncheck" : "Check"} ${c.name}`}
                          className="mt-px shrink-0 w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center transition-colors"
                          style={
                            complete
                              ? { background: accent, borderColor: accent, color: "#0A0B0F" }
                              : { borderColor: "var(--color-faint)" }
                          }
                        >
                          {complete && (
                            <svg viewBox="0 0 12 12" className="w-3 h-3 pop" fill="none">
                              <path d="M2.5 6.2l2.3 2.3L9.5 3.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <button
                            onClick={() => onToggle(c.id)}
                            className={`text-left text-[0.8125rem] leading-snug transition-colors ${
                              complete ? "text-faint line-through decoration-faint/50" : "text-text/90"
                            }`}
                          >
                            {c.name}
                          </button>
                          {c.note && !complete && (
                            <p className="text-[11px] text-faint leading-snug mt-0.5">{c.note}</p>
                          )}
                        </div>

                        {c.url && (
                          <a
                            href={c.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open challenge"
                            className="shrink-0 mt-px p-1 -m-1 rounded text-faint opacity-50 sm:opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:text-text transition-all"
                          >
                            <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5.5 2.5h6v6M11.5 2.5L6 8" />
                              <path d="M9 11.5H2.5V5" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
