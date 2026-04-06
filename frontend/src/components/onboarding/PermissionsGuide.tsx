interface PermissionItemProps {
  name: string;
  status: "granted" | "denied" | "undetermined";
  onRequest: () => void;
}

function PermissionItem({ name, status, onRequest }: PermissionItemProps) {
  return (
    <div className="flex items-center gap-3 p-3">
      <span
        className={`w-2.5 h-2.5 rounded-full ${status === "granted" ? "bg-success" : "bg-danger"}`}
      />
      <span className="flex-1 text-text">{name}</span>
      {status !== "granted" && (
        <button onClick={onRequest} className="btn-primary px-3 py-1 text-xs">
          Grant
        </button>
      )}
      {status === "granted" && <span className="text-success">OK</span>}
    </div>
  );
}

interface Props {
  screenCapture: "granted" | "denied" | "undetermined";
  accessibility: "granted" | "denied" | "undetermined";
  onRequestScreenCapture: () => void;
  onRequestAccessibility: () => void;
}

export function PermissionsGuide(props: Props) {
  return (
    <div className="p-6 max-w-[400px] mx-auto">
      <h2 className="text-text">Permissions Required</h2>
      <p className="text-text-muted">ShotGo needs these permissions to capture your screen.</p>
      <PermissionItem
        name="Screen Recording"
        status={props.screenCapture}
        onRequest={props.onRequestScreenCapture}
      />
      <PermissionItem
        name="Accessibility"
        status={props.accessibility}
        onRequest={props.onRequestAccessibility}
      />
    </div>
  );
}
