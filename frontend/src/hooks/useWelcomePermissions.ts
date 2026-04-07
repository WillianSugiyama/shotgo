import { useState, useEffect, useCallback } from "react";
import {
  CheckPermissions,
  RequestScreenCapture,
  RequestAccessibility,
  RequestMicrophone,
  RequestCamera,
} from "../../wailsjs/go/app/App";

type PermKey = "screenCapture" | "accessibility" | "microphone" | "camera";

export function useWelcomePermissions() {
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [checking, setChecking] = useState(true);
  const [checkFailed, setCheckFailed] = useState(false);

  const check = useCallback(async () => {
    try {
      const r = await CheckPermissions();
      setStatuses({
        screenCapture: r.screenCapture,
        accessibility: r.accessibility,
        microphone: r.microphone,
        camera: r.camera,
      });
      setCheckFailed(false);
    } catch {
      setCheckFailed(true);
    }
    setChecking(false);
  }, []);

  useEffect(() => {
    if (!window.runtime) {
      setChecking(false);
      setCheckFailed(true);
      return;
    }
    check();
    const id = setInterval(check, 1500);
    return () => clearInterval(id);
  }, [check]);

  const onGrant = useCallback(
    async (key: PermKey) => {
      try {
        if (key === "screenCapture") await RequestScreenCapture();
        else if (key === "accessibility") await RequestAccessibility();
        else if (key === "microphone") await RequestMicrophone();
        else if (key === "camera") await RequestCamera();
      } catch {
        /* ignore */
      }
      setTimeout(check, 500);
    },
    [check],
  );

  return { statuses, checking, checkFailed, onGrant };
}
