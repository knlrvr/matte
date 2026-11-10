import type { FrameBarProps } from "./registry";
import { FRAME_THEMES } from "./themes";
import { TrafficLights } from "./TrafficLights";

/** Browser chrome: window controls and an address field. */
export function BrowserBar({ theme, title, height }: FrameBarProps) {
  const colors = FRAME_THEMES[theme];
  return (
    <div
      className="flex items-center gap-4 px-4"
      style={{ height, background: colors.bar, borderBottom: `1px solid ${colors.border}` }}
    >
      <TrafficLights />
      <div
        className="mx-auto flex h-7 w-3/5 items-center justify-center rounded-md px-3"
        style={{ background: colors.well, boxShadow: `inset 0 0 0 1px ${colors.border}` }}
      >
        <span className="truncate text-[12px]" style={{ color: colors.text }}>
          {title || "localhost:3000"}
        </span>
      </div>
      {/* Balances the traffic lights so the address field sits dead centre. */}
      <div className="w-[52px] shrink-0" />
    </div>
  );
}
