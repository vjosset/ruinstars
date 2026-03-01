interface GameTokenProps {
  label?: string;
  size?: number; // px size for screen rendering
}

export function GameToken({ label = 'A1', size = 200 }: GameTokenProps) {
  // Physical dimensions in mm (used as SVG user units via viewBox)
  const diameter = 50.8
  const r = diameter / 2 // 25.4
  const ringWidth = 2
  const ringR = r - ringWidth / 2 // ring centered 1mm from the edge → stroke spans 23.4–25.4mm

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${diameter} ${diameter}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Black disk */}
      <circle cx={r} cy={r} r={r} fill="#000000" />
      {/* Orange edge ring — 2mm wide, flush with the disk perimeter */}
      <circle
        cx={r}
        cy={r}
        r={ringR}
        fill="#000"
        stroke="#c54c21"
        strokeWidth={ringWidth}
      />
      {/* Label text — title font (RussoOne), white, centered */}
      <text
        x={r}
        y={r}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="title, ui-serif, system-ui"
        fontSize="30"
        fill="#c54c21"
      >
        {label}
      </text>
    </svg>
  )
}
