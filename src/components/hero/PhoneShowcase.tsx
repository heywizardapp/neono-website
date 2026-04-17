import { useState, useEffect, useRef, useCallback, type ComponentType } from "react";
import { BookingScreen } from "./screens/BookingScreen";
import { CalendarScreen } from "./screens/CalendarScreen";
import { POSScreen } from "./screens/POSScreen";
import { ColourScreen } from "./screens/ColourScreen";
import { ClientScreen } from "./screens/ClientScreen";

const P = "#7B2FBE";
const G = "#10B981";
const K = "#1A1A1A";

interface Feature {
  id: string;
  label: string;
  icon: string;
  sub: string;
}

const FEATURES: Feature[] = [
  { id: "booking", label: "Online Booking", icon: "\u{1F4F1}", sub: "Clients book themselves 24/7 \u2014 no calls needed" },
  { id: "calendar", label: "Today\u2019s Schedule", icon: "\u{1F4C5}", sub: "Your whole day, every stylist, at a glance" },
  { id: "pos", label: "Fast Checkout", icon: "\u{1F4B3}", sub: "Tap, tip, done \u2014 close out in seconds" },
  { id: "colour", label: "Colour Studio", icon: "\u{1F3A8}", sub: "Track every gram \u2014 know your costs in real time" },
  { id: "clients", label: "Client Intelligence", icon: "\u{1F9E0}", sub: "AI finds at-risk clients before they leave" },
];

const SCREENS: ComponentType[] = [BookingScreen, CalendarScreen, POSScreen, ColourScreen, ClientScreen];

export default function PhoneShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const doSpin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setRotation((r) => r + 360);
    setTimeout(() => setActiveIdx((i) => (i + 1) % FEATURES.length), 350);
    setTimeout(() => setIsSpinning(false), 800);
  }, [isSpinning]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(doSpin, 3800);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, doSpin]);

  const jumpTo = (idx: number) => {
    if (isSpinning || idx === activeIdx) return;
    setIsSpinning(true);
    setRotation((r) => r + 360);
    setTimeout(() => setActiveIdx(idx), 350);
    setTimeout(() => setIsSpinning(false), 800);
    setPaused(true);
    setTimeout(() => setPaused(false), 5000);
  };

  const Screen = SCREENS[activeIdx];
  const feat = FEATURES[activeIdx];

  return (
    <div className="flex flex-col items-center py-5 px-4" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @keyframes phone-ci { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes phone-pulse { 0%, 100% { transform: scale(1); opacity: 0.2 } 50% { transform: scale(2); opacity: 0 } }
      `}</style>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ perspective: 1200 }}
      >
        <div
          style={{
            transform: `rotateY(${rotation}deg)`,
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            transformStyle: "preserve-3d",
            width: 260,
            height: 530,
          }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-[36px]"
            style={{
              background: K,
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.3), 0 6px 16px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(255,255,255,0.06)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Notch */}
            <div
              className="absolute top-2 left-1/2 -translate-x-1/2 rounded-xl z-20"
              style={{ width: 80, height: 22, background: "#000" }}
            >
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: 7,
                  height: 7,
                  background: "#1A2A1A",
                  border: "1px solid #2A3A2A",
                }}
              />
            </div>
            {/* Screen area */}
            <div className="absolute top-2 left-2 right-2 bottom-2 rounded-[28px] overflow-hidden bg-white">
              {/* Status bar */}
              <div
                className="flex items-end justify-between relative z-[15] bg-white"
                style={{ height: 34, padding: "0 18px", paddingBottom: 3 }}
              >
                <span style={{ fontSize: 10, fontWeight: 600, color: K }}>10:45</span>
                <div className="flex items-center gap-[3px]">
                  <svg width="12" height="9" viewBox="0 0 14 10">
                    <rect x="0" y="7" width="2" height="3" rx=".5" fill={K} />
                    <rect x="3" y="5" width="2" height="5" rx=".5" fill={K} />
                    <rect x="6" y="3" width="2" height="7" rx=".5" fill={K} />
                    <rect x="9" y="0" width="2" height="10" rx=".5" fill={K} />
                  </svg>
                  <span style={{ fontSize: 8, fontWeight: 600, color: K }}>5G</span>
                  <svg width="18" height="9" viewBox="0 0 20 10">
                    <rect x="0" y="0" width="17" height="10" rx="2" stroke={K} strokeWidth="1" fill="none" />
                    <rect x="2" y="2" width="12" height="6" rx="1" fill={G} />
                    <rect x="17" y="3" width="2" height="4" rx="1" fill={K} />
                  </svg>
                </div>
              </div>
              {/* Screen content */}
              <div className="relative" style={{ height: "calc(100% - 34px)" }}>
                <Screen />
              </div>
            </div>
            {/* Home indicator */}
            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-sm"
              style={{ width: 90, height: 4, background: "rgba(255,255,255,0.2)" }}
            />
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 rounded-[36px]"
            style={{
              background: "linear-gradient(160deg, #2A2A2A, #1A1A1A, #0A0A0A)",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Camera module */}
            <div
              className="absolute top-[18px] left-[18px] flex items-center justify-center"
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background: "#111",
                border: "1.5px solid #222",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#080808",
                  border: "1.5px solid #1A1A1A",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#1A1A2E",
                    margin: "6px auto",
                  }}
                />
              </div>
            </div>
            {/* Flash */}
            <div
              className="absolute rounded-full"
              style={{
                top: 24,
                left: 66,
                width: 8,
                height: 8,
                background: "#151518",
                border: "1px solid #222",
              }}
            />
            {/* NeonO logo */}
            <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  background: `${P}25`,
                  fontSize: 8,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.12)",
                }}
              >
                N
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.05)" }}>NeonO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature caption */}
      <div className="mt-5 text-center" style={{ minHeight: 42 }}>
        <div
          key={activeIdx}
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: K,
            marginBottom: 2,
            animation: "phone-ci .4s cubic-bezier(.22,1,.36,1)",
          }}
        >
          {feat.icon} {feat.label}
        </div>
        <div
          key={activeIdx + "s"}
          style={{
            fontSize: 12,
            color: "#9B9590",
            animation: "phone-ci .5s cubic-bezier(.22,1,.36,1) .08s both",
          }}
        >
          {feat.sub}
        </div>
      </div>

      {/* Dot navigation */}
      <div className="flex gap-2 mt-3.5">
        {FEATURES.map((ft, i) => (
          <button
            key={ft.id}
            onClick={() => jumpTo(i)}
            aria-label={ft.label}
            className="border-none cursor-pointer"
            style={{
              width: i === activeIdx ? 26 : 8,
              height: 8,
              borderRadius: 4,
              background: i === activeIdx ? P : "rgba(0,0,0,0.1)",
              transition: "all .4s cubic-bezier(.22,1,.36,1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
