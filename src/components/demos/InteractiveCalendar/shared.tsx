import { useState, useEffect, useRef, type ReactNode } from "react";

// ─── BRAND COLOUR MAPPING ───
// Maps from the reference coral/cream palette to NeonO's lavender/mint/ink system
export const C = {
  accent: "#7B7BF5",       // lavender (primary) — was #E8734A coral
  accentDark: "#6060D0",   // lavender-dark — for buttons/emphasis
  accentLight: "#9B9BF5",  // lavender-light
  mint: "#22D3A9",         // mint — success/green accent
  mintDark: "#1AAE8A",
  ink: "#0B1220",          // primary dark text
  text: "#495057",         // slate-500 secondary text
  textMuted: "#868E96",    // slate-400
  textFaint: "#ADB5BD",    // slate-300
  bg: "#F8FAFC",           // slate-50 outer bg
  bgCard: "#FFFFFF",
  bgSection: "#F1F3F5",    // slate-100
  border: "#DEE2E6",       // slate-200
} as const;

// ─── FONTS (product UI fonts, distinct from marketing site) ───
export const f = {
  display: "'Playfair Display', Georgia, serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "ui-monospace, 'SFMono-Regular', monospace",
};

// ─── TYPES ───
export interface StaffMember {
  name: string;
  role: string;
  color: string;
  gender: "f" | "m";
}

export interface Appointment {
  id: number;
  cl: string;       // client name
  sv: string;       // service
  cat: string;      // category
  st: number;       // staff index
  h: number;        // hour
  m: number;        // minute
  d: number;        // duration (hours)
  status: string;
  p: number;        // price
  bd: number;       // booked duration (for overrun calc)
  g: "f" | "m";     // gender (for avatar)
  notes: string;
}

export interface ToastState {
  msg: string;
  type: "success" | "info" | "warning" | "error";
  show: boolean;
}

// ─── DATA ───
export const STAFF: StaffMember[] = [
  { name: "Sarah Martinez", role: "Senior Stylist", color: "#7B7BF5", gender: "f" },
  { name: "Mike Johnson", role: "Barber", color: "#3B82F6", gender: "m" },
  { name: "Emma Chen", role: "Colourist", color: "#22D3A9", gender: "f" },
  { name: "Alex Kim", role: "Stylist", color: "#F59E0B", gender: "m" },
];

export const CATS: Record<string, string> = {
  Colour: "#8B5CF6",
  Cut: "#3B82F6",
  Treatment: "#10B981",
  Styling: "#F59E0B",
  Bridal: "#EC4899",
  Barber: "#6366F1",
};

export const STATUS: Record<string, { color: string; label: string }> = {
  confirmed: { color: "#10B981", label: "Confirmed" },
  checked_in: { color: "#3B82F6", label: "Checked In" },
  "in-progress": { color: C.accent, label: "In Progress" },
  completed: { color: "#6B7280", label: "Completed" },
};

export function revCol(p: number): string {
  return p >= 200 ? "#7C3AED" : p >= 100 ? "#2563EB" : p >= 50 ? "#0891B2" : "#6B7280";
}

export const INITIAL_APTS: Appointment[] = [
  { id: 1,  cl: "Jennifer Lee",    sv: "Balayage + Tone",      cat: "Colour",    st: 0, h: 9,  m: 0,  d: 2.5, status: "confirmed",   p: 185, bd: 2,   g: "f", notes: "Warm tones, PPD allergy" },
  { id: 2,  cl: "David Rossi",     sv: "Men's Cut + Beard",    cat: "Barber",    st: 1, h: 9,  m: 0,  d: 1,   status: "checked_in",  p: 45,  bd: 1,   g: "m", notes: "Regular \u2014 every 4 weeks" },
  { id: 3,  cl: "Priya Singh",     sv: "Root Touch-Up",        cat: "Colour",    st: 2, h: 9,  m: 30, d: 1.5, status: "in-progress", p: 95,  bd: 1.5, g: "f", notes: "Davines 6.34 + 20V \u2014 formula v3" },
  { id: 4,  cl: "Lisa Kim",        sv: "Cut & Blowout",        cat: "Cut",       st: 3, h: 10, m: 0,  d: 1.5, status: "confirmed",   p: 75,  bd: 1,   g: "f", notes: "" },
  { id: 5,  cl: "Anna Petrova",    sv: "Highlights + Olaplex", cat: "Colour",    st: 0, h: 12, m: 0,  d: 3,   status: "confirmed",   p: 240, bd: 2.5, g: "f", notes: "Half head foils" },
  { id: 6,  cl: "Marcus Thompson", sv: "Fade + Design",        cat: "Barber",    st: 1, h: 10, m: 30, d: 1,   status: "checked_in",  p: 55,  bd: 0.75, g: "m", notes: "" },
  { id: 7,  cl: "Kate Wilson",     sv: "Keratin Treatment",    cat: "Treatment", st: 2, h: 11, m: 30, d: 2.5, status: "confirmed",   p: 220, bd: 2,   g: "f", notes: "Second session \u2014 check progress" },
  { id: 8,  cl: "Sofia Garcia",    sv: "Bridal Trial",         cat: "Bridal",    st: 3, h: 12, m: 0,  d: 2,   status: "confirmed",   p: 150, bd: 2,   g: "f", notes: "Wedding July 15" },
  { id: 9,  cl: "Jenna Ross",      sv: "Gloss + Trim",         cat: "Styling",   st: 0, h: 15, m: 30, d: 1,   status: "confirmed",   p: 85,  bd: 1,   g: "f", notes: "" },
  { id: 10, cl: "Tom Harris",      sv: "Buzz Cut",             cat: "Barber",    st: 1, h: 12, m: 0,  d: 0.75, status: "completed",  p: 25,  bd: 0.5, g: "m", notes: "" },
  { id: 11, cl: "Maria Diaz",      sv: "Scalp Treatment",      cat: "Treatment", st: 2, h: 14, m: 30, d: 1,   status: "confirmed",   p: 65,  bd: 1,   g: "f", notes: "Sensitive \u2014 Rica products" },
  { id: 12, cl: "Chris Brooks",    sv: "Colour Correction",    cat: "Colour",    st: 3, h: 14, m: 30, d: 2.5, status: "confirmed",   p: 320, bd: 2,   g: "m", notes: "Orange banding from prev salon" },
];

