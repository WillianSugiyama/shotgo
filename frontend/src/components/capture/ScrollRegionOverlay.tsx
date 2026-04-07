import { RegionSelector } from "../overlay/RegionSelector";
import { useScrollCapture } from "../../hooks/useScrollCapture";
import type { Region } from "../../stores/captureStore";

export function ScrollRegionOverlay() {
  const { captureScrollRegion, cancelScrollCapture } = useScrollCapture();

  const handleSelect = (region: Region) => {
    captureScrollRegion(region.x, region.y, region.width, region.height);
  };

  return (
    <div className="fixed inset-0 bg-black/30 cursor-crosshair z-[9999]">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
        Drag to select scroll region — Esc to cancel
      </div>
      <RegionSelector onSelect={handleSelect} onCancel={cancelScrollCapture} />
    </div>
  );
}
