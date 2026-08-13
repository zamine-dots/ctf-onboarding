interface Tile {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
}

interface Props {
  tiles: Tile[];
}

export default function StatTiles({ tiles }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
      {tiles.map((t) => (
        <div key={t.label} className="card px-4 py-3.5">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">{t.label}</div>
          <div
            className="font-mono text-2xl sm:text-[1.75rem] tabular-nums leading-none mt-2"
            style={{ color: t.accent }}
          >
            {t.value}
          </div>
          {t.sub && <div className="text-[11px] text-faint mt-1.5">{t.sub}</div>}
        </div>
      ))}
    </div>
  );
}
