import { useState, useCallback, useRef, type MouseEvent } from "react";
import { Region } from "../../stores/captureStore";

interface Props {
  onSelect: (region: Region) => void;
  onCancel: () => void;
}

export function RegionSelector({ onSelect, onCancel }: Props) {
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [current, setCurrent] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    setStart({ x: e.clientX, y: e.clientY });
    setCurrent({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (start) setCurrent({ x: e.clientX, y: e.clientY });
    },
    [start],
  );

  const handleMouseUp = useCallback(() => {
    if (start && current) {
      const region: Region = {
        x: Math.min(start.x, current.x),
        y: Math.min(start.y, current.y),
        width: Math.abs(current.x - start.x),
        height: Math.abs(current.y - start.y),
      };
      if (region.width > 5 && region.height > 5) {
        onSelect(region);
      }
    }
    setStart(null);
    setCurrent(null);
  }, [start, current, onSelect]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    },
    [onCancel],
  );

  const rect =
    start && current
      ? {
          left: Math.min(start.x, current.x),
          top: Math.min(start.y, current.y),
          width: Math.abs(current.x - start.x),
          height: Math.abs(current.y - start.y),
        }
      : null;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onKeyDown={handleKeyDown}
      className="fixed inset-0"
      autoFocus
    >
      {rect && (
        <div className="absolute border-2 border-selection bg-selection-subtle" style={rect} />
      )}
    </div>
  );
}
