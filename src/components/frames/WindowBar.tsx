import type { FrameBarProps } from "./registry";
import { FRAME_THEMES } from "./themes";
import { TrafficLights } from "./TrafficLights";

/** A desktop window title bar: three controls and a centred title. */
export function WindowBar({ theme, title, height }: FrameBarProps) {
  const colors = FRAME_THEMES[theme];
  return (
    <div
      className="relative flex items-center px-4"
      style={{ height, background: colors.bar, borderBottom: `1px solid ${colors.border}` }}
    >
      <TrafficLights />
      <span
        className="absolute inset-x-24 truncate text-center text-[13px] font-medium"
        style={{ color: colors.text }}
      >
        {title}
      </span>
    </div>
  );
}
