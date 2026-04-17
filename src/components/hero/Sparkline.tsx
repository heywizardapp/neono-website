interface SparklineProps {
  data: number[];
  color: string;
  w?: number;
  ht?: number;
}

export function Sparkline({ data, color, w = 44, ht = 14 }: SparklineProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const rng = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${ht - ((v - min) / rng) * ht}`)
    .join(" ");

  return (
    <svg width={w} height={ht} style={{ display: "block" }}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
