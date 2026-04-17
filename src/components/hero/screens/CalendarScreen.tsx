import { FaceAvatar } from "../FaceAvatar";
import { Sparkline } from "../Sparkline";
import { MobileTabBar } from "../MobileTabBar";

const P = "#7B2FBE";
const B = "#3B82F6";
const G = "#10B981";
const R = "#EF4444";
const C = "#E8734A";
const K = "#1A1A1A";
const ML = "#9CA3AF";

interface Appointment {
  top: number;
  h: number;
  label: string;
}

interface StaffColumn {
  name: string;
  color: string;
  g: "f" | "m";
  apts: Appointment[];
}

const cols: StaffColumn[] = [
  {
    name: "Sarah M",
    color: C,
    g: "f",
    apts: [
      { top: 0, h: 56, label: "Jennifer L." },
      { top: 68, h: 70, label: "Anna P." },
    ],
  },
  {
    name: "Mike J",
    color: B,
    g: "m",
    apts: [
      { top: 0, h: 28, label: "David R." },
      { top: 36, h: 28, label: "Marcus T." },
      { top: 72, h: 20, label: "Tom H." },
    ],
  },
  {
    name: "Emma C",
    color: P,
    g: "f",
    apts: [
      { top: 10, h: 40, label: "Priya S." },
      { top: 58, h: 56, label: "Kate W." },
    ],
  },
];

const timeLabels = ["9a", "10", "11", "12p", "1p", "2p", "3p"];

export function CalendarScreen() {
  return (
    <div style={{ height: "100%", background: "#fff", position: "relative", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 16px 8px" }}>
        <div style={{ fontSize: 10, color: ML, fontWeight: 500, marginBottom: 2 }}>Thursday, Mar 26</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 32, fontWeight: 800, color: K, letterSpacing: "-0.03em" }}>$1,560</span>
          <div>
            <Sparkline data={[880, 1020, 1340, 1180, 1560]} color={G} w={48} ht={20} />
            <div style={{ fontSize: 9, color: G, fontWeight: 600, marginTop: 1 }}>+22% vs last Thu</div>
          </div>
        </div>
        <div style={{ fontSize: 10, color: ML, marginTop: 2 }}>12 bookings across 4 staff</div>
      </div>

      <div style={{ display: "flex", gap: 6, padding: "4px 16px 8px" }}>
        {cols.map((s) => (
          <div
            key={s.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 8px 3px 3px",
              borderRadius: 16,
              background: s.color + "08",
              border: `1px solid ${s.color}15`,
            }}
          >
            <FaceAvatar name={s.name} size={20} gender={s.g} />
            <span style={{ fontSize: 9, fontWeight: 600, color: s.color }}>{s.name.split(" ")[0]}</span>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "22px repeat(3, 1fr)", overflow: "hidden" }}>
        <div>
          {timeLabels.map((t) => (
            <div key={t} style={{ height: 22, fontSize: 7, color: "#D1D5DB", textAlign: "center", paddingTop: 1 }}>
              {t}
            </div>
          ))}
        </div>
        {cols.map((col, ci) => (
          <div key={ci} style={{ position: "relative", borderLeft: "1px solid rgba(0,0,0,0.03)" }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} style={{ height: 22, borderBottom: "1px solid rgba(0,0,0,0.02)" }} />
            ))}
            {ci === 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 42,
                  left: -2,
                  right: 0,
                  height: 1.5,
                  background: R,
                  opacity: 0.4,
                  zIndex: 5,
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: R,
                    position: "absolute",
                    left: 0,
                    top: -2,
                  }}
                />
              </div>
            )}
            {col.apts.map((a, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: a.top,
                  left: 3,
                  right: 3,
                  height: a.h,
                  background: col.color + "18",
                  borderLeft: `3px solid ${col.color}`,
                  borderRadius: 5,
                  padding: "3px 5px",
                  boxShadow: `0 1px 3px ${col.color}08`,
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <FaceAvatar
                    name={a.label}
                    size={13}
                    gender={
                      a.label.includes("Marcus") || a.label.includes("David") || a.label.includes("Tom")
                        ? "m"
                        : "f"
                    }
                  />
                  <span style={{ fontSize: 8, fontWeight: 600, color: K }}>{a.label}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <MobileTabBar active={0} />
    </div>
  );
}
