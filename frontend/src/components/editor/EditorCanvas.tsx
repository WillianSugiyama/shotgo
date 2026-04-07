import { useCallback, useRef, useState } from "react";
import { Toolbar } from "./Toolbar";
import { InteractiveCanvas } from "./InteractiveCanvas";
import { CropActionBar } from "./CropActionBar";
import { ConfirmOverlay } from "./ConfirmOverlay";
import { useCaptureStore } from "../../stores/captureStore";
import { useEditorTools } from "../../hooks/useEditorTools";
import { useEditorActions } from "../../hooks/useEditorActions";
import { useEscape } from "../../hooks/useEscape";

export function EditorCanvas() {
  const { imageData, setImageData } = useCaptureStore();
  const tools = useEditorTools();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { handleSave, handleCopy, handleCancel } = useEditorActions(canvasRef);
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  const tryCancel = useCallback(() => {
    if (tools.annotations.length > 0) {
      setConfirmDiscard(true);
    } else {
      handleCancel();
    }
  }, [tools.annotations.length, handleCancel]);

  useEscape(tryCancel, !tools.pendingText && !confirmDiscard);
  useEscape(() => setConfirmDiscard(false), confirmDiscard);

  const applyCrop = useCallback(() => {
    const rect = tools.cropRect;
    const canvas = canvasRef.current;
    if (!rect || !canvas) return;
    const c = document.createElement("canvas");
    c.width = rect.width;
    c.height = rect.height;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(canvas, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
    setImageData(c.toDataURL("image/png"));
    tools.clearCrop();
    tools.setActiveTool(null);
  }, [tools, setImageData]);

  return (
    <div className="flex flex-col h-full">
      <Toolbar
        activeTool={tools.activeTool}
        onSelectTool={tools.setActiveTool}
        onUndo={tools.undo}
        onSave={handleSave}
        onCopy={handleCopy}
        onCancel={tryCancel}
      />
      <div className="flex-1 overflow-auto bg-[#0d0d12] flex items-center justify-center p-4">
        <InteractiveCanvas
          canvasRef={canvasRef}
          imageData={imageData}
          annotations={tools.annotations}
          drag={tools.drag}
          pendingText={tools.pendingText}
          cropRect={tools.cropRect}
          onMouseDown={tools.handleMouseDown}
          onMouseMove={tools.handleMouseMove}
          onMouseUp={tools.handleMouseUp}
          onCommitText={tools.commitText}
          onCancelText={tools.cancelText}
        />
      </div>
      {tools.cropRect && <CropActionBar onApply={applyCrop} onCancel={tools.clearCrop} />}
      {confirmDiscard && (
        <ConfirmOverlay
          message="Discard changes?"
          onConfirm={handleCancel}
          onCancel={() => setConfirmDiscard(false)}
        />
      )}
    </div>
  );
}
