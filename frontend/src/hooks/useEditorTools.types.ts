import type { EditorTool } from "../components/editor/Toolbar";
import type { ArrowData } from "../components/editor/tools/ArrowTool";
import type { TextData } from "../components/editor/tools/TextTool";
import type { BlurData } from "../components/editor/tools/BlurTool";

export interface Annotation {
  type: "arrow" | "text" | "blur";
  data: ArrowData | TextData | BlurData;
}

export interface DragState {
  tool: EditorTool;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export interface PendingText {
  x: number;
  y: number;
}

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}
