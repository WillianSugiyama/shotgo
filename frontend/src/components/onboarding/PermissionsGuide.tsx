interface PermissionItemProps {
  name: string;
  status: "granted" | "denied" | "undetermined";
  onRequest: () => void;
}

function PermissionItem({ name, status, onRequest }: PermissionItemProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 12 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: status === "granted" ? "#2ecc71" : "#e74c3c",
        }}
      />
      <span style={{ flex: 1, color: "#fff" }}>{name}</span>
      {status !== "granted" && (
        <button onClick={onRequest} style={btnStyle}>
          Grant
        </button>
      )}
      {status === "granted" && <span style={{ color: "#2ecc71" }}>OK</span>}
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
    <div style={{ padding: 24, maxWidth: 400, margin: "0 auto" }}>
      <h2 style={{ color: "#fff" }}>Permissions Required</h2>
      <p style={{ color: "#aaa" }}>
        ShotGo needs these permissions to capture your screen.
      </p>
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

const btnStyle: React.CSSProperties = {
  padding: "4px 12px",
  background: "#4A90D9",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
};
