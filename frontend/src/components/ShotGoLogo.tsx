import iconUrl from "../assets/images/icon.svg";

interface Props {
  size?: number;
}

export function ShotGoLogo({ size = 40 }: Props) {
  return (
    <div
      className="flex items-center justify-center shrink-0 bg-black border-2 border-accent overflow-hidden"
      style={{ width: size, height: size }}
    >
      <img
        src={iconUrl}
        alt="ShotGo"
        className="shotgo-logo-mark"
        style={{ width: size * 0.7, height: size * 0.7 }}
      />
    </div>
  );
}
