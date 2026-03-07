interface GameTokenProps {
  label?: string;
  subtitle?: string; // optional small text below label, use '\n' for line breaks
  size?: number; // px size for screen rendering
  colorMode?: string; // 'main' or 'alt'
}

export function GameToken({ label = 'A1', subtitle, size = 200, colorMode = 'main' }: GameTokenProps) {
  // Physical dimensions in mm (used as SVG user units via viewBox)
  const diameter = 50.8
  const r = diameter / 2 // 25.4
  const ringWidth = 2
  const ringR = r - ringWidth / 2 // ring centered 1mm from the edge → stroke spans 23.4–25.4mm

  const bgColor = colorMode === 'main' ? '#000' : '#c54c21'
  const fgColor = colorMode === 'main' ? '#c54c21' : '#000'

  const subtitleLines = subtitle ? subtitle.split('\n') : []
  const labelY = subtitleLines.length > 0 ? r - 5 : r

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${diameter} ${diameter}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Black disk */}
      <circle cx={r} cy={r} r={r} fill={bgColor} />
      {/* Orange edge ring - 2mm wide, flush with the disk perimeter */}
      <circle
        cx={r}
        cy={r}
        r={ringR}
        fill={bgColor}
        stroke={fgColor}
        strokeWidth={ringWidth}
      />
      {/* Label text - title font (RussoOne), white, centered */}
      <text
        x={r}
        y={labelY}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="title, ui-serif, system-ui"
        fontSize="25"
        fill={fgColor}
      >
        {label}
      </text>
      {/* Optional subtitle lines */}
      {subtitleLines.map((line, i) => (
        <text
          key={i}
          x={r}
          y={r + 10 + i * 6}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="title, ui-serif, system-ui"
          fontSize="7"
          fill={fgColor}
        >
          {line}
        </text>
      ))}
    </svg>
  )
}
