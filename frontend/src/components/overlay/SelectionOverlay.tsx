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
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.3)",
        cursor: "crosshair",
        zIndex: 9999,
      }}
    >
      <RegionSelector onSelect={handleSelect} onCancel={handleCancel} />
    </div>
  );
}
