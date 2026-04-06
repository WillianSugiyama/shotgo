// BlurTool applies pixelated blur to a region on the editor canvas.
// TODO: Implement drag-to-select blur region.

export interface BlurData {
  x: number;
  y: number;
  width: number;
  height: number;
  intensity: number;
}

export function applyBlur(ctx: CanvasRenderingContext2D, blur: BlurData) {
  const { x, y, width, height, intensity } = blur;
  const pixelSize = Math.max(2, intensity);

  const imageData = ctx.getImageData(x, y, width, height);
  const data = imageData.data;

  for (let py = 0; py < height; py += pixelSize) {
    for (let px = 0; px < width; px += pixelSize) {
      const i = (py * width + px) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      for (let dy = 0; dy < pixelSize && py + dy < height; dy++) {
        for (let dx = 0; dx < pixelSize && px + dx < width; dx++) {
          const j = ((py + dy) * width + (px + dx)) * 4;
          data[j] = r;
          data[j + 1] = g;
          data[j + 2] = b;
        }
      }
    }
  }

  ctx.putImageData(imageData, x, y);
}
