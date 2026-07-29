import { useState } from "react";

interface Props {
  roster: string[];
  onSubmit: (callsign: string) => void;
}

export default function IntakeScreen({ roster, onSubmit }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="font-mono text-xs tracking-[0.3em] text-cyan uppercase mb-3">Field Command // Intake</div>
        <h1 className="font-mono text-3xl sm:text-4xl font-semibold leading-tight mb-4">
          Sector Zero
        </h1>
        <p className="text-muted leading-relaxed mb-8">
          Eight sectors are open for reconnaissance. No prior clearance required — you're here to find out
          which terrain you move through best. Register a callsign to open your case file. Progress is saved
          only on this device, under your callsign.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim()) onSubmit(value.trim());
          }}
          className="space-y-3"
        >
          <label htmlFor="callsign" className="block font-mono text-xs tracking-widest text-faint uppercase">
            Choose a callsign
          </label>
          <div className="flex gap-2">
            <input
              id="callsign"
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. ZAMINE"
              maxLength={24}
              className="flex-1 bg-panel border border-line focus:border-amber outline-none rounded-md px-4 py-3 font-mono text-lg tracking-wide placeholder:text-faint transition-colors"
            />
            <button
              type="submit"
              disabled={!value.trim()}
              className="px-5 rounded-md bg-amber text-ink font-mono font-semibold text-sm tracking-wide disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber/90 transition-colors"
            >
              Enter
            </button>
          </div>
        </form>

        {roster.length > 0 && (
          <div className="mt-10">
            <div className="font-mono text-xs tracking-widest text-faint uppercase mb-3">Known operatives on this device</div>
            <div className="flex flex-wrap gap-2">
              {roster.map((name) => (
                <button
                  key={name}
                  onClick={() => onSubmit(name)}
                  className="px-3 py-1.5 rounded border border-line-soft bg-panel-2 font-mono text-sm text-text hover:border-cyan hover:text-cyan transition-colors"
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
