interface FaceAvatarProps {
  name: string;
  size?: number;
  gender?: "f" | "m";
}

export function FaceAvatar({ name, size = 28, gender = "f" }: FaceAvatarProps) {
  const h = name.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
  const skins = ["#F5D0A9", "#D4A76A", "#8D5524", "#C68642", "#E0AC69", "#FFDBAC", "#F1C27D"];
  const hairs = ["#2C1810", "#4A2912", "#71503A", "#D4A76A", "#8B4513", "#1A1A1A", "#3B2314"];
  const sk = skins[Math.abs(h) % skins.length];
  const hr = hairs[Math.abs(h * 7) % hairs.length];
  const hs = Math.abs(h * 11) % 3;
  const shirtColors = ["#7B2FBE", "#3B82F6", "#10B981", "#E8734A", "#EC4899", "#6366F1", "#0891B2"];
  const shirt = shirtColors[Math.abs(h * 5) % 7];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      style={{ borderRadius: "50%", flexShrink: 0, display: "block" }}
    >
      <rect width="64" height="64" rx="32" fill={`hsl(${Math.abs(h) % 360}, 20%, 92%)`} />
      <rect x="24" y="39" width="16" height="9" rx="2" fill={sk} />
      <ellipse cx="32" cy="57" rx="22" ry="13" fill={shirt} />
      <ellipse cx="32" cy="28" rx="15" ry="17" fill={sk} />
      {gender === "f" ? (
        hs === 0 ? (
          <>
            <ellipse cx="32" cy="18" rx="16" ry="13" fill={hr} />
            <rect x="15" y="18" width="7" height="22" rx="3.5" fill={hr} />
            <rect x="42" y="18" width="7" height="22" rx="3.5" fill={hr} />
          </>
        ) : hs === 1 ? (
          <>
            <ellipse cx="32" cy="17" rx="17" ry="12" fill={hr} />
            <rect x="14" y="16" width="36" height="5" rx="2.5" fill={hr} />
          </>
        ) : (
          <>
            <ellipse cx="32" cy="16" rx="16" ry="13" fill={hr} />
            <rect x="14" y="17" width="8" height="26" rx="4" fill={hr} />
            <rect x="42" y="17" width="8" height="26" rx="4" fill={hr} />
          </>
        )
      ) : hs === 0 ? (
        <ellipse cx="32" cy="16" rx="15" ry="9" fill={hr} />
      ) : hs === 1 ? (
        <>
          <ellipse cx="32" cy="15" rx="16" ry="8" fill={hr} />
          <rect x="16" y="12" width="32" height="4" rx="2" fill={hr} />
        </>
      ) : (
        <ellipse cx="32" cy="14" rx="15" ry="7" fill={hr} />
      )}
      <ellipse cx="25" cy="28" rx="2.2" ry="2.5" fill="#fff" />
      <ellipse cx="39" cy="28" rx="2.2" ry="2.5" fill="#fff" />
      <circle cx="25.5" cy="28" r="1.4" fill="#3A2A1A" />
      <circle cx="39.5" cy="28" r="1.4" fill="#3A2A1A" />
      <circle cx="26" cy="27.3" r=".5" fill="#fff" />
      <circle cx="40" cy="27.3" r=".5" fill="#fff" />
      <path
        d={`M27,36 Q32,${38 + (Math.abs(h) % 2)} 37,36`}
        stroke={`hsl(0,40%,${58 + (Math.abs(h) % 10)}%)`}
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
      />
      {Math.abs(h) % 5 === 0 && (
        <>
          <circle cx="25" cy="28" r="4.5" stroke="#1A1A1A" strokeWidth=".8" fill="none" opacity=".5" />
          <circle cx="39" cy="28" r="4.5" stroke="#1A1A1A" strokeWidth=".8" fill="none" opacity=".5" />
          <line x1="29.5" y1="28" x2="34.5" y2="28" stroke="#1A1A1A" strokeWidth=".6" opacity=".5" />
        </>
      )}
      {gender === "m" && Math.abs(h) % 3 === 0 && (
        <ellipse cx="32" cy="38" rx="7" ry="4" fill={hr} opacity=".4" />
      )}
    </svg>
  );
}
