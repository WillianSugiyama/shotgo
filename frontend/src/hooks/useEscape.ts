import { useEffect } from "react";

/**
 * Calls the handler whenever the user presses Escape.
 * Used to dismiss modal-like views (capture bar, recorder, settings).
 */
export function useEscape(handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handler();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handler, enabled]);
}