export const HOURS = Array.from({ length: 11 }, (_, i) => i + 8);
export const H = 36; // row height in px (ultra-compact, fits in browser chrome)

// ─── UTILITIES ───
export function getCol(a: Appointment, mode: string): string {
  if (mode === "Staff") return STAFF[a.st].color;
  if (mode === "Service Category") return CATS[a.cat] || "#6B7280";
  if (mode === "Status") return STATUS[a.status].color;
  if (mode === "Revenue") return revCol(a.p);
  return STAFF[a.st].color;
}

export function fmtTime(h: number, m: number): string {
  const hr = h > 12 ? h - 12 : h;
  const ampm = h >= 12 ? "PM" : "AM";
  return `${hr}:${(m || 0).toString().padStart(2, "0")} ${ampm}`;
}

// ─── HOOKS ───
export function useInView(): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.unobserve(el); } },
      { threshold: 0.08 }
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

export function useBreakpoint(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

// ─── INLINE SVG FACE AVATAR ───
// Deterministic illustrated faces from name seed — zero external deps
export function FaceAvatar({ seed, size = 32, gender = "f" }: { seed: string; size?: number; gender?: "f" | "m" }) {
  const hash = seed.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
  const skinTones = ["#F5D0A9", "#D4A76A", "#8D5524", "#C68642", "#E0AC69", "#FFDBAC", "#F1C27D", "#A0522D"];
  const hairColors = ["#2C1810", "#4A2912", "#71503A", "#D4A76A", "#8B4513", "#1A1A1A", "#5C3317", "#3B2314", "#C4843A", "#2E1A0E"];
  const eyeColors = ["#4A3728", "#2E6B3A", "#3B6AA0", "#1A1A1A", "#6B4226"];
  const skin = skinTones[Math.abs(hash) % skinTones.length];
  const hair = hairColors[Math.abs(hash * 7) % hairColors.length];
  const eyes = eyeColors[Math.abs(hash * 13) % eyeColors.length];
  const lipColor = `hsl(${(Math.abs(hash * 3) % 20) + 350}, 45%, ${55 + (Math.abs(hash) % 15)}%)`;
  const hasGlasses = Math.abs(hash) % 5 === 0;
  const hasBeard = gender === "m" && Math.abs(hash) % 3 === 0;
  const hairStyle = Math.abs(hash * 11) % 4;
  const shirtColors = [C.accent, "#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EC4899", "#6366F1", "#0891B2", C.ink, "#7C3AED"];
  const shirt = shirtColors[Math.abs(hash * 5) % shirtColors.length];

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ borderRadius: "50%", flexShrink: 0, display: "block" }}>
      <rect width="64" height="64" rx="32" fill={`hsl(${Math.abs(hash) % 360}, 25%, 90%)`} />
      <rect x="24" y="38" width="16" height="10" rx="2" fill={skin} />
      <ellipse cx="32" cy="58" rx="24" ry="14" fill={shirt} />
      <ellipse cx="32" cy="56" rx="20" ry="10" fill={shirt} />
      <ellipse cx="32" cy="28" rx="16" ry="18" fill={skin} />
      {gender === "f" ? (
        <>
          {hairStyle === 0 && <><ellipse cx="32" cy="18" rx="17" ry="14" fill={hair} /><rect x="14" y="18" width="8" height="24" rx="4" fill={hair} /><rect x="42" y="18" width="8" height="24" rx="4" fill={hair} /></>}
          {hairStyle === 1 && <><ellipse cx="32" cy="17" rx="18" ry="13" fill={hair} /><rect x="13" y="16" width="38" height="6" rx="3" fill={hair} /></>}
          {hairStyle === 2 && <><ellipse cx="32" cy="16" rx="17" ry="14" fill={hair} /><rect x="13" y="17" width="9" height="28" rx="4.5" fill={hair} /><rect x="42" y="17" width="9" height="28" rx="4.5" fill={hair} /><ellipse cx="32" cy="11" rx="12" ry="5" fill={hair} /></>}
          {hairStyle === 3 && <><ellipse cx="32" cy="16" rx="18" ry="12" fill={hair} /><path d="M14,20 Q14,45 22,48 L15,20 Z" fill={hair} /><path d="M50,20 Q50,45 42,48 L49,20 Z" fill={hair} /></>}
        </>
      ) : (
        <>
          {hairStyle === 0 && <ellipse cx="32" cy="16" rx="16" ry="10" fill={hair} />}
          {hairStyle === 1 && <><ellipse cx="32" cy="15" rx="17" ry="9" fill={hair} /><rect x="15" y="12" width="34" height="5" rx="2.5" fill={hair} /></>}
          {hairStyle === 2 && <ellipse cx="32" cy="14" rx="16" ry="8" fill={hair} />}
          {hairStyle === 3 && <><ellipse cx="32" cy="16" rx="17" ry="11" fill={hair} /><rect x="32" y="10" width="17" height="4" rx="2" fill={hair} opacity=".5" /></>}
        </>
      )}
      <ellipse cx="25" cy="28" rx="2.5" ry="2.8" fill="#fff" />
      <ellipse cx="39" cy="28" rx="2.5" ry="2.8" fill="#fff" />
      <circle cx="25.5" cy="28.2" r="1.6" fill={eyes} />
      <circle cx="39.5" cy="28.2" r="1.6" fill={eyes} />
      <circle cx="26" cy="27.5" r=".5" fill="#fff" />
      <circle cx="40" cy="27.5" r=".5" fill="#fff" />
      <path d={`M21,24 Q25,${22 + (Math.abs(hash) % 2)} 28,24`} stroke={hair} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d={`M36,24 Q39,${22 + (Math.abs(hash) % 2)} 43,24`} stroke={hair} strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M31,31 Q32,34 33,31" stroke={`${skin}CC`} strokeWidth=".8" fill="none" />
      <path d={`M27,36 Q32,${38 + (Math.abs(hash) % 2)} 37,36`} stroke={lipColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {hasGlasses && <><circle cx="25" cy="28" r="5" stroke={C.ink} strokeWidth="1" fill="none" opacity=".6" /><circle cx="39" cy="28" r="5" stroke={C.ink} strokeWidth="1" fill="none" opacity=".6" /><line x1="30" y1="28" x2="34" y2="28" stroke={C.ink} strokeWidth=".8" opacity=".6" /></>}
      {hasBeard && <ellipse cx="32" cy="38" rx="8" ry="5" fill={hair} opacity=".5" />}
    </svg>
  );
}

