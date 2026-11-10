const COLORS = ["#ff5f57", "#febc2e", "#28c840"];

export function TrafficLights() {
  return (
    <div className="flex gap-2">
      {COLORS.map((color) => (
        <span key={color} className="size-3 rounded-full" style={{ background: color }} />
      ))}
    </div>
  );
}
