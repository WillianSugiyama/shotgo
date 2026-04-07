interface Props {
  onClick: () => void;
  primary?: boolean;
  children: React.ReactNode;
}

export function RecBtn({ onClick, primary, children }: Props) {
  const cls = primary
    ? "bg-accent text-black hover:bg-white"
    : "bg-black text-white border border-white/30 hover:border-accent hover:text-accent";
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-[6px] px-[16px] py-[8px] text-[11px] font-bold uppercase tracking-[0.05em] cursor-pointer ${cls}`}
    >
      {children}
    </button>
  );
}
