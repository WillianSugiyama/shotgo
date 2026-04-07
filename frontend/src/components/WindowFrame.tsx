import { HideWindow } from "../../wailsjs/go/app/App";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export function WindowFrame({ children, title }: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bg">
      <div className="wails-drag flex items-center h-10 px-3 bg-surface border-b border-border shrink-0">
        <div className="flex gap-1.5">
          <button
            onClick={() => HideWindow()}
            className="w-3 h-3 rounded-full bg-danger border-none cursor-pointer"
            title="Close"
          />
          <button
            onClick={() => HideWindow()}
            className="w-3 h-3 rounded-full bg-warning border-none cursor-pointer"
            title="Minimize"
          />
          <span className="w-3 h-3 rounded-full bg-success opacity-50" />
        </div>
        {title && (
          <span className="flex-1 text-center text-xs text-text-muted font-medium">{title}</span>
        )}
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
