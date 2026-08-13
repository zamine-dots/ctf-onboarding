import type { Sector } from "../data/sectors";
import { sectorChallenges } from "../data/sectors";
import SectorIcon from "./SectorIcon";

interface Props {
  sectors: Sector[];
  isComplete: (id: string) => boolean;
}

export default function Debrief({ sectors, isComplete }: Props) {
  const readout = sectors
    .filter((s) => !s.isPrologue)
    .map((s) => {
      const challenges = sectorChallenges(s);
      return {
        sector: s,
        done: challenges.filter((c) => isComplete(c.id)).length,
        total: challenges.length,
      };
    })
    .sort((a, b) => b.done - a.done || a.sector.name.localeCompare(b.sector.name));

  const touched = readout.filter((r) => r.done > 0);

  if (touched.length < 2) {
    return (
      <div className="card px-5 py-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint mb-1.5">Debrief — locked</div>
        <p className="text-sm text-muted leading-relaxed">
          Log challenges in two different tracks to unlock your readout — a quick look at where your completions
          are clustering.
        </p>
      </div>
    );
  }

  const maxDone = Math.max(1, ...readout.map((r) => r.done));
  const top = touched[0];

  return (
    <div className="card px-5 py-5" style={{ ["--accent" as string]: top.sector.accent }}>
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint mb-2">Debrief</div>

      <div className="flex items-center gap-3 mb-2">
        <div className="glyph shrink-0 w-9 h-9 rounded-[10px] flex items-center justify-center">
          <SectorIcon sector={top.sector.id} />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">
          Strongest signal:{" "}
          <span style={{ color: top.sector.accent }}>{top.sector.name}</span>
        </h3>
      </div>

      <p className="text-sm text-muted leading-relaxed mb-5 max-w-2xl">
        This is a completion count, not a verdict — it only shows where you kept going back. Trust what you
        actually enjoyed over what racked up the most checkmarks.
      </p>

      <div className="space-y-2">
        {readout.map((r) => (
          <div key={r.sector.id} className="flex items-center gap-3" style={{ ["--accent" as string]: r.sector.accent }}>
            <span className="text-xs text-muted w-24 sm:w-36 shrink-0 truncate">{r.sector.name}</span>
            <div className="flex-1 h-2 rounded-full bg-edge-soft overflow-hidden">
              <div
                className="h-full rounded-full bar-fill"
                style={{ width: `${(r.done / maxDone) * 100}%`, opacity: r.done ? 1 : 0 }}
              />
            </div>
            <span className="font-mono text-[11px] tabular-nums text-faint w-10 text-right">
              {r.done}/{r.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
