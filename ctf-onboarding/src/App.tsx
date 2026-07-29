import { useMemo } from "react";
import { sectors } from "./data/sectors";
import { useProfile } from "./hooks/useProfile";
import IntakeScreen from "./components/IntakeScreen";
import Header from "./components/Header";
import SectorCard from "./components/SectorCard";
import Debrief from "./components/Debrief";

export default function App() {
  const {
    profile,
    roster,
    activeCallsign,
    createOrSwitch,
    signOut,
    toggleChallenge,
    resetProgress,
    exportProgress,
    importProgress,
    isComplete,
  } = useProfile();

  const prologue = sectors.find((s) => s.isPrologue)!;
  const realSectors = sectors.filter((s) => !s.isPrologue);

  const { totalDone, totalAll } = useMemo(() => {
    const all = sectors.flatMap((s) => s.challenges);
    return {
      totalDone: all.filter((c) => isComplete(c.id)).length,
      totalAll: all.length,
    };
  }, [isComplete, profile]);

  if (!activeCallsign) {
    return <IntakeScreen roster={roster} onSubmit={createOrSwitch} />;
  }

  const overallPct = totalAll ? Math.round((totalDone / totalAll) * 100) : 0;

  return (
    <div className="min-h-screen">
      <Header
        callsign={activeCallsign}
        onSignOut={signOut}
        onExport={exportProgress}
        onImport={importProgress}
        onReset={resetProgress}
      />

      <main className="max-w-5xl mx-auto px-6 py-10">
        <section className="mb-10">
          <div className="font-mono text-xs tracking-[0.3em] text-cyan uppercase mb-3">Mission Briefing</div>
          <h1 className="font-mono text-2xl sm:text-3xl font-semibold mb-3 leading-tight">
            Phase 1 — Recon<span className="caret text-amber">_</span>
          </h1>
          <p className="text-muted leading-relaxed max-w-2xl mb-6">
            Eight sectors, one goal: find out where your instincts are sharpest before you specialize. Run at
            least one challenge per sector. Nothing here is timed or graded — the only thing you're collecting
            is a sense of which terrain felt right.
          </p>

          <div className="flex items-center gap-3 max-w-md">
            <div className="flex-1 h-2 rounded-full bg-line-soft overflow-hidden">
              <div className="h-full rounded-full bg-amber transition-all" style={{ width: `${overallPct}%` }} />
            </div>
            <span className="font-mono text-xs text-faint whitespace-nowrap">
              {totalDone}/{totalAll} logged
            </span>
          </div>
        </section>

        <section className="mb-8">
          <SectorCard sector={prologue} isComplete={isComplete} onToggle={toggleChallenge} />
        </section>

        <section className="mb-10">
          <div className="font-mono text-xs tracking-widest text-faint uppercase mb-3">Open Sectors</div>
          <div className="space-y-3">
            {realSectors.map((s) => (
              <SectorCard key={s.id} sector={s} isComplete={isComplete} onToggle={toggleChallenge} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Debrief sectors={sectors} isComplete={isComplete} />
        </section>

        <footer className="font-mono text-[11px] text-faint leading-relaxed border-t border-line-soft pt-6">
          Progress is stored only in this browser, tied to your callsign — nothing is sent to a server. Use
          "Export case file" in the profile menu to back it up or move it to another device.
        </footer>
      </main>
    </div>
  );
}
