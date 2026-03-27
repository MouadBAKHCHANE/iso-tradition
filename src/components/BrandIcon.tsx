export default function BrandIcon({
  className = "",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer square */}
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        stroke={color}
        strokeWidth="6"
        fill="none"
      />
      {/* Middle square */}
      <rect
        x="18"
        y="18"
        width="64"
        height="64"
        stroke={color}
        strokeWidth="6"
        fill="none"
      />
      {/* Inner square */}
      <rect
        x="34"
        y="34"
        width="32"
        height="32"
        stroke={color}
        strokeWidth="6"
        fill="none"
      />
    </svg>
  );
}
