import { useAppStore } from "../../stores/appStore";

export function Welcome() {
  const { setView, setFirstLaunch } = useAppStore();

  const handleContinue = () => {
    setView("idle");
    setFirstLaunch(false);
  };

  return (
    <div style={{ textAlign: "center", padding: 48, color: "#fff" }}>
      <h1>Welcome to ShotGo</h1>
      <p style={{ color: "#aaa", maxWidth: 400, margin: "16px auto" }}>
        A fast, lightweight screenshot and recording tool. Let's set up a few things before you
        start.
      </p>
      <button onClick={handleContinue} style={btnStyle}>
        Get Started
      </button>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  marginTop: 24,
  padding: "12px 32px",
  fontSize: 16,
  background: "#4A90D9",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};
