import type { Sector } from "../data/sectors";

interface Props {
  sectors: Sector[];
  isComplete: (challengeId: string) => boolean;
}

export default function Debrief({ sectors, isComplete }: Props) {
  const real = sectors.filter((s) => !s.isPrologue);
  const readout = real
    .map((s) => ({
      sector: s,
      done: s.challenges.filter((c) => isComplete(c.id)).length,
      total: s.challenges.length,
    }))
    .sort((a, b) => b.done - a.done || a.sector.name.localeCompare(b.sector.name));

  const touched = readout.filter((r) => r.done > 0);
  const maxDone = Math.max(1, ...readout.map((r) => r.done));

  if (touched.length < 2) {
    return (
      <div className="rounded-lg border border-line-soft bg-panel-2 px-5 py-4">
        <div className="font-mono text-xs tracking-widest text-faint uppercase mb-1">Debrief — locked</div>
        <p className="text-sm text-muted">
          Log at least one challenge in two different sectors to unlock your signal readout — a quick look at
          where your completions are clustering.
        </p>
      </div>
    );
  }

  const top = touched[0];

  return (
    <div className="rounded-lg border border-amber/30 bg-panel px-5 py-5">
      <div className="font-mono text-xs tracking-widest text-cyan uppercase mb-1">Debrief</div>
      <h3 className="font-mono text-lg font-semibold mb-1">
        Strongest signal: <span className="text-amber">{top.sector.name}</span>
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-5">
        This is just a completion count, not a verdict — it only tells you where you kept going back. Trust
        what you actually enjoyed over what racked up the most checkmarks.
      </p>
      <div className="space-y-2">
        {readout.map((r) => (
          <div key={r.sector.id} className="flex items-center gap-3">
            <span className="font-mono text-xs text-faint w-28 shrink-0 truncate">{r.sector.name}</span>
            <div className="flex-1 h-2 rounded-full bg-line-soft overflow-hidden">
              <div
                className={`h-full rounded-full ${r.sector.id === top.sector.id ? "bg-amber" : "bg-cyan-dim"}`}
                style={{ width: `${(r.done / maxDone) * 100}%` }}
              />
            </div>
            <span className="font-mono text-xs text-faint w-10 text-right">
              {r.done}/{r.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
