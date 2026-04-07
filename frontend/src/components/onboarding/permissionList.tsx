import { Monitor, Mic, Camera, MousePointer } from "lucide-react";

export type PermKey = "screenCapture" | "accessibility" | "microphone" | "camera";
export type Status = "granted" | "denied" | "undetermined";

export interface Perm {
  key: PermKey;
  label: string;
  description: string;
  required: boolean;
  icon: React.ReactNode;
}

export const PERMS: Perm[] = [
  {
    key: "screenCapture",
    label: "Screen Recording",
    description: "Required to capture your screen",
    required: true,
    icon: <Monitor size={16} />,
  },
  {
    key: "accessibility",
    label: "Accessibility",
    description: "Needed for scrollable capture",
    required: false,
    icon: <MousePointer size={16} />,
  },
  {
    key: "microphone",
    label: "Microphone",
    description: "Record audio with your videos",
    required: false,
    icon: <Mic size={16} />,
  },
  {
    key: "camera",
    label: "Camera",
    description: "Add webcam overlay to recordings",
    required: false,
    icon: <Camera size={16} />,
  },
];
