import { FaceAvatar } from "../FaceAvatar";

const P = "#7B2FBE";
const G = "#10B981";
const K = "#1A1A1A";
const M = "#6B7280";
const ML = "#9CA3AF";

const lineItems = [
  { name: "Balayage + Tone", by: "Sarah M.", price: 185 },
  { name: "Olaplex Treatment", by: "Add-on", price: 45 },
  { name: "OI Shampoo", by: "Retail", price: 38 },
];

const tipOptions = ["15%", "18%", "20%", "25%"];

export function POSScreen() {
  return (
    <div style={{ height: "100%", background: "#fff", position: "relative", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <FaceAvatar name="Jennifer Lee" size={40} gender="f" />
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: K }}>Jennifer Lee</div>
          <div style={{ fontSize: 10, color: ML }}>VIP &middot; 24 visits &middot; Last: 3 wks ago</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "8px 16px", overflow: "hidden" }}>
        {lineItems.map((i) => (
          <div
            key={i.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: K }}>{i.name}</div>
              <div style={{ fontSize: 9, color: ML }}>{i.by}</div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: K }}>${i.price}</span>
          </div>
        ))}

        <div style={{ padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
            <span style={{ fontSize: 10, color: ML }}>Subtotal</span>
            <span style={{ fontSize: 10 }}>$268.00</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, color: ML }}>HST 13%</span>
            <span style={{ fontSize: 10 }}>$34.84</span>
          </div>
        </div>

        <div style={{ textAlign: "center", padding: "12px 0 8px" }}>
          <div style={{ fontSize: 9, color: ML, marginBottom: 4 }}>Tip</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: P, letterSpacing: "-0.02em" }}>$53.60</div>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {tipOptions.map((t) => (
            <div
              key={t}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px 0",
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 600,
                background: t === "20%" ? P : "rgba(0,0,0,0.03)",
                color: t === "20%" ? "#fff" : ML,
                boxShadow: t === "20%" ? `0 2px 8px ${P}25` : "none",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "8px 16px 34px" }}>
        <div
          style={{
            background: G,
            borderRadius: 14,
            padding: "14px 0",
            textAlign: "center",
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            boxShadow: `0 4px 20px ${G}35`,
          }}
        >
          {"\u2705"} Charge $356.44
        </div>
      </div>
    </div>
  );
}
