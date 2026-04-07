import { HideWindow } from "../../wailsjs/go/app/App";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export function WindowFrame({ children, title }: Props) {
  return (
    <div className="window-shell flex flex-col h-full overflow-hidden">
      <div className="wails-drag flex items-center h-[34px] px-[12px] shrink-0 border-b border-border/50">
        <TrafficLights />
        {title && (
          <span className="absolute left-1/2 -translate-x-1/2 text-[11px] text-text-muted/80 font-medium tracking-tight">
            {title}
          </span>
        )}
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

function TrafficLights() {
  return (
    <div className="flex gap-[8px] items-center group">
      <button onClick={() => HideWindow()} className="traffic-light bg-[#ff5f57]" title="Close" />
      <button
        onClick={() => HideWindow()}
        className="traffic-light bg-[#febc2e]"
        title="Minimize"
      />
      <span className="traffic-light bg-[#28c840] opacity-50" title="Maximize (disabled)" />
    </div>
  );
}
