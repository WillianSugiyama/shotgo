// TextTool renders text annotations on the editor canvas.
// TODO: Implement click-to-place text input.

export interface TextData {
  x: number;
  y: number;
  content: string;
  fontSize: number;
  color: string;
  fontFamily: string;
}

export function drawText(ctx: CanvasRenderingContext2D, text: TextData) {
  ctx.fillStyle = text.color;
  ctx.font = `${text.fontSize}px ${text.fontFamily}`;
  ctx.fillText(text.content, text.x, text.y);
}
