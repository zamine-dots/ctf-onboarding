import { useState } from "react";
import { sectors } from "../data/sectors";
import SectorIcon from "./SectorIcon";

interface Props {
  roster: string[];
  totalChallenges: number;
  totalResources: number;
  onSubmit: (callsign: string) => void;
}

export default function IntakeScreen({ roster, totalChallenges, totalResources, onSubmit }: Props) {
  const [value, setValue] = useState("");
  const tracks = sectors.filter((s) => !s.isPrologue);

  return (
    <div className="ambient min-h-screen flex items-center justify-center px-4 sm:px-6 py-14">
      <div className="w-full max-w-lg rise">
        <div className="flex items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-lg bg-brand/15 border border-brand/30 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 text-brand-soft" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 9l3 3-3 3M13 15h4" />
            </svg>
          </div>
          <span className="font-semibold tracking-tight">Sector Zero</span>
          <span className="font-mono text-[11px] text-faint">IEEE-CS</span>
        </div>

        <h1 className="text-[2rem] sm:text-[2.5rem] font-semibold leading-[1.1] tracking-tight mb-4">
          Find the CTF category
          <br />
          that clicks for you<span className="caret text-brand-soft">.</span>
        </h1>

        <p className="text-muted leading-relaxed mb-7">
          Eight tracks, {totalResources} curated free resources, {totalChallenges} beginner challenges — all real,
          all free, all linked. Work through whatever looks interesting and see where your instincts are sharpest
          before you specialize.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim()) onSubmit(value.trim());
          }}
          className="mb-8"
        >
          <label htmlFor="callsign" className="block font-mono text-[10px] tracking-[0.18em] uppercase text-faint mb-2">
            Pick a callsign to open your case file
          </label>
          <div className="flex gap-2">
            <input
              id="callsign"
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. ZAMINE"
              maxLength={24}
              autoComplete="off"
              className="flex-1 min-w-0 bg-surface border border-edge focus:border-brand/60 outline-none rounded-xl px-4 py-3 font-mono tracking-wide placeholder:text-faint/70 transition-colors"
            />
            <button
              type="submit"
              disabled={!value.trim()}
              className="px-5 rounded-xl bg-brand text-white font-medium text-sm disabled:opacity-25 disabled:cursor-not-allowed hover:bg-brand/85 transition-colors"
            >
              Start
            </button>
          </div>
          <p className="text-xs text-faint mt-2.5">
            No account, no email. Progress is saved in this browser under your callsign.
          </p>
        </form>

        <div className="grid grid-cols-2 gap-2 mb-8">
          {tracks.map((s) => (
            <div
              key={s.id}
              className="card px-3 py-2.5 flex items-center gap-2"
              style={{ ["--accent" as string]: s.accent }}
            >
              <span className="glyph shrink-0 w-6 h-6 rounded-md flex items-center justify-center">
                <SectorIcon sector={s.id} className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs leading-tight text-muted truncate">{s.name}</span>
            </div>
          ))}
        </div>

        {roster.length > 0 && (
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-faint mb-2.5">
              Operatives on this device
            </div>
            <div className="flex flex-wrap gap-2">
              {roster.map((name) => (
                <button
                  key={name}
                  onClick={() => onSubmit(name)}
                  className="px-3 py-1.5 rounded-lg border border-edge-soft bg-surface font-mono text-[13px] hover:border-brand/50 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
