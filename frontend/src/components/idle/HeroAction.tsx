interface Props {
  icon: React.ReactNode;
  label: string;
  sub: string;
  shortcut: string[];
  onClick: () => void;
}

export function HeroAction({ label, sub, shortcut, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="hero-action group relative w-full max-w-[380px] px-[24px] py-[20px] flex items-center justify-between gap-[16px] cursor-pointer text-left bg-black border-2 border-[#6c5ce7]"
    >
      <div className="flex flex-col">
        <div className="hero-tag text-[10px] font-mono uppercase tracking-[0.15em] text-[#6c5ce7] mb-[6px]">
          ▶ Primary
        </div>
        <div className="hero-label text-[20px] font-bold text-white leading-none tracking-tight">
          {label}
        </div>
        <div className="hero-sub text-[12px] text-white/50 mt-[6px] leading-none">{sub}</div>
      </div>

      <div className="flex gap-[3px] shrink-0">
        {shortcut.map((k, i) => (
          <span
            key={i}
            className="hero-kbd inline-flex items-center justify-center min-w-[24px] h-[24px] px-[6px] text-[11px] text-white font-mono font-bold border border-white/30"
          >
            {k}
          </span>
        ))}
      </div>
    </button>
  );
}
