import { useMemo } from "react";
import { allChallenges, sectorChallenges, sectors } from "./data/sectors";
import { useProfile } from "./hooks/useProfile";
import IntakeScreen from "./components/IntakeScreen";
import Header from "./components/Header";
import SectorCard from "./components/SectorCard";
import StatTiles from "./components/StatTiles";
import Debrief from "./components/Debrief";

const prologue = sectors.find((s) => s.isPrologue)!;
const tracks = sectors.filter((s) => !s.isPrologue);
const totalResources = sectors.reduce((n, s) => n + s.resources.length, 0);

export default function App() {
  const {
    roster,
    activeCallsign,
    createOrSwitch,
    signOut,
    toggleChallenge,
    setMany,
    resetProgress,
    exportProgress,
    importProgress,
    isComplete,
  } = useProfile();

  const stats = useMemo(() => {
    const done = allChallenges.filter((c) => isComplete(c.id)).length;
    const total = allChallenges.length;
    const touched = tracks.filter((s) => sectorChallenges(s).some((c) => isComplete(c.id))).length;
    const cleared = sectors.reduce(
      (n, s) =>
        n +
        s.resources.filter((r) => r.challenges.length > 0 && r.challenges.every((c) => isComplete(c.id))).length,
      0
    );
    return { done, total, touched, cleared, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [isComplete]);

  if (!activeCallsign) {
    return (
      <IntakeScreen
        roster={roster}
        totalChallenges={allChallenges.length}
        totalResources={totalResources}
        onSubmit={createOrSwitch}
      />
    );
  }

  return (
    <div className="ambient min-h-screen">
      <Header
        callsign={activeCallsign}
        pct={stats.pct}
        onSignOut={signOut}
        onExport={exportProgress}
        onImport={importProgress}
        onReset={resetProgress}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <section className="mb-8 rise">
          <h1 className="text-[1.75rem] sm:text-[2rem] font-semibold tracking-tight leading-tight mb-2">
            Welcome back, <span className="font-mono">{activeCallsign}</span>
          </h1>
          <p className="text-muted leading-relaxed max-w-2xl mb-6">
            Nothing here is timed or graded. Work through whatever looks interesting — the only thing you're
            collecting is a sense of which terrain felt right.
          </p>

          <StatTiles
            tiles={[
              {
                label: "Challenges logged",
                value: `${stats.done}`,
                sub: `of ${stats.total} available`,
                accent: stats.done ? "var(--color-brand-soft)" : undefined,
              },
              { label: "Tracks started", value: `${stats.touched}`, sub: `of ${tracks.length} tracks` },
              { label: "Resources cleared", value: `${stats.cleared}`, sub: `of ${totalResources} resources` },
              {
                label: "Completion",
                value: `${stats.pct}%`,
                sub: stats.pct === 100 ? "every challenge logged" : "keep going",
                accent: stats.pct ? "var(--color-ok)" : undefined,
              },
            ]}
          />
        </section>

        <section className="mb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint mb-2.5">Start here</div>
          <SectorCard
            sector={prologue}
            isComplete={isComplete}
            onToggle={toggleChallenge}
            onSetMany={setMany}
            defaultOpen
          />
        </section>

        <section className="mb-8">
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">Tracks</div>
            <div className="font-mono text-[10px] text-faint">{tracks.length} categories</div>
          </div>
          <div className="space-y-2.5">
            {tracks.map((s) => (
              <SectorCard
                key={s.id}
                sector={s}
                isComplete={isComplete}
                onToggle={toggleChallenge}
                onSetMany={setMany}
              />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <Debrief sectors={sectors} isComplete={isComplete} />
        </section>

        <footer className="text-[11px] text-faint leading-relaxed border-t border-edge-soft pt-6">
          Progress is stored only in this browser, tied to your callsign — nothing is sent to a server. Use
          "Export case file" in the profile menu to back it up or move it to another device. Challenge links are
          checked periodically, but free-tier availability shifts; tell the committee if one breaks.
        </footer>
      </main>
    </div>
  );
}
