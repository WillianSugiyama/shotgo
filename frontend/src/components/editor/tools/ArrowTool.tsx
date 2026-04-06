// ArrowTool draws arrows on the editor canvas.
// TODO: Implement mouse event handlers for drawing arrows.

export interface ArrowData {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  width: number;
}

export function drawArrow(ctx: CanvasRenderingContext2D, arrow: ArrowData) {
  const { startX, startY, endX, endY, color, width } = arrow;
  const headLength = width * 4;
  const angle = Math.atan2(endY - startY, endX - startX);

  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - headLength * Math.cos(angle - Math.PI / 6),
    endY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    endX - headLength * Math.cos(angle + Math.PI / 6),
    endY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
}
