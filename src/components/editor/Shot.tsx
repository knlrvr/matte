import { getFrame } from "@/components/frames/registry";
import type { Layout } from "@/lib/layout";
import { getShadowCss } from "@/lib/presets/shadows";
import type { FrameSettings, ShotSettings, SourceImage } from "@/lib/types";

interface ShotProps {
  image: SourceImage;
  shot: ShotSettings;
  frame: FrameSettings;
  layout: Layout;
}

/** The image itself, with its frame, corners, shadow and tilt. */
export function Shot({ image, shot, frame, layout }: ShotProps) {
  const { Bar } = getFrame(frame.id);
  const transform = [
    `scale(${shot.scale})`,
    `rotateX(${shot.tiltX}deg)`,
    `rotateY(${shot.tiltY}deg)`,
    `rotateZ(${shot.rotate}deg)`,
  ].join(" ");

  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{
        width: layout.shotWidth,
        height: layout.shotHeight,
        borderRadius: shot.radius,
        boxShadow: getShadowCss(shot.shadow),
        transform,
      }}
    >
      {Bar && <Bar theme={frame.theme} title={frame.title} height={layout.chromeHeight} />}
      {/* Object URLs can't go through next/image, and export needs a plain <img>. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt=""
        draggable={false}
        className="block max-w-none select-none"
        style={{ width: layout.shotWidth, height: layout.imageHeight }}
      />
    </div>
  );
}
