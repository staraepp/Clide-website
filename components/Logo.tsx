type LogoProps = { size?: number; animated?: boolean };

const BARS = [
  { x: 6.5, y: 12.5, h: 4 },
  { x: 10.8, y: 8.5, h: 12 },
  { x: 15.1, y: 5.5, h: 18 },
  { x: 19.4, y: 9.5, h: 10 },
  { x: 23.7, y: 13, h: 3 },
] as const;

export function Logo({ size = 22, animated = false }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 28"
      fill="none"
      aria-hidden="true"
      className={animated ? "logo-live" : undefined}
    >
      {BARS.map((bar, index) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={bar.y}
          width="2.4"
          height={bar.h}
          rx="1.2"
          fill="currentColor"
          style={
            animated
              ? {
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: `logo-bar 1.4s ${index * 0.12}s var(--ease-in-out) infinite`,
                }
              : undefined
          }
        />
      ))}
      {animated && (
        <style>{`@keyframes logo-bar{0%,100%{transform:scaleY(1)}50%{transform:scaleY(.45)}}`}</style>
      )}
    </svg>
  );
}
