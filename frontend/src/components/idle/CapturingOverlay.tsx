export function CapturingOverlay() {
  return (
    <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center gap-[14px] animate-[fadeIn_0.1s_ease]">
      <div className="w-[14px] h-[14px] bg-accent animate-[pulse-dot_0.8s_ease-in-out_infinite]" />
      <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-accent">
        Capturing…
      </div>
    </div>
  );
}
