import { FaceAvatar } from "../FaceAvatar";
import { Sparkline } from "../Sparkline";

const P = "#7B2FBE";
const G = "#10B981";
const K = "#1A1A1A";
const ML = "#9CA3AF";

const products = [
  { name: "Davines Mask 6.34", w: "30g", cost: "$12.60", swatch: "#8B4513" },
  { name: "Davines Mask 7.0", w: "10g", cost: "$4.20", swatch: "#A0522D" },
  { name: "20 Vol Developer", w: "40g", cost: "$3.20", swatch: "#F5E6CC" },
];

export function ColourScreen() {
  return (
    <div style={{ height: "100%", background: "#FFFBF7", position: "relative", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        <FaceAvatar name="Priya Singh" size={34} gender="f" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: K }}>Priya Singh</div>
          <div style={{ fontSize: 10, color: ML }}>Root Touch-Up</div>
        </div>
        <div style={{ fontSize: 9, fontWeight: 600, color: G, background: G + "12", padding: "4px 10px", borderRadius: 6 }}>
          v3
        </div>
      </div>

      <div style={{ flex: 1, padding: "10px 16px", overflow: "hidden" }}>
        {products.map((i) => (
          <div
            key={i.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 12px",
              marginBottom: 6,
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 7,
                background: i.swatch,
                boxShadow: `0 2px 8px ${i.swatch}40`,
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: K }}>{i.name}</div>
              <div style={{ fontSize: 9, color: ML }}>{i.w}</div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: K }}>{i.cost}</span>
          </div>
        ))}

        <div style={{ display: "flex", justifyContent: "center", margin: "10px 0 4px" }}>
          <svg width="120" height="72" viewBox="0 0 120 72">
            <defs>
              <clipPath id="bwl2">
                <path d="M20,14 Q20,6 32,6 L88,6 Q100,6 100,14 L96,58 Q95,66 88,67 L32,67 Q25,66 24,58 Z" />
              </clipPath>
              <linearGradient id="lq2" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="#A0522D" stopOpacity={0.8} />
                <stop offset="40%" stopColor="#8B4513" stopOpacity={0.85} />
                <stop offset="100%" stopColor="#6B3410" stopOpacity={0.95} />
              </linearGradient>
            </defs>
            <path
              d="M20,14 Q20,6 32,6 L88,6 Q100,6 100,14 L96,58 Q95,66 88,67 L32,67 Q25,66 24,58 Z"
              fill="#F5F0EB"
              stroke="rgba(0,0,0,0.06)"
              strokeWidth="1"
            />
            <g clipPath="url(#bwl2)">
              <rect x="16" y="22" width="88" height="50" fill="url(#lq2)" />
              <path d="M16,24 Q40,20 60,24 Q80,28 104,24 L104,72 L16,72 Z" fill="rgba(255,255,255,0.08)" />
              <ellipse cx="60" cy="24" rx="30" ry="2" fill="rgba(255,255,255,0.1)" />
            </g>
          </svg>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 9, color: ML }}>Bowl cost</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: K, letterSpacing: "-0.02em" }}>$20.00</div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 2 }}>
            <Sparkline data={[16.2, 15.8, 16.8, 15.4, 16.1, 15.9, 20.0]} color={P} w={50} ht={14} />
            <span style={{ fontSize: 9, color: ML }}>80g &middot; 3 products</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "8px 16px 34px" }}>
        <div
          style={{
            background: P,
            borderRadius: 14,
            padding: "13px 0",
            textAlign: "center",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            boxShadow: `0 4px 20px ${P}35`,
          }}
        >
          Save & Push to POS &rarr;
        </div>
      </div>
    </div>
  );
}
