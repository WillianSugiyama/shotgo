// CropTool handles cropping a region from the editor canvas.
// TODO: Implement drag-to-crop with visual handles.

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function applyCrop(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  crop: CropData
): ImageData {
  const { x, y, width, height } = crop;
  const cropped = ctx.getImageData(x, y, width, height);

  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(cropped, 0, 0);

  return cropped;
}
