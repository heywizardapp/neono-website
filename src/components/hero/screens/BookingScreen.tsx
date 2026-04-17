import { FaceAvatar } from "../FaceAvatar";
import { LiveDot } from "../LiveDot";

const P = "#7B2FBE";
const PP = "#F3EEFA";
const K = "#1A1A1A";
const ML = "#9CA3AF";

const services = [
  { name: "Balayage + Tone", time: "2.5h", price: "$185", pop: true },
  { name: "Women's Cut & Style", time: "1h", price: "$75", pop: false },
  { name: "Root Touch-Up", time: "1.5h", price: "$95", pop: false },
  { name: "Highlights + Olaplex", time: "3h", price: "$240", pop: true },
];

const stylists = [
  { name: "Sarah Martinez", gender: "f" as const },
  { name: "Mike Johnson", gender: "m" as const },
  { name: "Emma Chen", gender: "f" as const },
  { name: "Alex Kim", gender: "m" as const },
];

export function BookingScreen() {
  return (
    <div style={{ height: "100%", background: "#FAFAFA", position: "relative", display: "flex", flexDirection: "column" }}>
      <div style={{ background: P, padding: "14px 16px 20px", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            L
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Luxe Beauty Collective</div>
            <div style={{ fontSize: 10, opacity: 0.75 }}>
              Toronto &middot; <span style={{ color: "#FCD34D" }}>{"\u2605\u2605\u2605\u2605\u2605"}</span> 4.9
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex" }}>
            {stylists.map((s, i) => (
              <div
                key={s.name}
                style={{
                  marginLeft: i > 0 ? -8 : 0,
                  border: `2.5px solid ${P}`,
                  borderRadius: "50%",
                  zIndex: 4 - i,
                }}
              >
                <FaceAvatar name={s.name} size={30} gender={s.gender} />
              </div>
            ))}
          </div>
          <div style={{ marginLeft: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 600 }}>4 stylists available</div>
            <div style={{ fontSize: 9, opacity: 0.7, display: "flex", alignItems: "center", gap: 4 }}>
              <LiveDot color="#fff" /> Next in 20 min
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "12px 16px 0", overflow: "hidden" }}>
        {services.map((s) => (
          <div
            key={s.name}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 14px",
              marginBottom: 8,
              borderRadius: 12,
              background: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: K }}>{s.name}</span>
                {s.pop && (
                  <span
                    style={{
                      fontSize: 7,
                      fontWeight: 700,
                      color: P,
                      background: PP,
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                  >
                    Popular
                  </span>
                )}
              </div>
              <div style={{ fontSize: 10, color: ML, marginTop: 3 }}>{"\u23F1"} {s.time}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: K }}>{s.price}</div>
          </div>
        ))}
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
          Book Now &rarr;
        </div>
      </div>
    </div>
  );
}
