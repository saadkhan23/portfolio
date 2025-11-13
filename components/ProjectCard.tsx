import Link from "next/link";

type ProjectCardProps = {
  href: string;
  title: string;
  kicker?: string;
  stats?: { label: string; value: string };
  bullets?: string[];
  techStack?: string[];
};

export function ProjectCard({
  href,
  title,
  kicker,
  stats,
  bullets = [],
  techStack = [],
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="grid border-l-0 border-r border-b border-t-0 border-slate-800 bg-slate-950 px-6 py-6 transition-colors hover:border-slate-700 hover:bg-slate-900 h-full"
      style={{
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr auto',
        gap: '1rem',
      }}
    >
      {/* Row 1: Kicker + Title */}
      <div>
        {kicker && (
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-600 mb-2" style={{ fontVariant: 'small-caps' }}>
            {kicker}
          </p>
        )}
        <h3 className="text-lg font-semibold text-slate-50 leading-snug">{title}</h3>
      </div>

      {/* Row 2: Stats Box (always aligned) */}
      {stats && (
        <div className="border border-slate-800 px-3 py-3 bg-slate-900/50 flex flex-col justify-center h-fit">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-600 mb-1" style={{ fontVariant: 'small-caps' }}>
            {stats.label}
          </p>
          <p className="text-2xl font-semibold text-sky-400">{stats.value}</p>
        </div>
      )}

      {/* Row 3: Divider + Bullets */}
      <div className="flex flex-col gap-3">
        <div className="border-t border-slate-800" />
        {bullets.length > 0 && (
          <div className="space-y-2.5">
            {bullets.map((bullet, idx) => (
              <div key={idx} className="flex gap-2.5">
                <span className="text-sky-500 flex-shrink-0 mt-0.5 text-sm">▪</span>
                <p className="text-xs text-slate-400 leading-relaxed">{bullet}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Row 4: Tech Stack Footer (pinned to bottom with consistent height) */}
      {techStack.length > 0 && (
        <div className="border-t border-slate-800 pt-3 mt-auto min-h-[2.5rem] flex items-start">
          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-slate-600 leading-tight" style={{ fontVariant: 'small-caps' }}>
            {techStack.join(" · ")}
          </p>
        </div>
      )}
    </Link>
  );
}
