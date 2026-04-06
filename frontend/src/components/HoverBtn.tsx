import { useState } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  hoverBg: string;
};

export function HoverBtn({ style, children, hoverBg, ...props }: Props) {
  const [h, setH] = useState(false);
  return (
    <button
      {...props}
      style={{ ...style, ...(h ? { background: hoverBg } : {}) }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {children}
    </button>
  );
}
