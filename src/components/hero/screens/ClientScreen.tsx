import { FaceAvatar } from "../FaceAvatar";
import { Sparkline } from "../Sparkline";
import { LiveDot } from "../LiveDot";
import { MobileTabBar } from "../MobileTabBar";

const P = "#7B2FBE";
const PL = "#9B6DD7";
const G = "#10B981";
const R = "#EF4444";
const O = "#F59E0B";
const K = "#1A1A1A";
const ML = "#9CA3AF";

interface AtRiskClient {
  name: string;
  days: number;
  risk: number;
  color: string;
  g: "f" | "m";
  spend: number[];
}

const clients: AtRiskClient[] = [
  { name: "Sarah Mitchell", days: 47, risk: 78, color: R, g: "f", spend: [120, 110, 95, 80, 65] },
  { name: "Anna Petrova", days: 41, risk: 67, color: O, g: "f", spend: [90, 88, 82, 75, 70] },
  { name: "Marcus Thompson", days: 52, risk: 82, color: R, g: "m", spend: [150, 130, 100, 60, 45] },
];

const stats = [
  { l: "Retention", v: "87%", c: G },
  { l: "ROI", v: "24.5x", c: P },
  { l: "At Risk", v: "3", c: R },
];

export function ClientScreen() {
  return (
    <div style={{ height: "100%", background: "#FAFAFF", position: "relative", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 16px 8px" }}>
        <div style={{ fontSize: 10, color: PL, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
          {"\u{1F9E0}"} AI Insights <LiveDot color={P} />
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, color: K, letterSpacing: "-0.03em" }}>$4,280</div>
        <div style={{ fontSize: 10, color: ML }}>recovered by AI this quarter</div>
      </div>

      <div style={{ display: "flex", gap: 6, padding: "0 16px 10px" }}>
        {stats.map((s) => (
          <div
            key={s.l}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "8px 0",
              background: "#fff",
              borderRadius: 10,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.03)",
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 8, color: ML }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, padding: "0 16px", overflow: "hidden" }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: K, marginBottom: 8 }}>Needs attention</div>
        {clients.map((c) => (
          <div
            key={c.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              marginBottom: 6,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              border: `1px solid ${c.color}10`,
            }}
          >
            <div style={{ position: "relative", width: 42, height: 42, flexShrink: 0 }}>
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                <circle cx="21" cy="21" r="18" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="3" />
                <circle
                  cx="21"
                  cy="21"
                  r="18"
                  fill="none"
                  stroke={c.color}
                  strokeWidth="3"
                  strokeDasharray={`${c.risk * 1.13} ${113 - c.risk * 1.13}`}
                  strokeDashoffset="28"
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: "absolute", top: 7, left: 7 }}>
                <FaceAvatar name={c.name} size={28} gender={c.g} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: K }}>{c.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                <span style={{ fontSize: 9, color: ML }}>{c.days}d ago</span>
                <Sparkline data={c.spend} color={c.color} w={40} ht={12} />
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: c.color }}>{c.risk}%</div>
              <div style={{ fontSize: 8, color: ML }}>churn risk</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "6px 16px 34px" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              flex: 1,
              background: G,
              borderRadius: 12,
              padding: "11px 0",
              textAlign: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              boxShadow: `0 3px 12px ${G}30`,
            }}
          >
            Re-engage All &rarr;
          </div>
          <div
            style={{
              padding: "11px 16px",
              borderRadius: 12,
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              fontSize: 12,
              fontWeight: 600,
              color: "#6B7280",
            }}
          >
            Edit
          </div>
        </div>
      </div>
      <MobileTabBar active={1} />
    </div>
  );
}
