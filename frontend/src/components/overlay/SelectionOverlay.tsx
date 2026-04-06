import { useCallback } from "react";
import { RegionSelector } from "./RegionSelector";
import { useCapture } from "../../hooks/useCapture";
import { Region } from "../../stores/captureStore";

export function SelectionOverlay() {
  const { captureRegion, cancelCapture } = useCapture();

  const handleSelect = useCallback(
    (region: Region) => {
      captureRegion(region);
    },
    [captureRegion],
  );

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
