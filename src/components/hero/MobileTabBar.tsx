const P = "#7B2FBE";
const ML = "#9CA3AF";

const tabs: [string, string][] = [
  ["\u{1F4C5}", "Schedule"],
  ["\u{1F464}", "Clients"],
  ["\u{1F4B3}", "POS"],
  ["\u{1F4CA}", "Reports"],
  ["\u2699\uFE0F", "More"],
];

interface MobileTabBarProps {
  active?: number;
}

export function MobileTabBar({ active = 0 }: MobileTabBarProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "6px 0 2px",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(12px)",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      {tabs.map(([ic, l], i) => (
        <div key={l} style={{ textAlign: "center", flex: 1 }}>
          <div style={{ fontSize: 15, lineHeight: 1, opacity: i === active ? 1 : 0.35 }}>{ic}</div>
          <div style={{ fontSize: 7, color: i === active ? P : ML, fontWeight: 600, marginTop: 1 }}>{l}</div>
          {i === active && (
            <div
              style={{
                width: 16,
                height: 2,
                borderRadius: 1,
                background: P,
                margin: "2px auto 0",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
