import { useCallback } from "react";
import { RegionSelector } from "./RegionSelector";
import { useCapture } from "../../hooks/useCapture";

export function SelectionOverlay() {
  const { captureRegion, cancelCapture } = useCapture();

  const handleSelect = useCallback(() => {
    captureRegion();
  }, [captureRegion]);

  const handleCancel = useCallback(() => {
    cancelCapture();
  }, [cancelCapture]);

  return (
    <div className="fixed inset-0 bg-black/30 cursor-crosshair z-[9999]">
      <RegionSelector onSelect={handleSelect} onCancel={handleCancel} />
    </div>
  );
}
