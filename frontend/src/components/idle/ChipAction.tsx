interface Props {
  icon: React.ReactNode;
  label: string;
  shortcut: string;
  onClick: () => void;
}

export function ChipAction({ icon, label, shortcut, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group flex-1 flex flex-col items-start gap-[8px] px-[12px] py-[12px] bg-black border border-white/20 hover:border-[#6c5ce7] cursor-pointer text-left"
    >
      <div className="flex items-center justify-between w-full">
        <div className="text-white group-hover:text-[#6c5ce7]">{icon}</div>
        <div className="text-[9px] text-white/40 font-mono">{shortcut}</div>
      </div>
      <div className="text-[11px] font-bold text-white uppercase tracking-tight leading-none">
        {label}
      </div>
    </button>
  );
}
