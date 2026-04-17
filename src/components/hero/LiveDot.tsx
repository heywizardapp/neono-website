interface LiveDotProps {
  color?: string;
}

export function LiveDot({ color = "#10B981" }: LiveDotProps) {
  return (
    <span style={{ position: "relative", display: "inline-block", width: 6, height: 6, verticalAlign: "middle" }}>
      <span style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: color }} />
      <span
        style={{
          position: "absolute",
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: color,
          opacity: 0.2,
          top: -4,
          left: -4,
          animation: "phone-pulse 2s ease infinite",
        }}
      />
    </span>
  );
}
