import { Check, X } from "lucide-react";

interface Props {
  onApply: () => void;
  onCancel: () => void;
}

export function CropActionBar({ onApply, onCancel }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-surface border-t border-border">
      <span className="text-[12px] text-text-muted mr-2">Crop selected — apply or cancel</span>
      <button onClick={onCancel} className="btn-secondary">
        <X size={14} /> Cancel
      </button>
      <button onClick={onApply} className="btn-primary">
        <Check size={14} /> Apply Crop
      </button>
    </div>
  );
}
