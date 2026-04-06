import { FolderOpen } from "lucide-react";
import { section, sectionTitle, inputStyle, labelStyle } from "./settingsStyles";

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
    <div style={section}>
      <div style={sectionTitle}>
        <FolderOpen size={15} /> Output
      </div>
      <label style={labelStyle}>Save Directory</label>
      <input
        style={inputStyle}
        value={p.saveDirectory}
        onChange={(e) => p.setSaveDirectory(e.target.value)}
      />
      <label style={labelStyle}>Image Format</label>
      <select
        style={inputStyle}
        value={p.imageFormat}
        onChange={(e) => p.setImageFormat(e.target.value as "png" | "jpeg")}
      >
        <option value="png">PNG</option>
        <option value="jpeg">JPEG</option>
      </select>
      <label style={labelStyle}>Recording Format</label>
      <select
        style={inputStyle}
        value={p.recordFormat}
        onChange={(e) => p.setRecordFormat(e.target.value as "mp4" | "gif")}
      >
        <option value="mp4">MP4</option>
        <option value="gif">GIF</option>
      </select>
    </div>
  );
}
