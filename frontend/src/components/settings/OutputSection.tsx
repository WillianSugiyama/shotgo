import { FolderOpen } from "lucide-react";

interface Props {
  saveDirectory: string;
  setSaveDirectory: (v: string) => void;
  imageFormat: string;
  setImageFormat: (v: "png" | "jpeg") => void;
  recordFormat: string;
  setRecordFormat: (v: "mp4" | "gif") => void;
}

export function OutputSection(p: Props) {
  return (
    <div className="p-4 mb-4 bg-surface rounded-lg border border-border">
      <div className="flex items-center gap-2 text-[13px] font-semibold text-text-muted uppercase tracking-wider mb-4">
        <FolderOpen size={15} /> Output
      </div>
      <label className="block text-[13px] text-text-muted mb-1">Save Directory</label>
      <input
        className="settings-input"
        value={p.saveDirectory}
        onChange={(e) => p.setSaveDirectory(e.target.value)}
      />
      <label className="block text-[13px] text-text-muted mb-1">Image Format</label>
      <select
        className="settings-input"
        value={p.imageFormat}
        onChange={(e) => p.setImageFormat(e.target.value as "png" | "jpeg")}
      >
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
      </select>
      <label className="block text-[13px] text-text-muted mb-1">Recording Format</label>
      <select
        className="settings-input"
        value={p.recordFormat}
        onChange={(e) => p.setRecordFormat(e.target.value as "mp4" | "gif")}
      >
        <option value="mp4">MP4</option>
        <option value="gif">GIF</option>
      </select>
    </div>
  );
}