// ─── TOAST NOTIFICATION ───
export function Toast({ message, type, visible }: { message: string; type: string; visible: boolean }) {
  const bg = type === "success" ? C.mint : type === "info" ? "#3B82F6" : type === "warning" ? "#F59E0B" : C.accent;
  const icon = type === "success" ? "\u2713" : type === "info" ? "\u2139" : type === "warning" ? "\u26A1" : "\uD83D\uDD14";
  return (
    <div style={{
      position: "absolute", top: 12, right: 12, zIndex: 200,
      padding: "10px 18px", borderRadius: 10, maxWidth: 360,
      background: bg, color: "#fff",
      fontFamily: f.body, fontSize: 11, fontWeight: 600,
      boxShadow: `0 8px 24px ${bg}40`,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-10px)",
      transition: "all .35s cubic-bezier(.22,1,.36,1)",
      pointerEvents: "none",
      display: "flex", alignItems: "center", gap: 8,
    }}>
      <span style={{ fontSize: 13 }}>{icon}</span>
      {message}
    </div>
  );
}

// ─── COLOUR LEGEND ───
export function Legend({ mode }: { mode: string }) {
  if (mode === "Staff") return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {STAFF.map(s => (
        <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.color }} />
          <span style={{ fontFamily: f.body, fontSize: 9, color: C.text }}>{s.name.split(" ")[0]}</span>
        </div>
      ))}
    </div>
  );
  if (mode === "Service Category") return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {Object.entries(CATS).map(([c, col]) => (
        <div key={c} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 7, height: 7, borderRadius: 2, background: col }} />
          <span style={{ fontFamily: f.body, fontSize: 9, color: C.text }}>{c}</span>
        </div>
      ))}
    </div>
  );
  if (mode === "Status") return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {Object.values(STATUS).map(v => (
        <div key={v.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: v.color }} />
          <span style={{ fontFamily: f.body, fontSize: 9, color: C.text }}>{v.label}</span>
        </div>
      ))}
    </div>
  );
  if (mode === "Revenue") return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {[{ l: "$200+", c: "#7C3AED" }, { l: "$100\u2013199", c: "#2563EB" }, { l: "$50\u201399", c: "#0891B2" }, { l: "<$50", c: "#6B7280" }].map(r => (
        <div key={r.l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 7, height: 7, borderRadius: 2, background: r.c }} />
          <span style={{ fontFamily: f.body, fontSize: 9, color: C.text }}>{r.l}</span>
        </div>
      ))}
    </div>
  );
  return null;
}
